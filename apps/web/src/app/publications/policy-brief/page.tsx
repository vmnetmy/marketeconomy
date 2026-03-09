import { ArrowDownTrayIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { Suspense } from 'react'

import { CMSImage } from '../../../components/media/CMSImage'
import { ContentPlaceholder } from '../../../components/ui/ContentPlaceholder'
import { getPolicyBriefsPage, getPolicyBriefTags, getSiteSettings, resolveMediaUrl } from '../../../lib/cms'
import { resolvePlaceholderLabel, resolvePlaceholderMode, shouldShowPlaceholder } from '../../../lib/placeholders'
import { PolicyBriefsFilters } from './PolicyBriefsFilters'

export const dynamic = 'force-dynamic'

type PolicyBriefsSearchParams = {
  q?: string | string[]
  tag?: string | string[]
  sort?: 'latest' | 'oldest' | string | string[]
  page?: string | string[]
}

const introCopy = {
  title: 'Policy Briefs',
  subtitle:
    'Concise, evidence-based insights designed to inform policy decisions and market reforms across Malaysia and ASEAN.',
  body: [
    'A Policy Brief is a focused analysis of a public issue, written to help decision makers act quickly and effectively. It distills complex research into practical insights, grounded in market realities.',
    'At MarketEconomy.org, our briefs connect regional experience with global best practice. We publish actionable recommendations for policymakers, students, researchers, entrepreneurs, and institutions working to strengthen free and open markets.',
  ],
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

export default async function PolicyBriefsPage({
  searchParams,
}: {
  searchParams?: PolicyBriefsSearchParams | Promise<PolicyBriefsSearchParams>
}) {
  const resolvedParams = await Promise.resolve(searchParams)
  const tagParam = resolvedParams?.tag
  const sortParam = resolvedParams?.sort
  const searchParam = resolvedParams?.q
  const pageParam = resolvedParams?.page

  const tag = Array.isArray(tagParam) ? tagParam[0] : tagParam
  const sortValue = Array.isArray(sortParam) ? sortParam[0] : sortParam
  const search = Array.isArray(searchParam) ? searchParam[0] : searchParam
  const pageValue = Array.isArray(pageParam) ? pageParam[0] : pageParam

  const page = Math.max(1, Number(pageValue ?? 1))
  const sort = sortValue === 'oldest' ? 'oldest' : 'latest'

  const [briefsData, tags, site] = await Promise.all([
    getPolicyBriefsPage({ page, limit: 12, tag, search, sort }),
    getPolicyBriefTags(),
    getSiteSettings(),
  ])
  const mode = resolvePlaceholderMode(site)
  const label = resolvePlaceholderLabel(site)
  const showPlaceholder = shouldShowPlaceholder({
    mode,
    override: 'default',
    contentExists: briefsData.docs.length > 0,
  })

  const buildPageHref = (nextPage: number) => {
    const params = new URLSearchParams()
    if (tag) params.set('tag', tag)
    if (search) params.set('q', search)
    if (sort && sort !== 'latest') params.set('sort', sort)
    params.set('page', String(nextPage))
    return `/publications/policy-brief?${params.toString()}`
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 pb-16 pt-24 text-slate-900 md:pt-28">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <section className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 px-8 py-12 text-white shadow-xl">
          <div className="relative z-10 max-w-3xl space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/70">Policy Brief Series</p>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{introCopy.title}</h1>
            <p className="text-lg text-white/80">{introCopy.subtitle}</p>
            <div className="space-y-4 text-sm text-white/75">
              {introCopy.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_60%)]" />
        </section>

        <Suspense
          fallback={<div className="rounded-3xl border border-slate-200/70 bg-white p-4 shadow-sm">Loading filters…</div>}
        >
          <PolicyBriefsFilters
            key={`${tag ?? 'all'}-${sort}-${search ?? ''}`}
            tags={tags}
            currentTag={tag}
            currentSearch={search}
            currentSort={sort}
          />
        </Suspense>

        <div id="policy-brief-results" className="scroll-mt-36">
          {showPlaceholder ? (
            <ContentPlaceholder
              title="Policy Briefs"
              label={label}
              description="Policy briefs will appear here once published."
              items={6}
              columns={3}
            />
          ) : briefsData.docs.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
              No policy briefs available yet.
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {briefsData.docs.map((brief) => {
                const published = formatDate(brief.publishedAt)
                const pdfUrl = resolveMediaUrl(brief.pdfFile)
                const tagsList = (brief.tags || [])
                  .map((tagItem) => tagItem?.tag)
                  .filter((tagItem): tagItem is string => Boolean(tagItem))

                return (
                  <article
                    key={brief.id}
                    className="flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50"
                  >
                    {brief.coverImage ? (
                      <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100">
                        <CMSImage
                          media={brief.coverImage}
                          alt={brief.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1280px) 50vw, 33vw"
                        />
                      </div>
                    ) : (
                      <div className="aspect-4/3 w-full bg-linear-to-br from-slate-200 via-slate-100 to-slate-50" />
                    )}

                    <div className="flex flex-1 flex-col gap-5 p-6">
                      <div className="space-y-3">
                        {published ? (
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{published}</p>
                        ) : null}
                        <Link href={`/publications/policy-brief/${brief.slug}`} className="block">
                          <h2 className="text-xl font-semibold leading-snug text-slate-900">{brief.title}</h2>
                        </Link>
                        {brief.summary ? <p className="text-sm text-slate-600">{brief.summary}</p> : null}
                        {tagsList.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {tagsList.map((tagItem) => (
                              <span
                                key={tagItem}
                                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600"
                              >
                                {tagItem}
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </div>

                      <div className="mt-auto flex flex-wrap items-center gap-3">
                        {pdfUrl ? (
                          <a
                            href={`/publications/policy-brief/${brief.slug}`}
                            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-slate-800"
                          >
                            <ArrowDownTrayIcon className="h-4 w-4" />
                            Download PDF
                          </a>
                        ) : null}
                        <Link
                          href={`/publications/policy-brief/${brief.slug}`}
                          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 hover:text-slate-900"
                        >
                          Read more
                          <ArrowRightIcon className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>

        {briefsData.totalPages > 1 ? (
          <div className="flex items-center justify-between text-sm text-slate-600">
            <Link
              href={buildPageHref(Math.max(1, page - 1))}
              className={`rounded-full border px-4 py-2 ${page === 1 ? 'pointer-events-none opacity-40' : ''}`}
            >
              Previous
            </Link>
            <span>
              Page {briefsData.page} of {briefsData.totalPages}
            </span>
            <Link
              href={buildPageHref(Math.min(briefsData.totalPages, page + 1))}
              className={`rounded-full border px-4 py-2 ${page === briefsData.totalPages ? 'pointer-events-none opacity-40' : ''}`}
            >
              Next
            </Link>
          </div>
        ) : null}
      </div>
    </main>
  )
}
