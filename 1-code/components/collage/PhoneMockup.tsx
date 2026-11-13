import { Video } from "@/components/ui/Video";
import type { Clip } from "@/content/site";

export function PhoneMockup({ clip, width = 210, live = false }: { clip: Clip; width?: number; live?: boolean }) {
  return (
    <div className="phone" style={{ width }}>
      {live && (
        <span className="absolute top-11 left-[18px] z-[2] flex items-center gap-1.5 font-mono text-[.55rem] tracking-[.12em] text-white">
          <span className="h-1.5 w-1.5 animate-[blink_1.4s_infinite] rounded-full bg-[#ff5a5a]" />
          PLAYING
        </span>
      )}
      <Video clip={clip} />
    </div>
  );
}
