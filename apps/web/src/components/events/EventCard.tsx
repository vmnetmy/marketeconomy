import Link from 'next/link'

import type { CMSMedia } from '../../lib/cms'
import { CMSImage } from '../media/CMSImage'

type EventCardData = {
  title: string
  startDate?: string | null
  endDate?: string | null
  location?: string | null
  eventType?: string | null
  coverImage?: CMSMedia | string | null
}

const formatDate = (value?: string | null) => {
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

export function EventCard({
  event,
  href,
}: {
  event: EventCardData
  href?: string
}) {
  const dateLabel = formatDateRange(event.startDate, event.endDate)

  const content = (
    <>
      {event.coverImage ? (
        <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100">
          <CMSImage media={event.coverImage} alt={event.title} fill className="object-cover" />
        </div>
      ) : (
        <div className="aspect-4/3 w-full bg-linear-to-br from-slate-200 via-slate-100 to-slate-50" />
      )}

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-slate-900">{event.title}</h3>
          {dateLabel ? <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{dateLabel}</p> : null}
          {event.location ? <p className="text-sm text-slate-600">{event.location}</p> : null}
          {event.eventType ? (
            <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              {event.eventType}
            </span>
          ) : null}
        </div>
        {href ? <span className="mt-auto text-sm font-semibold text-blue-600 hover:text-blue-700">View details →</span> : null}
      </div>
    </>
  )

  const className =
    'flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg'

  if (!href) {
    return <article className={className}>{content}</article>
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  )
}
