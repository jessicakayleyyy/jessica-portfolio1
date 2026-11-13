/* Small decorative collage objects. All are pure CSS/SVG, so they cost almost nothing to load. */

export function Vinyl({ size = 300, playing = true }: { size?: number; playing?: boolean }) {
  return <div className={`vinyl cd spin ${playing ? "" : "paused"}`} style={{ width: size, height: size }} />;
}

export function IPod({ playing = false }: { playing?: boolean }) {
  return (
    <div className="ipod relative">
      <span className="ipod-np" style={{ opacity: playing ? 1 : 0, transition: "opacity .3s" }}>now playing ♪</span>
      <div className="ipod-wheel">
        <span className="top-[3px] left-1/2 -translate-x-1/2">+</span>
        <span className="bottom-[2px] left-1/2 -translate-x-1/2">–</span>
        <span className="top-1/2 left-[5px] -translate-y-1/2">⏮</span>
        <span className="top-1/2 right-[5px] -translate-y-1/2">⏭</span>
      </div>
    </div>
  );
}

export function TicketStub({ top, title, bottom, stub }: { top: string; title: string; bottom: string; stub: string }) {
  return (
    <div className="ticket">
      <div className="ticket-a">
        <small>{top}</small>
        <b>{title}</b>
        <small>{bottom}</small>
      </div>
      <div className="ticket-s">{stub}</div>
    </div>
  );
}

export function BottleCap({ text, size = 96 }: { text: string; size?: number }) {
  return (
    <div className="bottlecap" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r="46" fill="#F7C9D8" />
        <circle cx="50" cy="50" r="47" fill="none" stroke="#E9A6BE" strokeWidth="5" strokeDasharray="3 3.2" />
        <circle cx="50" cy="50" r="36" fill="none" stroke="#fff" strokeOpacity=".6" />
      </svg>
      <span>{text}</span>
    </div>
  );
}

export function WaxSeal({ size = 92, initials = "JL", style }: { size?: number; initials?: string; style?: React.CSSProperties }) {
  return (
    <div className="seal" style={{ width: size, height: size, ...style }} aria-hidden="true">
      <span style={{ fontSize: size * 0.23 }}>{initials}</span>
    </div>
  );
}

/** A cream note pinned with a strip of pink tape. */
export function Note({ label, text, className = "", style }: { label: string; text: string; className?: string; style?: React.CSSProperties }) {
  return (
    <span className={`note ${className}`} style={style}>
      <small>{label}</small>
      {text}
    </span>
  );
}

/** Splits a word into letters that bounce on hover. */
export function BounceWord({ word, className = "" }: { word: string; className?: string }) {
  return (
    <span className={`bounce ${className}`} aria-label={word}>
      {[...word].map((c, i) => (
        <span key={i} aria-hidden="true">{c}</span>
      ))}
    </span>
  );
}

/** Four-point sparkles for the dark spread. Positions are fixed so server and client match. */
export function Sparkles({ count = 34 }: { count?: number }) {
  let seed = 7;
  const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  const stars: { x: number; y: number; s: number; o: number }[] = [];
  for (let i = 0; i < count * 2 && stars.length < count; i++) {
    const x = rand() * 100, y = rand() * 100, s = 6 + rand() * 12, o = 0.4 + rand() * 0.6;
    if (x > 20 && x < 75 && y > 20 && y < 85 && rand() < 0.8) continue; // keep the text area calm
    stars.push({ x, y, s, o });
  }
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {stars.map((st, i) => (
        <svg key={i} viewBox="0 0 24 24" width={st.s} height={st.s} className="sparkle absolute fill-[#E3DCDD]" style={{ left: `${st.x}%`, top: `${st.y}%`, opacity: st.o, animationDelay: `${(i % 7) * 0.4}s` }}>
          <path d="M12 0C13 8 16 11 24 12C16 13 13 16 12 24C11 16 8 13 0 12C8 11 11 8 12 0Z" />
        </svg>
      ))}
    </div>
  );
}
