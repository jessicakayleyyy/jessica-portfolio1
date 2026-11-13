"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import type { Media } from "@/content/site";

type Props = {
  media: Media;
  /** Tell the browser how wide the image displays, e.g. "(max-width: 768px) 50vw, 300px" */
  sizes: string;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  /** "contain" for transparent cut-outs, "cover" (default) for photos */
  fit?: "cover" | "contain";
};

/**
 * Shows the real photo when the file exists, otherwise a soft labelled placeholder.
 * Drop a file at the path set in content/site.ts and it appears automatically.
 */
export function Photo({ media, sizes, className = "", style, priority, fit = "cover" }: Props) {
  const [failed, setFailed] = useState(false);
  const show = Boolean(media.src) && !failed;

  // Catches images that failed before React hydrated.
  const ref = useCallback((img: HTMLImageElement | null) => {
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  return (
    <div className={`photo ${className}`} style={style} data-label={show ? undefined : media.label} role={show ? undefined : "presentation"}>
      {show && (
        <Image
          ref={ref}
          src={media.src!}
          alt={media.alt}
          fill
          sizes={sizes}
          priority={priority}
          onError={() => setFailed(true)}
          style={{ objectFit: fit, objectPosition: fit === "contain" ? "bottom" : "center" }}
        />
      )}
    </div>
  );
}
