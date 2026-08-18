import { buildStartupFilterHref, type StartupFilterOption } from "@/lib/startups";
import { cn } from "@/lib/utils";

type StartupFiltersProps = {
  baseHref: string;
  activeIndustrySlug: string | null;
  activeCohortSlug: string | null;
  industries: StartupFilterOption[];
  cohorts: StartupFilterOption[];
};

function FilterChip({
  active,
  children,
  href,
}: {
  active: boolean;
  children: string;
  href: string;
}) {
  return (
    <a
      aria-current={active ? "page" : undefined}
      className={cn(
        "inline-flex shrink-0 items-center rounded-full border px-4 py-2.5 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
        active
          ? "border-primary bg-primary text-white shadow-sm shadow-primary/15"
          : "border-outline-variant/90 bg-surface-container-lowest/95 text-on-surface-variant hover:border-primary hover:bg-surface-container-low hover:text-primary hover:shadow-sm",
      )}
      href={href}
    >
      <span className="whitespace-nowrap">{children}</span>
    </a>
  );
}

export function StartupFilters({
  baseHref,
  activeIndustrySlug,
  activeCohortSlug,
  industries,
  cohorts,
}: StartupFiltersProps) {
  const industryAllHref = buildStartupFilterHref(
    baseHref,
    null,
    activeCohortSlug,
    null,
    activeCohortSlug,
    "graduates-directory",
  );
  const cohortAllHref = buildStartupFilterHref(
    baseHref,
    activeIndustrySlug,
    null,
    activeIndustrySlug,
    null,
    "graduates-directory",
  );

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-secondary">
            Industry
          </p>
          <nav
            aria-label="Industry filters"
            className="flex max-w-full gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            <div className="flex min-w-max gap-2 sm:min-w-0 sm:flex-wrap">
              <FilterChip active={activeIndustrySlug === null} href={industryAllHref}>
                All industries
              </FilterChip>

              {industries.map((option) => {
                const href = buildStartupFilterHref(
                  baseHref,
                  option.slug,
                  activeCohortSlug,
                  option.slug,
                  activeCohortSlug,
                  "graduates-directory",
                );

                return (
                  <FilterChip key={option.slug} active={activeIndustrySlug === option.slug} href={href}>
                    {option.label}
                  </FilterChip>
                );
              })}
            </div>
          </nav>
        </div>

        <div className="space-y-2">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-secondary">
            Cohort
          </p>
          <nav
            aria-label="Cohort filters"
            className="flex max-w-full gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            <div className="flex min-w-max gap-2 sm:min-w-0 sm:flex-wrap">
              <FilterChip active={activeCohortSlug === null} href={cohortAllHref}>
                All cohorts
              </FilterChip>

              {cohorts.map((option) => {
                const href = buildStartupFilterHref(
                  baseHref,
                  activeIndustrySlug,
                  option.slug,
                  activeIndustrySlug,
                  option.slug,
                  "graduates-directory",
                );

                return (
                  <FilterChip key={option.slug} active={activeCohortSlug === option.slug} href={href}>
                    {option.label}
                  </FilterChip>
                );
              })}
            </div>
          </nav>
        </div>
      </div>

      {activeIndustrySlug !== null || activeCohortSlug !== null ? (
        <div className="flex justify-end">
          <a
            className="text-xs font-semibold uppercase tracking-[0.22em] text-primary transition-colors hover:text-secondary focus-visible:outline-none focus-visible:underline"
            href={`${baseHref}#graduates-directory`}
          >
            Clear filters
          </a>
        </div>
      ) : null}
    </div>
  );
}
