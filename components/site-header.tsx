import Link from "next/link";

import { MotionSurface } from "@/components/motion/motion-surface";
import { Reveal } from "@/components/motion/reveal";
import { articlesHref, bookingUrl, eventsHref, facebookPageUrl, homeHref, igniteGraduatesHref, officeLogo } from "@/lib/site-links";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-outline-variant/70 bg-surface/95 shadow-[0_1px_0_rgba(11,28,48,0.04)] backdrop-blur-xl">
      <Reveal as="div" className="mx-auto w-full max-w-7xl" direction="down" tone="calm" trigger="mount">
        <div className="flex w-full flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
          <Link href={homeHref} className="flex min-w-0 items-center gap-3 sm:gap-4">
            <img
              alt="ADNU MAGIS TBI Logo"
              className="h-10 w-10 object-contain sm:h-11 sm:w-11"
              src={officeLogo}
            />
            <span className="min-w-0 whitespace-nowrap font-heading text-[18px] font-bold leading-none text-primary sm:text-[22px]">
              ADNU MAGIS TBI
            </span>
          </Link>

          <nav
            aria-label="Primary"
            className="order-3 flex w-full items-center justify-center gap-1 rounded-full border border-outline-variant/70 bg-surface-container-low px-2 py-2 text-sm font-semibold text-primary sm:order-none sm:w-auto sm:gap-2"
          >
            <Link className="rounded-full px-3 py-1.5 transition-colors hover:bg-surface-container hover:text-primary" href={homeHref}>
              Home
            </Link>
            <Link className="rounded-full px-3 py-1.5 transition-colors hover:bg-surface-container hover:text-primary" href={eventsHref}>
              Events
            </Link>
            <Link className="rounded-full px-3 py-1.5 transition-colors hover:bg-surface-container hover:text-primary" href={articlesHref}>
              Articles
            </Link>
            <Link className="rounded-full px-3 py-1.5 transition-colors hover:bg-surface-container hover:text-primary" href={igniteGraduatesHref}>
              Startups
            </Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full px-3 py-2 text-sm font-semibold text-primary transition-colors hover:bg-surface-container-low hover:text-primary/80 lg:block"
            >
              Book Facility
            </a>
            <MotionSurface as="div" tone="button">
              <a
                href={facebookPageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg bg-secondary-container px-4 py-2.5 text-sm font-bold text-on-secondary-container shadow-sm transition-all duration-300 hover:bg-secondary-fixed active:translate-y-px sm:px-5 sm:py-3 sm:text-base"
              >
                Contact Us
              </a>
            </MotionSurface>
          </div>
        </div>
      </Reveal>
    </header>
  );
}
