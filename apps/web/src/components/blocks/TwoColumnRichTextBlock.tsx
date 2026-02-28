import type { CMSBlock, TwoColumnRichTextAdvancedSettings } from '../../lib/cms'
import type { SerializedEditorState } from 'lexical'

import { getSectionProps, getTwoColumnRichTextStyles } from '../../lib/blocks'
import { SectionWrapper } from '../layout/SectionWrapper'
import { RichText } from '../ui/RichText'

type TwoColumnRichTextBlock = CMSBlock & {
  left?: SerializedEditorState
  right?: SerializedEditorState
  background?: 'none' | 'light' | 'dark'
  advanced?: TwoColumnRichTextAdvancedSettings
}

export function TwoColumnRichTextBlock({ block }: { block: TwoColumnRichTextBlock }) {
  const background = block.background ?? 'none'
  const isDark = background === 'dark'
  const sectionProps = getSectionProps(block.advanced, { background })
  const { gapClass, alignClass } = getTwoColumnRichTextStyles(block.advanced)

  return (
    <SectionWrapper {...sectionProps}>
      <section className={`grid md:grid-cols-2 ${gapClass} ${alignClass}`}>
        <div>{block.left ? <RichText content={block.left} className={isDark ? 'prose-invert' : ''} /> : null}</div>
        <div>{block.right ? <RichText content={block.right} className={isDark ? 'prose-invert' : ''} /> : null}</div>
      </section>
    </SectionWrapper>
  )
}
