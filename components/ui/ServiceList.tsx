"use client";

import { useState } from "react";
import { Photo } from "@/components/ui/Photo";
import { Peek } from "@/components/ui/Peek";
import type { Media } from "@/content/site";

type Item = { id: string; title: string; points: string[]; body: string; photo: Media };

/** The four services. Hovering one spotlights it and floats its photo beside the cursor. */
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
        {hover && <Photo media={hover.photo} sizes="170px" style={{ width: 170, height: 210, boxShadow: "0 30px 50px -20px rgba(0,0,0,.8)" }} />}
      </Peek>
    </>
  );
}
