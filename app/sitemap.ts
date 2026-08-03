import type { MetadataRoute } from "next";

import { getArticlesPageHref, getArticleHref } from "@/lib/articles";
import { getSiteUrl } from "@/lib/site";
import { getPostSitemapEntries } from "@/lib/wordpress";

export const revalidate = 300;

function parseDate(value: string): Date {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const posts = await getPostSitemapEntries();

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
    ...posts.map((post) => ({
      url: getSiteUrl(getArticleHref({ slug: post.slug })),
      lastModified: parseDate(post.modified),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
