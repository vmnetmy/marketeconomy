import type { AdvancedSettings, CMSBlock, CMSMedia } from '../../lib/cms'

import { CMSImage } from '../media/CMSImage'

type HeroBlock = CMSBlock & {
  headline?: string
  subheadline?: string
  backgroundImage?: CMSMedia | string | null
  primaryCTA?: { label?: string; url?: string }
  secondaryCTA?: { label?: string; url?: string }
  alignment?: 'left' | 'center' | 'right' | 'split'
  advanced?: (AdvancedSettings & {
    tone?: 'dark' | 'light'
    minHeight?: 'short' | 'medium' | 'large' | 'tall'
    overlayStrength?: 'light' | 'medium' | 'strong'
  })
}

export function HeroBlock({ block }: { block: HeroBlock }) {
  const advanced = block.advanced ?? {}
  const tone = advanced.tone ?? 'dark'
  const minHeightClass =
    advanced.minHeight === 'short'
      ? 'min-h-[60vh]'
      : advanced.minHeight === 'medium'
        ? 'min-h-[75vh]'
        : 'min-h-[85vh]'
  const paddingClass =
    advanced.padding === 'compact' ? 'pt-24 pb-16 md:pt-28' : advanced.padding === 'large' ? 'pt-40 pb-24 md:pt-48' : 'pt-32 pb-20 md:pt-40'
  const alignment = block.alignment ?? 'center'
  const contentAlignClass =
    alignment === 'left' ? 'items-start text-left' : alignment === 'right' ? 'items-end text-right' : 'items-center text-center'
  const visibilityClass = advanced.hideOnMobile ? 'hidden md:flex' : advanced.hideOnDesktop ? 'flex md:hidden' : ''
  const anchorId = advanced.anchorId || undefined
  const overlayStrength = advanced.overlayStrength ?? 'medium'
  const overlayOpacity =
    overlayStrength === 'light' ? 'opacity-40' : overlayStrength === 'strong' ? 'opacity-70' : 'opacity-55'
  const gradientClass =
    tone === 'light'
      ? overlayStrength === 'strong'
        ? 'bg-gradient-to-t from-white via-white/90 to-transparent'
        : overlayStrength === 'light'
          ? 'bg-gradient-to-t from-white via-white/70 to-transparent'
          : 'bg-gradient-to-t from-white via-white/80 to-transparent'
      : overlayStrength === 'strong'
        ? 'bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent'
        : overlayStrength === 'light'
          ? 'bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent'
          : 'bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent'

  const baseToneClasses =
    tone === 'light' ? 'bg-white text-slate-900' : 'bg-slate-950 text-white'
  const subheadlineClass = tone === 'light' ? 'text-slate-600' : 'text-slate-300'
  const primaryCtaClass =
    tone === 'light'
      ? 'rounded-full bg-slate-900 px-8 py-4 text-sm font-semibold tracking-wide text-white transition-all hover:bg-slate-800 active:scale-95'
      : 'rounded-full bg-blue-600 px-8 py-4 text-sm font-semibold tracking-wide text-white transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/30 active:scale-95'
  const secondaryCtaClass =
    tone === 'light'
      ? 'rounded-full border border-slate-300 bg-white px-8 py-4 text-sm font-semibold tracking-wide text-slate-700 transition-all hover:bg-slate-50 active:scale-95'
      : 'rounded-full border border-slate-400/30 bg-white/5 px-8 py-4 text-sm font-semibold tracking-wide text-white backdrop-blur-md transition-all hover:bg-white/10 active:scale-95'

  return (
    <section
      id={anchorId}
      className={`relative flex w-full flex-col justify-center overflow-hidden px-6 ${minHeightClass} ${paddingClass} ${baseToneClasses} ${visibilityClass}`.trim()}
    >
      {block.backgroundImage ? (
        <>
          <div className="absolute inset-0 z-0">
            <CMSImage
              media={block.backgroundImage}
              fill
              priority
              className={`object-cover mix-blend-luminosity ${overlayOpacity}`}
            />
          </div>
          <div className={`absolute inset-0 z-0 ${gradientClass}`} />
        </>
      ) : null}

      <div
        className={`relative z-10 mx-auto flex w-full max-w-4xl flex-col space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 ${contentAlignClass}`}
      >
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">{block.headline}</h1>

        {block.subheadline ? (
          <p className={`max-w-2xl text-lg font-medium leading-relaxed sm:text-xl ${subheadlineClass}`}>
            {block.subheadline}
          </p>
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
