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
  const pastJsonLd = buildPastEventsJsonLd(events, activeCategory);

  return (
    <main className="relative overflow-hidden">
      {pastJsonLd ? <StructuredData id="past-events-jsonld" data={pastJsonLd} /> : null}
      <div className="absolute inset-x-0 top-0 -z-10 h-128 bg-[radial-gradient(circle_at_top_left,rgba(255,199,44,0.18),transparent_35%),radial-gradient(circle_at_top_right,rgba(0,26,72,0.14),transparent_34%),linear-gradient(180deg,rgba(229,238,255,0.92),rgba(248,249,255,0))]" />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <Reveal as="section" className="space-y-5" direction="up">
          <div className="rounded-[1.5rem] border border-outline-variant/70 bg-surface-container-lowest/94 p-6 shadow-sm backdrop-blur sm:p-8">
            <div className="max-w-3xl space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-secondary">
                <Link className="transition-colors hover:text-primary" href={getEventsPageHref(activeCategory)}>
                  Back to catalog
                </Link>
                <span aria-hidden="true" className="text-outline-variant">
                  ·
                </span>
                <span>Archive</span>
              </div>
              <h1 className="font-heading text-[clamp(2.1rem,4.4vw,3.6rem)] leading-[1.03] tracking-[-0.045em] text-primary">
                Closed events archive.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-on-surface-variant sm:text-lg">
                Browse the history of closed ADNU MAGIS TBI events.
              </p>
            </div>
          </div>

          <div className="lg:sticky lg:top-[5.5rem] lg:z-30">
            <div className="rounded-[1.5rem] border border-outline-variant/70 bg-surface-container-lowest/92 p-4 shadow-sm backdrop-blur-sm sm:p-5">
              <div className="flex flex-col gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
                  Browse by category
                </p>
                <EventCategoryFilters activeCategory={activeCategory} baseHref="/events/past" />
              </div>
            </div>
          </div>
        </Reveal>

        <section className="space-y-5">
          <Reveal as="div" className="flex items-end justify-between gap-3" direction="up">
            <div className="space-y-1">
              <h2 className="font-heading text-2xl tracking-[-0.03em] text-primary sm:text-3xl">
                Closed events
              </h2>
            </div>
            <Link
              className="inline-flex items-center gap-2 rounded-lg border border-outline-variant bg-surface-container-lowest px-4 py-2 text-sm font-semibold text-primary transition-colors hover:border-primary hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              href={getEventsPageHref(activeCategory)}
            >
              Back to events
            </Link>
          </Reveal>

          {closedEvents.length > 0 ? (
            <StaggerGroup as="div" className="grid gap-6 lg:grid-cols-2" tone="calm">
              {closedEvents.map((event) => (
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
                No closed events
              </p>
              <p className="mt-3 text-base leading-7 text-on-surface-variant">
                No closed events match this filter.
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
