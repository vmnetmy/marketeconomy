import type { CMSBlock, FeatureGridAdvancedSettings } from '../../lib/cms'

import { getFeatureGridStyles, getSectionProps } from '../../lib/blocks'
import { SectionWrapper } from '../layout/SectionWrapper'
import { IconBadge } from '../ui/IconBadge'

type FeatureGridBlock = CMSBlock & {
  headline?: string
  intro?: string
  columns?: string
  features?: Array<{ title?: string; description?: string; icon?: string; link?: { label?: string; url?: string } }>
  advanced?: FeatureGridAdvancedSettings
}

export function FeatureGridBlock({ block }: { block: FeatureGridBlock }) {
  const columns = Number(block.columns ?? 3)
  const gridCols = columns === 2 ? 'lg:grid-cols-2' : columns === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'
  const advanced = block.advanced ?? {}
  const sectionProps = getSectionProps(advanced)
  const { cardClass } = getFeatureGridStyles(advanced)

  return (
    <SectionWrapper {...sectionProps}>
      <div className="mb-16 max-w-3xl space-y-4">
        {block.headline ? (
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{block.headline}</h2>
        ) : null}
        {block.intro ? <p className="text-lg text-slate-600">{block.intro}</p> : null}
      </div>

      <div className={`grid gap-8 ${gridCols}`}>
        {(block.features || []).map((feature, index) => (
          <div
            key={`${feature.title ?? 'feature'}-${index}`}
            className={`group relative flex flex-col items-start rounded-3xl p-8 ${cardClass}`}
          >
            <IconBadge name={feature.icon} />
            {feature.title ? (
              <h3 className="mb-3 mt-6 text-xl font-semibold text-slate-900 transition-colors group-hover:text-blue-600">
                {feature.title}
              </h3>
            ) : null}
            {feature.description ? (
              <p className="mb-6 flex-1 text-base leading-relaxed text-slate-600">{feature.description}</p>
            ) : null}
            {feature.link?.label && feature.link?.url ? (
              <a href={feature.link.url} className="mt-auto inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700">
                {feature.link.label}
                <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
              </a>
            ) : null}
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
