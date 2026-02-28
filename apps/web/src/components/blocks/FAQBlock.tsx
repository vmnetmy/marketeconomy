import type { CMSBlock, FAQAdvancedSettings } from '../../lib/cms'
import type { SerializedEditorState } from 'lexical'

import { getFAQStyles, getSectionProps } from '../../lib/blocks'
import { SectionWrapper } from '../layout/SectionWrapper'
import { RichText } from '../ui/RichText'

type FAQBlock = CMSBlock & {
  items?: Array<{ question?: string; answer?: SerializedEditorState }>
  advanced?: FAQAdvancedSettings
}

export function FAQBlock({ block }: { block: FAQBlock }) {
  const sectionProps = getSectionProps(block.advanced)
  const { listClass, itemClass } = getFAQStyles(block.advanced)

  return (
    <SectionWrapper {...sectionProps}>
      <section className={listClass}>
        {(block.items || []).map((item, index) => (
          <div key={`${item.question ?? 'faq'}-${index}`} className={itemClass}>
            {item.question ? <h3 className="text-base font-semibold">{item.question}</h3> : null}
            {item.answer ? <div className="mt-2 text-sm text-slate-600"><RichText content={item.answer} /></div> : null}
          </div>
        ))}
      </section>
    </SectionWrapper>
  )
}
