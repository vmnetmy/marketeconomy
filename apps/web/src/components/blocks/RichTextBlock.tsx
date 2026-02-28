import type { CMSBlock } from '../../lib/cms'
import type { SerializedEditorState } from 'lexical'

import { SectionWrapper } from '../layout/SectionWrapper'
import { RichText } from '../ui/RichText'

type RichTextBlock = CMSBlock & {
  content?: SerializedEditorState
}

export function RichTextBlock({ block }: { block: RichTextBlock }) {
  return (
    <SectionWrapper>
      <RichText content={block.content} />
    </SectionWrapper>
  )
}
