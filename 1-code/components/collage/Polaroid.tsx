import { Photo } from "@/components/ui/Photo";
import type { Media } from "@/content/site";

type Props = {
  media: Media;
  caption: string;
  width?: number;
  /** Optional second photo on the back: tap the print to flip it over */
  back?: Media;
  backCaption?: string;
  flipped?: boolean;
};

export function Polaroid({ media, caption, width = 120, back, backCaption, flipped = false }: Props) {
  if (!back) {
    return (
      <figure className="print" style={{ width }}>
        <Photo media={media} sizes={`${width}px`} priority />
        <figcaption>{caption}</figcaption>
      </figure>
    );
  }
  return (
    <div className={`flip-print ${flipped ? "flipped" : ""}`} style={{ width }}>
      <div className="flip-inner">
        <figure className="print flip-face">
          <Photo media={media} sizes={`${width}px`} priority />
          <figcaption>{caption}</figcaption>
        </figure>
        <figure className="print flip-face flip-back">
          <Photo media={back} sizes={`${width}px`} priority />
          <figcaption>{backCaption ?? caption}</figcaption>
        </figure>
      </div>
    </div>
  );
}
