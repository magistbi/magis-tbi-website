const DEFAULT_SITE_ORIGIN = "https://adnumagis.com";

function resolveUrl(rawOrigin: string): URL | null {
  const normalizedOrigin = /^https?:\/\//i.test(rawOrigin) ? rawOrigin : `https://${rawOrigin}`;

  try {
    return new URL(normalizedOrigin);
  } catch {
    return null;
  }
}

function resolveSiteOriginUrl(): URL {
  const rawOrigin = process.env.SITE_URL ?? process.env.NEXT_PUBLIC_SITE_URL;
  const url = rawOrigin ? resolveUrl(rawOrigin) : null;

  if (url) {
    url.pathname = "";
    url.search = "";
    url.hash = "";
    return url;
  }

  return new URL(DEFAULT_SITE_ORIGIN);
}

export function getSiteOrigin(): string {
  return resolveSiteOriginUrl().origin;
}

export function getSiteUrl(pathname = "/"): string {
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return new URL(normalizedPath, resolveSiteOriginUrl()).toString();
}

export function getSiteMetadataBase(): URL {
  return resolveSiteOriginUrl();
}
