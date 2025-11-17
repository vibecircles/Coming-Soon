// IMPORTANT: Replace with your own domain address - it's used for SEO in meta tags and schema
const baseURL = "https://vibecircles.com";

// Import and set font for each variant
import { Geist } from "next/font/google";
import { Geist_Mono } from "next/font/google";

const heading = Geist({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const body = Geist({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const label = Geist({
  variable: "--font-label",
  subsets: ["latin"],
  display: "swap",
});

const code = Geist_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
});

const fonts = {
  heading: heading,
  body: body,
  label: label,
  code: code,
};

// default customization applied to the HTML in the main layout.tsx
const style = {
  theme: "system", // dark | light | system
  neutral: "gray", // sand | gray | slate
  brand: "blue", // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan
  accent: "indigo", // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan
  solid: "contrast", // color | contrast | inverse
  solidStyle: "flat", // flat | plastic
  border: "playful", // rounded | playful | conservative
  surface: "filled", // filled | translucent
  transition: "all", // all | micro | macro
  scaling: "100", // 90 | 95 | 100 | 105 | 110
};

const dataStyle = {
  variant: "gradient", // flat | gradient | outline
  mode: "categorical", // categorical | divergent | sequential
  height: 24, // default chart height
  axis: {
    stroke: "var(--neutral-alpha-weak)",
  },
  tick: {
    fill: "var(--neutral-on-background-weak)",
    fontSize: 11,
    line: false
  },
};

const effects = {
  mask: {
    cursor: false,
    x: 50,
    y: 0,
    radius: 100,
  },
  gradient: {
    display: false,
    x: 50,
    y: 0,
    width: 100,
    height: 100,
    tilt: 0,
    colorStart: "brand-background-strong",
    colorEnd: "static-transparent",
    opacity: 50,
  },
  dots: {
    display: true,
    size: "2",
    color: "brand-on-background-weak",
    opacity: 40,
  },
  lines: {
    display: false,
    color: "neutral-alpha-weak",
    opacity: 100,
    thickness: 1,
    angle: 45,
    size: "8",
  },
  grid: {
    display: false,
    color: "neutral-alpha-weak",
    opacity: 100,
    width: "2",
    height: "2",
  },
};

// metadata for pages
const meta = {
  home: {
    path: "/",
    title: "VibeCircles - Talk. Laugh. Be Real. No filters, just friendships.",
    description:
      "A place for positivity and people who vibe with you. Talk. Laugh. Be Real. – No filters, just friendships.",
    keywords: [
      "social media",
      "friendship",
      "community",
      "authentic connections",
      "positive vibes",
      "social networking",
      "real conversations",
      "genuine friendships",
    ],
    author: "VibeCircles",
    image: "/images/og/home.jpg",
    imageAlt: "VibeCircles - A place for positivity and authentic connections",
    canonical: "https://vibecircles.com",
    robots: "index,follow",
    alternates: [{ href: "https://vibecircles.com", hrefLang: "en" }],
    openGraph: {
      type: "website",
      siteName: "VibeCircles",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      creator: "@vibecircles",
      site: "@vibecircles",
    },
  },
  // add more routes and reference them in page.tsx
};

// social links
const social = {
  twitter: "https://x.com/vibecircles",
  linkedin: "https://www.linkedin.com/company/vibecircles/",
  discord: "https://discord.com/invite/vibecircles",
};

// default schema data
const schema = {
  logo: `${baseURL}/images/logo.png`,
  type: "Organization",
  name: "VibeCircles",
  description: meta.home.description,
  email: "info@vibecircles.com",
  url: baseURL,
  sameAs: [
    social.twitter,
    "https://www.instagram.com/vibecircles/",
    "https://www.facebook.com/profile.php?id=61577760104699",
    "https://www.threads.com/@vibecircles",
    "https://www.tiktok.com/@vibecircles",
    social.linkedin,
  ],
};

// routes configuration
const routes = [
  {
    path: "/",
    title: meta.home.title,
    description: meta.home.description,
  },
  // Add more routes here as needed
];

// layout configuration
const layout = {
  header: {
    show: true,
  },
  footer: {
    show: true,
  },
};

export { baseURL, fonts, style, meta, schema, social, effects, dataStyle, routes, layout };
