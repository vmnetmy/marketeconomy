import type { CMSBlock, NewsletterAdvancedSettings } from '../../lib/cms'

import { getNewsletterStyles, getSectionProps } from '../../lib/blocks'
import { SectionWrapper } from '../layout/SectionWrapper'

type NewsletterBlock = CMSBlock & {
  headline?: string
  description?: string
  inputPlaceholder?: string
  buttonLabel?: string
  formAction?: string
  finePrint?: string
  advanced?: NewsletterAdvancedSettings
}

export function NewsletterBlock({ block }: { block: NewsletterBlock }) {
  const sectionProps = getSectionProps(block.advanced)
  const { cardClass, formClass, inputClass, buttonClass, finePrintClass } = getNewsletterStyles(block.advanced)

  return (
    <SectionWrapper {...sectionProps}>
      <section className={cardClass}>
        {block.headline ? <h2 className="text-2xl font-semibold">{block.headline}</h2> : null}
        {block.description ? <p className="mt-2 text-slate-600">{block.description}</p> : null}
        <form className={`mt-4 ${formClass}`} action={block.formAction || '#'} method="post">
          <input
            type="email"
            name="email"
            placeholder={block.inputPlaceholder || 'Enter your email'}
            className={inputClass}
          />
          <button type="submit" className={buttonClass}>
            {block.buttonLabel || 'Subscribe'}
          </button>
        </form>
        {block.finePrint ? <p className={`mt-2 ${finePrintClass}`}>{block.finePrint}</p> : null}
      </section>
    </SectionWrapper>
  )
}
