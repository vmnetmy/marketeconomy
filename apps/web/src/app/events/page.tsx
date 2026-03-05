import Link from 'next/link'
import { Suspense } from 'react'

import { getEventsPage } from '../../lib/cms'
import { EventsFilters } from './EventsFilters'

export const dynamic = 'force-dynamic'

type EventsSearchParams = {
  q?: string | string[]
  year?: string | string[]
  location?: string | string[]
  eventType?: string | string[]
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

export default async function EventsPage({
  searchParams,
}: {
  searchParams?: EventsSearchParams | Promise<EventsSearchParams>
}) {
  const resolvedParams = await Promise.resolve(searchParams)
  const searchParam = resolvedParams?.q
  const yearParam = resolvedParams?.year
  const locationParam = resolvedParams?.location
  const eventTypeParam = resolvedParams?.eventType

  const search = Array.isArray(searchParam) ? searchParam[0] : searchParam
  const year = Array.isArray(yearParam) ? yearParam[0] : yearParam
  const location = Array.isArray(locationParam) ? locationParam[0] : locationParam
  const eventType = Array.isArray(eventTypeParam) ? eventTypeParam[0] : eventTypeParam

  const [upcoming, past] = await Promise.all([
    getEventsPage({ status: 'upcoming', limit: 12, search, year, location, eventType }),
    getEventsPage({ status: 'past', limit: 12, search, year, location, eventType }),
  ])

  return (
    <main className="min-h-screen bg-slate-50 px-6 pb-16 pt-24 text-slate-900 md:pt-28">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Events</p>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Events</h1>
          <p className="text-base text-slate-600">
            Join our upcoming dialogues and explore highlights from past convenings focused on market-oriented reforms.
          </p>
          <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            <a href="#upcoming" className="rounded-full border border-slate-200 bg-white px-4 py-2">
              Upcoming ({upcoming.totalDocs})
            </a>
            <a href="#past" className="rounded-full border border-slate-200 bg-white px-4 py-2">
              Past ({past.totalDocs})
            </a>
          </div>
        </div>

        <Suspense
          fallback={<div className="rounded-3xl border border-slate-200/70 bg-white p-4 shadow-sm">Loading filters…</div>}
        >
          <EventsFilters
            currentSearch={search}
            currentYear={year}
            currentLocation={location}
            currentEventType={eventType}
          />
        </Suspense>

        <div id="events-results" className="space-y-12 scroll-mt-36">
          <section id="upcoming" className="scroll-mt-36">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-semibold text-slate-900">Upcoming Events</h2>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                {upcoming.totalDocs} events
              </span>
            </div>

            {upcoming.docs.length === 0 ? (
              <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
                No upcoming events match these filters.
              </div>
            ) : (
              <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {upcoming.docs.map((event) => {
                  const dateLabel = formatDateRange(event.startDate, event.endDate)
                  return (
                    <article
                      key={event.id}
                      className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-slate-900">{event.title}</h3>
                        {dateLabel ? (
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{dateLabel}</p>
                        ) : null}
                        {event.location ? <p className="text-sm text-slate-600">{event.location}</p> : null}
                        {event.eventType ? (
                          <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                            {event.eventType}
                          </span>
                        ) : null}
                      </div>
                      <Link
                        href={`/events/${event.slug}`}
                        className="mt-auto text-sm font-semibold text-blue-600 hover:text-blue-700"
                      >
                        View details →
                      </Link>
                    </article>
                  )
                })}
              </div>
            )}
          </section>

          <section id="past" className="scroll-mt-36">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-semibold text-slate-900">Past Events</h2>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                {past.totalDocs} events
              </span>
            </div>

            {past.docs.length === 0 ? (
              <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
                No past events match these filters.
              </div>
            ) : (
              <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {past.docs.map((event) => {
                  const dateLabel = formatDateRange(event.startDate, event.endDate)
                  return (
                    <article
                      key={event.id}
                      className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-slate-900">{event.title}</h3>
                        {dateLabel ? (
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{dateLabel}</p>
                        ) : null}
                        {event.location ? <p className="text-sm text-slate-600">{event.location}</p> : null}
                        {event.eventType ? (
                          <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                            {event.eventType}
                          </span>
                        ) : null}
                      </div>
                      <Link
                        href={`/events/${event.slug}`}
                        className="mt-auto text-sm font-semibold text-blue-600 hover:text-blue-700"
                      >
                        View details →
                      </Link>
                    </article>
                  )
                })}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}
