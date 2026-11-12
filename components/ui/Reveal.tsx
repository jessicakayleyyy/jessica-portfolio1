"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Drops an element onto the page with a slight rotation, like it's being placed by hand. */
export function Reveal({
  children,
  rotate = -2,
  delay = 0,
  className,
  style,
}: {
  children: React.ReactNode;
  rotate?: number;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className} style={style}>{children}</div>;
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 30, rotate }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ type: "spring", stiffness: 120, damping: 14, delay }}
    >
      {children}
    </motion.div>
  );
}
