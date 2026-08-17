import type { WordPressPost } from "@/types/wordpress";

const ARTICLES_BASE_PATH = "/articles";

function normalizePageNumber(page: number): number {
  if (!Number.isFinite(page) || page < 1) {
    return 1;
  }

  return Math.floor(page);
}

export function getArticleHref(post: Pick<WordPressPost, "slug">): string {
  return `${ARTICLES_BASE_PATH}/${encodeURIComponent(post.slug)}`;
}

export function getArticlesPageHref(page: number): string {
  const normalizedPage = normalizePageNumber(page);

  return normalizedPage <= 1 ? ARTICLES_BASE_PATH : `${ARTICLES_BASE_PATH}?page=${normalizedPage}`;
}

export function formatArticleDate(value: string, locale = "en-US"): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat(locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function stripArticleMarkup(value: string): string {
  return value.replace(/<[^>]*>/g, " ");
}

export function getArticleReadTimeLabel(content: string, wordsPerMinute = 200): string {
  const cleanedContent = stripArticleMarkup(content).trim();
  const wordCount = cleanedContent ? cleanedContent.split(/\s+/).length : 0;
  const minutes = Math.max(1, Math.round(wordCount / wordsPerMinute));

  return `${minutes} min read`;
}

export function getArticlePrimaryCategory(post: WordPressPost): string {
  return post.categories[0]?.name ?? "News";
}

export function getArticleAuthorName(post: WordPressPost): string {
  return post.author?.name ?? "MAGIS TBI";
}
