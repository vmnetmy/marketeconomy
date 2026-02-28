import type { ReactNode } from 'react'

type SectionWrapperProps = {
  children: ReactNode
  background?: 'none' | 'light' | 'dark'
  padding?: 'none' | 'compact' | 'standard' | 'large'
  width?: 'standard' | 'wide' | 'full'
  id?: string
  className?: string
  innerClassName?: string
}

const backgroundClasses: Record<NonNullable<SectionWrapperProps['background']>, string> = {
  none: 'bg-transparent',
  light: 'bg-slate-50',
  dark: 'bg-slate-900 text-white',
}

const paddingClasses: Record<NonNullable<SectionWrapperProps['padding']>, string> = {
  none: 'py-0',
  compact: 'py-12 md:py-16',
  standard: 'py-16 md:py-24',
  large: 'py-20 md:py-32',
}

const widthClasses: Record<NonNullable<SectionWrapperProps['width']>, string> = {
  standard: 'max-w-5xl',
  wide: 'max-w-6xl',
  full: 'max-w-none',
}

export function SectionWrapper({
  children,
  background = 'none',
  padding = 'standard',
  width = 'standard',
  id,
  className = '',
  innerClassName = '',
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`w-full ${backgroundClasses[background]} ${paddingClasses[padding]} ${className}`.trim()}
    >
      <div className={`mx-auto w-full ${widthClasses[width]} px-6 md:px-8 ${innerClassName}`.trim()}>
        {children}
      </div>
    </section>
  )
}
