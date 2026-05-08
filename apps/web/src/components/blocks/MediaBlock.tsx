import type { CMSBlock, CMSMedia, MediaBlockAdvancedSettings } from '../../lib/cms'

import { getMediaBlockStyles, getSectionProps } from '../../lib/blocks'
import { resolveMediaUrl } from '../../lib/cms'
import { CMSImage } from '../media/CMSImage'
import { SectionWrapper } from '../layout/SectionWrapper'

type MediaBlock = CMSBlock & {
  media?: CMSMedia | string | null
  caption?: string
  alignment?: string
  advanced?: MediaBlockAdvancedSettings
}

export function MediaBlock({ block }: { block: MediaBlock }) {
  const sectionProps = getSectionProps(block.advanced)
  const { frameClass, radiusClass } = getMediaBlockStyles(block.advanced)
  const mediaUrl = resolveMediaUrl(block.media)
  const mimeType = typeof block.media === 'object' && block.media ? block.media.mimeType : null
  const isVideo = Boolean(mimeType?.startsWith('video/') || mediaUrl?.match(/\.(mp4|webm|ogg)(\?|$)/i))

  return (
    <SectionWrapper {...sectionProps}>
      <section className="space-y-3">
        {mediaUrl && isVideo ? (
          <video
            className={`aspect-video w-full bg-slate-950 object-contain ${radiusClass} ${frameClass}`.trim()}
            controls
            playsInline
            preload="metadata"
          >
            <source src={mediaUrl} type={mimeType || undefined} />
          </video>
        ) : block.media ? (
          <CMSImage media={block.media} className={`w-full ${radiusClass} ${frameClass}`.trim()} />
        ) : null}
        {block.caption ? <p className="text-sm text-slate-500">{block.caption}</p> : null}
      </section>
    </SectionWrapper>
  )
}
