export const site = {
  name: "Ali Haseni",
  shortName: "Ali",
  yearsExperience: 4,
  email: "haseniali920@gmail.com",
  phone: "+905399127498",
  phoneHref: "tel:+905399127498",
  social: {
    github: "https://github.com/Ali136384",
    linkedin: "https://www.linkedin.com/in/ali-haseni-0a1637296/",
  },
} as const;

export const projectMeta = [
  {
    slug: "toptalla",
    year: "2025",
    stack: ["React.js", "Ionic", "Strapi", "REST APIs"],
    href: "https://business.toptalla.com/en",
    accent: "#0d6b66",
  },
  {
    slug: "incaz",
    year: "2024",
    stack: ["React.js", "Tailwind CSS", "REST APIs"],
    href: "https://github.com/Ali136384",
    accent: "#1d4e6f",
  },
  {
    slug: "tafasil-roz",
    year: "2025",
    stack: ["UI/UX", "Frontend", "Responsive design"],
    href: "https://tafasilsalon.com",
    accent: "#5b3a29",
  },
  {
    slug: "oasport",
    year: "2023",
    stack: ["MongoDB", "Express.js", "React.js", "Node.js"],
    href: "https://oasport.com",
    accent: "#243447",
  },
  {
    slug: "torino",
    year: "2023",
    stack: ["MongoDB", "Express.js", "React.js", "Node.js"],
    href: "https://torinogastro.com",
    accent: "#0b5f5a",
  },
  {
    slug: "brogrammers",
    year: "2022",
    stack: ["MongoDB", "Express.js", "React.js", "Node.js"],
    href: "https://brogrammers.tech",
    accent: "#2f4558",
  },
] as const;

export const experienceMeta = [
  {
    id: "toptalla",
    company: "Toptalla",
    period: { en: "Oct 2025 – Present", tr: "Eki 2025 – Günümüz" },
    href: "https://toptalla.com",
  },
  {
    id: "freelance",
    company: "Freelance",
    period: { en: "2022 – 2025", tr: "2022 – 2025" },
    href: "https://www.linkedin.com/in/ali-haseni-0a1637296/",
  },
] as const;

export const educationMeta = [
  {
    id: "master",
    school: { en: "Sakarya University", tr: "Sakarya Üniversitesi" },
    period: { en: "2026 – Present", tr: "2026 – Günümüz" },
  },
  {
    id: "bachelor",
    school: {
      en: "Hasan Kalyoncu University, Türkiye",
      tr: "Hasan Kalyoncu Üniversitesi, Türkiye",
    },
    period: { en: "2021 – 2025", tr: "2021 – 2025" },
  },
] as const;
