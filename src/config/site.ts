export const siteConfig = {
  school: {
    name: "Springfield International School",
    shortName: "Springfield",
    tagline: "Learning today. Leading tomorrow.",
    description:
      "A premium, modern school website starter built for scalability and reuse across multiple schools.",
    locale: "en-IN",
    timezone: "Asia/Kolkata",
  },
  contact: {
    phone: "+91 00000 00000",
    email: "info@springfieldschool.edu",
    addressLines: ["Springfield Campus", "MG Road", "Bengaluru, Karnataka"],
    mapUrl: "",
  },
  social: {
    facebook: "",
    instagram: "",
    youtube: "",
  },
  links: {
    admissions: "/admissions",
    contact: "/contact",
    notices: "/notices",
    events: "/events",
    gallery: "/gallery",
  },
  seo: {
    siteUrl: "http://localhost:3000",
    ogImagePath: "/og.png",
  },
} as const;

export type SiteConfig = typeof siteConfig;
