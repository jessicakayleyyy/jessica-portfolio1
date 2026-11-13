"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { PhoneMockup } from "@/components/collage/PhoneMockup";
import { Modal } from "@/components/ui/Modal";
import { Peek } from "@/components/ui/Peek";
import { site, type Brand } from "@/content/site";

const short = (r?: string) => r?.replace(/ views$/, "");
const where = (url: string) => (/tiktok\./.test(url) ? "TikTok" : /instagram\./.test(url) ? "Instagram" : "the post");

/**
 * "What's in my memory box?" Category tabs with a sliding underline, brand names set
 * large in serif. Hovering a brand with a video floats a phone preview beside the cursor;
 * clicking opens the video.
 */
export function MemoryBox() {
  const m = site.memoryBox;
  const reduce = useReducedMotion();
  const [catId, setCatId] = useState(m.categories[0].id);
  const [hover, setHover] = useState<Brand | null>(null);
  const [open, setOpen] = useState<Brand | null>(null);
  const cat = m.categories.find((c) => c.id === catId)!;

  // As the section comes into view, fetch every cover picture and the start of each video,
  // so hover previews show and play straight away
  const box = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const seen = new Set<string>();
      for (const c of m.categories) for (const b of c.brands) {
        const v = b.video;
        if (!v?.src || seen.has(v.src)) continue;
        seen.add(v.src);
        if (v.poster) new Image().src = v.poster;
        const pre = document.createElement("video");
        pre.preload = "metadata";
        pre.muted = true;
        pre.src = v.src;
      }
    }, { rootMargin: "600px" });
    io.observe(el);
    return () => io.disconnect();
  }, [m.categories]);

  return (
    <section ref={box} id="brands" className="section overflow-hidden" data-tone="light" aria-labelledby="brands-title">
      <div className="wrap">
        <div className="mb-head text-center">
          <p className="mono">{`{  ${m.eyebrow}  }`}</p>
          <h2 id="brands-title">
            {m.heading.before} <em>{m.heading.script}</em> {m.heading.after}
          </h2>
        </div>

        <div className="mb-tabs" role="tablist" aria-label="Brand categories">
          {m.categories.map((c, i) => {
            const on = c.id === catId;
            return (
              <button key={c.id} role="tab" aria-selected={on} aria-controls="mb-panel" onClick={() => setCatId(c.id)}>
                <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                {c.label}
                <sup>{c.brands.length}</sup>
                {on && <motion.span layoutId="mb-ink" className="mb-ink" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
              </button>
            );
          })}
        </div>

        <ul id="mb-panel" role="tabpanel" className="mb-names" onMouseLeave={() => setHover(null)}>
          <AnimatePresence mode="popLayout" initial={false}>
            {cat.brands.map((b, i) => {
              const has = Boolean(b.video || b.result);
              return (
                <motion.li
                  key={cat.id + b.name}
                  layout={!reduce}
                  initial={reduce ? false : { opacity: 0, y: 24, rotate: 2 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  exit={{ opacity: 0, y: -10, transition: { duration: 0.15 } }}
                  transition={{ type: "spring", stiffness: 220, damping: 20, delay: reduce ? 0 : i * 0.04 }}
                >
                  {has ? (
                    <button
                      className="mb-nm has"
                      data-cursor="watch"
                      onClick={() => { setHover(null); setOpen(b); }}
                      onMouseEnter={() => setHover(b)}
                      onMouseLeave={() => setHover(null)}
                      aria-label={`${b.name}: watch the video`}
                    >
                      {b.name}
                      <sup>▶{b.result && /views/.test(b.result) ? ` ${short(b.result)}` : ""}</sup>
                    </button>
                  ) : b.link ? (
                    <a className="mb-nm has" href={b.link} target="_blank" rel="noopener noreferrer" data-cursor="watch" aria-label={`${b.name}: watch on ${where(b.link)}`}>
                      {b.name}
                      <sup>↗</sup>
                    </a>
                  ) : (
                    <span className="mb-nm">{b.name}</span>
                  )}
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
        <p className="mono mx-auto mt-8 text-center text-muted">{m.note}</p>
      </div>

      <Peek show={!!hover}>
        {/* key: a fresh player for every brand, so the right video always loads and the last one stops */}
        {hover?.video && <PhoneMockup key={hover.name} clip={hover.video} width={140} eager />}
        <span className="peek-res">{hover?.result && /views/.test(hover.result) ? hover.result : "watch the video"}</span>
      </Peek>

      <Modal open={!!open} onClose={() => setOpen(null)} label={open ? `${open.name} content` : "Brand content"}>
        {open && (
          <div className="grid items-center gap-6 text-left sm:grid-cols-[150px_1fr]">
            <div className="justify-self-center">{open.video && <PhoneMockup key={open.name} clip={open.video} width={150} eager />}</div>
            <div>
              {open.logo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img className="mb-logo" src={open.logo} alt={`${open.name} logo`} />
              )}
              <p className="mono">{cat.label}</p>
              <h3 className="font-serif text-[2.2rem] leading-none">{open.name}</h3>
              {open.result && <p className="mt-3">{open.result}</p>}
              <div className="mt-5 flex flex-wrap gap-3">
                {open.link && (
                  <a className="cta cta-dark" href={open.link} target="_blank" rel="noopener noreferrer">Watch on {where(open.link)} ↗</a>
                )}
                {open.more?.map((m) => (
                  <a key={m.url} className="cta cta-line" href={m.url} target="_blank" rel="noopener noreferrer">{m.label} ↗</a>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
