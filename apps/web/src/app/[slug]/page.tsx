import { BlockRenderer } from '../../components/blocks/BlockRenderer'
import { PagePlaceholder } from '../../components/ui/ContentPlaceholder'
import { getPageBySlug, getSiteSettings } from '../../lib/cms'
import {
  resolvePlaceholderLabel,
  resolvePlaceholderMode,
  resolvePlaceholderOverride,
  shouldShowPlaceholder,
} from '../../lib/placeholders'
import { notFound } from 'next/navigation'

type PageProps = {
  params: { slug: string }
}

export const dynamic = 'force-dynamic'

export default async function Page({ params }: PageProps) {
  const { slug } = params
  if (['updates', 'policy-briefs'].includes(slug)) return notFound()
  const [page, site] = await Promise.all([getPageBySlug(slug), getSiteSettings()])

  const mode = resolvePlaceholderMode(site)
  const label = resolvePlaceholderLabel(site)
  const override = resolvePlaceholderOverride(page)
  const contentExists = Boolean(page?.layout?.length)
  const showPlaceholder = shouldShowPlaceholder({ mode, override, contentExists })

  if (!page && !showPlaceholder) return notFound()
  if (showPlaceholder) {
    return (
      <PagePlaceholder
        title={slug.replace(/-/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase())}
        label={label}
        description="This page is ready for content from your CMS."
      />
    )
  }

  const safeLayout = page?.layout ?? []

  return (
    <div className="flex w-full flex-col">
      <BlockRenderer blocks={safeLayout} />
    </div>
  )
}
