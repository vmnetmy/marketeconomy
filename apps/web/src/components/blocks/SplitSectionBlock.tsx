import type { CMSBlock, CMSMedia, SplitSectionAdvancedSettings } from '../../lib/cms'
import type { SerializedEditorState } from 'lexical'

import { getSectionProps, getSplitSectionStyles } from '../../lib/blocks'
import { CMSImage } from '../media/CMSImage'
import { SectionWrapper } from '../layout/SectionWrapper'
import { RichText } from '../ui/RichText'

type SplitSectionBlock = CMSBlock & {
  content?: SerializedEditorState
  media?: CMSMedia | string | null
  mediaPosition?: 'left' | 'right'
  background?: 'none' | 'light' | 'dark'
  advanced?: SplitSectionAdvancedSettings
}

export function SplitSectionBlock({ block }: { block: SplitSectionBlock }) {
  const advanced = block.advanced ?? {}
  const isDark = block.background === 'dark'
  const sectionProps = getSectionProps(advanced, { background: block.background ?? 'none' })
  const { mediaSizeClass, contentOrderClass, mediaOrderClass } = getSplitSectionStyles(advanced)

  const contentArea = (
    <div className={`space-y-6 ${isDark ? 'text-slate-300' : 'text-slate-600'} ${contentOrderClass}`.trim()}>
      <RichText content={block.content} />
    </div>
  )

  const mediaArea = block.media ? (
    <div
      className={`relative w-full overflow-hidden rounded-3xl shadow-2xl ring-1 ring-slate-900/5 ${mediaSizeClass} ${mediaOrderClass}`.trim()}
    >
      <CMSImage media={block.media} fill className="object-cover" />
    </div>
  ) : null

  return (
    <SectionWrapper {...sectionProps}>
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        {block.mediaPosition === 'left' ? (
          <>
            {mediaArea}
            {contentArea}
          </>
        ) : (
          <>
            {contentArea}
            {mediaArea}
          </>
        )}
      </div>
    </SectionWrapper>
  )
}
