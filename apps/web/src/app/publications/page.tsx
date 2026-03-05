export default function PublicationsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 pb-16 pt-24 text-slate-900 md:pt-28">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Publications</p>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Research & Reports</h1>
          <p className="text-base text-slate-600">
            Browse our policy briefs and event reports. Each publication is designed to be clear, practical, and
            decision-ready.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <a
            href="/publications/policy-brief"
            className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-slate-900">Policy Briefs</h2>
            <p className="text-sm text-slate-600">
              Concise, evidence-based insights designed to inform market reforms and regulatory decisions.
            </p>
            <span className="text-sm font-semibold text-blue-600">Explore policy briefs →</span>
          </a>

          <a
            href="/publications/event-reports"
            className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-slate-900">Event Reports</h2>
            <p className="text-sm text-slate-600">
              Documentation and takeaways from our roundtables, dialogues, and convenings.
            </p>
            <span className="text-sm font-semibold text-blue-600">Explore event reports →</span>
          </a>
        </div>
      </div>
    </main>
  )
}
