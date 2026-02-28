import type { CMSBlock, CMSMedia } from '../../lib/cms'
import { CMSImage } from '../media/CMSImage'

type HeroBlock = CMSBlock & {
  headline?: string
  subheadline?: string
  backgroundImage?: CMSMedia | string | null
  primaryCTA?: { label?: string; url?: string }
  secondaryCTA?: { label?: string; url?: string }
}

export function HeroBlock({ block }: { block: HeroBlock }) {
  return (
    <section className="relative flex min-h-[85vh] w-full flex-col items-center justify-center overflow-hidden bg-slate-950 px-6 pb-24 pt-40 text-white md:pt-48">
      {block.backgroundImage ? (
        <>
          <div className="absolute inset-0 z-0">
            <CMSImage
              media={block.backgroundImage}
              fill
              priority
              className="object-cover opacity-50 mix-blend-luminosity"
            />
          </div>
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
        </>
      ) : null}

      <div className="relative z-10 mx-auto w-full max-w-4xl space-y-8 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
          {block.headline}
        </h1>

        {block.subheadline ? (
          <p className="mx-auto max-w-2xl text-lg font-medium leading-relaxed text-slate-300 sm:text-xl">
            {block.subheadline}
          </p>
        ) : null}

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          {block.primaryCTA?.label && block.primaryCTA?.url ? (
            <a
              href={block.primaryCTA.url}
              className="rounded-full bg-blue-600 px-8 py-4 text-sm font-semibold tracking-wide text-white transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/30 active:scale-95"
            >
              {block.primaryCTA.label}
            </a>
          ) : null}
          {block.secondaryCTA?.label && block.secondaryCTA?.url ? (
            <a
              href={block.secondaryCTA.url}
              className="rounded-full border border-slate-400/30 bg-white/5 px-8 py-4 text-sm font-semibold tracking-wide text-white backdrop-blur-md transition-all hover:bg-white/10 active:scale-95"
            >
              {block.secondaryCTA.label}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  )
}
