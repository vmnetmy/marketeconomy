export type NewsletterAdvanced = {
  tone?: 'light' | 'dark' | null
  layout?: 'stacked' | 'inline' | null
  cardStyle?: 'flat' | 'raised' | null
}

export function getNewsletterStyles(advanced?: NewsletterAdvanced) {
  const tone = advanced?.tone ?? 'light'
  const layout = advanced?.layout ?? 'inline'
  const cardStyle = advanced?.cardStyle ?? 'flat'

  const toneClass = tone === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'
  const cardClass =
    cardStyle === 'raised'
      ? `rounded-2xl border border-slate-200 p-6 shadow-sm ${toneClass}`
      : `rounded-2xl border border-slate-200 p-6 ${toneClass}`

  const formClass = layout === 'stacked' ? 'flex flex-col gap-3' : 'flex flex-col gap-3 sm:flex-row'

  const inputClass =
    tone === 'dark'
      ? 'w-full rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-white placeholder:text-slate-400'
      : 'w-full rounded-full border border-slate-200 px-4 py-2 text-sm'

  const buttonClass =
    tone === 'dark'
      ? 'rounded-full bg-white px-6 py-2 text-sm font-semibold text-slate-900'
      : 'rounded-full bg-slate-900 px-6 py-2 text-sm font-semibold text-white'

  const finePrintClass = tone === 'dark' ? 'text-xs text-slate-300' : 'text-xs text-slate-500'

  return { cardClass, formClass, inputClass, buttonClass, finePrintClass }
}
