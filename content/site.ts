/**
 * ─────────────────────────────────────────────────────────────
 *  ALL WEBSITE CONTENT LIVES HERE.
 *  Edit text, numbers, brands and videos in this one file.
 *  You never need to touch the components to update the site.
 *
 *  Photos  → put files in /public/assets/photos/   (jpg, png or webp)
 *  Cut-outs→ put files in /public/assets/cutouts/  (transparent png)
 *  Videos  → put files in /public/assets/videos/   (mp4, plus a .jpg poster)
 *
 *  If a file named below doesn't exist yet, the site shows a soft
 *  labelled placeholder in its place, so nothing ever looks broken.
 * ─────────────────────────────────────────────────────────────
 */

export type Media = {
  /** Path inside /public, e.g. "/assets/photos/hero-camera.jpg" */
  src?: string;
  /** Describe the photo for screen readers (leave "" for decorative) */
  alt: string;
  /** Text shown on the placeholder until the real file is added */
  label: string;
};

export type Clip = {
  /** MP4 file, e.g. "/assets/videos/boathouse.mp4" */
  src?: string;
  /** Optional WebM version (smaller) */
  webm?: string;
  /** Still image shown before the video plays */
  poster?: string;
  label: string;
};

export type Brand = {
  name: string;
  /** Add a video + result to make the brand clickable */
  video?: Clip;
  result?: string;
  link?: string;
};

export type BrandCategory = {
  id: string;
  label: string;
  brands: Brand[];
};

/** Shortcut for a video in /public/assets/videos/ (slug.mp4 + slug.jpg poster) */
const vid = (slug: string, label: string): Clip => ({
  src: `/assets/videos/${slug}.mp4`,
  poster: `/assets/videos/${slug}.jpg`,
  label: `video · ${label}`,
});

export const site = {
  name: "Jessica Latimer",
  /** Change to your real domain once it's connected in Vercel */
  url: "https://jessicakayleyyy.com",
  description:
    "Jessica Latimer is an Australian content and UGC creator based in Dublin, making food, events, travel and lifestyle content for brands.",
  year: 2026,

  email: "[email]",
  socials: [
    { label: "TikTok", handle: "[@handle]", url: "https://www.tiktok.com/@handle" },
    { label: "Instagram", handle: "[@handle]", url: "https://www.instagram.com/handle" },
    { label: "YouTube", handle: "[@handle]", url: "https://www.youtube.com/@handle" },
  ],
  /** Put your PDF at /public/media-kit.pdf, or set to null to hide the button */
  mediaKitPdf: "/media-kit.pdf" as string | null,

  intro: {
    title: "Dear Reader",
    subtitle: "Portfolio Details Inside",
    pill: "jessica latimer · creator portfolio",
  },

  hero: {
    metaLeft: "By Jessica Latimer",
    metaCenter: "Creator Portfolio 2026",
    metaRight: "Dublin ✈︎ Sydney",
    backgroundWord: "PORTFOLIO",
    tagline: "Content / UGC / Events — online, but make it personal",
    lede: "An Aussie in Dublin, filming life as it happens.",
    intro:
      "Food spots, premieres, launches and the small everyday parts of building a life abroad, made for brands that want content that feels like a friend's recommendation.",
    /** Photos on the digicam screen. Visitors tap the camera to flick through them. */
    cameraPhotos: [
      { src: "/assets/photos/hero-camera-1.jpg", alt: "Jessica at a film premiere", label: "photo · jess at a premiere" },
      { src: "/assets/photos/hero-camera-2.jpg", alt: "Jessica at brunch in Dublin", label: "photo · brunch in dublin" },
      { src: "/assets/photos/hero-camera-3.jpg", alt: "Jessica at a festival", label: "photo · festival day" },
    ] as Media[],
    printPhoto: { src: "/assets/photos/hero-polaroid.jpg", alt: "Jessica smiling", label: "photo · jess" } as Media,
    printCaption: "sydney → dublin",
    ticket: { top: "Admit one · Row A", title: "TikTok Awards", bottom: "3rd year running", stub: "No. 003" },
    bottleCap: "content, curated",
  },

  /**
   * Songs for the little iPod in the hero. Visitors tap it to play/pause,
   * tap ⏮ ⏭ to skip and + – for volume. Put MP3s in /public/assets/music/.
   *
   * ⚠️ Only use music you have the rights to (royalty-free tracks, or your own).
   *    Chart songs on a business website can get taken down.
   *    Leave the list empty [] to make the iPod purely decorative.
   */
  music: [
    { title: "Song title", artist: "Artist", src: "/assets/music/track-1.mp3" },
    { title: "Song title", artist: "Artist", src: "/assets/music/track-2.mp3" },
    { title: "Song title", artist: "Artist", src: "/assets/music/track-3.mp3" },
  ] as { title: string; artist?: string; src: string }[],

  choose: {
    step: "step 1",
    title: "What are you looking for?",
    personas: [
      { label: "PR", say: "Unboxings, first impressions & GRWMs", target: "#service-pr", cutout: { src: "/assets/cutouts/pr.png", alt: "Jessica in her unboxing look", label: "cut-out · unboxing look" } as Media },
      { label: "Events", say: "Premieres, launches & festivals", target: "#service-events", cutout: { src: "/assets/cutouts/events.png", alt: "Jessica in a premiere outfit", label: "cut-out · premiere outfit" } as Media },
      { label: "Trips & Experiences", say: "Restaurants, hotels & brand trips", target: "#service-trips", cutout: { src: "/assets/cutouts/trips.png", alt: "Jessica in a travel outfit", label: "cut-out · travel fit" } as Media },
      { label: "UGC", say: "Videos for your own channels", target: "#service-ugc", cutout: { src: "/assets/cutouts/ugc.png", alt: "Jessica filming on her phone", label: "cut-out · phone + ring light" } as Media },
    ],
  },

  about: {
    heading: { before: "It's", script: "Jessica", after: "Latimer!" },
    bio: [
      "I'm an Australian content creator who moved from Sydney to Dublin in May 2026. On TikTok and Instagram I share food spots, events and the small everyday parts of building a life abroad.",
      "I've worked on the Scream and Zootopia 2 premieres, Ireland Fashion Week, Red Bull Dance Your Style, Belvedere and Casetify. I went to TikTok Creator Camp, and I have been at the TikTok Awards three years running. Before creating I worked in retail and customer service, so I understand the brand side: what you need from a post, and why it matters.",
    ],
    badge: {
      club: "Creator Club",
      photo: { src: "/assets/photos/badge-headshot.jpg", alt: "Headshot of Jessica Latimer", label: "headshot" } as Media,
      fields: [
        { k: "Name", v: "Jessica Latimer" },
        { k: "Based", v: "Dublin (from Sydney)" },
        { k: "Specialty", v: "Lifestyle, events & UGC" },
        { k: "Awards", v: "TikTok Awards", tag: "×3" },
      ],
    },
    photobooth: [1, 2, 3, 4].map(
      (n): Media => ({ src: `/assets/photos/booth-${n}.jpg`, alt: "", label: String(n) }),
    ),
    based: "Dublin, Ireland\nOpen to travel across the EU, UK & Australia",
    /** Tapping an interest shows its line underneath */
    interests: [
      { name: "Food", say: "Every new café, pub and pop-up in Dublin, reviewed honestly." },
      { name: "Events", say: "Premieres, launches and the afterparty, filmed from the inside." },
      { name: "Fashion", say: "Outfits, GRWMs and what I'm wearing to the next thing." },
      { name: "Film", say: "Premiere nights and the films I can't stop talking about." },
      { name: "Travel", say: "Weekend trips from Dublin and flights home to Sydney." },
    ],
    youtube: "https://www.youtube.com/@handle",
  },

  memoryBox: {
    eyebrow: "What's in my memory box?",
    heading: { before: "Brands I've", script: "loved", after: "working with" },
    note: "Names marked with ▶ have a video · hover to preview, click to watch",
    /**
     * Every brand with a `video` opens it in a pop-up. Add `link` (the TikTok/Instagram post URL)
     * and `result` (e.g. "52K views") to show them too. Videos live in /public/assets/videos/.
     */
    categories: [
      {
        id: "fb",
        label: "Food & Beverage",
        brands: [
          { name: "His Boy Elroy", video: vid("his-boy-elroy", "His Boy Elroy") },
          { name: "Fireball", video: vid("fireball-funlab", "Fireball × Funlab Halloween") },
          { name: "Belvedere", video: vid("gitano-belvedere", "Gitano × Belvedere") },
          { name: "Six by Nico", video: vid("six-by-nico", "Six by Nico") },
          { name: "Maxibon", video: vid("maxibon-stranger-things", "Maxibon × Stranger Things") },
          { name: "818 Tequila", video: vid("boveda-818-tequila", "Bóveda × 818 Tequila") },
          { name: "Cinnamood" },
          { name: "Seoul Tonic", video: vid("giveaway-clutch-flashback-seoul-tonic-mermade", "Seoul Tonic giveaway") },
          { name: "Bóveda", video: vid("boveda-818-tequila", "Bóveda × 818 Tequila") },
          { name: "La Strada" },
          { name: "Gitano", video: vid("gitano-belvedere", "Gitano × Belvedere") },
          { name: "The Boathouse", result: "15.9K views", video: vid("boathouse-yours-and-owls", "The Boathouse × Yours & Owls") },
          { name: "Zingi Beer", video: vid("zingi-beer", "Zingi Beer") },
        ],
      },
      {
        id: "ev",
        label: "Events & Experiences",
        brands: [
          { name: "Zootopia 2", video: vid("zootopia-2", "Disney+ Zootopia 2 premiere, Sydney") },
          { name: "Kilo Sale", video: vid("kilo-sale", "Kilo Sale Sydney") },
          { name: "Chasing Millions", video: vid("chasing-millions", "Chasing Millions premiere") },
          { name: "TikTok Awards", video: vid("tiktok-awards", "TikTok Awards 2024") },
          { name: "TikTok Creator Camp", video: vid("tiktok-creator-camp", "TikTok Creator Camp 2024") },
          { name: "Zero Latency VR", video: vid("zero-latency", "Zero Latency VR") },
          { name: "Girlhood Ireland", video: vid("girlhood", "Girlhood") },
          { name: "Holey Moley" },
          { name: "Funlab", video: vid("fireball-funlab", "Funlab × Fireball Halloween") },
          { name: "Luna Park", video: vid("luna-park", "Luna Park Sydney") },
          { name: "Stranger Things", result: "175.2K views", video: vid("stranger-things-luna-park", "Stranger Things: The Experience × Luna Park") },
          { name: "Scream VI" },
          { name: "Red Bull Dance Your Style" },
          { name: "Ireland Fashion Week", video: vid("ireland-fashion-week", "Ireland Fashion Week") },
          { name: "Lyf Hotel", video: vid("lyf-hotel", "Lyf Hotel") },
        ],
      },
      {
        id: "bp",
        label: "Beauty & Products",
        brands: [
          { name: "Wonderskin", video: vid("wonderskin-supergirl", "Wonderskin × Supergirl") },
          { name: "Pierced", video: vid("pierced", "Pierced Dublin") },
          { name: "Aerre" },
          { name: "Mermade Hair", video: vid("mermade-hair", "Mermade Hair") },
          { name: "Flashback", video: vid("giveaway-clutch-flashback-seoul-tonic-mermade", "Flashback camera giveaway") },
          { name: "Clutch", video: vid("giveaway-clutch-flashback-seoul-tonic-mermade", "Clutch glue giveaway") },
          { name: "BEA", video: vid("bea-brow-artistry", "BEA Brow Artistry") },
          { name: "Casetify", video: vid("casetify-stranger-things", "Casetify × Stranger Things") },
        ],
      },
      {
        id: "fm",
        label: "Festivals & Music",
        brands: [
          { name: "Rolling Sets", video: vid("rolling-sets", "Rolling Sets festival") },
          { name: "Yours & Owls", video: vid("yours-and-owls", "Yours & Owls 10th birthday bash") },
          { name: "Untitled", video: vid("untitled-dom-dolla", "Untitled Group × Dom Dolla") },
          { name: "Dom Dolla", video: vid("untitled-dom-dolla", "Untitled Group × Dom Dolla") },
          { name: "Zach Bryan", video: vid("zach-bryan", "Zach Bryan") },
        ],
      },
    ] as BrandCategory[],
  },

  numbers: {
    title: "My Numbers",
    platform: "Instagram",
    period: "last 30 days",
    /** Update this whenever you refresh the numbers */
    updated: "1 November 2026",
    headline: [
      { label: "Views", value: 200, suffix: "K+", note: "in the last 30 days" },
      { label: "Interactions", value: 14.4, decimals: 1, suffix: "K", note: "likes, comments, shares & saves" },
      { label: "Followers", value: 2023, comma: true, note: "growing weekly" },
    ],
    nonFollowers: { label: "Non-follower reach", value: 82, suffix: "%", note: "of views come from new people" },
    /**
     * ⚠️ PLACEHOLDER SPLIT: replace with the real percentages from Instagram Insights.
     * (Only the 81% for 18–34 is real so far.)
     */
    ages: [
      { range: "18–24", pct: 38 },
      { range: "25–34", pct: 43 },
      { range: "35–44", pct: 12 },
      { range: "45+", pct: 7 },
    ],
    ageNote: "81% of followers are 18–34",
    gender: { women: 55, men: 45 },
    locations: ["Australia", "Ireland", "United States", "United Kingdom"],
  },

  services: {
    eyebrow: "Content services",
    title: "(Work with me.)",
    /** `photo` floats beside the cursor when someone hovers that service (desktop) */
    items: [
      { id: "service-pr", title: "PR", points: ["Unboxings & first impressions", "GRWMs", "“What I'm using lately”"], body: "Only things I'd genuinely use.", photo: { src: "/assets/photos/service-pr.jpg", alt: "", label: "photo · unboxing" } as Media },
      { id: "service-events", title: "Event coverage", points: ["Premieres & launches", "Festivals", "Openings"], body: "Taking my audience along with me, from the red carpet to the afterparty.", photo: { src: "/assets/photos/service-events.jpg", alt: "", label: "photo · premiere night" } as Media },
      { id: "service-trips", title: "Trips & Experiences", points: ["Restaurants & bars", "Hotels & travel", "Brand trips"], body: "Filmed the way I'd show a friend.", photo: { src: "/assets/photos/service-trips.jpg", alt: "", label: "photo · hotel stay" } as Media },
      { id: "service-ugc", title: "UGC content", points: ["Product demos", "Talking-to-camera", "Lifestyle b-roll"], body: "Natural-looking videos your brand can run on its own channels.", photo: { src: "/assets/photos/service-ugc.jpg", alt: "", label: "photo · filming setup" } as Media },
    ],
    approach: {
      lines: ["Less perfect.", "More personality."],
      body: "I always come with an idea for how I'd film it, so it feels like a recommendation from a friend, not an ad.",
      stamp: "rates on request",
    },
  },

  shortForm: {
    title: "short form content",
    featured: {
      title: "I ♡ my job",
      note: { label: "most viewed", text: "Stranger Things × Luna Park · 175.2K views" },
      video: vid("stranger-things-luna-park", "Stranger Things: The Experience × Luna Park"),
    },
    /** The row of phones. `views` is optional; `url` is the TikTok/Instagram post */
    videos: [
      { title: "Stranger Things × Luna Park", platform: "TikTok", url: "https://www.tiktok.com/@handle", video: vid("stranger-things-luna-park-2", "Stranger Things × Luna Park") },
      { title: "Zootopia 2 premiere", platform: "TikTok", url: "https://www.tiktok.com/@handle", video: vid("zootopia-2", "Disney+ Zootopia 2 premiere") },
      { title: "TikTok Awards 2024", platform: "TikTok", url: "https://www.tiktok.com/@handle", video: vid("tiktok-awards", "TikTok Awards 2024") },
      { title: "Ireland Fashion Week", platform: "TikTok", url: "https://www.tiktok.com/@handle", video: vid("ireland-fashion-week", "Ireland Fashion Week") },
      { title: "Casetify × Stranger Things", platform: "TikTok", url: "https://www.tiktok.com/@handle", video: vid("casetify-stranger-things", "Casetify × Stranger Things") },
      { title: "The Boathouse", views: "15.9K", platform: "TikTok", url: "https://www.tiktok.com/@handle", video: vid("boathouse-yours-and-owls", "The Boathouse × Yours & Owls") },
      { title: "Maxibon × Stranger Things", platform: "TikTok", url: "https://www.tiktok.com/@handle", video: vid("maxibon-stranger-things", "Maxibon × Stranger Things") },
      { title: "Rolling Sets", platform: "TikTok", url: "https://www.tiktok.com/@handle", video: vid("rolling-sets", "Rolling Sets festival") },
    ] as { title: string; views?: string; platform: string; url: string; video: Clip }[],
  },

  /**
   * "Jess's Dress-Up" paper-doll section. Each occasion is a preset outfit plus a note from you.
   * Garment ids: halter, corset, bluecrop, rufflecami, leopardcami, lacecami, tube, knit, gingham,
   * bralette, floral, tee, lowrise, dotmini, sweats, denim,
   * petticoat, tulle, poodle, ruffle, beaded, mintdot, corsetdress, gown, plaid, track, furcardi,
   * laceboots, creamboots, blueboots, uggs, cowboy, heels, flats, tights, belt, pinkshades,
   * blackshades, cap, bangles, bow, sash, pearls, bag.
   */
  dressMe: {
    eyebrow: "GRWM",
    title: "Jess's Dress-Up",
    intro: "My paper-doll alter ego. Pick a look, or drag pieces from my closet onto me, then snap a pic.",
    startWith: "golden",
    occasions: [
      { id: "golden", name: "Golden hour", look: ["floral", "petticoat", "sash", "cowboy"] },
      { id: "offduty", name: "Model off-duty", look: ["tee", "sweats", "uggs", "cap", "blackshades"] },
      { id: "y2k", name: "Y2K girly", look: ["halter", "lowrise", "belt", "blueboots", "pinkshades", "bangles"] },
      { id: "party", name: "Party night", look: ["corsetdress", "laceboots", "bangles", "bow"] },
      { id: "brunch", name: "Brunch", look: ["beaded", "tights", "heels", "pearls"] },
      { id: "fashion", name: "Fashion week", look: ["plaid", "dotmini", "creamboots", "pinkshades", "bag"] },
    ],
  },

  contact: {
    script: "and that's a",
    display: "WRAP.",
    greeting: "Dear Jess,",
  },
};

export type Site = typeof site;
