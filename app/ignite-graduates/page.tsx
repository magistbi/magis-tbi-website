import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { StartupFilters } from "@/components/startups/startup-filters";
import { StartupShowcaseCard } from "@/components/startups/startup-showcase-card";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";
import { magisCohorts } from "@/lib/magis-content";
import { facebookPageUrl, igniteGraduatesHref } from "@/lib/site-links";
import {
  collectStartupFilterOptions,
  filterStartupsByQuery,
  normalizeStartupFilterValue,
  selectFeaturedStartups,
} from "@/lib/startups";
import { getStartupGraduates } from "@/lib/wordpress";
import type { WordPressStartup } from "@/types/wordpress";

type SearchParamsValue = string | string[] | undefined;
type SearchParamsInput = Record<string, SearchParamsValue> | Promise<Record<string, SearchParamsValue>>;

type IgniteGraduatesPageProps = {
  searchParams?: Promise<Record<string, SearchParamsValue>>;
};

const DIRECTORY_PREVIEW_COUNT = 6;
export const dynamic = "force-dynamic";

function normalizeSearchParams(
  searchParams: SearchParamsInput | undefined,
): Promise<Record<string, SearchParamsValue>> {
  return Promise.resolve(searchParams ?? {});
}

function readSearchParam(value: SearchParamsValue): string | null {
  const rawValue = Array.isArray(value) ? value[0] : value;
  return normalizeStartupFilterValue(rawValue ?? null);
}

function parseSearchFilters(
  startups: WordPressStartup[],
  searchParams: Record<string, SearchParamsValue>,
) {
  const industryOptions = collectStartupFilterOptions(startups, (startup) => startup.industry);
  const cohortOptions = collectStartupFilterOptions(startups, (startup) => startup.cohort);

  const activeIndustrySlug = readSearchParam(searchParams.industry);
  const activeCohortSlug = readSearchParam(searchParams.cohort);

  const validIndustrySlug =
    activeIndustrySlug && industryOptions.some((option) => option.slug === activeIndustrySlug)
      ? activeIndustrySlug
      : null;
  const validCohortSlug =
    activeCohortSlug && cohortOptions.some((option) => option.slug === activeCohortSlug)
      ? activeCohortSlug
      : null;

  return {
    cohortOptions,
    industryOptions,
    activeIndustrySlug: validIndustrySlug,
    activeCohortSlug: validCohortSlug,
  };
}

function buildFeaturedStartupSelection(startups: WordPressStartup[]): {
  featuredStartups: WordPressStartup[];
  directoryStartups: WordPressStartup[];
} {
  const featuredStartups = selectFeaturedStartups(startups);
  const featuredIds = new Set(featuredStartups.map((startup) => startup.id));
  const directoryStartups = startups.filter((startup) => !featuredIds.has(startup.id));

  return {
    featuredStartups,
    directoryStartups,
  };
}

function buildMetadata(): Metadata {
  const title = "IGNITE Startup Graduates";
  const description =
    "Explore IGNITE startup graduates through featured success stories and a compact alumni directory.";

  return {
    title,
    description,
    alternates: {
      canonical: igniteGraduatesHref,
    },
    openGraph: {
      title,
      description,
      url: igniteGraduatesHref,
      siteName: "ADNU MAGIS TBI",
      type: "website",
      images: [
        {
          url: "/home-of-magis.jpg",
          width: 1600,
          height: 900,
          alt: "ADNU MAGIS TBI startup graduates",
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

export function generateMetadata(): Metadata {
  return buildMetadata();
}

function HeroBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="relative min-h-[16rem] overflow-hidden rounded-[2.25rem] border border-outline-variant/70 bg-[linear-gradient(180deg,#eff4ff_0%,#ffffff_100%)] shadow-sm sm:min-h-[19rem]"
    >
      <div className="absolute inset-y-0 right-0 w-[74%] origin-top-right skew-x-[-12deg] bg-[linear-gradient(180deg,#dce9ff_0%,rgba(255,255,255,0.7)_100%)]" />
      <div className="absolute left-8 top-8 h-20 w-20 rounded-full bg-white/70 blur-2xl" />
      <div className="absolute bottom-8 right-10 h-28 w-28 rounded-[2rem] border border-white/65 bg-white/60 shadow-[0_18px_32px_rgba(0,26,72,0.06)]" />
      <div className="absolute inset-x-6 bottom-6 h-px bg-gradient-to-r from-transparent via-outline-variant/70 to-transparent" />
    </div>
  );
}

function SpotlightPlaceholderCard() {
  return (
    <div className="flex h-full flex-col justify-between overflow-hidden rounded-[1.75rem] border border-white/12 bg-[linear-gradient(180deg,#001a48_0%,#001233_100%)] p-6 text-on-primary shadow-[0_24px_44px_rgba(0,26,72,0.12)] sm:p-8">
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-secondary-fixed">
          Spotlight reserved
        </p>
        <h3 className="max-w-md font-heading text-[clamp(1.6rem,3.6vw,2.4rem)] leading-[1.05] tracking-[-0.04em] text-on-primary">
          More graduate stories will appear here as profiles are completed.
        </h3>
        <p className="max-w-xl text-sm leading-6 text-surface-variant sm:text-base sm:leading-7">
          The layout stays balanced while the archive continues to grow.
        </p>
      </div>
    </div>
  );
}

function LoadMoreGraduates({ startups }: { startups: WordPressStartup[] }) {
  const remainingStartups = startups.slice(DIRECTORY_PREVIEW_COUNT);

  if (remainingStartups.length === 0) {
    return null;
  }

  return (
    <details className="mt-6">
      <summary className="mx-auto block w-fit cursor-pointer list-none rounded-full border border-outline-variant bg-surface-container-lowest px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:border-primary hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface [&::-webkit-details-marker]:hidden">
        Load more graduates
      </summary>

      <div className="mt-6">
        <StaggerGroup as="div" className="grid gap-6 md:grid-cols-2 xl:grid-cols-3" tone="calm">
          {remainingStartups.map((startup) => (
            <StaggerItem key={startup.id} as="div" tone="calm">
              <StartupShowcaseCard startup={startup} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </details>
  );
}

export default async function IgniteGraduatesPage({ searchParams }: IgniteGraduatesPageProps) {
  const [resolvedSearchParams, startups] = await Promise.all([
    normalizeSearchParams(searchParams),
    getStartupGraduates(),
  ]);

  const { activeIndustrySlug, activeCohortSlug, cohortOptions, industryOptions } = parseSearchFilters(
    startups,
    resolvedSearchParams,
  );
  const { featuredStartups, directoryStartups } = buildFeaturedStartupSelection(startups);
  const visibleDirectoryStartups = filterStartupsByQuery(
    directoryStartups,
    activeIndustrySlug,
    activeCohortSlug,
  );
  const previewStartups = visibleDirectoryStartups.slice(0, DIRECTORY_PREVIEW_COUNT);
  const clearHref = `${igniteGraduatesHref}#graduates-directory`;

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
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">
                IGNITE Startup Graduates
              </p>
              <h1 className="max-w-3xl font-heading text-[clamp(2.4rem,6.4vw,4.9rem)] leading-[0.96] tracking-[-0.05em] text-primary">
                Our Startup Graduates
              </h1>
              <p className="max-w-2xl text-[1rem] leading-7 text-on-surface-variant sm:text-[1.075rem] sm:leading-8">
                Discover the ventures that moved from research to market traction through the
                MAGIS program.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex flex-wrap items-center gap-3 rounded-full border border-outline-variant bg-surface-container-lowest px-4 py-2.5 shadow-sm">
                <span className="rounded-full bg-secondary-container px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-on-secondary-container">
                  Impact
                </span>
                <span className="text-sm font-semibold text-primary">{startups.length} startups</span>
                <span aria-hidden="true" className="text-outline-variant">
                  •
                </span>
                <span className="text-sm text-on-surface-variant">
                  {magisCohorts.length} cohorts
                </span>
              </div>

              <Link
                className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-on-primary shadow-sm transition-colors hover:bg-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                href="#featured-stories"
              >
                Browse stories
              </Link>
              <Link
                className="inline-flex items-center justify-center rounded-lg border border-outline-variant bg-surface-container-lowest px-5 py-3 text-sm font-semibold text-primary transition-colors hover:border-primary hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                href={facebookPageUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                Apply now
              </Link>
            </div>
          </div>

          <div className="relative">
            <HeroBackdrop />
            <Image
              alt="IGNITE logo"
              className="pointer-events-none absolute right-4 top-1/2 hidden w-[min(18rem,34vw)] -translate-y-1/2 translate-x-3 drop-shadow-[0_18px_32px_rgba(0,26,72,0.18)] lg:block"
              height={312}
              priority
              src="/ignite-logo.png"
              width={1071}
            />
          </div>
        </Reveal>

        <section id="featured-stories" className="space-y-5">
          <Reveal as="div" className="flex items-center gap-2" direction="up">
            <span className="text-lg leading-none text-secondary">★</span>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">
              Featured success stories
            </p>
          </Reveal>

          {featuredStartups.length > 0 ? (
            <StaggerGroup as="div" className="grid gap-6 lg:grid-cols-[minmax(0,1.18fr)_minmax(0,0.82fr)]" tone="default">
              {featuredStartups[0] ? (
                <StaggerItem as="div">
                  <StartupShowcaseCard
                    profileHref={`#${featuredStartups[0].slug}`}
                    storyHref="#graduates-directory"
                    storyLabel="Read case study"
                    startup={featuredStartups[0]}
                    variant="featured"
                  />
                </StaggerItem>
              ) : null}

              <StaggerItem as="div">
                {featuredStartups[1] ? (
                  <StartupShowcaseCard
                    profileHref={`#${featuredStartups[1].slug}`}
                    storyHref="#graduates-directory"
                    startup={featuredStartups[1]}
                    variant="accent"
                  />
                ) : (
                  <SpotlightPlaceholderCard />
                )}
              </StaggerItem>
            </StaggerGroup>
          ) : (
            <Reveal
              as="div"
              className="rounded-[1.5rem] border border-dashed border-outline-variant/70 bg-surface-container-lowest p-8 text-center shadow-sm"
              direction="up"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary">
                No featured stories yet
              </p>
              <p className="mt-3 text-base leading-7 text-on-surface-variant">
                Startup entries will appear here once the alumni archive is populated.
              </p>
            </Reveal>
          )}
        </section>

        <section id="graduates-directory" className="scroll-mt-28 space-y-5 sm:scroll-mt-32 lg:scroll-mt-36">
          <Reveal as="div" className="flex items-center gap-2" direction="up">
            <span className="text-lg leading-none text-secondary">★</span>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">
              All alumni
            </p>
          </Reveal>

          <StartupFilters
            activeCohortSlug={activeCohortSlug}
            activeIndustrySlug={activeIndustrySlug}
            baseHref={igniteGraduatesHref}
            cohorts={cohortOptions}
            industries={industryOptions}
          />

          {visibleDirectoryStartups.length > 0 ? (
            <div className="space-y-6">
              <StaggerGroup as="div" className="grid gap-6 md:grid-cols-2 xl:grid-cols-3" tone="calm">
                {previewStartups.map((startup) => (
                  <StaggerItem key={startup.id} as="div" tone="calm">
                    <StartupShowcaseCard startup={startup} />
                  </StaggerItem>
                ))}
              </StaggerGroup>

              <LoadMoreGraduates startups={visibleDirectoryStartups} />
            </div>
          ) : (
            <Reveal
              as="div"
              className="rounded-[1.5rem] border border-dashed border-outline-variant/70 bg-surface-container-lowest p-8 text-center shadow-sm"
              direction="up"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary">
                No graduates match this filter
              </p>
              <p className="mt-3 text-base leading-7 text-on-surface-variant">
                Try a different industry or cohort, or clear the filters to see the full directory.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-on-primary shadow-sm transition-colors hover:bg-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                  href={clearHref}
                >
                  Clear filters
                </Link>
                <Link
                  className="inline-flex items-center justify-center rounded-lg border border-outline-variant bg-surface-container-lowest px-5 py-3 text-sm font-semibold text-primary transition-colors hover:border-primary hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                  href="#featured-stories"
                >
                  View featured stories
                </Link>
              </div>
            </Reveal>
          )}
        </section>

        <section className="relative left-1/2 w-screen -translate-x-1/2 border-y border-outline-variant/70 bg-surface-container-high">
          <Reveal
            as="div"
            className="mx-auto flex w-full max-w-7xl justify-center px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
            direction="up"
          >
            <div className="max-w-4xl space-y-10 text-center">
              <div className="space-y-4">
                <h2 className="font-heading text-[clamp(2rem,4vw,3rem)] leading-[1.05] tracking-[-0.04em] text-primary">
                  Ready to Join the Next Cohort?
                </h2>
                <p className="mx-auto max-w-4xl text-[1.02rem] leading-8 text-on-surface-variant sm:text-[1.125rem]">
                  Transform your research or innovative idea into a viable commercial enterprise.
                  Applications are now open for the upcoming incubation cycle.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  className="inline-flex min-w-[11.5rem] items-center justify-center rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-on-primary shadow-sm transition-colors hover:bg-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-container-high"
                  href={facebookPageUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Apply now
                </Link>
                <Link
                  className="inline-flex min-w-[14rem] items-center justify-center rounded-lg border border-primary px-6 py-3.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-container-high"
                  href="/#programs"
                >
                  Program details
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </main>
  );
}
