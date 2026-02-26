import type { FooterGlobal, NavItem, SiteSettingsGlobal } from '../../lib/cms'

type FooterProps = {
  footer?: FooterGlobal | null
  site?: SiteSettingsGlobal | null
}

const resolveHref = (item: NavItem): string | null => {
  if (item.linkType === 'external' && item.url) return item.url
  if (item.linkType === 'internal' && item.page) {
    if (typeof item.page === 'string') return item.page
    if (item.page.slug) return item.page.slug === 'home' ? '/' : `/${item.page.slug}`
  }
  return null
}

export function Footer({ footer, site }: FooterProps) {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid w-full max-w-5xl gap-10 px-6 py-12 md:grid-cols-3">
        <div className="space-y-3">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            {site?.siteName ?? 'Network for Market Economy'}
          </div>
          {site?.tagline ? <p className="text-sm text-slate-600">{site.tagline}</p> : null}
        </div>
        {(footer?.columns || []).map((column, index) => (
          <div key={`${column.title ?? 'column'}-${index}`} className="space-y-3">
            {column.title ? <h3 className="text-sm font-semibold text-slate-700">{column.title}</h3> : null}
            <ul className="space-y-2 text-sm text-slate-600">
              {(column.links || []).map((link, linkIndex) => {
                const href = resolveHref(link)
                if (!href || !link.label) return null
                return (
                  <li key={`${link.label}-${linkIndex}`}>
                    <a className="hover:text-slate-900" href={href}>
                      {link.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
        <div className="space-y-2 text-sm text-slate-600">
          {footer?.contact?.email ? <div>Email: {footer.contact.email}</div> : null}
          {footer?.contact?.phone ? <div>Phone: {footer.contact.phone}</div> : null}
          {footer?.contact?.address ? <div>{footer.contact.address}</div> : null}
        </div>
      </div>
      <div className="border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        {footer?.copyright ?? `© ${new Date().getFullYear()} ${site?.siteName ?? 'Network for Market Economy'}`}
      </div>
    </footer>
  )
}
