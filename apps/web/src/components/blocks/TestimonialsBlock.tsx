import type { AdvancedSettings, CMSBlock, CMSMedia } from '../../lib/cms'

import { getSectionProps } from '../../lib/blocks'
import { CMSImage } from '../media/CMSImage'
import { SectionWrapper } from '../layout/SectionWrapper'

type TestimonialsBlock = CMSBlock & {
  headline?: string
  items?: Array<{
    quote?: string
    name?: string
    role?: string
    organization?: string
    avatar?: CMSMedia | string | null
  }>
  advanced?: (AdvancedSettings & {
    layout?: 'grid' | 'carousel'
  })
}

export function TestimonialsBlock({ block }: { block: TestimonialsBlock }) {
  const sectionProps = getSectionProps(block.advanced)
  const layout = block.advanced?.layout ?? 'grid'
  const listClass =
    layout === 'carousel'
      ? 'flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4'
      : 'grid gap-4 md:grid-cols-2'

  return (
    <SectionWrapper {...sectionProps}>
      <section className="space-y-6">
        {block.headline ? <h2 className="text-2xl font-semibold">{block.headline}</h2> : null}
        <div className={listClass}>
          {(block.items || []).map((item, index) => (
            <figure
              key={`${item.name ?? 'testimonial'}-${index}`}
              className={`rounded-2xl border border-slate-200 bg-white p-6 ${layout === 'carousel' ? 'min-w-[280px] snap-start' : ''}`.trim()}
            >
              {item.quote ? <blockquote className="text-base text-slate-700">“{item.quote}”</blockquote> : null}
              <figcaption className="mt-4 flex items-center gap-3 text-sm text-slate-600">
                {item.avatar ? (
                  <CMSImage
                    media={item.avatar}
                    alt={item.name}
                    className="h-10 w-10 rounded-full object-cover"
                    height={40}
                    sizes="40px"
                    width={40}
                  />
                ) : null}
                <div>
                  {item.name ? <div className="font-semibold text-slate-900">{item.name}</div> : null}
                  {item.role || item.organization ? (
                    <div>{[item.role, item.organization].filter(Boolean).join(', ')}</div>
                  ) : null}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </SectionWrapper>
  )
}
