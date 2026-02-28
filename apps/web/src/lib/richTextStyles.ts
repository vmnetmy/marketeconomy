import type { CSSProperties } from 'react'

import type { RichTextAdvancedSettings } from './cms'

type RichTextStyles = {
  wrapperClass: string
  proseClass: string
  styleVars: CSSProperties
  calloutClass?: string
  calloutText?: string
}

const textSizeMap: Record<string, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
}

const lineHeightMap: Record<string, string> = {
  snug: 'leading-snug',
  normal: 'leading-normal',
  relaxed: 'leading-relaxed',
}

const textAlignMap: Record<string, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

const maxWidthMap: Record<string, string> = {
  narrow: 'max-w-3xl',
  standard: 'max-w-5xl',
  wide: 'max-w-6xl',
  full: 'max-w-none',
}

const radiusMap: Record<string, string> = {
  sm: 'rounded-xl',
  md: 'rounded-2xl',
  lg: 'rounded-3xl',
}

const shadowMap: Record<string, string> = {
  none: '',
  soft: 'shadow-sm',
  medium: 'shadow-md',
}

const paddingMap: Record<string, string> = {
  compact: 'p-4 md:p-5',
  standard: 'p-6 md:p-8',
  large: 'p-8 md:p-10',
}

const columnGapMap: Record<string, string> = {
  sm: '1.5rem',
  md: '2rem',
  lg: '3rem',
}

export function getRichTextStyles(advanced?: RichTextAdvancedSettings): RichTextStyles {
  const typography = advanced?.typography ?? {}
  const layout = advanced?.layout ?? {}
  const container = advanced?.container ?? {}
  const callouts = advanced?.callouts ?? {}
  const colors = advanced?.colors ?? {}

  const wrapperClasses: string[] = ['w-full', 'mx-auto']
  const proseClasses: string[] = ['rt-prose', 'prose', 'max-w-none']

  if (layout?.maxWidth) {
    wrapperClasses.push(maxWidthMap[layout.maxWidth] ?? maxWidthMap.standard)
  }

  if (container?.surface && container.surface !== 'none') {
    wrapperClasses.push(`rt-surface-${container.surface}`)
  }

  if (container?.borderStyle && container.borderStyle !== 'none') {
    wrapperClasses.push(`rt-border-${container.borderStyle}`)
  }

  if (container?.radius) {
    wrapperClasses.push(radiusMap[container.radius] ?? radiusMap.md)
  }

  if (container?.shadow && container.shadow !== 'none') {
    wrapperClasses.push(shadowMap[container.shadow] ?? '')
  }

  if (container?.innerPadding) {
    wrapperClasses.push(paddingMap[container.innerPadding] ?? paddingMap.standard)
  }

  if (typography?.textSize) {
    proseClasses.push(textSizeMap[typography.textSize] ?? textSizeMap.md)
  }

  if (typography?.lineHeight) {
    proseClasses.push(lineHeightMap[typography.lineHeight] ?? lineHeightMap.normal)
  }

  if (typography?.textAlign) {
    proseClasses.push(textAlignMap[typography.textAlign] ?? textAlignMap.left)
  }

  if (typography?.leadStyle === 'lead') {
    proseClasses.push('rt-lead')
  }

  if (typography?.dropCap === 'subtle') {
    proseClasses.push('rt-dropcap-subtle')
  }

  if (typography?.dropCap === 'strong') {
    proseClasses.push('rt-dropcap-strong')
  }

  if (layout?.columns === '2') {
    proseClasses.push('rt-columns-2')
  }

  const styleVars: CSSProperties = {}

  if (layout?.columnGap) {
    styleVars['--rt-column-gap' as any] = columnGapMap[layout.columnGap] ?? columnGapMap.md
  }

  if (!colors?.backgroundColor && container?.surface === 'soft') {
    styleVars['--rt-bg' as any] = '#f8fafc'
  }

  if (!colors?.backgroundColor && container?.surface === 'outline') {
    styleVars['--rt-bg' as any] = 'transparent'
  }

  if (colors?.textColor) styleVars['--rt-text' as any] = colors.textColor
  if (colors?.headingColor) styleVars['--rt-heading' as any] = colors.headingColor
  if (colors?.linkColor) styleVars['--rt-link' as any] = colors.linkColor
  if (colors?.accentColor) styleVars['--rt-accent' as any] = colors.accentColor
  if (colors?.backgroundColor) styleVars['--rt-bg' as any] = colors.backgroundColor
  if (colors?.borderColor) styleVars['--rt-border' as any] = colors.borderColor

  let calloutClass: string | undefined
  if (callouts?.highlightMode === 'leftBar') calloutClass = 'rt-highlight-bar'
  if (callouts?.highlightMode === 'noteBox') calloutClass = 'rt-highlight-box'

  const calloutText = callouts?.highlightText?.trim() || undefined

  return {
    wrapperClass: wrapperClasses.filter(Boolean).join(' '),
    proseClass: proseClasses.filter(Boolean).join(' '),
    styleVars,
    calloutClass,
    calloutText,
  }
}
