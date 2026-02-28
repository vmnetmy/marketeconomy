export type ContentListAdvanced = {
  cardStyle?: 'flat' | 'raised' | null
  showImages?: boolean | null
  dense?: boolean | null
}

export function getContentListStyles(advanced?: ContentListAdvanced) {
  const cardStyle = advanced?.cardStyle ?? 'raised'
  const showImages = advanced?.showImages ?? true
  const dense = advanced?.dense ?? false

  const cardClass =
    cardStyle === 'flat'
      ? 'border border-slate-200 bg-white'
      : 'border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md'

  const spacingClass = dense ? 'space-y-2' : 'space-y-3'

  return { cardClass, showImages, spacingClass }
}
