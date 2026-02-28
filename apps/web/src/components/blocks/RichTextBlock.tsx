import type { CMSBlock, RichTextAdvancedSettings } from '../../lib/cms'
import type { SerializedEditorState } from 'lexical'

import { getSectionProps } from '../../lib/blocks'
import { getRichTextStyles } from '../../lib/richTextStyles'
import { SectionWrapper } from '../layout/SectionWrapper'
import { RichText } from '../ui/RichText'

type RichTextBlock = CMSBlock & {
  content?: SerializedEditorState
  advanced?: RichTextAdvancedSettings
}

export function RichTextBlock({ block }: { block: RichTextBlock }) {
  const maxWidth = block.advanced?.layout?.maxWidth
  const widthOverride =
    maxWidth === 'full' ? 'full' : maxWidth === 'wide' && block.advanced?.width !== 'full' ? 'wide' : undefined
  const sectionProps = getSectionProps(block.advanced, widthOverride ? { width: widthOverride } : {})
  const { wrapperClass, proseClass, styleVars, calloutClass, calloutText } = getRichTextStyles(block.advanced)

  return (
    <SectionWrapper {...sectionProps}>
      <div className={wrapperClass} style={styleVars}>
        {calloutClass && calloutText ? (
          <div className={`${calloutClass} mb-6 text-sm font-semibold`}>{calloutText}</div>
        ) : null}
        <RichText content={block.content} className={proseClass} />
      </div>
    </SectionWrapper>
  )
}
