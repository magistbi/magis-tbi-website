/* eslint-disable @next/next/no-img-element */

import type { ReactNode } from "react";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  CheckCircle2,
  Cpu,
  DraftingCompass,
  LaptopMinimal,
  Landmark,
  Mail,
  MapPin,
  Palette,
  Rocket,
  Share2,
  Sprout,
  TrendingUp,
  UserRound,
  Users,
  Trees,
  ListOrdered,
  type LucideIcon,
} from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  active?: boolean;
};

type ProgramCard = {
  title: string;
  description: string;
  icon: LucideIcon;
  linkLabel: string;
};

type StatItem = {
  value: string;
  label: string;
};

type JourneyStage = {
  title: string;
  description: string;
  accent: "primary" | "secondary";
  icon: LucideIcon;
};

type FocusArea = {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  iconTone: "teal" | "primary";
};

type SpaceCard = {
  title: string;
  image: string;
  badge: string;
  icon: LucideIcon;
  label: string;
  description: string;
};

type GraduateCard = {
  title: string;
  image: string;
  description: string;
  linkLabel: string;
};

type EventCard = {
  category: string;
  title: string;
  description: string;
  image: string;
};

const navItems: NavItem[] = [
  { label: "Home", href: "#", active: true },
  { label: "About", href: "#" },
  { label: "Programs", href: "#" },
  { label: "Events", href: "#" },
  { label: "Blog", href: "#" },
];

const programCards: ProgramCard[] = [
  {
    title: "Startup Incubation",
    description:
      "Tailored support for early-stage startups, focusing on AI-driven governance and GreenTech solutions for climate resilience.",
    icon: Rocket,
    linkLabel: "Discover More",
  },
  {
    title: "Creative Economy",
    description:
      "Leadership in animation and game development, fostering a vibrant ecosystem for Bicol's creative talents.",
    icon: Palette,
    linkLabel: "View Research",
  },
  {
    title: "Ethical Entrepreneurship",
    description:
      "Integrating Jesuit values into business models to ensure social impact and responsible growth.",
    icon: Users,
    linkLabel: "Join Community",
  },
];

const impactStats: StatItem[] = [
  { value: "30+", label: "Startups Incubated" },
  { value: "40%", label: "Funding Success Rate" },
  { value: "150+", label: "Mentorship Hours" },
  { value: "12", label: "Active Partnerships" },
];

const journeyStages: JourneyStage[] = [
  {
    title: "Pre-Incubation",
    description:
      "Focus on Ideation and Hackathons to validate groundbreaking concepts and assemble teams.",
    accent: "primary",
    icon: ListOrdered,
  },
  {
    title: "Incubation",
    description:
      "Intensive 6-month support focusing on MVP development and Intellectual Property (IP) training.",
    accent: "secondary",
    icon: ListOrdered,
  },
  {
    title: "Acceleration",
    description:
      "Advanced Market Validation and scaling strategies for startups ready to penetrate global markets.",
    accent: "primary",
    icon: ListOrdered,
  },
  {
    title: "Post-Incubation",
    description:
      "Continued Alumni Support, networking opportunities, and access to follow-on investment cycles.",
    accent: "primary",
    icon: ListOrdered,
  },
];

const focusAreas: FocusArea[] = [
  {
    title: "GreenTech",
    subtitle: "Climate Resilience Solutions",
    icon: Sprout,
    iconTone: "teal",
  },
  {
    title: "AI Governance",
    subtitle: "Data-driven Civic Impact",
    icon: Landmark,
    iconTone: "primary",
  },
];

const supportItems = [
  "Accounting & Finance",
  "Legal & IP Services",
  "Virtual Office Space",
  "Business Registration",
];

const facilityItems = [
  "IoT Laboratory",
  "Animation Studio",
];

const spaceCards: SpaceCard[] = [
  {
    title: "Co-Working Space",
    image:
      "https://lh3.googleusercontent.com/aida/AP1WRLsQWDlsLyX1JpCMsHcARqXY2JteB1QwiV5B8QBaLbfWTEWhiSFjiqnkhe7CcXaqik0Ul3pWe6YFRyKRt-XW9ZVDGhDLeyTWaMp511ysrwMY1axQTuNeoCQ_r1JRaBarMkBbKeN7Rmxoe3V12y524kSIENCimfdzNQfn0v33n_uIS8NiFLIAZkOVoSrZJSFUtpSixqpvz8AAUp_HwlKvS5c71sjtgQ5SHa6yX0B2WnllmQuE4C9bt8QURhM",
    badge: "Productivity Zone",
    icon: LaptopMinimal,
    label: "Available Daily",
    description: "A flexible space designed for individual use, study groups, or full-space rentals.",
  },
  {
    title: "Board Room",
    image:
      "https://lh3.googleusercontent.com/aida/AP1WRLs3b8InXs8NtKePIlVeG3Y3l7C_6VWWPs08tZCNZRdGoTH1iNLRCCUgdfSES9jq7v7uOFrucaN19jakyVSuDwoECTS9ml9y5DRriQ0UoTPk3HQZ_Kzes8zIT2lWIMzZAdc2YXXpnCvOpp7sRItNha3sXTD6K_YAwSq5C92uTK_jSHMIXANlw5ap1-7XaOYkc59N6xlHTaNpiUJRNnzhH4UiMb7ZpyRhuS_HFtoEnwLhqzizJ_5ZmawyRl0",
    badge: "Executive Suite",
    icon: Building2,
    label: "Private Booking",
    description: "Ideal for physical or virtual meetings, client sessions, and strategy planning.",
  },
  {
    title: "Roof Deck",
    image:
      "https://lh3.googleusercontent.com/aida/AP1WRLt5w8iBamV9HkkMokbNK8tDcf45ZgQLfTzFLgo1UcGb98Vl14mJH3u5d_IfUC-W_MmarG0aqO3zA8-scjPDM1_Npf87lBjHE8LkIIh8GPv_md1fUgHujKSDXlm6dpU6aXyiF7NRWpJkYA_JLLLzsXOLwtX1W_kmFC2W_eCt2Ywber_pd8_6kG4itZx43wt2wuKAmjyGZrE7_boj0zAIVmQut0G4m6z9Z2VweMY7PcFlPJOH9-x7wNxxOw",
    badge: "Creative Venue",
    icon: Trees,
    label: "Event Ready",
    description: "Open-air venue perfect for networking events, meetups, and informal gatherings.",
  },
];

const graduateCards: GraduateCard[] = [
  {
    title: "AgriTech Solutions",
    image:
      "https://lh3.googleusercontent.com/aida/AP1WRLuHZ5FDb_yXg6wxB5Nyg514qoYc46IR4y8eRwjUt3GAXXY6T6Lw7n4mSXzCk7j3fB308GC_2OZAHKG67IyxGaXSqWG7MH8Bx9_04wBqaH3wcDWRUhVOzm-4Y_UHB-vhLXjTRASvOb2I-GF3lw1lQSxn0s2KXy6nsXw1Xo_nBai2TrUv1XjgGCS6MahTk0BDo09amXPCSHC5l9n24fFeWZgbwb0bmieVw2R2huIFSg-mD3FxY9qAfs8D29w",
    description:
      "Pioneering climate-resilient farming through IoT-driven irrigation and sustainable soil monitoring.",
    linkLabel: "Success Story",
  },
  {
    title: "EduStream PH",
    image:
      "https://lh3.googleusercontent.com/aida/AP1WRLunKAddgPz5r5ynde74IS7Z6mr0v-X2BACgi0hRej5XZ5TTGRbYY3FbGU1L6EAUS60yvpshlL-JYO9etze-7U0__0iidwTZ-4Y0O4JinYUggvTa2G-7_GB7PahXLHN6jNBZuFcj6ru_AasqwjDuF48jMHVsuqa-bKjMs89PZ68CkWoBWb50B3dN1zvVQrNS5x7zruaMtiGQCF8Jq3YrBbBl_O8vnSrkxCfticZh9DtTIjoEQo6oHlThpPY",
    description:
      "An interactive learning platform connecting remote students with specialized tutors across Bicol.",
    linkLabel: "View Profile",
  },
  {
    title: "FinFlow Systems",
    image:
      "https://lh3.googleusercontent.com/aida/AP1WRLtILMeP-VewAEeHP_gJm53NHsy4IaftlTCV81D-3pY0CDibOZbEwd5vz0DICmET1HrgYaRGurqCb2mtF3BsAwmkgRgdXb4bmEogK_U6AEVfwUmo1fyH9WYHJ4u_Jo7kUDELy8cP3181Lrd3IwZJ3kcKRSM8xlPQpATMzV1se800_AlXiLHDl-kL_USox9aq1-5alFH1ub5ukR-Dr5dumwQmCdP3LzcbEobCyQQBIUF2_YxuebKo_3hAKw",
    description:
      "Streamlining financial management for MSMEs with ethical and localized accounting software.",
    linkLabel: "Success Story",
  },
];

const eventCards: EventCard[] = [
  {
    category: "Workshop",
    title: "AI for Good: Governance Workshop",
    description: "Exploring how AI-driven tools can improve local government efficiency.",
    image:
      "https://lh3.googleusercontent.com/aida/AP1WRLsEQSmHqRc79qQ1fMRdzbkfiWr9lksfTDs7bo_5fCh5DBtwS2RzR5bJQZt_ZGpH3AzKeoiPltDfT1Wxo8ry9ULlrx52rSzhhbQt6jcr-eL142oCW5xzvCNEKQzJe_0erZOZXmzXMmnnDo3F5k93cxavI3UdNjeKHGl36JQVnBvOPknqx43wQve5RgcsPrE-j-ANG4VF-G7gTPnNF5df2J51Rpo42RTpqEEndoq7fGQdaogKJD7upOmqSw",
  },
  {
    category: "Networking",
    title: "Bicol Creative Mixer 2024",
    description: "Connecting animation studios and game developers with investors.",
    image:
      "https://lh3.googleusercontent.com/aida/AP1WRLtILMeP-VewAEeHP_gJm53NHsy4IaftlTCV81D-3pY0CDibOZbEwd5vz0DICmET1HrgYaRGurqCb2mtF3BsAwmkgRgdXb4bmEogK_U6AEVfwUmo1fyH9WYHJ4u_Jo7kUDELy8cP3181Lrd3IwZJ3kcKRSM8xlPQpATMzV1se800_AlXiLHDl-kL_USox9aq1-5alFH1ub5ukR-Dr5dumwQmCdP3LzcbEobCyQQBIUF2_YxuebKo_3hAKw",
  },
  {
    category: "Demo Day",
    title: "Incubation Batch #05 Finale",
    description: "Watch our top startups pitch their final products.",
    image:
      "https://lh3.googleusercontent.com/aida/AP1WRLuHZ5FDb_yXg6wxB5Nyg514qoYc46IR4y8eRwjUt3GAXXY6T6Lw7n4mSXzCk7j3fB308GC_2OZAHKG67IyxGaXSqWG7MH8Bx9_04wBqaH3wcDWRUhVOzm-4Y_UHB-vhLXjTRASvOb2I-GF3lw1lQSxn0s2KXy6nsXw1Xo_nBai2TrUv1XjgGCS6MahTk0BDo09amXPCSHC5l9n24fFeWZgbwb0bmieVw2R2huIFSg-mD3FxY9qAfs8D29w",
  },
  {
    category: "Seminar",
    title: "Intellectual Property for Creatives",
    description: "Securing your innovations in animation and tech.",
    image:
      "https://lh3.googleusercontent.com/aida/AP1WRLuAgDagtMKGTG3a5E4eBOlGtErqdEfSQEfyB6MaPjWs-lhozrm40b4gHJkKLjyqBtNC2MrJDuhfC2Q8sceNJIEBTSKfZuN1cf0PsWtoUIh39pz5z0NCX8Ok_JmwINey_TFbanAkQRXsU15Mml7mzy2Km9RNDchapI5aP1cay5m5csVk_BV171-JDfiHSTqMxeS3SUUi5T31wYaPhFTRt26lVUNhqq13owdAY3Ko_puao6tX7hxJWHYLqw",
  },
];

const partnerImage =
  "https://lh3.googleusercontent.com/aida/AP1WRLscZLyXQYnHIPaUnDa-4TYcjgoPpQ3XVXd5Mgz1riFT1eiZThSM6LDX17D7iz21E625v7QtHeTr79gLaos2UIHT0bUHyP9Pv7j-Uu8r5teWs0J6b0zgUC5cvv9mv_WIKd-Nl94DEBsIt0BbFuTel-RqBWmDzPmVp3vvVZoilkPhFAObxXsSGyCaA6e1tKlsuhXJLJxE4wEN_MfUqAwsKpc-Eg-Xyds3f_CTFklQDNQMxPp9qCsVZz9WcXE";

function MetricCard({ value, label }: StatItem) {
  return (
    <div>
      <div className="mb-2 text-[48px] font-bold leading-none tracking-[-0.02em] text-secondary-container">
        {value}
      </div>
      <div className="text-[12px] font-semibold uppercase tracking-[0.28em] text-on-primary/60">
        {label}
      </div>
    </div>
  );
}

function RoundedImageCard({
  image,
  alt,
  className,
  children,
}: {
  image: string;
  alt: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={`relative overflow-hidden rounded-xl ${className ?? ""}`}>
      <img alt={alt} className="h-full w-full object-cover" src={image} />
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <main className="bg-background text-on-surface">
      <header className="sticky top-0 z-50 border-b border-outline-variant bg-surface/90 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#" className="flex items-center gap-4">
            <img
              alt="ADNU MAGIS TBI Logo"
              className="h-12 w-12 object-contain"
              src={partnerImage}
            />
            <span className="font-heading text-[24px] font-bold leading-[1.3] text-primary">
              ADNU MAGIS TBI
            </span>
          </a>

          <nav className="hidden items-center space-x-8 md:flex" aria-label="Primary">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={[
                  "font-heading text-[16px] transition-all duration-300",
                  item.active
                    ? "border-b-2 border-secondary text-primary font-bold"
                    : "text-on-surface-variant hover:text-primary",
                ].join(" ")}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="#"
              className="hidden font-semibold text-primary hover:opacity-80 lg:block"
            >
              Book Facility
            </a>
            <button
              type="button"
              className="rounded-lg bg-secondary-container px-6 py-2.5 font-bold text-on-secondary-container shadow-sm transition-all duration-300 hover:scale-95 active:scale-90"
            >
              Contact Us
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="relative flex h-[85vh] items-center overflow-hidden bg-primary">
          <div className="absolute inset-0 z-0">
            <div
              className="h-full w-full bg-cover bg-center opacity-40 mix-blend-overlay"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAQNQCXHbbfMHzEDDKNSSM1_angudws2cn9Ks2m5Xa5YG5C5-dhljFa5e1w056CjLGOB_2kfQmKC4Zs5OR5IN63NWyzMBsHBS2oG5PUcrJhZiQm_4O1v7bGbBDZme5OUqgG0zZt9nkDFUEw97eM0AIzzEDqZFfJGNFh4RBbK509xHG08y09FpOQLVap5pjstd4RxF0phThBBkaIB2HXAZxPBcNlrKFLnftVAO27KFu48yCZ1_vHUcIOr7-Vpuh5mUmTUWeaVnSUEC4')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h1 className="mb-6 font-heading text-[48px] font-bold leading-[1.1] tracking-[-0.02em] text-on-primary sm:text-[48px]">
                MAGIS Innovate.
                <br />
                MAGIS Impact.
                <br />
                <span className="text-secondary-container">MAGIS Opportunity.</span>
              </h1>
              <p className="mb-8 max-w-xl text-[18px] leading-[1.6] text-on-primary/90">
                Rooted in Jesuit values and the spirit of &quot;Magis,&quot; we champion ethical
                entrepreneurship to maximize alliances for a greater innovative society.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  type="button"
                  className="rounded-lg bg-secondary-container px-8 py-4 text-[18px] font-bold text-on-secondary-container shadow-lg transition-all hover:bg-secondary-fixed hover:-translate-y-1"
                >
                  Explore Programs
                </button>
                <button
                  type="button"
                  className="rounded-lg border-2 border-on-primary px-8 py-4 text-[18px] font-bold text-on-primary transition-all hover:bg-on-primary hover:text-primary"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-heading text-[48px] font-bold leading-[1.1] tracking-[-0.02em] text-primary">
              Empowering Innovation
            </h2>
            <p className="mx-auto max-w-2xl text-[18px] leading-[1.6] text-on-surface-variant">
              We provide the structural foundations and ethical guidance for entrepreneurs to build
              sustainable and impactful technology ventures.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {programCards.map((card) => (
              <div
                key={card.title}
                className="group rounded-xl border border-outline-variant bg-white p-8 shadow-sm transition-all hover:shadow-md"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-surface-container-high text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <card.icon className="size-10" aria-hidden="true" />
                </div>
                <h3 className="mb-4 font-heading text-[24px] font-semibold leading-[1.3] text-primary">
                  {card.title}
                </h3>
                <p className="mb-6 text-on-surface-variant">{card.description}</p>
                <a
                  href="#"
                  className="flex items-center gap-2 font-bold text-secondary transition-all group-hover:gap-4"
                >
                  {card.linkLabel}
                  <ArrowRight className="size-5" aria-hidden="true" />
                </a>
              </div>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden bg-primary py-20 text-on-primary">
          <div className="pointer-events-none absolute right-0 top-0 h-full w-1/3 opacity-10">
            <TrendingUp className="absolute -right-20 -top-20 size-[400px]" aria-hidden="true" />
          </div>

          <div className="relative z-10 mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
              <div>
                <h2 className="mb-6 font-heading text-[48px] font-bold leading-[1.1] tracking-[-0.02em]">
                  Our Impact &amp; Achievements
                </h2>
                <p className="mb-12 text-[18px] leading-[1.6] text-on-primary/80">
                  Tracking our progress in building the startup ecosystem of the Bicol region. We are
                  recognized for our Creative Economy Leadership in animation and game development.
                </p>
                <div className="grid grid-cols-2 gap-8">
                  {impactStats.map((stat) => (
                    <MetricCard key={stat.label} {...stat} />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-12">
                  <RoundedImageCard
                    alt="Startup team collaborating"
                    image="https://lh3.googleusercontent.com/aida/AP1WRLuHZ5FDb_yXg6wxB5Nyg514qoYc46IR4y8eRwjUt3GAXXY6T6Lw7n4mSXzCk7j3fB308GC_2OZAHKG67IyxGaXSqWG7MH8Bx9_04wBqaH3wcDWRUhVOzm-4Y_UHB-vhLXjTRASvOb2I-GF3lw1lQSxn0s2KXy6nsXw1Xo_nBai2TrUv1XjgGCS6MahTk0BDo09amXPCSHC5l9n24fFeWZgbwb0bmieVw2R2huIFSg-mD3FxY9qAfs8D29w"
                    className="h-64 border-4 border-white/10"
                  />
                  <RoundedImageCard
                    alt="Pitch competition event"
                    image="https://lh3.googleusercontent.com/aida/AP1WRLuAgDagtMKGTG3a5E4eBOlGtErqdEfSQEfyB6MaPjWs-lhozrm40b4gHJkKLjyqBtNC2MrJDuhfC2Q8sceNJIEBTSKfZuN1cf0PsWtoUIh39pz5z0NCX8Ok_JmwINey_TFbanAkQRXsU15Mml7mzy2Km9RNDchapI5aP1cay5m5csVk_BV171-JDfiHSTqMxeS3SUUi5T31wYaPhFTRt26lVUNhqq13owdAY3Ko_puao6tX7hxJWHYLqw"
                    className="h-48 border-4 border-white/10"
                  />
                </div>
                <div className="space-y-4">
                  <RoundedImageCard
                    alt="Innovation lab workshop"
                    image="https://lh3.googleusercontent.com/aida/AP1WRLtILMeP-VewAEeHP_gJm53NHsy4IaftlTCV81D-3pY0CDibOZbEwd5vz0DICmET1HrgYaRGurqCb2mtF3BsAwmkgRgdXb4bmEogK_U6AEVfwUmo1fyH9WYHJ4u_Jo7kUDELy8cP3181Lrd3IwZJ3kcKRSM8xlPQpATMzV1se800_AlXiLHDl-kL_USox9aq1-5alFH1ub5ukR-Dr5dumwQmCdP3LzcbEobCyQQBIUF2_YxuebKo_3hAKw"
                    className="h-48 border-4 border-white/10"
                  />
                  <RoundedImageCard
                    alt="Mentorship session"
                    image="https://lh3.googleusercontent.com/aida/AP1WRLuHZ5FDb_yXg6wxB5Nyg514qoYc46IR4y8eRwjUt3GAXXY6T6Lw7n4mSXzCk7j3fB308GC_2OZAHKG67IyxGaXSqWG7MH8Bx9_04wBqaH3wcDWRUhVOzm-4Y_UHB-vhLXjTRASvOb2I-GF3lw1lQSxn0s2KXy6nsXw1Xo_nBai2TrUv1XjgGCS6MahTk0BDo09amXPCSHC5l9n24fFeWZgbwb0bmieVw2R2huIFSg-mD3FxY9qAfs8D29w"
                    className="h-64 border-4 border-white/10"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-heading text-[48px] font-bold leading-[1.1] tracking-[-0.02em] text-primary">
              Our Incubation Journey
            </h2>
            <p className="mx-auto max-w-2xl text-[18px] leading-[1.6] text-on-surface-variant">
              A structured four-stage pathway from idea to impact.
            </p>
            <div className="mx-auto mt-6 h-1 w-24 bg-secondary-container" />
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="rounded-2xl border border-outline-variant bg-surface-container-low p-10 lg:col-span-8">
              <h3 className="mb-8 border-l-4 border-secondary pl-4 font-heading text-[24px] font-semibold leading-[1.3] text-primary">
                Magis Core Programs
              </h3>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {journeyStages.map((stage) => (
                  <div
                    key={stage.title}
                    className={`rounded-xl bg-white p-6 shadow-sm ${
                      stage.accent === "secondary"
                        ? "border-t-4 border-secondary-container"
                        : "border-t-4 border-primary/20"
                    }`}
                  >
                    <h4 className="mb-2 flex items-center gap-2 font-bold text-primary">
                      <stage.icon className="size-4" aria-hidden="true" />
                      {stage.title}
                    </h4>
                    <p className="text-sm text-on-surface-variant">{stage.description}</p>
                  </div>
                ))}
              </div>

              <h3 className="mb-8 mt-12 border-l-4 border-secondary pl-4 font-heading text-[24px] font-semibold leading-[1.3] text-primary">
                Strategic Focus Areas
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {focusAreas.map((area) => (
                  <div key={area.title} className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm">
                    <div
                      className={[
                        "flex h-12 w-12 items-center justify-center rounded-full",
                        area.iconTone === "teal" ? "bg-success-teal/10 text-success-teal" : "bg-primary/10 text-primary",
                      ].join(" ")}
                    >
                      <area.icon className="size-5" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="text-[14px] font-bold">{area.title}</div>
                      <div className="text-[12px] text-on-surface-variant">{area.subtitle}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8 lg:col-span-4">
              <div className="rounded-2xl bg-primary p-8 text-on-primary shadow-lg">
                <h3 className="mb-6 font-heading text-[24px] font-semibold leading-[1.3]">
                  Business Support
                </h3>
                <ul className="space-y-4">
                  {supportItems.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="size-5 text-secondary-container" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-secondary-container p-8 text-primary shadow-md">
                <h3 className="mb-4 font-heading text-[24px] font-semibold leading-[1.3]">
                  Tech Facilities
                </h3>
                {facilityItems.map((item, index) => (
                  <div
                    key={item}
                    className={[
                      "flex items-center gap-4 rounded-lg bg-white/20 p-3",
                      index === 0 ? "" : "mt-3",
                    ].join(" ")}
                  >
                    {index === 0 ? (
                      <Cpu className="size-5" aria-hidden="true" />
                    ) : (
                      <DraftingCompass className="size-5" aria-hidden="true" />
                    )}
                    <span className="font-bold">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-xl">
                <h2 className="mb-4 font-heading text-[48px] font-bold leading-[1.1] tracking-[-0.02em] text-primary">
                  Explore Our Spaces
                </h2>
                <p className="text-[18px] leading-[1.6] text-on-surface-variant">
                  Open to students, professionals, and founders. Find the perfect environment to
                  collaborate and grow.
                </p>
              </div>
              <button
                type="button"
                className="flex items-center gap-2 rounded-lg bg-primary px-8 py-3 font-bold text-on-primary transition-all hover:bg-tertiary"
              >
                Book a Space
                <CalendarDays className="size-5" aria-hidden="true" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {spaceCards.map((space) => (
                <div key={space.title} className="group overflow-hidden rounded-xl bg-white shadow-sm">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      alt={space.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      src={space.image}
                    />
                    <div className="absolute left-4 top-4 rounded bg-primary px-3 py-1 text-[14px] font-bold text-on-primary">
                      {space.badge}
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="mb-4 flex items-center gap-2 text-secondary">
                      <space.icon className="size-5" aria-hidden="true" />
                      <span className="text-[12px] font-bold uppercase tracking-wider">
                        {space.label}
                      </span>
                    </div>
                    <h3 className="mb-3 font-heading text-[24px] font-semibold leading-[1.3] text-primary">
                      {space.title}
                    </h3>
                    <p className="text-on-surface-variant">{space.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface py-20">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="mb-4 font-heading text-[48px] font-bold leading-[1.1] tracking-[-0.02em] text-primary">
                Our Startup Graduates
              </h2>
              <p className="mx-auto max-w-2xl text-[18px] leading-[1.6] text-on-surface-variant">
                Celebrating the success of our alumni who have transitioned from ideas to impactful
                market leaders.
              </p>
              <div className="mx-auto mt-6 h-1 w-24 bg-secondary-container" />
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {graduateCards.map((graduate) => (
                <div
                  key={graduate.title}
                  className="group overflow-hidden rounded-xl border border-outline-variant bg-white shadow-sm transition-all hover:shadow-md"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      alt={graduate.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      src={graduate.image}
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="mb-2 font-heading text-[24px] font-semibold leading-[1.3] text-primary">
                      {graduate.title}
                    </h3>
                    <p className="mb-6 line-clamp-2 text-on-surface-variant">{graduate.description}</p>
                    <a
                      href="#"
                      className="flex items-center gap-2 font-bold text-secondary transition-colors hover:text-primary"
                    >
                      {graduate.linkLabel}
                      <ArrowRight className="size-5" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface-container-lowest py-20">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <div className="mb-12 flex items-center justify-between">
              <h2 className="font-heading text-[48px] font-bold leading-[1.1] tracking-[-0.02em] text-primary">
                Upcoming Events
              </h2>
              <a href="#" className="font-bold text-primary hover:underline">
                See All Stories
              </a>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {eventCards.map((event) => (
                <div
                  key={event.title}
                  className="flex flex-col overflow-hidden rounded-xl border border-outline-variant bg-white shadow-sm transition-all hover:-translate-y-2"
                >
                  <div className="h-48 overflow-hidden">
                    <img alt={event.title} className="h-full w-full object-cover" src={event.image} />
                  </div>
                  <div className="p-6">
                    <div className="mb-2 text-[14px] font-bold uppercase text-secondary">
                      {event.category}
                    </div>
                    <h4 className="mb-4 font-bold text-primary">{event.title}</h4>
                    <p className="line-clamp-2 text-sm text-on-surface-variant">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-primary py-20 text-on-primary">
          <div className="mx-auto max-w-[1280px] px-4 text-center sm:px-6 lg:px-8">
            <h3 className="mb-8 text-[12px] font-semibold uppercase tracking-widest text-on-primary/60">
              Supported by
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-12 opacity-80 grayscale brightness-200 contrast-50 md:gap-24">
              <img alt="Partner 1" className="h-16 w-auto object-contain" src={partnerImage} />
              <div className="flex flex-col items-center">
                <span className="text-[32px] font-bold tracking-tighter italic">DOST-PCIEERD</span>
                <span className="text-[10px] uppercase tracking-widest">HEIRIT Program</span>
              </div>
              <div className="font-heading text-[32px] font-bold">ADNU</div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0 z-0">
            <div
              className="h-full w-full bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD9b9_ngsjQb8myblB7PTOf5OR6kyttd7IuIy9hydQchn5Ll583uqUiaD-unTRmgSsHqCu1ShvBMH0-obPsaSLZeii1t4JTu_Am7rj7d1YHZK-EUP7yIsF6-xUAxWlisaa8YqvEpBpAHmEjiMfw6ZkfdHrk2ZAgvK52ky66rMUhLQK1zlUW7RlLU1yW2s5ZTB8AMhbysNhfRQGl2HthPm4RqnuXLCO9IxeN-WvnN3qcQL3YkR598pibpuk20y9Wf_cXKmSnkjEYwFI')",
              }}
            />
            <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm" />
          </div>

          <div className="relative z-10 mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-6 font-heading text-[48px] font-bold leading-[1.1] tracking-[-0.02em] text-on-primary">
              Let us be part of your startup journey!
            </h2>
            <p className="mb-10 text-[18px] leading-[1.6] text-on-primary/80">
              Join a network of ethical innovators shaping the future of the Bicol region through
              Magis values and technology.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button
                type="button"
                className="rounded-lg bg-secondary-container px-10 py-4 text-[18px] font-bold text-on-secondary-container shadow-xl transition-all hover:scale-105"
              >
                Apply Now
              </button>
              <button
                type="button"
                className="rounded-lg bg-white px-10 py-4 text-[18px] font-bold text-primary shadow-xl transition-all hover:scale-105"
              >
                Contact Us
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-primary text-on-primary">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-stack-lg px-4 py-20 md:grid-cols-12 sm:px-6 lg:px-8">
          <div className="md:col-span-5">
            <div className="mb-6 flex items-center gap-3">
              <img alt="Logo" className="h-10 w-10 brightness-0 invert" src={partnerImage} />
              <span className="font-heading text-[24px] font-bold leading-[1.3] text-secondary-fixed">
                ADNU MAGIS TBI
              </span>
            </div>
            <p className="mb-8 max-w-sm text-surface-variant">
              Guided by Jesuit values, we provide access to markets and resources, propelling startups
              toward ethical and impactful success.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-all hover:bg-secondary-fixed hover:text-primary"
              >
                <UserRound className="size-4" aria-hidden="true" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-all hover:bg-secondary-fixed hover:text-primary"
              >
                <Share2 className="size-4" aria-hidden="true" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-all hover:bg-secondary-fixed hover:text-primary"
              >
                <Mail className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="mb-6 text-[14px] font-bold uppercase tracking-widest text-secondary-fixed">
              Platform
            </h4>
            <ul className="space-y-4 text-surface-variant">
              <li>
                <a href="#" className="transition-colors hover:text-secondary-fixed">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-secondary-fixed">
                  Stories
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-secondary-fixed">
                  Events
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-secondary-fixed">
                  Contacts
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="mb-6 text-[14px] font-bold uppercase tracking-widest text-secondary-fixed">
              Resources
            </h4>
            <ul className="space-y-4 text-surface-variant">
              <li>
                <a href="#" className="transition-colors hover:text-secondary-fixed">
                  FAQ&apos;s
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-secondary-fixed">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-secondary-fixed">
                  Book Facility
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="mb-6 text-[14px] font-bold uppercase tracking-widest text-secondary-fixed">
              Location
            </h4>
            <p className="mb-4 text-surface-variant">
              Ateneo de Naga University, Naga City, Camarines Sur, Philippines
            </p>
            <div className="flex h-32 items-center justify-center rounded-lg border border-white/10 bg-white/5 italic text-xs text-white/40">
              <MapPin className="mr-2 size-4" aria-hidden="true" />
              Naga City, Philippines
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-8 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-4 text-sm text-surface-variant md:flex-row">
            <p>© 2024 ADNU MAGIS TBI. Supported by DOST-PCIEERD HEIRIT Program.</p>
            <div className="flex gap-6">
              <span>Ateneo Owned &amp; Operated</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
