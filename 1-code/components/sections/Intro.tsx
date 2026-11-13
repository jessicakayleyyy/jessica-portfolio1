"use client";

import { useEffect, useRef, useState } from "react";
import { WaxSeal } from "@/components/collage/Objects";
import { site } from "@/content/site";

/**
 * "Dear Reader" envelope splash. Plays once per visit (sessionStorage),
 * is skippable, and never shows with reduced motion.
 * Whether to show it is decided by a tiny script in layout.tsx before paint, so there's no flash.
 */
export function Intro() {
  const [phase, setPhase] = useState<"closed" | "opening" | "gone">("closed");
  const started = useRef(false);
  const envRef = useRef<HTMLButtonElement>(null);

  const finish = () => {
    setPhase("gone");
    try { sessionStorage.setItem("jl-intro", "1"); } catch {}
    setTimeout(() => document.documentElement.classList.remove("show-intro"), 800);
  };

  const open = () => {
    if (started.current) return;
    started.current = true;
    setPhase("opening");
    setTimeout(finish, 650);
  };

  useEffect(() => {
    if (!document.documentElement.classList.contains("show-intro")) return;
    envRef.current?.focus({ preventScroll: true });
    const t = setTimeout(open, 3200);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && finish();
    window.addEventListener("keydown", onKey);
    return () => { clearTimeout(t); window.removeEventListener("keydown", onKey); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="intro" className={`intro intro-${phase}`} role="dialog" aria-modal="true" aria-label="Welcome">
      <button className="intro-skip mono" onClick={finish}>Skip intro</button>
      <button ref={envRef} className="envelope" onClick={open} aria-label="Open the portfolio">
        <span className="envelope-flap" />
        <span className="envelope-txt">
          <span className="envelope-title">{site.intro.title}</span>
          <span className="envelope-sub">{site.intro.subtitle}</span>
          <span className="pill-dark">{site.intro.pill}</span>
        </span>
        <WaxSeal size={84} style={{ top: "79%", zIndex: 3, width: "13cqw", height: "13cqw" }} />
      </button>
      <p className="intro-hint mono">Tap the seal to open</p>
    </div>
  );
}
