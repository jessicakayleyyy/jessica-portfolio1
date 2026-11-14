/**
 * Tiny key–value store for the Instagram stats and token, using Upstash Redis over its REST API
 * (added from Vercel → Storage → Upstash for Redis, which creates the env vars below automatically).
 * Every call fails softly: if the store isn't set up or is unreachable, reads return null.
 */
const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

export const storeReady = Boolean(URL_ && TOKEN);
/** Cache tag for the saved stats, cleared by the daily job so the page updates straight away */
export const STATS_TAG = "ig-stats";

/** fresh: skip the cache (the daily job); otherwise pages reuse the answer for up to an hour */
async function command(args: (string | number)[], fresh = true): Promise<unknown> {
  if (!storeReady) return null;
  const res = await fetch(URL_!, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(args),
    ...(fresh ? { cache: "no-store" as const } : { next: { revalidate: 3600, tags: [STATS_TAG] } }),
  });
  if (!res.ok) throw new Error(`store ${res.status}`);
  const json = (await res.json()) as { result?: unknown };
  return json.result ?? null;
}

export async function getJSON<T>(key: string, fresh = true): Promise<T | null> {
  try {
    const raw = await command(["GET", key], fresh);
    return typeof raw === "string" ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export async function setJSON(key: string, value: unknown): Promise<void> {
  await command(["SET", key, JSON.stringify(value)]);
}
