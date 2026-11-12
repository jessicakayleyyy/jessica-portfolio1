"use client";

import { motion, useMotionValue, useReducedMotion, useTransform, type MotionValue } from "framer-motion";

type Props = {
  children: React.ReactNode;
  /** Absolute position inside the collage, e.g. { left: 0, top: 110 } */
  style: React.CSSProperties;
  rotate?: number;
  /** How far it drifts with the mouse (parallax). 0 = none. */
  depth?: number;
  mouseX?: MotionValue<number>;
  mouseY?: MotionValue<number>;
  /** Runs on a click/tap that isn't a drag */
  onTap?: (event: MouseEvent | TouchEvent | PointerEvent) => void;
  /** Label for the custom cursor, e.g. "drag", "snap" */
  cursor?: string;
};

/**
 * A collage object you can pick up and drop. It springs loosely back to where it was placed.
 * Purely decorative (aria-hidden); drag and parallax switch off with reduced motion.
 */
export function Draggable({ children, style, rotate = 0, depth = 0, mouseX, mouseY, onTap, cursor = "drag" }: Props) {
  const reduce = useReducedMotion();
  const still = useMotionValue(0);
  const px = useTransform(mouseX ?? still, (v) => (reduce ? 0 : v * depth));
  const py = useTransform(mouseY ?? still, (v) => (reduce ? 0 : v * depth));

  return (
    <motion.div className="obj" style={{ ...style, x: px, y: py }} aria-hidden="true">
      <motion.div
        className={reduce ? "" : "grab"}
        style={{ rotate }}
        data-cursor={cursor}
        onTap={onTap ? (e) => onTap(e) : undefined}
        drag={!reduce}
        dragSnapToOrigin
        dragElastic={0.6}
        dragTransition={{ bounceStiffness: 160, bounceDamping: 11 }}
        whileHover={reduce ? undefined : { scale: 1.02, rotate: rotate + 1.5 }}
        whileDrag={{ scale: 1.05, zIndex: 30 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
