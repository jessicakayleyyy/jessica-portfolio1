"use client";

import { useState } from "react";
import { Photo } from "@/components/ui/Photo";
import { site } from "@/content/site";

/** "What are you looking for?" Cut-outs of Jess on a pink carpet; each jumps to its service. */
export function ChooseYour() {
  const c = site.choose;
  const [say, setSay] = useState<string | null>(null);

  return (
    <section className="choose" data-tone="light" aria-labelledby="choose-title">
      <div className="wrap text-center">
        <p className="mono text-[#6F86B8]">{c.step}</p>
        <h2 id="choose-title" className="choose-title">{c.title}</h2>
        <p className="choose-say" aria-live="polite">{say ? `${say} →` : " "}</p>
      </div>
      <div className="choose-stage">
        <div className="choose-carpet" aria-hidden="true" />
        <div className="wrap">
          <div className="choose-people" onMouseLeave={() => setSay(null)}>
            {c.personas.map((p) => (
              <a
                key={p.label}
                href={p.target}
                className="person"
                data-cursor="choose"
                onMouseEnter={() => setSay(p.say)}
                onFocus={() => setSay(p.say)}
              >
                <span className="person-pill">{p.label}</span>
                <Photo media={p.cutout} sizes="(max-width: 760px) 45vw, 210px" className="person-fig" />
                <span className="person-shadow" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
