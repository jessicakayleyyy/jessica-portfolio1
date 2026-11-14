"use client";

import { AnimatePresence, motion, useMotionValue, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Draggable } from "@/components/collage/Draggable";
import { Digicam } from "@/components/collage/Digicam";
import { MusicPod, useMusic, type PodAction } from "@/components/collage/MusicPod";
import { BottleCap, BounceWord, TicketStub, Vinyl } from "@/components/collage/Objects";
import { Polaroid } from "@/components/collage/Polaroid";
import { Photo } from "@/components/ui/Photo";
import { site } from "@/content/site";

export function Hero() {
  const h = site.hero;
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const [shot, setShot] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [flash, setFlash] = useState(0);
  const music = useMusic(site.music, site.musicAutoplay);
  // The record idles round after load; once someone uses the iPod it follows the music
  const [idle, setIdle] = useState(false);
  const [touched, setTouched] = useState(false);
  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => setIdle(true), 1200);
    return () => clearTimeout(t);
  }, [reduce]);
  const spinning = music.playing || (idle && !touched);

  const podTap = (e: MouseEvent | TouchEvent | PointerEvent) => {
    const act = (e.target as Element | null)?.closest<HTMLElement>("[data-act]")?.dataset.act as PodAction | undefined;
    setTouched(true);
    music.command(act ?? "toggle");
  };

  const onMove = (e: React.MouseEvent) => {
    mx.set(e.clientX / window.innerWidth - 0.5);
    my.set(e.clientY / window.innerHeight - 0.5);
  };

  const snap = () => {
    setShot((s) => (s + 1) % h.cameraPhotos.length);
    setFlash((f) => f + 1);
  };

  return (
    <section className="hero" data-tone="light" onMouseMove={onMove}>
      <div className="wrap">
        <div className="hero-meta">
          <span>{h.metaLeft}</span>
          <span>{h.metaCenter}</span>
          <span>{h.metaRight}</span>
        </div>

        <div className="hero-title">
          <div className="hero-giant flex justify-center">
            <BounceWord word={h.backgroundWord} className="[&_span:hover]:text-pink" />
          </div>
          <h1 className="pointer-events-none">{site.name}</h1>
          <p className="mono hero-tag">{h.tagline}</p>
        </div>

        <div className="hero-row">
          <div className="hero-copy">
            <p className="hero-lede">{h.lede}</p>
            <p>{h.intro}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a className="cta cta-dark" href="#contact">Work with me →</a>
              <a className="cta cta-line" href="#content">See the content</a>
            </div>
          </div>

          <div className="collage">
            <Draggable style={{ right: -10, top: -10 }} depth={8} mouseX={mx} mouseY={my}>
              <Vinyl size={280} playing={spinning} />
            </Draggable>
            <Draggable style={{ left: 0, top: 110 }} rotate={-5} depth={14} mouseX={mx} mouseY={my} onTap={snap} cursor="snap">
              <Digicam>
                <div className="relative h-full w-full">
                  <span className="cam-counter">{shot + 1}/{h.cameraPhotos.length}</span>
                  <AnimatePresence initial={false}>
                    <motion.div key={shot} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
                      <Photo media={h.cameraPhotos[shot]} sizes="260px" priority={shot === 0} className="h-full w-full" />
                    </motion.div>
                  </AnimatePresence>
                  {flash > 0 && (
                    <motion.span key={flash} className="cam-flash" initial={{ opacity: 0.95 }} animate={{ opacity: 0 }} transition={{ duration: 0.45 }} />
                  )}
                </div>
              </Digicam>
            </Draggable>
            <Draggable style={{ right: 30, bottom: 6 }} rotate={8} depth={22} mouseX={mx} mouseY={my} onTap={podTap} cursor={music.playing ? "pause" : "play"}>
              <MusicPod playing={music.playing} label={music.label} showLabel={music.showLabel} />
            </Draggable>
            <Draggable style={{ left: 40, bottom: -4 }} rotate={-3} depth={18} mouseX={mx} mouseY={my}>
              <TicketStub {...h.ticket} />
            </Draggable>
            <Draggable style={{ left: 250, top: 10 }} rotate={-8} depth={26} mouseX={mx} mouseY={my} cursor="flip" onTap={() => setFlipped((f) => !f)}>
              <Polaroid media={h.printPhoto} caption={h.printCaption} back={h.printBack} backCaption={h.printBackCaption} flipped={flipped} />
            </Draggable>
            <Draggable style={{ left: 270, bottom: 60 }} rotate={10} depth={30} mouseX={mx} mouseY={my}>
              <BottleCap text={h.bottleCap} />
            </Draggable>
            <p className="hint collage-hint">Drag things around · snap the camera · tap the iPod for music</p>
          </div>
        </div>
      </div>
    </section>
  );
}
