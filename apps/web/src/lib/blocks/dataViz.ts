export type DataVizAdvanced = {
  panelStyle?: 'none' | 'soft' | 'card' | null
}

export function getDataVizStyles(advanced?: DataVizAdvanced) {
  const panelStyle = advanced?.panelStyle ?? 'none'
  const panelClass =
    panelStyle === 'card'
      ? 'rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'
      : panelStyle === 'soft'
        ? 'rounded-2xl border border-slate-100 bg-slate-50 p-5'
        : ''

  return { panelClass }
}
