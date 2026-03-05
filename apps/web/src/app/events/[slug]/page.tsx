import Link from 'next/link'
import { notFound } from 'next/navigation'

import { EventRegistrationForm } from '../../../components/forms/EventRegistrationForm'
import { RichText } from '../../../components/ui/RichText'
import { getEventBySlug, getEventReportByEventId } from '../../../lib/cms'

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

const formatDateRange = (start?: string | null, end?: string | null) => {
  const startLabel = formatDate(start)
  const endLabel = formatDate(end)
  if (startLabel && endLabel) return `${startLabel} – ${endLabel}`
  return startLabel || endLabel || null
}

export default async function EventDetailPage({ params }: { params: { slug?: string | string[] } }) {
  const resolvedParams = await Promise.resolve(params)
  const slug = Array.isArray(resolvedParams?.slug) ? resolvedParams.slug[0] : resolvedParams?.slug
  if (!slug) return notFound()

  const event = await getEventBySlug(slug)
  if (!event) return notFound()

  const report = await getEventReportByEventId(event.id)
  const dateLabel = formatDateRange(event.startDate, event.endDate)
  const isClosed = event.eventStatus === 'past'

  return (
    <main className="min-h-screen bg-white px-6 pb-20 pt-24 text-slate-900 md:pt-28">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-12">
        <section className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">Event</p>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{event.title}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-slate-600">
            {dateLabel ? <span>{dateLabel}</span> : null}
            {event.location ? <span>{event.location}</span> : null}
            {event.eventType ? <span>{event.eventType}</span> : null}
          </div>
        </section>

        {event.description ? (
          <section className="space-y-4">
            <RichText content={event.description} />
          </section>
        ) : null}

        {report?.slug ? (
          <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-semibold text-slate-900">Event Report</h2>
            <p className="mt-2 text-sm text-slate-600">Read the report and key takeaways from this event.</p>
            <Link
              href={`/publications/event-reports/${report.slug}`}
              className="mt-4 inline-flex text-sm font-semibold text-blue-600"
            >
              View event report →
            </Link>
          </section>
        ) : null}

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">Register</h2>
          {event.registrationLink ? (
            <p className="text-sm text-slate-600">
              Prefer to register externally?{' '}
              <a className="font-semibold text-blue-600" href={event.registrationLink}>
                Use the event registration link →
              </a>
            </p>
          ) : null}
          <EventRegistrationForm eventId={event.id} eventTitle={event.title} isClosed={isClosed} />
        </section>

        <Link href="/events" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
          ← Back to Events
        </Link>
      </div>
    </main>
  )
}
