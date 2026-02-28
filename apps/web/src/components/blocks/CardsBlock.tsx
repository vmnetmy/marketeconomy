import type { CardsAdvancedSettings, CMSBlock } from '../../lib/cms'

import { getCardsStyles, getSectionProps } from '../../lib/blocks'
import { SectionWrapper } from '../layout/SectionWrapper'
import { IconBadge } from '../ui/IconBadge'

type CardsBlock = CMSBlock & {
  sectionTitle?: string
  sectionIntro?: string
  cards?: Array<{ title?: string; description?: string; icon?: string; link?: { label?: string; url?: string } }>
  advanced?: CardsAdvancedSettings
}

export function CardsBlock({ block }: { block: CardsBlock }) {
  const sectionProps = getSectionProps(block.advanced)
  const { gridClass, cardClass } = getCardsStyles(block.advanced)

  return (
    <SectionWrapper {...sectionProps}>
      <section className="space-y-6">
        <div>
          {block.sectionTitle ? <h2 className="text-2xl font-semibold">{block.sectionTitle}</h2> : null}
          {block.sectionIntro ? <p className="mt-2 text-slate-600">{block.sectionIntro}</p> : null}
        </div>
        <div className={`grid gap-4 ${gridClass}`}>
          {(block.cards || []).map((card, index) => (
            <div
              key={`${card.title ?? 'card'}-${index}`}
              className={`rounded-2xl p-5 ${cardClass}`}
            >
              <IconBadge name={card.icon} />
              {card.title ? <h3 className="text-lg font-semibold">{card.title}</h3> : null}
              {card.description ? <p className="mt-2 text-sm text-slate-600">{card.description}</p> : null}
              {card.link?.label && card.link?.url ? (
                <a className="mt-4 inline-flex text-sm font-semibold text-slate-900" href={card.link.url}>
                  {card.link.label}
                </a>
              ) : null}
            </div>
          ))}
        </div>
      </section>
    </SectionWrapper>
  )
}
