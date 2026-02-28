import type { AdvancedSettings } from './cms'

type SectionBackground = 'none' | 'light' | 'dark'
type SectionPadding = 'none' | 'compact' | 'standard' | 'large'
type SectionWidth = 'standard' | 'wide' | 'full'

type SectionOverrides = {
  id?: string
  background?: SectionBackground
  padding?: SectionPadding
  width?: SectionWidth
  className?: string
}

export function getVisibilityClass(advanced?: AdvancedSettings): string {
  if (advanced?.hideOnMobile && advanced?.hideOnDesktop) return 'hidden'
  if (advanced?.hideOnMobile) return 'hidden md:block'
  if (advanced?.hideOnDesktop) return 'block md:hidden'
  return ''
}

export function getSectionProps(advanced?: AdvancedSettings, overrides: SectionOverrides = {}) {
  const visibilityClass = getVisibilityClass(advanced)
  const className = [visibilityClass, overrides.className].filter(Boolean).join(' ')

  return {
    id: (advanced?.anchorId ?? overrides.id) || undefined,
    background: (advanced?.background ?? overrides.background ?? 'none') as SectionBackground,
    padding: (advanced?.padding ?? overrides.padding ?? 'standard') as SectionPadding,
    width: (advanced?.width ?? overrides.width ?? 'standard') as SectionWidth,
    className: className || undefined,
  }
}
