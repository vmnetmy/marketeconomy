import { notFound } from 'next/navigation'

import { BlockRenderer } from '../../components/blocks/BlockRenderer'
import { getFooter, getPageBySlug } from '../../lib/cms'

export default async function ContactPage() {
  const [page, footer] = await Promise.all([getPageBySlug('contact'), getFooter()])
  if (!page) return notFound()
  const safeLayout = page.layout?.filter((block) => block.blockType !== 'form') ?? []
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
