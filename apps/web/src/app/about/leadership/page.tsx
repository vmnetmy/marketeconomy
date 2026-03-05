import { CMSImage } from '../../../components/media/CMSImage'
import { RichText } from '../../../components/ui/RichText'
import { getLeadership } from '../../../lib/cms'

export const dynamic = 'force-dynamic'

export default async function LeadershipPage() {
  const leadership = await getLeadership()

  return (
    <main className="min-h-screen bg-slate-50 px-6 pb-16 pt-24 text-slate-900 md:pt-28">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Leadership</p>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Leadership</h1>
          <p className="text-base text-slate-600">
            The leadership team guiding the Network for Market Economy’s mission and strategic direction.
          </p>
        </div>

        <div className="grid gap-8">
          {leadership.map((leader) => (
            <article key={leader.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="grid gap-6 md:grid-cols-[160px_1fr] md:items-start">
                {leader.photo ? (
                  <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-slate-100">
                    <CMSImage media={leader.photo} alt={leader.name} fill className="object-cover" />
                  </div>
                ) : null}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-semibold text-slate-900">{leader.name}</h2>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{leader.role}</p>
                  </div>
                  {leader.bio ? <RichText content={leader.bio} /> : null}
                  {leader.socialUrl ? (
                    <a
                      href={leader.socialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                    >
                      View profile →
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
