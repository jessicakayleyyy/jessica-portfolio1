"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { DOLL_VIEWBOX } from "@/components/collage/wardrobe";
import { sendMessage, type ContactState } from "@/app/actions";
import { useReducedMotion } from "framer-motion";
import { BounceWord, WaxSeal } from "@/components/collage/Objects";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { useLook } from "@/lib/look";
import { site } from "@/content/site";

const initial: ContactState = { status: "idle" };

export function Contact() {
  const c = site.contact;
  const [state, action, pending] = useActionState(sendMessage, initial);
  const formRef = useRef<HTMLFormElement>(null);
  const reduce = useReducedMotion();
  const [sealed, setSealed] = useState(false);
  const letterAnim = useRef<Animation | null>(null);
  // The doll look the visitor styled (if any), pinned to the letter and emailed as a picture
  const look = useLook();
  const [removedLook, setRemovedLook] = useState<string | null>(null);
  const showLook = !!look && removedLook !== look.svg;

  // Once the message is sent: the letter slides into the envelope (CSS then folds the flap,
  // stamps the seal, drops the envelope away and shows the thank-you note).
  useEffect(() => {
    if (state.status !== "sent") return;
    const letter = formRef.current;
    const front = letter?.parentElement?.querySelector(".env2-front");
    if (letter && front && !reduce) {
      letter.style.transform = "none";
      const L = letter.getBoundingClientRect();
      const F = front.getBoundingClientRect();
      const H = L.height;
      const open = F.top - L.top; // distance from the letter's top to the pocket's top edge
      const travel = open + 8;
      letter.style.transform = "";
      // clip-path hides whatever part of the letter has slipped below the pocket's edge
      letterAnim.current = letter.animate(
        [
          { transform: "translateY(0) rotate(-1deg)", clipPath: `inset(0 0 ${H - open}px 0)` },
          { transform: "translateY(-10px) rotate(0deg)", clipPath: `inset(0 0 ${H - open + 10}px 0)`, offset: 0.15 },
          { transform: `translateY(${travel}px) rotate(0deg)`, clipPath: `inset(0 0 ${H + travel - open}px 0)` },
        ],
        { duration: 900, easing: "cubic-bezier(.55,0,.35,1)", fill: "forwards" },
      );
    }
    setSealed(true);
  }, [state, reduce]);

  const writeAnother = () => {
    letterAnim.current?.cancel();
    formRef.current?.reset();
    setSealed(false);
    setTimeout(() => document.getElementById("f-name")?.focus({ preventScroll: true }), 50);
  };

  const mailto = () => {
    const f = formRef.current ? new FormData(formRef.current) : null;
    const subject = `Hello from ${f?.get("name") || "a brand"}${f?.get("brand") ? ` (${f.get("brand")})` : ""}`;
    return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(String(f?.get("message") || ""))}`;
  };

  return (
    <section id="contact" className="section contact" data-tone="light" aria-labelledby="contact-title">
      <div className="wrap">
        <h2 id="contact-title" className="contact-title">
          <span className="contact-script">{c.script}</span>
          <BounceWord word={c.display} className="contact-display flex justify-center" />
        </h2>

        <div className={`post ${sealed ? "sealing" : ""}`}>
        <div className="env2">
          <div className="env2-back" aria-hidden="true" />
          <div className="env2-flap" aria-hidden="true" />
          <form ref={formRef} action={action} className="letter" noValidate inert={sealed}>
            <p className="letter-hi">{c.greeting}</p>
            <div className="field"><label htmlFor="f-name">Name</label><input id="f-name" name="name" placeholder="your name" autoComplete="name" required /></div>
            <div className="field"><label htmlFor="f-brand">Brand</label><input id="f-brand" name="brand" placeholder="who you're with" autoComplete="organization" /></div>
            <div className="field"><label htmlFor="f-email">Email</label><input id="f-email" name="email" type="email" placeholder="so I can write back" autoComplete="email" required /></div>
            <div className="field"><label htmlFor="f-msg">Idea</label><textarea id="f-msg" name="message" rows={2} placeholder="tell me what you have in mind…" required /></div>
            {/* Spam trap: humans never see this field */}
            <input type="text" name="website" tabIndex={-1} autoComplete="off" className="sr-only" aria-hidden="true" />
            <div className="mt-6 flex flex-wrap items-center gap-3.5">
              <button type="submit" className="cta cta-dark disabled:opacity-60" disabled={pending}>
                {pending ? "Sealing…" : "Seal & send"}
              </button>
              {showLook && look && (
                <figure className="attach">
                  <div className="attach-img">
                    <svg className="wl" viewBox={DOLL_VIEWBOX} aria-hidden="true" dangerouslySetInnerHTML={{ __html: look.svg }} />
                  </div>
                  <figcaption>
                    + the look you styled<span>{look.name}</span>
                    <button type="button" onClick={() => setRemovedLook(look.svg)}>remove</button>
                  </figcaption>
                  <input type="hidden" name="lookName" value={look.name} />
                  <input type="hidden" name="lookItems" value={look.items.join(", ")} />
                  <input type="hidden" name="lookImage" value={look.image ?? ""} />
                </figure>
              )}
              <span className="letter-msg" role="status" aria-live="polite">
                {state.status === "error" && state.message}
                {state.status === "fallback" && (
                  <>The form isn&apos;t connected yet. <a href={mailto()} className="underline">Email me directly →</a></>
                )}
              </span>
            </div>
          </form>
          <div className="env2-front" aria-hidden="true" />
          <div className="env2-seal" aria-hidden="true">
            <WaxSeal size={76} style={{ top: 0 }} />
          </div>
        </div>
        <div className="sent-note" aria-live="polite">
          {sealed && (
            <>
              <h3>Sealed &amp; sent</h3>
              <p>Thank you! I&apos;ll write back soon ♡</p>
              <button type="button" onClick={writeAnother}>Write another</button>
            </>
          )}
        </div>
        </div>

        <div className="contact-reach">
          <CopyEmail email={site.email} />
          {site.socials.map((s) => (
            <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer">{s.label} ↗</a>
          ))}
          {site.mediaKitPdf && <a href={site.mediaKitPdf} download>Media kit PDF ↓</a>}
        </div>
      </div>
    </section>
  );
}
