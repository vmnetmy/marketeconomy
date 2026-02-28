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
}

export function SplitSectionBlock({ block }: { block: SplitSectionBlock }) {
  const isDark = block.background === 'dark'

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
    <SectionWrapper background={block.background}>
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
