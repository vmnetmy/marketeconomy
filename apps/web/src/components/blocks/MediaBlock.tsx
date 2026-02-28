import type { CMSBlock, CMSMedia, MediaBlockAdvancedSettings } from '../../lib/cms'

import { getMediaBlockStyles, getSectionProps } from '../../lib/blocks'
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

  return (
    <SectionWrapper {...sectionProps}>
      <section className="space-y-3">
        {block.media ? (
          <CMSImage media={block.media} className={`w-full ${radiusClass} ${frameClass}`.trim()} />
        ) : null}
        {block.caption ? <p className="text-sm text-slate-500">{block.caption}</p> : null}
      </section>
    </SectionWrapper>
  )
}
