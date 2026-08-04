import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";

import { MotionSurface } from "@/components/motion/motion-surface";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";
import { StructuredData } from "@/components/structured-data";
import { formatArticleDate, getArticleAuthorName, getArticlePrimaryCategory } from "@/lib/articles";
import { articlesHref } from "@/lib/site-links";
import { getSiteUrl } from "@/lib/site";
import { cn } from "@/lib/utils";
import { getPostBySlug } from "@/lib/wordpress";

type ArticlePageParams = {
  slug: string;
};

type ArticlePageProps = {
  params: ArticlePageParams | Promise<ArticlePageParams>;
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
  title,
  category,
  imageUrl,
  imageAlt,
}: {
  title: string;
  category: string;
  imageUrl: string | null;
  imageAlt: string;
}) {
  if (imageUrl) {
    return (
      <div className="relative min-h-80 overflow-hidden bg-[linear-gradient(160deg,#dae2ff_0%,#eff4ff_35%,#ffffff_100%)] lg:min-h-full">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,199,44,0.3),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(0,26,72,0.12),transparent_40%)]" />
        <img
          alt={imageAlt}
          className="absolute inset-0 h-full w-full object-cover object-center"
          decoding="async"
          loading="eager"
          src={imageUrl}
        />
        <div className="absolute inset-0 bg-linear-to-t from-primary/45 via-primary/8 to-transparent" />
        <span className="absolute left-5 top-5 inline-flex items-center rounded-full bg-white/92 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-primary shadow-sm backdrop-blur">
          {category}
        </span>
      </div>
    );
  }

  return (
    <div className="relative min-h-80 overflow-hidden bg-[linear-gradient(160deg,#dae2ff_0%,#eff4ff_35%,#ffffff_100%)] lg:min-h-full">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,199,44,0.38),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(0,26,72,0.16),transparent_40%)]" />
      <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6">
        <span className="inline-flex w-fit items-center rounded-full bg-white/90 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-primary shadow-sm backdrop-blur">
          {category}
        </span>
        <div className="max-w-sm space-y-2">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/60">
            WordPress article
          </div>
          <div className="text-3xl font-semibold leading-none text-primary/20 sm:text-5xl">
            {title.slice(0, 1).toUpperCase() || "A"}
          </div>
        </div>
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

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <Reveal as="div" direction="up" tone="calm" trigger="mount">
          <MotionSurface as="div" className="inline-flex" tone="subtle">
            <Link
              className="inline-flex w-fit items-center gap-2 rounded-full border border-outline-variant/70 bg-white px-4 py-2 text-sm font-semibold text-primary shadow-sm transition-colors hover:border-primary hover:text-secondary"
              href={articlesHref}
            >
              <span aria-hidden="true">←</span>
              Back to archive
            </Link>
          </MotionSurface>
        </Reveal>

        <article className="overflow-hidden rounded-[2rem] border border-outline-variant/70 bg-white shadow-sm">
          <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
            <StaggerGroup
              as="div"
              className="flex flex-col gap-6 p-6 sm:p-8 lg:p-10"
              tone="calm"
              trigger="mount"
            >
              <StaggerItem as="div" direction="up" tone="calm">
                <div className="flex flex-wrap items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-secondary">
                  <span>{categoryName}</span>
                  <span aria-hidden="true" className="text-outline-variant">
                    ·
                  </span>
                  <time dateTime={post.date}>{formattedDate}</time>
                </div>
              </StaggerItem>

              <StaggerItem as="div" direction="up" tone="calm">
                <div className="space-y-4">
                  <h1 className="max-w-3xl font-heading text-[clamp(2.2rem,5vw,4.25rem)] leading-[1.02] tracking-[-0.04em] text-primary">
                    {post.title}
                  </h1>
                  <p className="max-w-3xl text-lg leading-8 text-on-surface-variant sm:text-xl">
                    {articleDescription}
                  </p>
                </div>
              </StaggerItem>

              <StaggerItem as="div" direction="up" tone="calm">
                <div className="flex flex-wrap items-center gap-4 border-t border-outline-variant/60 pt-5">
                  <div className="flex items-center gap-3">
                    {post.author?.avatarUrl ? (
                      <img
                        alt={authorName}
                        className="h-12 w-12 rounded-full border border-outline-variant/50 object-cover"
                        decoding="async"
                        loading="lazy"
                        src={post.author.avatarUrl}
                      />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-outline-variant/50 bg-primary/10 text-sm font-semibold text-primary">
                        {authorName.slice(0, 1).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
                        Written by
                      </p>
                      <p className="text-sm font-semibold text-primary">{authorName}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            </StaggerGroup>

            <Reveal as="div" className="lg:h-full" direction="right" tone="calm" trigger="mount">
              <ArticleHeroMedia
                category={categoryName}
                imageAlt={heroImageAlt}
                imageUrl={heroImage}
                title={post.title}
              />
            </Reveal>
          </div>

          <div className="border-t border-outline-variant/60 px-6 py-8 sm:px-8 lg:px-10">
            <Reveal as="div" className={cn("max-w-3xl", !hasContent && "space-y-4")} direction="up" tone="calm">
              {hasContent ? (
                <div
                  className="article-content"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              ) : (
                <div className="rounded-[1.5rem] border border-dashed border-outline-variant/70 bg-surface-container-low px-5 py-6 text-on-surface-variant">
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
          </div>
        </article>
      </div>
    </main>
  );
}
