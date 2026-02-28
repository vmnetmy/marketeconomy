import type { CMSBlock } from '../../lib/cms'

import { SectionWrapper } from '../layout/SectionWrapper'

type TimelineBlock = CMSBlock & {
  headline?: string
  items?: Array<{ title?: string; date?: string; description?: string }>
}

export function TimelineBlock({ block }: { block: TimelineBlock }) {
  return (
    <SectionWrapper>
      <section className="space-y-6">
        {block.headline ? <h2 className="text-2xl font-semibold">{block.headline}</h2> : null}
        <div className="space-y-4">
          {(block.items || []).map((item, index) => (
            <div key={`${item.title ?? 'milestone'}-${index}`} className="rounded-2xl border border-slate-200 bg-white p-5">
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
