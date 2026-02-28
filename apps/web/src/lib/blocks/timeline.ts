export type TimelineAdvanced = {
  style?: 'cards' | 'minimal' | null
  compact?: boolean | null
}

export function getTimelineStyles(advanced?: TimelineAdvanced) {
  const style = advanced?.style ?? 'cards'
  const compact = advanced?.compact ?? false

  const listClass = compact ? 'space-y-3' : 'space-y-4'
  const itemClass =
    style === 'minimal'
      ? `border-l-2 border-slate-200 pl-4 ${compact ? 'py-2' : 'py-3'}`
      : `rounded-2xl border border-slate-200 bg-white ${compact ? 'p-4' : 'p-5'}`

  return { listClass, itemClass }
}
