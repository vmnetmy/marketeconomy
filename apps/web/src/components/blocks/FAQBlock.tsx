import type { CMSBlock } from '../../lib/cms'
import type { SerializedEditorState } from 'lexical'

import { SectionWrapper } from '../layout/SectionWrapper'
import { RichText } from '../ui/RichText'

type FAQBlock = CMSBlock & {
  items?: Array<{ question?: string; answer?: SerializedEditorState }>
}

export function FAQBlock({ block }: { block: FAQBlock }) {
  return (
    <SectionWrapper>
      <section className="space-y-4">
        {(block.items || []).map((item, index) => (
          <div key={`${item.question ?? 'faq'}-${index}`} className="rounded-xl border border-slate-200 bg-white p-4">
            {item.question ? <h3 className="text-base font-semibold">{item.question}</h3> : null}
            {item.answer ? <div className="mt-2 text-sm text-slate-600"><RichText content={item.answer} /></div> : null}
          </div>
        ))}
      </section>
    </SectionWrapper>
  )
}
