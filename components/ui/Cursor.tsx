"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

/**
 * Small ink dot that follows the mouse and grows into a labelled circle
 * ("drag", "snap", "watch"…) over anything with a data-cursor attribute.
 * Desktop only; hidden on touch devices and with reduced motion.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const c = ref.current!;
    const move = (e: MouseEvent) => {
      c.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      const target = e.target as Element;
      const t = target.closest<HTMLElement>("[data-cursor]");
      c.classList.toggle("big", !!t);
      if (label.current) label.current.textContent = t?.dataset.cursor ?? "";
      c.classList.toggle("on-dark", !!target.closest('[data-tone="dark"]'));
      // Hide while a floating preview is showing
      c.style.opacity = target.closest(".mb-nm.has, .svc-grid article") ? "0" : "1";
    };
    const hide = () => (c.style.opacity = "0");
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", hide);
    return () => { window.removeEventListener("mousemove", move); document.removeEventListener("mouseleave", hide); };
  }, [reduce]);

  if (reduce) return null;
  return (
    <div ref={ref} className="cursor" aria-hidden="true">
      <span ref={label} />
    </div>
  );
}
