import { About } from "@/components/sections/About";
import { ChooseYour } from "@/components/sections/ChooseYour";
import { Contact } from "@/components/sections/Contact";
import { DressMe } from "@/components/sections/DressMe";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { MemoryBox } from "@/components/sections/MemoryBox";
import { Numbers } from "@/components/sections/Numbers";
import { Services } from "@/components/sections/Services";
import { ShortForm } from "@/components/sections/ShortForm";
import { Cursor } from "@/components/ui/Cursor";
import { Glitter } from "@/components/ui/Glitter";
import { SideTabs } from "@/components/ui/SideTabs";
import { site } from "@/content/site";

export default function Home() {
  return (
    <>
      <Intro />
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-cream">
        Skip to content
      </a>
      <SideTabs />
      <Cursor />
      <Glitter />
      <main>
        <Hero />
        <ChooseYour />
        <About />
        <MemoryBox />
        <Numbers />
        <Services />
        <ShortForm />
        <DressMe />
        <Contact />
      </main>
      <footer className="bg-pink pb-28 text-center">
        <p className="mono mx-auto text-[#7a5a60]">© {site.year} {site.name} · Made in Dublin</p>
      </footer>
    </>
  );
}
