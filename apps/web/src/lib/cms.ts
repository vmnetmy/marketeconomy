import type { SerializedEditorState } from 'lexical'

const REVALIDATE_SECONDS = 60
export const CMS_URL = process.env.CMS_URL || process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3000'

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
  children?: NavItem[] | null
}

export type CMSBlock = {
  id?: string
  blockType: string
  blockName?: string
  showPlaceholder?: boolean | null
  [key: string]: unknown
}

export type AdvancedSettings = {
  anchorId?: string | null
  background?: 'none' | 'light' | 'dark' | null
  padding?: 'none' | 'compact' | 'standard' | 'large' | null
  width?: 'standard' | 'wide' | 'full' | null
  hideOnMobile?: boolean | null
  hideOnDesktop?: boolean | null
}

export type CardsAdvancedSettings = AdvancedSettings & {
  cardStyle?: 'flat' | 'raised' | null
  columns?: '2' | '3' | '4' | null
}

export type ContentListAdvancedSettings = AdvancedSettings & {
  cardStyle?: 'flat' | 'raised' | null
  showImages?: boolean | null
  dense?: boolean | null
}

export type TimelineAdvancedSettings = AdvancedSettings & {
  style?: 'cards' | 'minimal' | null
  compact?: boolean | null
}

export type DataVizAdvancedSettings = AdvancedSettings & {
  panelStyle?: 'none' | 'soft' | 'card' | null
}

export type MediaBlockAdvancedSettings = AdvancedSettings & {
  frameStyle?: 'none' | 'outline' | 'card' | null
  radius?: 'sm' | 'md' | 'lg' | null
  shadow?: 'none' | 'soft' | 'medium' | null
}

export type FAQAdvancedSettings = AdvancedSettings & {
  layout?: 'cards' | 'minimal' | null
  columns?: '1' | '2' | null
}

export type LogoCloudAdvancedSettings = AdvancedSettings & {
  cardStyle?: 'flat' | 'raised' | null
  columns?: '2' | '3' | '4' | '6' | null
}

export type StatsAdvancedSettings = AdvancedSettings & {
  numberSize?: 'sm' | 'md' | 'lg' | null
  cardStyle?: 'flat' | 'raised' | null
  columns?: '2' | '3' | '4' | null
}

export type VideoEmbedAdvancedSettings = AdvancedSettings & {
  frameStyle?: 'none' | 'outline' | 'card' | null
  radius?: 'sm' | 'md' | 'lg' | null
  shadow?: 'none' | 'soft' | 'medium' | null
}

export type NewsletterAdvancedSettings = AdvancedSettings & {
  tone?: 'light' | 'dark' | null
  layout?: 'inline' | 'stacked' | null
  cardStyle?: 'flat' | 'raised' | null
}

export type FormAdvancedSettings = AdvancedSettings & {
  layout?: 'stacked' | 'twoColumn' | null
  align?: 'left' | 'center' | null
  cardStyle?: 'none' | 'soft' | 'card' | 'outline' | null
  radius?: 'sm' | 'md' | 'lg' | null
  shadow?: 'none' | 'soft' | 'medium' | null
  buttonStyle?: 'solid' | 'outline' | null
  showLabels?: boolean | null
  fullWidthButton?: boolean | null
}

export type TwoColumnRichTextAdvancedSettings = AdvancedSettings & {
  gap?: 'sm' | 'md' | 'lg' | null
  verticalAlign?: 'top' | 'center' | null
}

export type PricingAdvancedSettings = AdvancedSettings & {
  columns?: '2' | '3' | '4' | null
  cardStyle?: 'flat' | 'raised' | null
  highlightStyle?: 'solid' | 'outline' | null
}

export type FeatureGridAdvancedSettings = AdvancedSettings & {
  cardStyle?: 'flat' | 'raised' | null
}

export type SplitSectionAdvancedSettings = AdvancedSettings & {
  imageSize?: 'small' | 'medium' | 'large' | null
  reverseOnMobile?: boolean | null
}

export type TestimonialsAdvancedSettings = AdvancedSettings & {
  layout?: 'grid' | 'carousel' | null
}

export type HeroAdvancedSettings = AdvancedSettings & {
  tone?: 'dark' | 'light' | null
  minHeight?: 'short' | 'medium' | 'large' | null
  overlayStrength?: 'light' | 'medium' | 'strong' | null
}

export type CTASectionAdvancedSettings = AdvancedSettings & {
  align?: 'left' | 'center' | null
}

export type RichTextAdvancedSettings = AdvancedSettings & {
  typography?: {
    textSize?: 'sm' | 'md' | 'lg' | null
    lineHeight?: 'snug' | 'normal' | 'relaxed' | null
    textAlign?: 'left' | 'center' | 'right' | null
    leadStyle?: 'none' | 'lead' | null
    dropCap?: 'none' | 'subtle' | 'strong' | null
  } | null
  layout?: {
    columns?: '1' | '2' | null
    columnGap?: 'sm' | 'md' | 'lg' | null
    maxWidth?: 'narrow' | 'standard' | 'wide' | 'full' | null
  } | null
  container?: {
    surface?: 'none' | 'soft' | 'card' | 'outline' | 'gradient' | null
    radius?: 'sm' | 'md' | 'lg' | null
    shadow?: 'none' | 'soft' | 'medium' | null
    innerPadding?: 'compact' | 'standard' | 'large' | null
    borderStyle?: 'none' | 'subtle' | 'strong' | null
  } | null
  callouts?: {
    highlightMode?: 'none' | 'leftBar' | 'noteBox' | null
    highlightText?: string | null
  } | null
  colors?: {
    textColor?: string | null
    headingColor?: string | null
    linkColor?: string | null
    accentColor?: string | null
    backgroundColor?: string | null
    borderColor?: string | null
  } | null
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
  placeholderOverride?: 'default' | 'forceOn' | 'forceOff' | null
  seo?: {
    metaTitle?: string | null
    metaDescription?: string | null
    ogImage?: CMSMedia | string | null
  }
}

export type InTheNewsDoc = {
  id: string
  title: string
  slug: string
  excerpt?: string | null
  content?: SerializedEditorState | null
  coverImage?: CMSMedia | string | null
  publishedDate?: string | null
  tags?: Array<{ tag?: string | null }> | null
  originalSourceUrl?: string | null
  originalSourceLabel?: string | null
  seo?: {
    metaTitle?: string | null
    metaDescription?: string | null
    ogImage?: CMSMedia | string | null
  }
}

export type PolicyBriefDoc = {
  id: string
  title: string
  slug: string
  summary?: string | null
  briefType?: 'policy' | 'research' | 'report' | null
  executiveSummary?: SerializedEditorState | null
  keyRecommendations?: Array<{ recommendation?: string | null }> | null
  pdfFile?: CMSMedia | string | null
  coverImage?: CMSMedia | string | null
  tags?: Array<{ tag?: string | null }> | null
  authors?: Array<{ fullName?: string | null } | string> | null
  featured?: boolean | null
  publishedAt?: string | null
  seo?: {
    metaTitle?: string | null
    metaDescription?: string | null
    ogImage?: CMSMedia | string | null
  }
}

export type EventDoc = {
  id: string
  title: string
  slug: string
  startDate?: string | null
  endDate?: string | null
  coverImage?: CMSMedia | string | null
  location?: string | null
  eventType?: string | null
  registrationLink?: string | null
  description?: SerializedEditorState | null
  eventStatus?: 'upcoming' | 'past' | null
  featured?: boolean | null
  tags?: Array<{ tag?: string | null }> | null
  seo?: {
    metaTitle?: string | null
    metaDescription?: string | null
    ogImage?: CMSMedia | string | null
  }
}

export type EventReportDoc = {
  id: string
  title: string
  slug: string
  summary?: string | null
  content?: SerializedEditorState | null
  coverImage?: CMSMedia | string | null
  pdfFile?: CMSMedia | string | null
  publishedDate?: string | null
  event?: EventDoc | string | null
  seo?: {
    metaTitle?: string | null
    metaDescription?: string | null
    ogImage?: CMSMedia | string | null
  }
}

export type LeadershipDoc = {
  id: string
  name: string
  role: 'Chairman' | 'General Manager'
  bio?: SerializedEditorState | null
  photo?: CMSMedia | string | null
  socialUrl?: string | null
  displayOrder?: number | null
}

export type PolicyBriefListItem = {
  id: string
  title: string
  slug: string
  summary?: string | null
  coverImage?: CMSMedia | string | null
  pdfFile?: CMSMedia | string | null
  tags?: Array<{ tag?: string | null }> | null
  authors?: Array<{ fullName?: string | null } | string> | null
  publishedAt?: string | null
}

export type HeaderGlobal = {
  navItems?: NavItem[]
}

export type FooterGlobal = {
  columns?: Array<{
    title?: string | null
    links?: NavItem[]
  }>
  cta?: {
    title?: string | null
    description?: string | null
    buttonLabel?: string | null
    buttonUrl?: string | null
    finePrint?: string | null
  }
  contact?: {
    email?: string | null
    phone?: string | null
    address?: string | null
  }
  legalLinks?: NavItem[]
  copyright?: string | null
}

export type SiteSettingsGlobal = {
  siteName?: string | null
  tagline?: string | null
  logo?: CMSMedia | string | null
  logoLight?: CMSMedia | string | null
  logoDark?: CMSMedia | string | null
  contentPlaceholders?: {
    mode?: 'off' | 'on' | 'onlyWhenEmpty' | null
    label?: string | null
  } | null
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

type ContentSource = 'inTheNews' | 'policyBriefs' | 'events' | 'posts'

export type ContentListItem = {
  id: string
  title: string
  slug: string
  excerpt?: string | null
  summary?: string | null
  publishedAt?: string | null
  publishedDate?: string | null
  startDate?: string | null
  endDate?: string | null
  location?: string | null
  eventType?: string | null
  coverImage?: CMSMedia | string | null
  pdfFile?: CMSMedia | string | null
}

export type InTheNewsListItem = {
  id: string
  title: string
  slug: string
  excerpt?: string | null
  publishedDate?: string | null
  coverImage?: CMSMedia | string | null
  tags?: Array<{ tag?: string | null }> | null
}

function buildUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  return `${CMS_URL}${path.startsWith('/') ? '' : '/'}${path}`
}

async function fetchJSON<T>(
  path: string,
  init?: RequestInit & { next?: { revalidate?: number } },
): Promise<T> {
  const useNoStore = init?.cache === 'no-store'
  const next = init?.next ?? (useNoStore ? undefined : { revalidate: REVALIDATE_SECONDS })
  const res = await fetch(buildUrl(path), {
    ...init,
    ...(next ? { next } : {}),
  })

  if (!res.ok) {
    throw new Error(`CMS request failed: ${res.status} ${res.statusText}`)
  }

  return (await res.json()) as T
}

export function resolveMediaUrl(media?: CMSMedia | string | null): string | null {
  if (!media) return null
  if (typeof media === 'string') {
    if (media.startsWith('http://') || media.startsWith('https://')) return media
    return null
  }
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

export async function getInTheNewsBySlug(slug: string): Promise<InTheNewsDoc | null> {
  const params = new URLSearchParams({
    'where[slug][equals]': slug,
    'where[_status][equals]': 'published',
    depth: '2',
    limit: '1',
  })

  const data = await fetchJSON<CollectionResponse<InTheNewsDoc>>(`/api/inTheNews?${params.toString()}`)
  return data.docs?.[0] ?? null
}

export async function getInTheNewsPage({
  page = 1,
  limit = 10,
  tag,
  search,
}: {
  page?: number
  limit?: number
  tag?: string
  search?: string
}): Promise<CollectionResponse<InTheNewsListItem>> {
  const params = new URLSearchParams({
    'where[_status][equals]': 'published',
    sort: '-publishedDate',
    depth: '1',
    page: String(page),
    limit: String(limit),
  })

  if (tag) {
    params.set('where[tags.tag][equals]', tag)
  }

  if (search) {
    params.set('where[or][0][title][like]', `%${search}%`)
    params.set('where[or][1][content][like]', `%${search}%`)
  }

  return fetchJSON<CollectionResponse<InTheNewsListItem>>(`/api/inTheNews?${params.toString()}`)
}

export async function getPolicyBriefBySlug(slug: string): Promise<PolicyBriefDoc | null> {
  const params = new URLSearchParams({
    'where[slug][equals]': slug,
    'where[_status][equals]': 'published',
    depth: '2',
    limit: '1',
  })

  const path = `/api/policyBriefs?${params.toString()}`
  try {
    const data = await fetchJSON<CollectionResponse<PolicyBriefDoc>>(path, {
      cache: 'no-store',
    })
    if (!data.docs?.length) {
      console.warn('[policyBrief] not found', { slug, totalDocs: data.totalDocs, path })
    }
    return data.docs?.[0] ?? null
  } catch (error) {
    console.error('[policyBrief] fetch failed', { slug, path, error })
    return null
  }
}

export async function getPolicyBriefsPage({
  page = 1,
  limit = 12,
  tag,
  search,
  sort = 'latest',
}: {
  page?: number
  limit?: number
  tag?: string
  search?: string
  sort?: 'latest' | 'oldest'
}): Promise<CollectionResponse<PolicyBriefListItem>> {
  const params = new URLSearchParams({
    'where[_status][equals]': 'published',
    sort: sort === 'oldest' ? 'publishedAt' : '-publishedAt',
    depth: '1',
    page: String(page),
    limit: String(limit),
  })

  if (tag) {
    params.set('where[tags.tag][equals]', tag)
  }

  if (search) {
    params.set('where[title][like]', `%${search}%`)
  }

  return fetchJSON<CollectionResponse<PolicyBriefListItem>>(`/api/policyBriefs?${params.toString()}`)
}

export async function getPolicyBriefTags(): Promise<string[]> {
  const params = new URLSearchParams({
    'where[_status][equals]': 'published',
    depth: '0',
    limit: '200',
  })

  const data = await fetchJSON<CollectionResponse<{ tags?: Array<{ tag?: string | null }> | null }>>(
    `/api/policyBriefs?${params.toString()}`,
  )

  const tagSet = new Set<string>()
  for (const doc of data.docs || []) {
    for (const tag of doc.tags || []) {
      if (tag?.tag) tagSet.add(tag.tag)
    }
  }

  return Array.from(tagSet).sort()
}

export async function getRelatedPolicyBriefs(tags: string[] = [], limit = 3): Promise<PolicyBriefListItem[]> {
  const params = new URLSearchParams({
    'where[_status][equals]': 'published',
    sort: '-publishedAt',
    depth: '1',
    limit: String(limit),
  })

  if (tags.length > 0) {
    params.set('where[tags.tag][in]', tags.join(','))
  }

  const data = await fetchJSON<CollectionResponse<PolicyBriefListItem>>(`/api/policyBriefs?${params.toString()}`)
  return data.docs ?? []
}

export async function getFeaturedPolicyBrief(): Promise<PolicyBriefListItem | null> {
  const featuredParams = new URLSearchParams({
    'where[_status][equals]': 'published',
    'where[featured][equals]': 'true',
    sort: '-publishedAt',
    depth: '1',
    limit: '1',
  })

  const featured = await fetchJSON<CollectionResponse<PolicyBriefListItem>>(`/api/policyBriefs?${featuredParams.toString()}`)
  if (featured.docs?.[0]) return featured.docs[0]

  const fallbackParams = new URLSearchParams({
    'where[_status][equals]': 'published',
    sort: '-publishedAt',
    depth: '1',
    limit: '1',
  })
  const fallback = await fetchJSON<CollectionResponse<PolicyBriefListItem>>(`/api/policyBriefs?${fallbackParams.toString()}`)
  return fallback.docs?.[0] ?? null
}

export async function getLeadership(): Promise<LeadershipDoc[]> {
  const params = new URLSearchParams({
    sort: 'displayOrder',
    depth: '1',
    limit: '100',
  })
  const data = await fetchJSON<CollectionResponse<LeadershipDoc>>(`/api/leadership?${params.toString()}`)
  return data.docs ?? []
}

export async function getEventsPage({
  page = 1,
  limit = 12,
  status,
  search,
  year,
  location,
  eventType,
}: {
  page?: number
  limit?: number
  status?: 'upcoming' | 'past'
  search?: string
  year?: string
  location?: string
  eventType?: string
}): Promise<CollectionResponse<EventDoc>> {
  const params = new URLSearchParams({
    'where[_status][equals]': 'published',
    sort: status === 'past' ? '-startDate' : 'startDate',
    depth: '1',
    page: String(page),
    limit: String(limit),
  })

  if (status) {
    params.set('where[eventStatus][equals]', status)
  }

  if (search) {
    params.set('where[or][0][title][like]', `%${search}%`)
    params.set('where[or][1][description][like]', `%${search}%`)
  }

  if (year) {
    params.set('where[startDate][greater_than_equal]', `${year}-01-01`)
    params.set('where[startDate][less_than_equal]', `${year}-12-31`)
  }

  if (location) {
    params.set('where[location][like]', `%${location}%`)
  }

  if (eventType) {
    params.set('where[eventType][like]', `%${eventType}%`)
  }

  return fetchJSON<CollectionResponse<EventDoc>>(`/api/events?${params.toString()}`)
}

export async function getEventBySlug(slug: string): Promise<EventDoc | null> {
  const params = new URLSearchParams({
    'where[slug][equals]': slug,
    'where[_status][equals]': 'published',
    depth: '2',
    limit: '1',
  })

  const data = await fetchJSON<CollectionResponse<EventDoc>>(`/api/events?${params.toString()}`)
  return data.docs?.[0] ?? null
}

export async function getUpcomingEvents(limit = 3): Promise<EventDoc[]> {
  const params = new URLSearchParams({
    'where[_status][equals]': 'published',
    'where[eventStatus][equals]': 'upcoming',
    sort: 'startDate',
    depth: '1',
    limit: String(limit),
  })

  const data = await fetchJSON<CollectionResponse<EventDoc>>(`/api/events?${params.toString()}`)
  return data.docs ?? []
}

export async function getEventReportsPage({
  page = 1,
  limit = 12,
}: {
  page?: number
  limit?: number
}): Promise<CollectionResponse<EventReportDoc>> {
  const params = new URLSearchParams({
    'where[_status][equals]': 'published',
    sort: '-publishedDate',
    depth: '2',
    page: String(page),
    limit: String(limit),
  })

  return fetchJSON<CollectionResponse<EventReportDoc>>(`/api/eventReports?${params.toString()}`)
}

export async function getEventReportBySlug(slug: string): Promise<EventReportDoc | null> {
  const params = new URLSearchParams({
    'where[slug][equals]': slug,
    'where[_status][equals]': 'published',
    depth: '2',
    limit: '1',
  })

  const data = await fetchJSON<CollectionResponse<EventReportDoc>>(`/api/eventReports?${params.toString()}`)
  return data.docs?.[0] ?? null
}

export async function getEventReportByEventId(eventId: string): Promise<EventReportDoc | null> {
  const params = new URLSearchParams({
    'where[event][equals]': eventId,
    'where[_status][equals]': 'published',
    depth: '2',
    limit: '1',
  })

  const data = await fetchJSON<CollectionResponse<EventReportDoc>>(`/api/eventReports?${params.toString()}`)
  return data.docs?.[0] ?? null
}

export async function getLatestInTheNews(limit = 4): Promise<InTheNewsListItem[]> {
  const params = new URLSearchParams({
    'where[_status][equals]': 'published',
    sort: '-publishedDate',
    depth: '1',
    limit: String(limit),
  })

  const data = await fetchJSON<CollectionResponse<InTheNewsListItem>>(`/api/inTheNews?${params.toString()}`)
  return data.docs ?? []
}

export async function getInTheNewsTags(): Promise<string[]> {
  const params = new URLSearchParams({
    'where[_status][equals]': 'published',
    depth: '0',
    limit: '200',
  })

  const data = await fetchJSON<CollectionResponse<{ tags?: Array<{ tag?: string | null }> | null }>>(
    `/api/inTheNews?${params.toString()}`,
  )

  const tagSet = new Set<string>()
  for (const doc of data.docs || []) {
    for (const tag of doc.tags || []) {
      if (tag?.tag) tagSet.add(tag.tag)
    }
  }

  return Array.from(tagSet).sort()
}

export async function getEventsFeed({
  limit = 6,
  status = 'upcoming',
  sort = 'dateAsc',
  tag,
}: {
  limit?: number
  status?: 'upcoming' | 'past' | 'all'
  sort?: 'dateAsc' | 'dateDesc'
  tag?: string
}): Promise<EventDoc[]> {
  const params = new URLSearchParams({
    'where[_status][equals]': 'published',
    depth: '1',
    limit: String(limit),
    sort: sort === 'dateDesc' ? '-startDate' : 'startDate',
  })

  if (status !== 'all') {
    params.set('where[eventStatus][equals]', status)
  }

  if (tag) {
    params.set('where[tags.tag][equals]', tag)
  }

  const data = await fetchJSON<CollectionResponse<EventDoc>>(`/api/events?${params.toString()}`)
  return data.docs ?? []
}

export async function getInTheNewsFeed({
  limit = 6,
  sort = 'latest',
  tag,
}: {
  limit?: number
  sort?: 'latest' | 'oldest'
  tag?: string
}): Promise<InTheNewsListItem[]> {
  const params = new URLSearchParams({
    'where[_status][equals]': 'published',
    depth: '1',
    limit: String(limit),
    sort: sort === 'oldest' ? 'publishedDate' : '-publishedDate',
  })

  if (tag) {
    params.set('where[tags.tag][equals]', tag)
  }

  const data = await fetchJSON<CollectionResponse<InTheNewsListItem>>(`/api/inTheNews?${params.toString()}`)
  return data.docs ?? []
}

export async function getPolicyBriefFeed({
  limit = 6,
  sort = 'latest',
  tag,
  featuredOnly = false,
}: {
  limit?: number
  sort?: 'latest' | 'oldest'
  tag?: string
  featuredOnly?: boolean
}): Promise<PolicyBriefListItem[]> {
  const params = new URLSearchParams({
    'where[_status][equals]': 'published',
    depth: '1',
    limit: String(limit),
    sort: sort === 'oldest' ? 'publishedAt' : '-publishedAt',
  })

  if (tag) {
    params.set('where[tags.tag][equals]', tag)
  }

  if (featuredOnly) {
    params.set('where[featured][equals]', 'true')
  }

  const data = await fetchJSON<CollectionResponse<PolicyBriefListItem>>(`/api/policyBriefs?${params.toString()}`)
  return data.docs ?? []
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

export async function getAllInTheNewsSlugs(): Promise<string[]> {
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

    const data = await fetchJSON<CollectionResponse<{ slug?: string | null }>>(`/api/inTheNews?${params.toString()}`)
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

export async function getContentList(
  source: ContentSource,
  options: { limit?: number; tag?: string } = {},
): Promise<ContentListItem[]> {
  const resolvedSource = source === 'posts' ? 'inTheNews' : source
  const params = new URLSearchParams({
    'where[_status][equals]': 'published',
    depth: '1',
    limit: String(options.limit ?? 6),
  })

  if (resolvedSource === 'events') {
    params.set('where[eventStatus][equals]', 'upcoming')
    params.set('sort', 'startDate')
  }

  if (options.tag) {
    params.set('where[tags.tag][equals]', options.tag)
  }

  const data = await fetchJSON<CollectionResponse<ContentListItem>>(`/api/${resolvedSource}?${params.toString()}`)
  return data.docs ?? []
}
