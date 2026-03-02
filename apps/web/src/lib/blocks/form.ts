export type FormAdvanced = {
  layout?: 'stacked' | 'twoColumn' | null
  align?: 'left' | 'center' | null
  cardStyle?: 'none' | 'soft' | 'card' | 'outline' | null
  radius?: 'sm' | 'md' | 'lg' | null
  shadow?: 'none' | 'soft' | 'medium' | null
  buttonStyle?: 'solid' | 'outline' | null
  showLabels?: boolean | null
  fullWidthButton?: boolean | null
}

export function getFormStyles(advanced?: FormAdvanced) {
  const layout = advanced?.layout ?? 'stacked'
  const align = advanced?.align ?? 'left'
  const cardStyle = advanced?.cardStyle ?? 'card'
  const radius = advanced?.radius ?? 'lg'
  const shadow = advanced?.shadow ?? 'soft'
  const buttonStyle = advanced?.buttonStyle ?? 'solid'
  const showLabels = advanced?.showLabels ?? true
  const fullWidthButton = advanced?.fullWidthButton ?? false

  const radiusClass = radius === 'sm' ? 'rounded-xl' : radius === 'md' ? 'rounded-2xl' : 'rounded-3xl'
  const shadowClass = shadow === 'medium' ? 'shadow-lg' : shadow === 'soft' ? 'shadow-sm' : ''
  const cardBase = `${radiusClass} ${shadowClass}`
  const cardClass =
    cardStyle === 'none'
      ? ''
      : cardStyle === 'soft'
        ? `${cardBase} border border-slate-100 bg-slate-50 p-6`
        : cardStyle === 'outline'
          ? `${cardBase} border border-slate-200 bg-white p-6`
          : `${cardBase} border border-slate-200 bg-white p-8`

  const gridClass = layout === 'twoColumn' ? 'grid gap-4 md:grid-cols-2' : 'grid gap-4'
  const headerClass = align === 'center' ? 'text-center' : 'text-left'
  const labelClass = showLabels ? 'text-sm font-medium text-slate-700' : 'sr-only'

  const inputClass =
    'w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none'
  const textareaClass =
    'w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none'
  const selectClass =
    'w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none'

  const buttonBase = 'rounded-xl px-4 py-2 text-sm font-semibold transition'
  const buttonClass =
    buttonStyle === 'outline'
      ? `${buttonBase} border border-slate-300 text-slate-900 hover:bg-slate-50`
      : `${buttonBase} bg-slate-900 text-white hover:bg-slate-800`

  return {
    cardClass,
    gridClass,
    headerClass,
    labelClass,
    inputClass,
    textareaClass,
    selectClass,
    buttonClass: fullWidthButton ? `${buttonClass} w-full` : buttonClass,
    showLabels,
  }
}
