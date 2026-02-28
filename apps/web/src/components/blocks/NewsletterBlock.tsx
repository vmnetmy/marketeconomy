import type { AdvancedSettings, CMSBlock } from '../../lib/cms'

import { getSectionProps } from '../../lib/blocks'
import { SectionWrapper } from '../layout/SectionWrapper'

type NewsletterBlock = CMSBlock & {
  headline?: string
  description?: string
  inputPlaceholder?: string
  buttonLabel?: string
  formAction?: string
  finePrint?: string
  advanced?: AdvancedSettings
}

export function NewsletterBlock({ block }: { block: NewsletterBlock }) {
  const sectionProps = getSectionProps(block.advanced)

  return (
    <SectionWrapper {...sectionProps}>
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        {block.headline ? <h2 className="text-2xl font-semibold">{block.headline}</h2> : null}
        {block.description ? <p className="mt-2 text-slate-600">{block.description}</p> : null}
        <form className="mt-4 flex flex-col gap-3 sm:flex-row" action={block.formAction || '#'} method="post">
          <input
            type="email"
            name="email"
            placeholder={block.inputPlaceholder || 'Enter your email'}
            className="w-full rounded-full border border-slate-200 px-4 py-2 text-sm"
          />
          <button type="submit" className="rounded-full bg-slate-900 px-6 py-2 text-sm font-semibold text-white">
            {block.buttonLabel || 'Subscribe'}
          </button>
        </form>
        {block.finePrint ? <p className="mt-2 text-xs text-slate-500">{block.finePrint}</p> : null}
      </section>
    </SectionWrapper>
  )
}
