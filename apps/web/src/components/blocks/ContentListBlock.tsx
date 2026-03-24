import type { CMSBlock, ContentListAdvancedSettings } from '../../lib/cms'

import { getContentListStyles, getSectionProps } from '../../lib/blocks'
import { getContentList } from '../../lib/cms'
import { EventCard } from '../events/EventCard'
import { CMSImage } from '../media/CMSImage'
import { SectionWrapper } from '../layout/SectionWrapper'

type ContentListBlock = CMSBlock & {
  source?: 'inTheNews' | 'policyBriefs' | 'events'
  limit?: number
  layout?: 'list' | 'grid'
  filterTag?: string
  advanced?: ContentListAdvancedSettings
}

export async function ContentListBlock({ block }: { block: ContentListBlock }) {
  if (!block.source) return null
  const items = await getContentList(block.source, {
    limit: block.limit,
    tag: block.filterTag,
  })

  const isGrid = block.layout === 'grid'
  const sectionProps = getSectionProps(block.advanced)
  const { cardClass, showImages, spacingClass } = getContentListStyles(block.advanced)

  const basePath =
    block.source === 'inTheNews'
      ? '/in-the-news'
      : block.source === 'policyBriefs'
        ? '/publications/policy-brief'
        : block.source === 'events'
          ? '/events'
          : ''

  return (
    <SectionWrapper {...sectionProps}>
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">
          {block.source === 'inTheNews'
            ? 'Latest News'
            : block.source === 'policyBriefs'
              ? 'Latest Policy Briefs'
              : 'Latest Events'}
        </h2>
        <div className={isGrid ? 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3' : spacingClass}>
          {items.map((item) =>
            block.source === 'events' ? (
              <EventCard
                key={item.id}
                event={item}
                href={basePath && item.slug ? `${basePath}/${item.slug}` : undefined}
              />
            ) : (
              <a
                key={item.id}
                href={basePath && item.slug ? `${basePath}/${item.slug}` : undefined}
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
                <h3 className="text-lg font-semibold">{item.title}</h3>
                {item.excerpt || item.summary ? (
                  <p className="mt-2 text-sm text-slate-600">{item.excerpt ?? item.summary}</p>
                ) : null}
              </a>
            ),
          )}
        </div>
      </section>
    </SectionWrapper>
  )
}
