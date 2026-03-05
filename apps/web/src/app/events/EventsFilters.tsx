'use client'

import { FunnelIcon } from '@heroicons/react/24/outline'
import { useRef } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type EventsFiltersProps = {
  currentSearch?: string
  currentYear?: string
  currentLocation?: string
  currentEventType?: string
}

export function EventsFilters({ currentSearch, currentYear, currentLocation, currentEventType }: EventsFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const searchRef = useRef<HTMLInputElement>(null)
  const yearRef = useRef<HTMLInputElement>(null)
  const locationRef = useRef<HTMLInputElement>(null)
  const typeRef = useRef<HTMLInputElement>(null)

  const urlSearch = searchParams?.get('q') ?? currentSearch ?? ''
  const urlYear = searchParams?.get('year') ?? currentYear ?? ''
  const urlLocation = searchParams?.get('location') ?? currentLocation ?? ''
  const urlType = searchParams?.get('eventType') ?? currentEventType ?? ''

  const pushParams = (next: { q?: string; year?: string; location?: string; eventType?: string }) => {
    const params = new URLSearchParams()
    if (next.q) params.set('q', next.q)
    if (next.year) params.set('year', next.year)
    if (next.location) params.set('location', next.location)
    if (next.eventType) params.set('eventType', next.eventType)
    const qs = params.toString()
    router.push(qs ? `${pathname}?${qs}#events-results` : `${pathname}#events-results`)
  }

  return (
    <div className="rounded-3xl border border-slate-200/70 bg-white p-4 shadow-sm">
      <form
        className="grid gap-4 md:grid-cols-[1fr_140px_1fr_1fr_auto]"
        onSubmit={(event) => {
          event.preventDefault()
          pushParams({
            q: searchRef.current?.value?.trim() || '',
            year: yearRef.current?.value?.trim() || '',
            location: locationRef.current?.value?.trim() || '',
            eventType: typeRef.current?.value?.trim() || '',
          })
        }}
      >
        <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
          Keyword
          <input
            ref={searchRef}
            defaultValue={urlSearch}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            placeholder="Search events"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
          Year
          <input
            ref={yearRef}
            defaultValue={urlYear}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            placeholder="2026"
            inputMode="numeric"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
          Location
          <input
            ref={locationRef}
            defaultValue={urlLocation}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            placeholder="Kuala Lumpur"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
          Event Type
          <input
            ref={typeRef}
            defaultValue={urlType}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            placeholder="Roundtable, Forum"
          />
        </label>

        <button
          type="submit"
          className="mt-auto inline-flex h-11.5 items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-slate-800"
        >
          <FunnelIcon className="h-4 w-4" />
          Apply
        </button>
      </form>
    </div>
  )
}
