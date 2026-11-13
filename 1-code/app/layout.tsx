import type { Metadata, Viewport } from "next";
import { Anton, DM_Mono, Hanken_Grotesk, Instrument_Serif, Pinyon_Script } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton", display: "swap" });
const instrument = Instrument_Serif({ weight: "400", style: ["normal", "italic"], subsets: ["latin"], variable: "--font-instrument", display: "swap" });
const pinyon = Pinyon_Script({ weight: "400", subsets: ["latin"], variable: "--font-pinyon", display: "swap" });
const dmMono = DM_Mono({ weight: ["400", "500"], subsets: ["latin"], variable: "--font-dm-mono", display: "swap" });
const hanken = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-hanken", display: "swap" });

const title = `${site.name} · Creator Portfolio`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s · ${site.name}` },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", siteName: site.name, title, description: site.description, locale: "en_IE" },
  twitter: { card: "summary_large_image", title, description: site.description },
};

export const viewport: Viewport = {
  themeColor: "#F4F2EE",
  viewportFit: "cover",
};

// Decides before first paint whether the envelope intro plays (once per visit, never with reduced motion).
const introScript = `try{if(!sessionStorage.getItem('jl-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('show-intro')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${anton.variable} ${instrument.variable} ${pinyon.variable} ${dmMono.variable} ${hanken.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
