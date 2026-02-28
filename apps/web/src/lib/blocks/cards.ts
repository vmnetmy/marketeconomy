export type CardsAdvanced = {
  cardStyle?: 'flat' | 'raised' | null
  columns?: '2' | '3' | '4' | null
}

export function getCardsStyles(advanced?: CardsAdvanced) {
  const columns = advanced?.columns ?? '2'
  const gridClass =
    columns === '3'
      ? 'md:grid-cols-2 lg:grid-cols-3'
      : columns === '4'
        ? 'md:grid-cols-2 lg:grid-cols-4'
        : 'md:grid-cols-2'

  const cardStyle = advanced?.cardStyle ?? 'raised'
  const cardClass =
    cardStyle === 'flat'
      ? 'border border-slate-200 bg-white'
      : 'border border-slate-200 bg-white shadow-sm'

  return { gridClass, cardClass }
}
