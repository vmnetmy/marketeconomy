export type FeatureGridAdvanced = {
  cardStyle?: 'flat' | 'raised' | null
}

export function getFeatureGridStyles(advanced?: FeatureGridAdvanced) {
  const cardStyle = advanced?.cardStyle ?? 'raised'
  const cardClass =
    cardStyle === 'flat'
      ? 'bg-white ring-1 ring-slate-200/60'
      : 'bg-slate-50 ring-1 ring-slate-200/50 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50'

  return { cardClass }
}
