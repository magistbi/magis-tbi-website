import crypto from "node:crypto";

import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

import { WORDPRESS_REVALIDATION_TAGS } from "@/lib/wordpress";

export const runtime = "nodejs";

type WordPressRevalidationRequestBody = {
  secret?: unknown;
  tags?: unknown;
  paths?: unknown;
  postSlugs?: unknown;
  eventSlugs?: unknown;
  slugs?: unknown;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function normalizeSecret(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function parseRequestSecret(request: Request): string | null {
  const headerSecret = normalizeSecret(request.headers.get("x-wordpress-revalidate-secret"));

  if (headerSecret) {
    return headerSecret;
  }

  const authorization = normalizeSecret(request.headers.get("authorization"));

  if (authorization) {
    const bearerMatch = authorization.match(/^Bearer\s+(.+)$/i);

    if (bearerMatch) {
      return normalizeSecret(bearerMatch[1]);
    }
  }

  return null;
}

function parseStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => normalizeSecret(item))
    .filter((item): item is string => item !== null);
}

function getNestedStringArray(value: unknown, key: "posts" | "events"): string[] {
  if (!isRecord(value)) {
    return [];
  }

  return parseStringArray(value[key]);
}

function secretsMatch(expected: string, provided: string): boolean {
  const expectedBytes = Buffer.from(expected);
  const providedBytes = Buffer.from(provided);

  if (expectedBytes.length !== providedBytes.length) {
    return false;
  }

  return crypto.timingSafeEqual(expectedBytes, providedBytes);
}

function isAuthorizedRequest(request: Request, body: WordPressRevalidationRequestBody | null): boolean {
  const expectedSecret = normalizeSecret(process.env.WORDPRESS_REVALIDATION_SECRET);

  if (!expectedSecret) {
    return process.env.NODE_ENV !== "production" && Boolean(parseRequestSecret(request) ?? normalizeSecret(body?.secret));
  }

  const bodySecret = normalizeSecret(body?.secret);
  const requestSecret = parseRequestSecret(request);
  const providedSecret = requestSecret ?? bodySecret;

  if (!providedSecret) {
    return false;
  }

  return secretsMatch(expectedSecret, providedSecret);
}

function buildRevalidationPathSet(body: WordPressRevalidationRequestBody | null): Set<string> {
  const paths = new Set<string>(["/", "/articles", "/events", "/events/past", "/ignite-graduates", "/sitemap.xml"]);

  for (const path of parseStringArray(body?.paths)) {
    paths.add(path.startsWith("/") ? path : `/${path}`);
  }

  for (const slug of parseStringArray(body?.postSlugs)) {
    paths.add(`/articles/${encodeURIComponent(slug)}`);
  }

  for (const slug of parseStringArray(body?.eventSlugs)) {
    paths.add(`/events/${encodeURIComponent(slug)}`);
  }

  if (isRecord(body?.slugs)) {
    for (const slug of getNestedStringArray(body?.slugs, "posts")) {
      paths.add(`/articles/${encodeURIComponent(slug)}`);
    }

    for (const slug of getNestedStringArray(body?.slugs, "events")) {
      paths.add(`/events/${encodeURIComponent(slug)}`);
    }
  }

  return paths;
}

function buildRevalidationTagSet(body: WordPressRevalidationRequestBody | null): Set<string> {
  const tags = new Set<string>(WORDPRESS_REVALIDATION_TAGS);

  for (const tag of parseStringArray(body?.tags)) {
    tags.add(tag);
  }

  for (const slug of parseStringArray(body?.postSlugs)) {
    tags.add(`wordpress:post:${slug}`);
  }

  for (const slug of parseStringArray(body?.eventSlugs)) {
    tags.add(`wordpress:event:${slug}`);
  }

  if (isRecord(body?.slugs)) {
    for (const slug of getNestedStringArray(body?.slugs, "posts")) {
      tags.add(`wordpress:post:${slug}`);
    }

    for (const slug of getNestedStringArray(body?.slugs, "events")) {
      tags.add(`wordpress:event:${slug}`);
    }
  }

  return tags;
}

async function readRequestBody(request: Request): Promise<WordPressRevalidationRequestBody | null> {
  const contentType = request.headers.get("content-type") ?? "";

  if (!contentType.toLowerCase().includes("application/json")) {
    return null;
  }

  try {
    const payload = (await request.json()) as unknown;

    if (!isRecord(payload)) {
      return null;
    }

    return payload as WordPressRevalidationRequestBody;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const body = await readRequestBody(request);

  if (!isAuthorizedRequest(request, body)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const tags = buildRevalidationTagSet(body);
  const paths = buildRevalidationPathSet(body);

  for (const tag of tags) {
    revalidateTag(tag, "max");
  }

  for (const path of paths) {
    revalidatePath(path);
  }

  return NextResponse.json({
    ok: true,
    revalidated: {
      tags: Array.from(tags),
      paths: Array.from(paths),
    },
  });
}

export function GET() {
  return NextResponse.json({ ok: false, error: "Method Not Allowed" }, { status: 405 });
}
