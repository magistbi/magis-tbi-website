export interface NavItem {
  label: string;
  href: string;
}

export interface AcronymItem {
  letter: string;
  meaning: string;
}

export interface ValuePoint {
  title: string;
  description: string;
}

export interface ProgramSection {
  title: string;
  summary: string;
  items: string[];
}

export interface FacilitySection {
  title: string;
  summary: string;
  details: string[];
}

export interface Metric {
  value: string;
  label: string;
}

export interface CohortSection {
  title: string;
  status: string;
  startups: string[];
}

export interface TeamMember {
  name: string;
  role: string;
}

export const magisNavItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Goals", href: "#goals" },
  { label: "Value", href: "#value" },
  { label: "Programs", href: "#programs" },
  { label: "Facilities", href: "#facilities" },
  { label: "Impact", href: "#impact" },
  { label: "Cohorts", href: "#cohorts" },
  { label: "Contact", href: "#contact" },
];

export const magisTaglines = [
  "#magisinnovate.",
  "#magisimpact.",
  "#magisopportunity.",
] as const;

export const magisAcronym: AcronymItem[] = [
  { letter: "M", meaning: "Maximizing" },
  { letter: "A", meaning: "Alliances for" },
  { letter: "G", meaning: "Greater" },
  { letter: "I", meaning: "Innovative" },
  { letter: "S", meaning: "Society" },
];

export const magisIdentity = {
  title: "ADNU MAGIS Technology Business Incubator",
  aboutTitle: "About MAGIS TBI",
  intro:
    "ADNU - MAGIS TBI is a university-owned and operated technology business incubator serving technology-focused or technology-utilizing growth-oriented startups.",
  acronym:
    'The word "MAGIS" in MAGIS TBI is an acronym for Maximizing Alliances for Greater Innovative Society.',
  vision:
    "We envision MAGIS TBI as the Bicol region's launchpad for innovation, where tech-driven dreams take flight, guided by mentorship, collaboration, and Ignatian values.",
  mission:
    "To build not just thriving startups, but purpose-driven leaders - men and women for others - fueling progress in their communities and beyond.",
  tagline: "Empowering Tech for Good.",
};

export const magisValuePoints: ValuePoint[] = [
  {
    title: "MAGIS Means More",
    description:
      "It signifies a commitment to doing more, being more, and loving more for God's greater glory.",
  },
  {
    title: "Vision & Mission",
    description:
      "We envision MAGIS TBI as the Bicol region's launchpad for innovation, where tech-driven dreams take flight, guided by mentorship, collaboration, and Ignatian values.",
  },
  {
    title: "Empowering Tech for Good",
    description:
      "Serving technology-focused or technology-utilizing growth-oriented startups with access to market and resources.",
  },
];

export const magisGoals = [
  "Turn bold ideas into sustainable, high-impact startups",
  "Empower entrepreneurs and MSMEs through hands-on programs and support",
  "Drive innovation and create lasting opportunities across the Bicol Region",
];

export const magisLaunchpad = {
  title: "Your Launchpad to Startup Success",
  summary:
    "Unlock the tools to thrive: get exclusive access to resources, expert mentorship, and hands-on support to turn your idea into a scalable, sustainable business.",
};

export const magisPrograms: ProgramSection[] = [
  {
    title: "Incubation Programs",
    summary: "Structured support that turns early ideas into viable concepts and startup growth.",
    items: [
      "Pre-Incubation Program: Shape raw ideas into viable concepts.",
      "IGNITE Incubation Program: Full-cycle support for startup growth.",
    ],
  },
  {
    title: "Innovation & Skills Development",
    summary: "Training experiences that strengthen founder capability and idea quality.",
    items: [
      "Ideation & Design Thinking Workshops",
      "SparkLab Hackathon & Pitch Competitions",
      "Technopreneurship Trainings",
    ],
  },
  {
    title: "Mentorship & Support",
    summary: "Practical guidance that keeps startups moving with confidence.",
    items: [
      "One-on-One Consultations with Experts",
      "Strategic Business Mentorship",
      "Customized Business Support Services",
    ],
  },
  {
    title: "Core Business Services",
    summary: "Operational assistance that lowers friction for emerging teams.",
    items: [
      "Accounting, Finance, and Legal Assistance",
      "Virtual Office Access & Admin Support",
      "Business Permit Processing and More",
    ],
  },
];

export const magisFacilities: FacilitySection[] = [
  {
    title: "Co-Working Spaces",
    summary:
      "Modern, flexible workspaces for incubatees and partner clients, open to both university-affiliated and external startups.",
    details: ["Collaborative work zones", "Flexible day-to-day use", "Founder-friendly layout"],
  },
  {
    title: "Board Room",
    summary:
      "A professional setting for intimate meetings, strategic sessions, and investor or partner presentations.",
    details: ["Private discussions", "Strategy sessions", "Presentation-ready setting"],
  },
  {
    title: "TBI Roof Deck",
    summary:
      "A vibrant open space for events, startup launches, and community gatherings designed to inspire innovation and connection.",
    details: ["Community events", "Launches and mixers", "Open-air collaboration"],
  },
  {
    title: "Internet-of-Things Laboratory",
    summary:
      "Access to 3D Printing Services, IoT Lab Equipment, and hands-on technical training to bring prototypes to life.",
    details: ["Prototype support", "Hands-on training", "Technical experimentation"],
  },
];

export const magisMetrics: Metric[] = [
  { value: "19", label: "Total startups" },
  { value: "70+", label: "Jobs created" },
  { value: "₱3.36M+", label: "Total revenue generated" },
  { value: "₱205K+", label: "Investments & grants" },
];

export const magisCohorts: CohortSection[] = [
  {
    title: "Cohort 1",
    status: "Ideas Towards Impact",
    startups: ["Votkita", "Dormease", "OkieDoc+", "Merchkins", "GTSE"],
  },
  {
    title: "Cohort 2",
    status: "Impact Reimagined (On-going)",
    startups: [
      "Parkmate",
      "Talassify",
      "UNITE",
      "Velocity One",
      "RyneMedia",
      "iKonek",
      "Fillr",
      "Studhue",
      "Knotify",
      "Naga Obserbar",
      "NAGAnap",
      "O-Tap Solutions",
      "Optimus Multimedia Marketing Group",
      "The Healthy Living Farm",
    ],
  },
];

export const magisTeam: TeamMember[] = [
  { name: "Ryvin Mercado", role: "TBI Manager" },
  { name: "Josh Martinez", role: "ITSO / Tech Transfer Officer | Dean, College of Computer Studies" },
  { name: "Anne Bagadion", role: "Marketing and Finance Officer | Dean, College of Business and Accountancy" },
  { name: "Mich Santos", role: "Mentorship Head | Chairperson, Department of Informatics - College of Computer Studies" },
  { name: "Gilbert Detera", role: "Community Manager & IoT Laboratory Manager" },
  { name: "Jude Buelva", role: "Incubation Program Officer & Entrepreneur" },
  { name: "Kenneth Del Carmen", role: "ICT and Operations Staff" },
  { name: "Jason Badong", role: "Marketing and Finance Staff" },
];

export const magisLocation = {
  heading: "Home of ADNU - MAGIS TBI",
  summary:
    "The incubator is housed at the 2nd Floor of the Matteo Ricci, S.J. Hall - College of Business and Accountancy Entrepreneurship Facilities.",
  address: "Ateneo de Naga University, Naga City, Camarines Sur, Philippines",
  supportLine: "We are a DOST-PCIEERD funded TBI, granted and approved in April 2024.",
};

export const magisFooterNotes = [
  "DOST-PCIEERD Funded",
  "Ateneo owned and operated",
] as const;
