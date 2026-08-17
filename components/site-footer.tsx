import type { ReactNode, SVGProps } from "react";

import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";
import {
  contactEmail,
  facebookPageUrl,
  googleMapsEmbedUrl,
  googleMapsUrl,
  linkedinPageUrl,
  officeLogo,
} from "@/lib/site-links";
import { magisFooterNotes, magisIdentity, magisLocation } from "@/lib/magis-content";

type IconProps = SVGProps<SVGSVGElement>;

function SvgIcon({ children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      fill="currentColor"
      focusable="false"
      viewBox="0 0 24 24"
      {...props}
    >
      {children}
    </svg>
  );
}

function FacebookIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m13 2h-2.5A3.5 3.5 0 0 0 12 8.5V11h-2v3h2v7h3v-7h3v-3h-3V9a1 1 0 0 1 1-1h2V5z" />
    </SvgIcon>
  );
}

function LinkedInIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </SvgIcon>
  );
}

function MailIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 4-8 5-8-5V6l8 5 8-5z" />
    </SvgIcon>
  );
}

function LocationOnIcon(props: IconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7m0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5" />
    </SvgIcon>
  );
}

const platformLinks = [
  { href: "/#about", label: "About Us" },
  { href: "/#cohorts", label: "Startups" },
  { href: "/#goals", label: "Goals" },
  { href: "/#contact", label: "Contact" },
];

const resourceLinks = [
  { href: "/#programs", label: "Programs" },
  { href: "/#facilities", label: "Facilities" },
  { href: "/events", label: "Events" },
  { href: "/#impact", label: "Impact" },
];

export function SiteFooter() {
  return (
    <footer className="bg-primary text-on-primary">
      <Reveal as="div" className="mx-auto max-w-7xl" direction="up" tone="calm">
        <StaggerGroup
          as="div"
          className="grid grid-cols-1 gap-8 px-4 py-14 sm:px-6 sm:py-20 md:grid-cols-12 lg:px-8"
          tone="calm"
        >
          <StaggerItem as="div" className="md:col-span-5" tone="calm">
            <div className="mb-5 flex items-center gap-3 sm:mb-6">
              <img alt="ADNU MAGIS TBI Logo" className="h-9 w-9 object-contain sm:h-10 sm:w-10" src={officeLogo} />
              <span className="font-heading text-[20px] font-bold leading-[1.3] text-secondary-fixed sm:text-[24px]">
                ADNU MAGIS TBI
              </span>
            </div>
            <p className="mb-6 max-w-sm text-sm text-surface-variant sm:mb-8 sm:text-base">
              {magisIdentity.tagline} {magisLocation.supportLine}
            </p>
            <div className="flex gap-3">
              <a
                href={facebookPageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-all hover:bg-secondary-fixed hover:text-primary"
                aria-label="Facebook"
              >
                <FacebookIcon className="size-4" />
              </a>
              <a
                href={linkedinPageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-all hover:bg-secondary-fixed hover:text-primary"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="size-4" />
              </a>
              <a
                href={contactEmail}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-all hover:bg-secondary-fixed hover:text-primary"
                aria-label="Email"
              >
                <MailIcon className="size-4" />
              </a>
            </div>
          </StaggerItem>

          <StaggerItem as="div" className="md:col-span-2" tone="calm">
            <h4 className="mb-4 text-[13px] font-bold uppercase tracking-widest text-secondary-fixed sm:mb-6 sm:text-[14px]">
              Platform
            </h4>
            <ul className="space-y-3 text-surface-variant sm:space-y-4">
              {platformLinks.map((item) => (
                <li key={item.label}>
                  <a className="transition-colors hover:text-secondary-fixed" href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </StaggerItem>

          <StaggerItem as="div" className="md:col-span-2" tone="calm">
            <h4 className="mb-4 text-[13px] font-bold uppercase tracking-widest text-secondary-fixed sm:mb-6 sm:text-[14px]">
              Resources
            </h4>
            <ul className="space-y-3 text-surface-variant sm:space-y-4">
              {resourceLinks.map((item) => (
                <li key={item.label}>
                  <a className="transition-colors hover:text-secondary-fixed" href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </StaggerItem>

          <StaggerItem as="div" className="md:col-span-3" tone="calm">
            <h4 className="mb-4 text-[13px] font-bold uppercase tracking-widest text-secondary-fixed sm:mb-6 sm:text-[14px]">
              Location
            </h4>
            <p className="mb-4 text-sm text-surface-variant sm:text-base">{magisLocation.address}</p>
            <div className="overflow-hidden rounded-lg border border-white/10 bg-white/5 shadow-lg">
              <iframe
                src={googleMapsEmbedUrl}
                title={magisLocation.heading}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-28 w-full sm:h-32"
              />
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border-t border-white/10 bg-white/5 px-4 py-3 text-xs font-semibold text-secondary-fixed transition-colors hover:bg-white/10"
              >
                <LocationOnIcon className="size-4" />
                Open in Google Maps
              </a>
            </div>
          </StaggerItem>
        </StaggerGroup>

        <div className="border-t border-white/10 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center text-sm text-surface-variant md:flex-row md:text-left">
            <p>© 2026 ADNU MAGIS TBI. {magisFooterNotes[0]}.</p>
            <div className="flex gap-6">
              <span>{magisFooterNotes[1]}</span>
            </div>
          </div>
        </div>
      </Reveal>
    </footer>
  );
}
