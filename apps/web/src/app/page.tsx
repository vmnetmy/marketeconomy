import { notFound } from 'next/navigation'

import { BlockRenderer } from '../components/blocks/BlockRenderer'
import { getPageBySlug } from '../lib/cms'

export default async function Home() {
  const page = await getPageBySlug('home')
  if (!page) return notFound()

  return (
    <div className="flex w-full flex-col">
      <BlockRenderer blocks={page.layout} />
    </div>
  )
}
