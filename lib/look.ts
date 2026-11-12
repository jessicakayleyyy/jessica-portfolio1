"use client";

import { useSyncExternalStore } from "react";
import { DEFS } from "@/components/collage/wardrobe";

/**
 * The doll look a visitor styled in "Jess's Dress-Up", shared with the contact letter
 * so it can be pinned to their message and emailed to Jess as a picture.
 */
export type Look = { svg: string; name: string; items: string[]; image?: string };

let current: Look | null = null;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export const lookStore = {
  get: () => current,
  set(look: Look | null) {
    current = look;
    emit();
    if (look) renderJpeg(look.svg).then((image) => {
      if (current && current.svg === look.svg) { current = { ...current, image }; emit(); }
    }).catch((err) => console.warn("[look] could not make the picture", err));
  },
  subscribe(fn: () => void) { listeners.add(fn); return () => listeners.delete(fn); },
};

export const useLook = () => useSyncExternalStore(lookStore.subscribe, lookStore.get, () => null);

/** Same drawing rules as the .wl styles in globals.css, so the picture matches the page */
const WL_CSS = `.fill *:not([style*="stroke:"]){stroke:none!important}
.ink *{fill:none!important;stroke:#3B2B2B!important;stroke-width:.75px!important;stroke-linecap:round;stroke-linejoin:round}
.ink [style*="stroke:"]{display:none}
.hair .ink *{stroke:#4A2C20!important;stroke-width:.6px!important}`;

/** Turns the doll into a small JPEG (data URL) for the email. Kept small so the form stays fast. */
async function renderJpeg(inner: string): Promise<string> {
  const W = 300, H = 1100;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="40 14 120 440" width="${W}" height="${H}">
    <defs>${DEFS}</defs><style>${WL_CSS}</style>
    <rect x="40" y="14" width="120" height="440" fill="#F4F2EE"/>${inner}</svg>`;
  const img = new Image();
  img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  await img.decode();
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("no canvas");
  ctx.drawImage(img, 0, 0, W, H);
  return canvas.toDataURL("image/jpeg", 0.85);
}
