import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/content/site";

export const alt = `${site.name} - Creator Portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The preview card shown when the link is shared in WhatsApp, DMs, iMessage, email, etc.
 * It's a designed picture (public/assets/photos/og-card.png) in the site's own fonts and colours.
 * To change it, ask Claude to "redo my link preview".
 */
export default async function OGImage() {
  const png = await readFile(join(process.cwd(), "public/assets/photos/og-card.png"));
  return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png", "Cache-Control": "public, max-age=86400" } });
}
