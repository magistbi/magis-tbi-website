import Link from "next/link";

import { MotionSurface } from "@/components/motion/motion-surface";
import { cn } from "@/lib/utils";
import type { WordPressStartup } from "@/types/wordpress";

type StartupShowcaseCardVariant = "featured" | "accent" | "compact";

type StartupShowcaseCardProps = {
  startup: WordPressStartup;
  variant?: StartupShowcaseCardVariant;
  className?: string;
  storyHref?: string;
  profileHref?: string;
  storyLabel?: string;
};

function StartupChip({
  children,
  dark = false,
}: {
  children: string;
  dark?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em]",
        dark ? "bg-white/10 text-secondary-fixed" : "bg-primary-fixed text-primary",
      )}
    >
      {children}
    </span>
  );
}

function StartupMark({
  startup,
  dark = false,
  compact = false,
}: {
  startup: WordPressStartup;
  dark?: boolean;
  compact?: boolean;
}) {
  const monogram = startup.startupName.trim().charAt(0).toUpperCase() || "S";

  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-2xl border",
        compact ? "size-14 sm:size-16" : "size-16 sm:size-[4.5rem]",
        dark
          ? "border-white/10 bg-[linear-gradient(180deg,#0d2e6e_0%,#001233_100%)] text-on-primary"
          : "border-outline-variant/60 bg-[linear-gradient(160deg,#dce9ff_0%,#eff4ff_42%,#ffffff_100%)] text-primary",
      )}
    >
      <div
        className={cn(
          "absolute inset-0",
          dark
            ? "bg-[radial-gradient(circle_at_top_right,rgba(255,223,153,0.2),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(177,197,255,0.16),transparent_38%)]"
            : "bg-[radial-gradient(circle_at_top_right,rgba(255,199,44,0.18),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(0,26,72,0.1),transparent_42%)]",
        )}
      />

      {startup.logo ? (
        <img
          alt={startup.logo.alt || startup.startupName}
          className="relative z-10 h-full w-full object-contain p-2.5"
          decoding="async"
          loading="lazy"
          src={startup.logo.url}
        />
      ) : (
        <span className="relative z-10 font-heading text-2xl font-bold leading-none">
          {monogram}
        </span>
      )}
    </div>
  );
}

function StartupVisual({ startup }: { startup: WordPressStartup }) {
  return (
    <div className="relative min-h-[15rem] overflow-hidden bg-[linear-gradient(160deg,#dce9ff_0%,#eff4ff_42%,#ffffff_100%)] lg:min-h-full">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,199,44,0.18),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(0,26,72,0.1),transparent_42%)]" />
      <div
        className="absolute -right-10 top-8 h-40 w-40 rotate-12 rounded-[2rem] bg-white/55 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -left-12 bottom-0 h-52 w-52 rounded-full bg-primary-fixed/35 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative flex h-full items-center justify-center p-6 sm:p-8">
        <StartupMark startup={startup} />
      </div>
    </div>
  );
}

export function StartupShowcaseCard({
  startup,
  variant = "compact",
  className,
  storyHref = "#graduates-directory",
  profileHref,
  storyLabel = "View profile",
}: StartupShowcaseCardProps) {
  const dark = variant === "accent";
  const compact = variant === "compact";
  const resolvedProfileHref = profileHref ?? `#${startup.slug}`;
  const industryLabel = startup.industry ?? "Industry pending";
  const cohortLabel = startup.cohort ?? "Cohort pending";
  const primaryChipLabel = startup.industry ?? startup.cohort ?? "Graduate";

  if (compact) {
    return (
      <MotionSurface
        as="article"
        className={cn(
          "group flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-outline-variant/70 bg-surface-container-lowest shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_32px_rgba(11,28,48,0.08)]",
          className,
        )}
        id={startup.slug}
        tone="card"
      >
        <div className="flex flex-1 flex-col gap-4 p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <StartupMark compact startup={startup} />
            <StartupChip>{primaryChipLabel}</StartupChip>
          </div>

          <div className="space-y-2">
            <h3 className="font-heading text-[1.12rem] font-semibold leading-tight text-primary transition-colors group-hover:text-primary/80 sm:text-[1.2rem]">
              {startup.startupName}
            </h3>
            <p className="line-clamp-3 text-sm leading-6 text-on-surface-variant">
              {startup.description}
            </p>
          </div>

          <div className="mt-auto pt-1">
            <Link
              aria-label={`View profile for ${startup.startupName}`}
              className="inline-flex items-center justify-center rounded-lg border border-outline-variant bg-surface-container-lowest px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:border-primary hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              href={resolvedProfileHref}
            >
              View profile
            </Link>
          </div>
        </div>
      </MotionSurface>
    );
  }

  if (dark) {
    return (
      <MotionSurface
        as="article"
        className={cn(
          "group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/12 bg-[linear-gradient(180deg,#001a48_0%,#001233_100%)] text-on-primary shadow-[0_24px_44px_rgba(0,26,72,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_52px_rgba(0,26,72,0.18)]",
          className,
        )}
        id={startup.slug}
        tone="card"
      >
        <div className="flex flex-1 flex-col justify-between gap-6 p-6 sm:p-8">
          <div className="space-y-5">
            <div className="flex items-start justify-between gap-4">
              <StartupMark dark startup={startup} />
              <StartupChip dark>{primaryChipLabel}</StartupChip>
            </div>

            <div className="space-y-3">
              <h3 className="font-heading text-[clamp(1.6rem,3.4vw,2.3rem)] leading-[1.03] tracking-[-0.04em] text-on-primary transition-colors group-hover:text-secondary-fixed">
                {startup.startupName}
              </h3>
              <p className="max-w-xl text-sm leading-6 text-surface-variant sm:text-base sm:leading-7">
                {startup.description}
              </p>
            </div>
          </div>

          <div>
            <Link
              aria-label={`View profile for ${startup.startupName}`}
              className="inline-flex items-center justify-center rounded-lg border border-white/16 bg-white/6 px-4 py-2.5 text-sm font-semibold text-on-primary transition-colors hover:border-white/24 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              href={resolvedProfileHref}
            >
              View profile
            </Link>
          </div>
        </div>
      </MotionSurface>
    );
  }

  return (
    <MotionSurface
      as="article"
      className={cn(
        "group h-full overflow-hidden rounded-[1.75rem] border border-outline-variant/70 bg-surface-container-lowest shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_44px_rgba(11,28,48,0.12)]",
        className,
      )}
      id={startup.slug}
      tone="card"
    >
      <div className="grid h-full lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <StartupVisual startup={startup} />

        <div className="flex min-w-0 flex-col justify-between gap-6 p-6 sm:p-8">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <StartupChip>{industryLabel}</StartupChip>
              <StartupChip>{cohortLabel}</StartupChip>
            </div>

            <h3 className="max-w-2xl font-heading text-[clamp(1.7rem,4vw,3rem)] leading-[1.04] tracking-[-0.04em] text-primary transition-colors group-hover:text-primary/80">
              {startup.startupName}
            </h3>

            <p className="max-w-2xl text-base leading-7 text-on-surface-variant">
              {startup.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              aria-label={`Read case study for ${startup.startupName}`}
              className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-on-primary shadow-sm transition-colors hover:bg-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              href={storyHref}
            >
              {storyLabel}
            </Link>
          </div>
        </div>
      </div>
    </MotionSurface>
  );
}
