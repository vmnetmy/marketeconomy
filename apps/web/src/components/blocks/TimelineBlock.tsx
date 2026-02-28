import type { CMSBlock, TimelineAdvancedSettings } from '../../lib/cms'

import { getSectionProps, getTimelineStyles } from '../../lib/blocks'
import { SectionWrapper } from '../layout/SectionWrapper'

type TimelineBlock = CMSBlock & {
  headline?: string
  items?: Array<{ title?: string; date?: string; description?: string }>
  advanced?: TimelineAdvancedSettings
}

export function TimelineBlock({ block }: { block: TimelineBlock }) {
  const sectionProps = getSectionProps(block.advanced)
  const { listClass, itemClass } = getTimelineStyles(block.advanced)

  return (
    <SectionWrapper {...sectionProps}>
      <section className="space-y-6">
        {block.headline ? <h2 className="text-2xl font-semibold">{block.headline}</h2> : null}
        <div className={listClass}>
          {(block.items || []).map((item, index) => (
            <div key={`${item.title ?? 'milestone'}-${index}`} className={itemClass}>
              <div className="flex flex-wrap items-baseline gap-2">
                {item.title ? <h3 className="text-lg font-semibold">{item.title}</h3> : null}
                {item.date ? <span className="text-sm text-slate-500">{item.date}</span> : null}
              </div>
              {item.description ? <p className="mt-2 text-sm text-slate-600">{item.description}</p> : null}
            </div>
          ))}
        </div>
      </section>
    </SectionWrapper>
  )
}
