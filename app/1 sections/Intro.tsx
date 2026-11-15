"use client";

import { useEffect, useRef, useState } from "react";
import { WaxSeal } from "@/components/collage/Objects";
import { site } from "@/content/site";

/**
 * "Dear Reader" envelope splash. Stays until the visitor taps the seal (or skips). Plays once per visit
 * (sessionStorage) and never shows with reduced motion. Whether to show it is decided by a tiny script in
 * layout.tsx before paint, so there's no flash.
 *
 * Opening: the seal pops off and the flap folds open; a card (a mini copy of the top of the media kit)
 * rises halfway out of the envelope and pauses, then the view "dives" into the card: the envelope and
 * card zoom towards you and fade while the real page comes into focus underneath.
 */
const RISE_AT = 950; // ms after the tap, once the flap is open
const RISE = 1000; // the card slides up out of the envelope
const DIVE_AT = RISE_AT + RISE + 250; // a short pause to see it, then dive in
const DONE_AT = DIVE_AT + 900;

export function Intro() {
  const [phase, setPhase] = useState<"closed" | "opening" | "gone">("closed");
  const [nudge, setNudge] = useState(false);
  const [bloom, setBloom] = useState(false);
  const started = useRef(false);
  const envRef = useRef<HTMLButtonElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const kitRef = useRef<HTMLSpanElement>(null);

  const finish = () => {
    setPhase("gone");
    try { sessionStorage.setItem("jl-intro", "1"); } catch {}
    setTimeout(() => document.documentElement.classList.remove("show-intro"), 300);
  };

  /** Copies the real homepage's proportions into the card, then slides it up out of the envelope */
  const glide = () => {
    const kit = kitRef.current;
    const heroWrap = document.querySelector<HTMLElement>(".hero .wrap");
    if (!kit || !heroWrap) return;
    const k = kit.getBoundingClientRect();
    const h = heroWrap.getBoundingClientRect();
    const ratio = k.width / h.width; // card size ÷ real homepage size

    // Place each card element exactly where (and as big as) the real one is, scaled down
    const copy = (sel: string, part: string) => {
      const real = document.querySelector<HTMLElement>(sel);
      const mini = kit.querySelector<HTMLElement>(part);
      if (!real || !mini) return;
      const r = real.getBoundingClientRect();
      mini.style.top = `${(r.top - h.top) * ratio}px`;
      mini.style.left = `${(r.left - h.left) * ratio}px`;
      mini.style.right = "auto";
      mini.style.width = `${r.width * ratio}px`;
      mini.style.fontSize = `${parseFloat(getComputedStyle(real).fontSize) * ratio}px`;
      // Nudge it so its outline lands exactly where the real one is (fonts and rotation can shift it slightly)
      const want = (r.top - h.top) * ratio;
      const got = mini.getBoundingClientRect().top - k.top;
      mini.style.top = `${parseFloat(mini.style.top) + (want - got)}px`;
    };
    copy(".hero-meta", ".kit-meta");
    copy(".hero-giant", ".kit-giant");
    copy(".hero-title h1", ".kit-name");
    copy(".hero-tag", ".kit-tag");

    // Rise halfway out of the envelope (staying on screen)
    const riseY = -Math.min(k.height * 0.5, k.top - 16);
    kit.animate([{ transform: "translateY(0)" }, { transform: `translateY(${riseY}px)` }], { duration: RISE, easing: "cubic-bezier(.25,.8,.3,1)", fill: "forwards" });
    setTimeout(() => { kit.style.zIndex = "7"; }, RISE * 0.45);
    // The dive zooms in on the middle of the risen card
    const env = envRef.current!.getBoundingClientRect();
    envRef.current!.style.transformOrigin = `${k.left + k.width / 2 - env.left}px ${k.top + k.height / 2 + riseY - env.top}px`;
  };

  const open = () => {
    if (started.current) return;
    started.current = true;
    setPhase("opening");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setTimeout(finish, 200); return; }
    setTimeout(glide, RISE_AT);
    setTimeout(() => setBloom(true), DIVE_AT);
    setTimeout(finish, DONE_AT);
  };

  useEffect(() => {
    if (!document.documentElement.classList.contains("show-intro")) return;
    // Always open onto the top of the page, even if the browser remembered an old scroll position
    try { history.scrollRestoration = "manual"; } catch {}
    window.scrollTo(0, 0);
    envRef.current?.focus({ preventScroll: true });
    // It waits for the visitor to open it. After a moment the seal starts to gently pulse as a hint.
    const t = setTimeout(() => setNudge(true), 2500);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && finish();
    window.addEventListener("keydown", onKey);
    return () => { clearTimeout(t); window.removeEventListener("keydown", onKey); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={introRef} id="intro" className={`intro intro-${phase} ${nudge ? "intro-nudge" : ""} ${bloom ? "intro-bloom" : ""}`} role="dialog" aria-modal="true" aria-label="Welcome">
      <span className="intro-bg" aria-hidden="true" />
      <button className="intro-skip mono" onClick={finish}>Skip intro</button>
      <button ref={envRef} className="envelope" onClick={open} aria-label="Open the portfolio">
        <span className="env-back" />
        {/* The card: a mini copy of the top of the media kit that glides out and becomes the site */}
        <span ref={kitRef} className="env-letter env-kit" aria-hidden="true">
          <span className="kit-meta"><span>{site.hero.metaLeft}</span><span>{site.hero.metaCenter}</span><span>{site.hero.metaRight}</span></span>
          <span className="kit-giant">{site.hero.backgroundWord}</span>
          <span className="kit-name">{site.name}</span>
          <span className="kit-tag">{site.hero.tagline}</span>
        </span>
        <span className="env-pocket" />
        <span className="envelope-flap" />
        <span className="envelope-txt">
          <span className="envelope-title">{site.intro.title}</span>
          <span className="envelope-sub">{site.intro.subtitle}</span>
          <span className="pill-dark">{site.intro.pill}</span>
        </span>
        <WaxSeal size={84} style={{ top: "79%", zIndex: 6, width: "13cqw", height: "13cqw" }} />
      </button>
      <p className="intro-hint mono">Tap the seal to open</p>
    </div>
  );
}
