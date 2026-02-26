import type { NavItem, SiteSettingsGlobal } from '../../lib/cms'

type HeaderProps = {
  site?: SiteSettingsGlobal | null
  navItems?: NavItem[]
}

const resolveHref = (item: NavItem): string | null => {
  if (item.linkType === 'external' && item.url) return item.url
  if (item.linkType === 'internal' && item.page) {
    if (typeof item.page === 'string') return item.page
    if (item.page.slug) return item.page.slug === 'home' ? '/' : `/${item.page.slug}`
  }
  return null
}

export function Header({ site, navItems }: HeaderProps) {
  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          {site?.siteName ?? 'Network for Market Economy'}
        </div>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          {(navItems || []).map((item, index) => {
            const href = resolveHref(item)
            if (!href || !item.label) return null
            return (
              <a key={`${item.label}-${index}`} className="hover:text-slate-900" href={href}>
                {item.label}
              </a>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
