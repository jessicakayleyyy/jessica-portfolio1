"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Props = { value: number; decimals?: number; suffix?: string; comma?: boolean };

const format = (v: number, decimals: number, comma?: boolean) =>
  comma ? Math.round(v).toLocaleString("en-AU") : v.toFixed(decimals);

/** Counts up once when it scrolls into view. Server-renders the final value. */
export function CountUp({ value, decimals = 0, suffix = "", comma }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(format(value, decimals, comma));

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, value, {
      duration: 1.5,
      ease: [0.2, 0.8, 0.2, 1],
      onUpdate: (v) => setDisplay(format(v, decimals, comma)),
    });
    return () => controls.stop();
  }, [inView, reduce, value, decimals, comma]);

  return (
    <span ref={ref} style={{ fontVariantNumeric: "tabular-nums" }}>
      {display}
      {suffix}
    </span>
  );
}
