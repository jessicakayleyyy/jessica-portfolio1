import type { LatestPost } from "@/lib/instagram";
import { site } from "@/content/site";

/** "1 day ago", "3 weeks ago" */
function ago(iso: string) {
  const days = Math.max(0, Math.floor((Date.now() - Date.parse(iso)) / 86_400_000));
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 7) return `${days} days ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  const months = Math.floor(days / 30);
  return `${months} month${months > 1 ? "s" : ""} ago`;
}

/**
 * "Fresh off my feed": Jess's 6 newest Instagram posts as little polaroids, refreshed by the
 * daily job. Hidden completely until there are posts to show.
 */
export function LatestPosts({ posts }: { posts?: LatestPost[] | null }) {
  if (!posts?.length) return null;
  const ig = site.socials.find((s) => s.label === "Instagram");
  return (
    <div className="lp">
      <div className="lp-head">
        <p className="lp-title">fresh off my feed</p>
        {ig && (
          <a className="sf-link" href={ig.url} target="_blank" rel="noopener noreferrer">
            {ig.handle} on Instagram ↗
          </a>
        )}
      </div>
      <ul className="lp-grid">
        {posts.map((p) => (
          <li key={p.id}>
            <a className="lp-card" href={p.url} target="_blank" rel="noopener noreferrer" aria-label={`Open post on Instagram${p.caption ? `: ${p.caption}` : ""}`}>
              <span className="lp-img">
                {/* Instagram's own picture link, refreshed daily */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt={p.caption || "Instagram post"} loading="lazy" referrerPolicy="no-referrer" />
                {p.reel && <i className="lp-reel" aria-hidden="true">▶</i>}
              </span>
              <span className="lp-cap">{p.caption || "new post ♡"}</span>
              <span className="lp-date">{ago(p.date)}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
