import { getPayload } from 'payload'
import config from '@payload-config'

const LEGACY_PAGE_SLUGS = ['activities', 'updates', 'policy-briefs', 'data-insights']

async function run(): Promise<void> {
  const payload = await getPayload({ config })

  for (const slug of LEGACY_PAGE_SLUGS) {
    const result = await payload.find({
      collection: 'pages',
      where: { slug: { equals: slug } },
      limit: 10,
      depth: 0,
      overrideAccess: true,
    })

    if (!result.docs?.length) {
      payload.logger.info(`No page found for slug=${slug}.`)
      continue
    }

    for (const page of result.docs) {
      await payload.delete({
        collection: 'pages',
        id: page.id,
        overrideAccess: true,
      })
      payload.logger.info(`Deleted page slug=${slug} id=${page.id}`)
    }
  }

  payload.logger.info('Legacy page cleanup complete.')
}

run().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
