import type { CMSBlock, CMSMedia, LogoCloudAdvancedSettings } from '../../lib/cms'

import { getLogoCloudStyles, getSectionProps } from '../../lib/blocks'
import { CMSImage } from '../media/CMSImage'
import { SectionWrapper } from '../layout/SectionWrapper'

type LogoCloudBlock = CMSBlock & {
  headline?: string
  logos?: Array<{ logo?: CMSMedia | string | null; name?: string; url?: string }>
  advanced?: LogoCloudAdvancedSettings
}

export function LogoCloudBlock({ block }: { block: LogoCloudBlock }) {
  const sectionProps = getSectionProps(block.advanced)
  const { gridClass, cardClass } = getLogoCloudStyles(block.advanced)

  return (
    <SectionWrapper {...sectionProps}>
      <section className="space-y-6">
        {block.headline ? <h2 className="text-2xl font-semibold">{block.headline}</h2> : null}
        <div className={`grid ${gridClass}`}>
          {(block.logos || []).map((logo, index) => {
            const content = logo.logo ? (
              <CMSImage
                media={logo.logo}
                alt={logo.name}
                className="max-h-10 w-auto object-contain"
                height={40}
                sizes="120px"
                width={120}
              />
            ) : (
              <span className="text-sm text-slate-500">{logo.name}</span>
            )

            return logo.url ? (
              <a
                key={`${logo.name ?? 'logo'}-${index}`}
                className={`flex items-center justify-center ${cardClass}`}
                href={logo.url}
              >
                {content}
              </a>
            ) : (
              <div
                key={`${logo.name ?? 'logo'}-${index}`}
                className={`flex items-center justify-center ${cardClass}`}
              >
                {content}
              </div>
            )
          })}
        </div>
      </section>
    </SectionWrapper>
  )
}
