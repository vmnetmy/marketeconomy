import { BlockRenderer } from '../../components/blocks/BlockRenderer'
import { PagePlaceholder } from '../../components/ui/ContentPlaceholder'
import { getFooter, getPageBySlug, getSiteSettings } from '../../lib/cms'
import {
  resolvePlaceholderLabel,
  resolvePlaceholderMode,
  resolvePlaceholderOverride,
  shouldShowPlaceholder,
} from '../../lib/placeholders'
import { notFound } from 'next/navigation'

export default async function ContactPage() {
  const [page, footer, site] = await Promise.all([getPageBySlug('contact'), getFooter(), getSiteSettings()])

  const mode = resolvePlaceholderMode(site)
  const label = resolvePlaceholderLabel(site)
  const override = resolvePlaceholderOverride(page)
  const contentExists = Boolean(page?.layout?.length)
  const showPlaceholder = shouldShowPlaceholder({ mode, override, contentExists })

  if (!page && !showPlaceholder) return notFound()
  if (showPlaceholder) {
    return (
      <PagePlaceholder
        title="Contact"
        label={label}
        description="Contact details and enquiry options will appear here once published."
      />
    )
  }

  const safeLayout = page?.layout?.filter((block) => block.blockType !== 'form') ?? []
  const contact = footer?.contact

  return (
    <div className="flex w-full flex-col">
      <BlockRenderer blocks={safeLayout} />
      {contact ? (
        <section className="mx-auto w-full max-w-5xl px-6 pb-16 pt-10 text-slate-700">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Contact Details</h2>
            <div className="mt-4 space-y-2 text-sm">
              {contact.email ? <p>Email: {contact.email}</p> : null}
              {contact.phone ? <p>Phone: {contact.phone}</p> : null}
              {contact.address ? <p className="leading-relaxed">Address: {contact.address}</p> : null}
            </div>
            {contact.email ? (
              <a className="mt-4 inline-flex text-sm font-semibold text-blue-600" href={`mailto:${contact.email}`}>
                Email us →
              </a>
            ) : null}
          </div>
        </section>
      ) : null}
    </div>
  )
}
