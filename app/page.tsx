import type { Metadata } from "next";
import type { ComponentType, ReactNode, SVGProps } from "react";
import Link from "next/link";

import {
  HeroBackdrop,
} from "@/components/motion/hero-backdrop";
import { MotionSurface } from "@/components/motion/motion-surface";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";
import {
  magisFacilities,
  magisGoals,
  magisIdentity,
  magisLaunchpad,
  magisLocation,
  magisMetrics,
  magisPrograms,
  magisTaglines,
  magisValuePoints,
} from "@/lib/magis-content";
import { ArticleCard } from "@/components/articles/article-card";
import { StructuredData } from "@/components/structured-data";
import {
  articlesHref,
  bookingUrl,
  facebookPageUrl,
  getStartupHref,
  igniteGraduatesHref,
  linkedinPageUrl,
  startupGraduatesSectionId,
} from "@/lib/site-links";
import { getArticleHref } from "@/lib/articles";
import { getSiteUrl } from "@/lib/site";
import { buildWordPressImageUrl, getLatestPosts, getStartupGraduates } from "@/lib/wordpress";
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

export const revalidate = 300;

export function generateMetadata(): Metadata {
  const title = "ADNU MAGIS TBI | Innovation Hub";
  const description =
    "ADNU MAGIS TBI is the Ateneo de Naga University technology business incubator for startup growth, mentorship, spaces, and community impact.";

  return {
    title,
    description,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title,
      description,
      url: "/",
      siteName: "ADNU MAGIS TBI",
      type: "website",
      images: [
        {
          url: "/home-of-magis.jpg",
          width: 1600,
          height: 900,
          alt: "ADNU MAGIS TBI home of MAGIS",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/home-of-magis.jpg"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

function buildHomepageJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "ADNU MAGIS TBI",
      url: getSiteUrl("/"),
      logo: getSiteUrl("/magis-logo.png"),
      description: magisIdentity.intro,
      sameAs: [facebookPageUrl, linkedinPageUrl],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Naga City",
        addressRegion: "Camarines Sur",
        addressCountry: "PH",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "ADNU MAGIS TBI",
      url: getSiteUrl("/"),
      description: magisIdentity.intro,
    },
  ];
}

function StartupLogoCard({
  startup,
  duplicate = false,
  href,
}: {
  startup: WordPressStartup;
  duplicate?: boolean;
  href?: string;
}) {
  const founderSummary =
    startup.founderNames.length > 0
      ? `Founded by ${startup.founderNames.join(", ")}.`
      : "Founder details available in WordPress.";
  const tooltip = founderSummary;
  const card = (
    <figure
      aria-hidden={duplicate || undefined}
      className={`flex w-32 shrink-0 items-center justify-center rounded-lg border border-outline-variant/50 bg-surface-container-lowest px-2 py-3 shadow-sm transition-transform duration-300 ${duplicate ? "startup-carousel-duplicate" : ""} ${
        href && !duplicate ? "group-hover:border-primary/50 group-hover:shadow-[0_16px_30px_rgba(11,28,48,0.08)]" : ""
      } sm:w-40 sm:px-3 sm:py-4`}
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

  if (!href) {
    return card;
  }

  return (
    <Link
      aria-label={`View profile for ${startup.startupName}`}
      className="group block h-full rounded-lg outline-none transition-transform duration-300 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
      href={href}
    >
      {card}
    </Link>
  );
}

function StartupCarousel({ startups }: { startups: WordPressStartup[] }) {
  if (startups.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-outline-variant bg-surface-container-lowest px-6 py-8 text-center text-on-surface-variant shadow-sm sm:px-8 sm:py-10">
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
              href={getStartupHref(startup.slug)}
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
                href={getStartupHref(startup.slug)}
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

const dostPcieerdLogo = wordPressImageUrl(
  "/wp-content/uploads/2025/02/dost-white.png",
  "https://magistbi.com/wp-content/uploads/2025/02/dost-white.png",
);
const adnuLogo = wordPressImageUrl(
  "/wp-content/uploads/2026/07/adnu_logo.png",
  "https://adnumagis.wpcomstaging.com/wp-content/uploads/2026/07/adnu_logo.png",
);

function MetricCard({ value, label }: StatItem) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/6 px-4 py-4 shadow-[0_14px_28px_rgba(0,0,0,0.12)]">
      <div className="mb-2 text-[34px] font-bold leading-none tracking-[-0.02em] text-secondary-container sm:text-[44px]">
        {value}
      </div>
      <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-on-primary/68 sm:text-[12px]">
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
    <div className={`relative overflow-hidden rounded-lg border border-white/12 bg-white/5 shadow-[0_16px_30px_rgba(0,0,0,0.15)] ${className ?? ""}`}>
      <img alt={alt} className="h-full w-full object-cover" src={image} />
      {children}
    </div>
  );
}

export default async function Home() {
  const [startupGraduates, latestPosts] = await Promise.all([
    getStartupGraduates(),
    getLatestPosts(3),
  ]);

  return (
    <main className="overflow-x-hidden bg-background text-on-surface">
      <StructuredData id="home-jsonld" data={buildHomepageJsonLd()} />
      <section className="relative overflow-hidden bg-primary py-12 text-on-primary sm:py-16 lg:py-20">
        <HeroBackdrop />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
            <div className="rounded-lg border border-white/12 bg-[rgba(0,26,72,0.84)] p-6 shadow-[0_28px_60px_rgba(0,0,0,0.28)] backdrop-blur-sm sm:p-8 lg:p-10">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-secondary-container/25 bg-secondary-container/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-secondary-container">
                Technology Business Incubator
              </div>
              <h1 className="mb-5 max-w-2xl font-heading text-[34px] font-bold leading-[1.06] tracking-[-0.02em] text-on-primary sm:mb-6 sm:text-[48px] lg:text-[58px]">
                {magisIdentity.title}
                <br />
                <span className="text-secondary-container">{magisIdentity.tagline}</span>
              </h1>
              <p className="max-w-xl text-[16px] leading-[1.65] text-on-primary/88 sm:text-[18px]">
                {magisIdentity.intro} {magisIdentity.acronym}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
                <MotionSurface as="div" className="w-full sm:w-auto" tone="button">
                  <a
                    href="#programs"
                    className="flex w-full items-center justify-center rounded-lg bg-secondary-container px-6 py-3 text-[16px] font-bold text-on-secondary-container shadow-sm transition-all hover:bg-secondary-fixed sm:w-auto sm:px-8 sm:py-3.5 sm:text-[18px]"
                  >
                    Explore Programs
                  </a>
                </MotionSurface>
                <MotionSurface as="div" className="w-full sm:w-auto" tone="button">
                  <a
                    href="#about"
                    className="flex w-full items-center justify-center rounded-lg border border-white/24 bg-white/5 px-6 py-3 text-[16px] font-bold text-on-primary transition-all hover:bg-white/10 sm:w-auto sm:px-8 sm:py-3.5 sm:text-[18px]"
                  >
                    Learn More
                  </a>
                </MotionSurface>
              </div>
              <div className="mt-8 flex flex-wrap gap-2">
                {magisTaglines.map((tagline) => (
                  <span
                    key={tagline}
                    className="rounded-full border border-white/12 bg-white/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-on-primary/80"
                  >
                    {tagline}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <Reveal as="div" className="mb-10 text-center sm:mb-16" direction="up">
          <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.28em] text-secondary">
            About MAGIS TBI
          </p>
          <h2 className="mb-4 font-heading text-[32px] font-bold leading-[1.1] tracking-[-0.02em] text-primary sm:text-[40px] lg:text-[48px]">
            {magisIdentity.aboutTitle}
          </h2>
          <p className="mx-auto max-w-2xl text-[16px] leading-[1.6] text-on-surface-variant sm:text-[18px]">
            {magisIdentity.intro} {magisIdentity.vision} {magisIdentity.mission}
          </p>
        </Reveal>

        <StaggerGroup id="value" as="div" className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {aboutCards.map((card) => (
            <StaggerItem key={card.title} as="div">
              <MotionSurface
                as="div"
                className="group rounded-lg border border-outline-variant/80 bg-surface-container-lowest p-6 shadow-sm transition-all hover:shadow-[0_16px_30px_rgba(11,28,48,0.08)] sm:p-8"
                tone="card"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-primary-fixed text-primary transition-colors group-hover:bg-secondary-container group-hover:text-on-secondary-container sm:h-16 sm:w-16">
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
              </MotionSurface>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <section id="impact" className="relative overflow-hidden bg-primary py-14 text-on-primary sm:py-20">
        <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-1/3 opacity-10 md:block">
          <TrendingUpIcon className="absolute -right-20 -top-20 size-100" aria-hidden="true" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal as="div" direction="left" tone="strong">
              <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.28em] text-secondary-fixed">
                Impact
              </p>
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
            </Reveal>

            <Reveal as="div" direction="right" tone="strong">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-4 lg:pt-12">
                  <RoundedImageCard
                    alt="Startup team collaborating"
                    image={wordPressImageUrl(
                      "/wp-content/uploads/2026/07/demo-day.jpg",
                      "https://magistbi.com/wp-content/uploads/2026/07/demo-day.jpg",
                    )}
                    className="h-44 sm:h-64"
                  />
                  <RoundedImageCard
                    alt="Pitch competition event"
                    image={wordPressImageUrl(
                      "/wp-content/uploads/2026/07/pitch-competition.jpeg",
                      "https://magistbi.com/wp-content/uploads/2026/07/pitch-competition.jpeg",
                    )}
                    className="h-36 sm:h-48"
                  />
                </div>
                <div className="space-y-4">
                  <RoundedImageCard
                    alt="Innovation lab workshop"
                    image={wordPressImageUrl(
                      "/wp-content/uploads/2026/07/hackathon.jpg",
                      "https://magistbi.com/wp-content/uploads/2026/07/hackathon.jpg",
                    )}
                    className="h-36 sm:h-48"
                  />
                  <RoundedImageCard
                    alt="Mentorship session"
                    image={wordPressImageUrl(
                      "/wp-content/uploads/2026/07/mentorship.jpg",
                      "https://magistbi.com/wp-content/uploads/2026/07/mentorship.jpg",
                    )}
                    className="h-44 sm:h-64"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-surface py-14 sm:py-20">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
          <Reveal as="div" className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end" direction="up">
            <div className="max-w-2xl">
              <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.28em] text-secondary">
                Latest updates
              </p>
              <h2 className="font-heading text-[32px] font-bold leading-[1.1] tracking-[-0.02em] text-primary sm:text-[40px] lg:text-[48px]">
                Latest from the archive
              </h2>
              <p className="mt-4 text-[16px] leading-[1.6] text-on-surface-variant sm:text-[18px]">
                Recent stories, announcements, and startup updates from the WordPress archive.
              </p>
            </div>
            <MotionSurface as="div" tone="button">
              <Link
                className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-[16px] font-bold text-on-primary shadow-sm transition-all hover:bg-tertiary sm:px-8 sm:py-4 sm:text-[18px]"
                href={articlesHref}
              >
                View all articles
              </Link>
            </MotionSurface>
          </Reveal>

          {latestPosts.length > 0 ? (
            <StaggerGroup as="div" className="grid gap-6 lg:grid-cols-3">
              {latestPosts.map((post) => (
                <StaggerItem key={post.id} as="div">
                  <ArticleCard href={getArticleHref(post)} post={post} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          ) : (
            <Reveal as="div" className="rounded-lg border border-dashed border-outline-variant bg-surface-container-lowest px-6 py-8 text-center text-on-surface-variant shadow-sm sm:px-8 sm:py-10">
              <p className="font-heading text-[20px] font-semibold leading-[1.3] text-primary sm:text-[24px]">
                Latest articles will appear here once the WordPress archive is available.
              </p>
              <p className="mt-3 text-[15px] leading-[1.6] sm:text-[16px]">
                The homepage still links to the archive so crawlers and visitors can reach the
                editorial content hub even when the CMS is empty.
              </p>
            </Reveal>
          )}
        </div>
      </section>

      <section id={startupGraduatesSectionId} className="scroll-mt-28 bg-surface py-14 sm:scroll-mt-32 sm:py-20 lg:scroll-mt-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal
            as="div"
            className="mb-10 flex flex-col items-start justify-between gap-4 md:mb-12 md:flex-row md:items-end"
            direction="up"
          >
            <div className="max-w-2xl">
              <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.28em] text-secondary">
                Cohorts
              </p>
              <h2 className="mb-4 font-heading text-[32px] font-bold leading-[1.1] tracking-[-0.02em] text-primary sm:text-[40px] lg:text-[48px]">
                IGNITE Startup Graduates
              </h2>
              <p className="max-w-2xl text-[16px] leading-[1.6] text-on-surface-variant sm:text-[18px]">
                A rotating showcase of the startups that have grown through the incubation
                program.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-lg bg-secondary-container px-3 py-2 text-[11px] font-bold uppercase tracking-[0.28em] text-on-secondary-container sm:px-4 sm:text-[12px]">
                {startupGraduates.length} startups
              </div>
              <MotionSurface as="div" tone="button">
                <Link
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-bold text-on-primary shadow-sm transition-all hover:bg-tertiary sm:px-6"
                  href={igniteGraduatesHref}
                >
                  View graduates page
                </Link>
              </MotionSurface>
            </div>
          </Reveal>

          <Reveal as="div" direction="up">
            <StartupCarousel startups={startupGraduates} />
          </Reveal>
        </div>
      </section>

      <section id="programs" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <Reveal as="div" className="mb-10 text-center sm:mb-16" direction="up">
          <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.28em] text-secondary">
            Programs &amp; services
          </p>
          <h2 className="mb-4 font-heading text-[32px] font-bold leading-[1.1] tracking-[-0.02em] text-primary sm:text-[40px] lg:text-[48px]">
            Programs &amp; Services
          </h2>
          <p className="mx-auto max-w-2xl text-[16px] leading-[1.6] text-on-surface-variant sm:text-[18px]">
            Structured support for incubation, skills development, mentorship, and core business
            operations.
          </p>
          <div className="mx-auto mt-4 h-1 w-24 bg-secondary-container sm:mt-6" />
        </Reveal>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          <Reveal
            as="div"
            className="rounded-lg border border-outline-variant/80 bg-surface-container-lowest p-6 shadow-sm sm:p-8 lg:col-span-8 lg:p-10"
            direction="left"
          >
            <h3 className="mb-6 flex items-center gap-3 font-heading text-[22px] font-semibold leading-[1.3] text-primary sm:mb-8 sm:text-[24px]">
              <span className="h-6 w-1 rounded-full bg-secondary" aria-hidden="true" />
              Magis Core Programs
            </h3>
            <StaggerGroup as="div" className="grid grid-cols-1 gap-4 md:grid-cols-2 sm:gap-6 lg:gap-8" tone="default">
              {programCards.map((card) => (
                <StaggerItem key={card.title} as="div">
                  <MotionSurface
                    as="div"
                    className="rounded-lg border border-outline-variant/80 bg-surface-container-lowest p-5 shadow-sm sm:p-6"
                    tone="card"
                  >
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary-fixed text-primary">
                      <card.icon className="size-5" aria-hidden="true" />
                    </div>
                    <h4 className="mb-2 font-bold text-primary">
                      {card.title}
                    </h4>
                    <p className="text-sm leading-6 text-on-surface-variant">{card.description}</p>
                    <a
                      href="#contact"
                      className="mt-4 inline-flex items-center gap-2 font-bold text-secondary transition-all hover:gap-3"
                    >
                      {card.linkLabel}
                      <ArrowRightIcon className="size-5" aria-hidden="true" />
                    </a>
                  </MotionSurface>
                </StaggerItem>
              ))}
            </StaggerGroup>

            <h3 className="mb-6 mt-10 flex items-center gap-3 font-heading text-[22px] font-semibold leading-[1.3] text-primary sm:mb-8 sm:mt-12 sm:text-[24px]">
              <span className="h-6 w-1 rounded-full bg-secondary" aria-hidden="true" />
              Mentorship &amp; Support
            </h3>
            <StaggerGroup as="div" className="grid grid-cols-1 gap-4 md:grid-cols-2 sm:gap-6 lg:gap-8" tone="calm">
              <StaggerItem as="div" tone="calm">
                <MotionSurface as="div" className="rounded-lg border border-outline-variant/80 bg-surface-container-lowest p-5 shadow-sm sm:p-6" tone="card">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary-fixed text-primary">
                    <GroupsIcon className="size-5" aria-hidden="true" />
                  </div>
                  <h4 className="mb-2 font-bold text-primary">
                    One-on-One Consultations
                  </h4>
                  <p className="text-sm leading-6 text-on-surface-variant">
                    Expert consultations and strategic business mentorship.
                  </p>
                </MotionSurface>
              </StaggerItem>
              <StaggerItem as="div" tone="calm">
                <MotionSurface as="div" className="rounded-lg border border-outline-variant/80 bg-surface-container-lowest p-5 shadow-sm sm:p-6" tone="card">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-secondary-container text-on-secondary-container">
                    <ApartmentIcon className="size-5" aria-hidden="true" />
                  </div>
                  <h4 className="mb-2 font-bold text-primary">
                    Core Business Services
                  </h4>
                  <p className="text-sm leading-6 text-on-surface-variant">
                    Accounting, finance, legal assistance, virtual office access, and business permit
                    processing.
                  </p>
                </MotionSurface>
              </StaggerItem>
            </StaggerGroup>
          </Reveal>

          <Reveal as="div" className="space-y-6 lg:col-span-4 sm:space-y-8" direction="right">
            <MotionSurface as="div" className="rounded-lg border border-white/12 bg-primary p-6 text-on-primary shadow-[0_16px_36px_rgba(0,0,0,0.18)] sm:p-8" tone="card">
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
            </MotionSurface>

            <MotionSurface as="div" className="rounded-lg border border-outline-variant/80 bg-secondary-container p-6 text-on-secondary-container shadow-[0_16px_36px_rgba(11,28,48,0.12)] sm:p-8" tone="card">
              <h3 className="mb-4 font-heading text-[22px] font-semibold leading-[1.3] sm:text-[24px]">
                Facilities &amp; Spaces
              </h3>
              {facilityNames.map((item, index) => (
                <div
                  key={item}
                  className={[
                    "flex items-center gap-3 rounded-lg bg-white/15 p-3",
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
            </MotionSurface>
          </Reveal>
        </div>
      </section>

      <section id="facilities" className="bg-surface py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal as="div" className="mb-10 flex flex-col items-start justify-between gap-4 md:mb-12 md:flex-row md:items-end" direction="up">
            <div className="max-w-xl">
              <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.28em] text-secondary">
                Facilities &amp; spaces
              </p>
              <h2 className="mb-4 font-heading text-[32px] font-bold leading-[1.1] tracking-[-0.02em] text-primary sm:text-[40px] lg:text-[48px]">
                Facilities &amp; Spaces
              </h2>
              <p className="text-[16px] leading-[1.6] text-on-surface-variant sm:text-[18px]">
                Open to university-affiliated and external startups. Find the environment that fits
                your next move.
              </p>
            </div>
            <MotionSurface as="div" className="w-full sm:w-auto" tone="button">
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-on-primary transition-all hover:bg-tertiary sm:w-auto sm:px-8 sm:py-3.5 sm:text-base"
              >
                Book a Space
                <CalendarMonthIcon className="size-5" aria-hidden="true" />
              </a>
            </MotionSurface>
          </Reveal>

          <StaggerGroup as="div" className="grid grid-cols-1 gap-6 md:grid-cols-3 sm:gap-8">
            {spaceCards.map((space) => (
              <StaggerItem key={space.title} as="div">
                <MotionSurface as="div" className="group overflow-hidden rounded-lg border border-outline-variant/80 bg-surface-container-lowest shadow-sm" tone="card">
                  <div className="relative h-44 overflow-hidden sm:h-56 md:h-64">
                    <img
                      alt={space.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      src={space.image}
                    />
                    <div className="absolute left-4 top-4 rounded-lg bg-primary px-3 py-1 text-[12px] font-bold text-on-primary shadow-sm sm:text-[14px]">
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
                </MotionSurface>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section id="goals" className="bg-surface-container-lowest py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal as="div" className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center sm:gap-6 md:mb-12" direction="up">
            <div>
              <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.28em] text-secondary">
                Goals
              </p>
              <h2 className="font-heading text-[32px] font-bold leading-[1.1] tracking-[-0.02em] text-primary sm:text-[40px] lg:text-[48px]">
                Our Goals
              </h2>
            </div>
            <a href="#contact" className="text-sm font-bold text-primary hover:underline">
              Learn More
            </a>
          </Reveal>

          <StaggerGroup as="div" className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 sm:gap-6">
            {goalCards.map((goal) => (
              <StaggerItem key={goal.title} as="div">
                <MotionSurface
                  as="div"
                  className="flex flex-col overflow-hidden rounded-lg border border-outline-variant/80 bg-surface-container-lowest shadow-sm transition-all md:hover:-translate-y-1"
                  tone="card"
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
                </MotionSurface>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="bg-primary py-14 text-on-primary sm:py-20">
        <Reveal as="div" className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8" direction="up" tone="calm">
          <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.28em] text-secondary-fixed">
            Supported by
          </p>
          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-4">
            <div className="rounded-lg border border-white/12 bg-white/7 px-6 py-4 shadow-[0_12px_24px_rgba(0,0,0,0.12)]">
              <img alt="DOST PCIEERD Logo" className="h-10 w-auto object-contain sm:h-12" src={dostPcieerdLogo} />
            </div>
            <div className="rounded-lg border border-white/12 bg-white/7 px-6 py-4 shadow-[0_12px_24px_rgba(0,0,0,0.12)]">
              <img alt="ADNU Logo" className="h-10 w-auto object-contain sm:h-12" src={adnuLogo} />
            </div>
          </div>
        </Reveal>
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
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,26,72,0.88)_0%,rgba(0,45,114,0.9)_100%)] backdrop-blur-sm" />
        </div>

        <StaggerGroup
          as="div"
          className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8"
          tone="strong"
        >
          <MotionSurface
            as="div"
            className="rounded-lg border border-white/12 bg-[rgba(248,249,255,0.06)] px-6 py-8 text-center shadow-[0_24px_50px_rgba(0,0,0,0.24)] backdrop-blur-sm sm:px-8 sm:py-10"
            tone="card"
          >
            <StaggerItem as="div" tone="strong">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-secondary-container/25 bg-secondary-container/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-secondary-container">
                Start here
              </div>
            </StaggerItem>
            <StaggerItem as="div" tone="strong">
              <h2 className="mb-5 font-heading text-[32px] font-bold leading-[1.1] tracking-[-0.02em] text-on-primary sm:mb-6 sm:text-[40px] lg:text-[48px]">
                {magisLaunchpad.title}
              </h2>
            </StaggerItem>
            <StaggerItem as="div" tone="strong">
              <p className="mb-8 text-[16px] leading-[1.6] text-on-primary/80 sm:mb-10 sm:text-[18px]">
                {magisLaunchpad.summary}
              </p>
            </StaggerItem>
            <StaggerItem as="div" tone="strong">
              <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
                <MotionSurface as="div" className="w-full sm:w-auto" tone="button">
                  <a
                    href={facebookPageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center rounded-lg bg-secondary-container px-6 py-3 text-[16px] font-bold text-on-secondary-container shadow-sm transition-all hover:bg-secondary-fixed sm:w-auto sm:px-10 sm:py-4 sm:text-[18px]"
                  >
                    Apply Now
                  </a>
                </MotionSurface>
                <MotionSurface as="div" className="w-full sm:w-auto" tone="button">
                  <a
                    href={facebookPageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center rounded-lg border border-white/24 bg-white/5 px-6 py-3 text-[16px] font-bold text-on-primary transition-all hover:bg-white/10 sm:w-auto sm:px-10 sm:py-4 sm:text-[18px]"
                  >
                    Contact Us
                  </a>
                </MotionSurface>
              </div>
            </StaggerItem>
          </MotionSurface>
        </StaggerGroup>
      </section>

    </main>
  );
}
