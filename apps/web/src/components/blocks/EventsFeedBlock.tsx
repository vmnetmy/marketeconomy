import Link from 'next/link'

import type { CMSBlock, ContentListAdvancedSettings } from '../../lib/cms'
import { getContentListStyles, getSectionProps } from '../../lib/blocks'
import { getEventsFeed } from '../../lib/cms'
import { EventCard } from '../events/EventCard'
import { SectionWrapper } from '../layout/SectionWrapper'

type EventsFeedBlock = CMSBlock & {
  sectionTitle?: string
  sectionIntro?: string
  status?: 'upcoming' | 'past' | 'all'
  sort?: 'dateAsc' | 'dateDesc'
  limit?: number
  layout?: 'list' | 'grid'
  filterTag?: string
  cta?: {
    label?: string
    url?: string
  }
  advanced?: ContentListAdvancedSettings
}

export async function EventsFeedBlock({ block }: { block: EventsFeedBlock }) {
  const items = await getEventsFeed({
    limit: block.limit,
    status: block.status ?? 'upcoming',
    sort: block.sort ?? 'dateAsc',
    tag: block.filterTag,
  })

  const isGrid = block.layout !== 'list'
  const sectionProps = getSectionProps(block.advanced)
  const { spacingClass } = getContentListStyles(block.advanced)
  const sectionTitle = block.sectionTitle || 'Latest Events'
  const ctaLabel = block.cta?.label?.trim()
  const ctaUrl = block.cta?.url?.trim()

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
            No events available yet.
          </div>
        ) : (
          <div className={isGrid ? 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3' : spacingClass}>
            {items.map((item) => (
              <EventCard key={item.id} event={item} href={item.slug ? `/events/${item.slug}` : undefined} />
            ))}
          </div>
        )}
      </section>
    </SectionWrapper>
  )
}
