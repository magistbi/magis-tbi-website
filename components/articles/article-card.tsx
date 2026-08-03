import Link from "next/link";

import { formatArticleDate, getArticleAuthorName, getArticlePrimaryCategory } from "@/lib/articles";
import { cn } from "@/lib/utils";
import type { WordPressPost } from "@/types/wordpress";

type ArticleCardProps = {
  post: WordPressPost;
  href: string;
  featured?: boolean;
  className?: string;
};

function ArticleMedia({
  post,
  featured,
}: {
  post: WordPressPost;
  featured: boolean;
}) {
  const primaryCategory = getArticlePrimaryCategory(post);
  const image = post.featuredMedia;

  if (image) {
    return (
      <div
        className={cn(
          "relative overflow-hidden bg-[linear-gradient(160deg,#dae2ff_0%,#eff4ff_35%,#ffffff_100%)]",
          featured
            ? "aspect-4/3 min-h-72 lg:aspect-auto lg:h-auto lg:self-stretch lg:w-[58%] lg:min-h-0"
            : "aspect-16/10",
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,199,44,0.28),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(0,26,72,0.12),transparent_40%)]" />
        <img
          alt={image.alt || post.title}
          className="absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 group-hover:opacity-95"
          decoding="async"
          loading={featured ? "eager" : "lazy"}
          src={image.url}
        />
        <div className="absolute inset-0 bg-linear-to-t from-primary/35 via-primary/8 to-transparent" />
        <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-white/92 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-primary shadow-sm backdrop-blur">
          {primaryCategory}
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[linear-gradient(160deg,#dae2ff_0%,#eff4ff_35%,#ffffff_100%)]",
        featured ? "aspect-4/3 lg:h-full lg:w-[58%] lg:aspect-auto" : "aspect-16/10",
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,199,44,0.38),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(0,26,72,0.16),transparent_40%)]" />
      <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-5">
        <span className="inline-flex w-fit items-center rounded-full bg-white/90 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-primary shadow-sm backdrop-blur">
          {primaryCategory}
        </span>
        <div className="max-w-56 space-y-2">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/60">
            WordPress article
          </div>
          <div className="text-2xl font-semibold leading-none text-primary/20 sm:text-4xl">
            {post.title.slice(0, 1).toUpperCase() || "M"}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ArticleCard({ post, href, featured = false, className }: ArticleCardProps) {
  const authorName = getArticleAuthorName(post);
  const formattedDate = formatArticleDate(post.date) || "Recently published";

  return (
    <article
      className={cn(
        "group h-full overflow-hidden rounded-[1.75rem] border border-outline-variant/70 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
        featured && "lg:min-h-105",
        className,
      )}
    >
      <Link
        aria-label={post.title}
        className={cn(
          "flex h-full flex-col focus-visible:outline-none",
          featured && "lg:flex-row lg:items-stretch",
        )}
        href={href}
      >
        <ArticleMedia featured={featured} post={post} />
        <div
          className={cn(
            "flex flex-1 flex-col gap-4 p-6 sm:p-8",
            featured && "justify-center lg:w-[42%] lg:p-10",
          )}
        >
          <div className="flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-secondary">
            <span>{featured ? "Featured article" : "Article"}</span>
            <span aria-hidden="true" className="text-outline-variant">
              ·
            </span>
            <span>{getArticlePrimaryCategory(post)}</span>
          </div>
          <h2
            className={cn(
              "font-heading text-primary transition-colors group-hover:text-primary/80",
              featured
                ? "max-w-2xl text-[clamp(1.8rem,4vw,3.35rem)] leading-[1.05]"
                : "text-[1.35rem] leading-tight sm:text-[1.55rem]",
            )}
          >
            {post.title}
          </h2>
          <p
            className={cn(
              "text-on-surface-variant",
              featured ? "max-w-2xl text-base leading-7 sm:text-lg" : "line-clamp-3 text-sm leading-6",
            )}
          >
            {post.excerpt}
          </p>
          <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-on-surface-variant">
            <span>{authorName}</span>
            <span aria-hidden="true">•</span>
            <time dateTime={post.date}>{formattedDate}</time>
            {featured ? null : (
              <>
                <span aria-hidden="true">•</span>
                <span>Read article</span>
              </>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
