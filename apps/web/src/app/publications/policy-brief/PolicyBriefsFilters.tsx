'use client'

import { FunnelIcon } from '@heroicons/react/24/outline'
import { useMemo, useRef } from 'react'
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
  const searchInputRef = useRef<HTMLInputElement>(null)
  const urlTag = searchParams?.get('tag') ?? undefined
  const urlSort = searchParams?.get('sort') ?? undefined
  const urlSearch = searchParams?.get('q') ?? undefined
  const activeTag = (urlTag && urlTag.trim()) || currentTag || 'All'
  const activeSort = normalizeSort(urlSort ?? currentSort)
  const initialSearch = urlSearch ?? currentSearch ?? ''

  const tagOptions = useMemo(() => {
    const options = new Set(['All', ...tags])
    if (activeTag && activeTag !== 'All') options.add(activeTag)
    return Array.from(options)
  }, [tags, activeTag])

  const updateParams = (updates: { tag?: string; sort?: 'latest' | 'oldest'; q?: string | null }) => {
    const hasQ = Object.prototype.hasOwnProperty.call(updates, 'q')
    const nextTag = updates.tag ?? activeTag
    const nextSort = updates.sort ?? activeSort
    const currentInput = searchInputRef.current?.value ?? initialSearch
    const nextSearch = hasQ ? updates.q ?? '' : currentInput
    const params = new URLSearchParams()
    if (nextTag && nextTag !== 'All') params.set('tag', nextTag)
    if (nextSort === 'oldest') params.set('sort', nextSort)
    if (nextSearch) params.set('q', nextSearch)
    const qs = params.toString()
    router.push(qs ? `${pathname}?${qs}#policy-brief-results` : `${pathname}#policy-brief-results`)
  }

  return (
    <div className="rounded-3xl border border-slate-200/70 bg-white p-4 shadow-sm">
      <form
        key={`${activeTag}-${activeSort}-${initialSearch}`}
        className="grid gap-4 md:grid-cols-[1fr_200px_200px_auto]"
        onSubmit={(event) => {
          event.preventDefault()
          const nextSearch = searchInputRef.current?.value?.trim() ?? ''
          updateParams({
            q: nextSearch ? nextSearch : null,
            sort: activeSort,
            tag: activeTag,
          })
        }}
      >
        <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
          Search by title
          <input
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            placeholder="Search policy briefs..."
            type="search"
            defaultValue={initialSearch}
            ref={searchInputRef}
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
          Tag filter
          <select
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900"
            value={activeTag}
            onChange={(event) => updateParams({ tag: event.target.value })}
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
            value={activeSort}
            onChange={(event) => updateParams({ sort: normalizeSort(event.target.value) })}
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
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
