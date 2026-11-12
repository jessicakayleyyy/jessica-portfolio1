import { Photo } from "@/components/ui/Photo";
import type { Media } from "@/content/site";

export function Polaroid({ media, caption, width = 120 }: { media: Media; caption: string; width?: number }) {
  return (
    <figure className="print" style={{ width }}>
      <Photo media={media} sizes={`${width}px`} />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
