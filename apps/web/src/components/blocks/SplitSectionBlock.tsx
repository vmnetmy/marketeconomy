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
  const sectionBackground = block.background ?? 'none'
  const isDark = sectionBackground === 'dark'

  const content = (
    <div className="space-y-4">
      <RichText content={block.content} className={isDark ? 'prose-invert' : ''} />
    </div>
  )

  const media = block.media ? (
    <CMSImage
      media={block.media}
      className="w-full rounded-2xl border border-slate-200"
      sizes="(max-width: 768px) 100vw, 50vw"
    />
  ) : null

  return (
    <SectionWrapper background={sectionBackground}>
      <section className="grid gap-8 md:grid-cols-2 md:items-center">
        {block.mediaPosition === 'left' ? media : content}
        {block.mediaPosition === 'left' ? content : media}
      </section>
    </SectionWrapper>
  )
}
