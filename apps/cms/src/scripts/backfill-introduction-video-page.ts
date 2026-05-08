import 'dotenv/config'

import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'

import config from '../payload.config'
import type { Page } from '../payload-types'

const title = 'Introduction To Network Market Economy'
const slug = 'introduction-to-network-market-economy'
const sourceFilename =
  'Introduction To Network Market Economy (NME) #newmarket #economypolicy #networkmarketeconomy.mp4'
const sourcePath = path.resolve(process.cwd(), '..', '..', 'smoke-results', sourceFilename)

type LayoutBlock = NonNullable<Page['layout']>[number]
type MediaBlock = Extract<LayoutBlock, { blockType: 'mediaBlock' }>
type HeroBlock = Extract<LayoutBlock, { blockType: 'hero' }>
type RichTextBlock = Extract<LayoutBlock, { blockType: 'richText' }>

const makeTextNode = (text: string) => ({
  type: 'text' as const,
  text,
  detail: 0,
  format: 0,
  mode: 'normal' as const,
  style: '',
  version: 1,
})

const makeParagraph = (text: string) => ({
  type: 'paragraph' as const,
  children: [makeTextNode(text)],
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  version: 1,
})

const makeRichText = (paragraphs: string[]) => ({
  root: {
    type: 'root' as const,
    children: paragraphs.map(makeParagraph),
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
  },
})

async function run(): Promise<void> {
  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Source video not found: ${sourcePath}`)
  }

  const payload = await getPayload({ config })

  const existingMedia = await payload.find({
    collection: 'media',
    where: {
      and: [{ alt: { equals: title } }, { mimeType: { equals: 'video/mp4' } }],
    },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })

  const media =
    existingMedia.docs[0] ??
    (await payload.create({
      collection: 'media',
      data: {
        alt: title,
        caption: 'Introduction to Network for Market Economy.',
      },
      filePath: sourcePath,
      overrideAccess: true,
    }))

  const hero: HeroBlock = {
    blockType: 'hero',
    headline: title,
    subheadline: 'A short introduction to the Network for Market Economy and its policy mission.',
    alignment: 'left',
    primaryCTA: {
      label: 'Contact us',
      url: '/contact',
    },
  }

  const intro: RichTextBlock = {
    blockType: 'richText',
    content: makeRichText([
      'This introductory video presents the Network for Market Economy and its work advancing open markets, competition, sound institutions, and practical policy dialogue.',
    ]),
  }

  const video: MediaBlock = {
    blockType: 'mediaBlock',
    media: media.id,
    caption: 'Introduction to Network for Market Economy.',
    alignment: 'full',
    enableAdvanced: true,
    advanced: {
      width: 'wide',
      padding: 'compact',
      frameStyle: 'outline',
      radius: 'md',
    },
  }

  const pageData = {
    title,
    slug,
    placeholderOverride: 'forceOff' as const,
    layout: [hero, intro, video],
    seo: {
      metaTitle: title,
      metaDescription:
        'Watch a short introduction to the Network for Market Economy and its policy mission.',
    },
    _status: 'published' as const,
  }

  const existingPage = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })

  const page = existingPage.docs[0]
    ? await payload.update({
        collection: 'pages',
        id: existingPage.docs[0].id,
        data: pageData,
        draft: false,
        overrideAccess: true,
      })
    : await payload.create({
        collection: 'pages',
        data: pageData,
        draft: false,
        overrideAccess: true,
      })

  payload.logger.info(`Media id=${media.id} url=${media.url}`)
  payload.logger.info(`Page id=${page.id} slug=${page.slug}`)
}

run()
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
