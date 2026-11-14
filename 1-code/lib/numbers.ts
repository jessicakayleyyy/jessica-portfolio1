import { site } from "@/content/site";
import { readStats, type LiveStats } from "@/lib/instagram";

/**
 * The "My Numbers" data the site shows: the live Instagram stats where we have them,
 * and the hand-typed numbers in content/site.ts for anything missing.
 */
type Headline = { label: string; value: number; note: string; suffix?: string; decimals?: number; comma?: boolean };

/** 214302 → 214K, 14400 → 14.4K, 2023 → 2,023 */
function compact(n: number): Pick<Headline, "value" | "suffix" | "decimals" | "comma"> {
  if (n >= 1_000_000) return { value: Math.round(n / 100_000) / 10, decimals: 1, suffix: "M" };
  if (n >= 100_000) return { value: Math.round(n / 1000), suffix: "K" };
  if (n >= 10_000) { const v = Math.round(n / 100) / 10; return { value: v, decimals: Number.isInteger(v) ? 0 : 1, suffix: "K" }; }
  return { value: n, comma: true };
}

const prettyDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IE", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Dublin" });

/** The "Also on" platforms with the freshest counts, plus everyone added together */
function alsoOn(live: LiveStats | null, igFollowers: number) {
  const list = site.numbers.alsoOn.map((p) => {
    const count = p.platform === "TikTok" ? live?.tiktokFollowers ?? p.count : live?.youtubeSubs ?? p.count;
    const extra = p.platform === "TikTok" ? live?.tiktokLikes ?? p.extra : p.extra;
    return { ...p, count, extra };
  });
  const combined = igFollowers + list.reduce((a, p) => a + (p.count || 0), 0);
  return { list, combined };
}

export function mergeNumbers(live: LiveStats | null) {
  const n = site.numbers;
  const typedFollowers = n.headline.find((h) => h.label === "Followers")?.value ?? 0;
  if (!live) return { ...n, extras: [] as Headline[], also: alsoOn(null, typedFollowers) };

  const headline = n.headline.map((h): Headline => {
    if (h.label === "Views" && live.views30) return { label: h.label, note: h.note, ...compact(live.views30) };
    if (h.label === "Interactions" && live.interactions30) return { label: h.label, note: h.note, ...compact(live.interactions30) };
    if (h.label === "Followers" && live.followers) return { label: h.label, note: h.note, value: live.followers, comma: true };
    return h;
  });

  const extras: Headline[] = [];
  if (live.avgReach) extras.push({ label: "Avg. reach", note: "per post, last 30 days", ...compact(live.avgReach) });
  if (live.avgReelViews) extras.push({ label: "Avg. reel views", note: "per reel, last 30 days", ...compact(live.avgReelViews) });
  if (live.engagementRate) extras.push({ label: "Engagement rate", note: "interactions ÷ reach", value: live.engagementRate, decimals: 1, suffix: "%" });

  const ages = live.ages?.length ? live.ages : n.ages;
  const young = live.ages ? (live.ages.find((a) => a.range === "18–24")?.pct ?? 0) + (live.ages.find((a) => a.range === "25–34")?.pct ?? 0) : null;

  return {
    ...n,
    headline,
    extras,
    nonFollowers: live.nonFollowerPct !== undefined ? { ...n.nonFollowers, value: live.nonFollowerPct } : n.nonFollowers,
    ages,
    ageNote: young !== null ? `${young}% of followers are 18–34` : n.ageNote,
    gender: live.gender ?? n.gender,
    locations: live.locations?.length ? live.locations : n.locations,
    updated: live.updatedAt ? prettyDate(live.updatedAt) : n.updated,
    also: alsoOn(live, live.followers ?? typedFollowers),
  };
}

/** 9407 → "9.4K", 658300 → "658K" */
export const short = (n: number) =>
  n >= 1e6 ? `${(n / 1e6).toFixed(1).replace(/\.0$/, "")}M` : n >= 1e5 ? `${Math.round(n / 1e3)}K` : n >= 1e3 ? `${(n / 1e3).toFixed(1).replace(/\.0$/, "")}K` : String(n);

export type NumbersData = ReturnType<typeof mergeNumbers>;

/** Live numbers merged over the hand-typed ones (never throws) */
export async function getNumbers(): Promise<NumbersData> {
  try {
    return mergeNumbers(await readStats(false));
  } catch {
    return mergeNumbers(null);
  }
}
