/* Every word on the site lives here.
   Node runs this file directly in scripts/check-content.mjs, so keep it to
   erasable TypeScript (types and plain values) with no "@/" imports. */

export type Img = { src: string; alt: string; width: number; height: number };
export type Link = { label: string; href: string };

export type Project = {
  slug: string;
  title: string;
  kind: "web" | "ai";
  year: string;
  pitch: string;
  client: string;
  role: string;
  image?: Img;
  art?: "quiz" | "inventory";
  gallery?: Img[];
  numbers: { label: string; value: string }[];
  stack: string[];
  features: string[];
  architecture: string[];
  challenges: { title: string; body: string }[];
  links: Link[];
};

export type Role = {
  org: string;
  title: string;
  place: string;
  /** YYYY-MM */
  start: string;
  /** YYYY-MM, or null for a current role */
  end: string | null;
  points: string[];
};

export type Service = {
  id: "web" | "ai";
  title: string;
  intro: string;
  offers: { title: string; body: string }[];
};

export type Stat = { value: number; suffix: string; max: number; label: string };

export const profile = {
  name: "Erick Dayle Loon",
  role: "Web developer and AI automation engineer",
  location: "Lapu-Lapu City, Cebu, Philippines",
  email: "daylecarlie@gmail.com",
  linkedin: "https://www.linkedin.com/in/erick-dayle-loon",
  years: 7,
};

export const hero = {
  title: "I build websites and the machines behind them.",
  sub: "Web development and AI automation from Lapu-Lapu City, Cebu. 7+ years building and rolling out software, most recently for life-sciences teams in 35+ countries.",
  hint: "Scroll to run the machine",
};

export const stations: string[] = [
  "A customer emails you at 2\u00a0a.m.",
  "AI reads it and sorts it: a quote request.",
  "It drafts the reply and logs the lead in your CRM.",
  "You approve with one click. Done before coffee.",
];

export const closingLine = "That's AI automation. I build these, and the websites they plug into.";

export const services: Service[] = [
  {
    id: "web",
    title: "Web development",
    intro: "Sites and apps that look sharp, load fast and are easy to run.",
    offers: [
      {
        title: "Marketing sites with motion",
        body: "Scroll-driven, animated sites in Next.js that still score well on speed.",
      },
      { title: "Web apps", body: "Logins, dashboards and admin panels in Laravel and React." },
      { title: "WordPress", body: "New builds, theme fixes, plugin setup and speed-ups." },
    ],
  },
  {
    id: "ai",
    title: "AI automation",
    intro: "Hand the repetitive work to software that does it the same way every time.",
    offers: [
      {
        title: "AI inside your app",
        body: "Content and quiz generation, AI grading, and chat over your own documents.",
      },
      {
        title: "Workflow automation",
        body: "Email triage, syncing data between systems, and scheduled reports with Python and Power Automate.",
      },
      {
        title: "Microsoft 365 and Copilot",
        body: "Setting up Copilot and automations for your team's day-to-day tools.",
      },
    ],
  },
];

export const atWork =
  "At BioTechnique I build Python integrations that connect an eQMS platform to client systems for life-sciences companies in 35+ countries.";

export const projects: Project[] = [
  {
    slug: "quizbee",
    title: "QuizBee",
    kind: "ai",
    year: "2026",
    pitch:
      "Teachers turn a topic, a PDF or a voice recording into a ready quiz. Students get AI grading, feedback and a tutor that answers back.",
    client: "My own product, built for schools",
    role: "Design, full-stack build and AI integration",
    art: "quiz",
    numbers: [
      { label: "Automated tests", value: "442" },
      { label: "Commits", value: "175" },
      { label: "Routes", value: "113" },
    ],
    stack: [
      "Laravel 13",
      "React",
      "TypeScript",
      "Inertia",
      "laravel/ai",
      "Groq",
      "Gemini",
      "Jina embeddings",
      "Laravel Reverb",
      "Capacitor",
    ],
    features: [
      "Generate quizzes from a topic, an uploaded document or an audio recording transcribed with Whisper.",
      "Five question types, including coding questions in a Monaco editor and essays graded by AI.",
      "Live, Kahoot-style sessions over websockets with leaderboards, timers and anti-cheat alerts.",
      "A streaming AI tutor for students and a co-pilot that drafts and publishes quizzes for teachers.",
      "A quiz bank with semantic search, sharing between teachers, gradebook export, streaks and push notifications.",
      "Installable as a web app and as an Android app through Capacitor.",
    ],
    architecture: [
      "Laravel 13, Inertia and React with TypeScript, with a laravel/ai agent for each AI job.",
      "Quiz generation runs on Groq (Llama 3.3 70B) and falls back to Gemini if Groq fails.",
      "Uploaded documents are chunked, embedded with Jina v3 and searched by similarity; the five best chunks go into the prompt.",
      "Tutor and co-pilot replies stream over Server-Sent Events; grading runs in queued jobs.",
      "Laravel Reverb broadcasts every live-session event.",
    ],
    challenges: [
      {
        title: "Vector search on any database",
        body: "Search uses pgvector on Postgres, native vector distance on MySQL 9, or a cosine fallback in PHP, picked once per process.",
      },
      {
        title: "Closing what an audit found",
        body: "Answer keys no longer reach students, deadlines are enforced on the server, and queue timeouts were fixed so no submission is graded twice. Each fix has a regression test.",
      },
    ],
    links: [],
  },
  {
    slug: "bookture-media",
    title: "Bookture Media",
    kind: "web",
    year: "2026",
    pitch:
      "A cinematic site for a book publisher. Authors explore services, the catalogue, awards and book fairs, then pitch their manuscript.",
    client: "Book publisher",
    role: "Design and front-end build",
    image: {
      src: "/work/bookture-media/cover.png",
      alt: "Bookture Media gold logo on a dark background",
      width: 1200,
      height: 630,
    },
    gallery: [
      {
        src: "/work/bookture-media/begin.jpg",
        alt: "Candlelit library hall from the Bookture site",
        width: 1600,
        height: 897,
      },
      {
        src: "/work/bookture-media/craft.jpg",
        alt: "Spiral library staircase from the Bookture site",
        width: 1600,
        height: 897,
      },
    ],
    numbers: [
      { label: "Homepage sections", value: "13" },
      { label: "Commits", value: "43" },
    ],
    stack: ["Next.js 16", "React 19", "Tailwind CSS 4", "GSAP", "Lenis", "React Three Fiber"],
    features: [
      "Thirteen scroll-driven homepage sections, including a pinned manifesto and a process timeline that draws itself.",
      "A 3D globe of the publisher's reach, built with React Three Fiber.",
      "Dark ink-and-gold and light parchment themes with matching images and hero video.",
      "An intro sequence: a drawn-logo preloader, a curtain exit and a video.",
      "Book fairs, FAQ and policy pages.",
    ],
    architecture: [
      "Next.js 16, React 19 and Tailwind CSS 4.",
      "One GSAP module registers every plugin, and a lint rule blocks importing GSAP anywhere else.",
      "Lenis smooth scrolling runs on GSAP's ticker, so there is one animation loop instead of two.",
      "The globe is lazy-loaded and stops rendering when it is off screen.",
    ],
    challenges: [
      {
        title: "Motion that respects people who turn it off",
        body: "Reduced motion is handled three ways: JS animations are skipped, smooth scrolling is never started, and CSS animations are cut. Content never waits on an animation to appear.",
      },
      {
        title: "One set of easing curves",
        body: "GSAP can't read CSS cubic-bezier values, so the same control points are registered as named GSAP eases and mirrored as CSS tokens.",
      },
    ],
    links: [
      { label: "Visit the live site", href: "https://bookturemedia.org" },
      { label: "View the code on GitHub", href: "https://github.com/carliedayle1/bookture-media" },
    ],
  },
  {
    slug: "unplug",
    title: "Unplug",
    kind: "web",
    year: "2026",
    pitch:
      "A playful site for a kids' activity book. Parents browse 101 screen-free activities, try the book's games and print a starter checklist.",
    client: "Children's activity-book author",
    role: "Design and build",
    image: {
      src: "/work/unplug/cover.jpg",
      alt: "UNPLUG! book cover with cartoon children on a yellow background",
      width: 1500,
      height: 1159,
    },
    gallery: [
      {
        src: "/work/unplug/page-074.webp",
        alt: "Book page: the Pig Latin activity",
        width: 1584,
        height: 1224,
      },
      {
        src: "/work/unplug/page-075.webp",
        alt: "Book page: the Hog Latin activity",
        width: 1584,
        height: 1224,
      },
    ],
    numbers: [
      { label: "Prerendered activity pages", value: "101" },
      { label: "Commits", value: "11" },
    ],
    stack: ["Next.js 16", "React 19", "Tailwind CSS 4", "Motion", "Python"],
    features: [
      "All 101 activities with live filters, each with its own page.",
      "A Boredom Button that picks a random activity to share.",
      "Pieces of the book you can play: a mind-reading trick, a secret-language translator and a dream planner.",
      "A sticker chart that remembers progress in the browser.",
      "A swipeable peek inside the book and print-ready pages.",
    ],
    architecture: [
      "Next.js 16, React 19 and Tailwind CSS 4, animated with Motion.",
      "All copy lives in typed content files, and every activity page is generated at build time.",
      "Printing targets one element instead of the whole page.",
    ],
    challenges: [
      {
        title: "Keeping the book's secrets",
        body: "A content check reads the raw data file and fails if a trick's secret or a puzzle's answer leaks into a teaser.",
      },
      {
        title: "Approval before publishing pages",
        body: "A Python script renders manuscript pages into a holding folder. Nothing reaches the site until it's approved.",
      },
    ],
    links: [{ label: "View the code on GitHub", href: "https://github.com/carliedayle1/unplug" }],
  },
  {
    slug: "inventory",
    title: "Inventory Manager",
    kind: "web",
    year: "2026",
    pitch:
      "Staff track products, suppliers and stock movements, see what's running low, and import or export the catalogue as Excel or CSV.",
    client: "Self-initiated, for small retail stockrooms",
    role: "Full-stack build",
    art: "inventory",
    numbers: [{ label: "Management screens", value: "4" }],
    stack: ["Laravel 13", "Livewire 3", "Tailwind CSS", "maatwebsite/excel", "Pest"],
    features: [
      "Products, categories, suppliers and stock movements, each with search, pagination and modal forms.",
      "Stock in and out updates quantities inside a database transaction and blocks taking out more than is on hand.",
      "A dashboard with totals, a low-stock count and recent movements.",
      "Excel and CSV import that updates products by SKU and creates missing categories and suppliers.",
      "CSV export, soft deletes and login with email verification.",
    ],
    architecture: [
      "Laravel 13 with Livewire 3 components rendered on the server.",
      "maatwebsite/excel handles import and export.",
      "A relational schema with unique SKUs and prices stored as decimals.",
    ],
    challenges: [
      {
        title: "Forgiving imports",
        body: "Common column-name variants are accepted, and re-importing a SKU updates the product instead of duplicating it.",
      },
      {
        title: "Stock that can't go below zero",
        body: "The stock check and the quantity change happen in one transaction.",
      },
    ],
    links: [],
  },
];

export const stats: Stat[] = [
  { value: 7, suffix: "+", max: 10, label: "years building and rolling out software" },
  { value: 1000, suffix: "+", max: 1200, label: "life-sciences clients on the eQMS I deploy" },
  { value: 35, suffix: "+", max: 50, label: "countries those clients work in" },
];

export const experience: Role[] = [
  {
    org: "BioTechnique (PSC Biotech Corporation)",
    title: "Software Implementation Engineer",
    place: "Lapu-Lapu City",
    start: "2024-01",
    end: null,
    points: [
      "Configure and deploy eQMS for 1,000+ life-sciences clients in 35+ countries.",
      "Build Python integrations between the eQMS and client systems.",
      "Maintain the Android app for Zebra scanners used in pharma and manufacturing.",
    ],
  },
  {
    org: "University of Cebu",
    title: "Information Technology Instructor",
    place: "Mandaue",
    start: "2024-01",
    end: null,
    points: [
      "Teach networking, programming and application development.",
      "Write hands-on labs in Java, Android and web technologies.",
    ],
  },
  {
    org: "Timeless Medical Systems",
    title: "Software Implementation Engineer",
    place: "Mandaue",
    start: "2022-03",
    end: "2023-12",
    points: [
      "Led medical software rollouts from requirements to go-live.",
      "Main technical contact between healthcare clients and developers; trained users and wrote the docs.",
    ],
  },
  {
    org: "Freelance",
    title: "React and WordPress Developer",
    place: "Cebu",
    start: "2020-03",
    end: "2022-03",
    points: [
      "Built React, Next.js and WordPress sites and shops for small and mid-sized businesses, from design to handover.",
    ],
  },
  {
    org: "Teradyne",
    title: "Data Analyst",
    place: "Cebu",
    start: "2019-04",
    end: "2020-03",
    points: [
      "Cleaned and analysed manufacturing data and turned it into reports for engineering and operations.",
    ],
  },
];

export const education = {
  degree: "BS Information Technology",
  school: "University of Cebu",
  years: "2016–2021",
};

export const certifications: string[] = [
  "MERN eCommerce from Scratch",
  "NextJS and React – The Complete Guide",
  "Android 14 and Kotlin Development",
  "Complete Python Bootcamp",
  "NextJS Dev to Deployment",
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Python", "JavaScript", "PHP", "Java", "Kotlin", "SQL"] },
  { group: "Frameworks", items: ["React", "Next.js", "Node.js", "Laravel", "WordPress"] },
  { group: "Mobile", items: ["Android (Kotlin, Java)", "Zebra scanner integration"] },
  {
    group: "Enterprise",
    items: ["eQMS implementation", "Microsoft 365", "Microsoft Copilot", "Power Automate"],
  },
  { group: "Databases", items: ["MySQL", "SQL Server"] },
];

export const contact = { heading: "Have a site to build or a task to automate?" };
