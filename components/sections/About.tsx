import { IDBadge } from "@/components/collage/IDBadge";
import { PhotoStrip } from "@/components/collage/PhotoStrip";
import { Interests } from "@/components/ui/Interests";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";

export function About() {
  const a = site.about;
  return (
    <section id="about" className="section about" data-tone="light" aria-labelledby="about-title">
      <div className="wrap about-grid">
        <Reveal rotate={3} className="about-badge flex flex-col items-center">
          <IDBadge {...a.badge} />
          <p className="hint mt-3.5">Give my pass a swing</p>
          <PhotoStrip photos={a.photobooth} className="about-strip" />
        </Reveal>

        <div className="relative">
          <h2 id="about-title" className="about-title">
            {a.heading.before} <em>{a.heading.script}</em> {a.heading.after}
          </h2>
          <h3 className="about-h3">About me</h3>
          <div className="space-y-3.5 text-[#3d302e]">
            {a.bio.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <div className="my-7 h-px bg-ink/25" />
          <div className="about-facts">
            <div>
              <h4>Based</h4>
              <p className="whitespace-pre-line">{a.based}</p>
            </div>
            <div>
              <h4>Interests</h4>
              <Interests items={a.interests} />
            </div>
            <div>
              <h4>Watch more</h4>
              <a className="yt" href={a.youtube} target="_blank" rel="noopener noreferrer">
                <i aria-hidden="true" />
                <span className="mono">YouTube ↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
