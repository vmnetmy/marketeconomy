import type { AdvancedSettings, CMSBlock } from '../../lib/cms'
import type { SerializedEditorState } from 'lexical'

import { getSectionProps } from '../../lib/blocks'
import { SectionWrapper } from '../layout/SectionWrapper'
import { RichText } from '../ui/RichText'

type RichTextBlock = CMSBlock & {
  content?: SerializedEditorState
  advanced?: AdvancedSettings
}

export function RichTextBlock({ block }: { block: RichTextBlock }) {
  const sectionProps = getSectionProps(block.advanced)

  return (
    <SectionWrapper {...sectionProps}>
      <RichText content={block.content} />
    </SectionWrapper>
  )
}
