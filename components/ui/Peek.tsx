"use client";

import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * A small card that floats beside the cursor while `show` is true (desktop only).
 * Used for brand video previews and service photos.
 */
export function Peek({ show, offsetX = 100, rotate = -4, children }: { show: boolean; offsetX?: number; rotate?: number; children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const [fine, setFine] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 400, damping: 35 });
  const sy = useSpring(y, { stiffness: 400, damping: 35 });

  useEffect(() => {
    setFine(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
    const move = (e: MouseEvent) => { x.set(e.clientX + offsetX); y.set(e.clientY); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y, offsetX]);

  if (!fine || reduce) return null;

  return (
    <motion.div className="peek" style={{ x: sx, y: sy }} aria-hidden="true">
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: rotate - 4 }}
            animate={{ opacity: 1, scale: 1, rotate }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ type: "spring", stiffness: 320, damping: 20 }}
            style={{ translateX: "-50%", translateY: "-50%" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
