import { Bar } from "@/components/ui/Bar";
import { CountUp } from "@/components/ui/CountUp";
import { Donut } from "@/components/ui/Donut";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";

export function Numbers() {
  const n = site.numbers;
  const maxAge = Math.max(...n.ages.map((a) => a.pct));

  return (
    <section id="numbers" className="section bg-pink" data-tone="light" aria-labelledby="numbers-title">
      <div className="wrap">
        <Reveal rotate={0} className="gram">
          <div className="gram-head">
            <h2 id="numbers-title">{n.title}</h2>
            <span className="mono">{n.platform} · {n.period}</span>
            <span className="pill-dark gram-pill">jessica latimer media kit</span>
          </div>

          <div className="gram-grid">
            <dl className="gram-big">
              {n.headline.map((s) => (
                <div key={s.label}>
                  <dt>{s.label}</dt>
                  <dd>
                    <CountUp value={s.value} decimals={s.decimals} suffix={s.suffix} comma={s.comma} />
                    <small>{s.note}</small>
                  </dd>
                </div>
              ))}
            </dl>

            <div className="gram-bars">
              <h3>Age Range</h3>
              {n.ages.map((a) => (
                <div key={a.range} className="gram-bar">
                  <span>{a.range}</span>
                  <Bar widthPct={(a.pct / maxAge) * 100} />
                  <span>{a.pct}%</span>
                </div>
              ))}
              <p className="mono mt-4 text-muted">{n.ageNote}</p>
            </div>

            <div>
              <h3>Audience</h3>
              <Donut women={n.gender.women} men={n.gender.men} />
              <dl className="gram-big mt-6">
                <dt>{n.nonFollowers.label}</dt>
                <dd>
                  <CountUp value={n.nonFollowers.value} suffix={n.nonFollowers.suffix} />
                  <small>{n.nonFollowers.note}</small>
                </dd>
              </dl>
            </div>
          </div>

          <div className="gram-locs">
            <div>
              <h3>Top Locations</h3>
              <ol>
                {n.locations.map((l, i) => (
                  <li key={l}>{l}<i aria-hidden="true" /><span>{String(i + 1).padStart(2, "0")}</span></li>
                ))}
              </ol>
            </div>
            <a className="gram-next" href="#services">Work with me →</a>
          </div>
          <p className="mono mt-5 text-muted">Last updated {n.updated}</p>
        </Reveal>
      </div>
    </section>
  );
}
