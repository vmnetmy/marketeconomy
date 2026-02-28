import type { CMSBlock } from '../../lib/cms'

import { SectionWrapper } from '../layout/SectionWrapper'

type CTASectionBlock = CMSBlock & {
  title?: string
  description?: string
  buttonLabel?: string
  buttonURL?: string
  theme?: string
}

export function CTASectionBlock({ block }: { block: CTASectionBlock }) {
  const isDark = block.theme === 'dark'
  const background = isDark ? 'dark' : 'light'

  return (
    <SectionWrapper background={background}>
      <section className={`space-y-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
        {block.title ? <h2 className="text-2xl font-semibold">{block.title}</h2> : null}
        {block.description ? <p className="mt-2 text-base">{block.description}</p> : null}
        {block.buttonLabel && block.buttonURL ? (
          <a
            className={`mt-4 inline-flex rounded-full px-6 py-2 text-sm font-semibold ${
              isDark ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'
            }`}
            href={block.buttonURL}
          >
            {block.buttonLabel}
          </a>
        ) : null}
      </section>
    </SectionWrapper>
  )
}
