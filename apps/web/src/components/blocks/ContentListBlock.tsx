import type { CMSBlock } from '../../lib/cms'

import { getContentList } from '../../lib/cms'
import { SectionWrapper } from '../layout/SectionWrapper'

type ContentListBlock = CMSBlock & {
  source?: 'posts' | 'policyBriefs' | 'events'
  limit?: number
  layout?: 'list' | 'grid'
  filterTag?: string
}

export async function ContentListBlock({ block }: { block: ContentListBlock }) {
  if (!block.source) return null
  const items = await getContentList(block.source, {
    limit: block.limit,
    tag: block.filterTag,
  })

  const basePath =
    block.source === 'posts'
      ? '/updates'
      : block.source === 'policyBriefs'
        ? '/policy-briefs'
        : block.source === 'events'
          ? '/events'
          : ''

  return (
    <SectionWrapper>
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Latest {block.source}</h2>
        <div className={block.layout === 'grid' ? 'grid gap-4 md:grid-cols-2' : 'space-y-3'}>
          {items.map((item) => (
            <a
              key={item.id}
              href={basePath && item.slug ? `${basePath}/${item.slug}` : undefined}
              className="block rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
            >
              <h3 className="text-lg font-semibold">{item.title}</h3>
              {item.excerpt || item.summary ? (
                <p className="mt-2 text-sm text-slate-600">{item.excerpt ?? item.summary}</p>
              ) : null}
            </a>
          ))}
        </div>
      </section>
    </SectionWrapper>
  )
}
