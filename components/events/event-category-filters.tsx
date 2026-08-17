import Link from "next/link";

import {
  EVENT_CATEGORIES,
  buildEventCategoryHref,
  getEventCategoryLabel,
  type EventCategoryCounts,
} from "@/lib/events";
import { cn } from "@/lib/utils";
import type { EventCategory } from "@/lib/events";

type EventCategoryFiltersProps = {
  activeCategory: EventCategory | null;
  baseHref: string;
  categoryCounts?: Partial<EventCategoryCounts>;
  totalCount?: number;
};

function FilterChip({
  active,
  count,
  children,
  href,
}: {
  active: boolean;
  children: string;
  count?: number;
  href: string;
}) {
  return (
    <Link
      aria-current={active ? "page" : undefined}
      className={cn(
        "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all",
        active
          ? "border-primary bg-primary text-white shadow-sm shadow-primary/10"
          : "border-outline-variant bg-white/90 text-on-surface-variant hover:border-primary hover:text-primary hover:shadow-sm",
      )}
      href={href}
    >
      <span className="whitespace-nowrap">{children}</span>
      {typeof count === "number" ? (
        <span
          className={cn(
            "inline-flex min-w-6 items-center justify-center rounded-full px-1.5 py-0.5 text-[0.72rem] font-bold tabular-nums",
            active ? "bg-white/18 text-white" : "bg-surface-container-low text-primary",
          )}
        >
          {count}
        </span>
      ) : null}
    </Link>
  );
}

export function EventCategoryFilters({
  activeCategory,
  baseHref,
  categoryCounts,
  totalCount,
}: EventCategoryFiltersProps) {
  return (
    <div
      aria-label="Event categories"
      className="flex max-w-full gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
    >
      <div className="flex min-w-max gap-2 sm:min-w-0 sm:flex-wrap">
        <FilterChip active={activeCategory === null} count={totalCount} href={baseHref}>
          All events
        </FilterChip>
        {EVENT_CATEGORIES.map((category) => {
          const isActive = activeCategory === category;
          const count = categoryCounts?.[category];

          return (
            <FilterChip
              key={category}
              active={isActive}
              count={count}
              href={buildEventCategoryHref(baseHref, category)}
            >
              {getEventCategoryLabel(category)}
            </FilterChip>
          );
        })}
      </div>
    </div>
  );
}
