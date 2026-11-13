import type { NextConfig } from "next";
import fs from "node:fs";
import path from "node:path";

/**
 * Video safety net: videos uploaded to GitHub sometimes land in folders like
 * "2-videos/public/assets/videos" instead of "public/assets/videos".
 * Before each build, gather every video + poster found in any such folder (here or one
 * level up) and copy it into public/assets/videos so the site can always find it.
 */
function gatherVideos() {
  const dest = path.join(process.cwd(), "public", "assets", "videos");
  const roots = [process.cwd(), path.dirname(process.cwd())];
  const seen = new Set<string>();
  const walk = (dir: string, depth: number) => {
    if (depth > 5 || seen.has(dir)) return;
    seen.add(dir);
    let entries: fs.Dirent[];
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
    for (const e of entries) {
      if (!e.isDirectory() || e.name === "node_modules" || e.name.startsWith(".")) continue;
      const full = path.join(dir, e.name);
      if (full === dest) continue;
      if (e.name === "videos" && path.basename(dir) === "assets") {
        for (const f of fs.readdirSync(full)) {
          if (!/\.(mp4|jpg)$/i.test(f)) continue;
          const to = path.join(dest, f);
          if (!fs.existsSync(to)) { fs.mkdirSync(dest, { recursive: true }); fs.copyFileSync(path.join(full, f), to); }
        }
      } else walk(full, depth + 1);
    }
  };
  for (const r of roots) walk(r, 0);
}
try { gatherVideos(); } catch { /* never block the build */ }

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    // The contact form can carry a small picture of the doll look the visitor styled
    serverActions: { bodySizeLimit: "2mb" },
  },
};

export default nextConfig;
