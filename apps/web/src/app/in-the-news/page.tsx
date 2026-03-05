import Link from 'next/link'
import { Suspense } from 'react'

import { CMSImage } from '../../components/media/CMSImage'
import { getInTheNewsPage, getInTheNewsTags } from '../../lib/cms'
import { InTheNewsFilters } from './InTheNewsFilters'

export const dynamic = 'force-dynamic'

type InTheNewsSearchParams = {
  q?: string | string[]
  tag?: string | string[]
  page?: string | string[]
}

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

export default async function InTheNewsPage({
  searchParams,
}: {
  searchParams?: InTheNewsSearchParams | Promise<InTheNewsSearchParams>
}) {
  const resolvedParams = await Promise.resolve(searchParams)
  const tagParam = resolvedParams?.tag
  const searchParam = resolvedParams?.q
  const pageParam = resolvedParams?.page

  const tag = Array.isArray(tagParam) ? tagParam[0] : tagParam
  const search = Array.isArray(searchParam) ? searchParam[0] : searchParam
  const pageValue = Array.isArray(pageParam) ? pageParam[0] : pageParam
  const page = Math.max(1, Number(pageValue ?? 1))

  const [newsData, tags] = await Promise.all([
    getInTheNewsPage({ page, limit: 12, tag, search }),
    getInTheNewsTags(),
  ])

  const buildPageHref = (nextPage: number) => {
    const params = new URLSearchParams()
    if (tag) params.set('tag', tag)
    if (search) params.set('q', search)
    params.set('page', String(nextPage))
    return `/in-the-news?${params.toString()}`
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 pb-16 pt-24 text-slate-900 md:pt-28">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">In the News</p>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">In the News</h1>
          <p className="text-base text-slate-600">
            Press releases, commentary, and references that highlight our work and market economy advocacy.
          </p>
        </div>

        <Suspense
          fallback={<div className="rounded-3xl border border-slate-200/70 bg-white p-4 shadow-sm">Loading filters…</div>}
        >
          <InTheNewsFilters key={`${tag ?? 'all'}-${search ?? ''}`} tags={tags} currentTag={tag} currentSearch={search} />
        </Suspense>

        <div id="news-results" className="scroll-mt-36">
          {newsData.docs.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
              No news items available yet.
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {newsData.docs.map((item) => {
                const published = formatDate(item.publishedDate)
                return (
                  <article
                    key={item.id}
                    className="flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50"
                  >
                    {item.coverImage ? (
                      <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100">
                        <CMSImage media={item.coverImage} alt={item.title} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="aspect-4/3 w-full bg-linear-to-br from-slate-200 via-slate-100 to-slate-50" />
                    )}

                    <div className="flex flex-1 flex-col gap-4 p-6">
                      <div className="space-y-2">
                        {published ? (
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{published}</p>
                        ) : null}
                        <Link href={`/in-the-news/${item.slug}`} className="block">
                          <h2 className="text-xl font-semibold text-slate-900">{item.title}</h2>
                        </Link>
                        {item.excerpt ? <p className="text-sm text-slate-600">{item.excerpt}</p> : null}
                      </div>
                      <Link
                        href={`/in-the-news/${item.slug}`}
                        className="mt-auto text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 hover:text-slate-900"
                      >
                        Read more →
                      </Link>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>

        {newsData.totalPages > 1 ? (
          <div className="flex items-center justify-between text-sm text-slate-600">
            <Link
              href={buildPageHref(Math.max(1, page - 1))}
              className={`rounded-full border px-4 py-2 ${page === 1 ? 'pointer-events-none opacity-40' : ''}`}
            >
              Previous
            </Link>
            <span>
              Page {newsData.page} of {newsData.totalPages}
            </span>
            <Link
              href={buildPageHref(Math.min(newsData.totalPages, page + 1))}
              className={`rounded-full border px-4 py-2 ${page === newsData.totalPages ? 'pointer-events-none opacity-40' : ''}`}
            >
              Next
            </Link>
          </div>
        ) : null}
      </div>
    </main>
  )
}
