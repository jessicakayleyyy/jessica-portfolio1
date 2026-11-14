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
  /** The post URL (TikTok/Instagram). Shown as a button in the pop-up. */
  link?: string;
  /** Extra posts for the same brand, shown as extra buttons in the pop-up */
  more?: { label: string; url: string }[];
  /** Brand logo in /public/assets/logos/, shown beside the video in the pop-up */
  logo?: string;
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
    { label: "TikTok", handle: "@jessicakayleyyy", url: "https://www.tiktok.com/@jessicakayleyyy" },
    { label: "Instagram", handle: "@jessicakayleyyy", url: "https://www.instagram.com/jessicakayleyyy" },
    { label: "YouTube", handle: "@jessicakayleyyy", url: "https://www.youtube.com/@jessicakayleyyy" },
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
      { src: "/assets/photos/hero-camera-fw1.jpg", alt: "Jessica dancing in a lace top and tulle skirt at fashion week", label: "photo · fashion week" },
      { src: "/assets/photos/hero-camera-1.jpg", alt: "Jessica in big sunglasses on a night out", label: "photo · night out" },
      { src: "/assets/photos/hero-camera-2.jpg", alt: "Jessica jumping off a boat into the sea", label: "photo · boat day" },
      { src: "/assets/photos/hero-camera-3.jpg", alt: "Jessica dancing in angel wings at a party", label: "photo · party night" },
      { src: "/assets/photos/hero-camera-fw2.jpg", alt: "Jessica dancing with her phone at fashion week", label: "photo · fashion week" },
    ] as Media[],
    printPhoto: { src: "/assets/photos/hero-polaroid.jpg", alt: "Jessica laughing at a stadium concert in Sydney", label: "photo · jess" } as Media,
    printCaption: "Sydney → Dublin",
    /** The back of the polaroid (tap it to flip) */
    printBack: { src: "/assets/photos/hero-polaroid-dublin.jpg", alt: "Jessica with a pint of Guinness overlooking Dublin", label: "photo · dublin" } as Media,
    printBackCaption: "Sydney → Dublin",
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
    { title: "zen yoga mom playlist part 2", src: "/assets/music/playlist.m4a" },
  ] as { title: string; artist?: string; src: string }[],
  /** Start the music automatically (as soon as the visitor first clicks or taps; browsers block sound before that) */
  musicAutoplay: true,

  choose: {
    step: "step 1",
    title: "What are you looking for?",
    personas: [
      { label: "PR", say: "Unboxings, first impressions & GRWMs", target: "#service-pr", cutout: { src: "/assets/photos/persona-pr.jpg", alt: "Jessica in a pink tulle skirt and track jacket in Dublin", label: "photo · street style" } as Media },
      { label: "Events", say: "Premieres, launches & festivals", target: "#service-events", cutout: { src: "/assets/photos/persona-events.jpg", alt: "Jessica at the Zootopia 2 premiere", label: "photo · premiere outfit" } as Media },
      { label: "Trips & Experiences", say: "Restaurants, hotels & brand trips", target: "#service-trips", cutout: { src: "/assets/photos/persona-trips.jpg", alt: "Jessica in a red dress by the sea at sunset", label: "photo · travel fit" } as Media },
      { label: "UGC", say: "Videos for your own channels", target: "#service-ugc", cutout: { src: "/assets/photos/persona-ugc.jpg", alt: "Jessica in a blue track jacket holding a drink", label: "photo · product shot" } as Media },
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
    youtube: "https://www.youtube.com/@jessicakayleyyy",
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
          { name: "His Boy Elroy", link: "https://www.instagram.com/reel/DTNUAi0j04z/", video: vid("his-boy-elroy", "His Boy Elroy") },
          { name: "Fireball", link: "https://www.instagram.com/reel/DAs-iBoiYv4/", video: vid("fireball-funlab", "Fireball × Funlab Halloween") },
          { name: "Belvedere", link: "https://www.instagram.com/reel/C776aXnSRt8/", video: vid("gitano-belvedere", "Gitano × Belvedere") },
          { name: "Six by Nico", link: "https://www.instagram.com/reel/DcJXVsZMSRp/", video: vid("six-by-nico", "Six by Nico") },
          { name: "Maxibon", link: "https://www.instagram.com/reel/DQv2iEGj4Tf/", video: vid("maxibon-stranger-things", "Maxibon × Stranger Things") },
          { name: "818 Tequila", link: "https://www.instagram.com/reel/C-AHgsGyYe2/", video: vid("boveda-818-tequila", "Bóveda × 818 Tequila") },
          { name: "Cinnamood" },
          { name: "Seoul Tonic", link: "https://www.instagram.com/reel/DQBga5djh2k/", video: vid("giveaway-clutch-flashback-seoul-tonic-mermade", "Seoul Tonic giveaway") },
          { name: "Bóveda", link: "https://www.instagram.com/reel/C-AHgsGyYe2/", video: vid("boveda-818-tequila", "Bóveda × 818 Tequila") },
          { name: "La Strada" },
          { name: "Gitano", link: "https://www.instagram.com/reel/C776aXnSRt8/", video: vid("gitano-belvedere", "Gitano × Belvedere") },
          { name: "The Boathouse", link: "https://www.instagram.com/reel/DSiuyank59u/", result: "15.9K views", video: vid("boathouse-yours-and-owls", "The Boathouse × Yours & Owls") },
          { name: "Zingi Beer", link: "https://www.instagram.com/reel/DaIclf3N_9D/", video: vid("zingi-beer", "Zingi Beer") },
        ],
      },
      {
        id: "ev",
        label: "Events & Experiences",
        brands: [
          { name: "Zootopia 2", link: "https://www.instagram.com/reel/DSXLYlVD0Vg/", video: vid("zootopia-2", "Disney+ Zootopia 2 premiere, Sydney") },
          { name: "Kilo Sale", link: "https://www.instagram.com/reel/C5nFqQAPfL4/", video: vid("kilo-sale", "Kilo Sale Sydney") },
          { name: "Chasing Millions", link: "https://www.instagram.com/reel/Dd_bJkPOKZO/", video: vid("chasing-millions", "Chasing Millions premiere") },
          { name: "TikTok Awards", link: "https://www.instagram.com/reel/DDEFjyYz8IJ/", more: [{ label: "TikTok Awards 2023", url: "https://www.instagram.com/reel/C0ltxprvUbJ/" }], video: vid("tiktok-awards", "TikTok Awards 2024") },
          { name: "TikTok Creator Camp", link: "https://www.instagram.com/reel/DC2yb-5zRq-/", video: vid("tiktok-creator-camp", "TikTok Creator Camp 2024") },
          { name: "Zero Latency VR", link: "https://www.instagram.com/reel/C_2E_UOCJ6s/", video: vid("zero-latency", "Zero Latency VR") },
          { name: "Girlhood Ireland", link: "https://www.instagram.com/reel/DcHZ7qkOrCw/", video: vid("girlhood", "Girlhood") },
          { name: "Holey Moley", link: "https://www.instagram.com/reel/DAs-iBoiYv4/", video: vid("fireball-funlab", "Holey Moley × Fireball × Funlab Halloween") },
          { name: "Funlab", link: "https://www.instagram.com/reel/DAs-iBoiYv4/", video: vid("fireball-funlab", "Funlab × Fireball Halloween") },
          { name: "Luna Park", link: "https://www.instagram.com/reel/DKYKTFxTOER/", more: [{ label: "Stranger Things: The Experience", url: "https://vt.tiktok.com/ZSpCTeRFG/" }], video: vid("luna-park", "Luna Park Sydney") },
          { name: "Stranger Things", link: "https://vt.tiktok.com/ZSpCTeRFG/", result: "175.2K views", video: vid("stranger-things-luna-park", "Stranger Things: The Experience × Luna Park") },
          { name: "Scream VI", link: "https://www.instagram.com/reel/Cpw5VZNgHDJ/" },
          { name: "Red Bull Dance Your Style", link: "https://www.instagram.com/reel/Da-pHxFNr9F/" },
          { name: "Ireland Fashion Week", link: "https://www.instagram.com/reel/DeW3E6WO-F1/", video: vid("ireland-fashion-week", "Ireland Fashion Week") },
          { name: "Lyf Hotel", link: "https://www.instagram.com/reel/DM7EJjHTAKc/", video: vid("lyf-hotel", "Lyf Hotel") },
        ],
      },
      {
        id: "bp",
        label: "Beauty & Products",
        brands: [
          { name: "Wonderskin", link: "https://www.instagram.com/reel/DaQDcFUtF35/", video: vid("wonderskin-supergirl", "Wonderskin × Supergirl") },
          { name: "Pierced", link: "https://www.instagram.com/reel/DdD2lqWuhVs/", video: vid("pierced", "Pierced Dublin") },
          { name: "Aerre" },
          { name: "Mermade Hair", link: "https://www.instagram.com/reel/DOCvPZUjxud/", video: vid("mermade-hair", "Mermade Hair") },
          { name: "Flashback", link: "https://www.instagram.com/reel/DQBga5djh2k/", video: vid("giveaway-clutch-flashback-seoul-tonic-mermade", "Flashback camera giveaway") },
          { name: "Clutch", link: "https://www.instagram.com/reel/DQBga5djh2k/", video: vid("giveaway-clutch-flashback-seoul-tonic-mermade", "Clutch glue giveaway") },
          { name: "BEA", video: vid("bea-brow-artistry", "BEA Brow Artistry") },
          { name: "Casetify", link: "https://www.instagram.com/reel/DSrEu_Ij35y/", video: vid("casetify-stranger-things", "Casetify × Stranger Things") },
        ],
      },
      {
        id: "fm",
        label: "Festivals & Music",
        brands: [
          { name: "Rolling Sets", link: "https://www.instagram.com/reel/DE6GayxTOzU/", video: vid("rolling-sets", "Rolling Sets festival") },
          { name: "Yours & Owls", link: "https://www.instagram.com/reel/DBIDcNHCu9_/", more: [{ label: "Yours & Owls Festival 2025", url: "https://www.instagram.com/reel/DJXxAwhzrTf/" }], video: vid("yours-and-owls", "Yours & Owls 10th birthday bash") },
          { name: "Untitled", link: "https://www.instagram.com/reel/DSlRHLuk2ED/", video: vid("untitled-dom-dolla", "Untitled Group × Dom Dolla") },
          { name: "Dom Dolla", link: "https://www.instagram.com/reel/DSlRHLuk2ED/", video: vid("untitled-dom-dolla", "Untitled Group × Dom Dolla") },
          { name: "Zach Bryan", link: "https://www.instagram.com/reel/DZ0AxLqt2ae/", video: vid("zach-bryan", "Zach Bryan") },
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
    /** `video` plays in a little phone beside the cursor when someone hovers that service (desktop) */
    items: [
      { id: "service-pr", title: "PR", points: ["Unboxings & first impressions", "GRWMs", "“What I'm using lately”"], body: "Only things I'd genuinely use.", video: vid("mermade-hair", "Mermade Hair") },
      { id: "service-events", title: "Event coverage", points: ["Premieres & launches", "Festivals", "Openings"], body: "Taking my audience along with me, from the red carpet to the afterparty.", video: vid("tiktok-awards", "TikTok Awards 2024") },
      { id: "service-trips", title: "Trips & Experiences", points: ["Restaurants & bars", "Hotels & travel", "Brand trips"], body: "Filmed the way I'd show a friend.", video: vid("lyf-hotel", "Lyf Hotel") },
      { id: "service-ugc", title: "UGC content", points: ["Product demos", "Talking-to-camera", "Lifestyle b-roll"], body: "Natural-looking videos your brand can run on its own channels.", video: vid("casetify-stranger-things", "Casetify × Stranger Things") },
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
      note: { label: "fan favourite", text: "Stranger Things × Luna Park", views: "175.2K", url: "https://vt.tiktok.com/ZSpCTeRFG/" },
      video: vid("stranger-things-luna-park", "Stranger Things: The Experience × Luna Park"),
    },
    /** The row of phones. `views` is optional; `url` is the TikTok/Instagram post (Instagram reel or TikTok link) */
    videos: [
      { title: "Stranger Things × Luna Park", platform: "Instagram", url: "https://www.instagram.com/reel/DRp9Y7ak4sP/", video: vid("stranger-things-luna-park-2", "Stranger Things × Luna Park") },
      { title: "Zootopia 2 premiere", platform: "Instagram", url: "https://www.instagram.com/reel/DSXLYlVD0Vg/", video: vid("zootopia-2", "Disney+ Zootopia 2 premiere") },
      { title: "TikTok Awards 2024", platform: "Instagram", url: "https://www.instagram.com/reel/DDEFjyYz8IJ/", video: vid("tiktok-awards", "TikTok Awards 2024") },
      { title: "Ireland Fashion Week", platform: "Instagram", url: "https://www.instagram.com/reel/DeW3E6WO-F1/", video: vid("ireland-fashion-week", "Ireland Fashion Week") },
      { title: "Casetify × Stranger Things", platform: "Instagram", url: "https://www.instagram.com/reel/DSrEu_Ij35y/", video: vid("casetify-stranger-things", "Casetify × Stranger Things") },
      { title: "The Boathouse × Yours & Owls", views: "15.9K", platform: "Instagram", url: "https://www.instagram.com/reel/DSiuyank59u/", video: vid("boathouse-yours-and-owls", "The Boathouse × Yours & Owls") },
      { title: "Maxibon × Stranger Things", platform: "Instagram", url: "https://www.instagram.com/reel/DQv2iEGj4Tf/", video: vid("maxibon-stranger-things", "Maxibon × Stranger Things") },
      { title: "Rolling Sets Festival", platform: "Instagram", url: "https://www.instagram.com/reel/DE6GayxTOzU/", video: vid("rolling-sets", "Rolling Sets festival") },
    ] as { title: string; views?: string; platform: string; url: string; video: Clip }[],
  },

  /**
   * "Jess's Dress-Up" paper-doll section. Each occasion is a preset outfit plus a note from you.
   * Garment ids: halter, corset, bluecrop, rufflecami, leopardcami, lacecami, tube, knit, gingham,
   * bralette, floral, tee, lowrise, dotmini, sweats, denim,
   * petticoat, tulle, poodle, ruffle, beaded, mintdot, corsetdress, gown, plaid, track, furcardi,
   * laceboots, creamboots, blueboots, uggs, cowboy, heels, flats, tights, belt, pinkshades,
   * blackshades, bakerboy, bangles, aquabangles, dotbangles, mixbangles, bow, sash, pearls, bag.
   */
  dressMe: {
    eyebrow: "GRWM",
    title: "Jess's Dress-Up",
    intro: "My paper-doll alter ego. Pick a look, or drag pieces from my closet onto me, then snap a pic.",
    startWith: "golden",
    occasions: [
      { id: "golden", name: "Golden hour", look: ["floral", "petticoat", "sash", "cowboy"] },
      { id: "offduty", name: "Model off-duty", look: ["tee", "sweats", "uggs", "bakerboy", "blackshades"] },
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
