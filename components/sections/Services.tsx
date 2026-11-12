import { BottleCap, Sparkles } from "@/components/collage/Objects";
import { ServiceList } from "@/components/ui/ServiceList";
import { site } from "@/content/site";

export function Services() {
  const s = site.services;
  return (
    <section id="services" className="section services" data-tone="dark" aria-labelledby="services-title">
      <Sparkles />
      <div className="wrap relative">
        <p className="mono text-cream/75">{s.eyebrow}</p>
        <h2 id="services-title" className="svc-title">{s.title}</h2>

        <ServiceList items={s.items} />

        <div className="svc-approach">
          <p className="svc-lpm">
            {s.approach.lines[0]}
            <span>{s.approach.lines[1]}</span>
          </p>
          <p className="mono !leading-[1.8] max-w-[44ch]">{s.approach.body}</p>
          <a
            href="#contact"
            aria-label="Rates on request, get in touch"
            data-cursor="enquire"
            className="transition-transform duration-300 ease-[cubic-bezier(.3,1.6,.5,1)] hover:scale-110 hover:-rotate-12"
          >
            <BottleCap text={s.approach.stamp} size={120} />
          </a>
        </div>
      </div>
    </section>
  );
}
