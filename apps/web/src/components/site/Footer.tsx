import type { FooterGlobal, NavItem, SiteSettingsGlobal } from '../../lib/cms'

type FooterProps = {
  footer?: FooterGlobal | null
  site?: SiteSettingsGlobal | null
}

const resolveHref = (item: NavItem): string | null => {
  if (item.linkType === 'external' && item.url) return item.url
  if (item.linkType === 'internal') {
    if (item.url) return item.url
    if (item.page) {
      if (typeof item.page === 'string') return item.page
      if (item.page.slug) return item.page.slug === 'home' ? '/' : `/${item.page.slug}`
    }
  }
  return null
}

export function Footer({ footer, site }: FooterProps) {
  const ctaTitle = footer?.cta?.title ?? 'Stay Updated'
  const ctaDescription =
    footer?.cta?.description ??
    'Get the latest research, policy briefs, and event highlights delivered to your inbox.'
  const ctaButtonLabel = footer?.cta?.buttonLabel ?? 'Subscribe'
  const ctaButtonUrl = footer?.cta?.buttonUrl ?? '/in-the-news'
  const ctaFinePrint = footer?.cta?.finePrint ?? 'We respect your inbox and never spam.'
  const legalLinks = footer?.legalLinks ?? []

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="border-b border-slate-200/70 bg-gradient-to-b from-white to-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-12">
          <div className="grid gap-6 rounded-3xl bg-slate-900 px-8 py-10 text-white shadow-2xl shadow-slate-900/10 md:grid-cols-[2fr_1fr] md:items-center">
            <div className="space-y-3">
              <div className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
                {ctaTitle}
              </div>
              <p className="text-2xl font-semibold leading-tight">{ctaDescription}</p>
            </div>
            <div className="flex flex-col items-start gap-3 md:items-end">
              <a
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:shadow-lg"
                href={ctaButtonUrl}
              >
                {ctaButtonLabel}
              </a>
              <span className="text-xs text-white/60">{ctaFinePrint}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-12 md:grid-cols-[2fr_3fr_2fr]">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-sm font-semibold uppercase tracking-widest text-white">
              {site?.siteName?.[0] ?? 'N'}
            </div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              {site?.siteName ?? 'Network for Market Economy'}
            </div>
          </div>
          {site?.tagline ? <p className="text-sm leading-relaxed text-slate-600">{site.tagline}</p> : null}
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {(footer?.columns || []).map((column, index) => (
            <div key={`${column.title ?? 'column'}-${index}`} className="space-y-3">
              {column.title ? (
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{column.title}</h3>
              ) : null}
              <ul className="space-y-2 text-sm text-slate-600">
                {(column.links || []).map((link, linkIndex) => {
                  const href = resolveHref(link)
                  if (!href || !link.label) return null
                  return (
                    <li key={`${link.label}-${linkIndex}`}>
                      <a className="transition hover:text-slate-900" href={href}>
                        {link.label}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="space-y-4 text-sm text-slate-600">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Contact</div>
          <div className="space-y-2">
            {footer?.contact?.email ? <div>Email: {footer.contact.email}</div> : null}
            {footer?.contact?.phone ? <div>Phone: {footer.contact.phone}</div> : null}
            {footer?.contact?.address ? <div className="leading-relaxed">{footer.contact.address}</div> : null}
          </div>
          {footer?.contact?.email ? (
            <a
              className="inline-flex items-center text-sm font-semibold text-slate-900"
              href={`mailto:${footer.contact.email}`}
            >
              Get in touch →
            </a>
          ) : null}
        </div>
      </div>

      <div className="border-t border-slate-200/70">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <span>
            {footer?.copyright ?? `© ${new Date().getFullYear()} ${site?.siteName ?? 'Network for Market Economy'}`}
          </span>
          {legalLinks.length ? (
            <div className="flex flex-wrap gap-4">
              {legalLinks.map((link, index) => {
                const href = resolveHref(link)
                if (!href || !link.label) return null
                return (
                  <a key={`${link.label}-${index}`} className="hover:text-slate-900" href={href}>
                    {link.label}
                  </a>
                )
              })}
            </div>
          ) : null}
        </div>
      </div>
    </footer>
  )
}
