import type { CMSBlock } from '../../lib/cms'

import { SectionWrapper } from '../layout/SectionWrapper'

type StatsBlock = CMSBlock & {
  headline?: string
  intro?: string
  layout?: 'grid' | 'row'
  stats?: Array<{ value?: string; label?: string; detail?: string }>
}

export function StatsBlock({ block }: { block: StatsBlock }) {
  const layoutClass = block.layout === 'row' ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-3'

  return (
    <SectionWrapper>
      <section className="space-y-6">
        <div>
          {block.headline ? <h2 className="text-2xl font-semibold">{block.headline}</h2> : null}
          {block.intro ? <p className="mt-2 text-slate-600">{block.intro}</p> : null}
        </div>
        <div className={`grid gap-4 ${layoutClass}`}>
          {(block.stats || []).map((item, index) => (
            <div key={`${item.label ?? 'stat'}-${index}`} className="rounded-2xl border border-slate-200 bg-white p-5">
              {item.value ? <p className="text-3xl font-semibold">{item.value}</p> : null}
              {item.label ? <p className="mt-1 text-sm font-semibold text-slate-700">{item.label}</p> : null}
              {item.detail ? <p className="mt-2 text-sm text-slate-500">{item.detail}</p> : null}
            </div>
          ))}
        </div>
      </section>
    </SectionWrapper>
  )
}
