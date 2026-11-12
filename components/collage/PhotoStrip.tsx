"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Photo } from "@/components/ui/Photo";
import type { Media } from "@/content/site";

/** Photobooth strip. Click it and the four photos shuffle into a new order. */
export function PhotoStrip({ photos, className = "", style }: { photos: Media[]; className?: string; style?: React.CSSProperties }) {
  const reduce = useReducedMotion();
  const [order, setOrder] = useState(() => photos.map((_, i) => i));

  const shuffle = () =>
    setOrder((o) => {
      const next = [...o];
      for (let i = next.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [next[i], next[j]] = [next[j], next[i]];
      }
      return next;
    });

  return (
    <button type="button" onClick={shuffle} className={`booth ${className}`} style={style} aria-label="Shuffle the photobooth photos" data-cursor="shuffle">
      {order.map((i) => (
        <motion.span key={i} layout={!reduce} transition={{ type: "spring", stiffness: 300, damping: 22 }} className="block">
          <Photo media={photos[i]} sizes="90px" />
        </motion.span>
      ))}
    </button>
  );
}
