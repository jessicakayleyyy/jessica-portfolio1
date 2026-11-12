"use client";

import { useEffect, useRef, useState } from "react";

export type Track = { title: string; artist?: string; src: string };
export type PodAction = "toggle" | "next" | "prev" | "up" | "down";

/**
 * Pink iPod shuffle that plays the songs listed in content/site.ts.
 * The parent calls `command` (it sits inside a Draggable, so taps come from there).
 * Tracks whose files are missing are skipped automatically.
 */
export function useMusic(tracks: Track[]) {
  const audio = useRef<HTMLAudioElement | null>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const failed = useRef(new Set<number>());

  useEffect(() => {
    if (!tracks.length) return;
    const a = new Audio();
    a.preload = "none";
    a.volume = 0.6;
    a.src = tracks[0].src;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    audio.current = a;
    return () => { a.pause(); a.removeEventListener("play", onPlay); a.removeEventListener("pause", onPause); };
  }, [tracks]);

  const flash = (m: string) => {
    setMessage(m);
    setTimeout(() => setMessage(null), 2000);
  };

  const go = (n: number, autoplay: boolean) => {
    const a = audio.current;
    if (!a) return;
    const i = (n + tracks.length) % tracks.length;
    setIndex(i);
    a.src = tracks[i].src;
    if (autoplay) play(i);
  };

  const play = (i: number) => {
    const a = audio.current;
    if (!a) return;
    a.play().catch(() => {
      failed.current.add(i);
      if (failed.current.size >= tracks.length) { flash("add songs in site.ts ♪"); return; }
      go(i + 1, true); // skip a missing file
    });
  };

  // Play the next song when one ends
  useEffect(() => {
    const a = audio.current;
    if (!a) return;
    const onEnd = () => go(index + 1, true);
    a.addEventListener("ended", onEnd);
    return () => a.removeEventListener("ended", onEnd);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, tracks]);

  const command = (action: PodAction) => {
    const a = audio.current;
    if (!a) { flash("no songs yet ♪"); return; }
    if (action === "next" || action === "prev") go(index + (action === "next" ? 1 : -1), !a.paused);
    else if (action === "up" || action === "down") {
      a.volume = Math.max(0, Math.min(1, a.volume + (action === "up" ? 0.15 : -0.15)));
      flash(`volume ${Math.round(a.volume * 100)}`);
    } else if (a.paused) play(index);
    else a.pause();
  };

  const t = tracks[index];
  const label = message ?? (t ? `♪ ${t.title}${t.artist ? ` — ${t.artist}` : ""}` : "");
  return { playing, command, label, showLabel: playing || !!message };
}

export function MusicPod({ playing, label, showLabel }: { playing: boolean; label: string; showLabel: boolean }) {
  return (
    <div className={`ipod relative ${playing ? "on" : ""}`}>
      <div className="ipod-wheel">
        <button type="button" data-act="up" className="top-[3px] left-1/2 -translate-x-1/2" aria-label="Volume up" tabIndex={-1}>+</button>
        <button type="button" data-act="down" className="bottom-[2px] left-1/2 -translate-x-1/2" aria-label="Volume down" tabIndex={-1}>–</button>
        <button type="button" data-act="prev" className="top-1/2 left-[5px] -translate-y-1/2" aria-label="Previous song" tabIndex={-1}>⏮</button>
        <button type="button" data-act="next" className="top-1/2 right-[5px] -translate-y-1/2" aria-label="Next song" tabIndex={-1}>⏭</button>
        <button type="button" data-act="toggle" className="ipod-c" aria-label={playing ? "Pause" : "Play"} tabIndex={-1} />
      </div>
      <span className={`ipod-np ${label.length > 24 ? "long" : ""}`} style={{ opacity: showLabel ? 1 : 0 }} aria-live="polite">
        <span key={label}>{label}</span>
      </span>
    </div>
  );
}
