export type PricingAdvanced = {
  columns?: '2' | '3' | '4' | null
  cardStyle?: 'flat' | 'raised' | null
  highlightStyle?: 'solid' | 'outline' | null
}

export function getPricingStyles(advanced?: PricingAdvanced) {
  const columns = advanced?.columns ?? '3'
  const gridClass =
    columns === '4'
      ? 'md:grid-cols-2 lg:grid-cols-4'
      : columns === '2'
        ? 'md:grid-cols-2'
        : 'md:grid-cols-3'

  const cardStyle = advanced?.cardStyle ?? 'flat'
  const baseCardClass =
    cardStyle === 'raised'
      ? 'rounded-2xl border p-6 shadow-sm'
      : 'rounded-2xl border p-6'

  const highlightStyle = advanced?.highlightStyle ?? 'solid'
  const highlightClass =
    highlightStyle === 'outline'
      ? 'border-slate-900 bg-white text-slate-900'
      : 'border-slate-900 bg-slate-900 text-white'

  return { gridClass, baseCardClass, highlightClass }
}
