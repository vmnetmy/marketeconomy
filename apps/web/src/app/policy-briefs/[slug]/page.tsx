import Link from 'next/link'
import { notFound } from 'next/navigation'

import { CMSImage } from '../../../components/media/CMSImage'
import { RichText } from '../../../components/ui/RichText'
import { getPolicyBriefBySlug, getRelatedPolicyBriefs, resolveMediaUrl } from '../../../lib/cms'

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

export default async function PolicyBriefDetailPage({ params }: { params: { slug: string } }) {
  const brief = await getPolicyBriefBySlug(params.slug)
  if (!brief) return notFound()

  const pdfUrl = resolveMediaUrl(brief.pdfFile)
  const published = formatDate(brief.publishedAt)
  const tags = (brief.tags || [])
    .map((tagItem) => tagItem?.tag)
    .filter((tagItem): tagItem is string => Boolean(tagItem))
  const related = (await getRelatedPolicyBriefs(tags, 4)).filter((item) => item.slug !== brief.slug).slice(0, 3)

  return (
    <main className="min-h-screen bg-white px-6 pb-20 pt-24 text-slate-900 md:pt-28">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <section className="space-y-6">
          {brief.coverImage ? (
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl bg-slate-100">
              <CMSImage media={brief.coverImage} alt={brief.title} fill className="object-cover" />
            </div>
          ) : null}

          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
              Policy Brief {published ? `• ${published}` : ''}
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{brief.title}</h1>
            {brief.summary ? <p className="text-lg text-slate-600">{brief.summary}</p> : null}
            {pdfUrl ? (
              <a
                href={pdfUrl}
                className="inline-flex items-center rounded-full bg-slate-900 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-slate-800"
                target="_blank"
                rel="noreferrer"
              >
                Download PDF
              </a>
            ) : null}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">Executive Summary</h2>
          <RichText content={brief.executiveSummary} />
        </section>

        {brief.keyRecommendations && brief.keyRecommendations.length > 0 ? (
          <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-lg font-semibold text-slate-900">Key Recommendations</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              {brief.keyRecommendations.map((item, index) => (
                <li key={`${item.recommendation ?? 'rec'}-${index}`} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-slate-900" />
                  <span>{item.recommendation}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        {related.length > 0 ? (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-slate-900">Related Policy Briefs</h2>
              <Link href="/policy-briefs" className="text-sm font-semibold text-slate-600 hover:text-slate-900">
                View all →
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/policy-briefs/${item.slug}`}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                  {item.summary ? <p className="mt-2 text-sm text-slate-600">{item.summary}</p> : null}
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  )
}
