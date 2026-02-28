export type HeroAdvanced = {
  tone?: 'dark' | 'light' | null
  minHeight?: 'short' | 'medium' | 'large' | null
  overlayStrength?: 'light' | 'medium' | 'strong' | null
}

export function getHeroStyles(advanced?: HeroAdvanced) {
  const tone = advanced?.tone ?? 'dark'
  const minHeight = advanced?.minHeight ?? 'large'
  const overlayStrength = advanced?.overlayStrength ?? 'medium'

  const toneClass = tone === 'light' ? 'bg-slate-50 text-slate-900' : 'bg-slate-950 text-white'
  const minHeightClass =
    minHeight === 'short' ? 'min-h-[60vh]' : minHeight === 'medium' ? 'min-h-[75vh]' : 'min-h-[85vh]'
  const overlayClass =
    overlayStrength === 'light'
      ? 'bg-gradient-to-t from-slate-950/50 via-slate-900/40 to-transparent'
      : overlayStrength === 'strong'
        ? 'bg-gradient-to-t from-slate-950 via-slate-900/70 to-transparent'
        : 'bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent'

  return { toneClass, minHeightClass, overlayClass }
}
