import { notFound } from 'next/navigation'

import { BlockRenderer } from '../../components/blocks/BlockRenderer'
import { getPageBySlug } from '../../lib/cms'

type PageProps = {
  params: { slug: string }
}

export const dynamic = 'force-dynamic'

export default async function Page({ params }: PageProps) {
  const { slug } = params
  const page = await getPageBySlug(slug)
  if (!page) return notFound()

  return (
    <div className="flex w-full flex-col">
      <BlockRenderer blocks={page.layout} />
    </div>
  )
}
