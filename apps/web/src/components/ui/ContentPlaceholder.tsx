type ContentPlaceholderProps = {
  title: string
  label?: string
  description?: string
  items?: number
  columns?: 1 | 2 | 3 | 4
}

const gridClassForColumns = (columns: number) => {
  if (columns === 1) return 'grid-cols-1'
  if (columns === 2) return 'grid-cols-1 md:grid-cols-2'
  if (columns === 4) return 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4'
  return 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
}

const SkeletonLine = ({ className }: { className?: string }) => (
  <div className={`h-3 rounded-full bg-slate-200/80 ${className ?? ''}`} />
)

export function ContentPlaceholder({
  title,
  label = 'Content coming soon',
  description,
  items = 3,
  columns = 3,
}: ContentPlaceholderProps) {
  return (
    <section className="rounded-3xl border border-dashed border-slate-300 bg-white p-8">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{label}</p>
        <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
        {description ? <p className="text-sm text-slate-600">{description}</p> : null}
      </div>

      <div className={`mt-6 grid gap-6 ${gridClassForColumns(columns)}`}>
        {Array.from({ length: items }).map((_, index) => (
          <div
            key={`placeholder-${index}`}
            className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 animate-pulse"
          >
            <div className="h-28 w-full rounded-xl bg-slate-200/80" />
            <div className="space-y-2">
              <SkeletonLine className="w-2/3" />
              <SkeletonLine className="w-5/6" />
              <SkeletonLine className="w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function PagePlaceholder({
  title,
  label = 'Content coming soon',
  description,
}: {
  title: string
  label?: string
  description?: string
}) {
  return (
    <main className="min-h-screen bg-slate-50 px-6 pb-16 pt-24 text-slate-900 md:pt-28">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <section className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{label}</p>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">{title}</h1>
          {description ? <p className="text-base text-slate-600">{description}</p> : null}
        </section>

        <div className="grid gap-8">
          <div className="h-56 w-full rounded-3xl bg-slate-200/80 animate-pulse" />
          <div className="grid gap-6 md:grid-cols-2">
            <div className="h-48 rounded-3xl bg-slate-200/70 animate-pulse" />
            <div className="h-48 rounded-3xl bg-slate-200/70 animate-pulse" />
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="h-40 rounded-3xl bg-slate-200/70 animate-pulse" />
            <div className="h-40 rounded-3xl bg-slate-200/70 animate-pulse" />
            <div className="h-40 rounded-3xl bg-slate-200/70 animate-pulse" />
          </div>
        </div>
      </div>
    </main>
  )
}
