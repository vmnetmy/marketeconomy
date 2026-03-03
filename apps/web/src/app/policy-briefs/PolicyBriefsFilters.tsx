'use client'

import { useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type PolicyBriefsFiltersProps = {
  tags: string[]
  currentTag?: string
  currentSearch?: string
  currentSort?: 'latest' | 'oldest'
}

const normalizeSort = (value?: string): 'latest' | 'oldest' => (value === 'oldest' ? 'oldest' : 'latest')

export function PolicyBriefsFilters({ tags, currentTag, currentSearch, currentSort = 'latest' }: PolicyBriefsFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [searchText, setSearchText] = useState(currentSearch ?? '')

  const tagOptions = useMemo(() => ['All', ...tags], [tags])

  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams?.toString())
    Object.entries(updates).forEach(([key, value]) => {
      if (!value || value === 'All') {
        params.delete(key)
      } else {
        params.set(key, value)
      }
    })
    const qs = params.toString()
    router.push(qs ? `${pathname}?${qs}` : pathname)
  }

  return (
    <div className="rounded-3xl border border-slate-200/70 bg-white p-4 shadow-sm">
      <form
        className="grid gap-4 md:grid-cols-[1fr_200px_200px_auto]"
        onSubmit={(event) => {
          event.preventDefault()
          updateParams({ q: searchText, sort: normalizeSort(currentSort), tag: currentTag ?? null, page: null })
        }}
      >
        <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
          Search by title
          <input
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            placeholder="Search policy briefs..."
            type="search"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
          Tag filter
          <select
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900"
            value={currentTag ?? 'All'}
            onChange={(event) => updateParams({ tag: event.target.value, page: null })}
          >
            {tagOptions.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
          Sort
          <select
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900"
            value={currentSort}
            onChange={(event) => updateParams({ sort: normalizeSort(event.target.value), page: null })}
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
        </label>

        <button
          type="submit"
          className="mt-auto h-[46px] rounded-2xl bg-slate-900 px-6 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-slate-800"
        >
          Apply
        </button>
      </form>
    </div>
  )
}
