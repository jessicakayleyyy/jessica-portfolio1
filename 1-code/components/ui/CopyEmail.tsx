"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Fallback: select the text so it can be copied manually
      const sel = window.getSelection();
      if (sel && codeRef.current) sel.selectAllChildren(codeRef.current);
    }
  };

  return (
    <span className="inline-flex items-center gap-2.5 rounded-full bg-cream py-1.5 pr-1.5 pl-4">
      <code ref={codeRef} className="font-mono text-[.9rem] select-all">{email}</code>
      <button onClick={copy} className="cursor-pointer rounded-full bg-ink px-3.5 py-2 text-[.8rem] font-semibold text-cream active:scale-[.97]">
        Copy email
      </button>
      <AnimatePresence>
        {copied && (
          <motion.span
            role="status"
            initial={{ opacity: 0, y: 16, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 16, x: "-50%" }}
            className="fixed bottom-[calc(84px+env(safe-area-inset-bottom,0px))] left-1/2 z-[90] rounded-full bg-ink px-5 py-1.5 font-serif text-[1.15rem] italic text-cream"
          >
            copied! ♡
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
