export type TwoColumnRichTextAdvanced = {
  gap?: 'sm' | 'md' | 'lg' | null
  verticalAlign?: 'top' | 'center' | null
}

export function getTwoColumnRichTextStyles(advanced?: TwoColumnRichTextAdvanced) {
  const gap = advanced?.gap ?? 'md'
  const gapClass = gap === 'sm' ? 'gap-4' : gap === 'lg' ? 'gap-12' : 'gap-8'

  const verticalAlign = advanced?.verticalAlign ?? 'top'
  const alignClass = verticalAlign === 'center' ? 'items-center' : 'items-start'

  return { gapClass, alignClass }
}
