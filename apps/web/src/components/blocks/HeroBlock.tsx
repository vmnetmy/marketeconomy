import type { CMSBlock, CMSMedia, HeroAdvancedSettings } from '../../lib/cms'

import { CMSImage } from '../media/CMSImage'
import { IconBadge } from '../ui/IconBadge'
import { getHeroStyles, getVisibilityClass } from '../../lib/blocks'

type HeroBlock = CMSBlock & {
  headline?: string
  subheadline?: string
  eyebrow?: string
  backgroundImage?: CMSMedia | string | null
  backgroundImageUrl?: string | null
  primaryCTA?: { label?: string; url?: string }
  secondaryCTA?: { label?: string; url?: string }
  latestLink?: { label?: string; url?: string }
  impactTitle?: string
  impactItems?: Array<{ value?: string; label?: string; icon?: string }>
  alignment?: 'left' | 'center' | 'right' | 'split'
  advanced?: HeroAdvancedSettings
}

export function HeroBlock({ block }: { block: HeroBlock }) {
  const advanced = block.advanced ?? {}
  const tone = advanced.tone ?? 'dark'
  const { toneClass, minHeightClass, overlayClass } = getHeroStyles(advanced)
  const paddingClass =
    advanced.padding === 'compact' ? 'pt-24 pb-16 md:pt-28' : advanced.padding === 'large' ? 'pt-40 pb-24 md:pt-48' : 'pt-32 pb-20 md:pt-40'
  const alignment = block.alignment ?? 'center'
  const contentAlignClass =
    alignment === 'left' ? 'items-start text-left' : alignment === 'right' ? 'items-end text-right' : 'items-center text-center'
  const visibilityClass = getVisibilityClass(advanced)
  const anchorId = advanced.anchorId || undefined
  const overlayStrength = advanced.overlayStrength ?? 'medium'
  const overlayOpacity =
    overlayStrength === 'light' ? 'opacity-40' : overlayStrength === 'strong' ? 'opacity-70' : 'opacity-55'

  const baseToneClasses = toneClass
  const subheadlineClass = tone === 'light' ? 'text-slate-600' : 'text-slate-300'
  const eyebrowClass = tone === 'light' ? 'text-slate-500' : 'text-white/60'
  const latestLinkClass = tone === 'light' ? 'text-slate-500 hover:text-slate-900' : 'text-white/70 hover:text-white'
  const latestDotClass = tone === 'light' ? 'bg-blue-600' : 'bg-cyan-300'
  const latestDotPingClass = tone === 'light' ? 'bg-blue-500' : 'bg-cyan-400'
  const impactTitleClass = tone === 'light' ? 'text-slate-500' : 'text-white/50'
  const impactValueClass = tone === 'light' ? 'text-slate-900' : 'text-white'
  const impactLabelClass = tone === 'light' ? 'text-slate-600' : 'text-white/70'
  const primaryCtaClass =
    tone === 'light'
      ? 'rounded-full bg-slate-900 px-8 py-4 text-sm font-semibold tracking-wide text-white transition-all hover:bg-slate-800 active:scale-95'
      : 'rounded-full bg-blue-600 px-8 py-4 text-sm font-semibold tracking-wide text-white transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/30 active:scale-95'
  const secondaryCtaClass =
    tone === 'light'
      ? 'rounded-full border border-slate-300 bg-white px-8 py-4 text-sm font-semibold tracking-wide text-slate-700 transition-all hover:bg-slate-50 active:scale-95'
      : 'rounded-full border border-slate-400/30 bg-white/5 px-8 py-4 text-sm font-semibold tracking-wide text-white backdrop-blur-md transition-all hover:bg-white/10 active:scale-95'

  const backgroundMedia = block.backgroundImageUrl || block.backgroundImage
  const impactItems = block.impactItems ?? []

  return (
    <section
      id={anchorId}
      className={`relative flex w-full flex-col justify-center overflow-hidden px-6 ${minHeightClass} ${paddingClass} ${baseToneClasses} ${visibilityClass}`.trim()}
    >
      {backgroundMedia ? (
        <>
          <div className="absolute inset-0 z-0">
            <CMSImage
              media={backgroundMedia}
              fill
              priority
              className={`object-cover mix-blend-luminosity ${overlayOpacity}`}
            />
          </div>
          <div className={`absolute inset-0 z-0 ${overlayClass}`} />
        </>
      ) : null}

      <div
        className={`relative z-10 mx-auto flex w-full max-w-4xl flex-col space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 ${contentAlignClass}`}
      >
        {block.eyebrow ? (
          <span className={`text-xs font-semibold uppercase tracking-[0.38em] ${eyebrowClass}`}>{block.eyebrow}</span>
        ) : null}
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">{block.headline}</h1>

        {block.subheadline ? (
          <p className={`max-w-2xl text-lg font-medium leading-relaxed sm:text-xl ${subheadlineClass}`}>
            {block.subheadline}
          </p>
        ) : null}

        {block.latestLink?.label && block.latestLink?.url ? (
          <a
            className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] transition ${latestLinkClass}`}
            href={block.latestLink.url}
          >
            <span className="relative flex h-2 w-2">
              <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-70 ${latestDotPingClass}`} />
              <span className={`relative inline-flex h-2 w-2 rounded-full ${latestDotClass}`} />
            </span>
            <span>{block.latestLink.label}</span>
            <span className={tone === 'light' ? 'text-slate-400' : 'text-white/40'}>→</span>
          </a>
        ) : null}

        {impactItems.length > 0 ? (
          <div className="space-y-4">
            {block.impactTitle ? (
              <div className={`text-[11px] font-semibold uppercase tracking-[0.32em] ${impactTitleClass}`}>
                {block.impactTitle}
              </div>
            ) : null}
            <div className="grid gap-4 sm:grid-cols-2">
              {impactItems.map((item, index) => (
                <div key={`${item.label ?? 'impact'}-${index}`} className="flex items-start gap-3">
                  <IconBadge
                    name={item.icon}
                    variant="inline"
                    className="bg-white/10 text-white"
                    iconClassName="h-4 w-4"
                  />
                  <div>
                    {item.value ? <div className={`text-lg font-semibold ${impactValueClass}`}>{item.value}</div> : null}
                    {item.label ? <div className={`text-sm ${impactLabelClass}`}>{item.label}</div> : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className={`flex flex-wrap gap-4 pt-4 ${alignment === 'left' ? 'justify-start' : alignment === 'right' ? 'justify-end' : 'justify-center'}`}>
          {block.primaryCTA?.label && block.primaryCTA?.url ? (
            <a
              href={block.primaryCTA.url}
              className={primaryCtaClass}
            >
              {block.primaryCTA.label}
            </a>
          ) : null}
          {block.secondaryCTA?.label && block.secondaryCTA?.url ? (
            <a
              href={block.secondaryCTA.url}
              className={secondaryCtaClass}
            >
              {block.secondaryCTA.label}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  )
}
