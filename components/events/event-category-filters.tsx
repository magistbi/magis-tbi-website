import Link from "next/link";

import {
  EVENT_CATEGORIES,
  buildEventCategoryHref,
  getEventCategoryLabel,
} from "@/lib/events";
import { cn } from "@/lib/utils";
import type { EventCategory } from "@/lib/events";

type EventCategoryFiltersProps = {
  activeCategory: EventCategory | null;
  baseHref: string;
};

function FilterChip({ active, children, href }: { active: boolean; children: string; href: string }) {
  return (
    <Link
      aria-current={active ? "page" : undefined}
      className={cn(
        "inline-flex shrink-0 items-center rounded-full border px-4 py-2.5 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
        active
          ? "border-primary bg-primary text-white shadow-sm shadow-primary/15"
          : "border-outline-variant/90 bg-surface-container-lowest/95 text-on-surface-variant hover:border-primary hover:bg-surface-container-low hover:text-primary hover:shadow-sm",
      )}
      href={href}
    >
      <span className="whitespace-nowrap">{children}</span>
    </Link>
  );
}

export function EventCategoryFilters({
  activeCategory,
  baseHref,
}: EventCategoryFiltersProps) {
  return (
    <nav
      aria-label="Event categories"
      className="flex max-w-full gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
    >
      <div className="flex min-w-max gap-2 sm:min-w-0 sm:flex-wrap">
        <FilterChip active={activeCategory === null} href={baseHref}>
          All events
        </FilterChip>
        {EVENT_CATEGORIES.map((category) => {
          const isActive = activeCategory === category;

          return (
            <FilterChip key={category} active={isActive} href={buildEventCategoryHref(baseHref, category)}>
              {getEventCategoryLabel(category)}
            </FilterChip>
          );
        })}
      </div>
    </nav>
  );
}
