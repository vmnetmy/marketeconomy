import { notFound } from 'next/navigation'

import { BlockRenderer } from '../../components/blocks/BlockRenderer'
import { getPageBySlug } from '../../lib/cms'

export default async function AboutPage() {
  const page = await getPageBySlug('about')
  if (!page) return notFound()

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-12">
        <BlockRenderer blocks={page.layout} />
      </div>
    </main>
  )
}
