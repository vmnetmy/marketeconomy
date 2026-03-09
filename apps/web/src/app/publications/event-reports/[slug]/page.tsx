import Link from 'next/link'
import { notFound } from 'next/navigation'

import { CMSImage } from '../../../../components/media/CMSImage'
import { GatedDownloadForm } from '../../../../components/forms/GatedDownloadForm'
import { PagePlaceholder } from '../../../../components/ui/ContentPlaceholder'
import { RichText } from '../../../../components/ui/RichText'
import { getEventReportBySlug, getEventReportsPage, getSiteSettings } from '../../../../lib/cms'
import { resolvePlaceholderLabel, resolvePlaceholderMode, shouldShowPlaceholder } from '../../../../lib/placeholders'

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

export default async function EventReportDetailPage({ params }: { params: { slug?: string | string[] } }) {
  const resolvedParams = await Promise.resolve(params)
  const slug = Array.isArray(resolvedParams?.slug) ? resolvedParams.slug[0] : resolvedParams?.slug
  if (!slug) return notFound()

  const [report, site] = await Promise.all([getEventReportBySlug(slug), getSiteSettings()])
  const mode = resolvePlaceholderMode(site)
  const label = resolvePlaceholderLabel(site)

  if (!report) {
    if (mode === 'off') return notFound()

    if (mode === 'on') {
      return (
        <PagePlaceholder
          title="Event Report"
          label={label}
          description="Event report content will appear here once published."
        />
      )
    }

    const reports = await getEventReportsPage({ page: 1, limit: 1 })
    const showPlaceholder = shouldShowPlaceholder({
      mode,
      override: 'default',
      contentExists: reports.docs.length > 0,
    })

    if (showPlaceholder) {
      return (
        <PagePlaceholder
          title="Event Report"
          label={label}
          description="Event report content will appear here once published."
        />
      )
    }

    return notFound()
  }

  const published = formatDate(report.publishedDate)
  const eventTitle = report.event && typeof report.event === 'object' ? report.event.title : report.event ?? null

  return (
    <main className="min-h-screen bg-white px-6 pb-20 pt-24 text-slate-900 md:pt-28">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <section className="space-y-6">
          {report.coverImage ? (
            <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-slate-100">
              <CMSImage media={report.coverImage} alt={report.title} fill className="object-cover" />
            </div>
          ) : null}

          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
              Event Report {published ? `• ${published}` : ''}
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{report.title}</h1>
            {eventTitle ? <p className="text-sm text-slate-600">Event: {eventTitle}</p> : null}
            {report.summary ? <p className="text-lg text-slate-600">{report.summary}</p> : null}
            {report.pdfFile ? <GatedDownloadForm resourceType="eventReport" resourceId={report.id} /> : null}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">Report Summary</h2>
          <RichText content={report.content} />
        </section>

        <Link
          href="/publications/event-reports"
          className="text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          ← Back to Event Reports
        </Link>
      </div>
    </main>
  )
}
