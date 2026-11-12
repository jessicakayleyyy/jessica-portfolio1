"use client";

import { motion, useReducedMotion } from "framer-motion";

/** A thin horizontal bar that grows to its width when it scrolls into view. */
export function Bar({ widthPct }: { widthPct: number }) {
  const reduce = useReducedMotion();
  return (
    <span className="block h-[9px] overflow-hidden rounded-full">
      <motion.span
        className="block h-full rounded-full bg-sky"
        initial={reduce ? false : { width: 0 }}
        whileInView={{ width: `${widthPct}%` }}
        style={reduce ? { width: `${widthPct}%` } : undefined}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
      />
    </span>
  );
}
