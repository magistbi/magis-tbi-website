import type {
  RawWordPressAuthor,
  RawWordPressCategory,
  RawWordPressEmbedded,
  RawWordPressEvent,
  RawWordPressGalleryItem,
  RawWordPressMedia,
  RawWordPressPost,
  RawWordPressStartup,
  WordPressAuthor,
  WordPressCategory,
  WordPressEvent,
  WordPressGalleryItem,
  WordPressHomepageSnapshot,
  WordPressImage,
  WordPressPaginatedCollection,
  WordPressPost,
  WordPressStartup,
} from "@/types/wordpress";
import {
  isUpcomingEvent,
  normalizeEventCategory,
  sortEventsByStartDateAsc,
  sortEventsByStartDateDesc,
} from "@/lib/events";

export const WORDPRESS_REVALIDATE_SECONDS = 300;

const WORDPRESS_CONTENT_TYPES = {
  posts: "posts",
  events: "events",
  gallery: "gallery",
  startups: "startups",
} as const;

const WORDPRESS_BASE_PATH = "wp-json/wp/v2";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function asString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

const HTML_ENTITY_MAP: Record<string, string> = {
  amp: "&",
  apos: "'",
  gt: ">",
  hellip: "…",
  laquo: "«",
  ldquo: "“",
  lsquo: "‘",
  lt: "<",
  mdash: "—",
  nbsp: " ",
  ndash: "–",
  quot: '"',
  raquo: "»",
  rdquo: "”",
  rsquo: "’",
};

function decodeHtmlEntities(value: string): string {
  return value.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (match, entity: string) => {
    if (entity.startsWith("#")) {
      const codePoint = entity.startsWith("#x") || entity.startsWith("#X")
        ? Number.parseInt(entity.slice(2), 16)
        : Number.parseInt(entity.slice(1), 10);

      if (!Number.isFinite(codePoint)) {
        return match;
      }

      try {
        return String.fromCodePoint(codePoint);
      } catch {
        return match;
      }
    }

    return HTML_ENTITY_MAP[entity.toLowerCase()] ?? match;
  });
}

function resolveUrl(rawOrigin: string): URL | null {
  const normalizedOrigin = /^https?:\/\//i.test(rawOrigin) ? rawOrigin : `https://${rawOrigin}`;

  try {
    return new URL(normalizedOrigin);
  } catch {
    return null;
  }
}

function stripHtml(value: string | null | undefined): string {
  if (!value) {
    return "";
  }

  return decodeHtmlEntities(value.replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function resolveWordPressOrigin(): URL | null {
  const rawOrigin = process.env.WORDPRESS_API_URL ?? process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

  if (!rawOrigin) {
    return null;
  }

  const url = resolveUrl(rawOrigin);

  if (!url) {
    return null;
  }

  url.pathname = url.pathname.replace(/\/+$/, "");
  return url;
}

function resolveWordPressDomainOrigin(): URL | null {
  const rawDomain = process.env.WORDPRESS_DOMAIN;

  if (!rawDomain) {
    return null;
  }

  const url = resolveUrl(rawDomain);

  if (!url) {
    return null;
  }

  url.pathname = "";
  url.search = "";
  url.hash = "";
  return url;
}

function rewriteWordPressImageUrl(url: string): string {
  const domainOrigin = resolveWordPressDomainOrigin();

  if (!domainOrigin) {
    return url;
  }

  try {
    const parsedUrl = new URL(url, domainOrigin);
    return new URL(`${parsedUrl.pathname}${parsedUrl.search}${parsedUrl.hash}`, domainOrigin).toString();
  } catch {
    return url;
  }
}

export function buildWordPressImageUrl(pathname: string, fallbackUrl: string): string {
  const domainOrigin = resolveWordPressDomainOrigin();

  if (!domainOrigin) {
    return fallbackUrl;
  }

  try {
    const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
    return new URL(normalizedPath, domainOrigin).toString();
  } catch {
    return fallbackUrl;
  }
}

function buildWordPressUrlFromOrigin(
  origin: URL | null,
  endpoint: string,
  searchParams: Record<string, string | number | boolean | string[] | undefined> = {},
): string | null {

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

function readUnknownText(value: unknown): string {
  if (typeof value === "string") {
    return stripHtml(value);
  }

  if (isRecord(value) && typeof value.rendered === "string") {
    return stripHtml(value.rendered);
  }

  return "";
}

function readRenderedHtml(value: unknown): string {
  if (typeof value === "string") {
    return value;
  }

  if (isRecord(value) && typeof value.rendered === "string") {
    return value.rendered;
  }

  return "";
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
  return normalizeWordPressImage(media, sanitizeTextField(media?.title));
}

async function fetchWordPressImageFromHref(
  href: string,
  fallbackAlt: string,
  tags: string[],
): Promise<WordPressImage | null> {
  const origin = resolveWordPressOrigin();

  if (!origin) {
    return null;
  }

  try {
    const url = new URL(href, origin);
    url.searchParams.set("_fields", "id,source_url,alt_text,caption,title,media_details");

    const response = await fetch(url.toString(), {
      cache: "force-cache",
      next: {
        revalidate: WORDPRESS_REVALIDATE_SECONDS,
        tags,
      },
    });

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as unknown;
    return normalizeWordPressImage(payload, fallbackAlt);
  } catch {
    return null;
  }
}

function normalizeWordPressImage(media: unknown, fallbackAlt: string): WordPressImage | null {
  if (!media) {
    return null;
  }

  if (typeof media === "string") {
    const url = asString(media);

    if (!url) {
      return null;
    }

    return {
      id: 0,
      url: rewriteWordPressImageUrl(url),
      alt: stripHtml(fallbackAlt),
      caption: null,
      width: null,
      height: null,
    };
  }

  if (!isRecord(media)) {
    return null;
  }

  const url = asString(media.source_url) ?? asString(media.url);

  if (!url) {
    return null;
  }

  const mediaDetails = isRecord(media.media_details) ? media.media_details : null;
  const caption = readUnknownText(media.caption);

  return {
    id: toNumber(media.id) ?? 0,
    url: rewriteWordPressImageUrl(url),
    alt: readUnknownText(media.alt_text) || readUnknownText(media.alt) || stripHtml(fallbackAlt),
    caption: caption || null,
    width: mediaDetails ? toNumber(mediaDetails.width) : toNumber(media.width),
    height: mediaDetails ? toNumber(mediaDetails.height) : toNumber(media.height),
  };
}

function getEmbeddedMedia(embedded: RawWordPressEmbedded | undefined): WordPressImage | null {
  return normalizeMedia(embedded?.["wp:featuredmedia"]?.[0]);
}

function getFeaturedMediaHref(post: Pick<RawWordPressPost, "_links">): string | null {
  return asString(post._links?.["wp:featuredmedia"]?.[0]?.href);
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

function readStartupField(
  startup: RawWordPressStartup,
  key: keyof NonNullable<RawWordPressStartup["acf"]>,
): unknown {
  if (startup.acf && key in startup.acf) {
    return startup.acf[key];
  }

  if (startup.meta && key in startup.meta) {
    return startup.meta[key];
  }

  return undefined;
}

function parseCommaSeparatedList(value: string): string[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

function normalizeStartup(startup: RawWordPressStartup): WordPressStartup {
  const startupName =
    readUnknownText(readStartupField(startup, "startup_name")) ||
    sanitizeTextField(startup.title) ||
    "Startup";

  const founderNames = parseCommaSeparatedList(readUnknownText(readStartupField(startup, "founder_names")));
  const cohort = readUnknownText(readStartupField(startup, "cohort")) || null;
  const logoUrl = asString(readStartupField(startup, "logo"));
  const description =
    readUnknownText(readStartupField(startup, "description")) ||
    sanitizeTextField(startup.excerpt) ||
    "Startup details will be published here once the CMS entry is configured.";
  const logo = logoUrl ? normalizeWordPressImage(logoUrl, startupName) : getEmbeddedMedia(startup._embedded);

  return {
    id: startup.id,
    slug: startup.slug,
    startupName,
    founderNames,
    cohort,
    description,
    logo,
  };
}

async function normalizePost(post: RawWordPressPost, tags: string[]): Promise<WordPressPost> {
  const categories = getEmbeddedCategories(post._embedded);
  const fallbackAlt = sanitizeTextField(post.title);
  const featuredMedia =
    getEmbeddedMedia(post._embedded) ??
    (async () => {
      const featuredMediaHref = getFeaturedMediaHref(post);

      if (featuredMediaHref) {
        const media = await fetchWordPressImageFromHref(
          featuredMediaHref,
          fallbackAlt,
          mergeTags(tags, ["wordpress:media"]),
        );

        if (media) {
          return media;
        }
      }

      const jetpackFeaturedMediaUrl = asString(post.jetpack_featured_media_url);

      return jetpackFeaturedMediaUrl ? normalizeWordPressImage(jetpackFeaturedMediaUrl, fallbackAlt) : null;
    })();

  return {
    id: post.id,
    slug: post.slug,
    title: fallbackAlt,
    excerpt: sanitizeTextField(post.excerpt) || "Read the latest update from the archive.",
    content: readRenderedHtml(post.content),
    url: asString(post.link) ?? "",
    date: post.date,
    modified: post.modified,
    author: getEmbeddedAuthor(post._embedded),
    categories,
    featuredMedia: await featuredMedia,
  };
}

export async function getPostsPage(
  page = 1,
  limit = 12,
  tags: string[] = ["wordpress", "wordpress:posts"],
): Promise<WordPressPaginatedCollection<WordPressPost>> {
  const posts = await fetchWordPressCollectionPage<RawWordPressPost>(
    resolveWordPressOrigin(),
    WORDPRESS_CONTENT_TYPES.posts,
    {
      per_page: Math.max(limit, 1),
      page: Math.max(page, 1),
      _embed: 1,
      _fields: "id,slug,date,modified,link,title,excerpt,featured_media,jetpack_featured_media_url,_embedded,_links",
      orderby: "date",
      order: "desc",
    },
    mergeTags(tags),
  );

  const normalizedPosts = posts
    ? await Promise.all(posts.items.map((post) => normalizePost(post, tags)))
    : [];

  return {
    items: normalizedPosts
      .sort((left, right) => parseDateValue(right.date) - parseDateValue(left.date))
      .slice(0, limit),
    totalPages: posts?.totalPages ?? null,
  };
}

export async function getPostBySlug(
  slug: string,
  tags: string[] = ["wordpress", "wordpress:posts", "wordpress:article"],
): Promise<WordPressPost | null> {
  const posts = await fetchWordPressCollection<RawWordPressPost>(
    resolveWordPressOrigin(),
    WORDPRESS_CONTENT_TYPES.posts,
    {
      slug,
      per_page: 1,
      _embed: 1,
      _fields:
        "id,slug,date,modified,link,title,excerpt,content,featured_media,jetpack_featured_media_url,_embedded,_links",
      status: "publish",
    },
    mergeTags(tags, [`wordpress:post:${slug}`]),
  );

  const post = posts[0];

  return post ? normalizePost(post, tags) : null;
}

export interface WordPressSitemapPostEntry {
  slug: string;
  modified: string;
}

export async function getPostSitemapEntries(): Promise<WordPressSitemapPostEntry[]> {
  const posts = await fetchWordPressPagedCollection<RawWordPressPost>(
    resolveWordPressOrigin(),
    WORDPRESS_CONTENT_TYPES.posts,
    {
      per_page: 100,
      _fields: "slug,modified,date",
      orderby: "date",
      order: "desc",
      status: "publish",
    },
    mergeTags(["wordpress", "wordpress:posts", "wordpress:sitemap"]),
  );

  return posts
    .map((post) => ({
      slug: asString(post.slug) ?? "",
      modified: asString(post.modified) ?? asString(post.date) ?? "",
    }))
    .filter((post): post is WordPressSitemapPostEntry => post.slug.length > 0);
}

function readEventField(
  event: RawWordPressEvent,
  key: keyof NonNullable<RawWordPressEvent["acf"]>,
): unknown {
  if (event.acf && key in event.acf) {
    return event.acf[key];
  }

  if (event.meta && key in event.meta) {
    return event.meta[key];
  }

  return undefined;
}

function readEventTextField(
  event: RawWordPressEvent,
  key: keyof NonNullable<RawWordPressEvent["acf"]>,
): string | null {
  return readUnknownText(readEventField(event, key)) || null;
}

function readEventNumberField(
  event: RawWordPressEvent,
  key: keyof NonNullable<RawWordPressEvent["acf"]>,
): number | null {
  const value = readEventField(event, key);

  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && /^\d+$/.test(value.trim())) {
    const parsed = Number.parseInt(value.trim(), 10);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

function normalizeEventPoster(
  event: RawWordPressEvent,
  posterMap: Map<number, WordPressImage>,
): WordPressImage | null {
  const rawPoster = readEventField(event, "poster");

  if (typeof rawPoster === "number" && Number.isFinite(rawPoster)) {
    return posterMap.get(rawPoster) ?? null;
  }

  if (typeof rawPoster === "string") {
    const trimmed = rawPoster.trim();

    if (/^\d+$/.test(trimmed)) {
      const posterId = Number.parseInt(trimmed, 10);
      return posterMap.get(posterId) ?? null;
    }

    const poster = normalizeWordPressImage(trimmed, sanitizeTextField(event.title));

    if (poster) {
      return poster;
    }
  }

  return getEmbeddedMedia(event._embedded);
}

function normalizeEvent(event: RawWordPressEvent, posterMap: Map<number, WordPressImage>): WordPressEvent {
  const startDate = readEventTextField(event, "start_date") ?? readEventTextField(event, "event_date") ?? event.date;
  const endDate =
    readEventTextField(event, "end_date") ??
    readEventTextField(event, "event_end_time") ??
    startDate;
  const registrationUrl =
    readEventTextField(event, "registration_link") ??
    readEventTextField(event, "event_registration_url");

  return {
    id: event.id,
    slug: event.slug,
    title: sanitizeTextField(event.title),
    excerpt: sanitizeTextField(event.excerpt) || "Event details will be published here once the CMS entry is configured.",
    content: readRenderedHtml(event.content),
    url: asString(event.link) ?? "",
    startDate,
    endDate,
    eventMode: readEventTextField(event, "event_mode"),
    venueName: readEventTextField(event, "venue_name"),
    address:
      readEventTextField(event, "address") ??
      readEventTextField(event, "event_location"),
    status: readEventTextField(event, "status"),
    capacity: readEventNumberField(event, "capacity"),
    ticketPrice: readEventTextField(event, "ticket_price"),
    category: normalizeEventCategory(readEventTextField(event, "category")),
    registrationUrl,
    registrationLabel:
      readEventTextField(event, "event_registration_label") ??
      (registrationUrl ? "Register" : null),
    poster: normalizeEventPoster(event, posterMap),
  };
}

async function fetchWordPressMediaByIds(
  ids: number[],
  tags: string[],
): Promise<Map<number, WordPressImage>> {
  const uniqueIds = Array.from(new Set(ids.filter((id) => Number.isFinite(id) && id > 0)));
  const posterMap = new Map<number, WordPressImage>();

  if (uniqueIds.length === 0) {
    return posterMap;
  }

  const chunkSize = 100;

  for (let index = 0; index < uniqueIds.length; index += chunkSize) {
    const mediaIds = uniqueIds.slice(index, index + chunkSize);
    const mediaItems = await fetchWordPressCollection<RawWordPressMedia>(
      resolveWordPressOrigin(),
      "media",
      {
        include: mediaIds.map((id) => String(id)),
        per_page: Math.max(mediaIds.length, 1),
        _fields: "id,source_url,alt_text,caption,title,media_details",
      },
      mergeTags(tags, ["wordpress:media"]),
    );

    for (const media of mediaItems) {
      const normalized = normalizeMedia(media);
      if (normalized) {
        posterMap.set(normalized.id, normalized);
      }
    }
  }

  return posterMap;
}

async function normalizeEvents(events: RawWordPressEvent[], tags: string[]): Promise<WordPressEvent[]> {
  const posterIds = events
    .map((event) => readEventNumberField(event, "poster"))
    .filter((value): value is number => typeof value === "number" && value > 0);
  const posterMap = await fetchWordPressMediaByIds(posterIds, tags);

  return events.map((event) => normalizeEvent(event, posterMap));
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
            url: rewriteWordPressImageUrl(directImageUrl),
            alt: directImageAlt ?? sanitizeTextField(item.title),
            caption: readGalleryField(item, "gallery_caption"),
            width: null,
            height: null,
          }
        : null),
  };
}

async function fetchWordPressCollectionPage<T>(
  origin: URL | null,
  endpoint: string,
  searchParams: Record<string, string | number | boolean | string[] | undefined>,
  tags: string[],
): Promise<{ items: T[]; totalPages: number | null } | null> {
  const url = buildWordPressUrlFromOrigin(origin, endpoint, searchParams);

  if (!url) {
    return null;
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
      return null;
    }

    const payload = (await response.json()) as unknown;

    if (!Array.isArray(payload)) {
      return null;
    }

    const totalPagesHeader = response.headers.get("x-wp-totalpages");
    const totalPages = totalPagesHeader ? Number.parseInt(totalPagesHeader, 10) : null;

    return {
      items: payload as T[],
      totalPages: totalPages && Number.isFinite(totalPages) ? totalPages : null,
    };
  } catch {
    return null;
  }
}

async function fetchWordPressCollection<T>(
  origin: URL | null,
  endpoint: string,
  searchParams: Record<string, string | number | boolean | string[] | undefined>,
  tags: string[],
): Promise<T[]> {
  const page = await fetchWordPressCollectionPage<T>(origin, endpoint, searchParams, tags);

  return page?.items ?? [];
}

async function fetchWordPressPagedCollection<T>(
  origin: URL | null,
  endpoint: string,
  searchParams: Record<string, string | number | boolean | string[] | undefined>,
  tags: string[],
): Promise<T[]> {
  const perPageValue = searchParams.per_page;
  const perPage =
    typeof perPageValue === "number" && Number.isFinite(perPageValue) && perPageValue > 0
      ? perPageValue
      : 100;
  const results: T[] = [];
  const maxPages = 20;

  for (let page = 1; page <= maxPages; page += 1) {
    const collectionPage = await fetchWordPressCollectionPage<T>(
      origin,
      endpoint,
      {
        ...searchParams,
        per_page: perPage,
        page,
      },
      tags,
    );

    if (!collectionPage) {
      return [];
    }

    if (collectionPage.items.length === 0) {
      break;
    }

    results.push(...collectionPage.items);

    if (collectionPage.totalPages !== null) {
      if (page >= collectionPage.totalPages) {
        break;
      }
      continue;
    }

    if (collectionPage.items.length < perPage) {
      break;
    }
  }

  return results;
}

export async function getLatestPosts(limit = 3): Promise<WordPressPost[]> {
  const posts = await getPostsPage(1, limit, ["wordpress", "wordpress:posts", "wordpress:homepage"]);

  return posts.items.slice(0, limit);
}

export async function getUpcomingEvents(limit = 3): Promise<WordPressEvent[]> {
  const events = await fetchWordPressPagedCollection<RawWordPressEvent>(
    resolveWordPressOrigin(),
    WORDPRESS_CONTENT_TYPES.events,
    {
      per_page: 100,
      _embed: 1,
      _fields:
        "id,slug,date,modified,link,title,excerpt,content,featured_media,acf,meta,_embedded,_links",
      orderby: "date",
      order: "desc",
      status: "publish",
    },
    mergeTags(["wordpress", "wordpress:events", "wordpress:homepage"]),
  );

  const normalized = await normalizeEvents(events, ["wordpress", "wordpress:events", "wordpress:homepage"]);
  const sorted = sortEventsByStartDateAsc(normalized);
  const upcoming = sorted.filter(isUpcomingEvent);

  return (upcoming.length > 0 ? upcoming : sorted).slice(0, limit);
}

export async function getEvents(tags: string[] = ["wordpress", "wordpress:events"]): Promise<WordPressEvent[]> {
  const events = await fetchWordPressPagedCollection<RawWordPressEvent>(
    resolveWordPressOrigin(),
    WORDPRESS_CONTENT_TYPES.events,
    {
      per_page: 100,
      _embed: 1,
      _fields:
        "id,slug,date,modified,link,title,excerpt,content,featured_media,acf,meta,_embedded,_links",
      orderby: "date",
      order: "desc",
      status: "publish",
    },
    mergeTags(tags),
  );

  const normalized = await normalizeEvents(events, tags);

  return sortEventsByStartDateDesc(normalized);
}

export async function getEventBySlug(
  slug: string,
  tags: string[] = ["wordpress", "wordpress:events", "wordpress:event"],
): Promise<WordPressEvent | null> {
  const events = await fetchWordPressCollection<RawWordPressEvent>(
    resolveWordPressOrigin(),
    WORDPRESS_CONTENT_TYPES.events,
    {
      slug,
      per_page: 1,
      _embed: 1,
      _fields:
        "id,slug,date,modified,link,title,excerpt,content,featured_media,acf,meta,_embedded,_links",
      status: "publish",
    },
    mergeTags(tags, [`wordpress:event:${slug}`]),
  );

  const event = events[0];

  if (!event) {
    return null;
  }

  const normalized = await normalizeEvents([event], tags);
  return normalized[0] ?? null;
}

export async function getEventSitemapEntries(): Promise<Array<{ slug: string; modified: string }>> {
  const events = await fetchWordPressPagedCollection<RawWordPressEvent>(
    resolveWordPressOrigin(),
    WORDPRESS_CONTENT_TYPES.events,
    {
      per_page: 100,
      _fields: "slug,modified,date",
      orderby: "date",
      order: "desc",
      status: "publish",
    },
    mergeTags(["wordpress", "wordpress:events", "wordpress:sitemap"]),
  );

  return events
    .map((event) => ({
      slug: asString(event.slug) ?? "",
      modified: asString(event.modified) ?? asString(event.date) ?? "",
    }))
    .filter((event): event is { slug: string; modified: string } => event.slug.length > 0);
}

export async function getGalleryHighlights(limit = 3): Promise<WordPressGalleryItem[]> {
  const galleryItems = await fetchWordPressCollection<RawWordPressGalleryItem>(
    resolveWordPressOrigin(),
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

export async function getStartupGraduates(): Promise<WordPressStartup[]> {
  const startupEntries = await fetchWordPressPagedCollection<RawWordPressStartup>(
    resolveWordPressDomainOrigin(),
    WORDPRESS_CONTENT_TYPES.startups,
    {
      per_page: 100,
      _embed: 1,
      acf_format: "standard",
      _fields: "id,slug,date,modified,link,title,featured_media,acf,meta,_embedded",
      orderby: "date",
      order: "desc",
    },
    mergeTags(["wordpress", "wordpress:startups", "wordpress:homepage"]),
  );

  return startupEntries.map(normalizeStartup).sort((left, right) =>
    left.startupName.localeCompare(right.startupName),
  );
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
