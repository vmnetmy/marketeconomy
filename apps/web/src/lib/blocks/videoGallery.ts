export type VideoGalleryAdvanced = {
  cardStyle?: 'flat' | 'raised' | null
}

export function getVideoGalleryStyles(advanced?: VideoGalleryAdvanced) {
  const cardStyle = advanced?.cardStyle ?? 'raised'
  const cardClass =
    cardStyle === 'flat'
      ? 'border border-slate-200 bg-white'
      : 'border border-slate-200 bg-white shadow-sm shadow-slate-200/80'

  return { cardClass }
}
