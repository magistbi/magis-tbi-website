import Link from "next/link";

import { MotionSurface } from "@/components/motion/motion-surface";
import {
  formatEventDateStamp,
  getEventCategoryLabel,
  getEventHref,
  getEventPrimaryDateLabel,
  isClosedEvent,
  isUpcomingEvent,
} from "@/lib/events";
import { cn } from "@/lib/utils";
import type { WordPressEvent } from "@/types/wordpress";

type EventCardVariant = "featured" | "compact";

type EventCardProps = {
  event: WordPressEvent;
  href?: string;
  featured?: boolean;
  variant?: EventCardVariant;
  className?: string;
};

function EventBadge({
  children,
  tone = "neutral",
}: {
  children: string;
  tone?: "neutral" | "accent" | "inverse";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] shadow-sm backdrop-blur",
        tone === "accent" && "bg-secondary text-white",
        tone === "inverse" && "bg-white/15 text-white",
        tone === "neutral" && "bg-white/92 text-primary",
      )}
    >
      {children}
    </span>
  );
}

function EventDateRail({
  event,
  variant,
}: {
  event: WordPressEvent;
  variant: EventCardVariant;
}) {
  const stamp = formatEventDateStamp(event.startDate);

  return (
    <div
      className={cn(
        "absolute inset-y-0 left-0 z-10 flex flex-col justify-between border-r border-white/15 bg-primary/92 text-white shadow-[inset_-1px_0_0_rgba(255,255,255,0.08)] backdrop-blur-sm",
        variant === "featured" ? "w-[6.5rem] px-4 py-5 sm:w-[7.25rem]" : "w-[5.75rem] px-3 py-4",
      )}
    >
      <div className="space-y-1">
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-secondary-fixed">
          When
        </p>
        <p className={cn("font-heading leading-none text-white", variant === "featured" ? "text-4xl" : "text-3xl")}>
          {stamp?.day ?? "—"}
        </p>
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/72">
          {stamp?.month ?? "TBA"}
        </p>
      </div>

      <div className="space-y-2">
        <div className="rounded-2xl border border-white/10 bg-white/10 px-3 py-2">
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white/64">
            Time
          </p>
          <p className="mt-1 text-xs font-semibold text-white">
            {stamp?.time ?? "All day"}
          </p>
        </div>
        <p className="text-[0.62rem] leading-4 text-white/72">
          {isClosedEvent(event) ? "Closed record" : isUpcomingEvent(event) ? "Next in line" : "Archive entry"}
        </p>
      </div>
    </div>
  );
}

function EventVisual({
  event,
  variant,
}: {
  event: WordPressEvent;
  variant: EventCardVariant;
}) {
  const categoryLabel = getEventCategoryLabel(event.category);
  const stamp = formatEventDateStamp(event.startDate);

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[linear-gradient(160deg,#dae2ff_0%,#eff4ff_35%,#ffffff_100%)]",
        variant === "featured" ? "min-h-[20rem] lg:min-h-full" : "aspect-[16/10]",
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,199,44,0.26),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(0,26,72,0.12),transparent_40%)]" />

      {event.poster ? (
        <img
          alt={event.poster.alt || event.title}
          className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
          decoding="async"
          loading="lazy"
          src={event.poster.url}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(145deg,#dbe4ff_0%,#eff4ff_45%,#ffffff_100%)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,199,44,0.28),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(0,26,72,0.12),transparent_40%)]" />
          <div className="relative flex flex-col items-center gap-4 px-8 text-center">
            <EventBadge tone="neutral">{categoryLabel}</EventBadge>
            <div className="font-heading text-5xl leading-none text-primary/20 sm:text-6xl">
              {event.title.slice(0, 1).toUpperCase() || "E"}
            </div>
            <p className="max-w-xs text-sm leading-6 text-primary/70">
              {stamp?.label ?? "Date to be announced"}
            </p>
          </div>
        </div>
      )}

      <div className="absolute inset-0 bg-linear-to-t from-primary/58 via-primary/12 to-transparent" />

      <div className="absolute right-4 top-4 flex flex-wrap justify-end gap-2">
        <EventBadge tone="neutral">{categoryLabel}</EventBadge>
        <EventBadge tone="accent">{isClosedEvent(event) ? "Closed" : isUpcomingEvent(event) ? "Upcoming" : "Past"}</EventBadge>
        {event.status ? <EventBadge tone="inverse">{event.status}</EventBadge> : null}
      </div>

      <EventDateRail event={event} variant={variant} />
    </div>
  );
}

function EventMetaCard({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note?: string;
}) {
  return (
    <div className="rounded-2xl border border-outline-variant/60 bg-surface-container-low px-4 py-3">
      <div className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-secondary">
        {label}
      </div>
      <p className="mt-1 text-sm font-semibold leading-6 text-primary">{value}</p>
      {note ? <p className="mt-1 text-xs leading-5 text-on-surface-variant">{note}</p> : null}
    </div>
  );
}

export function EventCard({
  event,
  href = getEventHref(event),
  featured = false,
  variant,
  className,
}: EventCardProps) {
  const cardVariant: EventCardVariant = variant ?? (featured ? "featured" : "compact");
  const categoryLabel = getEventCategoryLabel(event.category);
  const registrationLabel = event.registrationLabel ?? "Register";
  const primaryDateLabel = getEventPrimaryDateLabel(event);

  return (
    <MotionSurface
      as="article"
      className={cn(
        "group h-full overflow-hidden rounded-[1.75rem] border border-outline-variant/70 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
        cardVariant === "featured" && "lg:min-h-[30rem]",
        className,
      )}
      tone="card"
    >
      <div
        className={cn(
          "grid h-full",
          cardVariant === "featured" ? "lg:grid-cols-[0.95fr_1.05fr]" : "grid-cols-1",
        )}
      >
        <EventVisual event={event} variant={cardVariant} />

        <div
          className={cn(
            "flex flex-1 flex-col gap-4 p-5 sm:p-6",
            cardVariant === "featured" && "justify-center lg:p-8",
          )}
        >
          <div className="flex flex-wrap items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-secondary">
            <span>{categoryLabel}</span>
            <span aria-hidden="true" className="text-outline-variant">
              ·
            </span>
            <span>{isClosedEvent(event) ? "Closed" : isUpcomingEvent(event) ? "Upcoming" : "Past"}</span>
            {event.status ? (
              <>
                <span aria-hidden="true" className="text-outline-variant">
                  ·
                </span>
                <span>{event.status}</span>
              </>
            ) : null}
          </div>

          <div className="space-y-3">
            <h2
              className={cn(
                "font-heading tracking-[-0.04em] text-primary transition-colors group-hover:text-primary/80",
                cardVariant === "featured"
                  ? "max-w-2xl text-[clamp(1.95rem,4vw,3.5rem)] leading-[1.04]"
                  : "text-[1.35rem] leading-tight sm:text-[1.55rem]",
              )}
            >
              {event.title}
            </h2>
            <p
              className={cn(
                "text-on-surface-variant",
                cardVariant === "featured"
                  ? "max-w-2xl text-base leading-7 sm:text-lg"
                  : "line-clamp-2 text-sm leading-6",
              )}
            >
              {event.excerpt}
            </p>
          </div>

          <div className={cn("grid gap-3", cardVariant === "featured" ? "sm:grid-cols-3" : "sm:grid-cols-2")}>
            <EventMetaCard
              label="When"
              value={primaryDateLabel}
              note={cardVariant === "featured" ? "Chronology is anchored to the event start date." : undefined}
            />
            <EventMetaCard
              label="Where"
              value={event.venueName || event.address || "To be announced"}
              note={event.address && event.venueName ? event.address : undefined}
            />
            <EventMetaCard
              label="Registration"
              value={event.registrationUrl ? registrationLabel : "Unavailable"}
              note={event.eventMode || "Mode to be confirmed"}
            />
          </div>

          <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
            <Link
              className={cn(
                "inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-bold text-on-primary shadow-sm transition-all hover:bg-tertiary hover:scale-[0.99]",
                cardVariant === "featured" && "min-w-36",
              )}
              href={href}
            >
              View details
            </Link>
            {event.registrationUrl ? (
              <a
                className="inline-flex items-center justify-center rounded-lg border border-outline-variant bg-white px-5 py-3 text-sm font-bold text-primary transition-all hover:border-primary hover:text-secondary"
                href={event.registrationUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                {registrationLabel}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </MotionSurface>
  );
}
