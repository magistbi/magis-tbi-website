import type { Metadata } from "next";
import Link from "next/link";
import { cache } from "react";

import { EventCard } from "@/components/events/event-card";
import { EventCategoryFilters } from "@/components/events/event-category-filters";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";
import { StructuredData } from "@/components/structured-data";
import {
  filterEventsByCategory,
  formatEventDateTimeAttribute,
  getEventCategoryLabel,
  getEventHref,
  getEventsPageHref,
  getPastEventsPageHref,
  isPastEvent,
  isUpcomingEvent,
  normalizeEventCategory,
  sortEventsByStartDateAsc,
  sortEventsByStartDateDesc,
  type EventCategory,
} from "@/lib/events";
import { getSiteUrl } from "@/lib/site";
import { getEvents } from "@/lib/wordpress";

type SearchParamsValue = string | string[] | undefined;
type SearchParamsInput = Record<string, SearchParamsValue> | Promise<Record<string, SearchParamsValue>>;

type EventsPageProps = {
  searchParams?: Promise<Record<string, SearchParamsValue>>;
};

const EVENTS_PAGE_SIZE = 4;

const loadEvents = cache(async () => getEvents(["wordpress", "wordpress:events", "wordpress:catalog"]));

function normalizeSearchParams(
  searchParams: SearchParamsInput | undefined,
): Promise<Record<string, SearchParamsValue>> {
  return Promise.resolve(searchParams ?? {});
}

function parseCategoryParam(value: SearchParamsValue) {
  const rawValue = Array.isArray(value) ? value[0] : value;
  return normalizeEventCategory(rawValue ?? null);
}

function buildEventsDescription(category: EventCategory | null): string {
  const baseDescription =
    "Browse upcoming ADNU MAGIS TBI events, plus a preview of closed events.";

  if (!category) {
    return baseDescription;
  }

  return `Browse upcoming ADNU MAGIS TBI ${getEventCategoryLabel(category).toLowerCase()} events, plus a preview of closed events.`;
}

function buildEventsJsonLd(
  events: Awaited<ReturnType<typeof loadEvents>>,
  category: EventCategory | null,
) {
  const upcomingEvents = sortEventsByStartDateAsc(
    filterEventsByCategory(
      events.filter(isUpcomingEvent),
      category,
    ),
  );

  if (upcomingEvents.length === 0) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category ? `${getEventCategoryLabel(category)} Events` : "Events",
    url: getSiteUrl(getEventsPageHref(category)),
    mainEntity: {
      "@type": "ItemList",
      itemListOrder: "http://schema.org/ItemListOrderAscending",
      numberOfItems: upcomingEvents.length,
      itemListElement: upcomingEvents.map((event, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: getSiteUrl(getEventHref(event)),
        name: event.title,
        startDate: formatEventDateTimeAttribute(event.startDate) ?? event.startDate,
      })),
    },
  };
}

export async function generateMetadata({ searchParams }: EventsPageProps): Promise<Metadata> {
  const resolvedSearchParams = await normalizeSearchParams(searchParams);
  const activeCategory = parseCategoryParam(resolvedSearchParams.category);
  const title = activeCategory ? `${getEventCategoryLabel(activeCategory)} Events` : "Events";
  const description = buildEventsDescription(activeCategory);
  const canonicalPath = getEventsPageHref(activeCategory);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      description,
      url: canonicalPath,
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

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const resolvedSearchParams = await normalizeSearchParams(searchParams);
  const activeCategory = parseCategoryParam(resolvedSearchParams.category);
  const events = await loadEvents();
  const upcomingEvents = sortEventsByStartDateAsc(
    filterEventsByCategory(
      events.filter(isUpcomingEvent),
      activeCategory,
    ),
  );
  const closedEvents = sortEventsByStartDateDesc(filterEventsByCategory(events.filter(isPastEvent), activeCategory));
  const featuredUpcomingEvent = upcomingEvents[0] ?? null;
  const additionalUpcomingEvents = featuredUpcomingEvent ? upcomingEvents.slice(1) : upcomingEvents;
  const closedPreviewEvents = closedEvents.slice(0, EVENTS_PAGE_SIZE);
  const upcomingJsonLd = buildEventsJsonLd(events, activeCategory);

  return (
    <main className="relative overflow-hidden">
      {upcomingJsonLd ? <StructuredData id="events-jsonld" data={upcomingJsonLd} /> : null}
      <div className="absolute inset-x-0 top-0 -z-10 h-128 bg-[radial-gradient(circle_at_top_left,rgba(255,199,44,0.18),transparent_35%),radial-gradient(circle_at_top_right,rgba(0,26,72,0.14),transparent_34%),linear-gradient(180deg,rgba(229,238,255,0.92),rgba(248,249,255,0))]" />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <Reveal as="section" className="space-y-5" direction="up">

          <div className="lg:sticky lg:top-22 lg:z-30">
            <div className="rounded-[1.5rem] border border-outline-variant/70 bg-surface-container-lowest/92 p-4 shadow-sm backdrop-blur-sm sm:p-5">
              <div className="flex flex-col gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
                  Events Catalog
                </p>
                <EventCategoryFilters activeCategory={activeCategory} baseHref="/events" />
              </div>
            </div>
          </div>
        </Reveal>

        <section className="space-y-5" id="upcoming-events">
          <Reveal as="div" className="flex items-end justify-between gap-3" direction="up">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
                Upcoming
              </p>
              <h2 className="font-heading text-2xl tracking-[-0.03em] text-primary sm:text-3xl">
                Upcoming events
              </h2>
            </div>
          </Reveal>

          {featuredUpcomingEvent ? (
            <StaggerGroup as="div" className="grid gap-6 lg:grid-cols-2" tone="default">
              <StaggerItem as="div" className="lg:col-span-2">
                <EventCard featured event={featuredUpcomingEvent} />
              </StaggerItem>
              {additionalUpcomingEvents.map((event) => (
                <StaggerItem key={event.id} as="div">
                  <EventCard event={event} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          ) : (
            <Reveal
              as="div"
              className="rounded-[1.5rem] border border-dashed border-outline-variant/70 bg-surface-container-lowest p-8 text-center shadow-sm"
              direction="up"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary">
                No upcoming events
              </p>
              <p className="mt-3 text-base leading-7 text-on-surface-variant">
                No upcoming events match this filter.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-on-primary shadow-sm transition-colors hover:bg-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                  href={getEventsPageHref(null)}
                >
                  Clear filter
                </Link>
                <Link
                  className="inline-flex items-center justify-center rounded-lg border border-outline-variant bg-surface-container-lowest px-5 py-3 text-sm font-semibold text-primary transition-colors hover:border-primary hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                  href={getPastEventsPageHref(activeCategory)}
                >
                  View archive
                </Link>
              </div>
            </Reveal>
          )}
        </section>

        <section className="space-y-5" id="closed-events">
          <Reveal as="div" className="flex items-end justify-between gap-3" direction="up">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
                Past
              </p>
              <h2 className="font-heading text-2xl tracking-[-0.03em] text-primary sm:text-3xl">
                Past events
              </h2>
            </div>
            <Link
              className="inline-flex items-center gap-2 rounded-lg border border-outline-variant bg-surface-container-lowest px-4 py-2 text-sm font-semibold text-primary transition-colors hover:border-primary hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              href={getPastEventsPageHref(activeCategory)}
            >
              View archive
            </Link>
          </Reveal>

          {closedPreviewEvents.length > 0 ? (
            <StaggerGroup as="div" className="grid gap-6 lg:grid-cols-2" tone="calm">
              {closedPreviewEvents.map((event) => (
                <StaggerItem key={event.id} as="div">
                  <EventCard event={event} variant="compact" />
                </StaggerItem>
              ))}
            </StaggerGroup>
          ) : (
            <Reveal
              as="div"
              className="rounded-[1.5rem] border border-dashed border-outline-variant/70 bg-surface-container-lowest p-8 text-center shadow-sm"
              direction="up"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary">
                No past events
              </p>
              <p className="mt-3 text-base leading-7 text-on-surface-variant">
                No past events match this filter.
              </p>
            </Reveal>
          )}
        </section>
      </div>
    </main>
  );
}
