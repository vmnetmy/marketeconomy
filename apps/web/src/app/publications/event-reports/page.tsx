import Link from 'next/link'

import { CMSImage } from '../../../components/media/CMSImage'
import { ContentPlaceholder } from '../../../components/ui/ContentPlaceholder'
import { getEventReportsPage, getSiteSettings } from '../../../lib/cms'
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

export default async function EventReportsPage() {
  const [reports, site] = await Promise.all([getEventReportsPage({ page: 1, limit: 24 }), getSiteSettings()])
  const mode = resolvePlaceholderMode(site)
  const label = resolvePlaceholderLabel(site)
  const showPlaceholder = shouldShowPlaceholder({
    mode,
    override: 'default',
    contentExists: reports.docs.length > 0,
  })

  return (
    <main className="min-h-screen bg-slate-50 px-6 pb-16 pt-24 text-slate-900 md:pt-28">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Event Reports</p>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Event Reports</h1>
          <p className="text-base text-slate-600">
            Reports documenting past dialogues, roundtables, and convenings. Each report captures the key takeaways and
            recommended actions.
          </p>
        </div>

        {showPlaceholder ? (
          <ContentPlaceholder
            title="Event Reports"
            label={label}
            description="Event reports will appear here once published."
            items={6}
            columns={3}
          />
        ) : reports.docs.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
            No event reports available yet.
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {reports.docs.map((report) => {
              const published = formatDate(report.publishedDate)
              const eventTitle =
                report.event && typeof report.event === 'object' ? report.event.title : report.event ?? null

              return (
                <article
                  key={report.id}
                  className="flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50"
                >
                  {report.coverImage ? (
                    <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100">
                      <CMSImage media={report.coverImage} alt={report.title} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="aspect-4/3 w-full bg-linear-to-br from-slate-200 via-slate-100 to-slate-50" />
                  )}

                  <div className="flex flex-1 flex-col gap-4 p-6">
                    <div className="space-y-3">
                      {published ? (
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{published}</p>
                      ) : null}
                      <Link href={`/publications/event-reports/${report.slug}`} className="block">
                        <h2 className="text-xl font-semibold text-slate-900">{report.title}</h2>
                      </Link>
                      {eventTitle ? <p className="text-sm text-slate-600">Event: {eventTitle}</p> : null}
                      {report.summary ? <p className="text-sm text-slate-600">{report.summary}</p> : null}
                    </div>

                    <Link
                      href={`/publications/event-reports/${report.slug}`}
                      className="mt-auto text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 hover:text-slate-900"
                    >
                      Read report →
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
