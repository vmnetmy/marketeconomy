import type { CMSBlock, CMSMedia } from '../../lib/cms'
import { resolveMediaUrl } from '../../lib/cms'
import { SectionWrapper } from '../layout/SectionWrapper'

type HeroBlock = CMSBlock & {
  headline?: string
  subheadline?: string
  backgroundImage?: CMSMedia | string | null
  primaryCTA?: { label?: string; url?: string }
  secondaryCTA?: { label?: string; url?: string }
  alignment?: string
}

export function HeroBlock({ block }: { block: HeroBlock }) {
  const backgroundUrl = resolveMediaUrl(block.backgroundImage)

  return (
    <SectionWrapper padding="large">
      <section className="relative overflow-hidden rounded-3xl bg-slate-900 px-10 py-16 text-white">
        {backgroundUrl ? (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-25"
            style={{ backgroundImage: `url(${backgroundUrl})` }}
          />
        ) : null}
        <div className="relative z-10 max-w-3xl space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight">{block.headline}</h1>
          {block.subheadline ? <p className="text-lg text-slate-200">{block.subheadline}</p> : null}
          <div className="flex flex-wrap gap-3">
            {block.primaryCTA?.label && block.primaryCTA?.url ? (
              <a className="rounded-full bg-white px-6 py-2 text-sm font-semibold text-slate-900" href={block.primaryCTA.url}>
                {block.primaryCTA.label}
              </a>
            ) : null}
            {block.secondaryCTA?.label && block.secondaryCTA?.url ? (
              <a
                className="rounded-full border border-white/40 px-6 py-2 text-sm font-semibold text-white"
                href={block.secondaryCTA.url}
              >
                {block.secondaryCTA.label}
              </a>
            ) : null}
          </div>
        </div>
      </section>
    </SectionWrapper>
  )
}
