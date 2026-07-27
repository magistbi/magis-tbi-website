import type {
  RawWordPressAuthor,
  RawWordPressCategory,
  RawWordPressEmbedded,
  RawWordPressEvent,
  RawWordPressGalleryItem,
  RawWordPressMedia,
  RawWordPressPost,
  WordPressAuthor,
  WordPressCategory,
  WordPressEvent,
  WordPressGalleryItem,
  WordPressHomepageSnapshot,
  WordPressImage,
  WordPressPost,
} from "@/types/wordpress";

export const WORDPRESS_REVALIDATE_SECONDS = 300;

const WORDPRESS_CONTENT_TYPES = {
  posts: "posts",
  events: "events",
  gallery: "gallery",
} as const;

const WORDPRESS_BASE_PATH = "wp-json/wp/v2";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function asString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

function stripHtml(value: string | null | undefined): string {
  if (!value) {
    return "";
  }

  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function resolveWordPressOrigin(): URL | null {
  const rawOrigin = process.env.WORDPRESS_API_URL ?? process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

  if (!rawOrigin) {
    return null;
  }

  try {
    const url = new URL(rawOrigin);
    url.pathname = url.pathname.replace(/\/+$/, "");
    return url;
  } catch {
    return null;
  }
}

function buildWordPressUrl(
  endpoint: string,
  searchParams: Record<string, string | number | boolean | string[] | undefined> = {},
): string | null {
  const origin = resolveWordPressOrigin();

  if (!origin) {
    return null;
  }

  const url = new URL(`${WORDPRESS_BASE_PATH}/${endpoint.replace(/^\/+/, "")}`, origin);

  for (const [key, value] of Object.entries(searchParams)) {
    if (value === undefined) {
      continue;
    }

    if (Array.isArray(value)) {
      url.searchParams.set(key, value.join(","));
      continue;
    }

    url.searchParams.set(key, String(value));
  }

  return url.toString();
}

function mergeTags(...groups: Array<string[] | undefined>): string[] {
  return Array.from(
    new Set(
      groups
        .flat()
        .filter((tag): tag is string => typeof tag === "string" && tag.length > 0),
    ),
  );
}

function sanitizeTextField(field: { rendered?: string } | string | null | undefined): string {
  if (!field) {
    return "";
  }

  if (typeof field === "string") {
    return stripHtml(field);
  }

  return stripHtml(field.rendered);
}

function toNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function normalizeAuthor(author: RawWordPressAuthor | undefined): WordPressAuthor | null {
  if (!author) {
    return null;
  }

  return {
    id: author.id,
    name: author.name,
    slug: author.slug,
    url: asString(author.link),
    avatarUrl: asString(author.avatar_urls?.["96"] ?? author.avatar_urls?.["48"] ?? null),
  };
}

function normalizeCategory(category: RawWordPressCategory): WordPressCategory {
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    url: asString(category.link),
  };
}

function normalizeMedia(media: RawWordPressMedia | undefined): WordPressImage | null {
  if (!media) {
    return null;
  }

  const url = asString(media.source_url);

  if (!url) {
    return null;
  }

  return {
    id: media.id,
    url,
    alt: stripHtml(media.alt_text),
    caption: sanitizeTextField(media.caption) || null,
    width: toNumber(media.media_details?.width),
    height: toNumber(media.media_details?.height),
  };
}

function getEmbeddedMedia(embedded: RawWordPressEmbedded | undefined): WordPressImage | null {
  return normalizeMedia(embedded?.["wp:featuredmedia"]?.[0]);
}

function getEmbeddedAuthor(embedded: RawWordPressEmbedded | undefined): WordPressAuthor | null {
  return normalizeAuthor(embedded?.author?.[0]);
}

function getEmbeddedCategories(embedded: RawWordPressEmbedded | undefined): WordPressCategory[] {
  const terms = embedded?.["wp:term"]?.flat() ?? [];

  return terms
    .filter(
      (term): term is RawWordPressCategory =>
        isRecord(term) &&
        typeof term.id === "number" &&
        typeof term.name === "string" &&
        typeof term.slug === "string" &&
        typeof term.link === "string",
    )
    .map(normalizeCategory);
}

function parseDateValue(value: string | null | undefined): number {
  if (!value) {
    return 0;
  }

  const time = Date.parse(value);
  return Number.isNaN(time) ? 0 : time;
}

function normalizePost(post: RawWordPressPost): WordPressPost {
  const categories = getEmbeddedCategories(post._embedded);

  return {
    id: post.id,
    slug: post.slug,
    title: sanitizeTextField(post.title),
    excerpt: sanitizeTextField(post.excerpt) || "Read the latest update from the archive.",
    url: asString(post.link) ?? "",
    date: post.date,
    modified: post.modified,
    author: getEmbeddedAuthor(post._embedded),
    categories,
    featuredMedia: getEmbeddedMedia(post._embedded),
  };
}

function readEventField(
  event: RawWordPressEvent,
  key: keyof NonNullable<RawWordPressEvent["acf"]>,
): string | null {
  const acfValue = asString(event.acf?.[key]);
  if (acfValue) {
    return acfValue;
  }

  return asString(event.meta?.[key]);
}

function normalizeEvent(event: RawWordPressEvent): WordPressEvent {
  return {
    id: event.id,
    slug: event.slug,
    title: sanitizeTextField(event.title),
    description: sanitizeTextField(event.excerpt) || "Event details will be published here once the CMS entry is configured.",
    url: asString(event.link) ?? "",
    eventDate: readEventField(event, "event_date") ?? event.date,
    startTime: readEventField(event, "event_start_time"),
    endTime: readEventField(event, "event_end_time"),
    location: readEventField(event, "event_location"),
    registrationUrl: readEventField(event, "event_registration_url"),
    registrationLabel: readEventField(event, "event_registration_label"),
    featuredMedia: getEmbeddedMedia(event._embedded),
  };
}

function readGalleryField(
  item: RawWordPressGalleryItem,
  key: keyof NonNullable<RawWordPressGalleryItem["acf"]>,
): string | null {
  const acfValue = asString(item.acf?.[key]);
  if (acfValue) {
    return acfValue;
  }

  return asString(item.meta?.[key]);
}

function normalizeGalleryItem(item: RawWordPressGalleryItem): WordPressGalleryItem {
  const image = getEmbeddedMedia(item._embedded);
  const directImageUrl = readGalleryField(item, "gallery_image_url");
  const directImageAlt = readGalleryField(item, "gallery_image_alt");

  return {
    id: item.id,
    slug: item.slug,
    title: sanitizeTextField(item.title),
    caption:
      readGalleryField(item, "gallery_caption") ||
      sanitizeTextField(item.excerpt) ||
      "Gallery highlight",
    url: asString(item.link) ?? "",
    featuredMedia:
      image ??
      (directImageUrl
        ? {
            id: item.id,
            url: directImageUrl,
            alt: directImageAlt ?? sanitizeTextField(item.title),
            caption: readGalleryField(item, "gallery_caption"),
            width: null,
            height: null,
          }
        : null),
  };
}

async function fetchWordPressCollection<T>(
  endpoint: string,
  searchParams: Record<string, string | number | boolean | string[] | undefined>,
  tags: string[],
): Promise<T[]> {
  const url = buildWordPressUrl(endpoint, searchParams);

  if (!url) {
    return [];
  }

  try {
    const response = await fetch(url, {
      cache: "force-cache",
      next: {
        revalidate: WORDPRESS_REVALIDATE_SECONDS,
        tags,
      },
    });

    if (!response.ok) {
      return [];
    }

    const payload = (await response.json()) as unknown;

    if (!Array.isArray(payload)) {
      return [];
    }

    return payload as T[];
  } catch {
    return [];
  }
}

export async function getLatestPosts(limit = 3): Promise<WordPressPost[]> {
  const posts = await fetchWordPressCollection<RawWordPressPost>(
    WORDPRESS_CONTENT_TYPES.posts,
    {
      per_page: Math.max(limit, 1),
      _embed: 1,
      _fields: "id,slug,date,modified,link,title,excerpt,featured_media,_embedded",
      orderby: "date",
      order: "desc",
    },
    mergeTags(["wordpress", "wordpress:posts", "wordpress:homepage"]),
  );

  return posts.map(normalizePost).sort((left, right) => parseDateValue(right.date) - parseDateValue(left.date)).slice(0, limit);
}

export async function getUpcomingEvents(limit = 3): Promise<WordPressEvent[]> {
  const events = await fetchWordPressCollection<RawWordPressEvent>(
    WORDPRESS_CONTENT_TYPES.events,
    {
      per_page: Math.max(limit * 2, 6),
      _embed: 1,
      _fields:
        "id,slug,date,modified,link,title,excerpt,featured_media,acf,meta,_embedded",
      orderby: "date",
      order: "desc",
    },
    mergeTags(["wordpress", "wordpress:events", "wordpress:homepage"]),
  );

  const normalized = events.map(normalizeEvent).sort(
    (left, right) => parseDateValue(left.eventDate) - parseDateValue(right.eventDate),
  );

  const now = Date.now();
  const upcoming = normalized.filter((event) => parseDateValue(event.eventDate) >= now);

  return (upcoming.length > 0 ? upcoming : normalized).slice(0, limit);
}

export async function getGalleryHighlights(limit = 3): Promise<WordPressGalleryItem[]> {
  const galleryItems = await fetchWordPressCollection<RawWordPressGalleryItem>(
    WORDPRESS_CONTENT_TYPES.gallery,
    {
      per_page: Math.max(limit * 2, 6),
      _embed: 1,
      _fields: "id,slug,date,modified,link,title,excerpt,featured_media,acf,meta,_embedded",
      orderby: "date",
      order: "desc",
    },
    mergeTags(["wordpress", "wordpress:gallery", "wordpress:homepage"]),
  );

  return galleryItems
    .sort((left, right) => parseDateValue(right.modified) - parseDateValue(left.modified))
    .map(normalizeGalleryItem)
    .slice(0, limit);
}

export async function getHomepageContent(): Promise<WordPressHomepageSnapshot> {
  const [latestPosts, upcomingEvents, galleryHighlights] = await Promise.all([
    getLatestPosts(),
    getUpcomingEvents(),
    getGalleryHighlights(),
  ]);

  return {
    latestPosts,
    upcomingEvents,
    galleryHighlights,
  };
}
