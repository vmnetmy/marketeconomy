import type { CMSBlock, PricingAdvancedSettings } from '../../lib/cms'

import { getPricingStyles, getSectionProps } from '../../lib/blocks'
import { SectionWrapper } from '../layout/SectionWrapper'

type PricingBlock = CMSBlock & {
  headline?: string
  intro?: string
  tiers?: Array<{
    name?: string
    price?: string
    description?: string
    features?: Array<{ feature?: string }>
    ctaLabel?: string
    ctaUrl?: string
    highlight?: boolean
  }>
  advanced?: PricingAdvancedSettings
}

export function PricingBlock({ block }: { block: PricingBlock }) {
  const sectionProps = getSectionProps(block.advanced)
  const { gridClass, baseCardClass, highlightClass } = getPricingStyles(block.advanced)

  return (
    <SectionWrapper {...sectionProps}>
      <section className="space-y-6">
        <div>
          {block.headline ? <h2 className="text-2xl font-semibold">{block.headline}</h2> : null}
          {block.intro ? <p className="mt-2 text-slate-600">{block.intro}</p> : null}
        </div>
        <div className={`grid gap-4 ${gridClass}`}>
          {(block.tiers || []).map((tier, index) => (
            <div
              key={`${tier.name ?? 'tier'}-${index}`}
              className={`${baseCardClass} ${
                tier.highlight ? highlightClass : 'border-slate-200 bg-white text-slate-900'
              }`}
            >
              {tier.name ? <h3 className="text-lg font-semibold">{tier.name}</h3> : null}
              {tier.price ? <p className="mt-2 text-3xl font-semibold">{tier.price}</p> : null}
              {tier.description ? (
                <p className={`mt-2 text-sm ${tier.highlight ? 'text-white/80' : 'text-slate-500'}`}>
                  {tier.description}
                </p>
              ) : null}
              {tier.features?.length ? (
                <ul className="mt-4 space-y-2 text-sm">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={`${tier.name ?? 'tier'}-feature-${featureIndex}`}>{feature.feature}</li>
                  ))}
                </ul>
              ) : null}
              {tier.ctaLabel && tier.ctaUrl ? (
                <a
                  className={`mt-4 inline-flex rounded-full px-5 py-2 text-sm font-semibold ${
                    tier.highlight ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'
                  }`}
                  href={tier.ctaUrl}
                >
                  {tier.ctaLabel}
                </a>
              ) : null}
            </div>
          ))}
        </div>
      </section>
    </SectionWrapper>
  )
}
