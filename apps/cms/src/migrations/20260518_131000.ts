import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'
import path from 'path'
import { fileURLToPath } from 'url'

import type { Page } from '../payload-types'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const introVideoFilename =
  'Introduction To Network Market Economy (NME) #newmarket #economypolicy #networkmarketeconomy.mp4'
const energyVideoFilename = 'WhatsApp Video 2026-05-17 at 11.53.20.mp4'
const introPosterFilename = 'video-gallery-introduction-poster.jpg'
const energyPosterFilename = 'video-gallery-energy-trade-poster.jpg'

async function findMediaByFilename(payload: MigrateUpArgs['payload'], filename: string) {
  const result = await payload.find({
    collection: 'media',
    where: { filename: { equals: filename } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })

  return result.docs[0] ?? null
}

async function ensurePosterMedia(
  payload: MigrateUpArgs['payload'],
  filename: string,
  alt: string,
  caption: string,
) {
  const existing = await findMediaByFilename(payload, filename)
  if (existing) return existing

  return payload.create({
    collection: 'media',
    data: { alt, caption },
    filePath: path.resolve(dirname, 'assets', filename),
    overrideAccess: true,
  })
}

function getRelationId(value: unknown): string | number | null {
  if (typeof value === 'string' || typeof value === 'number') return value
  if (value && typeof value === 'object' && 'id' in value) {
    const id = (value as { id?: unknown }).id
    if (typeof id === 'string' || typeof id === 'number') return id
  }

  return null
}

function sameId(left: unknown, right: unknown): boolean {
  const leftId = getRelationId(left)
  const rightId = getRelationId(right)
  return leftId !== null && rightId !== null && String(leftId) === String(rightId)
}

async function convertIntroPageToVideoGallery(payload: MigrateUpArgs['payload']) {
  const [introVideo, energyVideo, introPoster, energyPoster] = await Promise.all([
    findMediaByFilename(payload, introVideoFilename),
    findMediaByFilename(payload, energyVideoFilename),
    ensurePosterMedia(
      payload,
      introPosterFilename,
      'Introduction to Network for Market Economy poster',
      'Poster thumbnail for Introduction to Network for Market Economy.',
    ),
    ensurePosterMedia(
      payload,
      energyPosterFilename,
      'Keeping Energy Trade Open poster',
      'Poster thumbnail for Keeping Energy Trade Open.',
    ),
  ])

  if (!introVideo || !energyVideo) {
    payload.logger.warn('Skipping video gallery content migration because one or more source videos are missing.')
    return
  }

  const page = await payload.findByID({
    collection: 'pages',
    id: 8,
    depth: 0,
    overrideAccess: true,
  })

  if (!page) {
    payload.logger.warn('Skipping video gallery content migration because page id=8 was not found.')
    return
  }

  const galleryBlock: NonNullable<Page['layout']>[number] = {
    blockType: 'videoGallery',
    sectionTitle: 'Videos',
    sectionIntro:
      'Watch the Network for Market Economy introduction and its latest policy video on keeping energy trade open.',
    videos: [
      {
        title: 'Introduction to Network for Market Economy',
        description:
          'A short introduction to the Network for Market Economy and its work advancing open markets, competition, sound institutions, and practical policy dialogue.',
        video: introVideo.id,
        poster: introPoster.id,
        duration: '2:51',
      },
      {
        title: 'Keeping Energy Trade Open',
        description:
          'A policy video on open energy trade, market confidence, and the importance of reliable access to global supply chains.',
        video: energyVideo.id,
        poster: energyPoster.id,
        duration: '1:22',
      },
    ],
    showPlaceholder: false,
    enableAdvanced: true,
    advanced: {
      background: 'none',
      padding: 'compact',
      width: 'wide',
      cardStyle: 'raised',
      hideOnMobile: false,
      hideOnDesktop: false,
    },
  }

  const layout = Array.isArray(page.layout) ? page.layout : []
  const nextLayout: NonNullable<Page['layout']> = []
  let galleryInserted = false

  for (const block of layout) {
    if (block?.blockType === 'videoGallery') {
      if (!galleryInserted) {
        nextLayout.push(galleryBlock)
        galleryInserted = true
      }
      continue
    }

    if (
      block?.blockType === 'mediaBlock' &&
      (sameId(block.media, introVideo.id) || sameId(block.media, energyVideo.id))
    ) {
      if (!galleryInserted) {
        nextLayout.push(galleryBlock)
        galleryInserted = true
      }
      continue
    }

    nextLayout.push(block)
  }

  if (!galleryInserted) {
    nextLayout.push(galleryBlock)
  }

  await payload.update({
    collection: 'pages',
    id: page.id,
    data: {
      layout: nextLayout,
      _status: 'published',
    },
    draft: false,
    overrideAccess: true,
  })

  payload.logger.info('Converted page id=8 video media blocks into a video gallery.')
}

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await convertIntroPageToVideoGallery(payload)
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  payload.logger.info('Skipping automatic rollback for page id=8 video gallery content.')
}
