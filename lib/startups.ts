import type { WordPressStartup } from "@/types/wordpress";

export type StartupFilterOption = {
  label: string;
  slug: string;
};

type StartupFilterAccessor = (startup: WordPressStartup) => string | null;

const FEATURED_STARTUP_NAMES = ["Votkita", "Parkmate"] as const;

export function normalizeStartupFilterValue(value: string | null | undefined): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return normalized.length > 0 ? normalized : null;
}

function normalizeStartupLabel(value: string | null | undefined): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.trim().replace(/\s+/g, " ");
  return normalized.length > 0 ? normalized : null;
}

function findStartupByName(startups: WordPressStartup[], name: string): WordPressStartup | null {
  const target = name.trim().toLowerCase();

  return startups.find((startup) => startup.startupName.trim().toLowerCase() === target) ?? null;
}

export function collectStartupFilterOptions(
  startups: WordPressStartup[],
  accessor: StartupFilterAccessor,
): StartupFilterOption[] {
  const optionsBySlug = new Map<string, string>();

  for (const startup of startups) {
    const label = normalizeStartupLabel(accessor(startup));

    if (!label) {
      continue;
    }

    const slug = normalizeStartupFilterValue(label);

    if (!slug || optionsBySlug.has(slug)) {
      continue;
    }

    optionsBySlug.set(slug, label);
  }

  return Array.from(optionsBySlug.entries())
    .map(([slug, label]) => ({ label, slug }))
    .sort((left, right) => left.label.localeCompare(right.label));
}

export function selectFeaturedStartups(startups: WordPressStartup[]): WordPressStartup[] {
  const featured: WordPressStartup[] = [];
  const featuredIds = new Set<number>();

  for (const name of FEATURED_STARTUP_NAMES) {
    const match = findStartupByName(startups, name);

    if (!match || featuredIds.has(match.id)) {
      continue;
    }

    featured.push(match);
    featuredIds.add(match.id);
  }

  for (const startup of startups) {
    if (featured.length >= 2) {
      break;
    }

    if (featuredIds.has(startup.id)) {
      continue;
    }

    featured.push(startup);
    featuredIds.add(startup.id);
  }

  return featured.slice(0, 2);
}

export function filterStartupsByQuery(
  startups: WordPressStartup[],
  activeIndustrySlug: string | null,
  activeCohortSlug: string | null,
): WordPressStartup[] {
  return startups.filter((startup) => {
    const startupIndustrySlug = normalizeStartupFilterValue(startup.industry);
    const startupCohortSlug = normalizeStartupFilterValue(startup.cohort);

    if (activeIndustrySlug && startupIndustrySlug !== activeIndustrySlug) {
      return false;
    }

    if (activeCohortSlug && startupCohortSlug !== activeCohortSlug) {
      return false;
    }

    return true;
  });
}

export function buildStartupFilterHref(
  baseHref: string,
  activeIndustrySlug: string | null,
  activeCohortSlug: string | null,
  nextIndustrySlug: string | null,
  nextCohortSlug: string | null,
  fragment?: string,
): string {
  const params = new URLSearchParams();

  const industrySlug = nextIndustrySlug ?? activeIndustrySlug;
  const cohortSlug = nextCohortSlug ?? activeCohortSlug;

  if (industrySlug) {
    params.set("industry", industrySlug);
  }

  if (cohortSlug) {
    params.set("cohort", cohortSlug);
  }

  const queryString = params.toString();
  const hash = fragment ? `#${fragment}` : "";

  return queryString.length > 0 ? `${baseHref}?${queryString}${hash}` : `${baseHref}${hash}`;
}
