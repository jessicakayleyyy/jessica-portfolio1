"use client";

import { useState } from "react";

/** Gender split donut. Hover a segment to see its value in the middle. */
export function Donut({ women, men }: { women: number; men: number }) {
  const [hover, setHover] = useState<"w" | "m" | null>(null);
  const show = hover === "m" ? { v: men, k: "Men" } : { v: women, k: "Women" };

  return (
    <div className="flex flex-wrap items-center gap-5">
      <div className="relative h-[120px] w-[120px] shrink-0">
        <svg width="120" height="120" viewBox="0 0 42 42" role="img" aria-label={`${women}% women, ${men}% men`}>
          <circle cx="21" cy="21" r="15.9" fill="none" stroke="#E6D6F0" strokeWidth={hover === "m" ? 9 : 7} className="transition-[stroke-width]" onMouseEnter={() => setHover("m")} onMouseLeave={() => setHover(null)} />
          <circle cx="21" cy="21" r="15.9" fill="none" stroke="#2A1E1C" strokeWidth={hover === "w" ? 9 : 7} strokeDasharray={`${women} ${100 - women}`} strokeDashoffset="25" className="transition-[stroke-width]" onMouseEnter={() => setHover("w")} onMouseLeave={() => setHover(null)} />
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center text-[1.25rem] leading-none font-bold" aria-hidden="true">
          <span>
            {show.v}%<small className="mono mt-1 block !text-[.55rem] text-muted">{show.k}</small>
          </span>
        </div>
      </div>
      <ul className="grid gap-2 text-[.9rem]">
        <li className="flex items-center gap-2"><b className="h-2.5 w-2.5 rounded-full bg-ink" />Women {women}%</li>
        <li className="flex items-center gap-2"><b className="h-2.5 w-2.5 rounded-full bg-[#E6D6F0]" />Men {men}%</li>
      </ul>
    </div>
  );
}
