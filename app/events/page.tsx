import type { Metadata } from "next";
import Link from "next/link";
import { cache } from "react";

import { EventCard } from "@/components/events/event-card";
import { EventCategoryFilters } from "@/components/events/event-category-filters";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";
import { StructuredData } from "@/components/structured-data";
import {
  countEventsByCategory,
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
  const categoryCounts = countEventsByCategory(events);
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
  const activeCategoryLabel = activeCategory ? getEventCategoryLabel(activeCategory) : "All events";
  const selectedCategoryCount = activeCategory ? categoryCounts[activeCategory] : events.length;
  const selectedViewLabel =
    activeCategory === null ? "All categories" : `${activeCategoryLabel} only`;

  return (
    <main className="relative overflow-hidden">
      {upcomingJsonLd ? <StructuredData id="events-jsonld" data={upcomingJsonLd} /> : null}
      <div className="absolute inset-x-0 top-0 -z-10 h-128 bg-[radial-gradient(circle_at_top_left,rgba(255,199,44,0.18),transparent_35%),radial-gradient(circle_at_top_right,rgba(0,26,72,0.14),transparent_34%),linear-gradient(180deg,rgba(229,238,255,0.92),rgba(248,249,255,0))]" />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <Reveal as="section" className="space-y-6" direction="up">
          <div className="grid gap-6 rounded-[2rem] border border-outline-variant/70 bg-white/94 p-6 shadow-sm backdrop-blur sm:p-8 lg:grid-cols-[0.96fr_1.04fr] lg:p-10">
            <div className="flex h-full flex-col justify-between gap-8">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">
                  Events catalog
                </p>
                <h1 className="max-w-2xl font-heading text-[clamp(2.45rem,5vw,4.75rem)] leading-[0.98] tracking-[-0.05em] text-primary">
                  Find the next event, then scan the archive.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-on-surface-variant sm:text-lg">
                  ADNU MAGIS TBI events are organized for quick discovery: one featured next step,
                  a clearer set of category filters, and a past-events shelf for context.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-outline-variant/60 bg-surface-container-low px-4 py-4 shadow-sm">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-secondary">
                    Upcoming
                  </p>
                  <p className="mt-2 text-2xl font-heading text-primary">{upcomingEvents.length}</p>
                  <p className="mt-1 text-sm leading-6 text-on-surface-variant">
                    Ready to browse now.
                  </p>
                </div>
                <div className="rounded-2xl border border-outline-variant/60 bg-surface-container-low px-4 py-4 shadow-sm">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-secondary">
                    Closed
                  </p>
                  <p className="mt-2 text-2xl font-heading text-primary">{closedEvents.length}</p>
                  <p className="mt-1 text-sm leading-6 text-on-surface-variant">
                    Status-marked archive entries.
                  </p>
                </div>
                <div className="rounded-2xl border border-outline-variant/60 bg-surface-container-low px-4 py-4 shadow-sm">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-secondary">
                    View
                  </p>
                  <p className="mt-2 text-sm font-semibold text-primary">{selectedViewLabel}</p>
                  <p className="mt-1 text-sm leading-6 text-on-surface-variant">
                    {selectedCategoryCount} event
                    {selectedCategoryCount === 1 ? "" : "s"} match this view.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex h-full flex-col justify-between gap-4">
              {featuredUpcomingEvent ? (
                <Reveal as="div" direction="right" tone="strong" trigger="mount">
                  <EventCard featured event={featuredUpcomingEvent} />
                </Reveal>
              ) : (
                <div className="flex h-full min-h-[26rem] flex-col justify-between rounded-[1.75rem] border border-dashed border-outline-variant/70 bg-surface-container-low p-6 shadow-sm sm:p-8">
                  <div className="space-y-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
                      No upcoming events
                    </p>
                    <h2 className="max-w-lg font-heading text-3xl tracking-[-0.04em] text-primary">
                      Nothing is scheduled for this filter yet.
                    </h2>
                    <p className="max-w-xl text-base leading-7 text-on-surface-variant">
                      Clear the category filter to recover the full next-event list or jump straight
                      to the past archive for context.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Link
                      className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-bold text-on-primary shadow-sm transition-all hover:bg-tertiary"
                      href={getEventsPageHref(null)}
                    >
                      Clear filter
                    </Link>
                    <Link
                      className="inline-flex items-center justify-center rounded-lg border border-outline-variant bg-white px-5 py-3 text-sm font-bold text-primary transition-all hover:border-primary hover:text-secondary"
                      href={getPastEventsPageHref(activeCategory)}
                    >
                      View archive
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:sticky lg:top-[5.5rem] lg:z-30">
            <div className="rounded-[1.5rem] border border-outline-variant/70 bg-white/88 p-4 shadow-sm backdrop-blur-sm sm:p-5">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
                    Browse by category
                  </p>
                  <p className="text-sm leading-6 text-on-surface-variant">
                    Scroll the chips on small screens. The active filter stays pinned while you scan.
                  </p>
                </div>
                <p className="text-sm text-on-surface-variant">
                  {upcomingEvents.length} upcoming event{upcomingEvents.length === 1 ? "" : "s"} and{" "}
                  {closedEvents.length} closed event{closedEvents.length === 1 ? "" : "s"} match this view.
                </p>
              </div>

              <div className="mt-4">
                <EventCategoryFilters
                  activeCategory={activeCategory}
                  baseHref="/events"
                  categoryCounts={categoryCounts}
                  totalCount={events.length}
                />
              </div>
            </div>
          </div>
        </Reveal>

        <section className="space-y-5" id="upcoming-events">
          <Reveal as="div" className="flex flex-wrap items-end justify-between gap-3" direction="up">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
                Next up
              </p>
              <h2 className="font-heading text-2xl tracking-[-0.03em] text-primary sm:text-3xl">
                Upcoming events
              </h2>
            </div>
            <p className="text-sm text-on-surface-variant">
              Sorted by the event start date, with today included.
            </p>
          </Reveal>

          {featuredUpcomingEvent ? (
            <StaggerGroup as="div" className="grid gap-6 md:grid-cols-2 xl:grid-cols-3" tone="default">
              {additionalUpcomingEvents.length > 0 ? (
                additionalUpcomingEvents.map((event) => (
                  <StaggerItem key={event.id} as="div">
                    <EventCard event={event} />
                  </StaggerItem>
                ))
              ) : (
                <StaggerItem as="div">
                  <div className="rounded-[1.75rem] border border-dashed border-outline-variant/70 bg-white p-8 text-center shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary">
                      One upcoming event
                    </p>
                    <p className="mt-3 text-base leading-7 text-on-surface-variant">
                      This view only has one upcoming event for the selected filter. Use the archive
                      below to see more history.
                    </p>
                  </div>
                </StaggerItem>
              )}
            </StaggerGroup>
          ) : (
            <Reveal
              as="div"
              className="rounded-[1.75rem] border border-dashed border-outline-variant/70 bg-white p-8 text-center shadow-sm"
              direction="up"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary">
                No upcoming events
              </p>
              <p className="mt-3 text-base leading-7 text-on-surface-variant">
                There are no upcoming events for the selected filter right now.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-bold text-on-primary shadow-sm transition-all hover:bg-tertiary"
                  href={getEventsPageHref(null)}
                >
                  Clear filter
                </Link>
                <Link
                  className="inline-flex items-center justify-center rounded-lg border border-outline-variant bg-white px-5 py-3 text-sm font-bold text-primary transition-all hover:border-primary hover:text-secondary"
                  href={getPastEventsPageHref(activeCategory)}
                >
                  View archive
                </Link>
              </div>
            </Reveal>
          )}

          {additionalUpcomingEvents.length > 0 ? (
            <StaggerGroup as="div" className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {additionalUpcomingEvents.map((event) => (
                <StaggerItem key={event.id} as="div">
                  <EventCard event={event} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          ) : null}
        </section>

        <section className="space-y-5" id="closed-events">
          <Reveal as="div" className="flex flex-wrap items-end justify-between gap-3" direction="up">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
                Recent history
              </p>
              <h2 className="font-heading text-2xl tracking-[-0.03em] text-primary sm:text-3xl">
                Closed events preview
              </h2>
            </div>
            <Link
              className="inline-flex items-center gap-2 rounded-full border border-outline-variant bg-white px-4 py-2 text-sm font-semibold text-primary transition-colors hover:border-primary hover:text-secondary"
              href={getPastEventsPageHref(activeCategory)}
            >
              View all closed events
            </Link>
          </Reveal>

          {closedPreviewEvents.length > 0 ? (
            <StaggerGroup as="div" className="grid gap-6 md:grid-cols-2 xl:grid-cols-3" tone="calm">
              {closedPreviewEvents.map((event) => (
                <StaggerItem key={event.id} as="div">
                  <EventCard event={event} variant="compact" />
                </StaggerItem>
              ))}
            </StaggerGroup>
          ) : (
            <Reveal
              as="div"
              className="rounded-[1.75rem] border border-dashed border-outline-variant/70 bg-white p-8 text-center shadow-sm"
              direction="up"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary">
                No closed events
              </p>
              <p className="mt-3 text-base leading-7 text-on-surface-variant">
                There are no closed events for the selected filter right now.
              </p>
            </Reveal>
          )}
        </section>
      </div>
    </main>
  );
}
