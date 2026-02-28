import type { CMSBlock, CMSMedia } from '../../lib/cms'
import type { SerializedEditorState } from 'lexical'

import { CMSImage } from '../media/CMSImage'
import { SectionWrapper } from '../layout/SectionWrapper'
import { RichText } from '../ui/RichText'

type SplitSectionBlock = CMSBlock & {
  content?: SerializedEditorState
  media?: CMSMedia | string | null
  mediaPosition?: 'left' | 'right'
  background?: 'none' | 'light' | 'dark'
  advanced?: {
    anchorId?: string
    padding?: 'none' | 'compact' | 'standard' | 'large'
    width?: 'standard' | 'wide' | 'full'
    hideOnMobile?: boolean
    hideOnDesktop?: boolean
  }
}

export function SplitSectionBlock({ block }: { block: SplitSectionBlock }) {
  const advanced = block.advanced ?? {}
  const isDark = block.background === 'dark'
  const visibilityClass = [
    advanced.hideOnMobile ? 'hidden md:block' : '',
    advanced.hideOnDesktop ? 'block md:hidden' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const contentArea = (
    <div className={`space-y-6 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
      <RichText content={block.content} />
    </div>
  )

  const mediaArea = block.media ? (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-2xl ring-1 ring-slate-900/5">
      <CMSImage media={block.media} fill className="object-cover" />
    </div>
  ) : null

  return (
    <SectionWrapper
      id={advanced.anchorId}
      background={block.background}
      padding={advanced.padding}
      width={advanced.width}
      className={visibilityClass}
    >
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
