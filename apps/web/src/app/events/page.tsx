import Link from 'next/link'
import { Suspense } from 'react'

import { EventCard } from '../../components/events/EventCard'
import { ContentPlaceholder } from '../../components/ui/ContentPlaceholder'
import { getEventsPage, getSiteSettings } from '../../lib/cms'
import { resolvePlaceholderLabel, resolvePlaceholderMode, shouldShowPlaceholder } from '../../lib/placeholders'
import { EventsFilters } from './EventsFilters'

export const dynamic = 'force-dynamic'

type EventsSearchParams = {
  q?: string | string[]
  year?: string | string[]
  location?: string | string[]
  eventType?: string | string[]
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

  const [upcoming, past, site] = await Promise.all([
    getEventsPage({ status: 'upcoming', limit: 12, search, year, location, eventType }),
    getEventsPage({ status: 'past', limit: 12, search, year, location, eventType }),
    getSiteSettings(),
  ])
  const mode = resolvePlaceholderMode(site)
  const label = resolvePlaceholderLabel(site)
  const showUpcomingPlaceholder = shouldShowPlaceholder({
    mode,
    override: 'default',
    contentExists: upcoming.docs.length > 0,
  })
  const showPastPlaceholder = shouldShowPlaceholder({
    mode,
    override: 'default',
    contentExists: past.docs.length > 0,
  })

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

            {showUpcomingPlaceholder ? (
              <div className="mt-6">
                <ContentPlaceholder
                  title="Upcoming Events"
                  label={label}
                  description="Upcoming events will appear here once published."
                  items={6}
                  columns={3}
                />
              </div>
            ) : upcoming.docs.length === 0 ? (
              <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
                No upcoming events match these filters.
              </div>
            ) : (
              <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {upcoming.docs.map((event) => (
                  <EventCard key={event.id} event={event} href={`/events/${event.slug}`} />
                ))}
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

            {showPastPlaceholder ? (
              <div className="mt-6">
                <ContentPlaceholder
                  title="Past Events"
                  label={label}
                  description="Past events will appear here once published."
                  items={6}
                  columns={3}
                />
              </div>
            ) : past.docs.length === 0 ? (
              <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
                No past events match these filters.
              </div>
            ) : (
              <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {past.docs.map((event) => (
                  <EventCard key={event.id} event={event} href={`/events/${event.slug}`} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}
