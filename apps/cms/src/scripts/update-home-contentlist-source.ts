import { getPayload } from 'payload'
import config from '@payload-config'

type LayoutBlock = {
  blockType?: string
  source?: string | null
  [key: string]: unknown
}

async function run(): Promise<void> {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })

  const page = result.docs?.[0]
  if (!page) {
    payload.logger.warn('Home page not found (slug=home).')
    return
  }

  const layout = Array.isArray(page.layout) ? (page.layout as LayoutBlock[]) : []
  let updated = false

  const nextLayout = layout.map((block) => {
    if (block?.blockType === 'contentList' && (block.source === 'posts' || !block.source)) {
      updated = true
      return { ...block, source: 'inTheNews' }
    }
    return block
  })

  if (!updated) {
    payload.logger.info('Home page content list already points to inTheNews. No changes needed.')
    return
  }

  await payload.update({
    collection: 'pages',
    id: page.id,
    data: { layout: nextLayout },
    overrideAccess: true,
  })

  payload.logger.info('Updated home content list source to inTheNews.')
}

run().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
