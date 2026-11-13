"use client";

import { useState } from "react";
import { PhoneMockup } from "@/components/collage/PhoneMockup";
import { Peek } from "@/components/ui/Peek";
import type { Clip } from "@/content/site";

type Item = { id: string; title: string; points: string[]; body: string; video: Clip };

/** The four services. Hovering one spotlights it and floats a phone playing one of its videos beside the cursor. */
export function ServiceList({ items }: { items: Item[] }) {
  const [hover, setHover] = useState<Item | null>(null);
  return (
    <>
      <div className="svc-grid" onMouseLeave={() => setHover(null)}>
        {items.map((item, i) => (
          <article key={item.id} id={item.id} className="scroll-mt-24" onMouseEnter={() => setHover(item)}>
            <h3 className="svc-h3">
              {item.title} <sup>[{String(i + 1).padStart(2, "0")}]</sup>
            </h3>
            <ul className="svc-points">
              {item.points.map((p) => <li key={p}>{p}</li>)}
            </ul>
            <p className="mt-3.5 text-cream/85">{item.body}</p>
          </article>
        ))}
      </div>
      <Peek show={!!hover} offsetX={130} rotate={3}>
        {hover && <PhoneMockup key={hover.id} clip={hover.video} width={150} eager />}
      </Peek>
    </>
  );
}
