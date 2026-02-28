import type { CMSBlock } from '../../lib/cms'
import type { SerializedEditorState } from 'lexical'

import { SectionWrapper } from '../layout/SectionWrapper'
import { RichText } from '../ui/RichText'

type TwoColumnRichTextBlock = CMSBlock & {
  left?: SerializedEditorState
  right?: SerializedEditorState
  background?: 'none' | 'light' | 'dark'
}

export function TwoColumnRichTextBlock({ block }: { block: TwoColumnRichTextBlock }) {
  const background = block.background ?? 'none'
  const isDark = background === 'dark'

  return (
    <SectionWrapper background={background}>
      <section className="grid gap-8 md:grid-cols-2">
        <div>{block.left ? <RichText content={block.left} className={isDark ? 'prose-invert' : ''} /> : null}</div>
        <div>{block.right ? <RichText content={block.right} className={isDark ? 'prose-invert' : ''} /> : null}</div>
      </section>
    </SectionWrapper>
  )
}
