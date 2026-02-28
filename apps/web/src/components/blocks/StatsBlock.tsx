import type { CMSBlock, StatsAdvancedSettings } from '../../lib/cms'

import { getSectionProps, getStatsStyles } from '../../lib/blocks'
import { SectionWrapper } from '../layout/SectionWrapper'

type StatsBlock = CMSBlock & {
  headline?: string
  intro?: string
  layout?: 'grid' | 'row'
  stats?: Array<{ value?: string; label?: string; detail?: string }>
  advanced?: StatsAdvancedSettings
}

export function StatsBlock({ block }: { block: StatsBlock }) {
  const sectionProps = getSectionProps(block.advanced)
  const { numberClass, gridClass, cardClass } = getStatsStyles(block.advanced, block.layout)

  return (
    <SectionWrapper {...sectionProps}>
      <section className="space-y-6">
        <div>
          {block.headline ? <h2 className="text-2xl font-semibold">{block.headline}</h2> : null}
          {block.intro ? <p className="mt-2 text-slate-600">{block.intro}</p> : null}
        </div>
        <div className={`grid gap-4 ${gridClass}`}>
          {(block.stats || []).map((item, index) => (
            <div key={`${item.label ?? 'stat'}-${index}`} className={cardClass}>
              {item.value ? <p className={`${numberClass} font-semibold`}>{item.value}</p> : null}
              {item.label ? <p className="mt-1 text-sm font-semibold text-slate-700">{item.label}</p> : null}
              {item.detail ? <p className="mt-2 text-sm text-slate-500">{item.detail}</p> : null}
            </div>
          ))}
        </div>
      </section>
    </SectionWrapper>
  )
}
