import type { Metadata } from "next";
import { site } from "@/content/site";

/**
 * Printable media kit (A4, 3 pages), built from the same content as the website.
 * The downloadable /media-kit.pdf is a print of this page. To refresh the PDF after
 * changing content/site.ts, ask Claude to "regenerate the media kit PDF".
 */
export const metadata: Metadata = { title: "Media Kit", robots: { index: false } };

const n = site.numbers;
const fmt = (h: (typeof n.headline)[number]) =>
  `${"comma" in h && h.comma ? h.value.toLocaleString("en-US") : "decimals" in h ? h.value.toFixed(h.decimals) : h.value}${"suffix" in h ? h.suffix : ""}`;
const posters = [
  { src: "/assets/videos/tiktok-awards.jpg", cap: "TikTok Awards" },
  { src: "/assets/videos/zootopia-2.jpg", cap: "Zootopia 2 premiere" },
  { src: "/assets/videos/ireland-fashion-week.jpg", cap: "Ireland Fashion Week" },
];
const handle = site.socials[0]?.handle ?? "";
const hasEmail = /@/.test(site.email) && !site.email.startsWith("[");

export default function MediaKit() {
  const work = site.shortForm.videos.slice(0, 6);
  return (
    <main className="mk">
      <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.remove('show-intro')" }} />

      {/* ── Page 1: cover ── */}
      <section className="mk-page mk-cover">
        <div className="mk-meta"><span>Media Kit · {site.year}</span><span>{site.hero.metaRight}</span><span>{handle}</span></div>
        <h1 className="mk-name"><span>Jessica</span><span>Latimer</span></h1>
        <p className="mk-script">creator media kit</p>
        <div className="mk-polas">
          {posters.map((p, i) => (
            <figure key={p.src} className={`mk-pola p${i}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.src} alt="" />
              <figcaption>{p.cap}</figcaption>
            </figure>
          ))}
        </div>
        <p className="mk-tag">{site.hero.lede}</p>
        <p className="mk-intro">{site.hero.intro}</p>
        <div className="mk-foot">
          <span>Content · UGC · Events</span>
          <span>{site.socials.map((s) => s.label).join(" · ")} — {handle}</span>
        </div>
      </section>

      {/* ── Page 2: about + numbers + services ── */}
      <section className="mk-page">
        <p className="mk-eyebrow">01 — About</p>
        <h2 className="mk-h2">{site.about.heading.before} <em>{site.about.heading.script}</em> {site.about.heading.after}</h2>
        <div className="mk-about">
          <div>{site.about.bio.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}</div>
          <dl>
            {site.about.badge.fields.map((f) => (
              <div key={f.k}><dt>{f.k}</dt><dd>{f.v}{"tag" in f && f.tag ? ` ${f.tag}` : ""}</dd></div>
            ))}
            <div><dt>Open to</dt><dd>{site.about.based.split("\n")[1]}</dd></div>
          </dl>
        </div>

        <p className="mk-eyebrow">02 — My numbers <small>{n.platform} · {n.period} · updated {n.updated}</small></p>
        <div className="mk-stats">
          {n.headline.map((h) => (
            <div key={h.label}><b>{fmt(h)}</b><span>{h.label}</span><small>{h.note}</small></div>
          ))}
          <div><b>{n.nonFollowers.value}{n.nonFollowers.suffix}</b><span>{n.nonFollowers.label}</span><small>{n.nonFollowers.note}</small></div>
        </div>
        <div className="mk-audience">
          <p><span className="mk-k">Audience</span>{n.ageNote}</p>
          <p><span className="mk-k">Top locations</span>{n.locations.join(" · ")}</p>
        </div>

        <p className="mk-eyebrow">03 — Work with me</p>
        <div className="mk-services">
          {site.services.items.map((s) => (
            <div key={s.id}>
              <h3>{s.title}</h3>
              <ul>{s.points.map((p) => <li key={p}>{p}</li>)}</ul>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
        <p className="mk-approach"><em>{site.services.approach.lines.join(" ")}</em> {site.services.approach.body}</p>
      </section>

      {/* ── Page 3: brands + recent work + contact ── */}
      <section className="mk-page">
        <p className="mk-eyebrow">04 — {site.memoryBox.heading.before} {site.memoryBox.heading.script} {site.memoryBox.heading.after}</p>
        <div className="mk-brands">
          {site.memoryBox.categories.map((c) => (
            <div key={c.id}>
              <h3>{c.label}</h3>
              <ul>{[...new Set(c.brands.map((b) => b.name))].map((b) => <li key={b}>{b}</li>)}</ul>
            </div>
          ))}
        </div>

        <p className="mk-eyebrow">05 — Recent work</p>
        <div className="mk-work">
          {work.map((v) => (
            <figure key={v.title}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={v.video.poster} alt="" />
              <figcaption>{v.title}{v.views ? <small>{v.views} views</small> : null}</figcaption>
            </figure>
          ))}
        </div>

        <div className="mk-contact">
          <p className="mk-script light">let&apos;s work together</p>
          <div className="mk-contact-row">
            <span>{site.url.replace(/^https?:\/\//, "")}</span>
            {hasEmail && <span>{site.email}</span>}
            <span>{handle}</span>
            <span>{site.services.approach.stamp}</span>
          </div>
        </div>
      </section>
    </main>
  );
}
