export interface WordPressRenderedField {
  rendered: string;
  protected?: boolean;
}

export interface WordPressMediaDetailsSize {
  file: string;
  width: number;
  height: number;
  mime_type: string;
  source_url: string;
}

export interface WordPressMediaDetails {
  width: number;
  height: number;
  file?: string;
  sizes?: Record<string, WordPressMediaDetailsSize>;
}

export interface RawWordPressAuthor {
  id: number;
  name: string;
  slug: string;
  link: string;
  url?: string;
  description?: string;
  avatar_urls?: Record<string, string>;
}

export interface RawWordPressCategory {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  parent: number;
}

export interface RawWordPressMedia {
  id: number;
  slug: string;
  link: string;
  date: string;
  modified: string;
  title: WordPressRenderedField;
  caption: WordPressRenderedField;
  alt_text: string;
  source_url: string;
  media_type?: string;
  mime_type?: string;
  media_details?: WordPressMediaDetails;
}

export interface RawWordPressLink {
  href: string;
  embeddable?: boolean;
}

export interface RawWordPressLinks {
  author?: RawWordPressLink[];
  collection?: RawWordPressLink[];
  about?: RawWordPressLink[];
  self?: RawWordPressLink[];
  replies?: RawWordPressLink[];
  "version-history"?: RawWordPressLink[];
  "predecessor-version"?: RawWordPressLink[];
  "wp:featuredmedia"?: RawWordPressLink[];
  "wp:attachment"?: RawWordPressLink[];
  "wp:term"?: Array<{
    taxonomy: string;
    embeddable?: boolean;
    href: string;
  }>;
  curies?: Array<{
    name: string;
    href: string;
    templated: boolean;
  }>;
}

export interface RawWordPressEmbedded {
  author?: RawWordPressAuthor[];
  "wp:featuredmedia"?: RawWordPressMedia[];
  "wp:term"?: Array<Array<RawWordPressCategory>>;
}

export interface RawWordPressBaseContent {
  id: number;
  slug: string;
  link: string;
  date: string;
  modified: string;
  title: WordPressRenderedField;
  excerpt?: WordPressRenderedField;
  content?: WordPressRenderedField;
  featured_media?: number;
  _embedded?: RawWordPressEmbedded;
  _links?: RawWordPressLinks;
  jetpack_featured_media_url?: string;
}

export interface RawWordPressPost extends RawWordPressBaseContent {
  categories?: number[];
  tags?: number[];
}

export interface RawWordPressEventFields {
  event_date?: string;
  event_start_time?: string;
  event_end_time?: string;
  event_location?: string;
  event_registration_url?: string;
  event_registration_label?: string;
}

export interface RawWordPressEvent extends RawWordPressBaseContent {
  acf?: RawWordPressEventFields;
  meta?: RawWordPressEventFields;
}

export interface RawWordPressGalleryFields {
  gallery_caption?: string;
  gallery_image_alt?: string;
  gallery_image_url?: string;
}

export interface RawWordPressGalleryItem extends RawWordPressBaseContent {
  acf?: RawWordPressGalleryFields;
  meta?: RawWordPressGalleryFields;
}

export interface RawWordPressStartupFields {
  startup_name?: string;
  founder_names?: string;
  logo?: string;
  cohort?: string;
  description?: string;
}

export interface RawWordPressStartup extends RawWordPressBaseContent {
  acf?: RawWordPressStartupFields;
  meta?: RawWordPressStartupFields;
}

export interface WordPressImage {
  id: number;
  url: string;
  alt: string;
  caption: string | null;
  width: number | null;
  height: number | null;
}

export interface WordPressAuthor {
  id: number;
  name: string;
  slug: string;
  url: string | null;
  avatarUrl: string | null;
}

export interface WordPressCategory {
  id: number;
  name: string;
  slug: string;
  url: string | null;
}

export interface WordPressPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  url: string;
  date: string;
  modified: string;
  author: WordPressAuthor | null;
  categories: WordPressCategory[];
  featuredMedia: WordPressImage | null;
}

export interface WordPressEvent {
  id: number;
  slug: string;
  title: string;
  description: string;
  url: string;
  eventDate: string;
  startTime: string | null;
  endTime: string | null;
  location: string | null;
  registrationUrl: string | null;
  registrationLabel: string | null;
  featuredMedia: WordPressImage | null;
}

export interface WordPressGalleryItem {
  id: number;
  slug: string;
  title: string;
  caption: string;
  url: string;
  featuredMedia: WordPressImage | null;
}

export interface WordPressStartup {
  id: number;
  slug: string;
  startupName: string;
  founderNames: string[];
  cohort: string | null;
  description: string;
  logo: WordPressImage | null;
}

export interface WordPressHomepageSnapshot {
  latestPosts: WordPressPost[];
  upcomingEvents: WordPressEvent[];
  galleryHighlights: WordPressGalleryItem[];
}

export interface WordPressPaginatedCollection<T> {
  items: T[];
  totalPages: number | null;
}
