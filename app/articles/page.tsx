import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

import { ArticleCard } from "@/components/articles/article-card";
import { MotionSurface } from "@/components/motion/motion-surface";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";
import { StructuredData } from "@/components/structured-data";
import { getArticleHref, getArticlesPageHref } from "@/lib/articles";
import { getSiteUrl } from "@/lib/site";
import { getPostsPage } from "@/lib/wordpress";

const ARTICLES_PAGE_SIZE = 6;

type SearchParamsValue = string | string[] | undefined;
type SearchParamsInput = Record<string, SearchParamsValue> | Promise<Record<string, SearchParamsValue>>;

type ArticlesPageProps = {
  searchParams?: SearchParamsInput;
};

export const revalidate = 300;

function parsePageParam(value: SearchParamsValue): number {
  const rawValue = Array.isArray(value) ? value[0] : value;

  if (!rawValue) {
    return 1;
  }

  const parsed = Number.parseInt(rawValue, 10);

  if (!Number.isFinite(parsed) || parsed < 1) {
    return 1;
  }

  return parsed;
}

function normalizeSearchParams(
  searchParams: SearchParamsInput | undefined,
): Promise<Record<string, SearchParamsValue>> {
  return Promise.resolve(searchParams ?? {});
}

function buildArticlesDescription(currentPage: number): string {
  const baseDescription =
    "Browse the latest ADNU MAGIS TBI articles, announcements, and stories from the WordPress archive.";

  if (currentPage <= 1) {
    return baseDescription;
  }

  return `Browse page ${currentPage} of the latest ADNU MAGIS TBI articles, announcements, and stories from the WordPress archive.`;
}

function buildArticlesJsonLd(
  posts: Awaited<ReturnType<typeof getPostsPage>>["items"],
  currentPage: number,
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: currentPage > 1 ? `Articles - Page ${currentPage}` : "Articles",
    url: getSiteUrl(getArticlesPageHref(currentPage)),
    mainEntity: {
      "@type": "ItemList",
      itemListOrder: "http://schema.org/ItemListOrderDescending",
      numberOfItems: posts.length,
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: getSiteUrl(getArticleHref(post)),
        name: post.title,
      })),
    },
  };
}

export async function generateMetadata({ searchParams }: ArticlesPageProps): Promise<Metadata> {
  const resolvedSearchParams = await normalizeSearchParams(searchParams);
  const currentPage = parsePageParam(resolvedSearchParams.page);
  const title = currentPage > 1 ? `Articles - Page ${currentPage}` : "Articles";
  const description = buildArticlesDescription(currentPage);
  const canonicalPath = getArticlesPageHref(currentPage);

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

function buildPaginationItems(currentPage: number, totalPages: number): Array<number | "ellipsis"> {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const items: Array<number | "ellipsis"> = [1];
  const windowStart = Math.max(2, currentPage - 1);
  const windowEnd = Math.min(totalPages - 1, currentPage + 1);

  if (windowStart > 2) {
    items.push("ellipsis");
  }

  for (let page = windowStart; page <= windowEnd; page += 1) {
    items.push(page);
  }

  if (windowEnd < totalPages - 1) {
    items.push("ellipsis");
  }

  items.push(totalPages);
  return items;
}

function PaginationLink({
  href,
  children,
  active = false,
  disabled = false,
}: {
  href: string;
  children: ReactNode;
  active?: boolean;
  disabled?: boolean;
}) {
  const className = [
    "inline-flex h-11 min-w-11 items-center justify-center rounded-full border px-4 text-sm font-semibold transition-all",
    active
      ? "border-primary bg-primary text-white shadow-sm"
      : "border-outline-variant bg-white text-on-surface-variant hover:border-primary hover:text-primary",
    disabled ? "cursor-not-allowed opacity-40" : "",
  ].join(" ");

  if (disabled) {
    return (
      <span aria-disabled="true" className={className}>
        {children}
      </span>
    );
  }

  return (
    <Link
      aria-current={active ? "page" : undefined}
      className={className}
      href={href}
    >
      {children}
    </Link>
  );
}

export default async function ArticlesPage({ searchParams }: ArticlesPageProps) {
  const resolvedSearchParams = await normalizeSearchParams(searchParams);
  const currentPage = parsePageParam(resolvedSearchParams.page);
  const { items: posts, totalPages } = await getPostsPage(currentPage, ARTICLES_PAGE_SIZE, [
    "wordpress",
    "wordpress:posts",
    "wordpress:articles",
  ]);

  const featuredPost = posts[0] ?? null;
  const archivePosts = featuredPost ? posts.slice(1) : [];
  const paginationItems =
    totalPages && totalPages > 1 ? buildPaginationItems(currentPage, totalPages) : [];

  return (
    <main className="relative overflow-hidden">
      {posts.length > 0 ? (
        <StructuredData id="articles-jsonld" data={buildArticlesJsonLd(posts, currentPage)} />
      ) : null}
      <div className="absolute inset-x-0 top-0 -z-10 h-128 bg-[radial-gradient(circle_at_top_left,rgba(255,199,44,0.18),transparent_35%),radial-gradient(circle_at_top_right,rgba(0,26,72,0.14),transparent_34%),linear-gradient(180deg,rgba(229,238,255,0.92),rgba(248,249,255,0))]" />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        {featuredPost ? (
          <section className="space-y-5">
            <Reveal as="div" className="flex flex-wrap items-end justify-between gap-3" direction="up">
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
                  Featured story
                </p>
                <h1 className="font-heading text-2xl tracking-[-0.03em] text-primary sm:text-3xl">
                  Latest article
                </h1>
              </div>
              {totalPages ? (
                <p className="text-sm text-on-surface-variant">
                  Page {currentPage} of {totalPages}
                </p>
              ) : null}
            </Reveal>

            <Reveal as="div" direction="up" tone="strong">
              <ArticleCard featured href={getArticleHref(featuredPost)} post={featuredPost} />
            </Reveal>
          </section>
        ) : null}

        <section className="space-y-5">
          <Reveal as="div" className="flex flex-wrap items-center justify-between gap-3" direction="up">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
                Archive
              </p>
              <h2 className="font-heading text-2xl tracking-[-0.03em] text-primary sm:text-3xl">
                More articles
              </h2>
            </div>
            {posts.length > 0 ? (
              <p className="text-sm text-on-surface-variant">
                Showing {archivePosts.length} additional article{archivePosts.length === 1 ? "" : "s"}
              </p>
            ) : null}
          </Reveal>

          {posts.length > 0 ? (
            archivePosts.length > 0 ? (
              <StaggerGroup as="div" className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {archivePosts.map((post) => (
                  <StaggerItem key={post.id} as="div">
                    <ArticleCard href={getArticleHref(post)} post={post} />
                  </StaggerItem>
                ))}
              </StaggerGroup>
            ) : (
              <Reveal as="div" className="rounded-[1.75rem] border border-dashed border-outline-variant/70 bg-white p-8 text-center shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary">
                  No additional stories
                </p>
                <p className="mt-3 text-base leading-7 text-on-surface-variant">
                  This page only has one post right now. More articles will appear here as the CMS
                  fills out.
                </p>
              </Reveal>
            )
          ) : (
            <Reveal as="div" className="rounded-[1.75rem] border border-dashed border-outline-variant/70 bg-white p-8 text-center shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary">
                No articles yet
              </p>
              <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-on-surface-variant">
                The WordPress archive did not return any posts. Once content is published, the
                archive grid will populate automatically without any code changes.
              </p>
              <div className="mt-6">
                <MotionSurface as="div" className="inline-flex" tone="button">
                  <Link
                    className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
                    href="/"
                  >
                    Back to home
                  </Link>
                </MotionSurface>
              </div>
            </Reveal>
          )}
        </section>

        {paginationItems.length > 0 && totalPages ? (
          <Reveal
            as="nav"
            aria-label="Articles pagination"
            className="flex flex-wrap items-center justify-center gap-2 pt-2"
            direction="up"
          >
            <PaginationLink
              href={getArticlesPageHref(currentPage - 1)}
              disabled={currentPage <= 1}
            >
              Previous
            </PaginationLink>

            {paginationItems.map((item, index) =>
              item === "ellipsis" ? (
                <span
                  key={`ellipsis-${index}`}
                  aria-hidden="true"
                  className="inline-flex h-11 min-w-11 items-center justify-center rounded-full px-2 text-sm font-semibold text-on-surface-variant"
                >
                  …
                </span>
              ) : (
                <PaginationLink
                  key={item}
                  active={item === currentPage}
                  href={getArticlesPageHref(item)}
                >
                  {item}
                </PaginationLink>
              ),
            )}

            <PaginationLink
              href={getArticlesPageHref(currentPage + 1)}
              disabled={currentPage >= totalPages}
            >
              Next
            </PaginationLink>
          </Reveal>
        ) : null}
      </div>
    </main>
  );
}
