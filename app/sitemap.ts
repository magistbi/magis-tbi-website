import type { MetadataRoute } from "next";

import { getArticlesPageHref, getArticleHref } from "@/lib/articles";
import { getEventHref, getEventsPageHref, getPastEventsPageHref } from "@/lib/events";
import { getSiteUrl } from "@/lib/site";
import { igniteGraduatesHref } from "@/lib/site-links";
import { getEventSitemapEntries, getPostSitemapEntries } from "@/lib/wordpress";

export const revalidate = 300;

function parseDate(value: string): Date {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const posts = await getPostSitemapEntries();
  const events = await getEventSitemapEntries();

  return [
    {
      url: getSiteUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: getSiteUrl(getArticlesPageHref(1)),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: getSiteUrl(getEventsPageHref(null)),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: getSiteUrl(getPastEventsPageHref(null)),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: getSiteUrl(igniteGraduatesHref),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: getSiteUrl(getArticleHref({ slug: post.slug })),
      lastModified: parseDate(post.modified),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...events.map((event) => ({
      url: getSiteUrl(getEventHref({ slug: event.slug })),
      lastModified: parseDate(event.modified),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
