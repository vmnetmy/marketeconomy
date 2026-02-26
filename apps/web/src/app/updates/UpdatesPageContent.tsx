import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'
import type { SerializedEditorState } from 'lexical'

import { UpdatesSidebar } from '../../components/updates/UpdatesSidebar'
import { getFeaturedPosts, getPageBySlug, getPostsPage, getUpdatesSidebar, resolveMediaUrl } from '../../lib/cms'

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

const renderRichText = (content?: SerializedEditorState | null) => {
  if (!content) return null
  const html = convertLexicalToHTML({ data: content })
  return <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
}

const getIntroFromPage = (page?: { layout?: Array<{ blockType?: string; content?: unknown }> }) => {
  const firstRichText = page?.layout?.find((block) => block.blockType === 'richText')
  return firstRichText?.content as SerializedEditorState | null | undefined
}

const buildPageHref = (page: number) => (page <= 1 ? '/updates' : `/updates/page/${page}`)

export async function UpdatesPageContent({ currentPage }: { currentPage: number }) {
  const pageToRender = Math.max(1, currentPage)

  const [pageData, postsData, sidebarData] = await Promise.all([
    getPageBySlug('updates'),
    getPostsPage({ page: pageToRender, limit: 10 }),
    getUpdatesSidebar(),
  ])

  const intro = getIntroFromPage(pageData)
  const heading = pageData?.title ?? 'Latest posts'

  const totalPages = postsData.totalPages ?? 1
  const pageStart = Math.max(1, pageToRender - 2)
  const pageEnd = Math.min(totalPages, pageToRender + 2)
  const pageNumbers = Array.from({ length: pageEnd - pageStart + 1 }, (_, i) => pageStart + i)

  const featuredLimit = Math.max(1, sidebarData?.featuredLimit ?? 3)
  const featuredPosts = await getFeaturedPosts(featuredLimit)

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold">{heading}</h1>
          {renderRichText(intro)}
        </header>

        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10">
          <div className="space-y-8">
            {postsData.docs.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
                No posts available yet.
              </div>
            ) : (
              <div className="space-y-6">
                {postsData.docs.map((post) => {
                  const coverUrl = resolveMediaUrl(post.coverImage)
                  const published = formatDate(post.publishedAt)
                  const tags = (post.tags || [])
                    .map((tag) => tag?.tag)
                    .filter((tag): tag is string => Boolean(tag))

                  return (
                    <article
                      key={post.id}
                      className="grid gap-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md md:grid-cols-[220px_1fr]"
                    >
                      <a href={`/updates/${post.slug}`} className="block">
                        {coverUrl ? (
                          <img
                            src={coverUrl}
                            alt={post.title}
                            className="h-44 w-full rounded-2xl object-cover"
                          />
                        ) : (
                          <div className="h-44 w-full rounded-2xl bg-gradient-to-br from-slate-200 via-slate-100 to-slate-50" />
                        )}
                      </a>
                      <div className="flex flex-col justify-between gap-4">
                        <div className="space-y-3">
                          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                            {published ? <span>{published}</span> : null}
                            {tags.length > 0 ? (
                              <div className="flex flex-wrap gap-2">
                                {tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            ) : null}
                          </div>
                          <a href={`/updates/${post.slug}`} className="block">
                            <h2 className="text-2xl font-semibold leading-snug text-slate-900">{post.title}</h2>
                          </a>
                          {post.excerpt ? (
                            <p className="text-base text-slate-600">
                              {post.excerpt.length > 160 ? `${post.excerpt.slice(0, 160)}...` : post.excerpt}
                            </p>
                          ) : null}
                        </div>
                        <div>
                          <a
                            href={`/updates/${post.slug}`}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900"
                          >
                            Read more →
                          </a>
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            )}

            {totalPages > 1 ? (
              <nav className="flex flex-wrap items-center justify-center gap-2">
                <a
                  href={buildPageHref(pageToRender - 1)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold ${
                    pageToRender === 1
                      ? 'pointer-events-none border-slate-200 text-slate-400'
                      : 'border-slate-300 text-slate-700 hover:border-slate-400'
                  }`}
                >
                  Prev
                </a>
                {pageNumbers.map((pageNumber) => (
                  <a
                    key={pageNumber}
                    href={buildPageHref(pageNumber)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold ${
                      pageNumber === pageToRender
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : 'border-slate-300 text-slate-700 hover:border-slate-400'
                    }`}
                  >
                    {pageNumber}
                  </a>
                ))}
                <a
                  href={buildPageHref(pageToRender + 1)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold ${
                    pageToRender >= totalPages
                      ? 'pointer-events-none border-slate-200 text-slate-400'
                      : 'border-slate-300 text-slate-700 hover:border-slate-400'
                  }`}
                >
                  Next
                </a>
              </nav>
            ) : null}
          </div>

          <div className="mt-10 lg:sticky lg:top-24 lg:mt-0">
            <UpdatesSidebar data={sidebarData} featuredPosts={featuredPosts} />
          </div>
        </div>
      </div>
    </main>
  )
}
