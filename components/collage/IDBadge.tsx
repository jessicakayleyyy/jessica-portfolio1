"use client";

import { useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Photo } from "@/components/ui/Photo";
import type { Media } from "@/content/site";

type Props = { club: string; photo: Media; fields: { k: string; v: string; tag?: string }[] };

/**
 * "Creator Club" pass in a clear sleeve on a pink lanyard.
 * Drag it sideways (or just hover) and it swings and settles like a real pendulum.
 */
export function IDBadge({ club, photo, fields }: Props) {
  const reduce = useReducedMotion();
  const el = useRef<HTMLDivElement>(null);
  const s = useRef({ ang: 0, vel: 0, drag: false, x0: 0, a0: 0, raf: 0 });

  const render = () => {
    if (el.current) el.current.style.transform = `rotate(${s.current.ang}deg)`;
  };
  const tick = () => {
    const st = s.current;
    st.vel += -st.ang * 0.045;
    st.vel *= 0.94;
    st.ang += st.vel;
    render();
    if (Math.abs(st.ang) > 0.05 || Math.abs(st.vel) > 0.05) st.raf = requestAnimationFrame(tick);
    else { st.ang = 0; render(); }
  };
  const release = () => {
    if (!s.current.drag) return;
    s.current.drag = false;
    s.current.raf = requestAnimationFrame(tick);
  };

  return (
    <div
      ref={el}
      className="swing"
      data-cursor="swing"
      onPointerDown={(e) => {
        if (reduce) return;
        const st = s.current;
        cancelAnimationFrame(st.raf);
        Object.assign(st, { drag: true, x0: e.clientX, a0: st.ang });
        e.currentTarget.setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        const st = s.current;
        if (!st.drag) return;
        const next = Math.max(-40, Math.min(40, st.a0 - (e.clientX - st.x0) / 3));
        st.vel = next - st.ang;
        st.ang = next;
        render();
      }}
      onPointerUp={release}
      onPointerCancel={release}
      onMouseEnter={() => {
        if (reduce || s.current.drag) return;
        cancelAnimationFrame(s.current.raf);
        s.current.vel += 2.2;
        s.current.raf = requestAnimationFrame(tick);
      }}
    >
      <svg width="140" height="120" viewBox="0 0 140 120" aria-hidden="true" className="block">
        <path d="M20 0 L62 104 M120 0 L78 104" stroke="#F0B7CB" strokeWidth="16" fill="none" />
        <path d="M20 0 L62 104 M120 0 L78 104" stroke="#fff" strokeOpacity=".35" strokeDasharray="4 6" fill="none" />
        <rect x="58" y="96" width="24" height="20" rx="4" fill="#C9C9CC" />
        <circle cx="70" cy="114" r="6" fill="none" stroke="#A9AAAE" strokeWidth="3" />
      </svg>
      <div className="badge">
        <div className="badge-slot" />
        <div className="badge-card">
          <h3>{club}</h3>
          <Photo media={photo} sizes="96px" />
          <dl>
            {fields.map((f) => (
              <div key={f.k}>
                <dt>{f.k}</dt>
                <dd className={f.tag ? "award" : undefined}>{f.v}{f.tag && <span>{f.tag}</span>}</dd>
              </div>
            ))}
          </dl>
          <div className="barcode" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
