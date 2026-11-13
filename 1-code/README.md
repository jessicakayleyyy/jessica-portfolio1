# Jessica Latimer · Creator Portfolio

A Next.js 15 site styled like an editorial media kit crossed with a memory box: a "Dear Reader" envelope intro, draggable collage objects, a memory-box brand list, Instagram stats and phone-mockup videos.

---

## 1. Run it on your computer

You need **Node.js 20 or newer**. Get the LTS installer from [nodejs.org](https://nodejs.org).

```bash
cd "website"
npm install
npm run dev
```

Then open http://localhost:3000.

> The envelope intro plays once per browser tab. To see it again, open a new tab or a private window.

---

## 2. Update your content: `content/site.ts`

**Everything on the site lives in `content/site.ts`:** all copy, stats, brands, videos and social links. You never need to open the components.

| To change… | Edit in `site.ts` |
|---|---|
| Your email, handles, social links | `email`, `socials` |
| Hero text, ticket, bottle cap | `hero` |
| The four "What are you looking for?" cut-outs | `choose.personas` |
| Bio, ID badge, interests | `about` |
| Brands (and which ones open a video) | `memoryBox.categories` |
| Instagram stats + "last updated" date | `numbers` |
| Services and the approach line | `services` |
| Short-form videos and their view counts | `shortForm` |

**Make a brand clickable:** give it a `video` and/or a `result`, plus an optional `link` to the TikTok/Instagram post:

```ts
{ name: "Fireball", result: "52K views · 1.2K shares", link: "https://www.tiktok.com/@you/video/123",
  video: { src: "/assets/videos/fireball.mp4", poster: "/assets/videos/fireball.jpg", label: "video · Fireball" } },
```

**Refreshing your numbers each month:** change the values in `numbers.headline`, `numbers.ages`, `numbers.gender` and `numbers.locations`, then update `numbers.updated`.
⚠️ The age split (18–24 / 25–34 / 35–44 / 45+) is a **placeholder**. Replace it with your real Instagram Insights numbers.

---

## 3. Add your photos and videos

Drop files into `public/assets/` **using the exact names already listed in `site.ts`**, and they appear automatically. Until a file exists, a soft labelled placeholder shows in its place.

| Folder | What goes there | Tips |
|---|---|---|
| `public/assets/photos/` | `hero-camera-1.jpg` … `hero-camera-3.jpg` (the digicam screen; visitors tap to flick through), `hero-polaroid.jpg`, `badge-headshot.jpg`, `booth-1.jpg` … `booth-4.jpg`, `service-pr.jpg`, `service-events.jpg`, `service-trips.jpg`, `service-ugc.jpg` (float beside the cursor on the services) | JPG or WebP, max ~2000px wide. The site converts them to AVIF/WebP and resizes them for you. |
| `public/assets/cutouts/` | `pr.png`, `events.png`, `trips.png`, `ugc.png` | **Transparent PNG**, full-body, feet at the bottom edge (they stand on the pink carpet). remove.bg works well. |
| `public/assets/videos/` | `featured.mp4`, `boathouse.mp4`, `stranger-things-luna-park.mp4`, `video-3.mp4`, `video-4.mp4`, `belvedere.mp4`, `zootopia-2.mp4`, `casetify.mp4` + a matching `.jpg` poster for each | Keep each clip **under ~4 MB**: 720p, 10–20 seconds, no audio needed (they play muted). [HandBrake](https://handbrake.fr) → "Fast 720p30" works well. The poster is just a still frame. |
| `public/media-kit.pdf` | Your downloadable media kit | Set `mediaKitPdf: null` in `site.ts` to hide the button. |

To use a different file name, change its `src` in `site.ts`.

### Jess's Dress-Up (paper doll)

The paper doll is drawn in code (`components/collage/wardrobe.ts`) in a hand-drawn fashion-illustration style, so it needs no image files. Visitors drag pieces onto the doll, or tap them. Once someone has styled her, a mini polaroid of their look is pinned to the "Dear Jess" letter. When they send it, the email you receive includes the look's name, the pieces they picked, and the picture as an attachment (`styled-look.jpg`). They can tap "remove" if they'd rather not include it. To change the occasions, the outfit for each one, or your notes, edit `site.ts` → `dressMe`. The garment ids you can use are listed in a comment there.

### Music for the iPod

The little pink iPod in the hero plays real songs. Visitors tap it to play or pause, tap ⏮ ⏭ to skip, and tap + – for volume. The vinyl spins while music plays, and the song title scrolls underneath.

1. Put MP3 files in `public/assets/music/` (for example `track-1.mp3`).
2. List them in `site.ts` → `music`, with a title and artist for each.
3. Keep each file **under ~5 MB** (128 kbps MP3 is plenty).

⚠️ **Only use music you have the rights to:** royalty-free tracks (e.g. Pixabay Music, Uppbeat, Epidemic Sound) or your own. Chart songs on a business website can get it taken down. To make the iPod decorative only, set `music: []`.

---

## 4. Turn on the contact form (optional)

Without setup, the form shows an "Email me directly" link. To have it send real emails:

1. Make a free account at [resend.com](https://resend.com) and create an API key.
2. Copy `.env.example` to `.env.local` and fill in `RESEND_API_KEY` and `CONTACT_TO_EMAIL` (where enquiries should arrive).
3. On Vercel, add the same two values under **Project → Settings → Environment Variables**.

Until you verify your own domain in Resend, emails send from `onboarding@resend.dev`. That's fine for getting started.

---

## 5. Deploy to Vercel

1. Put this `website` folder in a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo and click **Deploy**. No settings needed.
3. Add your domain under **Project → Settings → Domains**, then set `url` in `site.ts` to that domain. That makes share previews and the sitemap use it.

Every time you push a change to `site.ts` or add photos, Vercel redeploys automatically.

---

## Project map

```
app/
  layout.tsx            fonts, metadata, intro-before-paint script
  page.tsx              puts the sections in order
  actions.ts            contact form (Resend)
  opengraph-image.tsx   link-preview image
  sitemap.ts, robots.ts, icon.svg
components/
  collage/              Digicam, Vinyl, IPod, TicketStub, BottleCap, WaxSeal, Polaroid,
                        PhotoStrip (click to shuffle), IDBadge (swings), PhoneMockup,
                        Draggable, Sparkles, Note, BounceWord
  sections/             Intro, Hero, ChooseYour, About, MemoryBox, Numbers, Services, ShortForm, Contact
  ui/                   Photo, Video, CountUp, Bar, Donut, Reveal, Modal, Peek, Cursor,
                        Interests, ServiceList, CopyEmail, SideTabs
content/site.ts         ← all your content
public/assets/          ← your photos, cut-outs and videos
```

**Design tokens** (colours and fonts) are at the top of `app/globals.css`.

**Accessibility and motion:** every animation, drag and parallax effect switches off when a visitor has "reduce motion" turned on. The collage objects are decorative and hidden from screen readers, and every button and link works with the keyboard.
