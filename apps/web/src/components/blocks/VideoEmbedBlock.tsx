import type { CMSBlock } from '../../lib/cms'

import { SectionWrapper } from '../layout/SectionWrapper'

type VideoEmbedBlock = CMSBlock & {
  headline?: string
  embedUrl?: string
  caption?: string
  aspectRatio?: '16:9' | '4:3' | '1:1'
}

export function VideoEmbedBlock({ block }: { block: VideoEmbedBlock }) {
  if (!block.embedUrl) return null
  const ratio =
    block.aspectRatio === '4:3' ? 'pt-[75%]' : block.aspectRatio === '1:1' ? 'pt-[100%]' : 'pt-[56.25%]'

  return (
    <SectionWrapper>
      <section className="space-y-4">
        {block.headline ? <h2 className="text-2xl font-semibold">{block.headline}</h2> : null}
        <div className={`relative w-full overflow-hidden rounded-2xl bg-slate-200 ${ratio}`}>
          <iframe
            className="absolute inset-0 h-full w-full"
            src={block.embedUrl}
            title={block.caption || block.headline || 'Video'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        {block.caption ? <p className="text-sm text-slate-500">{block.caption}</p> : null}
      </section>
    </SectionWrapper>
  )
}
