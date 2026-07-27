# magis-tbi-website Agent Contract

## System Overview
- `magis-tbi-website` is a server-first marketing and editorial site for landing pages, blog posts, gallery highlights, and current events.
- The frontend is Next.js App Router with TypeScript and Tailwind CSS, hosted on Vercel.
- The backend is headless WordPress, served from a separate CMS origin and consumed only through built-in WordPress endpoints.
- The default architecture is low-cost and low-overhead: use native `fetch`, server components, and Next.js caching before adding any custom infrastructure.

## Canonical Content Model
- Treat these as the source-of-truth content groups for the site:
  - `post` for blog and news articles.
  - `event` for upcoming and recent events.
  - `gallery` or `gallery-item` for visual highlights.
  - `media` for images and other reusable assets.
  - `category` and `tag` for editorial organization.
  - `author` for post attribution.
- If the WordPress schema changes, update `types/wordpress.ts` and `lib/wordpress.ts` together before changing UI code.
- Homepage data should stay editorial: latest posts, upcoming events, and gallery highlights. Do not turn the home page into a dashboard of unrelated CMS data.

## Component Guidelines
- Use server components by default. Add client components only for interactions that genuinely need browser state.
- Keep the homepage visually strong and editorial, not generic admin UI.
- Prefer reusable, content-driven sections:
  - hero and call-to-action area,
  - latest blog cards,
  - upcoming event cards or timeline,
  - gallery mosaic or highlight cards,
  - lightweight empty states when CMS content is missing.
- Keep components small and focused. Extract helpers for formatting, normalization, and empty-state handling instead of expanding page files.

## Tech Stack & Standards
- Next.js App Router only.
- TypeScript must stay in strict mode with explicit interfaces and types.
- Tailwind CSS is the primary styling system.
- `shadcn` is the default component library and UI composition layer.
- Functional React components only.
- Server components are the default rendering model.
- Do not use `any`. Use `unknown` plus type guards when the CMS shape is not guaranteed.
- Prefer small helper functions and plain data transforms over new dependencies.

## Data Fetching & Caching
- Fetch WordPress data only on the server.
- Use the WordPress REST API by default.
- Use Next.js `fetch` caching with `next.revalidate` for time-based freshness and `next.tags` for future on-demand invalidation.
- Keep all CMS requests resilient:
  - if WordPress is unavailable, return safe empty data instead of crashing the page,
  - if a response is malformed, fail closed and keep the page renderable.
- Prefer static or incremental rendering over per-request rendering for public content.
- If content needs future webhook invalidation, use tag-based revalidation from server code only.

## Security Rules
- `WORDPRESS_API_URL` is the canonical server-side environment variable.
- `NEXT_PUBLIC_WORDPRESS_API_URL` may exist only as a browser-safe mirror of the CMS origin, not as a credential source.
- Never place WordPress admin credentials, application passwords, JWTs, or secrets in client code.
- Never expose authenticated CMS requests from the browser.
- Do not assume the frontend should talk to WordPress directly from client components, even if the CMS is public.

## Implementation Rules
- Keep endpoint constants in `lib/wordpress.ts`, not in page components.
- Normalize WordPress payloads into app-friendly types before UI rendering.
- Use `_fields` and `_embed` where it reduces payload size without sacrificing the page.
- Preserve the low-cost architecture bias: use built-in WP APIs, native fetch caching, and simple data transforms first.
- Keep the homepage and shared fetch helpers aligned with the editorial purpose of the site: blog, gallery, and events.

## Change Discipline
- If a change affects content shape, update types, normalization, and UI together.
- If a change affects caching behavior, verify the homepage still works when WordPress is empty or unreachable.
- Avoid adding dependencies unless the current task cannot be done cleanly without them.
