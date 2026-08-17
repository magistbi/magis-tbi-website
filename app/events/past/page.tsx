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
  normalizeEventCategory,
  sortEventsByStartDateDesc,
  type EventCategory,
} from "@/lib/events";
import { getSiteUrl } from "@/lib/site";
import { getEvents } from "@/lib/wordpress";

type SearchParamsValue = string | string[] | undefined;
type SearchParamsInput = Record<string, SearchParamsValue> | Promise<Record<string, SearchParamsValue>>;

type PastEventsPageProps = {
  searchParams?: Promise<Record<string, SearchParamsValue>>;
};

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

function buildPastEventsDescription(category: EventCategory | null): string {
  const baseDescription = "Browse the full archive of closed ADNU MAGIS TBI events.";

  if (!category) {
    return baseDescription;
  }

  return `Browse the full archive of closed ADNU MAGIS TBI ${getEventCategoryLabel(category).toLowerCase()} events.`;
}

function buildPastEventsJsonLd(
  events: Awaited<ReturnType<typeof loadEvents>>,
  category: EventCategory | null,
) {
  const closedEvents = sortEventsByStartDateDesc(
    filterEventsByCategory(
      events.filter(isPastEvent),
      category,
    ),
  );

  if (closedEvents.length === 0) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category ? `${getEventCategoryLabel(category)} Closed Events` : "Closed Events",
    url: getSiteUrl(getPastEventsPageHref(category)),
    mainEntity: {
      "@type": "ItemList",
      itemListOrder: "http://schema.org/ItemListOrderDescending",
      numberOfItems: closedEvents.length,
      itemListElement: closedEvents.map((event, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: getSiteUrl(getEventHref(event)),
        name: event.title,
        startDate: formatEventDateTimeAttribute(event.startDate) ?? event.startDate,
      })),
    },
  };
}

export async function generateMetadata({ searchParams }: PastEventsPageProps): Promise<Metadata> {
  const resolvedSearchParams = await normalizeSearchParams(searchParams);
  const activeCategory = parseCategoryParam(resolvedSearchParams.category);
  const title = activeCategory ? `${getEventCategoryLabel(activeCategory)} Closed Events` : "Closed Events";
  const description = buildPastEventsDescription(activeCategory);
  const canonicalPath = getPastEventsPageHref(activeCategory);

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

export default async function PastEventsPage({ searchParams }: PastEventsPageProps) {
  const resolvedSearchParams = await normalizeSearchParams(searchParams);
  const activeCategory = parseCategoryParam(resolvedSearchParams.category);
  const events = await loadEvents();
  const closedEvents = sortEventsByStartDateDesc(filterEventsByCategory(events.filter(isPastEvent), activeCategory));
  const closedCategoryCounts = countEventsByCategory(closedEvents);
  const pastJsonLd = buildPastEventsJsonLd(events, activeCategory);
  const activeCategoryLabel = activeCategory ? getEventCategoryLabel(activeCategory) : "All events";

  return (
    <main className="relative overflow-hidden">
      {pastJsonLd ? <StructuredData id="past-events-jsonld" data={pastJsonLd} /> : null}
      <div className="absolute inset-x-0 top-0 -z-10 h-128 bg-[radial-gradient(circle_at_top_left,rgba(255,199,44,0.18),transparent_35%),radial-gradient(circle_at_top_right,rgba(0,26,72,0.14),transparent_34%),linear-gradient(180deg,rgba(229,238,255,0.92),rgba(248,249,255,0))]" />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <Reveal as="section" className="space-y-5" direction="up">
          <div className="rounded-[1.8rem] border border-outline-variant/70 bg-white/94 p-6 shadow-sm backdrop-blur sm:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl space-y-3">
                <div className="flex flex-wrap items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-secondary">
                  <Link
                    className="transition-colors hover:text-primary"
                    href={getEventsPageHref(activeCategory)}
                  >
                    Back to catalog
                  </Link>
                  <span aria-hidden="true" className="text-outline-variant">
                    ·
                  </span>
                  <span>Archive</span>
                </div>
                <h1 className="font-heading text-[clamp(2.15rem,4.6vw,3.8rem)] leading-[1.02] tracking-[-0.045em] text-primary">
                  Closed events archive.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-on-surface-variant sm:text-lg">
                  Browse the full history of ADNU MAGIS TBI events marked as closed.
                  The archive stays compact so you can scan titles, dates, and venues quickly.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="rounded-2xl border border-outline-variant/60 bg-surface-container-low px-4 py-3 shadow-sm">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-secondary">
                    Closed entries
                  </p>
                  <p className="mt-1 text-xl font-heading text-primary">{closedEvents.length}</p>
                </div>
                <div className="rounded-2xl border border-outline-variant/60 bg-surface-container-low px-4 py-3 shadow-sm">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-secondary">
                    View
                  </p>
                  <p className="mt-1 text-sm font-semibold text-primary">{activeCategoryLabel}</p>
                </div>
                <div className="rounded-2xl border border-outline-variant/60 bg-surface-container-low px-4 py-3 shadow-sm">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-secondary">
                    Sort
                  </p>
                  <p className="mt-1 text-sm font-semibold text-primary">Newest first</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-[5.5rem] lg:z-30">
            <div className="rounded-[1.5rem] border border-outline-variant/70 bg-white/88 p-4 shadow-sm backdrop-blur-sm sm:p-5">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
                    Narrow the archive
                  </p>
                  <p className="text-sm leading-6 text-on-surface-variant">
                    Filters stay visible while you scan the archive. On small screens, swipe the chip row.
                  </p>
                </div>
                <p className="text-sm text-on-surface-variant">
                  {closedEvents.length} closed event{closedEvents.length === 1 ? "" : "s"} match this view.
                </p>
              </div>

              <div className="mt-4">
                <EventCategoryFilters
                  activeCategory={activeCategory}
                  baseHref="/events/past"
                  categoryCounts={closedCategoryCounts}
                  totalCount={closedEvents.length}
                />
              </div>
            </div>
          </div>
        </Reveal>

        <section className="space-y-5">
          <Reveal as="div" className="flex flex-wrap items-end justify-between gap-3" direction="up">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
                Archive list
              </p>
              <h2 className="font-heading text-2xl tracking-[-0.03em] text-primary sm:text-3xl">
                Most recent closed events
              </h2>
            </div>
            <p className="text-sm text-on-surface-variant">
              Events are ordered by `start_date`, newest first.
            </p>
          </Reveal>

          {closedEvents.length > 0 ? (
            <StaggerGroup as="div" className="grid gap-6 md:grid-cols-2 xl:grid-cols-3" tone="calm">
              {closedEvents.map((event) => (
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
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-bold text-on-primary shadow-sm transition-all hover:bg-tertiary"
                  href={getEventsPageHref(null)}
                >
                  Clear filter
                </Link>
                <Link
                  className="inline-flex items-center justify-center rounded-lg border border-outline-variant bg-white px-5 py-3 text-sm font-bold text-primary transition-all hover:border-primary hover:text-secondary"
                  href="/events"
                >
                  Back to events
                </Link>
              </div>
            </Reveal>
          )}
        </section>
      </div>
    </main>
  );
}
