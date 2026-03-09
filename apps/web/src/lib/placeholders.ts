import type { PageDoc, SiteSettingsGlobal } from './cms'

export type PlaceholderMode = 'off' | 'on' | 'onlyWhenEmpty'
export type PlaceholderOverride = 'default' | 'forceOn' | 'forceOff'

export const resolvePlaceholderMode = (site?: SiteSettingsGlobal | null): PlaceholderMode => {
  const mode = site?.contentPlaceholders?.mode
  if (mode === 'on' || mode === 'off' || mode === 'onlyWhenEmpty') return mode
  return 'onlyWhenEmpty'
}

export const resolvePlaceholderLabel = (site?: SiteSettingsGlobal | null): string =>
  site?.contentPlaceholders?.label ?? 'Content coming soon'

export const resolvePlaceholderOverride = (page?: PageDoc | null): PlaceholderOverride => {
  const override = page?.placeholderOverride
  if (override === 'forceOn' || override === 'forceOff' || override === 'default') return override
  return 'default'
}

export const shouldShowPlaceholder = ({
  mode,
  override,
  contentExists,
}: {
  mode: PlaceholderMode
  override: PlaceholderOverride
  contentExists: boolean
}): boolean => {
  if (override === 'forceOff') return false
  if (override === 'forceOn') return true
  if (mode === 'on') return true
  if (mode === 'onlyWhenEmpty') return !contentExists
  return false
}
