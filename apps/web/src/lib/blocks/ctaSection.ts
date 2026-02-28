export type CTASectionAdvanced = {
  align?: 'left' | 'center' | null
}

export function getCTASectionStyles(advanced?: CTASectionAdvanced) {
  const align = advanced?.align ?? 'left'
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start'

  return { alignClass }
}
