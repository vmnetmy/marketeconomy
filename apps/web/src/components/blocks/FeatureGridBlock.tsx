import type { CMSBlock } from '../../lib/cms'

import { SectionWrapper } from '../layout/SectionWrapper'
import { IconBadge } from '../ui/IconBadge'

type FeatureGridBlock = CMSBlock & {
  headline?: string
  intro?: string
  columns?: string
  features?: Array<{ title?: string; description?: string; icon?: string; link?: { label?: string; url?: string } }>
}

export function FeatureGridBlock({ block }: { block: FeatureGridBlock }) {
  const columns = Number(block.columns ?? 3)
  const gridCols = columns === 2 ? 'md:grid-cols-2' : columns === 4 ? 'md:grid-cols-4' : 'md:grid-cols-3'

  return (
    <SectionWrapper>
      <section className="space-y-6">
        <div>
          {block.headline ? <h2 className="text-2xl font-semibold">{block.headline}</h2> : null}
          {block.intro ? <p className="mt-2 text-slate-600">{block.intro}</p> : null}
        </div>
        <div className={`grid gap-4 ${gridCols}`}>
          {(block.features || []).map((feature, index) => (
            <div
              key={`${feature.title ?? 'feature'}-${index}`}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <IconBadge name={feature.icon} />
              {feature.title ? <h3 className="text-lg font-semibold">{feature.title}</h3> : null}
              {feature.description ? <p className="mt-2 text-sm text-slate-600">{feature.description}</p> : null}
              {feature.link?.label && feature.link?.url ? (
                <a className="mt-4 inline-flex text-sm font-semibold text-slate-900" href={feature.link.url}>
                  {feature.link.label}
                </a>
              ) : null}
            </div>
          ))}
        </div>
      </section>
    </SectionWrapper>
  )
}
