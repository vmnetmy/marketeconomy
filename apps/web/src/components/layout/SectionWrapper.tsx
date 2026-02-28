import type { ReactNode } from 'react'

type SectionWrapperProps = {
  children: ReactNode
  background?: 'none' | 'light' | 'dark'
  padding?: 'none' | 'standard' | 'large'
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
  standard: 'py-16 md:py-24',
  large: 'py-20 md:py-32',
}

export function SectionWrapper({
  children,
  background = 'none',
  padding = 'standard',
  className = '',
  innerClassName = '',
}: SectionWrapperProps) {
  return (
    <section className={`w-full ${backgroundClasses[background]} ${paddingClasses[padding]} ${className}`.trim()}>
      <div className={`mx-auto w-full max-w-5xl px-6 md:px-8 ${innerClassName}`.trim()}>{children}</div>
    </section>
  )
}
