import type { CMSBlock, CMSMedia } from '../../lib/cms'

import { CMSImage } from '../media/CMSImage'
import { SectionWrapper } from '../layout/SectionWrapper'

type LogoCloudBlock = CMSBlock & {
  headline?: string
  logos?: Array<{ logo?: CMSMedia | string | null; name?: string; url?: string }>
}

export function LogoCloudBlock({ block }: { block: LogoCloudBlock }) {
  return (
    <SectionWrapper>
      <section className="space-y-6">
        {block.headline ? <h2 className="text-2xl font-semibold">{block.headline}</h2> : null}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
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
                className="flex items-center justify-center rounded-2xl border border-slate-200 bg-white p-4"
                href={logo.url}
              >
                {content}
              </a>
            ) : (
              <div
                key={`${logo.name ?? 'logo'}-${index}`}
                className="flex items-center justify-center rounded-2xl border border-slate-200 bg-white p-4"
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
