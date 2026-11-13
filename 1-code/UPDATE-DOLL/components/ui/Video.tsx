"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import type { Clip } from "@/content/site";

/**
 * Muted, looping, inline video that only plays while it's on screen.
 * If a browser can't play it, the poster picture shows instead (never a blank box).
 * With no file set at all, a labelled placeholder shows.
 */
/** eager: start loading + playing straight away (used for hover previews and pop-ups) */
export function Video({ clip, className = "", eager = false }: { clip: Clip; className?: string; eager?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !reduce) {
          if (v.readyState === 0) v.load();
          v.play().catch(() => {});
        } else v.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reduce, failed]);

  if (!clip.src) return <div className={`photo ${className}`} data-label={clip.label} role="presentation" />;

  if (failed) {
    return clip.poster ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img className={`photo ${className}`} src={clip.poster} alt={clip.label} style={{ objectFit: "cover" }} />
    ) : (
      <div className={`photo ${className}`} data-label={clip.label} role="presentation" />
    );
  }

  return (
    <video
      ref={ref}
      className={`photo ${className}`}
      src={clip.src}
      muted
      loop
      playsInline
      preload={eager ? "auto" : "none"}
      autoPlay={eager && !reduce}
      poster={clip.poster}
      aria-label={clip.label}
      onError={() => {
        // Only give up when the browser really can't use the file
        const err = ref.current?.error;
        if (err && (err.code === 3 || err.code === 4)) setFailed(true);
      }}
    />
  );
}
