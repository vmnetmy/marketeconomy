export type TestimonialsAdvanced = {
  layout?: 'grid' | 'carousel' | null
}

export function getTestimonialsStyles(advanced?: TestimonialsAdvanced) {
  const layout = advanced?.layout ?? 'grid'
  const listClass =
    layout === 'carousel'
      ? 'flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4'
      : 'grid gap-4 md:grid-cols-2'
  const itemClass = layout === 'carousel' ? 'min-w-[280px] snap-start' : ''

  return { listClass, itemClass }
}
