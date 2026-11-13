"use client";

import { motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { Digicam } from "@/components/collage/Digicam";
import { PhoneMockup } from "@/components/collage/PhoneMockup";
import { Video } from "@/components/ui/Video";
import { site } from "@/content/site";

export function ShortForm() {
  const sf = site.shortForm;
  const reduce = useReducedMotion();
  const rail = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number } | null>(null);
  const progress = useMotionValue(0.25);
  const width = useTransform(progress, (p) => `${p * 100}%`);

  // Progress bar shows how far along the row you are
  useEffect(() => {
    const r = rail.current;
    if (!r) return;
    const update = () => {
      const max = r.scrollWidth - r.clientWidth;
      const visible = r.clientWidth / r.scrollWidth;
      progress.set(visible + (1 - visible) * (max ? r.scrollLeft / max : 0));
    };
    update();
    r.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { r.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, [progress]);

  // Mouse users can click-and-drag the row; touch users swipe natively with snap.
  const down = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !rail.current) return;
    drag.current = { x: e.clientX, left: rail.current.scrollLeft };
    rail.current.classList.add("dragging");
  };
  const move = (e: React.PointerEvent) => {
    if (drag.current && rail.current) rail.current.scrollLeft = drag.current.left - (e.clientX - drag.current.x);
  };
  const up = () => {
    drag.current = null;
    rail.current?.classList.remove("dragging");
  };
  const step = (dir: number) => rail.current?.scrollBy({ left: dir * 260, behavior: reduce ? "auto" : "smooth" });

  return (
    <section id="content" className="section" data-tone="light" aria-labelledby="content-title">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <h2 id="content-title" className="sf-title">{sf.title}</h2>
          <div className="sf-nav flex gap-3">
            <button type="button" onClick={() => step(-1)} aria-label="Previous video">←</button>
            <button type="button" onClick={() => step(1)} aria-label="Next video">→</button>
          </div>
        </div>

        <div
          ref={rail}
          className="sf-rail [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          tabIndex={0}
          aria-label="Short-form videos, scroll sideways"
          data-cursor="drag"
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerLeave={up}
        >
          <div className="sf-featured">
            <p className="sf-feat-title">
              {sf.featured.title.split("♡")[0]}<i>♡</i>{sf.featured.title.split("♡")[1]}
            </p>
            <div className="sf-cam">
              <Digicam width={400} height={240}>
                <Video clip={sf.featured.video} />
              </Digicam>
              <p className="feat-cap">
                <span className="fav"><i aria-hidden="true">♡</i>{sf.featured.note.label}</span>
                <span className="fav-title">{sf.featured.note.text}</span>
                <span className="fav-views">{sf.featured.note.views} views</span>
              </p>
            </div>
          </div>

          {sf.videos.map((v, i) => (
            <article key={i} className="sf-clip">
              <PhoneMockup clip={v.video} live={i === 0} />
              <h3>{v.title}</h3>
              {v.views && <p className="sf-stats"><b>{v.views}</b> views</p>}
              <a href={v.url} target="_blank" rel="noopener noreferrer" className="sf-link">Watch on {v.platform} ↗</a>
            </article>
          ))}
        </div>
        <div className="sf-progress" aria-hidden="true"><motion.i style={{ width }} /></div>
      </div>
    </section>
  );
}
