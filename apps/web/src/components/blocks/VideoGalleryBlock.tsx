import { PlayCircle } from 'lucide-react'

import type { CMSBlock, CMSMedia, VideoGalleryAdvancedSettings } from '../../lib/cms'

import { getSectionProps, getVideoGalleryStyles } from '../../lib/blocks'
import { resolveMediaUrl } from '../../lib/cms'
import { SectionWrapper } from '../layout/SectionWrapper'
import { CMSImage } from '../media/CMSImage'

type VideoGalleryItem = {
  title?: string
  description?: string
  video?: CMSMedia | string | null
  poster?: CMSMedia | string | null
  duration?: string
}

type VideoGalleryBlock = CMSBlock & {
  sectionTitle?: string
  sectionIntro?: string
  videos?: VideoGalleryItem[]
  advanced?: VideoGalleryAdvancedSettings
}

export function VideoGalleryBlock({ block }: { block: VideoGalleryBlock }) {
  const sectionProps = getSectionProps(block.advanced, { width: 'wide' })
  const { cardClass } = getVideoGalleryStyles(block.advanced)
  const videos = block.videos ?? []

  return (
    <SectionWrapper {...sectionProps}>
      <section className="space-y-7">
        {block.sectionTitle || block.sectionIntro ? (
          <div className="max-w-3xl">
            {block.sectionTitle ? (
              <h2 className="text-2xl font-semibold tracking-normal text-slate-950">{block.sectionTitle}</h2>
            ) : null}
            {block.sectionIntro ? (
              <p className="mt-2 text-base leading-relaxed text-slate-600">{block.sectionIntro}</p>
            ) : null}
          </div>
        ) : null}

        <div className="grid gap-5 md:grid-cols-2">
          {videos.map((item, index) => {
            const videoUrl = resolveMediaUrl(item.video)
            const posterUrl = resolveMediaUrl(item.poster)
            const mimeType = typeof item.video === 'object' && item.video ? item.video.mimeType : undefined
            const title = item.title || `Video ${index + 1}`

            return (
              <article key={`${title}-${index}`} className={`overflow-hidden rounded-lg ${cardClass}`}>
                <div className="relative bg-slate-950">
                  {videoUrl ? (
                    <video
                      className="aspect-video w-full bg-slate-950 object-contain"
                      controls
                      playsInline
                      preload="metadata"
                      poster={posterUrl || undefined}
                    >
                      <source src={videoUrl} type={mimeType || undefined} />
                    </video>
                  ) : posterUrl ? (
                    <CMSImage
                      media={item.poster}
                      alt={title}
                      className="aspect-video w-full object-cover"
                      height={720}
                      sizes="(min-width: 768px) 50vw, 100vw"
                      width={1280}
                    />
                  ) : (
                    <div className="flex aspect-video w-full items-center justify-center bg-slate-950 text-slate-500">
                      <PlayCircle aria-hidden="true" className="h-10 w-10" />
                    </div>
                  )}
                </div>

                <div className="space-y-3 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-semibold leading-snug text-slate-950">{title}</h3>
                    {item.duration ? (
                      <span className="shrink-0 rounded bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">
                        {item.duration}
                      </span>
                    ) : null}
                  </div>
                  {item.description ? (
                    <p className="text-sm leading-relaxed text-slate-600">{item.description}</p>
                  ) : null}
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </SectionWrapper>
  )
}
