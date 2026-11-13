"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

/** Interest chips. Tapping one shows a line about it underneath. */
export function Interests({ items }: { items: { name: string; say: string }[] }) {
  const [active, setActive] = useState(0);
  return (
    <>
      <div className="flex flex-wrap gap-1.5">
        {items.map((it, i) => (
          <button key={it.name} type="button" className="chip" aria-pressed={i === active} onClick={() => setActive(i)}>
            {it.name}
          </button>
        ))}
      </div>
      <p className="chip-say" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={active} className="block" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}>
            {items[active].say}
          </motion.span>
        </AnimatePresence>
      </p>
    </>
  );
}
