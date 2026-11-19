import { getJSON, setJSON, storeReady } from "@/lib/store";

/**
 * Pulls Jess's Instagram stats from Meta's official "Instagram API with Instagram Login",
 * keeps the access token fresh, and saves the last good numbers.
 *
 * Setup (once): put a long-lived token in the IG_ACCESS_TOKEN environment variable on Vercel.
 * After the first run the token is renewed daily and kept in the private store, so it never
 * quietly expires. Nothing secret is ever written into the code.
 */
/**
 * Two kinds of token work:
 *  - "Instagram login" tokens (60 days, renewed daily here)  -> graph.instagram.com, account "me"
 *  - "Unified login" system-user tokens (never expire)       -> graph.facebook.com, account IG_USER_ID
 * Set IG_USER_ID (the number shown next to your account in the Meta dashboard) for the second kind.
 */
const IG_USER = process.env.IG_USER_ID || "";
const ME = IG_USER || "me";
const API = process.env.IG_API_BASE || (IG_USER ? "https://graph.facebook.com" : "https://graph.instagram.com");
const TOKEN_KEY = "ig:token";
const STATS_KEY = "ig:stats";
const LATEST_KEY = "ig:latest";
const POSTS_KEY = "ig:posts";

/** One of Jess's newest Instagram posts, for the "Latest posts" row */
export type LatestPost = { id: string; url: string; image: string; reel: boolean; caption: string; date: string };

/** The newest posts saved by the daily job (cached for an hour, cleared by the daily job) */
export const readLatestPosts = () => getJSON<LatestPost[]>(POSTS_KEY, false);

export type LiveStats = {
  followers?: number;
  views30?: number;
  interactions30?: number;
  reach30?: number;
  nonFollowerPct?: number;
  avgReach?: number;
  avgReelViews?: number;
  engagementRate?: number;
  ages?: { range: string; pct: number }[];
  gender?: { women: number; men: number };
  locations?: string[];
  tiktokFollowers?: number;
  tiktokLikes?: number;
  youtubeSubs?: number;
  /** ISO date of the last successful update */
  updatedAt?: string;
};

type Saved = { token: string; refreshedAt: string };

/** The saved stats (the last good numbers), or null if there are none yet */
export const readStats = (fresh = true) => getJSON<LiveStats>(STATS_KEY, fresh);

async function ig<T>(path: string, token: string, params: Record<string, string | number> = {}): Promise<T> {
  const url = new URL(path.replace(/^\//, ""), API.endsWith("/") ? API : `${API}/`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, String(v));
  url.searchParams.set("access_token", token);
  const res = await fetch(url, { cache: "no-store" });
  const json = (await res.json().catch(() => ({}))) as T & { error?: { message?: string } };
  if (!res.ok || json.error) throw new Error(json.error?.message || `Instagram ${res.status} on ${path}`);
  return json;
}

/** The current token: the auto-renewed one from the store, else the one set on Vercel */
async function currentToken(): Promise<string | null> {
  const saved = await getJSON<Saved>(TOKEN_KEY);
  const fromVercel = process.env.IG_ACCESS_TOKEN?.trim().replace(/^["']|["']$/g, "");
  return saved?.token || fromVercel || null;
}

/** Renews the 60-day token (Instagram only allows this once it is at least a day old) */
async function refreshToken(token: string): Promise<string> {
  if (IG_USER) return token; // system-user tokens never expire
  const saved = await getJSON<Saved>(TOKEN_KEY);
  const age = saved ? Date.now() - Date.parse(saved.refreshedAt) : Infinity;
  if (age < 20 * 3600 * 1000) return token;
  try {
    const r = await ig<{ access_token: string; expires_in: number }>("refresh_access_token", token, { grant_type: "ig_refresh_token" });
    if (r.access_token) {
      if (storeReady) await setJSON(TOKEN_KEY, { token: r.access_token, refreshedAt: new Date().toISOString() } satisfies Saved);
      return r.access_token;
    }
  } catch {
    // A brand-new token can't be refreshed for 24 hours; try again tomorrow
  }
  return token;
}

type Insight = { name: string; total_value?: { value?: number; breakdowns?: { results?: { dimension_values: string[]; value: number }[] }[] } };
type Insights = { data: Insight[] };
const total = (d: Insights, name: string) => d.data.find((x) => x.name === name)?.total_value?.value;
const results = (d: Insights) => d.data[0]?.total_value?.breakdowns?.[0]?.results ?? [];

const countryName = (code: string) => {
  try { return new Intl.DisplayNames(["en"], { type: "region" }).of(code) || code; } catch { return code; }
};

/** Fetches every stat it can. Each part is independent: one failing never blanks the others. */
async function fetchStats(token: string): Promise<{ stats: LiveStats; errors: string[] }> {
  const s: LiveStats = {};
  const errors: string[] = [];
  const until = Math.floor(Date.now() / 1000);
  const since = until - 30 * 86400;
  const range = { since, until, period: "day", metric_type: "total_value" };
  const attempt = async (label: string, fn: () => Promise<void>) => {
    try { await fn(); } catch (e) { errors.push(`${label}: ${(e as Error).message}`); }
  };

  await attempt("profile", async () => {
    const me = await ig<{ followers_count?: number }>(ME, token, { fields: "followers_count,media_count,username" });
    if (typeof me.followers_count === "number") s.followers = me.followers_count;
  });

  await attempt("account insights", async () => {
    const d = await ig<Insights>(`${ME}/insights`, token, { metric: "views,reach,total_interactions", ...range });
    s.views30 = total(d, "views");
    s.reach30 = total(d, "reach");
    s.interactions30 = total(d, "total_interactions");
    if (s.interactions30 && s.reach30) s.engagementRate = Math.round((s.interactions30 / s.reach30) * 1000) / 10;
  });

  await attempt("non-followers", async () => {
    const d = await ig<Insights>(`${ME}/insights`, token, { metric: "views", breakdown: "follow_type", ...range });
    const r = results(d);
    const all = r.reduce((a, x) => a + x.value, 0);
    const non = r.find((x) => x.dimension_values.includes("NON_FOLLOWER"))?.value;
    if (all && non !== undefined) s.nonFollowerPct = Math.round((non / all) * 100);
  });

  const demo = (breakdown: string) => ig<Insights>(`${ME}/insights`, token, { metric: "follower_demographics", period: "lifetime", metric_type: "total_value", breakdown });

  await attempt("ages", async () => {
    const r = results(await demo("age"));
    const count = (keys: string[]) => r.filter((x) => keys.includes(x.dimension_values[0])).reduce((a, x) => a + x.value, 0);
    const all = r.reduce((a, x) => a + x.value, 0);
    if (!all) return;
    const buckets = [
      { range: "18\u201324", keys: ["18-24"] },
      { range: "25\u201334", keys: ["25-34"] },
      { range: "35\u201344", keys: ["35-44"] },
      { range: "45+", keys: ["45-54", "55-64", "65+"] },
    ];
    s.ages = buckets.map((b) => ({ range: b.range, pct: Math.round((count(b.keys) / all) * 100) }));
  });

  await attempt("gender", async () => {
    const r = results(await demo("gender"));
    const f = r.find((x) => x.dimension_values[0] === "F")?.value ?? 0;
    const m = r.find((x) => x.dimension_values[0] === "M")?.value ?? 0;
    if (f + m) { const women = Math.round((f / (f + m)) * 100); s.gender = { women, men: 100 - women }; }
  });

  await attempt("countries", async () => {
    const r = results(await demo("country")).sort((a, b) => b.value - a.value).slice(0, 4);
    if (r.length) s.locations = r.map((x) => countryName(x.dimension_values[0]));
  });

  await attempt("posts", async () => {
    type Media = { id: string; media_product_type?: string; timestamp: string };
    const list = await ig<{ data: Media[] }>(`${ME}/media`, token, { fields: "id,media_product_type,media_type,timestamp", limit: 50 });
    const recent = list.data.filter((m) => Date.parse(m.timestamp) >= since * 1000);
    const posts = (recent.length >= 3 ? recent : list.data.slice(0, 12)).slice(0, 25);
    const reaches: number[] = [];
    const reelViews: number[] = [];
    for (const m of posts) {
      try {
        const d = await ig<{ data: { name: string; values?: { value: number }[]; total_value?: { value: number } }[] }>(`${m.id}/insights`, token, { metric: "reach,views" });
        const val = (n: string) => { const x = d.data.find((i) => i.name === n); return x?.total_value?.value ?? x?.values?.[0]?.value; };
        const reach = val("reach"), views = val("views");
        if (typeof reach === "number") reaches.push(reach);
        if (m.media_product_type === "REELS" && typeof views === "number") reelViews.push(views);
      } catch { /* some older posts have no insights */ }
    }
    const avg = (a: number[]) => (a.length ? Math.round(a.reduce((x, y) => x + y, 0) / a.length) : undefined);
    s.avgReach = avg(reaches);
    s.avgReelViews = avg(reelViews);
  });

  // Best effort: TikTok and YouTube follower counts from the public profile pages
  const page = async (url: string) => {
    const res = await fetch(url, { cache: "no-store", headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36", "Accept-Language": "en" } });
    return res.ok ? res.text() : "";
  };
  await attempt("tiktok", async () => {
    const html = await page("https://www.tiktok.com/@jessicakayleyyy");
    const f = html.match(/"followerCount":(\d+)/)?.[1], h = html.match(/"heartCount":(\d+)/)?.[1];
    if (f) s.tiktokFollowers = Number(f);
    if (h) s.tiktokLikes = Number(h);
  });
  await attempt("youtube", async () => {
    const html = await page("https://www.youtube.com/@jessicakayleyyy");
    const m = html.match(/"([\d.,]+)([KM]?) subscribers"/);
    if (m) s.youtubeSubs = Math.round(parseFloat(m[1].replace(/,/g, "")) * (m[2] === "M" ? 1e6 : m[2] === "K" ? 1e3 : 1));
  });

  return { stats: s, errors };
}

/** The daily job: renew the token, fetch fresh stats, and save them over the last ones, but only where they went up. */
export async function updateStats() {
  let token = await currentToken();
  if (!token) return { ok: false, message: "No Instagram token yet. Add IG_ACCESS_TOKEN in Vercel -> Settings -> Environment Variables." };
  if (!storeReady) return { ok: false, message: "The stats store isn't connected yet. Add Upstash for Redis in Vercel -> Storage." };
  token = await refreshToken(token);
  const { stats, errors } = await fetchStats(token);
  const fresh = Object.fromEntries(Object.entries(stats).filter(([, v]) => v !== undefined)) as LiveStats;
  if (!Object.keys(fresh).length) return { ok: false, message: "Instagram didn't return any stats, so the last good numbers were kept.", errors };
  // Keep today's raw numbers too, just for reference (the site never shows these)
  await setJSON(LATEST_KEY, { ...fresh, updatedAt: new Date().toISOString() });
  const previous = (await readStats()) ?? {};
  const merged: LiveStats = { ...previous, updatedAt: new Date().toISOString() };
  const updated: string[] = [];
  for (const [k, v] of Object.entries(fresh) as [keyof LiveStats, LiveStats[keyof LiveStats]][]) {
    const old = previous[k];
    // Number stats (followers, views, reach...) only change if today's number is higher.
    // Audience info (ages, gender, countries) isn't better or worse, so it always updates.
    if (typeof v === "number" && typeof old === "number" && v <= old) continue;
    (merged as Record<string, unknown>)[k] = v;
    updated.push(k);
  }
  await setJSON(STATS_KEY, merged);
  let posts: Awaited<ReturnType<typeof updateLatestPosts>> | null = null;
  try { posts = await updateLatestPosts(token); } catch (e) { errors.push(`latest posts: ${(e as Error).message}`); }
  return { ok: true, updated, kept: Object.keys(fresh).filter((k) => !updated.includes(k)), posts, errors };
}

/**
 * Posts to never show in "Latest posts": paste the code from the post's link,
 * e.g. "DSXLYlVD0Vg" from instagram.com/reel/DSXLYlVD0Vg/
 */
const HIDE_POSTS: string[] = [
  "Dd2C_hru1q8", // (Filler post)
];

/** The words in a caption, for spotting near-identical posts */
const words = (s = "") => s.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter((w) => w.length > 2);
const looksAlike = (a: string, b: string) => {
  const A = new Set(words(a)), B = new Set(words(b));
  if (!A.size || !B.size) return false;
  let shared = 0;
  for (const w of A) if (B.has(w)) shared++;
  return shared / Math.min(A.size, B.size) >= 0.5;
};

/**
 * Saves the 6 newest posts (picture, link, caption, date). Instagram's picture links expire after
 * a few days, so the daily job refreshes them. If Instagram fails, the last saved posts stay up.
 * Skips trial reels (only shown to non-followers, never on the profile grid), anything in HIDE_POSTS,
 * and posts whose caption is a near-repeat of one already picked, or that went up within
 * 2 hours of one already picked (a batch of similar videos).
 */
async function updateLatestPosts(token: string): Promise<{ saved: number; trial: number; similar: number }> {
  type Media = { id: string; media_type?: string; media_product_type?: string; media_url?: string; thumbnail_url?: string; permalink?: string; caption?: string; timestamp: string; is_shared_to_feed?: boolean };
  // Trial reels can far outnumber real posts, so keep reading further back (up to 400) until there are 6
  type Page = { data: Media[]; paging?: { next?: string } };
  const all: Media[] = [];
  let page: Page | null = await ig<Page>(`${ME}/media`, token, { fields: "id,media_type,media_product_type,media_url,thumbnail_url,permalink,caption,timestamp,is_shared_to_feed", limit: 100 });
  for (let i = 0; page && i < 4; i++) {
    all.push(...page.data);
    if (all.filter((m) => !(m.media_product_type === "REELS" && m.is_shared_to_feed === false)).length >= 12 || !page.paging?.next) break;
    const res: Response = await fetch(page.paging.next, { cache: "no-store" });
    page = res.ok ? ((await res.json()) as Page) : null;
  }
  const posts: LatestPost[] = [];
  const picked: { caption: string; time: number }[] = [];
  let trial = 0, similar = 0;
  for (const m of all) {
    const video = m.media_type === "VIDEO";
    const image = video ? m.thumbnail_url : m.media_url;
    if (!image || !m.permalink) continue;
    if (HIDE_POSTS.includes(postCodeOf(m.permalink))) continue;
    if (m.media_product_type === "REELS" && m.is_shared_to_feed === false) { trial++; continue; }
    const time = Date.parse(m.timestamp);
    if (picked.some((p) => looksAlike(p.caption, m.caption ?? "") || Math.abs(p.time - time) < 2 * 3600_000)) { similar++; continue; }
    picked.push({ caption: m.caption ?? "", time });
    posts.push({
      id: m.id,
      url: m.permalink,
      image,
      reel: video || m.media_product_type === "REELS",
      caption: (m.caption ?? "").split("\n")[0].slice(0, 90),
      date: m.timestamp,
    });
    if (posts.length === 6) break;
  }
  if (posts.length) await setJSON(POSTS_KEY, posts);
  return { saved: posts.length, trial, similar };
}

const postCodeOf = (url: string) => url.match(/instagram\.com\/(?:reel|reels|p|tv)\/([A-Za-z0-9_-]+)/)?.[1] ?? "";
