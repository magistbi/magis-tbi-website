import type { Metadata } from "next";
import Link from "next/link";
import { cache, type ReactNode } from "react";
import { notFound } from "next/navigation";

import { MotionSurface } from "@/components/motion/motion-surface";
import { Reveal } from "@/components/motion/reveal";
import { StructuredData } from "@/components/structured-data";
import {
  formatEventCapacity,
  formatEventDateTimeAttribute,
  getEventCategoryLabel,
  getEventHref,
  getEventPrimaryDateLabel,
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

function formatFallbackLabel(value: string | null | undefined, fallback: string): string {
  const trimmed = value?.trim();
  return trimmed || fallback;
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

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-outline-variant/40 py-4 last:border-b-0 last:pb-0">
      <div className="min-w-0">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-secondary">
          {label}
        </p>
      </div>
      <div className="max-w-[60%] text-right text-sm font-semibold leading-6 text-primary">{value}</div>
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
  const scheduleLabel = getEventPrimaryDateLabel(event);
  const hasContent = event.content.trim().length > 0;
  const heroImage = event.poster?.url ?? null;
  const heroImageAlt = event.poster?.alt || event.title;
  const eventDescription = buildEventDescription(event);
  const eventJsonLd = buildEventJsonLd(event);
  const statusLabel = formatFallbackLabel(event.status, "Scheduled");
  const modeLabel = formatFallbackLabel(event.eventMode, "Mode to be confirmed");
  const venueLabel = formatFallbackLabel(event.venueName || event.address, "Venue to be announced");
  const ticketPriceLabel = formatFallbackLabel(event.ticketPrice, "Free registration");
  const registrationLabel = formatFallbackLabel(event.registrationLabel, "Register now");
  const hasRegistration = Boolean(event.registrationUrl?.trim());
  const scheduleDateTime = formatEventDateTimeAttribute(event.startDate);

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

        <article className="overflow-hidden rounded-[2rem] border border-outline-variant/70 bg-surface-container-lowest shadow-sm">
          <section className="relative isolate overflow-hidden border-b border-outline-variant/60 bg-primary text-white">
            <div className="absolute inset-0">
              {heroImage ? (
                <img
                  alt={heroImageAlt}
                  className="absolute inset-0 h-full w-full object-cover object-center"
                  decoding="async"
                  loading="eager"
                  src={heroImage}
                />
              ) : (
                <div className="absolute inset-0 bg-[linear-gradient(160deg,#10264d_0%,#071632_60%,#040b1b_100%)]" />
              )}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,199,44,0.18),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(163,191,255,0.14),transparent_36%),linear-gradient(180deg,rgba(2,10,28,0.12),rgba(2,10,28,0.88))]" />
              <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-primary/45 to-transparent" />
            </div>

            <div className="relative px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
              <div className="max-w-4xl space-y-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur">
                    {categoryLabel}
                  </span>
                  <span className="inline-flex items-center rounded-full border border-secondary/30 bg-secondary/90 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-primary shadow-sm backdrop-blur">
                    {statusLabel}
                  </span>
                </div>

                <div className="space-y-4">
                  <h1 className="max-w-4xl font-heading text-[clamp(2.35rem,5.4vw,4.8rem)] leading-[0.98] tracking-[-0.05em] text-white">
                    {event.title}
                  </h1>
                  <p className="max-w-3xl text-[1.02rem] leading-8 text-white/82 sm:text-[1.08rem]">
                    {eventDescription}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm leading-6 text-white/80">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-secondary" aria-hidden="true" />
                    <time dateTime={scheduleDateTime ?? undefined}>{scheduleLabel}</time>
                  </div>
                  <span aria-hidden="true" className="text-white/30">
                    ·
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-white/55" aria-hidden="true" />
                    <span>{venueLabel}</span>
                  </div>
                  <span aria-hidden="true" className="text-white/30">
                    ·
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-white/55" aria-hidden="true" />
                    <span>{modeLabel}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {hasRegistration ? (
                    <a
                      className="inline-flex items-center justify-center rounded-full bg-secondary-container px-5 py-3 text-sm font-semibold text-secondary transition-transform hover:-translate-y-0.5 hover:bg-[#ffd659] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-container focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                      href={event.registrationUrl ?? undefined}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {registrationLabel}
                    </a>
                  ) : null}
                  <Link
                    className="inline-flex items-center justify-center rounded-full border border-white/18 bg-white/8 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white/35 hover:bg-white/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                    href={getEventsPageHref(null)}
                  >
                    Browse more events
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <div className="grid gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] lg:px-10 lg:py-10">
            <div className="space-y-10">
              <section className="space-y-4">
                <div className="space-y-2">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-secondary">
                    About
                  </p>
                  <h2 className="font-heading text-[clamp(1.6rem,2.8vw,2.3rem)] leading-[1.02] tracking-[-0.04em] text-primary">
                    Event details
                  </h2>
                </div>
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
              </section>
            </div>

            <aside className="lg:sticky lg:top-6 lg:self-start">
              <div className="border-l border-outline-variant/60 pl-5 lg:pl-6">
                <div className="space-y-2">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-secondary">
                    Event details
                  </p>
                  <h2 className="font-heading text-[clamp(1.4rem,2vw,1.8rem)] leading-[1.04] tracking-[-0.03em] text-primary">
                    At a glance
                  </h2>
                </div>

                <div className="mt-4 space-y-1">
                  <DetailRow
                    label="Date"
                    value={
                      <time dateTime={scheduleDateTime ?? undefined}>{scheduleLabel}</time>
                    }
                  />
                  <DetailRow label="Venue" value={venueLabel} />
                  <DetailRow label="Mode" value={modeLabel} />
                  <DetailRow label="Status" value={statusLabel} />
                  <DetailRow label="Category" value={categoryLabel} />
                  <DetailRow label="Capacity" value={formatEventCapacity(event.capacity)} />
                  <DetailRow label="Ticket price" value={ticketPriceLabel} />
                  <DetailRow
                    label="Registration"
                    value={
                      hasRegistration ? (
                        <a
                          className="inline-flex items-center gap-2 text-primary transition-colors hover:text-secondary"
                          href={event.registrationUrl ?? undefined}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          Open registration
                          <span aria-hidden="true">↗</span>
                        </a>
                      ) : (
                        <span className="text-on-surface-variant">Not available yet</span>
                      )
                    }
                  />
                </div>
              </div>
            </aside>
          </div>
        </article>
      </div>
    </main>
  );
}
