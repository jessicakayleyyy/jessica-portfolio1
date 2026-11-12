"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import type { Clip } from "@/content/site";

/**
 * Muted, looping, inline video that only plays while it's on screen.
 * Falls back to a labelled placeholder until the file is added.
 */
export function Video({ clip, className = "" }: { clip: Clip; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !reduce) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.4 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reduce, failed]);

  if (!clip.src || failed) return <div className={`photo ${className}`} data-label={clip.label} role="presentation" />;

  return (
    <video
      ref={ref}
      className={`photo ${className}`}
      muted
      loop
      playsInline
      preload="none"
      poster={clip.poster}
      aria-label={clip.label}
    >
      {clip.webm && <source src={clip.webm} type="video/webm" />}
      <source src={clip.src} type="video/mp4" onError={() => setFailed(true)} />
    </video>
  );
}
