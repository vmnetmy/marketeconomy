import Link from 'next/link'
import { notFound } from 'next/navigation'

import { BlockRenderer } from '../components/blocks/BlockRenderer'
import { CMSImage } from '../components/media/CMSImage'
import { SectionWrapper } from '../components/layout/SectionWrapper'
import { ContentPlaceholder, PagePlaceholder } from '../components/ui/ContentPlaceholder'
import {
  getFeaturedPolicyBrief,
  getLatestInTheNews,
  getPageBySlug,
  getSiteSettings,
  getUpcomingEvents,
} from '../lib/cms'
import {
  resolvePlaceholderLabel,
  resolvePlaceholderMode,
  resolvePlaceholderOverride,
  shouldShowPlaceholder,
} from '../lib/placeholders'

export default async function Home() {
  const [page, featuredBrief, latestNews, upcomingEvents, site] = await Promise.all([
    getPageBySlug('home'),
    getFeaturedPolicyBrief(),
    getLatestInTheNews(4),
    getUpcomingEvents(3),
    getSiteSettings(),
  ])

  const mode = resolvePlaceholderMode(site)
  const label = resolvePlaceholderLabel(site)
  const override = resolvePlaceholderOverride(page)
  const pageContentExists = Boolean(page?.layout?.length)
  const showPagePlaceholder = shouldShowPlaceholder({
    mode,
    override,
    contentExists: pageContentExists,
  })

  if (!page && !showPagePlaceholder) return notFound()
  if (showPagePlaceholder) {
    return <PagePlaceholder title="Home" label={label} description="Homepage content will appear here once added." />
  }

  const showEventsPlaceholder = shouldShowPlaceholder({
    mode,
    override,
    contentExists: upcomingEvents.length > 0,
  })

  const showBriefPlaceholder = shouldShowPlaceholder({
    mode,
    override,
    contentExists: Boolean(featuredBrief),
  })

  const showNewsPlaceholder = shouldShowPlaceholder({
    mode,
    override,
    contentExists: latestNews.length > 0,
  })

  const safeLayout = page?.layout ?? []

  return (
    <div className="flex w-full flex-col gap-16">
      <BlockRenderer blocks={safeLayout} placeholderLabel={label} />

      <SectionWrapper background="light">
        {showEventsPlaceholder ? (
          <ContentPlaceholder
            title="Latest Events"
            label={label}
            description="Upcoming events will appear here once published."
            items={3}
            columns={3}
          />
        ) : (
          <div className="space-y-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Upcoming Events</p>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900">Latest Events</h2>
              </div>
              <Link href="/events" className="text-sm font-semibold text-blue-600">
                Explore events →
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {upcomingEvents.map((event) => (
                <Link
                  key={event.id}
                  href={`/events/${event.slug}`}
                  className="flex h-full flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-slate-900">{event.title}</h3>
                    {event.location ? <p className="text-sm text-slate-600">{event.location}</p> : null}
                    {event.startDate ? (
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                        {new Date(event.startDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    ) : null}
                  </div>
                  <span className="mt-auto text-sm font-semibold text-blue-600">View event →</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </SectionWrapper>

      <SectionWrapper background="light">
        {showBriefPlaceholder ? (
          <ContentPlaceholder
            title="Featured Policy Brief"
            label={label}
            description="The featured brief will appear here once published."
            items={1}
            columns={1}
          />
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-start">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Featured Policy Brief</p>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                {featuredBrief?.title ?? 'Policy Brief'}
              </h2>
              {featuredBrief?.summary ? <p className="text-base text-slate-600">{featuredBrief.summary}</p> : null}
              {featuredBrief?.slug ? (
                <Link
                  href={`/publications/policy-brief/${featuredBrief.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600"
                >
                  Read the brief →
                </Link>
              ) : null}
            </div>
            {featuredBrief?.coverImage ? (
              <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-slate-100 shadow-lg">
                <CMSImage media={featuredBrief.coverImage} alt={featuredBrief.title} fill className="object-cover" />
              </div>
            ) : null}
          </div>
        )}
      </SectionWrapper>

      <SectionWrapper>
        {showNewsPlaceholder ? (
          <ContentPlaceholder
            title="In the News"
            label={label}
            description="News items will appear here once published."
            items={4}
            columns={4}
          />
        ) : (
          <div className="space-y-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Latest News</p>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900">In the News</h2>
              </div>
              <Link href="/in-the-news" className="text-sm font-semibold text-blue-600">
                View all →
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {latestNews.map((item) => (
                <Link
                  key={item.id}
                  href={`/in-the-news/${item.slug}`}
                  className="flex h-full flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  {item.coverImage ? (
                    <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-slate-100">
                      <CMSImage media={item.coverImage} alt={item.title} fill className="object-cover" />
                    </div>
                  ) : null}
                  <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                  {item.excerpt ? <p className="text-sm text-slate-600">{item.excerpt}</p> : null}
                </Link>
              ))}
            </div>
          </div>
        )}
      </SectionWrapper>
    </div>
  )
}
