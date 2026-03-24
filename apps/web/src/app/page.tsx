import { notFound } from 'next/navigation'

import { BlockRenderer } from '../components/blocks/BlockRenderer'
import { PagePlaceholder } from '../components/ui/ContentPlaceholder'
import { getPageBySlug, getSiteSettings } from '../lib/cms'
import {
  resolvePlaceholderLabel,
  resolvePlaceholderMode,
  resolvePlaceholderOverride,
  shouldShowPlaceholder,
} from '../lib/placeholders'

export default async function Home() {
  const [page, site] = await Promise.all([
    getPageBySlug('home'),
    getSiteSettings(),
  ])

  const mode = resolvePlaceholderMode(site)
  const label = resolvePlaceholderLabel(site)
  const override = resolvePlaceholderOverride(page)
  const pageContentExists = Boolean(page?.layout?.length)
  const showPagePlaceholder = shouldShowPlaceholder({
    mode,
    override,
    contentExists: pageContentExists,
  })

  if (!page && !showPagePlaceholder) return notFound()
  if (showPagePlaceholder) {
    return <PagePlaceholder title="Home" label={label} description="Homepage content will appear here once added." />
  }

  const safeLayout = page?.layout ?? []

  return (
    <div className="flex w-full flex-col">
      <BlockRenderer blocks={safeLayout} placeholderLabel={label} />
    </div>
  )
}
