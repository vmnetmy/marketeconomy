export const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3000'

export type CMSMedia = {
  url?: string | null
  alt?: string | null
  caption?: string | null
  filename?: string | null
}

export type NavItem = {
  label?: string | null
  linkType?: 'internal' | 'external'
  page?: { slug?: string | null } | string | null
  url?: string | null
}

export type CMSBlock = {
  id?: string
  blockType: string
  blockName?: string
  [key: string]: unknown
}

export type DatasetColumn = {
  key?: string | null
  label?: string | null
  type?: 'string' | 'number' | 'date' | null
}

export type DatasetDoc = {
  id: string
  title?: string | null
  slug?: string | null
  description?: string | null
  columns?: DatasetColumn[] | null
  rows?: Record<string, unknown>[] | null
  rowCount?: number | null
  isTruncated?: boolean | null
}

export type PageDoc = {
  id: string
  title: string
  slug: string
  layout?: CMSBlock[]
  seo?: {
    metaTitle?: string | null
    metaDescription?: string | null
    ogImage?: CMSMedia | string | null
  }
}

export type PostDoc = {
  id: string
  title: string
  slug: string
  excerpt?: string | null
  content?: unknown
  layout?: CMSBlock[]
  coverImage?: CMSMedia | string | null
  publishedAt?: string | null
  tags?: Array<{ tag?: string | null }> | null
  seo?: {
    metaTitle?: string | null
    metaDescription?: string | null
    ogImage?: CMSMedia | string | null
  }
}

export type HeaderGlobal = {
  navItems?: NavItem[]
}

export type FooterGlobal = {
  columns?: Array<{
    title?: string | null
    links?: NavItem[]
  }>
  contact?: {
    email?: string | null
    phone?: string | null
    address?: string | null
  }
  copyright?: string | null
}

export type SiteSettingsGlobal = {
  siteName?: string | null
  tagline?: string | null
  logo?: CMSMedia | string | null
}

export type UpdatesSidebarGlobal = {
  newsletterHeadline?: string | null
  newsletterDescription?: string | null
  buttonLabel?: string | null
  formAction?: string | null
  finePrint?: string | null
  featuredTitle?: string | null
  featuredLimit?: number | null
}

type CollectionResponse<T> = {
  docs: T[]
  totalDocs: number
  limit: number
  page: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

type ContentSource = 'posts' | 'policyBriefs' | 'events'

export type ContentListItem = {
  id: string
  title: string
  slug: string
  excerpt?: string | null
  summary?: string | null
  publishedAt?: string | null
  startDate?: string | null
  coverImage?: CMSMedia | string | null
  pdfFile?: CMSMedia | string | null
}

export type PostListItem = {
  id: string
  title: string
  slug: string
  excerpt?: string | null
  publishedAt?: string | null
  coverImage?: CMSMedia | string | null
  tags?: Array<{ tag?: string | null }> | null
}

function buildUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  return `${CMS_URL}${path.startsWith('/') ? '' : '/'}${path}`
}

async function fetchJSON<T>(path: string): Promise<T> {
  const res = await fetch(buildUrl(path), {
    cache: 'force-cache',
  })

  if (!res.ok) {
    throw new Error(`CMS request failed: ${res.status} ${res.statusText}`)
  }

  return (await res.json()) as T
}

export function resolveMediaUrl(media?: CMSMedia | string | null): string | null {
  if (!media) return null
  if (typeof media === 'string') return null
  if (!media.url) return null
  return buildUrl(media.url)
}

export async function getPageBySlug(slug: string): Promise<PageDoc | null> {
  const params = new URLSearchParams({
    'where[slug][equals]': slug,
    'where[_status][equals]': 'published',
    depth: '3',
    limit: '1',
  })

  const data = await fetchJSON<CollectionResponse<PageDoc>>(`/api/pages?${params.toString()}`)
  return data.docs?.[0] ?? null
}

export async function getPostBySlug(slug: string): Promise<PostDoc | null> {
  const params = new URLSearchParams({
    'where[slug][equals]': slug,
    'where[_status][equals]': 'published',
    depth: '3',
    limit: '1',
  })

  const data = await fetchJSON<CollectionResponse<PostDoc>>(`/api/posts?${params.toString()}`)
  return data.docs?.[0] ?? null
}

export async function getPostsPage({
  page = 1,
  limit = 10,
}: {
  page?: number
  limit?: number
}): Promise<CollectionResponse<PostListItem>> {
  const params = new URLSearchParams({
    'where[_status][equals]': 'published',
    sort: '-publishedAt',
    depth: '1',
    page: String(page),
    limit: String(limit),
  })

  return fetchJSON<CollectionResponse<PostListItem>>(`/api/posts?${params.toString()}`)
}

export async function getAllPageSlugs(): Promise<string[]> {
  const params = new URLSearchParams({
    'where[_status][equals]': 'published',
    depth: '0',
    limit: '100',
  })

  const data = await fetchJSON<CollectionResponse<{ slug?: string | null }>>(`/api/pages?${params.toString()}`)
  return (data.docs || [])
    .map((doc) => doc.slug)
    .filter((slug): slug is string => typeof slug === 'string' && slug.length > 0)
}

export async function getAllPostSlugs(): Promise<string[]> {
  const slugs: string[] = []
  let page = 1
  let hasNextPage = true

  while (hasNextPage) {
    const params = new URLSearchParams({
      'where[_status][equals]': 'published',
      depth: '0',
      limit: '100',
      page: String(page),
    })

    const data = await fetchJSON<CollectionResponse<{ slug?: string | null }>>(`/api/posts?${params.toString()}`)
    const pageSlugs =
      data.docs
        ?.map((doc) => doc.slug)
        .filter((slug): slug is string => typeof slug === 'string' && slug.length > 0) ?? []
    slugs.push(...pageSlugs)
    hasNextPage = data.hasNextPage
    page += 1
  }

  return slugs
}

export async function getHeader(): Promise<HeaderGlobal | null> {
  return fetchJSON<HeaderGlobal>(`/api/globals/header?depth=1`)
}

export async function getFooter(): Promise<FooterGlobal | null> {
  return fetchJSON<FooterGlobal>(`/api/globals/footer?depth=1`)
}

export async function getSiteSettings(): Promise<SiteSettingsGlobal | null> {
  return fetchJSON<SiteSettingsGlobal>(`/api/globals/site-settings?depth=1`)
}

export async function getUpdatesSidebar(): Promise<UpdatesSidebarGlobal | null> {
  return fetchJSON<UpdatesSidebarGlobal>(`/api/globals/updates-sidebar?depth=0`)
}

export async function getFeaturedPosts(limit = 3): Promise<PostListItem[]> {
  const params = new URLSearchParams({
    'where[_status][equals]': 'published',
    sort: '-publishedAt',
    depth: '1',
    limit: String(limit),
  })

  const data = await fetchJSON<CollectionResponse<PostListItem>>(`/api/posts?${params.toString()}`)
  return data.docs ?? []
}

export async function getContentList(
  source: ContentSource,
  options: { limit?: number; tag?: string } = {},
): Promise<ContentListItem[]> {
  const params = new URLSearchParams({
    'where[_status][equals]': 'published',
    depth: '1',
    limit: String(options.limit ?? 6),
  })

  if (options.tag) {
    params.set('where[tags.tag][equals]', options.tag)
  }

  const data = await fetchJSON<CollectionResponse<ContentListItem>>(`/api/${source}?${params.toString()}`)
  return data.docs ?? []
}
