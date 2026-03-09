import Link from 'next/link'
import { notFound } from 'next/navigation'

import { CMSImage } from '../../../components/media/CMSImage'
import { PagePlaceholder } from '../../../components/ui/ContentPlaceholder'
import { RichText } from '../../../components/ui/RichText'
import { getInTheNewsBySlug, getInTheNewsPage, getSiteSettings } from '../../../lib/cms'
import { resolvePlaceholderLabel, resolvePlaceholderMode, shouldShowPlaceholder } from '../../../lib/placeholders'

export const dynamic = 'force-dynamic'

const formatDate = (value?: string | null): string | null => {
  if (!value) return null
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

export default async function InTheNewsDetailPage({ params }: { params: { slug?: string | string[] } }) {
  const resolvedParams = await Promise.resolve(params)
  const slug = Array.isArray(resolvedParams?.slug) ? resolvedParams.slug[0] : resolvedParams?.slug
  if (!slug) return notFound()

  const [news, site] = await Promise.all([getInTheNewsBySlug(slug), getSiteSettings()])
  const mode = resolvePlaceholderMode(site)
  const label = resolvePlaceholderLabel(site)

  if (!news) {
    if (mode === 'off') return notFound()

    if (mode === 'on') {
      return (
        <PagePlaceholder
          title="In the News"
          label={label}
          description="News articles will appear here once published."
        />
      )
    }

    const newsPage = await getInTheNewsPage({ page: 1, limit: 1 })
    const showPlaceholder = shouldShowPlaceholder({
      mode,
      override: 'default',
      contentExists: newsPage.docs.length > 0,
    })

    if (showPlaceholder) {
      return (
        <PagePlaceholder
          title="In the News"
          label={label}
          description="News articles will appear here once published."
        />
      )
    }

    return notFound()
  }

  const published = formatDate(news.publishedDate)

  return (
    <main className="min-h-screen bg-white px-6 pb-20 pt-24 text-slate-900 md:pt-28">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <section className="space-y-6">
          {news.coverImage ? (
            <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-slate-100">
              <CMSImage media={news.coverImage} alt={news.title} fill className="object-cover" />
            </div>
          ) : null}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
              In the News {published ? `• ${published}` : ''}
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{news.title}</h1>
            {news.excerpt ? <p className="text-lg text-slate-600">{news.excerpt}</p> : null}
          </div>
        </section>

        <section className="space-y-4">
          <RichText content={news.content} />
        </section>

        {news.originalSourceUrl ? (
          <a
            href={news.originalSourceUrl}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            {news.originalSourceLabel ?? 'View original source'}
          </a>
        ) : null}

        <Link href="/in-the-news" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
          ← Back to In the News
        </Link>
      </div>
    </main>
  )
}
