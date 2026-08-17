import type { WordPressEvent, WordPressEventCategory } from "@/types/wordpress";

export const EVENTS_BASE_PATH = "/events";
export const PAST_EVENTS_PATH = "/events/past";

export const EVENT_CATEGORIES = ["workshop", "seminar", "networking", "incubation"] as const;

export type EventCategory = WordPressEventCategory;
export type EventCategoryCounts = Record<EventCategory, number>;

export interface EventDateStamp {
  day: string;
  label: string;
  month: string;
  time: string | null;
}

const EVENT_TIME_ZONE = "Asia/Manila";
const EVENT_TIME_ZONE_OFFSET_MINUTES = 8 * 60;

const EVENT_CATEGORY_LABELS: Record<EventCategory, string> = {
  workshop: "Workshop",
  seminar: "Seminar",
  networking: "Networking",
  incubation: "Incubation",
};

function isEventCategory(value: string): value is EventCategory {
  return (EVENT_CATEGORIES as readonly string[]).includes(value);
}

function formatDateParts(value: Date): {
  year: string;
  month: string;
  day: string;
} {
  const parts = new Intl.DateTimeFormat("en-CA", {
    day: "2-digit",
    month: "2-digit",
    timeZone: EVENT_TIME_ZONE,
    year: "numeric",
  }).formatToParts(value);

  const year = parts.find((part) => part.type === "year")?.value ?? "";
  const month = parts.find((part) => part.type === "month")?.value ?? "";
  const day = parts.find((part) => part.type === "day")?.value ?? "";

  return { year, month, day };
}

function parseEventDateTimeParts(value: string): number | null {
  const match = value
    .trim()
    .match(/^(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2})(?::(\d{2}))?)?$/);

  if (!match) {
    return null;
  }

  const [, year, month, day, hours = "0", minutes = "0", seconds = "0"] = match;

  return (
    Date.UTC(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hours),
      Number(minutes),
      Number(seconds),
    ) - EVENT_TIME_ZONE_OFFSET_MINUTES * 60_000
  );
}

export function parseEventDateValue(value: string | null | undefined): number {
  if (!value) {
    return 0;
  }

  const trimmed = value.trim();
  const parsedWithOffset = Date.parse(trimmed);

  if (!Number.isNaN(parsedWithOffset) && /(?:Z|[+-]\d{2}:?\d{2})$/i.test(trimmed)) {
    return parsedWithOffset;
  }

  const parsedWithoutOffset = parseEventDateTimeParts(trimmed);

  if (parsedWithoutOffset !== null) {
    return parsedWithoutOffset;
  }

  return Number.isNaN(parsedWithOffset) ? 0 : parsedWithOffset;
}

export function getEventCategoryLabel(category: string | null | undefined): string {
  if (!category) {
    return "Event";
  }

  const normalized = category.trim().toLowerCase();

  if (isEventCategory(normalized)) {
    return EVENT_CATEGORY_LABELS[normalized];
  }

  return category
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

export function normalizeEventCategory(value: string | null | undefined): EventCategory | null {
  if (!value) {
    return null;
  }

  const normalized = value.trim().toLowerCase();
  return isEventCategory(normalized) ? normalized : null;
}

export function isClosedEvent(event: Pick<WordPressEvent, "status">): boolean {
  return event.status?.trim().toLowerCase() === "closed";
}

export function buildEventCategoryHref(basePath: string, category: EventCategory | null): string {
  if (!category) {
    return basePath;
  }

  const searchParams = new URLSearchParams();
  searchParams.set("category", category);
  return `${basePath}?${searchParams.toString()}`;
}

export function getEventHref(event: Pick<WordPressEvent, "slug">): string {
  return `${EVENTS_BASE_PATH}/${encodeURIComponent(event.slug)}`;
}

export function getEventsPageHref(category: EventCategory | null = null): string {
  return buildEventCategoryHref(EVENTS_BASE_PATH, category);
}

export function getPastEventsPageHref(category: EventCategory | null = null): string {
  return buildEventCategoryHref(PAST_EVENTS_PATH, category);
}

export function isUpcomingEvent(event: Pick<WordPressEvent, "startDate">): boolean {
  return parseEventDateValue(event.startDate) >= getManilaStartOfDayTimestamp();
}

export function isPastEvent(event: Pick<WordPressEvent, "status">): boolean {
  return isClosedEvent(event);
}

function getManilaStartOfDayTimestamp(date = new Date()): number {
  const { year, month, day } = formatDateParts(date);
  return parseEventDateValue(`${year}-${month}-${day} 00:00:00`);
}

export function formatEventDate(value: string, locale = "en-US"): string {
  const date = new Date(parseEventDateValue(value));

  if (Number.isNaN(date.getTime()) || parseEventDateValue(value) === 0) {
    return "";
  }

  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeZone: EVENT_TIME_ZONE,
  }).format(date);
}

export function formatEventTime(value: string, locale = "en-US"): string {
  const date = new Date(parseEventDateValue(value));

  if (Number.isNaN(date.getTime()) || parseEventDateValue(value) === 0) {
    return "";
  }

  return new Intl.DateTimeFormat(locale, {
    hour: "numeric",
    minute: "2-digit",
    timeZone: EVENT_TIME_ZONE,
  }).format(date);
}

export function formatEventDateTime(value: string, locale = "en-US"): string {
  const date = new Date(parseEventDateValue(value));

  if (Number.isNaN(date.getTime()) || parseEventDateValue(value) === 0) {
    return "";
  }

  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: EVENT_TIME_ZONE,
  }).format(date);
}

export function formatEventDateTimeAttribute(value: string): string | null {
  const timestamp = parseEventDateValue(value);

  if (!timestamp) {
    return null;
  }

  return new Date(timestamp).toISOString();
}

export function formatEventDateStamp(value: string, locale = "en-US"): EventDateStamp | null {
  const timestamp = parseEventDateValue(value);

  if (!timestamp) {
    return null;
  }

  const date = new Date(timestamp);
  const hasExplicitTime = /^(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2})(?::(\d{2}))?)?$/.test(value.trim());

  return {
    day: new Intl.DateTimeFormat(locale, {
      day: "numeric",
      timeZone: EVENT_TIME_ZONE,
    }).format(date),
    label: new Intl.DateTimeFormat(locale, {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: EVENT_TIME_ZONE,
    }).format(date),
    month: new Intl.DateTimeFormat(locale, {
      month: "short",
      timeZone: EVENT_TIME_ZONE,
    }).format(date),
    time: hasExplicitTime
      ? new Intl.DateTimeFormat(locale, {
          hour: "numeric",
          minute: "2-digit",
          timeZone: EVENT_TIME_ZONE,
        }).format(date)
      : null,
  };
}

export function formatEventDateRange(startDate: string, endDate: string, locale = "en-US"): string {
  const startValue = parseEventDateValue(startDate);
  const endValue = parseEventDateValue(endDate);

  if (!startValue) {
    return "";
  }

  if (!endValue || endValue === startValue) {
    return formatEventDateTime(startDate, locale);
  }

  const startDateParts = formatDateParts(new Date(startValue));
  const endDateParts = formatDateParts(new Date(endValue));

  if (
    startDateParts.year === endDateParts.year &&
    startDateParts.month === endDateParts.month &&
    startDateParts.day === endDateParts.day
  ) {
    const dateLabel = new Intl.DateTimeFormat(locale, {
      dateStyle: "medium",
      timeZone: EVENT_TIME_ZONE,
    }).format(new Date(startValue));

    return `${dateLabel}, ${formatEventTime(startDate, locale)} to ${formatEventTime(endDate, locale)}`;
  }

  return `${formatEventDateTime(startDate, locale)} to ${formatEventDateTime(endDate, locale)}`;
}

export function getEventPrimaryDateLabel(event: Pick<WordPressEvent, "startDate" | "endDate">): string {
  if (event.endDate) {
    return formatEventDateRange(event.startDate, event.endDate) || "Date to be announced";
  }

  return formatEventDateTime(event.startDate) || "Date to be announced";
}

export function filterEventsByCategory<T extends Pick<WordPressEvent, "category">>(
  events: T[],
  category: EventCategory | null,
): T[] {
  if (!category) {
    return events;
  }

  return events.filter((event) => event.category === category);
}

export function countEventsByCategory<T extends Pick<WordPressEvent, "category">>(events: T[]): EventCategoryCounts {
  return events.reduce<EventCategoryCounts>(
    (counts, event) => {
      if (event.category) {
        counts[event.category] += 1;
      }

      return counts;
    },
    {
      workshop: 0,
      seminar: 0,
      networking: 0,
      incubation: 0,
    },
  );
}

export function sortEventsByStartDateDesc<T extends Pick<WordPressEvent, "startDate">>(events: T[]): T[] {
  return [...events].sort((left, right) => parseEventDateValue(right.startDate) - parseEventDateValue(left.startDate));
}

export function sortEventsByStartDateAsc<T extends Pick<WordPressEvent, "startDate">>(events: T[]): T[] {
  return [...events].sort((left, right) => parseEventDateValue(left.startDate) - parseEventDateValue(right.startDate));
}

export function formatEventCapacity(value: number | null): string {
  if (!value || value < 1) {
    return "Open capacity";
  }

  return `${new Intl.NumberFormat("en-US").format(value)} slots`;
}
