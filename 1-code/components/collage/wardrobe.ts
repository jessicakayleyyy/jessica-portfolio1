/**
 * Jess's paper doll and wardrobe for the "Jess's Dress-Up" section, drawn like a fashion
 * illustration: every shape is drawn twice, a watercolour fill nudged off-register and a
 * wobbly ink line on top (see the .wl styles in globals.css and the filters in DEFS).
 * The wardrobe follows Jess's Style Mood Board (2000s/Y2K, girly, model off-duty).
 * ViewBox "40 14 120 440". Occasion presets live in content/site.ts → dressMe.
 */

export const CATEGORIES = ["Tops", "Bottoms", "Dresses", "Layers", "Shoes", "Extras"] as const;
export type Category = (typeof CATEGORIES)[number];
export type Garment = { cat: Category; name: string; svg: string };

/** Draw order for clothes, back to front */
export const LAYER_ORDER: Category[] = ["Shoes", "Bottoms", "Dresses", "Tops", "Layers"];
/** Extras that sit on the head, drawn over the front hair */
export const HEAD_EXTRAS = ["bow", "pinkshades", "blackshades", "bakerboy"];
/** The doll's drawing area (room above her head for buns and hats) */
export const DOLL_VIEWBOX = "40 -4 120 458";
/** Extras worn on the legs, drawn under everything else */
export const LEGWEAR = ["tights"];

/** Shared SVG definitions: hair gradient, fabric patterns, sketch + watercolour filters */
export const DEFS = `
    <linearGradient id="hairGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3E241B"/><stop offset=".45" stop-color="#5B3524"/><stop offset=".8" stop-color="#7E5236"/><stop offset="1" stop-color="#9C6B48"/></linearGradient>
    <linearGradient id="hairBlonde" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9A7448"/><stop offset=".45" stop-color="#D3AE72"/><stop offset="1" stop-color="#F1DCAA"/></linearGradient>
    <linearGradient id="hairBlack" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#151012"/><stop offset=".6" stop-color="#2A2124"/><stop offset="1" stop-color="#3E3236"/></linearGradient>
    <linearGradient id="hairCopper" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6E2E17"/><stop offset=".5" stop-color="#A8532A"/><stop offset="1" stop-color="#D2834E"/></linearGradient>
    <linearGradient id="hairPink" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C55C86"/><stop offset=".5" stop-color="#EE9DBB"/><stop offset="1" stop-color="#FAD0DF"/></linearGradient>
    <pattern id="mint" width="6" height="6" patternUnits="userSpaceOnUse"><rect width="6" height="6" fill="#fff"/><rect width="6" height="2.6" fill="#C6E6D7"/></pattern>
    <pattern id="floral" width="16" height="16" patternUnits="userSpaceOnUse"><rect width="16" height="16" fill="#FBF1E4"/><g fill="#F29AAF"><circle cx="4.5" cy="2.8" r="1.5"/><circle cx="6.2" cy="4.5" r="1.5"/><circle cx="4.5" cy="6.2" r="1.5"/><circle cx="2.8" cy="4.5" r="1.5"/></g><circle cx="4.5" cy="4.5" r=".9" fill="#F4C27A"/><g fill="#E25D6E"><circle cx="12" cy="10" r="1.6"/><circle cx="13.8" cy="11.8" r="1.6"/><circle cx="12" cy="13.6" r="1.6"/><circle cx="10.2" cy="11.8" r="1.6"/></g><circle cx="12" cy="11.8" r=".9" fill="#F4C27A"/><circle cx="12.5" cy="3.5" r="1.1" fill="#A9CDE8"/><path d="M7 12 q2 -2 3.5 -.5 M8 9 q1.5 0 2 1.5" stroke="#8DB48A" stroke-width=".7" fill="none"/></pattern>
    <pattern id="leopard" width="8" height="7" patternUnits="userSpaceOnUse"><rect width="8" height="7" fill="#DCA864"/><circle cx="2" cy="2.4" r=".6" fill="#B8743A"/><circle cx="5.8" cy="5.5" r=".6" fill="#B8743A"/><g fill="#3A2416"><path d="M1 1.2 q1 -1 2.2 0 q-.4 .5 -1.1 .4 q-.7 0 -1.1 -.4z"/><path d="M3.6 2.2 q.7 .7 .1 1.7 q-.4 -.6 -.1 -1.7z"/><path d="M.6 2.6 q-.3 1 .5 1.5 q.1 -.8 -.5 -1.5z"/><path d="M4.6 4.6 q1 -1 2.2 0 q-.4 .5 -1.1 .4 q-.7 0 -1.1 -.4z"/><path d="M7.1 5.5 q.6 .7 0 1.4 q-.4 -.6 0 -1.4z"/><path d="M4.2 5.8 q-.2 .9 .5 1.2 q.1 -.7 -.5 -1.2z"/><circle cx="6.5" cy="1.3" r=".45"/><circle cx="2.2" cy="5.7" r=".4"/></g></pattern>
    <pattern id="blacklace" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="#2B2526"/><circle cx="4" cy="4" r="2.4" fill="none" stroke="#5E5254" stroke-width=".5"/><circle cx="4" cy="4" r=".8" fill="#4A4143"/><circle cx="0" cy="0" r="1.1" fill="none" stroke="#4A4143" stroke-width=".4"/><circle cx="8" cy="8" r="1.1" fill="none" stroke="#4A4143" stroke-width=".4"/></pattern>
    <pattern id="pinkstripe" width="6" height="6" patternUnits="userSpaceOnUse"><rect width="6" height="6" fill="#fff"/><rect width="6" height="3" fill="#F4A9C3"/></pattern>
    <pattern id="gingham" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="#fff"/><rect width="4" height="8" fill="#F4A9C3" fill-opacity=".5"/><rect width="8" height="4" fill="#F4A9C3" fill-opacity=".5"/></pattern>
    <pattern id="hotdots" width="7" height="7" patternUnits="userSpaceOnUse"><rect width="7" height="7" fill="#E8508F"/><circle cx="3.5" cy="3.5" r="1.5" fill="#fff"/></pattern>
    <pattern id="mintdots" width="7" height="7" patternUnits="userSpaceOnUse"><rect width="7" height="7" fill="#C3E7DA"/><circle cx="3.5" cy="3.5" r="1.3" fill="#2B2526"/></pattern>
    <pattern id="bwdots" width="7" height="7" patternUnits="userSpaceOnUse"><rect width="7" height="7" fill="#2B2526"/><circle cx="3.5" cy="3.5" r="1.5" fill="#fff"/></pattern>
    <pattern id="pinkdots" width="5" height="5" patternUnits="userSpaceOnUse"><rect width="5" height="5" fill="#F6C1D2"/><circle cx="2.5" cy="2.5" r=".9" fill="#6A3D3A"/></pattern>
    <pattern id="plaid" width="10" height="10" patternUnits="userSpaceOnUse"><rect width="10" height="10" fill="#F3CAD5"/><rect y="4" width="10" height="1.4" fill="#8A5A50" fill-opacity=".45"/><rect x="4" width="1.4" height="10" fill="#8A5A50" fill-opacity=".45"/><rect y="8.3" width="10" height=".5" fill="#fff"/><rect x="8.3" width=".5" height="10" fill="#fff"/></pattern>
    <pattern id="cow" width="12" height="9" patternUnits="userSpaceOnUse"><rect width="12" height="9" fill="#FBF7EC"/><path d="M1 1 q2.5 -1 3.5 1.2 q-.5 2 -2.6 1.6 q-1.4 -.4 -.9 -2.8z M7.5 4.5 q2.4 -.6 3.2 1.4 q-.6 1.8 -2.6 1.4 q-1.4 -.8 -.6 -2.8z" fill="#2B2526"/></pattern>
    <pattern id="beads" width="6" height="6" patternUnits="userSpaceOnUse"><rect width="6" height="6" fill="#F8EEDC"/><circle cx="1.5" cy="1.5" r="1" fill="#fff" stroke="#E2D3B8" stroke-width=".3"/><circle cx="4.5" cy="4.5" r="1" fill="#fff" stroke="#E2D3B8" stroke-width=".3"/><circle cx="4.5" cy="1.5" r=".5" fill="#F4C9D6"/></pattern>
    <clipPath id="feetOnly" clipPathUnits="userSpaceOnUse"><rect x="0" y="427" width="200" height="40"/></clipPath>
    <pattern id="aquadots" width="6" height="6" patternUnits="userSpaceOnUse"><rect width="6" height="6" fill="#7FD6D2"/><circle cx="3" cy="3" r="1.3" fill="#fff"/></pattern>
    <pattern id="dots" width="7" height="7" patternUnits="userSpaceOnUse"><rect width="7" height="7" fill="#fff"/><circle cx="3.5" cy="3.5" r="1.5" fill="#2E2526"/></pattern>
    
    <filter id="sketch" x="-6%" y="-6%" width="112%" height="112%">
      <feTurbulence type="fractalNoise" baseFrequency=".045" numOctaves="2" seed="2" result="t"/>
      <feDisplacementMap in="SourceGraphic" in2="t" scale="2.4" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    
    <filter id="wash" x="-8%" y="-8%" width="116%" height="116%">
      <feTurbulence type="fractalNoise" baseFrequency=".05" numOctaves="2" seed="5" result="t"/>
      <feDisplacementMap in="SourceGraphic" in2="t" scale="3.2" xChannelSelector="R" yChannelSelector="G" result="d"/>
      <feTurbulence type="fractalNoise" baseFrequency=".9 .18" numOctaves="2" seed="9" result="g"/>
      <feColorMatrix in="g" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  1.25 0 0 0 -.68" result="w"/>
      <feComposite in="w" in2="d" operator="in" result="ws"/>
      <feMerge><feMergeNode in="d"/><feMergeNode in="ws"/></feMerge>
    </filter>
    
    <filter id="hairwash" x="-6%" y="-6%" width="112%" height="112%">
      <feTurbulence type="fractalNoise" baseFrequency=".04" numOctaves="2" seed="7" result="t"/>
      <feDisplacementMap in="SourceGraphic" in2="t" scale="2" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    
    <filter id="soft" x="-8%" y="-8%" width="116%" height="116%">
      <feTurbulence type="fractalNoise" baseFrequency=".05" numOctaves="2" seed="5" result="t"/>
      <feDisplacementMap in="SourceGraphic" in2="t" scale="2.6" xChannelSelector="R" yChannelSelector="G" result="d"/>
      <feTurbulence type="fractalNoise" baseFrequency=".6 .12" numOctaves="2" seed="4" result="g"/>
      <feColorMatrix in="g" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  .9 0 0 0 -.55" result="w"/>
      <feComposite in="w" in2="d" operator="in" result="ws"/>
      <feMerge><feMergeNode in="d"/><feMergeNode in="ws"/></feMerge>
    </filter>
`;

const SKIN='#F5D8C8',HAIR='url(#hairGrad)';
// Every shape is drawn twice: a watercolour fill nudged off-register, then a wobbly ink line on top
export const drawn = (s: string, f = "wash") =>`<g class="fill" filter="url(#${f})" transform="translate(1.3 .9)">${s}</g><g class="ink" filter="url(#sketch)">${s}</g>`;
// Body parts are drawn one at a time so each outline only sits over its own colour
const parts = (s: string) =>s.trim().split(/\n\s*/).map(p=>drawn(p,'soft')).join('');
const pearls=(()=>{let s='';for(let i=0;i<=12;i++){const t=i/12,x=(1-t)*(1-t)*86+2*(1-t)*t*100+t*t*114,y=(1-t)*(1-t)*91+2*(1-t)*t*106+t*t*91;s+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="1.7" fill="#fff"/>`}return s})();
const row = (n: number, x0: number, step: number, y: number, r: number, fill: string) =>Array.from({length:n},(_,i)=>`<circle cx="${x0+i*step}" cy="${y}" r="${r}" fill="${fill}"/>`).join('');
// Jess: full soft waves, dark chestnut at the roots melting to caramel ends, middle part, warm smile, silver hoops.
// Hair is drawn smooth (no grain) with a soft brown outline, fine strands and a few light highlights.
const hairLayer = (s: string) =>`<g class="hair">${s.trim().split(/\n\s*/).map(p=>drawn(p,'hairwash')).join('')}</g>`;
const WAVES_BACK = `
  <path fill="${HAIR}" d="M100 21 C74 21 66 42 67 62 C58 74 66 86 59 98 C52 110 62 122 55 134 C48 146 60 158 53 170 C49 180 56 192 64 196 C72 199 80 192 86 184 L88 96 L112 96 L114 184 C120 192 128 199 136 196 C144 192 151 180 147 170 C140 158 152 146 145 134 C138 122 148 110 141 98 C134 86 142 74 134 62 C134 42 126 21 100 21 Z"/>
  <path fill="none" style="stroke:#3E241B;stroke-opacity:.45;stroke-width:.6" d="M66 72 C60 84 67 94 61 106 C55 118 64 128 58 140 C52 152 62 162 57 174 M134 72 C140 84 133 94 139 106 C145 118 136 128 142 140 C148 152 138 162 143 174"/>
  <path fill="none" style="stroke:#E2BC92;stroke-opacity:.75;stroke-width:1.1" d="M63 104 C59 114 64 122 60 132 M137 104 C141 114 136 122 140 132 M57 160 C55 168 58 176 62 184 M143 160 C145 168 142 176 138 184"/>
`;
export const HAIR_BACK = hairLayer(WAVES_BACK);
const BODY_PARTS = parts(`
  <path fill="${SKIN}" d="M70 97 Q60 104 59 130 Q57 160 58 172 Q58 205 60 236 L68 236 Q68 205 67 172 Q70 150 74 118 Z M130 97 Q140 104 141 130 Q143 160 142 172 Q142 205 140 236 L132 236 Q132 205 133 172 Q130 150 126 118 Z"/>
  <path fill="${SKIN}" d="M60 236 Q58 248 62 254 Q66 254 68 236 Z M140 236 Q142 248 138 254 Q134 254 132 236 Z"/>
  <path fill="${SKIN}" d="M93 70 L93 89 Q72 90 68 100 L77 112 Q80 140 84 165 Q76 185 74 205 Q78 265 82 320 Q85 370 89 422 L96 422 Q95 370 94 320 Q97 270 99 232 L101 232 Q103 270 106 320 Q105 370 104 422 L111 422 Q115 370 118 320 Q122 265 126 205 Q124 185 116 165 Q120 140 123 112 L132 100 Q128 90 107 89 L107 70 Z"/>
  <path fill="${SKIN}" d="M88 416 L96 416 Q97.5 430 94.5 445 Q92 450 89.5 445 Q86.5 430 88 416 Z M112 416 L104 416 Q102.5 430 105.5 445 Q108 450 110.5 445 Q113.5 430 112 416 Z"/>
  <path fill="${SKIN}" d="M80 47 C80 33 89 27 100 27 C111 27 120 33 120 47 C120 62 112 76 100 78 C88 76 80 62 80 47 Z"/>`);
// Smooth, rounded shoulders: covers the joins between arms and body, which show once the hair is up
const SHOULDERS = `<g class="fill" filter="url(#soft)" transform="translate(1.3 .9)"><path fill="${SKIN}" d="M93 87 Q74 88.5 68 96.5 Q61 103 59.6 116 L66 119 L75 118.5 L79.5 111 L93 106 Z M107 87 Q126 88.5 132 96.5 Q139 103 140.4 116 L134 119 L125 118.5 L120.5 111 L107 106 Z"/></g>` +
  `<g class="ink" filter="url(#sketch)"><path fill="none" d="M93 89 Q74 89.6 68.4 96.8 Q61.6 103.4 60 118 M107 89 Q126 89.6 131.6 96.8 Q138.4 103.4 140 118 M74 119.5 Q76 116.5 78.4 114 M126 119.5 Q124 116.5 121.6 114"/></g>`;
export const BODY = BODY_PARTS + SHOULDERS;
// Leopard-print bra: her base layer, hidden as soon as she has a top or dress on
export const BRA = drawn(`<path fill="none" d="M88 106 L90 89 M112 106 L110 89"/><path fill="url(#leopard)" d="M83 107 Q91 101 99.5 109 L99.5 121 Q91 125 83 121 Z M117 107 Q109 101 100.5 109 L100.5 121 Q109 125 117 121 Z"/><path fill="url(#leopard)" d="M83 120.5 Q100 127 117 120.5 L117 125 Q100 131 83 125 Z"/>`,"soft");
/** Jess's features (brows, eyes, nose). Blush, lips and everything else come from the chosen MAKEUP look. */
export const FACE = `<g class="face">
  <path fill="none" style="stroke:#5A3A2C;stroke-width:1.2" d="M86.2 44.6 Q91 41.6 96.4 43.4 M103.6 43.4 Q109 41.6 113.8 44.6"/>
  <circle cx="91.9" cy="52.3" r="2.4" fill="#5C3A28"/><circle cx="109.3" cy="52.3" r="2.4" fill="#5C3A28"/>
  <circle cx="92.7" cy="51.4" r=".75" fill="#fff"/><circle cx="110.1" cy="51.4" r=".75" fill="#fff"/>
  <path fill="none" style="stroke:#2E1C18;stroke-width:1.5" d="M86.3 51.8 Q91 47.6 96.2 50.8 M103.8 50.8 Q109 47.6 113.7 51.8"/>
  <path fill="none" style="stroke:#2E1C18;stroke-width:.8" d="M86.3 51.8 l-1.7 -1.3 M87.1 50.5 l-1.3 -1.8 M113.7 51.8 l1.7 -1.3 M112.9 50.5 l1.3 -1.8"/>
  <path fill="none" style="stroke:#3B2B2B;stroke-width:.45;stroke-opacity:.5" d="M87.5 54 Q91.5 55.8 95.3 54 M104.7 54 Q108.5 55.8 112.5 54"/>
  <path fill="none" style="stroke:#3B2B2B;stroke-width:.7" d="M99.8 54.5 Q98.6 60 100.8 61.4"/></g>`;

/* ── Makeup looks (from Jess's makeup mood board) ─────────────────
 * under: drawn on the skin, beneath the eyes (shadow, blush, freckles, bronzer)
 * over:  drawn on top of the eyes (liner, lashes, lips, gloss, gems)
 * top:   drawn over the hair (e.g. the 2000s headband)
 */
const lips = (fill: string, line: string, gloss = ".85") =>
  `<path fill="${fill}" style="stroke:${line};stroke-width:.5" d="M94 66 Q97 63.6 100 65 Q103 63.6 106 66 Q100 67.6 94 66 Z"/>` +
  `<path fill="${fill}" style="stroke:${line};stroke-width:.5" d="M94.3 66.1 Q100 72.6 105.7 66.1 Q100 68 94.3 66.1 Z"/>` +
  `<ellipse cx="101.6" cy="69" rx="1.6" ry=".65" fill="#fff" fill-opacity="${gloss}"/>`;
const glossy = (fill: string, line: string) => lips(fill, line, "1") + `<ellipse cx="97.6" cy="65.4" rx="1.1" ry=".4" fill="#fff" fill-opacity=".8"/>`;
const blush = (fill: string, op: string, r = 4.8, cy = 61.6) =>
  `<circle cx="87.4" cy="${cy}" r="${r}" fill="${fill}" fill-opacity="${op}"/><circle cx="112.6" cy="${cy}" r="${r}" fill="${fill}" fill-opacity="${op}"/>`;
const FRECKLE_PTS = [[85, 58.5], [87.5, 57.6], [89.6, 59.2], [86.4, 60.6], [96.6, 57.4], [98.4, 56.6], [101.8, 56.6], [103.6, 57.4], [100.1, 58.2], [110.4, 59.2], [112.5, 57.6], [115, 58.5], [113.6, 60.6], [91.2, 58.1], [108.8, 58.1]];
const freckles = (op = ".75", r = ".42") => FRECKLE_PTS.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#9A5F45" fill-opacity="${op}"/>`).join("");
const lids = (fill: string, op: string, rx = 6, ry = 3.6, cy = 49.4) =>
  `<ellipse cx="91.4" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}" fill-opacity="${op}"/><ellipse cx="109.8" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}" fill-opacity="${op}"/>`;
const sparkles = (pts: number[][], fill = "#fff") => pts.map(([x, y, r = .5]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`).join("");
const lashes = (w = ".7", long = 1) => {
  const L = (x: number, y: number, dx: number, dy: number) => `M${x} ${y} l${(dx * long).toFixed(2)} ${(dy * long).toFixed(2)}`;
  return `<path fill="none" style="stroke:#1E1414;stroke-width:${w};stroke-linecap:round" d="${[
    L(88, 50.2, -.8, -2.4), L(89.6, 49.1, -.4, -2.6), L(91.3, 48.6, 0, -2.7), L(93, 48.8, .4, -2.6), L(94.7, 49.6, .8, -2.4),
    L(105.3, 49.6, -.8, -2.4), L(107, 48.8, -.4, -2.6), L(108.7, 48.6, 0, -2.7), L(110.4, 49.1, .4, -2.6), L(112, 50.2, .8, -2.4),
  ].join(" ")}"/>`;
};
const lowerLashes = `<path fill="none" style="stroke:#1E1414;stroke-width:.45;stroke-linecap:round" d="M88.6 54.4 l-.5 1.3 M90.6 55.1 l-.2 1.4 M92.7 55.1 l.2 1.4 M94.6 54.5 l.5 1.3 M105.4 54.5 l-.5 1.3 M107.3 55.1 l-.2 1.4 M109.4 55.1 l.2 1.4 M111.4 54.4 l.5 1.3"/>`;
const wings = (w = "1.6") => `<path fill="none" style="stroke:#140D0D;stroke-width:${w};stroke-linecap:round;stroke-linejoin:round" d="M87 51.6 Q91 47.9 96 50.6 L97.6 48.6 M113 51.6 Q109 47.9 104 50.6 L102.4 48.6"/><path fill="#140D0D" d="M85.6 52 L82.4 48.6 L87.4 50.6 Z M114.4 52 L117.6 48.6 L112.6 50.6 Z"/>`;

export const MAKEUP = [
  { id: "natural", name: "Everyday Jess", swatch: "#F29AB0",
    under: blush("#F29AB0", ".42"), over: lips("#E07A92", "#A2505F") },
  { id: "rosy", name: "Rosy freckles", swatch: "#E77D92",
    under: blush("#E9788F", ".5", 6.2, 60.5) + `<ellipse cx="100" cy="58" rx="3.4" ry="1.6" fill="#E9788F" fill-opacity=".35"/>` + freckles(),
    over: lips("#C97683", "#9E5560", ".5") },
  { id: "bronzed", name: "Bronzed lashes", swatch: "#C98B62",
    under: blush("#C98B62", ".38", 5.6, 63) + `<path fill="#C98B62" fill-opacity=".3" d="M81 58 Q84 66 90 70 Q85 64 84 57 Z M119 58 Q116 66 110 70 Q115 64 116 57 Z"/>` + freckles(".5", ".38") + lids("#B0785A", ".35", 5.4, 3),
    over: lashes(".6", 1) + lowerLashes + glossy("#D9A08E", "#A8705E") },
  { id: "icy", name: "Icy silver", swatch: "#D7E2EC",
    under: lids("#E6EEF6", ".8", 6.6, 4.4, 47.8) + lids("#B9C8D8", ".45", 5, 2.6, 49.6) + freckles(".45", ".36") + blush("#F2A9B0", ".22"),
    over: sparkles([[87, 46, .45], [91, 44.6, .55], [95.6, 46.2, .4], [105, 46.2, .4], [109.6, 44.6, .55], [113.6, 46, .45], [93, 47.2, .35], [107.6, 47.2, .35]]) + lashes(".45", .8) + glossy("#D9A592", "#A8705E") },
  { id: "y2k", name: "2000s glam", swatch: "#2B2526",
    under: blush("#D8907C", ".3", 5, 62.5) + lids("#C9A08A", ".3", 5.4, 2.8),
    over: wings() + `<path fill="none" style="stroke:#fff;stroke-width:.6;stroke-opacity:.9" d="M88.4 54.2 Q91.6 55.6 94.8 54.2 M105.2 54.2 Q108.4 55.6 111.6 54.2"/>` + lashes(".5", .8) + glossy("#D49A8A", "#A06A5C"),
    top: `<path fill="none" style="stroke:#1C1718;stroke-width:4.2;stroke-linecap:round" d="M78.6 44 C78 28 88 21.6 100 21.6 C112 21.6 122 28 121.4 44"/>` },
  { id: "smoky", name: "Smoky silver", swatch: "#77737C",
    under: lids("#4D4852", ".55", 6.8, 4.2, 49.8) + `<ellipse cx="91.6" cy="54.8" rx="4.6" ry="1.4" fill="#4D4852" fill-opacity=".45"/><ellipse cx="109.6" cy="54.8" rx="4.6" ry="1.4" fill="#4D4852" fill-opacity=".45"/>` + lids("#D8DDE4", ".75", 3.2, 2, 48.8) + freckles(".6", ".4") + blush("#D9907E", ".25"),
    over: sparkles([[90, 47.4, .45], [92.6, 46.8, .4], [108.4, 46.8, .4], [111, 47.4, .45]]) + lashes(".55", .9) + lowerLashes + glossy("#D6A090", "#A06A5C") + `<circle cx="97.6" cy="42.6" r=".9" fill="#fff" style="stroke:#C9D2DC;stroke-width:.3"/>` },
  { id: "fairy", name: "Pink fairy", swatch: "#F29AC0",
    under: lids("#F4A6C8", ".6", 6.4, 4, 48.8) + lids("#FBD3E4", ".6", 3.4, 2, 48.4) + blush("#F29AB0", ".35"),
    over: sparkles([[88.6, 45.6], [92, 45, .4], [95, 46, .45], [106, 46, .45], [109, 45, .4], [112.4, 45.6], [84, 56, .4], [116, 56, .4]], "#FFF4FA") +
      `<path fill="none" style="stroke:#1E1414;stroke-width:.55;stroke-linecap:round" d="M86.2 51.6 C83.6 50.4 82.4 47.6 84.2 46.4 C85.6 45.6 86.8 47.2 85.6 48 M86.6 53.2 C84.2 55 84.6 58 86.6 58.2 C88 58.2 88 56.6 86.8 56.6 M113.8 51.6 C116.4 50.4 117.6 47.6 115.8 46.4 C114.4 45.6 113.2 47.2 114.4 48 M113.4 53.2 C115.8 55 115.4 58 113.4 58.2 C112 58.2 112 56.6 113.2 56.6"/>` +
      sparkles([[83.2, 50.2, .45], [83.6, 54.4, .4], [116.8, 50.2, .45], [116.4, 54.4, .4]], "#1E1414") + lashes(".45", .75) + lips("#EC8FAE", "#B95A7C") },
] as const;
export type MakeupId = (typeof MAKEUP)[number]["id"];
export const makeupFor = (id: MakeupId) => {
  const m: { under: string; over: string; top?: string } = MAKEUP.find((x) => x.id === id) ?? MAKEUP[0];
  return { under: `<g class="mu">${m.under}</g>`, over: `<g class="mu">${m.over}</g>`, top: m.top ? `<g class="mu">${m.top}</g>` : "" };
};
const WAVES_FRONT = `
  <path fill="${HAIR}" d="M78 52 C76 30 88 22 100 22 C112 22 124 30 122 52 C120 40 112 32 101 31 L99 31 C88 32 80 40 77 52 Z"/>
  <path fill="${HAIR}" d="M99 31 C88 32 79 40 77 54 C74 66 80 74 76 86 C72 98 80 108 76 120 C72 132 81 142 77 154 C74 164 79 174 84 178 C86 170 83 162 87 152 C91 140 84 130 88 118 C92 106 85 96 88 84 C89 76 82 66 82 56 C83 44 92 35 99 31 Z"/>
  <path fill="${HAIR}" d="M101 31 C112 32 121 40 123 54 C126 66 120 74 124 86 C128 98 120 108 124 120 C128 132 119 142 123 154 C126 164 121 174 116 178 C114 170 117 162 113 152 C109 140 116 130 112 118 C108 106 115 96 112 84 C111 76 118 66 118 56 C117 44 108 35 101 31 Z"/>
  <path fill="none" style="stroke:#3E241B;stroke-opacity:.45;stroke-width:.55" d="M82 50 C79 62 84 72 81 84 C78 96 85 106 81 118 C78 130 84 140 81 152 M118 50 C121 62 116 72 119 84 C122 96 115 106 119 118 C122 130 116 140 119 152 M96 33 C90 36 85 42 83 50 M104 33 C110 36 115 42 117 50"/>
  <path fill="none" style="stroke:#E2BC92;stroke-opacity:.8;stroke-width:1.1" d="M82 128 C80 136 84 144 82 150 M118 128 C120 136 116 144 118 150 M92 25 C96 23 104 23 108 25"/>
  <circle cx="80.5" cy="69" r="3.6" fill="none" style="stroke:#AEB5BF;stroke-width:1.3"/><circle cx="119.5" cy="69" r="3.6" fill="none" style="stroke:#AEB5BF;stroke-width:1.3"/>
  <path fill="none" style="stroke:#fff;stroke-width:.6" d="M78 67.4 Q79.4 65.6 81.4 65.6 M117 67.4 Q118.4 65.6 120.4 65.6"/>
`;
export const HAIR_FRONT = hairLayer(WAVES_FRONT);

// Black lace briefs with a scalloped trim and a tiny pink bow. Hidden once she has bottoms or a dress on.
const scallops = (x0: number, y0: number, cx: number, cy: number, x1: number, y1: number, n: number) => {
  let s = "";
  for (let i = 0; i <= n; i++) { const t = i / n, a = (1 - t) * (1 - t), b = 2 * t * (1 - t), c = t * t; s += `<circle cx="${(a * x0 + b * cx + c * x1).toFixed(1)}" cy="${(a * y0 + b * cy + c * y1).toFixed(1)}" r="1.15" fill="#2B2526"/>`; }
  return s;
};
export const UNDIES = drawn(`<path fill="url(#blacklace)" d="M76.5 186 Q100 191 123.5 186 L125.5 199 Q111 207 102.5 229 L97.5 229 Q89 207 74.5 199 Z"/>` +
  scallops(76.5, 186, 100, 191, 123.5, 186, 16) + scallops(125.5, 199, 111, 207, 102.5, 229, 9) + scallops(74.5, 199, 89, 207, 97.5, 229, 9), "soft") +
  `<g><path fill="#F4A9C3" style="stroke:#C9577F;stroke-width:.4" d="M100 190.3 L96.4 188.3 L96.6 192.4 Z M100 190.3 L103.6 188.3 L103.4 192.4 Z"/><circle cx="100" cy="190.3" r=".95" fill="#E8789F"/></g>`;

/**
 * Jess's tattoos, drawn on the skin (clothes cover them naturally).
 * Add small line-art shapes here in the doll's coordinates (see DOLL_VIEWBOX).
 */
export const TATTOOS = "";

/* ── Hair: style + colour pickers (styles from Jess's hairstyle mood board) ── */
export const HAIR_STYLES = [
  { id: "blowout", name: "90s blowout" },
  { id: "updo", name: "Messy updo" },
  { id: "layers", name: "Layered blowout" },
  { id: "highbun", name: "High bun + fringe" },
  { id: "halfbuns", name: "Half-up buns" },
  { id: "spiky", name: "Spiky half-up" },
] as const;
export const HAIR_COLOURS = [
  { id: "chestnut", name: "Chestnut", swatch: "#6B4029", grad: "hairGrad", dark: "#3E241B", light: "#E2BC92" },
  { id: "blonde", name: "Blonde", swatch: "#D9B57A", grad: "hairBlonde", dark: "#7A5A34", light: "#FFF3D2" },
  { id: "black", name: "Jet black", swatch: "#231B1E", grad: "hairBlack", dark: "#000000", light: "#7D6C73" },
  { id: "copper", name: "Copper", swatch: "#B05A2E", grad: "hairCopper", dark: "#4A1E0E", light: "#F4B585" },
  { id: "pink", name: "Pink", swatch: "#EE9DBB", grad: "hairPink", dark: "#A84470", light: "#FFE9F1" },
] as const;
export type HairStyle = (typeof HAIR_STYLES)[number]["id"];
export type HairColour = (typeof HAIR_COLOURS)[number]["id"];

const STRAND = 'style="stroke:#3E241B;stroke-opacity:.45;stroke-width:.55"';
const SHINE = 'style="stroke:#E2BC92;stroke-opacity:.8;stroke-width:1.1"';
const WISP = 'style="stroke:#3E241B;stroke-opacity:.7;stroke-width:.6"';
const TIE = 'fill="#F4A9C3" style="stroke:#C9577F;stroke-width:.45"';
const HOOPS = `  <circle cx="80.5" cy="69" r="3.6" fill="none" style="stroke:#AEB5BF;stroke-width:1.3"/><circle cx="119.5" cy="69" r="3.6" fill="none" style="stroke:#AEB5BF;stroke-width:1.3"/>
  <path fill="none" style="stroke:#fff;stroke-width:.6" d="M78 67.4 Q79.4 65.6 81.4 65.6 M117 67.4 Q118.4 65.6 120.4 65.6"/>`;
/** Hair over the top of the head with a middle part */
const CAP = `<path fill="${HAIR}" d="M78 52 C76 30 88 22 100 22 C112 22 124 30 122 52 C120 40 112 32 101 31 L99 31 C88 32 80 40 77 52 Z"/>`;
/** Pulled-back hair (no part) for updos */
const SLEEK = `<path fill="${HAIR}" d="M78.5 50 C77 30 88 22 100 22 C112 22 123 30 121.5 50 C120 40 112 33 100 33 C88 33 80 40 78.5 50 Z"/>
  <path fill="none" ${STRAND} d="M84 40 C88 32 94 28 99 26 M116 40 C112 32 106 28 101 26 M90 36 C94 30 98 28 100 27"/>`;
const BACK_CAP = `<path fill="${HAIR}" d="M100 21 C80 21 74 36 76 54 C77 60 79 63 82.5 63.5 L117.5 63.5 C121 63 123 60 124 54 C126 36 120 21 100 21 Z"/>`;
const PART = `<path fill="none" ${STRAND} d="M96 33 C90 36 85 42 83 50 M104 33 C110 36 115 42 117 50"/>`;

const STYLES: Record<HairStyle, { back: string; front: string }> = {
  // Long, bouncy, layered 90s blowout with curtain flicks (Jess's everyday hair)
  blowout: {
    back: `<path fill="${HAIR}" d="M100 20 C72 20 62 42 64 66 C56 84 61 104 57 124 C53 144 58 164 66 176 C72 184 82 184 88 178 L112 178 C118 184 128 184 134 176 C142 164 147 144 143 124 C139 104 144 84 136 66 C138 42 128 20 100 20 Z"/>
  <path fill="none" ${STRAND} d="M66 80 C62 98 66 118 62 138 C59 154 64 168 70 176 M134 80 C138 98 134 118 138 138 C141 154 136 168 130 176"/>
  <path fill="none" ${SHINE} d="M63 120 C61 130 63 140 62 148 M137 120 C139 130 137 140 138 148"/>`,
    front: `<path fill="${HAIR}" d="M100 22 C88 22 76 30 78 52 C77.6 54 77.5 55.5 77.5 57 C77.5 65 81 70 86 72 C83 65 83 57 87 50 C90 44 94 37 99 31 L101 31 C106 37 110 44 113 50 C117 57 117 65 114 72 C119 70 122.5 65 122.5 57 C122.5 55.5 122.4 54 122 52 C124 30 112 22 100 22 Z"/>
  <path fill="none" ${SHINE} d="M92 25 C96 23 104 23 108 25 M81 58 C80.5 62 81.5 66 83 68 M119 58 C119.5 62 118.5 66 117 68"/>
  ${HOOPS}`,
  },
  // Messy blonde updo with loose face-framing pieces
  updo: {
    back: `${BACK_CAP}
  <path fill="${HAIR}" d="M84 22 C77 14 83 4 93 6 C96 0 106 0 109 5 C118 3 124 12 117 19 C121 25 112 30 104 27 C99 31 90 30 87 26 C82 27 80 24 84 22 Z"/>
  <path fill="none" ${WISP} d="M86 9 C82 4 79 6 78 11 M114 6 C119 1 123 5 121 10 M100 2 C101 -2 105 -2 106 1 M90 6 C92 9 95 10 97 8 M104 7 C107 10 110 10 112 8 M88 18 C91 14 95 15 96 19 M106 19 C108 15 112 15 114 18"/>`,
    front: `<path fill="${HAIR}" d="M100 22 C88 22 77 30 78.5 50 C78 56 80 66 78 78 C76 88 80 96 77 104 C82 97 82 88 83.5 78 C85 66 81 56 83 46 C88 38 94 34 100 33 C106 34 112 38 117 46 C119 56 115 66 116.5 78 C118 88 118 97 123 104 C120 96 124 88 122 78 C120 66 122 56 121.5 50 C123 30 112 22 100 22 Z"/>
  <path fill="none" ${STRAND} d="M86 38 C90 31 95 28 99 26 M114 38 C110 31 105 28 101 26 M80.5 56 C80 64 81.5 70 80.5 78 M119.5 56 C120 64 118.5 70 119.5 78"/>
  <path fill="none" ${WISP} d="M93 26 C92 21 95 20 96 24 M107 26 C108 21 105 20 104 24"/>
  ${HOOPS}`,
  },
  // Voluminous layered blowout, shoulder length with flicked layers
  layers: {
    back: `<path fill="${HAIR}" d="M100 19 C70 19 60 40 63 62 C56 72 57 86 61 96 C55 103 54 113 58 121 C63 116 68 114 72 118 C75 112 79 108 85 108 L115 108 C121 108 125 112 128 118 C132 114 137 116 142 121 C146 113 145 103 139 96 C143 86 144 72 137 62 C140 40 130 19 100 19 Z"/>
  <path fill="none" ${STRAND} d="M64 70 C60 80 62 90 61 98 M136 70 C140 80 138 90 139 98 M68 100 C64 106 63 112 64 118 M132 100 C136 106 137 112 136 118"/>`,
    front: `<path fill="${HAIR}" d="M100 22 C88 22 76 30 78 52 L77 56 C75 68 79 78 76 88 C72 94 68 96 63 100 C72 103 80 98 84 90 C86 80 82 70 84 60 C85 48 92 36 99 31 L101 31 C108 36 115 48 116 60 C118 70 114 80 116 90 C120 98 128 103 137 100 C132 96 128 94 124 88 C121 78 125 68 123 56 L122 52 C124 30 112 22 100 22 Z"/>
  <path fill="none" ${STRAND} d="M80 62 C78 72 81 80 78 88 M120 62 C122 72 119 80 122 88"/>
  <path fill="none" ${SHINE} d="M79 76 C77 82 78 88 76 92 M121 76 C123 82 122 88 124 92 M92 25 C96 23 104 23 108 25"/>
  ${HOOPS}`,
  },
  // Messy high bun with a side-swept fringe
  highbun: {
    back: `${BACK_CAP}
  <path fill="${HAIR}" d="M85 21 C79 10 87 -2 100 0 C113 -2 121 10 115 21 C119 27 109 30 100 28 C91 30 81 27 85 21 Z"/>
  <path fill="none" ${WISP} d="M88 4 C84 -1 88 -3 91 0 M110 2 C114 -3 118 1 115 4 M96 6 C98 3 103 3 105 6 M90 14 C94 10 98 12 98 16 M102 16 C104 11 108 11 110 14 M117 20 C121 21 122 25 120 27"/>`,
    front: `<path fill="${HAIR}" d="M100 22 C88 22 77 30 78.5 50 C79 55 80 60 84 63 C84.5 55 88 48 94 44 C100 40 108 38 117 38 C117.6 42 117.4 46 117 50 C116.5 60 118 71 122 78 C120 68 123 58 121.5 50 C123 30 112 22 100 22 Z"/>
  <path fill="none" ${STRAND} d="M108 33 C98 34 90 39 86 47 M112 36 C104 37 96 41 90 48 M94 27 C98 25 104 25 110 28"/>
  <path fill="none" ${SHINE} d="M100 33 C95 35 91 38 89 41"/>
  ${HOOPS}`,
  },
  // Brunette half-up double buns with face-framing strands
  halfbuns: {
    back: `${BACK_CAP}
  <path fill="${HAIR}" d="M80 40 C70 60 68 92 66 130 C65 150 66 164 70 172 L130 172 C134 164 135 150 134 130 C132 92 130 60 120 40 Z"/>
  <path fill="${HAIR}" d="M82 9 C90 9 93.5 15 92.5 21.5 C91.5 27.5 85.5 30.5 80 30 C74 29 70.5 24 71.5 18 C72.5 12.5 76.5 9 82 9 Z M118 9 C110 9 106.5 15 107.5 21.5 C108.5 27.5 114.5 30.5 120 30 C126 29 129.5 24 128.5 18 C127.5 12.5 123.5 9 118 9 Z"/>
  <path fill="none" ${WISP} d="M76 16 Q82 9 88 16 Q86 24 79 22 M124 16 Q118 9 112 16 Q114 24 121 22 M78 10 C76 6 79 5 80 8 M122 10 C124 6 121 5 120 8"/>
  <path fill="none" ${STRAND} d="M72 90 C70 110 70 130 69 160 M128 90 C130 110 130 130 131 160"/>`,
    front: `<path fill="${HAIR}" d="M100 22 C88 22 76 30 78 52 C77 64 80 76 78 88 C77 98 79 106 79 112 C82 104 82 94 83 84 C84 72 82 60 83 50 C86 41 92 34 99 31 L101 31 C108 34 114 41 117 50 C118 60 116 72 117 84 C118 94 118 104 121 112 C121 106 123 98 122 88 C120 76 123 64 122 52 C124 30 112 22 100 22 Z"/>
  <path fill="none" ${SHINE} d="M80.5 84 C79.8 90 80.6 96 80 102 M119.5 84 C120.2 90 119.4 96 120 102 M92 25 C96 23 104 23 108 25"/>
  ${HOOPS}`,
  },
  // Sleek half-up ponytail with spiky ends
  spiky: {
    back: `${BACK_CAP}
  <path fill="${HAIR}" d="M80 40 C72 60 72 100 70 150 C70 170 72 186 76 192 L124 192 C128 186 130 170 130 150 C128 100 128 60 120 40 Z"/>
  <path fill="none" ${STRAND} d="M76 80 C74 110 74 150 75 186 M124 80 C126 110 126 150 125 186 M100 74 L100 190"/>`,
    front: `<path fill="${HAIR}" d="M93 23 L83 5 L94 15 L93 0 L99 13 L103 -1 L105 13 L113 1 L110 16 L119 9 L108 23 Z"/>
  <path fill="${HAIR}" d="M100 22 C88 22 76 30 78 52 C77.5 80 79 120 78 152 C81.5 114 82.5 80 83.5 52 C86 41 92 34 99 31 L101 31 C108 34 114 41 116.5 52 C117.5 80 118.5 114 122 152 C121 120 122.5 80 122 52 C124 30 112 22 100 22 Z"/>
  <path fill="none" ${WISP} d="M90 10 L86 4 M108 9 L111 4 M100 8 L101 2"/>
  <ellipse cx="100.5" cy="22" rx="5" ry="2.4" ${TIE}/>
  <path fill="none" ${SHINE} d="M88 28 C93 25 97 24 99 24 M101 24 C103 24 107 25 112 28"/>
  ${HOOPS}`,
  },
};
const tint = (s: string, c: HairColour) => {
  const t = HAIR_COLOURS.find((h) => h.id === c) ?? HAIR_COLOURS[0];
  return s.split("url(#hairGrad)").join(`url(#${t.grad})`).split("#3E241B").join(t.dark).split("#E2BC92").join(t.light);
};
/** The back and front hair layers for a given style and colour */
export function hairFor(style: HairStyle, colour: HairColour) {
  const h = STYLES[style] ?? STYLES.blowout;
  return { back: tint(hairLayer(h.back), colour), front: tint(hairLayer(h.front), colour) };
}

export const WARDROBE: Record<string, Garment> = {
  halter:{cat:'Tops',name:'Pink halter',svg:`<path fill="#E8508F" d="M93.8 84.0 L94.2 84.2 L99.8 99.8 L100.4 99.4 L105.8 84.4 L106.4 84.2 L110.2 86.2 L113.4 94.8 L115.8 104.4 L128.6 104.4 L123.4 111.2 L122.8 112.6 L119.8 139.4 L118.6 148.0 L118.2 148.8 L118.0 158.6 L118.0 160.0 L116.6 160.4 L116.4 161.8 L108.6 161.8 L104.8 162.4 L95.4 162.4 L91.6 161.8 L83.6 161.8 L83.4 160.4 L82.0 160.0 L81.8 149.0 L81.4 148.2 L80.2 139.6 L77.2 112.8 L76.6 111.2 L71.4 104.4 L84.2 104.4 L86.6 95.0 L89.6 86.8 L90.2 85.8 Z"/><path fill="none" d="M94 84 Q100 80 106 84"/><path fill="#F7B4CE" d="M81.5 148 L118.5 148 L118 160 Q100 165 82 160 Z"/>${row(9,84,4,154.5,.9,'#fff')}<circle cx="100" cy="112" r="3.2" fill="none" style="stroke:#C7CCD3;stroke-width:1.2"/>`},
  corset:{cat:'Tops',name:'Pink corset',svg:`<path fill="none" d="M89 106 L91 89 M111 106 L109 89"/><path fill="#F6B9CD" d="M90.0 103.0 L93.6 103.2 L95.8 103.8 L97.6 104.8 L97.8 103.6 L98.2 103.6 L98.0 105.0 L99.8 106.0 L103.6 104.0 L108.0 103.0 L111.6 103.2 L113.8 104.0 L113.8 103.6 L114.2 103.6 L114.2 104.2 L115.2 104.4 L117.4 105.8 L117.8 105.4 L117.8 103.6 L129.2 103.6 L123.4 111.2 L122.8 112.6 L119.8 139.4 L118.0 150.8 L118.0 166.0 L116.6 166.4 L117.2 168.2 L114.0 168.2 L108.4 168.2 L101.8 169.0 L94.8 168.8 L91.6 168.2 L82.8 168.2 L83.4 166.4 L82.0 166.0 L82.0 151.0 L80.2 139.6 L77.2 112.8 L76.6 111.2 L70.8 103.6 L82.2 103.6 L82.2 105.4 L82.6 105.8 L84.2 104.6 L85.6 104.2 L85.8 103.6 L86.8 103.8 Z M101.8 103.6 L102.2 103.6 L102.0 104.6 Z"/><path fill="none" d="M91 105 L90 168 M100 107 L100 170 M109 105 L110 168"/>${row(9,84,4,104.5,1.9,'#FCE4EC')}<path fill="#E8508F" d="M100 108 l-5 -3.5 0 7 z M100 108 l5 -3.5 0 7 z"/>`},
  bluecrop:{cat:'Tops',name:'Baby blue crop',svg:`<path fill="none" d="M88 107 L92 89 M112 107 L108 89"/><path fill="#BFDDEE" d="M87.0 105.4 L91.4 105.6 L94.4 107.0 L96.0 108.4 L104.0 108.4 L105.8 106.8 L109.2 105.4 L112.8 105.4 L114.8 106.0 L117.6 107.6 L118.0 108.4 L125.6 108.4 L123.4 111.2 L122.8 112.6 L121.2 127.0 L117.6 127.0 L115.4 127.8 L112.0 128.4 L88.2 128.4 L84.6 127.8 L82.6 127.0 L78.8 127.0 L77.0 111.8 L74.4 108.4 L82.0 108.4 L82.0 108.0 L83.6 106.8 Z"/><path fill="#BFDDEE" d="M82.0 126.0 L86.2 127.6 L92.4 129.0 L107.4 129.0 L112.2 128.0 L118.0 126.0 L118.0 127.0 L121.2 127.0 L121.0 128.4 L118.0 128.4 L118.0 129.0 L121.0 129.0 L120.6 133.0 L119.8 133.2 L110.4 133.2 L109.6 133.6 L104.0 134.4 L96.2 134.4 L91.6 133.8 L89.8 133.2 L79.4 133.2 L79.0 129.0 L82.0 129.0 L82.0 128.4 L78.8 128.4 L78.8 127.0 L82.0 127.0 Z"/>`},
  rufflecami:{cat:'Tops',name:'Ruffle cami',svg:`<path fill="none" d="M89 105 L91 89 M111 105 L109 89"/><path fill="#FFF6F8" d="M72.6 106.0 L82.0 106.0 L81.8 107.6 L82.8 109.0 L83.0 106.0 L90.6 108.2 L93.2 108.6 L94.2 108.2 L94.6 108.8 L97.0 109.0 L97.8 108.2 L98.2 108.2 L98.8 109.0 L101.2 109.0 L101.8 108.2 L102.6 108.8 L105.2 108.8 L105.8 108.2 L106.4 108.6 L108.2 108.4 L112.8 107.4 L116.6 106.0 L117.0 106.0 L117.2 109.0 L118.2 107.6 L118.0 106.0 L127.4 106.0 L123.4 111.2 L122.8 112.6 L119.8 139.2 L117.8 152.4 L118.0 158.0 L82.0 158.0 L82.2 152.4 L80.2 139.6 L77.2 112.8 L76.6 111.2 Z"/>${row(9,84,4,107,2.2,'#F7C9D8')}${row(10,82,4,160,2.4,'#FFF6F8')}<path fill="#F4A9C3" d="M100 118 l-5 -3.5 0 7 z M100 118 l5 -3.5 0 7 z"/>`},
  leopardcami:{cat:'Tops',name:'Leopard cami',svg:`<path fill="none" d="M89 105 L91 89 M111 105 L109 89"/><path fill="url(#leopard)" d="M83.0 105.0 L89.0 107.2 L95.6 108.4 L105.8 108.2 L110.8 107.2 L117.0 105.0 L117.0 108.4 L125.6 108.4 L123.4 111.2 L122.8 112.6 L119.8 139.4 L117.8 152.4 L118.0 161.6 L118.0 164.0 L82.0 164.0 L82.2 152.4 L80.2 139.6 L77.2 112.8 L77.0 111.8 L74.4 108.4 L83.0 108.4 Z"/><path fill="none" d="M84 109 Q100 115 116 109"/>`},
  lacecami:{cat:'Tops',name:'Black lace cami',svg:`<path fill="none" d="M89 105 L91 89 M111 105 L109 89"/><path fill="url(#blacklace)" d="M88.2 104.0 L91.6 104.0 L93.4 104.6 L94.2 104.4 L94.0 104.8 L95.6 105.2 L97.4 106.4 L98.2 106.2 L98.4 107.0 L99.0 107.4 L101.0 107.4 L101.8 106.2 L102.6 106.4 L104.8 105.0 L106.0 104.8 L105.8 104.4 L106.4 104.6 L108.4 104.0 L111.6 104.0 L113.6 104.6 L114.2 104.4 L114.2 104.8 L117.0 106.0 L117.0 107.2 L118.0 106.2 L117.8 104.4 L128.6 104.4 L123.4 111.2 L122.8 112.6 L119.8 139.4 L117.8 152.4 L118.0 160.0 L116.4 160.0 L82.0 160.0 L82.2 152.4 L80.2 139.6 L77.2 112.8 L76.6 111.2 L71.4 104.4 L82.2 104.4 L82.0 106.2 L83.0 107.2 L83.2 105.8 L85.8 104.8 L85.8 104.4 L86.4 104.6 Z"/>${row(9,84,4,105.5,2,'#2B2526')}${row(10,82,4,161,2.2,'#2B2526')}`},
  tube:{cat:'Tops',name:'Striped tube top',svg:`<path fill="url(#pinkstripe)" d="M95.2 105.6 L104.6 105.6 L109.8 106.2 L114.2 107.2 L126.4 107.2 L123.4 111.2 L122.8 112.6 L120.0 137.6 L110.0 137.6 L104.8 138.4 L95.4 138.4 L90.2 137.6 L80.0 137.6 L77.0 111.8 L73.6 107.2 L85.8 107.2 L90.0 106.2 Z"/>`},
  knit:{cat:'Tops',name:'Cream knit',svg:`<path fill="#F1E6D3" d="M85.8 89.0 L91.6 91.4 L99.2 92.6 L105.8 92.0 L110.6 90.6 L114.2 89.0 L115.0 89.6 L131.0 96.0 L133.6 98.8 L135.8 102.6 L138.0 108.6 L139.4 114.8 L140.4 122.0 L141.0 130.2 L143.0 230.0 L133.0 231.0 L131.0 149.6 L124.2 118.4 L123.8 118.4 L122.6 127.4 L119.0 158.0 L117.2 158.4 L116.8 158.8 L116.8 160.2 L109.0 160.2 L102.0 161.0 L94.6 160.8 L91.2 160.2 L83.2 160.2 L83.0 158.4 L81.0 158.0 L77.2 126.0 L76.2 118.6 L75.8 118.2 L69.0 149.4 L67.0 231.0 L57.0 230.0 L59.0 130.4 L59.6 122.2 L60.8 113.8 L62.0 108.8 L63.8 103.6 L66.6 98.6 L69.2 95.8 Z"/><path fill="none" d="M88 91 Q100 99 112 91"/><path fill="none" style="stroke:#CDBB9C;stroke-width:.7" d="M84 152 L84 160 M90 154 L90 162 M96 155 L96 163 M102 155 L102 163 M108 154 L108 162 M114 152 L114 160 M58 220 L68 221 M58 225 L68 226 M132 221 L142 220 M132 226 L142 225 M70 120 Q72 160 68 200 M130 120 Q128 160 132 200"/>`},
  gingham:{cat:'Tops',name:'Gingham puff top',svg:`<ellipse cx="72" cy="102" rx="9" ry="8" fill="url(#gingham)"/><ellipse cx="128" cy="102" rx="9" ry="8" fill="url(#gingham)"/><path fill="url(#gingham)" d="M82.0 100.0 L85.6 101.6 L90.4 103.0 L109.4 103.0 L115.4 101.2 L118.0 100.0 L118.0 103.0 L119.2 103.2 L119.2 104.0 L120.2 106.2 L122.4 108.4 L124.8 109.4 L123.0 111.8 L122.8 112.6 L119.8 139.4 L118.0 150.8 L118.0 155.0 L118.0 158.0 L82.0 158.0 L82.0 151.0 L80.2 139.6 L77.2 112.8 L77.0 111.8 L75.2 109.6 L77.6 108.4 L79.8 106.2 L80.6 104.6 L80.8 103.2 L82.0 103.0 Z"/><path fill="none" d="M82 104 Q100 112 118 104"/><path fill="#E8508F" d="M100 110 l-5 -3.5 0 7 z M100 110 l5 -3.5 0 7 z"/>`},
  bralette:{cat:'Tops',name:'Lace bralette',svg:`<path fill="none" d="M88 106 L90 89 M112 106 L110 89"/><path fill="#fff" d="M88.2 104.2 L90.2 104.2 L93.0 104.8 L95.8 106.2 L97.4 107.6 L102.6 107.6 L103.6 106.6 L106.4 105.0 L109.6 104.2 L113.0 104.4 L115.0 105.0 L117.0 106.0 L117.0 107.6 L126.2 107.6 L123.4 111.2 L122.8 112.6 L121.0 129.8 L118.0 130.0 L118.0 128.8 L117.2 127.8 L114.6 128.4 L114.2 128.8 L113.8 128.6 L106.0 129.8 L97.6 130.0 L91.8 129.6 L86.6 128.6 L85.8 128.8 L85.6 128.4 L82.8 127.8 L82.0 128.8 L82.0 130.0 L79.0 130.0 L77.0 111.8 L73.8 107.6 L83.0 107.6 L83.2 105.8 L86.0 104.6 Z"/><path fill="none" d="M100 110 L100 130 M86 112 q4 4 8 8 M114 112 q-4 4 -8 8"/>${row(9,84,4,129.5,2,'#fff')}`},
  floral:{cat:'Tops',name:'Floral blouse',svg:`<path fill="url(#floral)" d="M85.8 89.0 L91.6 91.4 L99.2 92.6 L105.8 92.0 L110.6 90.6 L114.2 89.0 L115.0 89.6 L131.0 96.0 L133.6 98.8 L135.8 102.6 L138.0 108.6 L139.4 114.8 L140.4 122.0 L141.0 130.2 L143.0 230.0 L133.0 231.0 L131.0 149.6 L124.2 118.4 L123.8 118.4 L122.6 127.4 L119.0 158.0 L117.2 158.4 L116.8 158.8 L116.8 160.2 L109.0 160.2 L102.0 161.0 L94.6 160.8 L91.2 160.2 L83.2 160.2 L83.0 158.4 L81.0 158.0 L77.2 126.0 L76.2 118.6 L75.8 118.2 L69.0 149.4 L67.0 231.0 L57.0 230.0 L59.0 130.4 L59.6 122.2 L60.8 113.8 L62.0 108.8 L63.8 103.6 L66.6 98.6 L69.2 95.8 Z"/><path fill="none" d="M88 91 Q100 99 112 91 M57 224 L67 225 M133 225 L143 224"/>`},
  tee:{cat:'Tops',name:'Baby tee',svg:`<path fill="#F7BCCF" d="M86 89 Q100 97 114 89 L130 97 L139 121 L127 125 L123 116 Q120 142 118 168 L82 168 Q80 142 77 116 L73 125 L61 121 L70 97 Z"/><path fill="none" d="M88 91 Q100 99 112 91"/><path fill="#E9649E" style="stroke:none" d="M100 127 c-2 -3 -6 -1 -4 2 l4 4 4 -4 c2 -3 -2 -5 -4 -2z"/>`},
  lowrise:{cat:'Bottoms',name:'Low-rise flares',svg:`<path fill="#7F9DBF" d="M77 186 Q100 192 123 186 L126.8 206 Q128.5 300 138 434 L102.6 434 Q101.8 330 101 236 L99 236 Q98.2 330 97.4 434 L62 434 Q71.5 300 73.2 206 Z"/><path fill="none" d="M100 192 L100 240 M84 196 Q90 202 97 200 M116 196 Q110 202 103 200"/><path fill="none" style="stroke:#B9CBE0;stroke-width:1" d="M84 300 Q82 360 76 420 M116 300 Q118 360 124 420"/>`},
  dotmini:{cat:'Bottoms',name:'Polka-dot ruffle mini',svg:`<path fill="url(#hotdots)" d="M79.0 182.0 L84.0 183.4 L89.6 184.4 L110.2 184.4 L121.0 182.0 L121.4 184.4 L122.4 184.4 L122.8 185.8 L124.6 194.4 L125.8 202.6 L125.6 204.6 L126.0 206.0 L123.4 206.0 L74.0 206.0 L74.4 204.8 L74.4 201.0 L76.2 190.4 L77.6 184.4 L78.6 184.4 Z"/><path fill="url(#hotdots)" d="M74 204 L126 204 Q133 216 136 228 L64 228 Q67 216 74 204 Z"/>${row(13,64,6,228.5,3,'#E8508F')}`},
  sweats:{cat:'Bottoms',name:'Grey sweats',svg:`<path fill="#BDBABC" d="M78 178 Q100 184 122 178 L127.4 210 Q133 330 129 426 Q118 432 102.8 430 Q102 330 101 238 L99 238 Q98 330 97.2 430 Q82 432 71 426 Q67 330 72.6 210 Z"/><path fill="#F4A9C3" d="M78 178 Q100 184 122 178 L122.8 186 Q100 192 77.2 186 Z"/><path fill="none" d="M97 186 L95 200 M103 186 L105 200 M71 414 Q84 420 97.3 416 M102.7 416 Q116 420 129 414"/>`},
  denim:{cat:'Bottoms',name:'Denim bow midi',svg:`<path fill="#8FA6C0" d="M79.0 186.0 L84.0 187.4 L91.6 188.6 L108.4 188.6 L115.8 187.4 L121.0 186.0 L121.2 188.6 L123.4 188.6 L126.0 204.2 L124.6 224.6 L132.0 300.0 L122.0 301.8 L119.2 302.2 L119.2 303.0 L110.4 303.0 L107.0 303.4 L80.8 303.0 L80.8 302.2 L80.0 302.0 L76.0 301.6 L68.0 300.0 L75.4 224.6 L74.0 204.4 L76.6 188.6 L78.8 188.6 Z"/><path fill="none" d="M100 192 L100 300 M80 196 Q100 202 120 196 M110 238 L104 264 M114 238 L120 264"/><path fill="#7A92AE" d="M112 236 Q122 226 128 234 Q122 242 112 236 Z M112 236 Q102 226 96 234 Q102 242 112 236 Z"/>`},
  petticoat:{cat:'Bottoms',name:'Tulle petticoat',svg:`<path fill="#F2AFC6" d="M83.2 160.0 L116.8 160.0 L116.2 162.8 L116.4 166.4 L117.2 167.8 L119.8 175.2 L123.2 187.6 L123.2 188.0 L117.8 188.0 L118.0 190.0 L116.8 190.0 L82.0 190.0 L82.2 188.0 L76.8 188.0 L80.0 176.0 L83.6 166.4 L83.8 163.0 Z"/><path fill="#F6C1D3" d="M76.8 188.0 L123.2 188.0 L124.6 194.4 L126.0 204.2 L125.6 211.6 L131.4 229.2 L141.0 261.6 L141.0 262.0 L123.2 262.0 L59.0 262.0 L66.8 235.2 L74.4 211.6 L74.0 204.4 L75.4 194.6 Z"/><path fill="#F2AFC6" d="M59 258 L141 258 Q146 280 148 300 L52 300 Q54 280 59 258 Z"/>${row(17,52,6,300.5,3.3,'#F2AFC6')}<path fill="none" style="stroke:#fff;stroke-opacity:.8;stroke-width:1.3" d="M90 196 Q86 228 76 256 M110 196 Q114 228 124 256 M74 266 Q70 284 66 296 M126 266 Q130 284 134 296"/>`},
  tulle:{cat:'Bottoms',name:'White tulle skirt',svg:`<path fill="#fff" d="M83 163 L117 163 L118 172 L82 172 Z"/><path fill="#FBF8F6" d="M82 171 L118 171 Q128 196 132 214 L68 214 Q72 196 82 171 Z"/><path fill="#fff" d="M68 210 L132 210 Q137 228 139 242 L61 242 Q63 228 68 210 Z"/>${row(14,62,6,242.5,3,'#fff')}`},
  poodle:{cat:'Bottoms',name:'Poodle skirt',svg:`<path fill="#F5A9C6" d="M83.0 165.0 L117.0 165.0 L117.6 169.4 L119.8 175.2 L122.8 185.8 L125.4 199.4 L126.0 206.0 L125.0 221.2 L131.0 261.4 L131.0 262.0 L117.0 262.0 L69.0 262.0 L75.0 221.4 L74.0 206.2 L74.8 198.2 L77.2 186.0 L80.0 176.0 L82.4 169.6 Z"/><path fill="none" d="M83 172 L117 172"/><path fill="#2B2526" style="stroke:none" d="M106 222 q4 -6 8 -2 q3 -5 6 0 l-2 12 q2 4 -2 6 l-1 6 h-2 l1 -7 q-6 1 -8 -3 l-2 9 h-2 l2 -11 q-3 -4 2 -10z"/><path fill="none" style="stroke:#2B2526;stroke-width:.8" d="M114 220 Q120 200 112 186"/>`},
  ruffle:{cat:'Dresses',name:'Pink ruffle dress',svg:`<path fill="none" d="M88 104 L90 89 M112 104 L110 89"/><path fill="#F8CFDC" d="M95.8 101.6 L105.8 101.8 L111.8 102.8 L115.4 104.0 L128.8 104.0 L123.4 111.2 L122.8 112.6 L121.6 125.0 L118.4 149.0 L117.0 149.0 L117.0 150.0 L104.2 150.0 L83.0 150.0 L83.0 149.2 L81.6 149.2 L78.4 125.2 L77.0 111.8 L71.2 104.4 L71.2 104.0 L84.4 104.0 L88.0 102.8 Z"/><path fill="#F7C3D3" d="M83.0 148.0 L117.0 148.0 L117.0 149.0 L118.4 149.0 L117.6 154.0 L120.4 177.4 L122.8 185.8 L124.4 194.0 L122.6 194.0 L123.0 198.0 L116.8 198.0 L77.0 198.0 L77.6 194.0 L75.6 194.0 L75.6 193.6 L77.2 186.0 L79.6 177.4 L82.4 154.2 L81.6 149.2 L83.0 149.2 Z"/><path fill="#F8CFDC" d="M75.6 194.0 L124.4 194.0 L126.0 204.2 L125.6 211.6 L131.0 245.4 L131.0 246.0 L124.4 246.0 L69.0 246.0 L74.4 211.8 L74.0 204.4 Z M76.6 196.6 L75.8 197.8 L76.0 199.8 Z M123.6 196.6 L123.4 197.4 L124.0 200.0 L124.2 197.8 Z"/><path fill="#F7C3D3" d="M69 242 L131 242 L139 292 L61 292 Z"/>${row(8,79,6,198.5,3.2,'#F7C3D3')}${row(11,70,6,246.5,3.3,'#F8CFDC')}${row(14,61,6,292.5,3.4,'#F7C3D3')}<path fill="#E8508F" d="M100 106 l-5 -3.5 0 7 z M100 106 l5 -3.5 0 7 z"/>`},
  beaded:{cat:'Dresses',name:'Beaded babydoll',svg:`<path fill="none" d="M88 104 L90 89 M112 104 L110 89"/><path fill="url(#beads)" d="M95.8 101.6 L105.8 101.8 L111.8 102.8 L115.4 104.0 L128.8 104.0 L123.4 111.2 L122.8 112.6 L121.6 125.0 L118.6 147.0 L124.4 183.8 L130.0 224.0 L104.2 224.0 L70.0 224.0 L76.0 181.2 L81.4 147.2 L78.4 125.2 L77.0 111.8 L71.2 104.0 L84.4 104.0 L88.0 102.8 Z"/><path fill="none" d="M83 136 Q100 141 117 136"/><path fill="#F7C9D8" d="M70.0 222.0 L130.0 222.0 L129.8 226.0 L129.0 227.6 L128.2 227.4 L127.4 226.6 L126.2 224.2 L125.8 224.2 L124.6 227.0 L123.4 228.4 L122.6 229.0 L121.6 229.0 L120.8 228.6 L119.8 227.2 L116.2 227.2 L115.0 228.8 L113.6 229.0 L112.8 228.6 L111.8 227.2 L108.2 227.2 L107.0 228.8 L105.6 229.0 L104.8 228.6 L103.8 227.2 L100.2 227.2 L99.0 228.8 L97.6 229.0 L96.8 228.6 L95.8 227.2 L92.2 227.2 L91.0 228.8 L89.6 229.0 L88.8 228.6 L87.8 227.2 L84.2 227.2 L83.0 228.8 L81.6 229.0 L80.8 228.6 L79.8 227.2 L75.4 227.2 L74.8 227.6 L73.2 227.2 L71.2 224.8 Z"/><path fill="#F4A9C3" d="M90 92 l-4 -3 0 6 z M90 92 l4 -3 0 6 z M110 92 l-4 -3 0 6 z M110 92 l4 -3 0 6 z"/>`},
  mintdot:{cat:'Dresses',name:'Mint dot mini',svg:`<path fill="url(#mintdots)" d="M98.2 103.0 L107.8 103.6 L112.6 104.6 L114.6 105.4 L127.8 105.4 L123.4 111.2 L122.8 112.6 L119.8 139.4 L117.8 152.4 L117.8 155.8 L118.0 160.4 L123.6 186.0 L128.0 212.0 L101.8 212.0 L72.0 212.0 L76.4 186.2 L82.0 160.6 L82.2 156.0 L82.2 152.4 L80.2 139.6 L77.2 112.8 L76.6 111.2 L72.2 105.4 L85.2 105.4 L90.8 103.8 Z"/>${row(12,67,6,220,3.2,'#D8EBDD')}${row(11,70,6,214,3.4,'#FBF7EC')}<path fill="#fff" d="M92 106 Q96 100 100 106 Q96 112 92 106 Z"/>`},
  corsetdress:{cat:'Dresses',name:'Corset tulle dress',svg:`<path fill="none" d="M89 106 L91 89 M111 106 L109 89"/><path fill="#F7D2DE" d="M80.0 166.0 L120.0 166.0 L120.2 166.6 L134.0 249.8 L124.2 238.4 L124.2 238.0 L123.6 238.8 L123.0 248.8 L120.6 248.8 L118.0 257.8 L112.4 248.8 L107.0 248.8 L105.2 248.8 L100.0 261.8 L94.8 248.8 L87.6 248.8 L82.0 257.8 L79.4 249.0 L77.0 248.8 L76.4 239.0 L76.0 238.0 L66.0 249.8 Z"/><path fill="#F4AFC6" d="M90.0 103.0 L95.2 103.6 L98.4 105.2 L101.6 105.2 L103.6 104.0 L108.0 103.0 L113.2 103.6 L116.4 105.2 L128.0 105.2 L123.4 111.2 L122.8 112.6 L121.6 125.0 L118.6 146.6 L119.0 170.0 L111.2 172.0 L102.0 173.0 L94.6 172.8 L85.8 171.4 L81.0 170.0 L81.4 146.8 L78.4 125.2 L77.2 112.8 L76.6 111.2 L72.0 105.2 L83.6 105.2 L85.6 104.0 Z"/><path fill="none" d="M91 105 L90 172 M100 107 L100 174 M109 105 L110 172"/>`},
  gown:{cat:'Dresses',name:'Black lace slip',svg:`<path fill="none" d="M88 104 L90 89 M112 104 L110 89"/><path fill="url(#blacklace)" d="M98.4 101.0 L104.2 101.2 L111.2 102.6 L115.0 104.0 L115.0 106.2 L127.2 106.2 L123.4 111.2 L122.8 112.6 L119.8 139.4 L116.8 158.8 L116.8 162.6 L117.0 165.6 L118.0 170.6 L121.2 179.8 L123.8 190.2 L126.0 204.2 L125.8 209.6 L126.6 219.0 L139.0 435.6 L139.0 437.0 L101.6 437.0 L61.0 437.0 L73.8 212.2 L74.2 209.6 L74.0 204.4 L76.2 190.4 L79.2 178.6 L82.0 170.6 L83.2 162.8 L83.2 159.0 L80.2 139.6 L77.2 112.8 L77.0 111.8 L72.8 106.2 L85.0 106.2 L85.2 103.8 L92.0 101.8 Z M70.4 103.0 L82.0 103.0 L82.2 104.2 L83.2 105.0 L71.8 105.0 Z M118.0 103.0 L129.6 103.0 L128.2 104.8 L116.8 105.0 L117.8 104.2 Z"/>${row(9,84,4,103,2.1,'#2B2526')}${row(14,61,6,437.5,3.2,'#2B2526')}<path fill="none" style="stroke:#fff;stroke-opacity:.18;stroke-width:2.4" d="M95 120 Q93 260 82 428 M110 140 Q114 280 122 428"/>`},
  plaid:{cat:'Layers',name:'Pink plaid jacket',svg:`<path fill="url(#plaid)" d="M91 88 L70 96 Q60 104 58 132 L56 236 L68 236 L70 150 L77 122 L80 160 Q76 176 72 192 L128 192 Q124 176 120 160 L123 122 L130 150 L132 236 L144 236 L142 132 Q140 104 130 96 L109 88 Q100 96 91 88 Z"/><path fill="url(#plaid)" d="M91 88 L92 79 L108 79 L109 88 Q100 94 91 88 Z"/><path fill="none" d="M100 94 L100 192 M80 162 Q100 168 120 162"/>${[108,124,140,156,176].map(y=>`<circle cx="104" cy="${y}" r="2" fill="#E8508F"/>`).join('')}`},
  track:{cat:'Layers',name:'Polka-dot track top',svg:`<path fill="url(#bwdots)" d="M91 88 L70 96 Q60 104 58 132 L56 236 L68 236 L70 150 L77 122 L80 170 L120 170 L123 122 L130 150 L132 236 L144 236 L142 132 Q140 104 130 96 L109 88 Q100 96 91 88 Z"/><path fill="#2B2526" d="M80 168 L120 168 L120 178 L80 178 Z M91 88 L92 79 L108 79 L109 88 Q100 94 91 88 Z M56 228 L68 228 L68 236 L56 236 Z M132 228 L144 228 L144 236 L132 236 Z"/><path fill="none" d="M100 80 L100 178"/><path fill="none" style="stroke:#fff;stroke-width:1.4" d="M64 104 L60.5 226 M67 106 L63.5 226 M136 104 L139.5 226 M133 106 L136.5 226"/>`},
  furcardi:{cat:'Layers',name:'Fuzzy-cuff cardi',svg:`<path fill="#A9A6A9" d="M92 88 L70 96 Q61 104 60 132 L58 222 L68 222 L70 150 L77 124 L79 176 L97 178 L95 120 Z M108 88 L130 96 Q139 104 140 132 L142 222 L132 222 L130 150 L123 124 L121 176 L103 178 L105 120 Z"/><path fill="#CFCBCC" d="M56 220 Q54 230 58 238 Q63 242 68 238 Q72 230 70 220 Q63 216 56 220 Z M144 220 Q146 230 142 238 Q137 242 132 238 Q128 230 130 220 Q137 216 144 220 Z"/>${[132,146,160].map(y=>`<circle cx="96" cy="${y}" r="1.4" fill="#EDEAEA"/>`).join('')}`},
  laceboots:{cat:'Shoes',name:'Pink lace-up boots',svg:`<path fill="#F2B6CB" d="M81 322 L95 322 L96.4 424 Q96 440 92 449 Q88 444 87.4 430 Q82 400 81 322 Z M119 322 L105 322 L103.6 424 Q104 440 108 449 Q112 444 112.6 430 Q118 400 119 322 Z"/><path fill="none" style="stroke:#D8578E;stroke-width:.9" d="M84 332 L93 342 M93 332 L84 342 M84 352 L93 362 M93 352 L84 362 M85 372 L94 382 M94 372 L85 382 M86 392 L95 402 M95 392 L86 402 M107 332 L116 342 M116 332 L107 342 M107 352 L116 362 M116 352 L107 362 M106 372 L115 382 M115 372 L106 382 M105 392 L114 402 M114 392 L105 402 M88 322 Q80 330 76 352 M88 322 Q92 336 90 356 M112 322 Q120 330 124 352 M112 322 Q108 336 110 356"/>`},
  creamboots:{cat:'Shoes',name:'Cream knee boots',svg:`<path fill="#F5EEE0" d="M81 322 L95 322 L96.4 424 Q96 440 92 449 Q88 444 87.4 430 Q82 400 81 322 Z M119 322 L105 322 L103.6 424 Q104 440 108 449 Q112 444 112.6 430 Q118 400 119 322 Z"/><path fill="#2B2526" d="M87.6 430 Q92 426 96.3 430 Q96 440 92 449 Q88 444 87.6 430 Z M112.4 430 Q108 426 103.7 430 Q104 440 108 449 Q112 444 112.4 430 Z"/><path fill="none" style="stroke:#DDD2BF;stroke-width:.7" d="M83 336 L95 348 M83 352 L95 364 M84 368 L95 380 M95 336 L83 348 M95 352 L83 364 M95 368 L84 380 M105 336 L117 348 M105 352 L117 364 M105 368 L116 380 M117 336 L105 348 M117 352 L105 364 M116 368 L105 380"/>`},
  blueboots:{cat:'Shoes',name:'Baby blue boots',svg:`<path fill="#A9CBE6" d="M81 322 L95 322 L96.4 424 Q96 440 92 449 Q88 444 87.4 430 Q82 400 81 322 Z M119 322 L105 322 L103.6 424 Q104 440 108 449 Q112 444 112.6 430 Q118 400 119 322 Z M95.6 428 L98.4 444 L97 444.6 Z M104.4 428 L101.6 444 L103 444.6 Z"/><path fill="none" style="stroke:#D9EAF5;stroke-width:1.2" d="M85 334 L88 410 M115 334 L112 410"/>`},
  uggs:{cat:'Shoes',name:'Suede boots',svg:`<path fill="#B98A5E" d="M82 382 L97 382 Q99 420 100 436 Q100 449 90 449 Q80 449 80.5 438 Q81.5 410 82 382 Z M118 382 L103 382 Q101 420 100 436 Q100 449 110 449 Q120 449 119.5 438 Q118.5 410 118 382 Z"/><path fill="#EFE3D0" d="M81.5 380 L97.5 380 L97.6 388 L81.8 388 Z M102.5 380 L118.5 380 L118.2 388 L102.4 388 Z"/>`},
  cowboy:{cat:'Shoes',name:'Cowboy boots',svg:`<path fill="#8A4B2A" d="M81.5 350 L96 350 L96.4 422 Q97 438 92 449 Q88.5 444 87 434 L84.5 436 L84 430 Q80.5 400 81.5 350 Z M118.5 350 L104 350 L103.6 422 Q103 438 108 449 Q111.5 444 113 434 L115.5 436 L116 430 Q119.5 400 118.5 350 Z"/><path fill="none" style="stroke:#E0B088;stroke-width:.8" d="M84 360 Q89 372 94 360 M84 372 Q89 384 94 372 M106 360 Q111 372 116 360 M106 372 Q111 384 116 372"/>`},
  heels:{cat:'Shoes',name:'Bow slingbacks',svg:`<path fill="#2B2526" d="M87.6 424 Q88 417 92 418 Q96.4 419 96.6 428 Q95.6 442 92 449 Q88.6 444 87.6 424 Z M112.4 424 Q112 417 108 418 Q103.6 419 103.4 428 Q104.4 442 108 449 Q111.4 444 112.4 424 Z M95.6 426 L98.4 440 L97.2 440.6 Z M104.4 426 L101.6 440 L102.8 440.6 Z"/><path fill="#F5B8CB" d="M92 439 l-3.2 -2.2 0 4.4 z M92 439 l3.2 -2.2 0 4.4 z M108 439 l-3.2 -2.2 0 4.4 z M108 439 l3.2 -2.2 0 4.4 z"/>`},
  flats:{cat:'Shoes',name:'Ballet flats',svg:`<path fill="#FBEFDF" d="M87.6 424 Q88 417 92 418 Q96.4 419 96.6 428 Q95.6 442 92 449 Q88.6 444 87.6 424 Z M112.4 424 Q112 417 108 418 Q103.6 419 103.4 428 Q104.4 442 108 449 Q111.4 444 112.4 424 Z"/><path fill="#E9649E" d="M89.4 424 Q92 420 94.8 424 Q94 432 92 434 Q90 432 89.4 424 Z M110.6 424 Q108 420 105.2 424 Q106 432 108 434 Q110 432 110.6 424 Z"/><path fill="#3B2B2B" d="M92 440 l-3.2 -2 0 4 z M92 440 l3.2 -2 0 4 z M108 440 l-3.2 -2 0 4 z M108 440 l3.2 -2 0 4 z"/>`},
  tights:{cat:'Extras',name:'Polka-dot tights',svg:`<path fill="url(#pinkdots)" d="M74 205 L126 205 L101 232 L99 232 Z M74 205 Q78 265 82 320 Q85 370 89 422 Q86.5 430 89.5 445 Q92 450 94.5 445 Q97.5 430 96 416 Q95 370 94 320 Q97 270 99 232 Z M126 205 Q122 265 118 320 Q115 370 111 422 Q113.5 430 110.5 445 Q108 450 105.5 445 Q102.5 430 104 416 Q105 370 106 320 Q103 270 101 232 Z"/>`},
  belt:{cat:'Extras',name:'Statement belt',svg:`<path fill="url(#cow)" d="M78 185 Q100 191 122 185 L122.5 193 Q100 199 77.5 193 Z"/><rect x="93" y="184" width="14" height="13" rx="3" fill="#D9DDE2"/><rect x="96" y="187" width="8" height="7" rx="1.5" fill="#F4A9C3"/>`},
  pinkshades:{cat:'Extras',name:'Pink sunnies',svg:`<ellipse cx="91.5" cy="51.5" rx="7.5" ry="5.4" fill="#F4A9C3" fill-opacity=".8"/><ellipse cx="108.5" cy="51.5" rx="7.5" ry="5.4" fill="#F4A9C3" fill-opacity=".8"/><path fill="none" style="stroke:#E8508F;stroke-width:1.5" d="M84 51.5 Q84 46 91.5 46 Q99 46 99 51.5 Q99 57 91.5 57 Q84 57 84 51.5 Z M101 51.5 Q101 46 108.5 46 Q116 46 116 51.5 Q116 57 108.5 57 Q101 57 101 51.5 Z M99 50.5 L101 50.5 M84 50 L79 49 M116 50 L121 49"/>`},
  blackshades:{cat:'Extras',name:'Wrap sunnies',svg:`<path fill="#2B2526" d="M82 48 Q100 44 118 48 L117 54 Q110 58 102 54 L100 52 L98 54 Q90 58 83 54 Z"/><path fill="none" style="stroke:#6E6668;stroke-width:.8" d="M86 50 L92 49"/>`},
  bakerboy:{cat:'Extras',name:'Pink baker boy hat',svg:`<path fill="#F4A9C3" d="M72.5 33 C68 18 82 7 101 7.5 C121 8 134 18 128 31.5 C118 35.5 84 36 72.5 33 Z"/><path fill="#EC8FB0" d="M76 31 Q100 35.5 124.5 30.5 Q123 38.5 101 40 Q79 39 76 31 Z"/><path fill="none" style="stroke:#C9577F;stroke-width:.55;stroke-opacity:.8" d="M101 8 L100.5 33.5 M88 10.5 C84 17 83.5 25 85.5 33 M114 10.5 C118.5 17 119.5 24 117.5 32.5 M79 16 C76 21 75 27 76.5 32 M123 15.5 C126 20 127 26 125.5 31"/><circle cx="101" cy="8.4" r="2.3" fill="#EC8FB0" style="stroke:#C9577F;stroke-width:.5"/>`},
  aquabangles:{cat:'Extras',name:'Aqua bangles',svg:`<ellipse cx="63" cy="221" rx="6.6" ry="2.6" fill="#7FD6D2"/><ellipse cx="63" cy="226" rx="6.6" ry="2.6" fill="#3FB8B8"/><ellipse cx="63" cy="231" rx="6.6" ry="2.6" fill="#B5ECE7"/><ellipse cx="137" cy="226" rx="6.6" ry="2.6" fill="#3FB8B8"/><ellipse cx="137" cy="231" rx="6.6" ry="2.6" fill="#7FD6D2"/>`},
  dotbangles:{cat:'Extras',name:'Polka dot bangles',svg:`<ellipse cx="63" cy="222" rx="6.8" ry="3.1" fill="url(#dots)"/><ellipse cx="63" cy="229" rx="6.8" ry="3.1" fill="url(#hotdots)"/><ellipse cx="137" cy="225" rx="6.8" ry="3.1" fill="url(#dots)"/><ellipse cx="137" cy="232" rx="6.8" ry="3.1" fill="url(#aquadots)"/>`},
  mixbangles:{cat:'Extras',name:'Aqua + polka stack',svg:`<ellipse cx="63" cy="220" rx="6.6" ry="2.6" fill="#3FB8B8"/><ellipse cx="63" cy="225.5" rx="6.8" ry="3" fill="url(#dots)"/><ellipse cx="63" cy="231" rx="6.6" ry="2.6" fill="#7FD6D2"/><ellipse cx="137" cy="222" rx="6.8" ry="3" fill="url(#aquadots)"/><ellipse cx="137" cy="227.5" rx="6.6" ry="2.6" fill="#B5ECE7"/><ellipse cx="137" cy="233" rx="6.8" ry="3" fill="url(#dots)"/>`},
  bangles:{cat:'Extras',name:'Pink bangles',svg:`<ellipse cx="63" cy="222" rx="6.5" ry="2.6" fill="#F4A9C3"/><ellipse cx="63" cy="227" rx="6.5" ry="2.6" fill="#E8508F"/><ellipse cx="63" cy="232" rx="6.5" ry="2.6" fill="#D9B36A"/><ellipse cx="137" cy="227" rx="6.5" ry="2.6" fill="#F4A9C3"/><ellipse cx="137" cy="232" rx="6.5" ry="2.6" fill="#F7C9D8"/>`},
  bow:{cat:'Extras',name:'Hair bow',svg:`<path fill="#F3B6C9" d="M112 29 Q103 17 102 30 Q103 41 112 33 Z M116 29 Q125 17 126 30 Q125 41 116 33 Z"/><path fill="none" style="stroke:#E9649E;stroke-width:1.6" d="M112 33 L107 48 M116 33 L121 48"/><circle cx="114" cy="31" r="3.2" fill="#E9649E"/>`},
  sash:{cat:'Extras',name:'Fringe sash',svg:`<path fill="#E2448A" d="M82 181 Q100 187 118 181 L118 189 Q100 195 82 189 Z"/><path fill="#E2448A" d="M105 189 L111 181 L118 190 L112 197 Z"/><path fill="#E2448A" d="M108 194 L103 250 L109 251 L113 196 Z M113 195 L119 247 L124 245 L116 193 Z"/><path fill="none" style="stroke:#E2448A;stroke-width:.8" d="M103.5 251 L103 258 M105.5 251 L105.5 259 M108 251 L108.5 258 M119.5 247 L120 255 M122 246 L123 253"/>`},
  pearls:{cat:'Extras',name:'Pearls',svg:pearls},
  bag:{cat:'Extras',name:'Sequin bag',svg:`<path fill="none" style="stroke:#AEB5BF;stroke-width:1.4" d="M126 190 Q140 168 154 190"/><path fill="#F7B6CC" d="M124 190 L156 190 Q160 214 140 218 Q120 214 124 190 Z"/>${[[130,196],[138,200],[146,195],[150,204],[134,208],[142,210],[128,203]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="1.8" fill="#fff" fill-opacity=".7"/>`).join('')}<path fill="none" style="stroke:#fff;stroke-width:1.2" d="M130 190 q-4 8 2 12"/>`},
};
