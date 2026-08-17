import type { Metadata } from "next";
import Link from "next/link";
import { cache } from "react";
import { notFound } from "next/navigation";

import { MotionSurface } from "@/components/motion/motion-surface";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";
import { StructuredData } from "@/components/structured-data";
import {
  formatEventCapacity,
  formatEventDateRange,
  formatEventDateTime,
  formatEventDateTimeAttribute,
  getEventCategoryLabel,
  getEventHref,
  getEventsPageHref,
} from "@/lib/events";
import { getSiteUrl } from "@/lib/site";
import { cn } from "@/lib/utils";
import { getEventBySlug } from "@/lib/wordpress";

type EventPageParams = {
  slug: string;
};

type EventPageProps = {
  params: Promise<EventPageParams>;
};

const loadEvent = cache(async (slug: string) =>
  getEventBySlug(slug, ["wordpress", "wordpress:events", "wordpress:event"]),
);

function resolveParams(params: EventPageProps["params"]): Promise<EventPageParams> {
  return Promise.resolve(params);
}

function buildEventDescription(event: Awaited<ReturnType<typeof loadEvent>>): string {
  if (!event) {
    return "The requested event could not be found.";
  }

  const summary = event.excerpt || "Read the full event details from the archive.";
  return summary;
}

function mapAttendanceMode(eventMode: string | null): string | undefined {
  if (!eventMode) {
    return undefined;
  }

  const normalized = eventMode.trim().toLowerCase();

  if (normalized.includes("face") || normalized.includes("in-person") || normalized.includes("in person")) {
    return "https://schema.org/OfflineEventAttendanceMode";
  }

  if (normalized.includes("online")) {
    return "https://schema.org/OnlineEventAttendanceMode";
  }

  if (normalized.includes("hybrid")) {
    return "https://schema.org/MixedEventAttendanceMode";
  }

  return undefined;
}

function buildEventJsonLd(event: NonNullable<Awaited<ReturnType<typeof loadEvent>>>) {
  const image = event.poster?.url ?? getSiteUrl("/home-of-magis.jpg");
  const location =
    event.venueName || event.address
      ? {
          "@type": "Place",
          name: event.venueName ?? event.address ?? "ADNU MAGIS TBI",
          address: event.address
            ? {
                "@type": "PostalAddress",
                streetAddress: event.address,
                addressLocality: "Naga City",
                addressRegion: "Camarines Sur",
                addressCountry: "PH",
              }
            : undefined,
        }
      : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: buildEventDescription(event),
    startDate: formatEventDateTimeAttribute(event.startDate) ?? event.startDate,
    endDate: formatEventDateTimeAttribute(event.endDate) ?? event.endDate,
    url: getSiteUrl(getEventHref(event)),
    image: [image],
    location,
    eventAttendanceMode: mapAttendanceMode(event.eventMode),
    organizer: {
      "@type": "Organization",
      name: "ADNU MAGIS TBI",
      url: getSiteUrl("/"),
    },
  };
}

function EventHeroMedia({
  title,
  category,
  imageUrl,
  imageAlt,
}: {
  title: string;
  category: string;
  imageUrl: string | null;
  imageAlt: string;
}) {
  if (imageUrl) {
    return (
      <div className="relative min-h-80 overflow-hidden bg-[linear-gradient(160deg,#dae2ff_0%,#eff4ff_35%,#ffffff_100%)] lg:min-h-full">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,199,44,0.3),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(0,26,72,0.12),transparent_40%)]" />
        <img
          alt={imageAlt}
          className="absolute inset-0 h-full w-full object-cover object-center"
          decoding="async"
          loading="eager"
          src={imageUrl}
        />
        <div className="absolute inset-0 bg-linear-to-t from-primary/45 via-primary/8 to-transparent" />
        <div className="absolute left-5 top-5 flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full bg-white/92 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-primary shadow-sm backdrop-blur">
            {category}
          </span>
          <span className="inline-flex items-center rounded-full bg-secondary/90 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white shadow-sm backdrop-blur">
            Event
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-80 overflow-hidden bg-[linear-gradient(160deg,#dae2ff_0%,#eff4ff_35%,#ffffff_100%)] lg:min-h-full">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,199,44,0.38),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(0,26,72,0.16),transparent_40%)]" />
      <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6">
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex w-fit items-center rounded-full bg-white/90 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-primary shadow-sm backdrop-blur">
            {category}
          </span>
          <span className="inline-flex w-fit items-center rounded-full bg-secondary/90 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white shadow-sm backdrop-blur">
            Event
          </span>
        </div>
        <div className="max-w-sm space-y-2">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/60">
            Event poster
          </div>
          <div className="text-3xl font-semibold leading-none text-primary/20 sm:text-5xl">
            {title.slice(0, 1).toUpperCase() || "E"}
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailItem({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={cn("rounded-2xl border border-outline-variant/60 bg-surface-container-low px-4 py-4", className)}>
      <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-secondary">{label}</dt>
      <dd className="mt-2 text-sm font-semibold leading-6 text-primary">{value}</dd>
    </div>
  );
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await resolveParams(params);

  if (!slug) {
    return {
      title: "Event not found",
      description: "The requested event could not be found in the archive.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const event = await loadEvent(slug);

  if (!event) {
    return {
      title: "Event not found",
      description: "The requested event could not be found in the archive.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonicalPath = getEventHref(event);
  const heroImage = event.poster?.url ?? "/home-of-magis.jpg";
  const description = buildEventDescription(event);

  return {
    title: event.title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: event.title,
      description,
      url: canonicalPath,
      siteName: "ADNU MAGIS TBI",
      type: "website",
      images: [
        {
          url: heroImage,
          width: event.poster?.width ?? 1600,
          height: event.poster?.height ?? 900,
          alt: event.poster?.alt || event.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: event.title,
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

export default async function EventDetailPage({ params }: EventPageProps) {
  const { slug } = await resolveParams(params);

  if (!slug) {
    notFound();
  }

  const event = await loadEvent(slug);

  if (!event) {
    notFound();
  }

  const categoryLabel = getEventCategoryLabel(event.category);
  const scheduleLabel = formatEventDateRange(event.startDate, event.endDate) || formatEventDateTime(event.startDate);
  const startDateTime = formatEventDateTime(event.startDate) || "Date to be announced";
  const endDateTime = formatEventDateTime(event.endDate) || "Date to be announced";
  const hasContent = event.content.trim().length > 0;
  const heroImage = event.poster?.url ?? null;
  const heroImageAlt = event.poster?.alt || event.title;
  const eventDescription = buildEventDescription(event);
  const eventJsonLd = buildEventJsonLd(event);

  return (
    <main className="relative overflow-hidden">
      <StructuredData id={`event-jsonld-${event.id}`} data={eventJsonLd} />
      <div className="absolute inset-x-0 top-0 -z-10 h-128 bg-[radial-gradient(circle_at_top_left,rgba(255,199,44,0.16),transparent_35%),radial-gradient(circle_at_top_right,rgba(0,26,72,0.12),transparent_34%),linear-gradient(180deg,rgba(229,238,255,0.92),rgba(248,249,255,0))]" />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <Reveal as="div" direction="up" tone="calm" trigger="mount">
          <MotionSurface as="div" tone="subtle">
            <Link
              className="inline-flex w-fit items-center gap-2 rounded-full border border-outline-variant/70 bg-white px-4 py-2 text-sm font-semibold text-primary shadow-sm transition-colors hover:border-primary hover:text-secondary"
              href={getEventsPageHref(null)}
            >
              <span aria-hidden="true">←</span>
              Back to events catalog
            </Link>
          </MotionSurface>
        </Reveal>

        <article className="overflow-hidden rounded-[2rem] border border-outline-variant/70 bg-white shadow-sm">
          <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
            <StaggerGroup
              as="div"
              className="flex flex-col gap-6 p-6 sm:p-8 lg:p-10"
              tone="calm"
              trigger="mount"
            >
              <StaggerItem as="div" direction="up" tone="calm">
                <div className="flex flex-wrap items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-secondary">
                  <span>{categoryLabel}</span>
                  <span aria-hidden="true" className="text-outline-variant">
                    ·
                  </span>
                  <time dateTime={formatEventDateTimeAttribute(event.startDate) ?? undefined}>{scheduleLabel}</time>
                </div>
              </StaggerItem>

              <StaggerItem as="div" direction="up" tone="calm">
                <div className="space-y-4">
                  <h1 className="max-w-3xl font-heading text-[clamp(2.2rem,5vw,4.25rem)] leading-[1.02] tracking-[-0.04em] text-primary">
                    {event.title}
                  </h1>
                  <p className="max-w-3xl text-lg leading-8 text-on-surface-variant sm:text-xl">
                    {eventDescription}
                  </p>
                </div>
              </StaggerItem>

              <StaggerItem as="div" direction="up" tone="calm">
                <div className="flex flex-wrap items-center gap-3 border-t border-outline-variant/60 pt-5">
                  <div className="rounded-full bg-surface-container-low px-4 py-2 text-sm font-semibold text-primary">
                    {event.status || "Scheduled"}
                  </div>
                  <div className="rounded-full bg-surface-container-low px-4 py-2 text-sm font-semibold text-primary">
                    {event.eventMode || "Event mode to be confirmed"}
                  </div>
                  <div className="rounded-full bg-surface-container-low px-4 py-2 text-sm font-semibold text-primary">
                    {event.registrationUrl ? "Registration available" : "Registration unavailable"}
                  </div>
                </div>
              </StaggerItem>
            </StaggerGroup>

            <Reveal as="div" className="lg:h-full" direction="right" tone="calm" trigger="mount">
              <EventHeroMedia
                category={categoryLabel}
                imageAlt={heroImageAlt}
                imageUrl={heroImage}
                title={event.title}
              />
            </Reveal>
          </div>

          <div className="grid gap-4 border-t border-outline-variant/60 px-6 py-8 sm:px-8 lg:grid-cols-3 lg:px-10">
            <DetailItem label="Start date" value={startDateTime} />
            <DetailItem label="End date" value={endDateTime} />
            <DetailItem label="Category" value={categoryLabel} />
            <DetailItem label="Event mode" value={event.eventMode || "Not specified"} />
            <DetailItem label="Venue" value={event.venueName || "Not specified"} />
            <DetailItem label="Status" value={event.status || "Not specified"} />
            <DetailItem label="Capacity" value={formatEventCapacity(event.capacity)} />
            <DetailItem label="Ticket price" value={event.ticketPrice || "Not specified"} />
            <DetailItem label="Address" value={event.address || "Not specified"} />
          </div>

          <div className="border-t border-outline-variant/60 px-6 py-8 sm:px-8 lg:px-10">
            <div className="flex flex-wrap gap-3">
              {event.registrationUrl ? (
                <a
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-bold text-on-primary shadow-sm transition-all hover:bg-tertiary hover:scale-95"
                  href={event.registrationUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {event.registrationLabel ?? "Register"}
                </a>
              ) : null}
              <Link
                className="inline-flex items-center justify-center rounded-lg border border-outline-variant bg-white px-5 py-3 text-sm font-bold text-primary transition-all hover:border-primary hover:text-secondary"
                href={getEventsPageHref(null)}
              >
                Back to catalog
              </Link>
            </div>
          </div>

          <div className="border-t border-outline-variant/60 px-6 py-8 sm:px-8 lg:px-10">
            <Reveal as="div" className={cn("max-w-4xl", !hasContent && "space-y-4")} direction="up" tone="calm">
              {hasContent ? (
                <div
                  className="article-content"
                  dangerouslySetInnerHTML={{ __html: event.content }}
                />
              ) : (
                <div className="rounded-[1.5rem] border border-dashed border-outline-variant/70 bg-surface-container-low px-5 py-6 text-on-surface-variant">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-secondary">
                    Event body unavailable
                  </p>
                  <p className="mt-3 text-base leading-7">
                    The WordPress entry for this event does not currently include full body
                    content. The summary and structured fields above remain available.
                  </p>
                </div>
              )}
            </Reveal>
          </div>
        </article>
      </div>
    </main>
  );
}
