export type MediaBlockAdvanced = {
  frameStyle?: 'none' | 'outline' | 'card' | null
  radius?: 'sm' | 'md' | 'lg' | null
  shadow?: 'none' | 'soft' | 'medium' | null
}

export function getMediaBlockStyles(advanced?: MediaBlockAdvanced) {
  const frameStyle = advanced?.frameStyle ?? 'outline'
  const radius = advanced?.radius ?? 'md'
  const shadow = advanced?.shadow ?? 'none'

  const radiusClass = radius === 'sm' ? 'rounded-xl' : radius === 'lg' ? 'rounded-3xl' : 'rounded-2xl'
  const shadowClass = shadow === 'medium' ? 'shadow-md' : shadow === 'soft' ? 'shadow-sm' : ''

  const frameClass =
    frameStyle === 'card'
      ? `border border-slate-200 bg-white ${shadowClass}`
      : frameStyle === 'outline'
        ? 'border border-slate-200'
        : ''

  return { frameClass, radiusClass }
}
