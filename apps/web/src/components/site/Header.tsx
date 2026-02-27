'use client'

import type { NavItem, SiteSettingsGlobal } from '../../lib/cms'
import { resolveMediaUrl } from '../../lib/cms'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

type HeaderProps = {
  site?: SiteSettingsGlobal | null
  navItems?: NavItem[]
  variant?: 'transparent' | 'solid'
}

const resolveHref = (item: NavItem): string | null => {
  if (item.linkType === 'external' && item.url) return item.url
  if (item.linkType === 'internal' && item.page) {
    if (typeof item.page === 'string') return item.page
    if (item.page.slug) return item.page.slug === 'home' ? '/' : `/${item.page.slug}`
  }
  return null
}

const isExternalHref = (href: string) => href.startsWith('http://') || href.startsWith('https://')

export function Header({ site, navItems, variant = 'solid' }: HeaderProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const isHome = pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const headerClass = useMemo(() => {
    if (variant === 'transparent' && isHome && !scrolled) {
      return 'border-transparent bg-transparent'
    }
    return 'border-slate-200/70 bg-white/85 shadow-sm backdrop-blur-md'
  }, [isHome, scrolled, variant])

  const displayName = site?.siteName ?? 'Network for Market Economy'
  const logoUrl = resolveMediaUrl(site?.logo)
  const isFloating = variant === 'transparent' && isHome && !scrolled
  const navTextClass = isFloating ? 'text-white/80 hover:text-white' : 'text-slate-500 hover:text-slate-900'
  const activeTextClass = isFloating ? 'text-white' : 'text-blue-600'
  const brandTextClass = isFloating ? 'text-white/90' : 'text-slate-700'
  const markClass = isFloating ? 'bg-white text-slate-950' : 'bg-slate-950 text-white'
  const ctaClass = isFloating
    ? 'bg-white text-slate-900 hover:bg-slate-100'
    : 'bg-slate-950 text-white hover:bg-blue-600'
  const logoClass = isFloating ? 'invert brightness-0' : ''

  return (
    <header className={`header-transition fixed top-0 z-50 w-full border-b ${headerClass}`}>
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 md:py-5">
        <Link href="/" className="group flex items-center gap-3">
          {logoUrl ? (
            <img
              alt={displayName}
              className={`h-9 w-auto transition-all ${logoClass}`}
              height={36}
              src={logoUrl}
              width={144}
            />
          ) : (
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-xl text-lg font-semibold transition-transform group-hover:scale-110 ${markClass}`}
            >
              N
            </span>
          )}
          <span className={`text-xs font-semibold uppercase tracking-[0.28em] md:text-sm ${brandTextClass}`}>
            {displayName}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-[12px] font-semibold uppercase tracking-[0.2em] md:flex">
          {(navItems || []).map((item, index) => {
            const href = resolveHref(item)
            if (!href || !item.label) return null
            const external = isExternalHref(href)
            const isActive = !external && (pathname === href || (href !== '/' && pathname?.startsWith(`${href}/`)))
            const linkClass = isActive ? activeTextClass : navTextClass

            if (external) {
              return (
                <a
                  key={`${item.label}-${index}`}
                  className={linkClass}
                  href={href}
                  rel="noreferrer"
                  target="_blank"
                >
                  {item.label}
                </a>
              )
            }

            return (
              <Link key={`${item.label}-${index}`} className={linkClass} href={href}>
                {item.label}
              </Link>
            )
          })}
          <Link
            href="/contact"
            className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-all hover:shadow-lg active:scale-95 ${ctaClass}`}
          >
            Get Involved
          </Link>
        </nav>

        <button
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
          className="rounded-full border border-slate-200 bg-white/80 p-2 text-slate-700 shadow-sm transition hover:text-slate-900 md:hidden"
          onClick={() => setIsOpen((open) => !open)}
          type="button"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="absolute inset-x-0 top-full border-b border-slate-200 bg-white/95 shadow-xl backdrop-blur-md md:hidden">
          <nav className="mx-auto flex w-full max-w-6xl flex-col px-6 py-6">
            {(navItems || []).map((item, index) => {
              const href = resolveHref(item)
              if (!href || !item.label) return null
              const external = isExternalHref(href)
              const linkClass =
                'menu-item-stagger min-h-[44px] border-b border-slate-100 py-4 text-base font-medium text-slate-900 transition hover:text-blue-600'

              if (external) {
                return (
                  <a
                    key={`${item.label}-${index}`}
                    className={linkClass}
                    href={href}
                    rel="noreferrer"
                    target="_blank"
                    style={{ transitionDelay: `${index * 60}ms` }}
                  >
                    {item.label}
                  </a>
                )
              }

              return (
                <Link
                  key={`${item.label}-${index}`}
                  className={linkClass}
                  href={href}
                  style={{ transitionDelay: `${index * 60}ms` }}
                >
                  {item.label}
                </Link>
              )
            })}
            <Link
              className="menu-item-stagger mt-6 inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-blue-600"
              href="/contact"
              style={{ transitionDelay: `${(navItems?.length ?? 0) * 60}ms` }}
            >
              Get Involved
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
