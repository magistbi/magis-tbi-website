import Link from "next/link";

import { homeHref, igniteGraduatesHref } from "@/lib/site-links";

export default function StartupNotFound() {
  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(circle_at_top_left,rgba(255,199,44,0.16),transparent_35%),radial-gradient(circle_at_top_right,rgba(0,26,72,0.12),transparent_34%),linear-gradient(180deg,rgba(229,238,255,0.92),rgba(248,249,255,0))]" />

      <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
        <div className="w-full rounded-[2rem] border border-dashed border-outline-variant/70 bg-white px-6 py-10 shadow-sm sm:px-8 sm:py-12">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
            Startup not found
          </p>
          <h1 className="mt-3 font-heading text-3xl tracking-[-0.03em] text-primary sm:text-4xl">
            The requested startup profile is unavailable
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-on-surface-variant sm:text-lg">
            The startup profile you asked for could not be resolved from WordPress. It may have
            been removed, renamed, or not published yet.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
              href={igniteGraduatesHref}
            >
              Back to startups
            </Link>
            <Link
              className="inline-flex items-center justify-center rounded-full border border-outline-variant bg-white px-5 py-3 text-sm font-semibold text-primary transition-colors hover:border-primary hover:text-secondary"
              href={homeHref}
            >
              Back home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
