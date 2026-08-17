import Link from "next/link";

import { MotionSurface } from "@/components/motion/motion-surface";
import { getEventHref, getEventPrimaryDateLabel } from "@/lib/events";
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

function EventVisual({
  event,
  variant,
}: {
  event: WordPressEvent;
  variant: EventCardVariant;
}) {
  const fallbackInitial = event.title.slice(0, 1).toUpperCase() || "E";

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[linear-gradient(160deg,#dce9ff_0%,#eff4ff_42%,#ffffff_100%)]",
        variant === "featured" ? "min-h-72 lg:min-h-full" : "aspect-16/10",
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,199,44,0.16),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(0,26,72,0.12),transparent_42%)]" />

      {event.poster ? (
        <img
          alt={event.poster.alt || event.title}
          className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
          decoding="async"
          loading={variant === "featured" ? "eager" : "lazy"}
          src={event.poster.url}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="relative flex max-w-xs flex-col items-center gap-3 text-center">
            <div className="font-heading text-5xl leading-none text-primary/20 sm:text-6xl">
              {fallbackInitial}
            </div>
            <p className="text-sm leading-6 text-primary/72">Poster pending</p>
          </div>
        </div>
      )}

      <div className="absolute inset-0 bg-linear-to-t from-primary/36 via-primary/8 to-transparent" />
    </div>
  );
}

function EventLine({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="space-y-1">
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-secondary">{label}</p>
      <p className="text-sm leading-6 text-on-surface-variant">{value}</p>
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
  const registrationLabel = event.registrationLabel ?? "Register";
  const primaryDateLabel = getEventPrimaryDateLabel(event);
  const venueLabel = event.venueName || event.address || "To be announced";
  const modeLabel = event.eventMode?.trim() || null;

  return (
    <MotionSurface
      as="article"
      className={cn(
        "group relative h-full overflow-hidden rounded-[1.5rem] border border-outline-variant/70 bg-surface-container-lowest shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_36px_rgba(11,28,48,0.08)]",
        cardVariant === "featured" && "lg:min-h-120",
        className,
      )}
      tone="card"
    >
      <Link
        aria-label={`View details for ${event.title}`}
        className="absolute inset-0 z-0 rounded-[1.5rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        href={href}
      >
        <span className="sr-only">View details for {event.title}</span>
      </Link>

      <div
        className={cn(
          "relative z-10 grid h-full pointer-events-none",
          cardVariant === "featured" ? "lg:grid-cols-[0.92fr_1.08fr]" : "grid-cols-1",
        )}
      >
        <EventVisual event={event} variant={cardVariant} />

        <div
          className={cn(
            "flex flex-1 flex-col gap-4 p-5 sm:p-6",
            cardVariant === "featured" && "justify-center lg:p-8",
          )}
        >
          <h2
            className={cn(
              "font-heading tracking-[-0.04em] text-primary transition-colors group-hover:text-primary/80",
              cardVariant === "featured"
                ? "max-w-2xl text-[clamp(1.95rem,4vw,3.35rem)] leading-[1.04]"
                : "text-[1.35rem] leading-tight line-clamp-2 sm:text-[1.55rem]",
            )}
          >
            {event.title}
          </h2>

          <div className="space-y-3">
            <EventLine label="Date" value={primaryDateLabel} />
            <EventLine label="Venue" value={venueLabel} />
            {modeLabel ? <EventLine label="Mode" value={modeLabel} /> : null}
          </div>

          <div className="pointer-events-auto mt-auto flex flex-wrap items-center gap-3 pt-1">
            {event.registrationUrl ? (
              <a
                className={cn(
                  "inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
                  cardVariant === "featured" && "min-w-36",
                )}
                href={event.registrationUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                {registrationLabel}
              </a>
            ) : null}
            <Link
              className="inline-flex items-center justify-center rounded-lg border border-outline-variant bg-surface-container-lowest px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:border-primary hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              href={href}
            >
              View details
            </Link>
          </div>
        </div>
      </div>
    </MotionSurface>
  );
}
