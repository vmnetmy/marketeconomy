import type { CMSBlock, CMSMedia } from '../../lib/cms'

import { CMSImage } from '../media/CMSImage'
import { SectionWrapper } from '../layout/SectionWrapper'

type MediaBlock = CMSBlock & {
  media?: CMSMedia | string | null
  caption?: string
  alignment?: string
}

export function MediaBlock({ block }: { block: MediaBlock }) {
  return (
    <SectionWrapper>
      <section className="space-y-3">
        {block.media ? (
          <CMSImage media={block.media} className="w-full rounded-2xl border border-slate-200" />
        ) : null}
        {block.caption ? <p className="text-sm text-slate-500">{block.caption}</p> : null}
      </section>
    </SectionWrapper>
  )
}
