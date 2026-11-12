"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { BODY, BRA, CATEGORIES, DEFS, FACE, HAIR_BACK, HAIR_FRONT, HEAD_EXTRAS, LAYER_ORDER, LEGWEAR, WARDROBE, drawn, type Category } from "@/components/collage/wardrobe";
import { lookStore } from "@/lib/look";
import { site } from "@/content/site";

type Outfit = { Tops: string | null; Bottoms: string | null; Dresses: string | null; Layers: string | null; Shoes: string | null; Extras: string[] };
const EMPTY: Outfit = { Tops: null, Bottoms: null, Dresses: null, Layers: null, Shoes: null, Extras: [] };
type Snap = { id: number; svg: string; caption: string; rotate: number };
const PICKS = ["Tops", "Bottoms", "Dresses", "Shoes", "Layers"] as const;

const wornIds = (o: Outfit) => [o.Tops, o.Bottoms, o.Dresses, o.Layers, o.Shoes, ...o.Extras].filter(Boolean) as string[];
const idsIn = (cat: Category) => Object.keys(WARDROBE).filter((id) => WARDROBE[id].cat === cat);
const pick = (cat: Category) => { const ids = idsIn(cat); return ids[Math.floor(Math.random() * ids.length)]; };

function outfitFor(look: string[]): Outfit {
  const o: Outfit = { ...EMPTY, Extras: [] };
  for (const id of look) {
    const c = WARDROBE[id]?.cat;
    if (!c) continue;
    if (c === "Extras") o.Extras.push(id);
    else o[c] = id;
  }
  return o;
}

/** Puts a piece on (force) or toggles it, following the paper-doll rules */
function withPiece(o: Outfit, id: string, force: boolean): Outfit {
  const c = WARDROBE[id].cat;
  const n: Outfit = { ...o, Extras: [...o.Extras] };
  if (c === "Extras") n.Extras = o.Extras.includes(id) && !force ? o.Extras.filter((x) => x !== id) : o.Extras.includes(id) ? o.Extras : [...o.Extras, id];
  else if (c === "Dresses") { n.Dresses = o.Dresses === id && !force ? null : id; if (n.Dresses) { n.Tops = null; n.Bottoms = null; } }
  else if (c === "Tops" || c === "Bottoms") { n[c] = o[c] === id && !force ? null : id; if (n[c]) n.Dresses = null; }
  else n[c] = o[c] === id && !force ? null : id;
  return n;
}

/** A garment sketch on the closet page, framed to its own bounds */
function Sketch({ svg }: { svg: string }) {
  const ref = useRef<SVGSVGElement>(null);
  useLayoutEffect(() => {
    const s = ref.current;
    const ink = s?.lastElementChild as SVGGraphicsElement | null;
    if (!s || !ink) return;
    const b = ink.getBBox();
    const p = 6;
    s.setAttribute("viewBox", `${b.x - p} ${b.y - p} ${b.width + p * 2} ${b.height + p * 2}`);
  }, [svg]);
  return <svg ref={ref} className="thumb wl" aria-hidden="true" dangerouslySetInnerHTML={{ __html: drawn(svg) }} />;
}

/**
 * "Jess's Dress-Up": a hand-drawn paper doll of Jess on lined notebook paper.
 * Pick a look, or drag pieces from the closet onto her (tap works too), shuffle, and snap a polaroid.
 */
export function DressMe() {
  const d = site.dressMe;
  const reduce = useReducedMotion();
  const start = d.occasions.find((o) => o.id === d.startWith) ?? d.occasions[0];
  const [outfit, setOutfit] = useState<Outfit>(() => outfitFor(start.look));
  const [occ, setOcc] = useState<string | null>(start.id);
  const [cat, setCat] = useState<Category>("Tops");
  const [snaps, setSnaps] = useState<Snap[]>([]);
  const [hop, setHop] = useState(0);
  const [flash, setFlash] = useState(0);
  const [dropOk, setDropOk] = useState(false);
  const [lifted, setLifted] = useState<string | null>(null);
  const prevWorn = useRef<Set<string>>(new Set(wornIds(outfit)));
  const dollRef = useRef<SVGSVGElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<SVGSVGElement | null>(null);
  const drag = useRef<{ id: string; x: number; y: number; moved: boolean } | null>(null);
  const looks = useRef(0);

  const worn = wornIds(outfit);
  const occasion = d.occasions.find((o) => o.id === occ);

  // Pieces that were just put on get a little "drop on" animation
  const layer = (id: string) => `<g class="${prevWorn.current.has(id) || reduce ? "" : "new"}">${drawn(WARDROBE[id].svg)}</g>`;
  const clothes = [...LEGWEAR.filter((id) => worn.includes(id)), ...LAYER_ORDER.flatMap((c) => idsIn(c).filter((id) => worn.includes(id)))].map(layer).join("");
  const bodyExtras = idsIn("Extras").filter((id) => worn.includes(id) && !HEAD_EXTRAS.includes(id) && !LEGWEAR.includes(id)).map(layer).join("");
  const headExtras = HEAD_EXTRAS.filter((id) => worn.includes(id)).map(layer).join("");
  useLayoutEffect(() => { prevWorn.current = new Set(worn); });

  // Once the visitor has styled her, share the look so it is pinned to the contact letter (and emailed to Jess)
  const touched = useRef(false);
  useEffect(() => {
    if (!touched.current || !dollRef.current) return;
    lookStore.set({
      svg: dollRef.current.innerHTML.replace(/class="new"/g, ""),
      name: occasion ? `${occasion.name} look` : "my own mix",
      items: worn.map((id) => WARDROBE[id].name),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [outfit, occ]);

  const put = (id: string, force = false) => { touched.current = true; setOutfit((o) => withPiece(o, id, force)); setOcc(null); };

  // Paper-doll drag: pick a piece up, carry it over Jess, let go to dress her
  const overStage = (x: number, y: number) => {
    const r = stageRef.current?.getBoundingClientRect();
    return !!r && x > r.left && x < r.right && y > r.top && y < r.bottom;
  };
  const onDown = (e: React.PointerEvent<HTMLButtonElement>, id: string) => {
    if (e.button !== 0) return;
    e.preventDefault(); // stop the browser's own drag / text selection, which would cancel ours and scroll the page
    drag.current = { id, x: e.clientX, y: e.clientY, moved: false };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const dr = drag.current;
    if (!dr) return;
    if (!dr.moved && Math.hypot(e.clientX - dr.x, e.clientY - dr.y) > 6) {
      dr.moved = true;
      const g = e.currentTarget.querySelector("svg")?.cloneNode(true) as SVGSVGElement | undefined;
      if (g) { g.setAttribute("class", "ghost wl"); document.body.appendChild(g); ghostRef.current = g; }
      setLifted(dr.id);
    }
    if (dr.moved && ghostRef.current) {
      ghostRef.current.style.left = `${e.clientX}px`;
      ghostRef.current.style.top = `${e.clientY}px`;
      setDropOk(overStage(e.clientX, e.clientY));
    }
  };
  const onUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    const dr = drag.current;
    if (!dr) return;
    if (dr.moved) { if (e.type === "pointerup" && overStage(e.clientX, e.clientY)) put(dr.id, true); }
    else if (e.type === "pointerup") put(dr.id);
    ghostRef.current?.remove();
    ghostRef.current = null;
    drag.current = null;
    setLifted(null);
    setDropOk(false);
  };

  // "Click the arrows for more choices!": cycle through each category (including "none")
  const cycle = (c: (typeof PICKS)[number], d: number) => {
    touched.current = true;
    const ids = idsIn(c);
    const cur = outfit[c];
    let i = (cur ? ids.indexOf(cur) : -1) + d;
    if (i < -1) i = ids.length - 1;
    if (i >= ids.length) i = -1;
    if (i === -1) { setOutfit((o) => ({ ...o, [c]: null })); setOcc(null); }
    else put(ids[i], true);
  };

  const shuffle = () => {
    touched.current = true;
    const o: Outfit = { ...EMPTY, Extras: [], Shoes: pick("Shoes") };
    if (Math.random() < 0.35) o.Dresses = pick("Dresses");
    else { o.Tops = pick("Tops"); o.Bottoms = pick("Bottoms"); }
    if (Math.random() < 0.35) o.Layers = pick("Layers");
    o.Extras = idsIn("Extras").filter(() => Math.random() < 0.3);
    setOutfit(o);
    setOcc(null);
    setHop((h) => h + 1);
  };

  const snap = () => {
    if (!dollRef.current) return;
    looks.current += 1;
    setFlash((f) => f + 1);
    const svg = dollRef.current.innerHTML.replace(/class="new"/g, "");
    const caption = `Look ${looks.current} · ${occasion ? occasion.name.toLowerCase() : "my own mix"}`;
    setSnaps((s) => [...s, { id: looks.current, svg, caption, rotate: Math.random() * 12 - 6 }].slice(-3));
  };

  return (
    <section id="dress" className="section dress" data-tone="light" aria-labelledby="dress-title">
      <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
        <defs dangerouslySetInnerHTML={{ __html: DEFS }} />
      </svg>
      <div className="wrap">
        <div className="dress-head">
          <p className="mono">{`{  ${d.eyebrow}  }`}</p>
          <h2 id="dress-title">{d.title}</h2>
          <p className="sub">{d.intro}</p>
        </div>

        <div className="dress-grid">
          <div className="stage-wrap">
            <div className="stage" ref={stageRef}>
              <span className="spot" />
              <p className="look-name">
                {occasion ? `${occasion.name} look` : "my own mix"}
                <small>Look {looks.current + 1}</small>
              </p>
              <span className="puddle" />
              <svg
                key={hop}
                ref={dollRef}
                className={`doll wl ${hop && !reduce ? "hop" : ""} ${dropOk ? "drop-ok" : ""}`}
                viewBox="40 14 120 440"
                role="img"
                aria-label={`Illustrated Jess wearing: ${worn.map((id) => WARDROBE[id].name).join(", ") || "her basics"}`}
                data-cursor="twirl"
                onClick={() => setHop((h) => h + 1)}
                dangerouslySetInnerHTML={{ __html: HAIR_BACK + BODY + (outfit.Tops || outfit.Dresses ? "" : BRA) + FACE + clothes + bodyExtras + HAIR_FRONT + headExtras }}
              />
              <span className="sig">Jess</span>
              {flash > 0 && <div key={flash} className="flash go" />}
              <div className="prints" aria-live="polite">
                {snaps.map((s) => (
                  <figure key={s.id} className="snap" style={{ rotate: `${s.rotate}deg` }}>
                    <div className="img">
                      <svg className="wl" viewBox="40 14 120 440" aria-hidden="true" dangerouslySetInnerHTML={{ __html: s.svg }} />
                    </div>
                    <figcaption>{s.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
            <div className="pickers">
              <p className="pick-hint">click the arrows for more choices!</p>
              {PICKS.map((c) => {
                const id = outfit[c];
                return (
                  <div key={c} className="pick">
                    <button type="button" className="arr" aria-label={`Previous ${c.toLowerCase()}`} onClick={() => cycle(c, -1)}>◀</button>
                    <span className="pick-name"><small>{c.toLowerCase()}</small><b>{id ? WARDROBE[id].name : "none"}</b></span>
                    <button type="button" className="arr" aria-label={`Next ${c.toLowerCase()}`} onClick={() => cycle(c, 1)}>▶</button>
                  </div>
                );
              })}
            </div>
            <div className="mirror-btns">
              <button type="button" className="cta cta-line" onClick={shuffle} data-cursor="shuffle">Shuffle</button>
              <button type="button" className="cta cta-line" onClick={() => { setOutfit({ ...EMPTY, Extras: [] }); setOcc(null); }}>Start over</button>
              <button type="button" className="cta cta-dark" onClick={snap} data-cursor="snap">Snap a pic</button>
            </div>
          </div>

          <div className="closet">
            <span className="mono label">Dress me for</span>
            <div className="occasions">
              {d.occasions.map((o) => (
                <button key={o.id} type="button" aria-pressed={occ === o.id} onClick={() => { touched.current = true; setOutfit(outfitFor(o.look)); setOcc(o.id); }}>
                  {o.name}
                </button>
              ))}
            </div>

            <div className="cats" role="tablist" aria-label="Wardrobe">
              {CATEGORIES.map((c) => (
                <button key={c} type="button" role="tab" aria-selected={cat === c} onClick={() => setCat(c)}>{c}</button>
              ))}
            </div>
            <p className="drag-hint">Drag a piece onto me, or tap to try it on.</p>
            <div className="items" role="tabpanel" key={cat}>
              {idsIn(cat).map((id, i) => (
                <button
                  key={id}
                  type="button"
                  className={`item ${lifted === id ? "lifted" : ""}`}
                  aria-pressed={worn.includes(id)}
                  aria-label={`${WARDROBE[id].name}: tap to wear, or drag onto Jess`}
                  data-cursor="drag"
                  style={{ animationDelay: `${i * 60}ms` }}
                  onPointerDown={(e) => onDown(e, id)}
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                  onPointerMove={onMove}
                  onPointerUp={onUp}
                  onPointerCancel={onUp}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); put(id); } }}
                >
                  <Sketch svg={WARDROBE[id].svg} />
                  <span className="nm">{WARDROBE[id].name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
