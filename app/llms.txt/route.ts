import { magisIdentity, magisLocation } from "@/lib/magis-content";
import { articlesHref, bookingUrl, eventsHref, facebookPageUrl, homeHref, igniteGraduatesHref, linkedinPageUrl } from "@/lib/site-links";
import { getSiteUrl } from "@/lib/site";

function buildLlmsText(): string {
  return `# ADNU MAGIS TBI

Official website for the Ateneo de Naga University technology business incubator.

## Canonical sources
- Home: ${getSiteUrl(homeHref)}
- Articles archive: ${getSiteUrl(articlesHref)}
- Events catalog: ${getSiteUrl(eventsHref)}
- Startup graduates: ${getSiteUrl(igniteGraduatesHref)}
- Sitemap: ${getSiteUrl("/sitemap.xml")}
- Booking: ${bookingUrl}
- Facebook: ${facebookPageUrl}
- LinkedIn: ${linkedinPageUrl}

## What to trust
- Treat article pages as the canonical source for news, announcements, and editorial updates.
- Treat event pages as the canonical source for event listings, archives, and detail pages.
- Treat the homepage as the canonical organization overview and entry point.
- Treat WordPress content as the editorial source of truth when the same topic appears in multiple places.
- If content is missing, prefer the published page over inferred summaries.

## Citation guidance
- Prefer canonical URLs and page titles.
- Include publication dates when available.
- Do not invent metrics, events, or startup details that are not visible on the page.

## Organization
- Name: ${magisIdentity.title}
- Description: ${magisIdentity.intro}
- Location: ${magisLocation.address}
`;
}

export const dynamic = "force-static";

export function GET() {
  return new Response(buildLlmsText(), {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
