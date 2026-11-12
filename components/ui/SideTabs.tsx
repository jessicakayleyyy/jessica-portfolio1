"use client";

import { useEffect, useState } from "react";

const TABS = [
  { id: "about", label: "About" },
  { id: "brands", label: "Brands" },
  { id: "numbers", label: "Numbers" },
  { id: "services", label: "Services" },
  { id: "content", label: "Content" },
  { id: "dress", label: "Dress me" },
  { id: "contact", label: "Contact" },
];

/** Numbered pill tabs down the left side (bottom bar on mobile). Turns dark over dark sections. */
export function SideTabs() {
  const [active, setActive] = useState<string | null>(null);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          setActive(el.id || null);
          setDark(el.dataset.tone === "dark");
        }),
      { rootMargin: "-49% 0px -50% 0px" },
    );
    document.querySelectorAll("main > section").forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <nav aria-label="Sections" className={`tabs ${dark ? "tabs-dark" : ""}`}>
      {TABS.map((t, i) => (
        <a key={t.id} href={`#${t.id}`} className={active === t.id ? "on" : ""} aria-current={active === t.id ? "location" : undefined}>
          <span className="tabs-n">{i + 1}</span>
          <span className="tabs-l">{t.label}</span>
        </a>
      ))}
    </nav>
  );
}
