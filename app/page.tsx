/* eslint-disable @next/next/no-img-element */

import type { ReactNode, SVGProps } from "react";

import {
  magisFacilities,
  magisFooterNotes,
  magisGoals,
  magisIdentity,
  magisLaunchpad,
  magisLocation,
  magisMetrics,
  magisPrograms,
  magisTaglines,
  magisValuePoints,
} from "@/lib/magis-content";
import { buildWordPressImageUrl, getStartupGraduates } from "@/lib/wordpress";
import type { WordPressStartup } from "@/types/wordpress";

type HighlightCard = {
  title: string;
  description: string;
  icon: IconComponent;
  linkLabel: string;
};

type StatItem = {
  value: string;
  label: string;
};

type SpaceCard = {
  title: string;
  image: string;
  badge: string;
  icon: IconComponent;
  label: string;
  description: string;
};

type GoalCard = {
  category: string;
  title: string;
  description: string;
  image: string;
};

type IconProps = SVGProps<SVGSVGElement>;

type IconComponent = (props: IconProps) => ReactNode;

function IconBase({ children, className, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
      className={className}
      {...props}
    >
      {children}
    </svg>
  );
}

function ArrowRightIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M5 12h12" />
      <path d="m13 6 6 6-6 6" />
    </IconBase>
  );
}

function ArchitectureIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 20h16" />
      <path d="M6 20V9l6-4 6 4v11" />
      <path d="M9 20v-6h6v6" />
      <path d="M8 12h2M14 12h2M8 15h2M14 15h2" />
    </IconBase>
  );
}

function ApartmentIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M5 20h14" />
      <path d="M7 20V6h10v14" />
      <path d="M10 9h1M13 9h1M10 12h1M13 12h1M10 15h1M13 15h1" />
    </IconBase>
  );
}

function CalendarMonthIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M7 3v3M17 3v3M5 7h14" />
      <path d="M6 5h12a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
      <path d="M8 11h2M12 11h2M16 11h0M8 15h2M12 15h2" />
    </IconBase>
  );
}

function CheckCircleIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M20 12a8 8 0 1 1-3.5-6.6" />
      <path d="m9.5 12.5 2 2.2 5-5.7" />
    </IconBase>
  );
}

function ForestIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 4 6.5 10H9l-4 5h4.2L8 20h8l-1.2-5H19l-4-5h2.5L12 4Z" />
      <path d="M12 20v-4" />
    </IconBase>
  );
}

function GroupsIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M9 11a3 3 0 1 0-0.001-6.001A3 3 0 0 0 9 11Z" />
      <path d="M16 13a2.5 2.5 0 1 0-0.001-5.001A2.5 2.5 0 0 0 16 13Z" />
      <path d="M4.5 19c0-2.8 2.5-5 5.5-5s5.5 2.2 5.5 5" />
      <path d="M14.5 18c.3-1.9 1.8-3.5 3.7-3.5 1.8 0 3.3 1.2 3.3 3.5" />
    </IconBase>
  );
}

function LaptopMacIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M6 7h12v8H6z" />
      <path d="M4.5 18h15" />
      <path d="M8 16.5h8" />
    </IconBase>
  );
}

function LocationOnIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 21s6-5.4 6-10a6 6 0 1 0-12 0c0 4.6 6 10 6 10Z" />
      <path d="M12 13.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
    </IconBase>
  );
}

function MailIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 7h16v10H4z" />
      <path d="m4 8 8 6 8-6" />
    </IconBase>
  );
}

function MemoryIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M7 7h10v10H7z" />
      <path d="M10 10h4v4h-4z" />
      <path d="M3 9h3M3 12h3M3 15h3M18 9h3M18 12h3M18 15h3M9 3v3M12 3v3M15 3v3M9 18v3M12 18v3M15 18v3" />
    </IconBase>
  );
}

function PersonIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 12a3.5 3.5 0 1 0-0.001-7.001A3.5 3.5 0 0 0 12 12Z" />
      <path d="M5 20c0-3.7 3.1-6.5 7-6.5s7 2.8 7 6.5" />
    </IconBase>
  );
}

function RocketLaunchIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M14.5 4.5c2.3.2 4 2 4.2 4.2l-4.2 4.2-4.2-4.2c.2-2.2 1.9-4 4.2-4.2Z" />
      <path d="M9 10 5 14l3 1 1 3 4-4" />
      <path d="M13.5 14.5 10 18l1.5 1.5c1.4-.2 2.7-.7 3.8-1.6" />
      <path d="M16.5 7.5h0" />
      <path d="M17.5 6.5 19 5" />
    </IconBase>
  );
}

function ShareIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M16 8a2.5 2.5 0 1 0-0.001-5.001A2.5 2.5 0 0 0 16 8Z" />
      <path d="M6 14a2.5 2.5 0 1 0-0.001-5.001A2.5 2.5 0 0 0 6 14Z" />
      <path d="M16 21a2.5 2.5 0 1 0-0.001-5.001A2.5 2.5 0 0 0 16 21Z" />
      <path d="m8.1 12.1 5.8-2.8" />
      <path d="m8.1 11.9 5.8 2.8" />
    </IconBase>
  );
}

function TrendingUpIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 16.5 9 11l4 4 7-8" />
      <path d="M14 7h6v6" />
    </IconBase>
  );
}

const aboutCards: HighlightCard[] = magisValuePoints.map((point, index) => ({
  title: point.title,
  description: point.description,
  icon: [ForestIcon, GroupsIcon, ApartmentIcon][index] ?? GroupsIcon,
  linkLabel: "Learn More",
}));

const programCards: HighlightCard[] = magisPrograms.map((program, index) => ({
  title: program.title,
  description: program.summary,
  icon: [RocketLaunchIcon, ArchitectureIcon, GroupsIcon, ApartmentIcon][index] ??
    RocketLaunchIcon,
  linkLabel: "Learn More",
}));

const supportServices = magisPrograms[2]?.items ?? [];
const facilityNames = magisFacilities.map((facility) => facility.title);
const wordPressImageUrl = (pathname: string, fallbackUrl: string): string =>
  buildWordPressImageUrl(pathname, fallbackUrl);

const spaceCards: SpaceCard[] = magisFacilities.slice(0, 3).map((facility, index) => ({
  title: facility.title,
  image: wordPressImageUrl(
    [
      "/wp-content/uploads/2025/02/jer03825.jpg",
      "/wp-content/uploads/2025/02/jer04028-1.jpg",
      "/wp-content/uploads/2025/02/jer04155.jpg",
    ][index],
    [
      "https://magistbi.com/wp-content/uploads/2025/02/jer03825.jpg",
      "https://magistbi.com/wp-content/uploads/2025/02/jer04028-1.jpg",
      "https://magistbi.com/wp-content/uploads/2025/02/jer04155.jpg",
    ][index],
  ),
  badge: ["Productivity Zone", "Executive Suite", "Creative Venue"][index],
  icon: [LaptopMacIcon, ApartmentIcon, ForestIcon][index],
  label: ["Daily Access", "Private Booking", "Event Ready"][index],
  description: facility.summary,
}));

function StartupLogoCard({
  startup,
  duplicate = false,
}: {
  startup: WordPressStartup;
  duplicate?: boolean;
}) {
  const founderSummary =
    startup.founderNames.length > 0
      ? `Founded by ${startup.founderNames.join(", ")}.`
      : "Founder details available in WordPress.";
  const tooltip = startup.startupName;

  return (
    <figure
      aria-hidden={duplicate || undefined}
      className={`flex w-40 shrink-0 items-center justify-center px-2 py-3 ${
        duplicate ? "startup-carousel-duplicate" : ""
      }`}
      title={tooltip}
    >
      <div className="flex h-20 w-full items-center justify-center">
        {startup.logo ? (
          <img
            alt={startup.startupName}
            className="max-h-14 w-full object-contain"
            decoding="async"
            title={tooltip}
            src={startup.logo.url}
            loading="lazy"
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary/35"
          >
            <span className="sr-only">{startup.startupName}</span>
          </div>
        )}
      </div>
    </figure>
  );
}

function StartupCarousel({ startups }: { startups: WordPressStartup[] }) {
  if (startups.length === 0) {
    return (
      <div className="rounded-[2rem] border border-dashed border-outline-variant bg-white px-8 py-10 text-center text-on-surface-variant shadow-sm">
        <p className="font-heading text-[24px] font-semibold leading-[1.3] text-primary">
          Startup logos will appear here once the WordPress graduates collection is available.
        </p>
        <p className="mt-3 text-[16px] leading-[1.6]">
          The section stays in place so the homepage still renders cleanly while the CMS is empty
          or temporarily unavailable.
        </p>
      </div>
    );
  }

  const useTwoRows = startups.length > 10;
  const topRowStartups = useTwoRows ? startups.filter((_, index) => index % 2 === 0) : startups;
  const bottomRowStartups = useTwoRows ? startups.filter((_, index) => index % 2 === 1) : [];
  const loopedTopRow = [...topRowStartups, ...topRowStartups];
  const loopedBottomRow = [...bottomRowStartups, ...bottomRowStartups];

  return (
    <div className="startup-carousel-viewport overflow-hidden">
      <div className="flex flex-col gap-4 py-4">
        <div className="startup-carousel-track flex w-max gap-8 px-2">
          {loopedTopRow.map((startup, index) => (
            <StartupLogoCard
              key={`${startup.id}-${index}`}
              startup={startup}
              duplicate={index >= topRowStartups.length}
            />
          ))}
        </div>
        {useTwoRows ? (
          <div className="startup-carousel-track startup-carousel-track--reverse flex w-max gap-8 px-2">
            {loopedBottomRow.map((startup, index) => (
              <StartupLogoCard
                key={`${startup.id}-${index}`}
                startup={startup}
                duplicate={index >= bottomRowStartups.length}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

const goalCards: GoalCard[] = [
  {
    category: "Goal 01",
    title: magisGoals[0],
    description: "Turn bold ideas into sustainable, high-impact startups.",
    image: wordPressImageUrl(
      "/wp-content/uploads/2026/07/bold-ideas.jpg",
      "https://magistbi.com/wp-content/uploads/2026/07/bold-ideas.jpg",
    ),
  },
  {
    category: "Goal 02",
    title: magisGoals[1],
    description: "Empower entrepreneurs and MSMEs through hands-on programs and support.",
    image: wordPressImageUrl(
      "/wp-content/uploads/2026/07/futuretech.jpg",
      "https://magistbi.com/wp-content/uploads/2026/07/futuretech.jpg",
    ),
  },
  {
    category: "Goal 03",
    title: magisGoals[2],
    description: "Drive innovation and create lasting opportunities across the Bicol Region.",
    image: wordPressImageUrl(
      "/wp-content/uploads/2026/07/bicol_empower.jpg",
      "https://magistbi.com/wp-content/uploads/2026/07/bicol_empower.jpg",
    ),
  },
  {
    category: "Support",
    title: "DOST-PCIEERD Funded TBI",
    description: magisLocation.supportLine,
    image: wordPressImageUrl(
      "/wp-content/uploads/2026/07/dost-pcieerd-ribbon.jpg",
      "https://magistbi.com/wp-content/uploads/2026/07/dost-pcieerd-ribbon.jpg",
    ),
  },
];

const officeLogo = "/magis-logo.png";
const dostPcieerdLogo = wordPressImageUrl(
  "/wp-content/uploads/2025/02/dost-white.png",
  "https://magistbi.com/wp-content/uploads/2025/02/dost-white.png",
);

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

export default async function Home() {
  const startupGraduates = await getStartupGraduates();

  return (
    <main className="bg-background text-on-surface">
      <header className="sticky top-0 z-50 border-b border-outline-variant bg-surface/90 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#" className="flex items-center gap-4">
            <img
              alt="ADNU MAGIS TBI Logo"
              className="h-12 w-12 object-contain"
              src={officeLogo}
            />
            <span className="whitespace-nowrap font-heading text-[24px] font-bold leading-none text-primary">
              ADNU MAGIS TBI
            </span>
          </a>

          <div className="flex items-center gap-4">
            <a
              href="#facilities"
              className="hidden font-semibold text-primary hover:opacity-80 lg:block"
            >
              Book Facility
            </a>
            <a
              href="#contact"
              className="rounded-lg bg-secondary-container px-6 py-2.5 font-bold text-on-secondary-container shadow-sm transition-all duration-300 hover:scale-95 active:scale-90"
            >
              Contact Us
            </a>
          </div>
        </div>
      </header>

      <section className="relative flex h-[85vh] items-center overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <div
            className="h-full w-full bg-cover bg-center opacity-40 mix-blend-overlay"
            style={{
              backgroundImage: "url('/home-of-magis.jpg')",
            }}
          />
          <div className="absolute inset-0 bg-linear-to-r from-primary via-primary/80 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="mb-6 font-heading text-[48px] font-bold leading-[1.1] tracking-[-0.02em] text-on-primary sm:text-[48px]">
              {magisIdentity.title}
              <br />
              <span className="text-secondary-container">{magisIdentity.tagline}</span>
            </h1>
            <p className="mb-8 max-w-xl text-[18px] leading-[1.6] text-on-primary/90">
              {magisIdentity.intro} {magisIdentity.acronym} {magisTaglines.join(" ")}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#programs"
                className="rounded-lg bg-secondary-container px-8 py-4 text-[18px] font-bold text-on-secondary-container shadow-lg transition-all hover:bg-secondary-fixed hover:-translate-y-1"
              >
                Explore Programs
              </a>
              <a
                href="#about"
                className="rounded-lg border-2 border-on-primary px-8 py-4 text-[18px] font-bold text-on-primary transition-all hover:bg-on-primary hover:text-primary"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-heading text-[48px] font-bold leading-[1.1] tracking-[-0.02em] text-primary">
            {magisIdentity.aboutTitle}
          </h2>
          <p className="mx-auto max-w-2xl text-[18px] leading-[1.6] text-on-surface-variant">
            {magisIdentity.intro} {magisIdentity.vision} {magisIdentity.mission}
          </p>
        </div>

        <div id="value" className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {aboutCards.map((card) => (
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
                href="#programs"
                className="flex items-center gap-2 font-bold text-secondary transition-all group-hover:gap-4"
              >
                {card.linkLabel}
                <ArrowRightIcon className="size-5" aria-hidden="true" />
              </a>
            </div>
          ))}
        </div>
      </section>

      <section id="impact" className="relative overflow-hidden bg-primary py-20 text-on-primary">
        <div className="pointer-events-none absolute right-0 top-0 h-full w-1/3 opacity-10">
          <TrendingUpIcon className="absolute -right-20 -top-20 size-100" aria-hidden="true" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 font-heading text-[48px] font-bold leading-[1.1] tracking-[-0.02em]">
                MAGIS by the Numbers
              </h2>
              <p className="mb-12 text-[18px] leading-[1.6] text-on-primary/80">
                As of February 2026, the incubator is turning bold ideas into measurable progress
                across the Bicol Region.
              </p>
              <div className="grid grid-cols-2 gap-8">
                {magisMetrics.map((stat) => (
                  <MetricCard key={stat.label} {...stat} />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-12">
                <RoundedImageCard
                  alt="Startup team collaborating"
                  image={wordPressImageUrl(
                    "/wp-content/uploads/2026/07/demo-day.jpg",
                    "https://magistbi.com/wp-content/uploads/2026/07/demo-day.jpg",
                  )}
                  className="h-64 border-4 border-white/10"
                />
                <RoundedImageCard
                  alt="Pitch competition event"
                  image={wordPressImageUrl(
                    "/wp-content/uploads/2026/07/pitch-competition.jpeg",
                    "https://magistbi.com/wp-content/uploads/2026/07/pitch-competition.jpeg",
                  )}
                  className="h-48 border-4 border-white/10"
                />
              </div>
              <div className="space-y-4">
                <RoundedImageCard
                  alt="Innovation lab workshop"
                  image={wordPressImageUrl(
                    "/wp-content/uploads/2026/07/hackathon.jpg",
                    "https://magistbi.com/wp-content/uploads/2026/07/hackathon.jpg",
                  )}
                  className="h-48 border-4 border-white/10"
                />
                <RoundedImageCard
                  alt="Mentorship session"
                  image={wordPressImageUrl(
                    "/wp-content/uploads/2026/07/mentorship.jpg",
                    "https://magistbi.com/wp-content/uploads/2026/07/mentorship.jpg",
                  )}
                  className="h-64 border-4 border-white/10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="cohorts" className="bg-surface py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <h2 className="mb-4 font-heading text-[48px] font-bold leading-[1.1] tracking-[-0.02em] text-primary">
                IGNITE Startup Graduates
              </h2>
              <p className="max-w-2xl text-[18px] leading-[1.6] text-on-surface-variant">
                A rotating showcase of the startups that have grown through the incubation
                program.
              </p>
            </div>
            <div className="rounded-full bg-secondary-container px-4 py-2 text-[12px] font-bold uppercase tracking-[0.28em] text-on-secondary-container">
              {startupGraduates.length} startups
            </div>
          </div>

          <StartupCarousel startups={startupGraduates} />
        </div>
      </section>

      <section id="programs" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-heading text-[48px] font-bold leading-[1.1] tracking-[-0.02em] text-primary">
            Programs &amp; Services
          </h2>
          <p className="mx-auto max-w-2xl text-[18px] leading-[1.6] text-on-surface-variant">
            Structured support for incubation, skills development, mentorship, and core business
            operations.
          </p>
          <div className="mx-auto mt-6 h-1 w-24 bg-secondary-container" />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="rounded-2xl border border-outline-variant bg-surface-container-low p-10 lg:col-span-8">
            <h3 className="mb-8 border-l-4 border-secondary pl-4 font-heading text-[24px] font-semibold leading-[1.3] text-primary">
              Magis Core Programs
            </h3>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {programCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-xl bg-white p-6 shadow-sm border-t-4 border-secondary-container"
                >
                  <h4 className="mb-2 flex items-center gap-2 font-bold text-primary">
                    <card.icon className="size-4" aria-hidden="true" />
                    {card.title}
                  </h4>
                  <p className="text-sm text-on-surface-variant">{card.description}</p>
                  <a
                    href="#contact"
                    className="mt-4 inline-flex items-center gap-2 font-bold text-secondary transition-all hover:gap-4"
                  >
                    {card.linkLabel}
                    <ArrowRightIcon className="size-5" aria-hidden="true" />
                  </a>
                </div>
              ))}
            </div>

            <h3 className="mb-8 mt-12 border-l-4 border-secondary pl-4 font-heading text-[24px] font-semibold leading-[1.3] text-primary">
              Mentorship &amp; Support
            </h3>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="rounded-xl bg-white p-6 shadow-sm border-t-4 border-primary/20">
                <h4 className="mb-2 flex items-center gap-2 font-bold text-primary">
                  <GroupsIcon className="size-4" aria-hidden="true" />
                  One-on-One Consultations
                </h4>
                <p className="text-sm text-on-surface-variant">
                  Expert consultations and strategic business mentorship.
                </p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-sm border-t-4 border-secondary-container">
                <h4 className="mb-2 flex items-center gap-2 font-bold text-primary">
                  <ApartmentIcon className="size-4" aria-hidden="true" />
                  Core Business Services
                </h4>
                <p className="text-sm text-on-surface-variant">
                  Accounting, finance, legal assistance, virtual office access, and business permit
                  processing.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8 lg:col-span-4">
            <div className="rounded-2xl bg-primary p-8 text-on-primary shadow-lg">
              <h3 className="mb-6 font-heading text-[24px] font-semibold leading-[1.3]">
                Business Support
              </h3>
              <ul className="space-y-4">
                {supportServices.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircleIcon className="size-5 text-secondary-container" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-secondary-container p-8 text-primary shadow-md">
              <h3 className="mb-4 font-heading text-[24px] font-semibold leading-[1.3]">
                Facilities &amp; Spaces
              </h3>
              {facilityNames.map((item, index) => (
                <div
                  key={item}
                  className={[
                    "flex items-center gap-4 rounded-lg bg-white/20 p-3",
                    index === 0 ? "" : "mt-3",
                  ].join(" ")}
                >
                  {index === 0 ? (
                    <MemoryIcon className="size-5" aria-hidden="true" />
                  ) : index === 1 ? (
                    <ApartmentIcon className="size-5" aria-hidden="true" />
                  ) : index === 2 ? (
                    <ForestIcon className="size-5" aria-hidden="true" />
                  ) : (
                    <ArchitectureIcon className="size-5" aria-hidden="true" />
                  )}
                  <span className="font-bold">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="facilities" className="bg-surface py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <h2 className="mb-4 font-heading text-[48px] font-bold leading-[1.1] tracking-[-0.02em] text-primary">
                Facilities &amp; Spaces
              </h2>
              <p className="text-[18px] leading-[1.6] text-on-surface-variant">
                Open to university-affiliated and external startups. Find the environment that fits
                your next move.
              </p>
            </div>
            <a
              href="#contact"
              className="flex items-center gap-2 rounded-lg bg-primary px-8 py-3 font-bold text-on-primary transition-all hover:bg-tertiary"
            >
              Book a Space
              <CalendarMonthIcon className="size-5" aria-hidden="true" />
            </a>
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

      <section id="goals" className="bg-surface-container-lowest py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex items-center justify-between">
            <h2 className="font-heading text-[48px] font-bold leading-[1.1] tracking-[-0.02em] text-primary">
              Our Goals
            </h2>
            <a href="#contact" className="font-bold text-primary hover:underline">
              Learn More
            </a>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {goalCards.map((goal) => (
              <div
                key={goal.title}
                className="flex flex-col overflow-hidden rounded-xl border border-outline-variant bg-white shadow-sm transition-all hover:-translate-y-2"
              >
                <div className="h-48 overflow-hidden">
                  <img alt={goal.title} className="h-full w-full object-cover" src={goal.image} />
                </div>
                <div className="p-6">
                  <div className="mb-2 text-[14px] font-bold uppercase text-secondary">
                    {goal.category}
                  </div>
                  <h4 className="mb-4 font-bold text-primary">{goal.title}</h4>
                  <p className="line-clamp-2 text-sm text-on-surface-variant">{goal.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-20 text-on-primary">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h3 className="mb-8 text-[12px] font-semibold uppercase tracking-widest text-on-primary/60">
            Supported by
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-80 grayscale brightness-200 contrast-50 md:gap-24">
            <img alt="DOST PCIEERD Logo" className="h-16 w-auto object-contain" src={dostPcieerdLogo} />
            <img alt="ADNU MAGIS TBI Logo" className="h-16 w-auto object-contain" src={officeLogo} />
            {/* <div className="flex flex-col items-center">
              <span className="text-[32px] font-bold tracking-tighter italic">DOST-PCIEERD</span>
              <span className="text-[10px] uppercase tracking-widest">Funded TBI</span>
            </div>
            <div className="font-heading text-[32px] font-bold">ADNU</div> */}
          </div>
        </div>
      </section>

      <section id="contact" className="relative overflow-hidden py-20">
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
            {magisLaunchpad.title}
          </h2>
          <p className="mb-10 text-[18px] leading-[1.6] text-on-primary/80">
            {magisLaunchpad.summary}
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="#programs"
              className="rounded-lg bg-secondary-container px-10 py-4 text-[18px] font-bold text-on-secondary-container shadow-xl transition-all hover:scale-105"
            >
              Apply Now
            </a>
            <a
              href="#about"
              className="rounded-lg bg-white px-10 py-4 text-[18px] font-bold text-primary shadow-xl transition-all hover:scale-105"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-on-primary">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-stack-lg px-4 py-20 md:grid-cols-12 sm:px-6 lg:px-8">
          <div className="md:col-span-5">
            <div className="mb-6 flex items-center gap-3">
              <img alt="ADNU MAGIS TBI Logo" className="h-10 w-10 object-contain" src={officeLogo} />
              <span className="font-heading text-[24px] font-bold leading-[1.3] text-secondary-fixed">
                ADNU MAGIS TBI
              </span>
            </div>
            <p className="mb-8 max-w-sm text-surface-variant">
              {magisIdentity.tagline} {magisLocation.supportLine}
            </p>
            <div className="flex gap-4">
              <a
                href="#about"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-all hover:bg-secondary-fixed hover:text-primary"
              >
                <PersonIcon className="size-4" aria-hidden="true" />
              </a>
              <a
                href="#programs"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-all hover:bg-secondary-fixed hover:text-primary"
              >
                <ShareIcon className="size-4" aria-hidden="true" />
              </a>
              <a
                href="mailto:info@adnu.edu.ph"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-all hover:bg-secondary-fixed hover:text-primary"
              >
                <MailIcon className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="mb-6 text-[14px] font-bold uppercase tracking-widest text-secondary-fixed">
              Platform
            </h4>
            <ul className="space-y-4 text-surface-variant">
              <li>
                <a href="#about" className="transition-colors hover:text-secondary-fixed">
                  About Us
                </a>
              </li>
              <li>
                <a href="#cohorts" className="transition-colors hover:text-secondary-fixed">
                  Startups
                </a>
              </li>
              <li>
                <a href="#goals" className="transition-colors hover:text-secondary-fixed">
                  Goals
                </a>
              </li>
              <li>
                <a href="#contact" className="transition-colors hover:text-secondary-fixed">
                  Contact
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
                <a href="#programs" className="transition-colors hover:text-secondary-fixed">
                  Programs
                </a>
              </li>
              <li>
                <a href="#facilities" className="transition-colors hover:text-secondary-fixed">
                  Facilities
                </a>
              </li>
              <li>
                <a href="#impact" className="transition-colors hover:text-secondary-fixed">
                  Impact
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="mb-6 text-[14px] font-bold uppercase tracking-widest text-secondary-fixed">
              Location
            </h4>
            <p className="mb-4 text-surface-variant">{magisLocation.address}</p>
            <div className="flex h-32 items-center justify-center rounded-lg border border-white/10 bg-white/5 italic text-xs text-white/40">
              <LocationOnIcon className="mr-2 size-4" aria-hidden="true" />
              {magisLocation.heading}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-surface-variant md:flex-row">
            <p>© 2026 ADNU MAGIS TBI. {magisFooterNotes[0]}.</p>
            <div className="flex gap-6">
              <span>{magisFooterNotes[1]}</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
