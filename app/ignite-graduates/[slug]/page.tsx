import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cache } from "react";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/motion/reveal";
import {
  contactEmail,
  getStartupHref,
  igniteGraduatesHref,
  startupGraduatesSectionHref,
} from "@/lib/site-links";
import { getStartupBySlug } from "@/lib/wordpress";

type StartupPageParams = {
  slug: string;
};

type StartupPageProps = {
  params: Promise<StartupPageParams>;
};

const loadStartup = cache(async (slug: string) =>
  getStartupBySlug(slug, ["wordpress", "wordpress:startups", "wordpress:startup"]),
);

function resolveParams(params: StartupPageProps["params"]): Promise<StartupPageParams> {
  return Promise.resolve(params);
}

function formatList(items: string[]): string {
  if (items.length === 0) {
    return "";
  }

  if (items.length === 1) {
    return items[0];
  }

  return new Intl.ListFormat("en", { style: "long", type: "conjunction" }).format(items);
}

function buildStartupDescription(startup: Awaited<ReturnType<typeof loadStartup>>): string {
  if (!startup) {
    return "The requested startup profile could not be found.";
  }

  return startup.description || `Explore the ${startup.startupName} startup profile from the MAGIS archive.`;
}

function buildHeroNote(startup: NonNullable<Awaited<ReturnType<typeof loadStartup>>>) {
  if (startup.founderNames.length > 0) {
    return `Founded by ${formatList(startup.founderNames)}.`;
  }

  return "Founder details will appear once the WordPress profile is completed.";
}

function buildMissionCopy(startup: NonNullable<Awaited<ReturnType<typeof loadStartup>>>) {
  const founderText = startup.founderNames.length > 0 ? formatList(startup.founderNames) : "the founding team";
  const cohortText = startup.cohort ?? "the current cohort";
  const industryText = startup.industry ?? "the startup's focus area";

  return [
    startup.description ||
      `${startup.startupName} is presented here as a compact profile while the archive continues to grow.`,
    `Founded by ${founderText}, ${startup.startupName} is part of ${cohortText} and stays centered on ${industryText}.`,
  ];
}

function buildJourneyPoints(startup: NonNullable<Awaited<ReturnType<typeof loadStartup>>>) {
  const founderText = startup.founderNames.length > 0 ? formatList(startup.founderNames) : "the founding team";

  return [
    {
      label: "Founding team",
      value: founderText,
    },
    {
      label: "Cohort",
      value: startup.cohort ?? "Cohort details pending",
    },
    {
      label: "Industry",
      value: startup.industry ?? "Industry details pending",
    },
  ];
}

function buildStartupProfileTitle(startup: NonNullable<Awaited<ReturnType<typeof loadStartup>>>) {
  const cohortLabel = startup.cohort ? `${startup.cohort}` : "Cohort pending";
  const industryLabel = startup.industry ? startup.industry : "Industry pending";

  return {
    cohortLabel,
    industryLabel,
  };
}

function StartupHeroPanel({ startup }: { startup: NonNullable<Awaited<ReturnType<typeof loadStartup>>> }) {
  const altText = startup.logo?.alt || startup.startupName;
  const monogram = startup.startupName.trim().charAt(0).toUpperCase() || "S";

  return (
    <div className="relative isolate overflow-hidden rounded-[1.75rem] border border-outline-variant/70 bg-[linear-gradient(160deg,#dce9ff_0%,#eff4ff_42%,#ffffff_100%)] shadow-[0_24px_44px_rgba(11,28,48,0.12)]">
      <div className="relative aspect-[5/4] min-h-[22rem] overflow-hidden sm:aspect-[4/3] lg:min-h-[32rem]">
        <Image
          fill
          priority
          alt={`${startup.startupName} profile backdrop`}
          className="object-cover object-center"
          sizes="(min-width: 1024px) 44vw, 100vw"
          src="/home-of-magis.jpg"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.02)_26%,rgba(0,26,72,0.14)_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.22),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(0,26,72,0.16),transparent_46%)]"
        />

        <div
          className="absolute -right-8 top-8 z-10 h-40 w-40 rounded-[2rem] bg-white/40 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute -left-10 bottom-0 z-10 h-52 w-52 rounded-full bg-primary-fixed/30 blur-3xl"
          aria-hidden="true"
        />

        <div className="absolute bottom-4 left-4 z-20 flex items-end gap-3 sm:bottom-6 sm:left-6">
          <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-white/75 bg-white/90 p-2 shadow-[0_12px_28px_rgba(0,26,72,0.18)] backdrop-blur">
            {startup.logo ? (
              <img
                alt={altText}
                className="h-full w-full object-contain"
                decoding="async"
                loading="eager"
                src={startup.logo.url}
              />
            ) : (
              <span className="font-heading text-2xl font-bold leading-none text-primary">
                {monogram}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function JourneyBullet({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-secondary/55 text-[0.7rem] font-bold text-secondary">
        •
      </div>
      <div className="min-w-0">
        <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-secondary-fixed/90">
          {label}
        </p>
        <p className="mt-1 text-sm leading-6 text-surface-variant">{value}</p>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: StartupPageProps): Promise<Metadata> {
  const { slug } = await resolveParams(params);

  if (!slug) {
    return {
      title: "Startup not found",
      description: "The requested startup profile could not be found in the archive.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const startup = await loadStartup(slug);

  if (!startup) {
    return {
      title: "Startup not found",
      description: "The requested startup profile could not be found in the archive.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonicalPath = getStartupHref(startup.slug);
  const heroImage = startup.logo?.url ?? "/home-of-magis.jpg";
  const description = buildStartupDescription(startup);

  return {
    title: startup.startupName,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: startup.startupName,
      description,
      url: canonicalPath,
      siteName: "ADNU MAGIS TBI",
      type: "website",
      images: [
        {
          url: heroImage,
          width: startup.logo?.width ?? 1600,
          height: startup.logo?.height ?? 900,
          alt: startup.logo?.alt || startup.startupName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: startup.startupName,
      description,
      images: [heroImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export default async function StartupProfilePage({ params }: StartupPageProps) {
  const { slug } = await resolveParams(params);

  if (!slug) {
    notFound();
  }

  const startup = await loadStartup(slug);

  if (!startup) {
    notFound();
  }

  const { cohortLabel, industryLabel } = buildStartupProfileTitle(startup);
  const missionCopy = buildMissionCopy(startup);
  const journeyPoints = buildJourneyPoints(startup);
  const heroNote = buildHeroNote(startup);
  const founderCountLabel =
    startup.founderNames.length > 0 ? `${startup.founderNames.length} founder${startup.founderNames.length === 1 ? "" : "s"}` : "Founder team pending";

  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-[30rem] bg-[radial-gradient(circle_at_top_left,rgba(255,199,44,0.14),transparent_34%),radial-gradient(circle_at_top_right,rgba(0,26,72,0.12),transparent_32%),linear-gradient(180deg,rgba(229,238,255,0.9),rgba(248,249,255,0.08))]" />
      <div className="absolute right-0 top-28 -z-10 hidden h-72 w-72 rounded-full bg-primary-fixed/35 blur-3xl lg:block" />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <Reveal
          as="section"
          className="relative grid gap-8 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:items-center"
          direction="up"
        >
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full border border-primary/12 bg-primary-fixed px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-primary">
                  {cohortLabel.toUpperCase()}
                </span>
                <span className="inline-flex items-center rounded-full border border-outline-variant bg-surface-container-lowest px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-on-surface-variant">
                  {`INDUSTRY: ${industryLabel.toUpperCase()}`}
                </span>
              </div>

              <h1 className="max-w-3xl font-heading text-[clamp(2.6rem,6.8vw,5rem)] leading-[0.95] tracking-[-0.05em] text-primary">
                {startup.startupName}
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex flex-wrap items-center gap-3 rounded-full border border-outline-variant bg-surface-container-lowest px-4 py-2.5 shadow-sm">
                <span className="rounded-full bg-secondary-container px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-on-secondary-container">
                  Impact
                </span>
                <span className="text-sm font-semibold text-primary">{founderCountLabel}</span>
                <span aria-hidden="true" className="text-outline-variant">
                  •
                </span>
                <span className="text-sm text-on-surface-variant">
                  {startup.cohort ?? "Cohort pending"}
                </span>
              </div>

              <Link
                className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-on-primary shadow-sm transition-colors hover:bg-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                href={contactEmail}
              >
                Partner with us
              </Link>
              <Link
                className="inline-flex items-center justify-center rounded-lg border border-outline-variant bg-surface-container-lowest px-5 py-3 text-sm font-semibold text-primary transition-colors hover:border-primary hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                href={startupGraduatesSectionHref}
              >
                Back to startup section
              </Link>
              <Link
                className="inline-flex items-center justify-center rounded-lg border border-outline-variant bg-surface-container-lowest px-5 py-3 text-sm font-semibold text-primary transition-colors hover:border-primary hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                href={igniteGraduatesHref}
              >
                Browse other startups
              </Link>
            </div>

            <p className="max-w-2xl text-sm leading-6 text-on-surface-variant">
              {heroNote}
            </p>
          </div>

          <div className="relative">
            <StartupHeroPanel startup={startup} />
          </div>
        </Reveal>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)]">
          <Reveal
            as="article"
            className="rounded-[1.75rem] border border-outline-variant/70 bg-surface-container-lowest p-6 shadow-sm sm:p-8"
            direction="up"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-lg leading-none text-secondary">◆</span>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">
                  Mission &amp; Impact
                </p>
              </div>

              <div className="space-y-4 text-on-surface-variant">
                {missionCopy.map((paragraph) => (
                  <p key={paragraph} className="text-[1rem] leading-7 sm:text-[1.03rem] sm:leading-8">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="pt-2">
                <div className="border-t border-outline-variant/70 pt-5">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-secondary">
                    Key focus areas
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-primary-fixed px-3 py-1 text-xs font-semibold text-primary">
                      {industryLabel}
                    </span>
                    <span className="rounded-full bg-primary-fixed px-3 py-1 text-xs font-semibold text-primary">
                      {startup.cohort ?? "Cohort pending"}
                    </span>
                    <span className="rounded-full bg-primary-fixed px-3 py-1 text-xs font-semibold text-primary">
                      {founderCountLabel}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal
            as="article"
            className="rounded-[1.75rem] border border-white/12 bg-[linear-gradient(180deg,#001a48_0%,#001233_100%)] p-6 text-on-primary shadow-[0_24px_44px_rgba(0,26,72,0.12)] sm:p-8"
            direction="up"
          >
            <div className="space-y-5">
              <div className="flex items-center gap-2">
                <span className="text-lg leading-none text-secondary-fixed">◆</span>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary-fixed">
                  The MAGIS Journey
                </p>
              </div>

              <div className="space-y-4">
                {journeyPoints.map((point) => (
                  <JourneyBullet key={point.label} label={point.label} value={point.value} />
                ))}
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </main>
  );
}
