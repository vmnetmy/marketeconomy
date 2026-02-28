import type { CMSBlock } from '../../lib/cms'

import { SectionWrapper } from '../layout/SectionWrapper'
import { IconBadge } from '../ui/IconBadge'

type CardsBlock = CMSBlock & {
  sectionTitle?: string
  sectionIntro?: string
  cards?: Array<{ title?: string; description?: string; icon?: string; link?: { label?: string; url?: string } }>
}

export function CardsBlock({ block }: { block: CardsBlock }) {
  return (
    <SectionWrapper>
      <section className="space-y-6">
        <div>
          {block.sectionTitle ? <h2 className="text-2xl font-semibold">{block.sectionTitle}</h2> : null}
          {block.sectionIntro ? <p className="mt-2 text-slate-600">{block.sectionIntro}</p> : null}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {(block.cards || []).map((card, index) => (
            <div
              key={`${card.title ?? 'card'}-${index}`}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
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
