export type FAQAdvanced = {
  layout?: 'cards' | 'minimal' | null
  columns?: '1' | '2' | null
}

export function getFAQStyles(advanced?: FAQAdvanced) {
  const layout = advanced?.layout ?? 'cards'
  const columns = advanced?.columns ?? '1'

  const listClass = columns === '2' ? 'grid gap-4 md:grid-cols-2' : 'space-y-4'
  const itemClass =
    layout === 'minimal'
      ? 'border-b border-slate-200 pb-4'
      : 'rounded-xl border border-slate-200 bg-white p-4'

  return { listClass, itemClass }
}
