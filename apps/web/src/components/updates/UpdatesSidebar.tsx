import type { PostListItem, UpdatesSidebarGlobal } from '../../lib/cms'

type UpdatesSidebarProps = {
  data?: UpdatesSidebarGlobal | null
  featuredPosts?: PostListItem[]
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

export function UpdatesSidebar({ data, featuredPosts = [] }: UpdatesSidebarProps) {
  const rawFormAction = data?.formAction?.trim() ?? ''
  const hasCustomAction = rawFormAction.length > 0
  const newsletterHeadline = data?.newsletterHeadline ?? 'Stay Updated'
  const newsletterDescription =
    data?.newsletterDescription ?? 'Get new research and policy briefs in your inbox.'
  const buttonLabel = data?.buttonLabel ?? 'Subscribe'
  const formAction = hasCustomAction ? rawFormAction : '/contact'
  const finePrint = data?.finePrint ?? 'We respect your inbox and never spam.'
  const featuredTitle = data?.featuredTitle ?? 'Featured posts'

  return (
    <aside className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-900">{newsletterHeadline}</h2>
          <p className="text-sm text-slate-600">{newsletterDescription}</p>
        </div>

        {hasCustomAction ? (
          <form action={formAction} method="post" className="mt-4 space-y-3">
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none"
            />
            <button
              type="submit"
              className="w-full rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              {buttonLabel}
            </button>
          </form>
        ) : (
          <a
            href={formAction}
            className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            {buttonLabel}
          </a>
        )}

        {finePrint ? <p className="mt-3 text-xs text-slate-500">{finePrint}</p> : null}
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">{featuredTitle}</h2>
        {featuredPosts.length === 0 ? (
          <p className="mt-3 text-sm text-slate-500">No featured posts yet.</p>
        ) : (
          <div className="mt-4 space-y-4">
            {featuredPosts.map((post) => {
              const published = formatDate(post.publishedAt)
              return (
                <a
                  key={post.id}
                  href={`/updates/${post.slug}`}
                  className="block rounded-2xl border border-transparent p-3 transition hover:border-slate-200 hover:bg-slate-50"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-slate-900">{post.title}</p>
                    {published ? <p className="text-xs text-slate-500">{published}</p> : null}
                  </div>
                </a>
              )
            })}
          </div>
        )}
      </section>
    </aside>
  )
}
