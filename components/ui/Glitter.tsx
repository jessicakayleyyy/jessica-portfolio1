"use client";

import { useEffect } from "react";

/**
 * Little sparkle stars and hearts that twinkle in the page margins of the light sections.
 * Purely decorative; positions are seeded so they look the same on every visit.
 */
export function Glitter() {
  useEffect(() => {
    let seed = 7;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
    const added: HTMLElement[] = [];
    document.querySelectorAll<HTMLElement>("main > section").forEach((sec) => {
      if (sec.dataset.tone === "dark") return;
      const n = sec.classList.contains("hero") ? 7 : 4;
      for (let i = 0; i < n; i++) {
        const s = document.createElement("span");
        const k = rnd();
        s.className = "spark " + (k < 0.4 ? "star" : k < 0.7 ? "pinkstar" : "heart");
        s.textContent = k < 0.7 ? "✦" : "♡";
        s.setAttribute("aria-hidden", "true");
        const side = rnd() < 0.5;
        s.style.left = `${side ? 1 + rnd() * 7 : 91 + rnd() * 7}%`;
        s.style.top = `${6 + rnd() * 86}%`;
        s.style.fontSize = `${10 + rnd() * 16}px`;
        s.style.animationDelay = `${(rnd() * 3).toFixed(2)}s`;
        sec.appendChild(s);
        added.push(s);
      }
    });
    return () => added.forEach((s) => s.remove());
  }, []);
  return null;
}
