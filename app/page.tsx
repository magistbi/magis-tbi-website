/* eslint-disable @next/next/no-img-element */

import type { ComponentType, ReactNode, SVGProps } from "react";

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
type IconComponent = ComponentType<IconProps>;

function SvgIcon({ children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      fill="currentColor"
      focusable="false"
      viewBox="0 0 24 24"
      {...props}
    >
      {children}
    </svg>
  );
}

function ArrowRightIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z" />
    </SvgIcon>
  );
}

function ApartmentIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M17 11V3H7v4H3v14h8v-4h2v4h8V11zM7 19H5v-2h2zm0-4H5v-2h2zm0-4H5V9h2zm4 4H9v-2h2zm0-4H9V9h2zm0-4H9V5h2zm4 8h-2v-2h2zm0-4h-2V9h2zm0-4h-2V5h2zm4 12h-2v-2h2zm0-4h-2v-2h2z" />
    </SvgIcon>
  );
}

function ArchitectureIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M6.36 18.78 6.61 21l1.62-1.54 2.77-7.6c-.68-.17-1.28-.51-1.77-.98zm8.41-7.9c-.49.47-1.1.81-1.77.98l2.77 7.6L17.39 21l.26-2.22zM15 8c0-1.3-.84-2.4-2-2.82V3h-2v2.18C9.84 5.6 9 6.7 9 8c0 1.66 1.34 3 3 3s3-1.34 3-3m-3 1c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1" />
    </SvgIcon>
  );
}

function CalendarMonthIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 16H5V10h14zM9 14H7v-2h2zm4 0h-2v-2h2zm4 0h-2v-2h2zm-8 4H7v-2h2zm4 0h-2v-2h2zm4 0h-2v-2h2z" />
    </SvgIcon>
  );
}

function CheckCircleIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8z" />
    </SvgIcon>
  );
}

function FacebookIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m13 2h-2.5A3.5 3.5 0 0 0 12 8.5V11h-2v3h2v7h3v-7h3v-3h-3V9a1 1 0 0 1 1-1h2V5z" />
    </SvgIcon>
  );
}

function ForestIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M16 12 9 2 2 12h1.86L0 18h7v4h4v-4h7l-3.86-6z" />
      <path d="M20.14 12H22L15 2l-2.39 3.41L17.92 13h-1.95l3.22 5H24zM13 19h4v3h-4z" />
    </SvgIcon>
  );
}

function GroupsIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M12 12.75c1.63 0 3.07.39 4.24.9 1.08.48 1.76 1.56 1.76 2.73V18H6v-1.61c0-1.18.68-2.26 1.76-2.73 1.17-.52 2.61-.91 4.24-.91M4 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m1.13 1.1c-.37-.06-.74-.1-1.13-.1-.99 0-1.93.21-2.78.58C.48 14.9 0 15.62 0 16.43V18h4.5v-1.61c0-.83.23-1.61.63-2.29M20 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m4 3.43c0-.81-.48-1.53-1.22-1.85-.85-.37-1.79-.58-2.78-.58-.39 0-.76.04-1.13.1.4.68.63 1.46.63 2.29V18H24zM12 6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3" />
    </SvgIcon>
  );
}

function LaptopMacIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M20 18c1.1 0 1.99-.9 1.99-2L22 5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2H0c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2zM4 5h16v11H4zm8 14c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1" />
    </SvgIcon>
  );
}

function LinkedInIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </SvgIcon>
  );
}

function LocationOnIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7m0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5" />
    </SvgIcon>
  );
}

function MailIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 4-8 5-8-5V6l8 5 8-5z" />
    </SvgIcon>
  );
}

function MemoryIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M15 9H9v6h6zm-2 4h-2v-2h2zm8-2V9h-2V7c0-1.1-.9-2-2-2h-2V3h-2v2h-2V3H9v2H7c-1.1 0-2 .9-2 2v2H3v2h2v2H3v2h2v2c0 1.1.9 2 2 2h2v2h2v-2h2v2h2v-2h2c1.1 0 2-.9 2-2v-2h2v-2h-2v-2zm-4 6H7V7h10z" />
    </SvgIcon>
  );
}

function RocketLaunchIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M9.19 6.35c-2.04 2.29-3.44 5.58-3.57 5.89L2 10.69l4.05-4.05c.47-.47 1.15-.68 1.81-.55zM11.17 17s3.74-1.55 5.89-3.7c5.4-5.4 4.5-9.62 4.21-10.57-.95-.3-5.17-1.19-10.57 4.21C8.55 9.09 7 12.83 7 12.83zm6.48-2.19c-2.29 2.04-5.58 3.44-5.89 3.57L13.31 22l4.05-4.05c.47-.47.68-1.15.55-1.81zM9 18c0 .83-.34 1.58-.88 2.12C6.94 21.3 2 22 2 22s.7-4.94 1.88-6.12C4.42 15.34 5.17 15 6 15c1.66 0 3 1.34 3 3m4-9c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2" />
    </SvgIcon>
  );
}

function TrendingUpIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="m16 6 2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
    </SvgIcon>
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
      className={`flex w-32 shrink-0 items-center justify-center px-1.5 py-2 sm:w-40 sm:px-2 sm:py-3 ${
        duplicate ? "startup-carousel-duplicate" : ""
      }`}
      title={tooltip}
    >
      <div className="flex h-16 w-full items-center justify-center sm:h-20">
        {startup.logo ? (
          <img
            alt={startup.startupName}
            className="max-h-10 w-full object-contain sm:max-h-14"
            decoding="async"
            title={tooltip}
            src={startup.logo.url}
            loading="lazy"
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary/35 sm:h-14 sm:w-14"
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
      <div className="rounded-[2rem] border border-dashed border-outline-variant bg-white px-6 py-8 text-center text-on-surface-variant shadow-sm sm:px-8 sm:py-10">
        <p className="font-heading text-[20px] font-semibold leading-[1.3] text-primary sm:text-[24px]">
          Startup logos will appear here once the WordPress graduates collection is available.
        </p>
        <p className="mt-3 text-[15px] leading-[1.6] sm:text-[16px]">
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
      <div className="flex flex-col gap-3 py-3 sm:gap-4 sm:py-4">
        <div className="startup-carousel-track flex w-max gap-4 px-1 sm:gap-8 sm:px-2">
          {loopedTopRow.map((startup, index) => (
            <StartupLogoCard
              key={`${startup.id}-${index}`}
              startup={startup}
              duplicate={index >= topRowStartups.length}
            />
          ))}
        </div>
        {useTwoRows ? (
          <div className="startup-carousel-track startup-carousel-track--reverse flex w-max gap-4 px-1 sm:gap-8 sm:px-2">
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
const bookingUrl = "https://app.lapsula.com/book/adnu-magistbi";
const facebookPageUrl = "https://www.facebook.com/adnu.magis.tbi";
const linkedinPageUrl = "https://www.linkedin.com/company/ateneo-de-naga-university-magis-technology-business-incubator/";
const contactEmail = "mailto:magis_tbi@gbox.adnu.edu.ph";
const googleMapsUrl = "https://maps.app.goo.gl/oq93PHA6haDjyYer6";
const googleMapsEmbedUrl =
  "https://www.google.com/maps?q=Ateneo+de+Naga+University,+Naga+City,+Camarines+Sur,+Philippines&output=embed";
const dostPcieerdLogo = wordPressImageUrl(
  "/wp-content/uploads/2025/02/dost-white.png",
  "https://magistbi.com/wp-content/uploads/2025/02/dost-white.png",
);

function MetricCard({ value, label }: StatItem) {
  return (
    <div>
      <div className="mb-2 text-[36px] font-bold leading-none tracking-[-0.02em] text-secondary-container sm:text-[48px]">
        {value}
      </div>
      <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-on-primary/60 sm:text-[12px]">
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
    <main className="overflow-x-hidden bg-background text-on-surface">
      <header className="sticky top-0 z-50 border-b border-outline-variant bg-surface/90 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
          <a href="#" className="flex min-w-0 items-center gap-2 sm:gap-4">
            <img
              alt="ADNU MAGIS TBI Logo"
              className="h-10 w-10 object-contain sm:h-12 sm:w-12"
              src={officeLogo}
            />
            <span className="min-w-0 whitespace-nowrap font-heading text-[18px] font-bold leading-none text-primary sm:text-[24px]">
              ADNU MAGIS TBI
            </span>
          </a>

          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden font-semibold text-primary hover:opacity-80 lg:block"
            >
              Book Facility
            </a>
            <a
              href={facebookPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-secondary-container px-4 py-2 text-sm font-bold text-on-secondary-container shadow-sm transition-all duration-300 hover:scale-95 active:scale-90 sm:px-6 sm:py-2.5 sm:text-base"
            >
              Contact Us
            </a>
          </div>
        </div>
      </header>

      <section className="relative flex min-h-[78svh] items-center overflow-hidden bg-primary py-16 sm:min-h-[85vh] sm:py-0">
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
          <div className="max-w-xl sm:max-w-2xl">
            <h1 className="mb-5 font-heading text-[34px] font-bold leading-[1.08] tracking-[-0.02em] text-on-primary sm:mb-6 sm:text-[48px] lg:text-[56px]">
              {magisIdentity.title}
              <br />
              <span className="text-secondary-container">{magisIdentity.tagline}</span>
            </h1>
            <p className="mb-8 max-w-md text-[16px] leading-[1.6] text-on-primary/90 sm:max-w-xl sm:text-[18px]">
              {magisIdentity.intro} {magisIdentity.acronym} {magisTaglines.join(" ")}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <a
                href="#programs"
                className="flex w-full items-center justify-center rounded-lg bg-secondary-container px-6 py-3 text-[16px] font-bold text-on-secondary-container shadow-lg transition-all hover:bg-secondary-fixed hover:-translate-y-1 sm:w-auto sm:px-8 sm:py-4 sm:text-[18px]"
              >
                Explore Programs
              </a>
              <a
                href="#about"
                className="flex w-full items-center justify-center rounded-lg border-2 border-on-primary px-6 py-3 text-[16px] font-bold text-on-primary transition-all hover:bg-on-primary hover:text-primary sm:w-auto sm:px-8 sm:py-4 sm:text-[18px]"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mb-10 text-center sm:mb-16">
          <h2 className="mb-4 font-heading text-[32px] font-bold leading-[1.1] tracking-[-0.02em] text-primary sm:text-[40px] lg:text-[48px]">
            {magisIdentity.aboutTitle}
          </h2>
          <p className="mx-auto max-w-2xl text-[16px] leading-[1.6] text-on-surface-variant sm:text-[18px]">
            {magisIdentity.intro} {magisIdentity.vision} {magisIdentity.mission}
          </p>
        </div>

        <div id="value" className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {aboutCards.map((card) => (
            <div
              key={card.title}
              className="group rounded-xl border border-outline-variant bg-white p-6 shadow-sm transition-all hover:shadow-md sm:p-8"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-surface-container-high text-primary transition-colors group-hover:bg-primary group-hover:text-white sm:h-16 sm:w-16">
                <card.icon className="size-8 sm:size-10" aria-hidden="true" />
              </div>
              <h3 className="mb-4 font-heading text-[22px] font-semibold leading-[1.3] text-primary sm:text-[24px]">
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

      <section id="impact" className="relative overflow-hidden bg-primary py-14 text-on-primary sm:py-20">
        <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-1/3 opacity-10 md:block">
          <TrendingUpIcon className="absolute -right-20 -top-20 size-100" aria-hidden="true" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="mb-5 font-heading text-[32px] font-bold leading-[1.1] tracking-[-0.02em] sm:mb-6 sm:text-[40px] lg:text-[48px]">
                MAGIS by the Numbers
              </h2>
              <p className="mb-10 text-[16px] leading-[1.6] text-on-primary/80 sm:mb-12 sm:text-[18px]">
                As of February 2026, the incubator is turning bold ideas into measurable progress
                across the Bicol Region.
              </p>
              <div className="grid grid-cols-2 gap-6 sm:gap-8">
                {magisMetrics.map((stat) => (
                  <MetricCard key={stat.label} {...stat} />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-4 lg:pt-12">
                <RoundedImageCard
                  alt="Startup team collaborating"
                  image={wordPressImageUrl(
                    "/wp-content/uploads/2026/07/demo-day.jpg",
                    "https://magistbi.com/wp-content/uploads/2026/07/demo-day.jpg",
                  )}
                  className="h-44 border-2 border-white/10 sm:h-64 sm:border-4"
                />
                <RoundedImageCard
                  alt="Pitch competition event"
                  image={wordPressImageUrl(
                    "/wp-content/uploads/2026/07/pitch-competition.jpeg",
                    "https://magistbi.com/wp-content/uploads/2026/07/pitch-competition.jpeg",
                  )}
                  className="h-36 border-2 border-white/10 sm:h-48 sm:border-4"
                />
              </div>
              <div className="space-y-4">
                <RoundedImageCard
                  alt="Innovation lab workshop"
                  image={wordPressImageUrl(
                    "/wp-content/uploads/2026/07/hackathon.jpg",
                    "https://magistbi.com/wp-content/uploads/2026/07/hackathon.jpg",
                  )}
                  className="h-36 border-2 border-white/10 sm:h-48 sm:border-4"
                />
                <RoundedImageCard
                  alt="Mentorship session"
                  image={wordPressImageUrl(
                    "/wp-content/uploads/2026/07/mentorship.jpg",
                    "https://magistbi.com/wp-content/uploads/2026/07/mentorship.jpg",
                  )}
                  className="h-44 border-2 border-white/10 sm:h-64 sm:border-4"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="cohorts" className="bg-surface py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 md:mb-12 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <h2 className="mb-4 font-heading text-[32px] font-bold leading-[1.1] tracking-[-0.02em] text-primary sm:text-[40px] lg:text-[48px]">
                IGNITE Startup Graduates
              </h2>
              <p className="max-w-2xl text-[16px] leading-[1.6] text-on-surface-variant sm:text-[18px]">
                A rotating showcase of the startups that have grown through the incubation
                program.
              </p>
            </div>
            <div className="rounded-full bg-secondary-container px-3 py-2 text-[11px] font-bold uppercase tracking-[0.28em] text-on-secondary-container sm:px-4 sm:text-[12px]">
              {startupGraduates.length} startups
            </div>
          </div>

          <StartupCarousel startups={startupGraduates} />
        </div>
      </section>

      <section id="programs" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mb-10 text-center sm:mb-16">
          <h2 className="mb-4 font-heading text-[32px] font-bold leading-[1.1] tracking-[-0.02em] text-primary sm:text-[40px] lg:text-[48px]">
            Programs &amp; Services
          </h2>
          <p className="mx-auto max-w-2xl text-[16px] leading-[1.6] text-on-surface-variant sm:text-[18px]">
            Structured support for incubation, skills development, mentorship, and core business
            operations.
          </p>
          <div className="mx-auto mt-4 h-1 w-24 bg-secondary-container sm:mt-6" />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="rounded-2xl border border-outline-variant bg-surface-container-low p-6 sm:p-8 lg:col-span-8 lg:p-10">
            <h3 className="mb-6 border-l-4 border-secondary pl-4 font-heading text-[22px] font-semibold leading-[1.3] text-primary sm:mb-8 sm:text-[24px]">
              Magis Core Programs
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 sm:gap-6 lg:gap-8">
              {programCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-xl border-t-4 border-secondary-container bg-white p-5 shadow-sm sm:p-6"
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

            <h3 className="mb-6 mt-10 border-l-4 border-secondary pl-4 font-heading text-[22px] font-semibold leading-[1.3] text-primary sm:mb-8 sm:mt-12 sm:text-[24px]">
              Mentorship &amp; Support
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 sm:gap-6 lg:gap-8">
              <div className="rounded-xl border-t-4 border-primary/20 bg-white p-5 shadow-sm sm:p-6">
                <h4 className="mb-2 flex items-center gap-2 font-bold text-primary">
                  <GroupsIcon className="size-4" aria-hidden="true" />
                  One-on-One Consultations
                </h4>
                <p className="text-sm text-on-surface-variant">
                  Expert consultations and strategic business mentorship.
                </p>
              </div>
              <div className="rounded-xl border-t-4 border-secondary-container bg-white p-5 shadow-sm sm:p-6">
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

          <div className="space-y-6 lg:col-span-4 sm:space-y-8">
            <div className="rounded-2xl bg-primary p-6 text-on-primary shadow-lg sm:p-8">
              <h3 className="mb-5 font-heading text-[22px] font-semibold leading-[1.3] sm:mb-6 sm:text-[24px]">
                Business Support
              </h3>
              <ul className="space-y-3 sm:space-y-4">
                {supportServices.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircleIcon className="size-4 text-secondary-container sm:size-5" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-secondary-container p-6 text-primary shadow-md sm:p-8">
              <h3 className="mb-4 font-heading text-[22px] font-semibold leading-[1.3] sm:text-[24px]">
                Facilities &amp; Spaces
              </h3>
              {facilityNames.map((item, index) => (
                <div
                  key={item}
                  className={[
                    "flex items-center gap-3 rounded-lg bg-white/20 p-3",
                    index === 0 ? "" : "mt-3",
                  ].join(" ")}
                >
                  {index === 0 ? (
                    <MemoryIcon className="size-4 sm:size-5" aria-hidden="true" />
                  ) : index === 1 ? (
                    <ApartmentIcon className="size-4 sm:size-5" aria-hidden="true" />
                  ) : index === 2 ? (
                    <ForestIcon className="size-4 sm:size-5" aria-hidden="true" />
                  ) : (
                    <ArchitectureIcon className="size-4 sm:size-5" aria-hidden="true" />
                  )}
                  <span className="font-bold">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="facilities" className="bg-surface py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 md:mb-12 md:flex-row md:items-end">
            <div className="max-w-xl">
              <h2 className="mb-4 font-heading text-[32px] font-bold leading-[1.1] tracking-[-0.02em] text-primary sm:text-[40px] lg:text-[48px]">
                Facilities &amp; Spaces
              </h2>
              <p className="text-[16px] leading-[1.6] text-on-surface-variant sm:text-[18px]">
                Open to university-affiliated and external startups. Find the environment that fits
                your next move.
              </p>
            </div>
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-on-primary transition-all hover:bg-tertiary sm:w-auto sm:px-8 sm:py-3.5 sm:text-base"
            >
              Book a Space
              <CalendarMonthIcon className="size-5" aria-hidden="true" />
            </a>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 sm:gap-8">
            {spaceCards.map((space) => (
              <div key={space.title} className="group overflow-hidden rounded-xl bg-white shadow-sm">
                <div className="relative h-44 overflow-hidden sm:h-56 md:h-64">
                  <img
                    alt={space.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    src={space.image}
                  />
                  <div className="absolute left-4 top-4 rounded bg-primary px-3 py-1 text-[12px] font-bold text-on-primary sm:text-[14px]">
                    {space.badge}
                  </div>
                </div>
                <div className="p-6 sm:p-8">
                  <div className="mb-4 flex items-center gap-2 text-secondary">
                    <space.icon className="size-5" aria-hidden="true" />
                    <span className="text-[12px] font-bold uppercase tracking-wider">
                      {space.label}
                    </span>
                  </div>
                  <h3 className="mb-3 font-heading text-[22px] font-semibold leading-[1.3] text-primary sm:text-[24px]">
                    {space.title}
                  </h3>
                  <p className="text-on-surface-variant">{space.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="goals" className="bg-surface-container-lowest py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center sm:gap-6 md:mb-12">
            <h2 className="font-heading text-[32px] font-bold leading-[1.1] tracking-[-0.02em] text-primary sm:text-[40px] lg:text-[48px]">
              Our Goals
            </h2>
            <a href="#contact" className="text-sm font-bold text-primary hover:underline">
              Learn More
            </a>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 sm:gap-6">
            {goalCards.map((goal) => (
              <div
                key={goal.title}
                className="flex flex-col overflow-hidden rounded-xl border border-outline-variant bg-white shadow-sm transition-all md:hover:-translate-y-2"
              >
                <div className="h-40 overflow-hidden sm:h-48">
                  <img alt={goal.title} className="h-full w-full object-cover" src={goal.image} />
                </div>
                <div className="p-5 sm:p-6">
                  <div className="mb-2 text-[13px] font-bold uppercase text-secondary sm:text-[14px]">
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

      <section className="bg-primary py-14 text-on-primary sm:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h3 className="mb-6 text-[12px] font-semibold uppercase tracking-widest text-on-primary/60 sm:mb-8">
            Supported by
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-6 opacity-80 grayscale brightness-200 contrast-50 sm:gap-12 md:gap-24">
            <img alt="DOST PCIEERD Logo" className="h-12 w-auto object-contain sm:h-16" src={dostPcieerdLogo} />
            <img alt="ADNU MAGIS TBI Logo" className="h-12 w-auto object-contain sm:h-16" src={officeLogo} />
            {/* <div className="flex flex-col items-center">
              <span className="text-[32px] font-bold tracking-tighter italic">DOST-PCIEERD</span>
              <span className="text-[10px] uppercase tracking-widest">Funded TBI</span>
            </div>
            <div className="font-heading text-[32px] font-bold">ADNU</div> */}
          </div>
        </div>
      </section>

      <section id="contact" className="relative overflow-hidden py-14 sm:py-20">
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
          <h2 className="mb-5 font-heading text-[32px] font-bold leading-[1.1] tracking-[-0.02em] text-on-primary sm:mb-6 sm:text-[40px] lg:text-[48px]">
            {magisLaunchpad.title}
          </h2>
          <p className="mb-8 text-[16px] leading-[1.6] text-on-primary/80 sm:mb-10 sm:text-[18px]">
            {magisLaunchpad.summary}
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
            <a
              href={facebookPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center rounded-lg bg-secondary-container px-6 py-3 text-[16px] font-bold text-on-secondary-container shadow-xl transition-all hover:scale-105 sm:w-auto sm:px-10 sm:py-4 sm:text-[18px]"
            >
              Apply Now
            </a>
            <a
              href={facebookPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center rounded-lg bg-white px-6 py-3 text-[16px] font-bold text-primary shadow-xl transition-all hover:scale-105 sm:w-auto sm:px-10 sm:py-4 sm:text-[18px]"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-on-primary">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-14 sm:px-6 sm:py-20 md:grid-cols-12 lg:px-8">
          <div className="md:col-span-5">
            <div className="mb-5 flex items-center gap-3 sm:mb-6">
              <img alt="ADNU MAGIS TBI Logo" className="h-9 w-9 object-contain sm:h-10 sm:w-10" src={officeLogo} />
              <span className="font-heading text-[20px] font-bold leading-[1.3] text-secondary-fixed sm:text-[24px]">
                ADNU MAGIS TBI
              </span>
            </div>
            <p className="mb-6 max-w-sm text-sm text-surface-variant sm:mb-8 sm:text-base">
              {magisIdentity.tagline} {magisLocation.supportLine}
            </p>
            <div className="flex gap-3">
              <a
                href={facebookPageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-all hover:bg-secondary-fixed hover:text-primary"
                aria-label="Facebook"
              >
                <FacebookIcon className="size-4" aria-hidden="true" />
              </a>
              <a
                href={linkedinPageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-all hover:bg-secondary-fixed hover:text-primary"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="size-4" aria-hidden="true" />
              </a>
              <a
                href={contactEmail}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-all hover:bg-secondary-fixed hover:text-primary"
                aria-label="Email"
              >
                <MailIcon className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="mb-4 text-[13px] font-bold uppercase tracking-widest text-secondary-fixed sm:mb-6 sm:text-[14px]">
              Platform
            </h4>
            <ul className="space-y-3 text-surface-variant sm:space-y-4">
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
            <h4 className="mb-4 text-[13px] font-bold uppercase tracking-widest text-secondary-fixed sm:mb-6 sm:text-[14px]">
              Resources
            </h4>
            <ul className="space-y-3 text-surface-variant sm:space-y-4">
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
            <h4 className="mb-4 text-[13px] font-bold uppercase tracking-widest text-secondary-fixed sm:mb-6 sm:text-[14px]">
              Location
            </h4>
            <p className="mb-4 text-sm text-surface-variant sm:text-base">{magisLocation.address}</p>
            <div className="overflow-hidden rounded-lg border border-white/10 bg-white/5 shadow-lg">
              <iframe
                src={googleMapsEmbedUrl}
                title={magisLocation.heading}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-28 w-full sm:h-32"
              />
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border-t border-white/10 bg-white/5 px-4 py-3 text-xs font-semibold text-secondary-fixed transition-colors hover:bg-white/10"
              >
                <LocationOnIcon className="size-4" aria-hidden="true" />
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center text-sm text-surface-variant md:flex-row md:text-left">
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
