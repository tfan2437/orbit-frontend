export type NavLink = {
  text: string;
  href: string;
};

export type LinksGroup = {
  title: string;
  links: NavLink[];
};

export const NAVLINKS: NavLink[] = [
  { text: "Research", href: "/" },
  { text: "Safety", href: "/" },
  { text: "ChatGPT", href: "/" },
  { text: "Sora", href: "/" },
  { text: "API Platform", href: "/" },
  { text: "For Business", href: "/" },
  { text: "Stories", href: "/" },
  { text: "Company", href: "/" },
  { text: "News", href: "/" },
];

export const FOOTER_RESEARCH: LinksGroup = {
  title: "Our Research",
  links: [
    {
      text: "Research Index",
      href: "/",
    },
    {
      text: "Research Overview",
      href: "/",
    },
    {
      text: "Research Residency",
      href: "/",
    },
  ],
};

export const FOOTER_ADVANCEMENT: LinksGroup = {
  title: "Latest Advancements",
  links: [
    {
      text: "model 1",
      href: "/",
    },
    {
      text: "model 2",
      href: "/",
    },
    {
      text: "OrbitAI-3",
      href: "/",
    },
  ],
};

export const FOOTER_ORBITAI: LinksGroup = {
  title: "Orbit AI",
  links: [
    {
      text: "Explore Orbit",
      href: "/",
    },
    {
      text: "Enterprise",
      href: "/",
    },
    {
      text: "Education",
      href: "/",
    },
    {
      text: "Pricing",
      href: "/",
    },
    {
      text: "Download",
      href: "/",
    },
  ],
};

export const FOOTER_API: LinksGroup = {
  title: "Orbit AI",
  links: [
    {
      text: "Overview",
      href: "/",
    },
    {
      text: "Pricing",
      href: "/",
    },
    {
      text: "Documentation",
      href: "/",
    },
    {
      text: "Developer",
      href: "/",
    },
  ],
};

export const FOOTER_BUSINESS: LinksGroup = {
  title: "For Business",
  links: [
    {
      text: "Overview",
      href: "/",
    },
    {
      text: "Company",
      href: "/",
    },
    {
      text: "About us",
      href: "/",
    },
    {
      text: "Brand",
      href: "/",
    },
    {
      text: "News",
      href: "/",
    },
    {
      text: "Stories",
      href: "/",
    },
  ],
};

export const FOOTER_COMPANY: LinksGroup = {
  title: "Company",
  links: [
    {
      text: "About us",
      href: "/",
    },
    {
      text: "Our Charter",
      href: "/",
    },
    {
      text: "Careers",
      href: "/",
    },
    {
      text: "Brand",
      href: "/",
    },
  ],
};

export const FOOTER_POLICY: LinksGroup = {
  title: "Terms & Policies",
  links: [
    {
      text: "Terms of Use",
      href: "/",
    },
    {
      text: "Privacy Policy",
      href: "/",
    },
    {
      text: "Security",
      href: "/",
    },
    {
      text: "Other Policies",
      href: "/",
    },
  ],
};
