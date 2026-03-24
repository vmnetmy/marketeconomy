import Link from 'next/link'

import type { CMSBlock, ContentListAdvancedSettings } from '../../lib/cms'
import { getContentListStyles, getSectionProps } from '../../lib/blocks'
import { getPolicyBriefFeed } from '../../lib/cms'
import { CMSImage } from '../media/CMSImage'
import { SectionWrapper } from '../layout/SectionWrapper'

type PolicyBriefFeedBlock = CMSBlock & {
  sectionTitle?: string
  sectionIntro?: string
  sort?: 'latest' | 'oldest'
  featuredOnly?: boolean
  limit?: number
  layout?: 'list' | 'grid'
  filterTag?: string
  showSummary?: boolean
  showDate?: boolean
  showTags?: boolean
  cta?: {
    label?: string
    url?: string
  }
  advanced?: ContentListAdvancedSettings
}

const formatDate = (value?: string | null): string | null => {
  if (!value) return null
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

export async function PolicyBriefFeedBlock({ block }: { block: PolicyBriefFeedBlock }) {
  const items = await getPolicyBriefFeed({
    limit: block.limit,
    sort: block.sort ?? 'latest',
    tag: block.filterTag,
    featuredOnly: Boolean(block.featuredOnly),
  })

  const isGrid = block.layout !== 'list'
  const sectionProps = getSectionProps(block.advanced)
  const { cardClass, showImages, spacingClass } = getContentListStyles(block.advanced)
  const sectionTitle = block.sectionTitle || 'Latest Policy Briefs'
  const ctaLabel = block.cta?.label?.trim()
  const ctaUrl = block.cta?.url?.trim()
  const showDate = block.showDate !== false
  const showSummary = block.showSummary !== false
  const showTags = block.showTags !== false

  return (
    <SectionWrapper {...sectionProps}>
      <section className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">{sectionTitle}</h2>
            {block.sectionIntro ? <p className="text-sm text-slate-600">{block.sectionIntro}</p> : null}
          </div>
          {ctaLabel && ctaUrl ? (
            <Link href={ctaUrl} className="text-sm font-semibold text-blue-600 hover:text-blue-700">
              {ctaLabel}
            </Link>
          ) : null}
        </div>
        {items.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-sm text-slate-600">
            No policy briefs available yet.
          </div>
        ) : (
          <div className={isGrid ? 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3' : spacingClass}>
            {items.map((item) => {
              const published = showDate ? formatDate(item.publishedAt) : null
              const tagsList = showTags
                ? (item.tags || [])
                    .map((tagItem) => tagItem?.tag)
                    .filter((tagItem): tagItem is string => Boolean(tagItem))
                : []
              return (
                <Link
                  key={item.id}
                  href={item.slug ? `/publications/policy-brief/${item.slug}` : '#'}
                  className={`block rounded-2xl p-5 ${cardClass}`}
                >
                  {showImages && item.coverImage ? (
                    <div className="relative mb-4 aspect-4/3 w-full overflow-hidden rounded-xl bg-slate-100">
                      <CMSImage
                        media={item.coverImage}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  ) : null}
                  {published ? (
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{published}</p>
                  ) : null}
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  {showSummary && item.summary ? <p className="mt-2 text-sm text-slate-600">{item.summary}</p> : null}
                  {tagsList.length > 0 ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {tagsList.map((tagItem) => (
                        <span key={tagItem} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                          {tagItem}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </Link>
              )
            })}
          </div>
        )}
      </section>
    </SectionWrapper>
  )
}
