export type StatsAdvanced = {
  numberSize?: 'sm' | 'md' | 'lg' | null
  cardStyle?: 'flat' | 'raised' | null
  columns?: '2' | '3' | '4' | null
}

export function getStatsStyles(advanced?: StatsAdvanced, layout?: 'grid' | 'row') {
  const numberSize = advanced?.numberSize ?? 'md'
  const numberClass = numberSize === 'sm' ? 'text-2xl' : numberSize === 'lg' ? 'text-4xl' : 'text-3xl'

  const columns = advanced?.columns ?? '3'
  const gridClass =
    layout === 'row'
      ? 'md:grid-cols-3'
      : columns === '4'
        ? 'md:grid-cols-2 lg:grid-cols-4'
        : columns === '2'
          ? 'md:grid-cols-2'
          : 'md:grid-cols-2 lg:grid-cols-3'

  const cardStyle = advanced?.cardStyle ?? 'flat'
  const cardClass =
    cardStyle === 'raised'
      ? 'rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'
      : 'rounded-2xl border border-slate-200 bg-white p-5'

  return { numberClass, gridClass, cardClass }
}
