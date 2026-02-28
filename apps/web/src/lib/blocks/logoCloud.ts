export type LogoCloudAdvanced = {
  cardStyle?: 'flat' | 'raised' | null
  columns?: '2' | '3' | '4' | '6' | null
}

export function getLogoCloudStyles(advanced?: LogoCloudAdvanced) {
  const columns = advanced?.columns ?? '4'
  const gridClass =
    columns === '6'
      ? 'grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6'
      : columns === '3'
        ? 'grid-cols-2 gap-4 md:grid-cols-3'
        : columns === '2'
          ? 'grid-cols-2 gap-4'
          : 'grid-cols-2 gap-4 md:grid-cols-4'

  const cardStyle = advanced?.cardStyle ?? 'flat'
  const cardClass =
    cardStyle === 'raised'
      ? 'rounded-2xl border border-slate-200 bg-white p-4 shadow-sm'
      : 'rounded-2xl border border-slate-200 bg-white p-4'

  return { gridClass, cardClass }
}
