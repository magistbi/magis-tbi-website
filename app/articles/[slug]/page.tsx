import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";

import { MotionSurface } from "@/components/motion/motion-surface";
import { Reveal } from "@/components/motion/reveal";
import { StructuredData } from "@/components/structured-data";
import {
  formatArticleDate,
  getArticleAuthorName,
  getArticlePrimaryCategory,
  getArticleReadTimeLabel,
} from "@/lib/articles";
import { articlesHref, homeHref } from "@/lib/site-links";
import { getSiteUrl } from "@/lib/site";
import { cn } from "@/lib/utils";
import { getPostBySlug } from "@/lib/wordpress";

type ArticlePageParams = {
  slug: string;
};

type ArticlePageProps = {
  params: Promise<ArticlePageParams>;
};

const loadArticle = cache(async (slug: string) =>
  getPostBySlug(slug, ["wordpress", "wordpress:posts", "wordpress:articles"]),
);

function resolveParams(params: ArticlePageProps["params"]): Promise<ArticlePageParams> {
  return Promise.resolve(params);
}

function buildArticleDescription(excerpt: string, title: string): string {
  if (excerpt) {
    return excerpt;
  }

  return `Read ${title} on ADNU MAGIS TBI.`;
}

function buildArticleJsonLd({
  post,
  authorName,
  categoryName,
  heroImage,
  description,
}: {
  post: Awaited<ReturnType<typeof loadArticle>>;
  authorName: string;
  categoryName: string;
  heroImage: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post?.title ?? "",
    description,
    datePublished: post?.date ?? "",
    dateModified: post?.modified ?? "",
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "ADNU MAGIS TBI",
      logo: {
        "@type": "ImageObject",
        url: getSiteUrl("/magis-logo.png"),
      },
    },
    articleSection: categoryName,
    mainEntityOfPage: getSiteUrl(`/articles/${encodeURIComponent(post?.slug ?? "")}`),
    image: [heroImage],
  };
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await resolveParams(params);

  if (!slug) {
    return {
      title: "Article not found",
      description: "The requested article could not be found in the archive.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const post = await loadArticle(slug);

  if (!post) {
    return {
      title: "Article not found",
      description: "The requested article could not be found in the archive.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonicalPath = `/articles/${encodeURIComponent(post.slug)}`;
  const heroImage = post.featuredMedia?.url ?? getSiteUrl("/home-of-magis.jpg");

  return {
    title: post.title,
    description: buildArticleDescription(post.excerpt, post.title),
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: post.title,
      description: buildArticleDescription(post.excerpt, post.title),
      url: canonicalPath,
      siteName: "ADNU MAGIS TBI",
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.modified,
      authors: [post.author?.name ?? "MAGIS TBI"],
      images: [
        {
          url: heroImage,
          width: post.featuredMedia?.width ?? 1600,
          height: post.featuredMedia?.height ?? 900,
          alt: post.featuredMedia?.alt || post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: buildArticleDescription(post.excerpt, post.title),
      images: [heroImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

function ArticleHeroMedia({
  imageUrl,
  imageAlt,
  title,
}: {
  imageUrl: string | null;
  imageAlt: string;
  title: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-outline-variant/60 bg-[linear-gradient(160deg,#dae2ff_0%,#eff4ff_35%,#ffffff_100%)] shadow-sm">
      <div className="relative aspect-16/10 min-h-72 overflow-hidden sm:aspect-3/2 lg:aspect-video lg:min-h-112">
        {imageUrl ? (
          <img
            alt={imageAlt}
            className="absolute inset-0 h-full w-full object-cover object-center"
            decoding="async"
            loading="eager"
            src={imageUrl}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(145deg,#dbe4ff_0%,#eff4ff_45%,#ffffff_100%)] px-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,199,44,0.28),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(0,26,72,0.12),transparent_42%)]" />
            <div className="relative max-w-sm space-y-3 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-outline-variant/50 bg-white/80 text-2xl font-semibold tracking-[-0.04em] text-primary shadow-sm backdrop-blur">
                {title.slice(0, 1).toUpperCase() || "A"}
              </div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary/55">
                Feature image unavailable
              </p>
              <p className="text-sm leading-6 text-primary/70">
                The article still reads cleanly without a hero image.
              </p>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,199,44,0.22),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(0,26,72,0.14),transparent_40%),linear-gradient(180deg,rgba(0,26,72,0.06),rgba(0,26,72,0.24))]" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-primary/30 to-transparent" />
      </div>
    </div>
  );
}

export const revalidate = 300;

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const { slug } = await resolveParams(params);

  if (!slug) {
    notFound();
  }

  const post = await loadArticle(slug);

  if (!post) {
    notFound();
  }

  const authorName = getArticleAuthorName(post);
  const categoryName = getArticlePrimaryCategory(post);
  const formattedDate = formatArticleDate(post.date) || "Recently published";
  const readTimeLabel = getArticleReadTimeLabel(post.content);
  const heroImage = post.featuredMedia?.url ?? null;
  const heroImageAlt = post.featuredMedia?.alt || post.title;
  const hasContent = post.content.trim().length > 0;
  const heroImageForSchema = heroImage ?? getSiteUrl("/home-of-magis.jpg");
  const articleDescription = buildArticleDescription(post.excerpt, post.title);

  return (
    <main className="relative overflow-hidden">
      <StructuredData
        id={`article-jsonld-${post.id}`}
        data={buildArticleJsonLd({
          post,
          authorName,
          categoryName,
          heroImage: heroImageForSchema,
          description: articleDescription,
        })}
      />
      <div className="absolute inset-x-0 top-0 -z-10 h-128 bg-[radial-gradient(circle_at_top_left,rgba(255,199,44,0.16),transparent_35%),radial-gradient(circle_at_top_right,rgba(0,26,72,0.12),transparent_34%),linear-gradient(180deg,rgba(229,238,255,0.92),rgba(248,249,255,0))]" />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <Reveal as="div" direction="up" tone="calm" trigger="mount">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-on-surface-variant">
              <Link className="transition-colors hover:text-primary" href={homeHref}>
                Home
              </Link>
              <span aria-hidden="true" className="text-outline-variant">
                /
              </span>
              <Link className="transition-colors hover:text-primary" href={articlesHref}>
                Articles
              </Link>
              <span aria-hidden="true" className="text-outline-variant">
                /
              </span>
              <span className="font-medium text-primary">{categoryName}</span>
            </nav>

            <MotionSurface as="div" tone="subtle">
              <Link
                className="inline-flex items-center gap-2 rounded-full border border-outline-variant/70 bg-white px-4 py-2 text-sm font-semibold text-primary shadow-sm transition-colors hover:border-primary hover:text-secondary"
                href={articlesHref}
              >
                <span aria-hidden="true">←</span>
                Back to archive
              </Link>
            </MotionSurface>
          </div>
        </Reveal>

        <article className="overflow-hidden rounded-[2rem] border border-outline-variant/70 bg-surface-container-lowest shadow-sm">
          <Reveal
            as="header"
            className="border-b border-outline-variant/60 px-6 py-7 sm:px-8 sm:py-8 lg:px-10 lg:py-10"
            direction="up"
            tone="calm"
            trigger="mount"
          >
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-secondary">
                <span className="inline-flex items-center rounded-full bg-secondary-container px-3 py-1 text-[0.72rem] font-semibold tracking-[0.18em] text-on-secondary-container">
                  {categoryName}
                </span>
                <span aria-hidden="true" className="text-outline-variant">
                  ·
                </span>
              </div>

              <h1 className="mt-4 font-heading text-[clamp(2.4rem,5vw,4.6rem)] leading-[0.96] tracking-tighter text-primary sm:leading-[0.94]">
                {post.title}
              </h1>

              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3 text-sm text-on-surface-variant">
                <div className="flex items-center gap-3">
                  {post.author?.avatarUrl ? (
                    <img
                      alt={authorName}
                      className="h-11 w-11 rounded-full border border-outline-variant/50 object-cover"
                      decoding="async"
                      loading="lazy"
                      src={post.author.avatarUrl}
                    />
                  ) : (
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-outline-variant/50 bg-primary/10 text-sm font-semibold text-primary">
                      {authorName.slice(0, 1).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-secondary">
                      Written by
                    </p>
                    <p className="font-semibold text-primary">{authorName}</p>
                  </div>
                </div>
                <span aria-hidden="true" className="text-outline-variant">
                  ·
                </span>
                <time dateTime={post.date}>{formattedDate}</time>
                <span aria-hidden="true" className="text-outline-variant">
                  ·
                </span>
                <span>{readTimeLabel}</span>
              </div>
            </div>
          </Reveal>

          <div className="px-4 pt-4 sm:px-6 lg:px-10 lg:pt-6">
            <Reveal as="div" direction="right" tone="calm" trigger="mount">
              <ArticleHeroMedia imageAlt={heroImageAlt} imageUrl={heroImage} title={post.title} />
            </Reveal>
          </div>

          <div className="px-6 py-8 sm:px-8 lg:px-10 lg:py-12">
            <Reveal
              as="div"
              className={cn("mx-auto max-w-[72ch]", !hasContent && "space-y-4")}
              direction="up"
              tone="calm"
            >
              {hasContent ? (
                <div className="article-content" dangerouslySetInnerHTML={{ __html: post.content }} />
              ) : (
                <div className="rounded-2xl border border-dashed border-outline-variant/70 bg-surface-container-low px-5 py-6 text-on-surface-variant">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-secondary">
                    Article body unavailable
                  </p>
                  <p className="mt-3 text-base leading-7">
                    The WordPress entry for this article does not currently include a full body.
                    The excerpt above remains available as the published summary.
                  </p>
                </div>
              )}
            </Reveal>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-outline-variant/60 pt-6">
              <p className="text-sm leading-6 text-on-surface-variant">
                Continue browsing the archive for more stories from ADNU MAGIS TBI.
              </p>
              <MotionSurface as="div" tone="subtle">
                <Link
                  className="inline-flex items-center gap-2 rounded-full border border-outline-variant/70 bg-white px-4 py-2 text-sm font-semibold text-primary shadow-sm transition-colors hover:border-primary hover:text-secondary"
                  href={articlesHref}
                >
                  Back to archive
                </Link>
              </MotionSurface>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
