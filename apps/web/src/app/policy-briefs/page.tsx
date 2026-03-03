import Link from 'next/link'

import { CMSImage } from '../../components/media/CMSImage'
import { getPolicyBriefsPage, getPolicyBriefTags, resolveMediaUrl } from '../../lib/cms'
import { PolicyBriefsFilters } from './PolicyBriefsFilters'

type PolicyBriefsSearchParams = {
  q?: string
  tag?: string
  sort?: 'latest' | 'oldest'
  page?: string
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

export default async function PolicyBriefsPage({ searchParams }: { searchParams?: PolicyBriefsSearchParams }) {
  const page = Math.max(1, Number(searchParams?.page ?? 1))
  const tag = searchParams?.tag
  const search = searchParams?.q
  const sort = searchParams?.sort === 'oldest' ? 'oldest' : 'latest'

  const [briefsData, tags] = await Promise.all([
    getPolicyBriefsPage({ page, limit: 12, tag, search, sort }),
    getPolicyBriefTags(),
  ])

  const buildPageHref = (nextPage: number) => {
    const params = new URLSearchParams()
    if (tag) params.set('tag', tag)
    if (search) params.set('q', search)
    if (sort && sort !== 'latest') params.set('sort', sort)
    params.set('page', String(nextPage))
    return `/policy-briefs?${params.toString()}`
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 pb-16 pt-24 text-slate-900 md:pt-28">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <section className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-8 py-12 text-white shadow-xl">
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
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_60%)]" />
        </section>

        <PolicyBriefsFilters tags={tags} currentTag={tag} currentSearch={search} currentSort={sort} />

        {briefsData.docs.length === 0 ? (
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
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                      <CMSImage
                        media={brief.coverImage}
                        alt={brief.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1280px) 50vw, 33vw"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[4/3] w-full bg-gradient-to-br from-slate-200 via-slate-100 to-slate-50" />
                  )}

                  <div className="flex flex-1 flex-col gap-5 p-6">
                    <div className="space-y-3">
                      {published ? (
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{published}</p>
                      ) : null}
                      <Link href={`/policy-briefs/${brief.slug}`} className="block">
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
                          href={pdfUrl}
                          className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-slate-800"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Download PDF
                        </a>
                      ) : null}
                      <Link
                        href={`/policy-briefs/${brief.slug}`}
                        className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 hover:text-slate-900"
                      >
                        Read more →
                      </Link>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}

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
