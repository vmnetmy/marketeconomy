import 'dotenv/config'

import { getPayload } from 'payload'
import config from '../payload.config'

const run = async () => {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'about' } },
    limit: 1,
  })

  const page = result.docs[0]

  if (!page) {
    console.log('About page not found.')
    return
  }

  const layout = Array.isArray(page.layout) ? page.layout : []
  const blockTypes = layout.map((block) => block.blockType)

  console.log('About page found.')
  console.log(`id: ${page.id}`)
  console.log(`title: ${page.title}`)
  console.log(`slug: ${page.slug}`)
  console.log(`layoutCount: ${layout.length}`)
  console.log(`layoutBlockTypes: ${blockTypes.join(', ') || 'none'}`)
}

run()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Verification failed:', error)
    process.exit(1)
  })
