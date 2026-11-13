"use client";

import { useEffect, useRef } from "react";

/** Accessible modal built on <dialog>: Esc closes, focus is trapped, backdrop click closes. */
export function Modal({ open, onClose, label, children }: { open: boolean; onClose: () => void; label: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label={label}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      className="m-auto max-w-[min(540px,92vw)] bg-transparent p-0 backdrop:bg-ink/50 backdrop:backdrop-blur-[3px]"
    >
      <div className="relative rounded-md bg-paper p-7">
        <button onClick={onClose} aria-label="Close" className="absolute top-2 right-4 cursor-pointer text-3xl leading-none">
          ×
        </button>
        {children}
      </div>
    </dialog>
  );
}
