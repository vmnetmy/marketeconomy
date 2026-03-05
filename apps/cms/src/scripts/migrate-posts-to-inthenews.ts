// @ts-nocheck
// Migration script kept for historical reference. The Posts collection has been removed from the config.
import 'dotenv/config'

import { getPayload } from 'payload'

import config from '../payload.config'

type PostDoc = {
  id: string
  title: string
  slug: string
  excerpt?: string | null
  content?: unknown
  publishedAt?: string | null
  createdAt?: string | null
  tags?: Array<{ tag?: string | null }> | null
  coverImage?: string | { id?: string } | null
}

const run = async () => {
  const payload = await getPayload({ config })
  const posts = await payload.find({
    collection: 'posts',
    limit: 0,
    depth: 1,
  })

  let created = 0
  let skipped = 0
  let failed = 0

  for (const post of posts.docs as PostDoc[]) {
    const slug = post.slug
    if (!slug) {
      failed += 1
      continue
    }

    const existing = await payload.find({
      collection: 'inTheNews',
      where: {
        slug: { equals: slug },
      },
      limit: 1,
      depth: 0,
    })

    if (existing?.docs?.length) {
      skipped += 1
      continue
    }

    const publishedDate = post.publishedAt || post.createdAt || new Date().toISOString()
    const tags = (post.tags || []).map((tagItem) => ({ tag: tagItem?.tag || '' })).filter((t) => t.tag)

    try {
      await payload.create({
        collection: 'inTheNews',
        data: {
          title: post.title,
          slug,
          excerpt: post.excerpt || undefined,
          content: post.content ?? undefined,
          publishedDate,
          tags,
          coverImage: typeof post.coverImage === 'object' ? post.coverImage?.id : post.coverImage,
          _status: 'published',
        },
      })
      created += 1
    } catch (error) {
      failed += 1
      payload.logger.error(`Failed to migrate post ${slug}: ${String(error)}`)
    }
  }

  payload.logger.info(`Migration complete. Created: ${created}, skipped: ${skipped}, failed: ${failed}`)
  process.exit(0)
}

run().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error)
  process.exit(1)
})
