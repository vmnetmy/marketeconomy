import 'dotenv/config'

import { getPayload } from 'payload'

import config from '../payload.config'

type TextNode = {
  type: 'text'
  text: string
  detail: number
  format: number
  mode: 'normal'
  style: string
  version: number
}

type ParagraphNode = {
  type: 'paragraph'
  children: TextNode[]
  direction: 'ltr'
  format: string
  indent: number
  version: number
}

type HeadingNode = {
  type: 'heading'
  tag: 'h2' | 'h3'
  children: TextNode[]
  direction: 'ltr'
  format: string
  indent: number
  version: number
}

type LexicalEditorState = {
  root: {
    type: 'root'
    children: Array<ParagraphNode | HeadingNode>
    direction: 'ltr'
    format: string
    indent: number
    version: number
  }
}

const makeParagraphNode = (text: string): ParagraphNode => ({
  type: 'paragraph',
  children: [
    {
      type: 'text',
      text,
      detail: 0,
      format: 0,
      mode: 'normal',
      style: '',
      version: 1,
    },
  ],
  direction: 'ltr',
  format: '',
  indent: 0,
  version: 1,
})

const makeHeadingNode = (text: string, tag: HeadingNode['tag'] = 'h2'): HeadingNode => ({
  type: 'heading',
  tag,
  children: [
    {
      type: 'text',
      text,
      detail: 0,
      format: 0,
      mode: 'normal',
      style: '',
      version: 1,
    },
  ],
  direction: 'ltr',
  format: '',
  indent: 0,
  version: 1,
})

const makeRichText = (paragraphs: string[]): LexicalEditorState => ({
  root: {
    type: 'root',
    children: paragraphs.map((text) => makeParagraphNode(text)),
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  },
})

const makeRichTextWithHeading = (heading: string, paragraphs: string[]): LexicalEditorState => ({
  root: {
    type: 'root',
    children: [makeHeadingNode(heading), ...paragraphs.map((text) => makeParagraphNode(text))],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  },
})

const POST_SLUG = 'what-is-a-market-economy-and-why-it-affects-your-daily-life-more-than-you-think'

type PlaceholderMediaInput = {
  filename: string
  alt: string
  caption?: string
  url: string
}

const ensurePlaceholderMedia = async (
  payload: Awaited<ReturnType<typeof getPayload>>,
  { filename, alt, caption, url }: PlaceholderMediaInput,
): Promise<string | number> => {
  const existing = await payload.find({
    collection: 'media',
    where: {
      filename: { equals: filename },
    },
    limit: 1,
  })

  if (existing.docs[0]) {
    return existing.docs[0].id
  }

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to download placeholder image (${response.status})`)
  }

  const arrayBuffer = await response.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const mimetype = response.headers.get('content-type') ?? 'image/png'

  const created = await payload.create({
    collection: 'media',
    data: {
      alt,
      caption,
    },
    file: {
      data: buffer,
      name: filename,
      mimetype,
      size: buffer.length,
    },
  })

  return created.id
}

const run = async () => {
  const payload = await getPayload({ config })

  const placeholderCityUrl = 'https://placehold.co/1600x900/png?text=City+Skyline+Placeholder'
  const placeholderMarketUrl = 'https://placehold.co/1600x900/png?text=Market+Scene+Placeholder'

  const placeholderCityMedia = await ensurePlaceholderMedia(payload, {
    filename: 'placeholder-city-skyline.png',
    alt: 'Placeholder city skyline',
    caption: 'Placeholder image — replace with a city skyline.',
    url: placeholderCityUrl,
  })

  const placeholderMarketMedia = await ensurePlaceholderMedia(payload, {
    filename: 'placeholder-market-scene.png',
    alt: 'Placeholder market scene',
    caption: 'Placeholder image — replace with a market scene.',
    url: placeholderMarketUrl,
  })

  const openingParagraph = [
    'You may never have studied economics.',
    'But every time you buy groceries, order Grab, invest in property, run a business, or complain about rising prices — you are participating in a market economy.',
  ]

  const conceptParagraphs = [
    'A market economy is simple: people decide what to buy, businesses decide what to sell, and prices move based on demand.',
    'There is no central authority deciding how many bubble tea shops Malaysia should have.',
    'If people want bubble tea, more shops open. If people stop buying, shops close. The market decides.',
    'Not speeches. Not slogans. Not theory. Just choices.',
  ]

  const malaysiaParagraphs = [
    'Look around Malaysia. The market is visible in everyday life.',
    'Bubble tea brands rise and fade. Property launches cluster where demand is strongest. Grab fares surge during peak hours.',
    'When demand increases, supply follows. When demand falls, businesses adjust or disappear.',
    'That is market movement happening in real time — no ministry meeting required.',
  ]

  const aseanIntro =
    'Across ASEAN, the same dynamics play out differently depending on each country’s demographics, trade exposure, and policy choices.'

  const whyItMattersIntro =
    'Market signals influence daily life in ways we feel immediately — from wages and prices to business growth and policy priorities.'

  const existing = await payload.find({
    collection: 'posts',
    where: { slug: { equals: POST_SLUG } },
    limit: 1,
  })

  if (!existing.docs[0]) {
    throw new Error(`Post not found for slug: ${POST_SLUG}`)
  }

  const updatedLayout: any[] = [
    {
      blockType: 'hero',
      eyebrow: 'Explainer',
      headline: 'What Is a Market Economy? And Why It Affects Your Daily Life More Than You Think',
      subheadline: 'Understanding how everyday choices shape businesses, prices, and global trade.',
      backgroundImageUrl: 'https://placehold.co/1920x1080/png?text=Hero+Background+Placeholder',
      latestLink: {
        label: 'Latest policy brief: Navigating AFTA 2025 — read here',
        url: '/policy-briefs',
      },
      impactTitle: 'Impact at a glance',
      impactItems: [
        { value: '3', label: 'Key choices drive markets', icon: 'bolt' },
        { value: '1', label: 'Prices respond to demand', icon: 'arrowTrendingUp' },
        { value: 'Everyday', label: 'Markets show up in daily life', icon: 'users' },
      ],
      alignment: 'center',
      enableAdvanced: true,
      advanced: {
        tone: 'dark',
        minHeight: 'large',
        overlayStrength: 'strong',
        padding: 'large',
      },
    },
    {
      blockType: 'richText',
      content: makeRichText(openingParagraph),
      enableAdvanced: true,
      advanced: {
        typography: {
          textSize: 'lg',
          lineHeight: 'relaxed',
          textAlign: 'center',
          leadStyle: 'lead',
        },
        layout: {
          maxWidth: 'narrow',
        },
        padding: 'compact',
      },
    },
    {
      blockType: 'splitSection',
      content: makeRichTextWithHeading('What Is a Market Economy?', conceptParagraphs),
      media: placeholderCityMedia,
      mediaPosition: 'right',
      background: 'none',
      enableAdvanced: true,
      advanced: {
        width: 'wide',
      },
    },
    {
      blockType: 'mediaBlock',
      media: placeholderMarketMedia,
      caption: 'Every transaction is part of the market economy.',
      alignment: 'full',
      enableAdvanced: true,
      advanced: {
        width: 'full',
        padding: 'compact',
      },
    },
    {
      blockType: 'richText',
      content: makeRichTextWithHeading('Malaysia: The Market in Action', malaysiaParagraphs),
      enableAdvanced: true,
      advanced: {
        typography: {
          lineHeight: 'relaxed',
        },
        layout: {
          columns: '2',
          columnGap: 'lg',
          maxWidth: 'wide',
        },
      },
    },
    {
      blockType: 'testimonials',
      headline: 'A simple summary',
      items: [
        {
          quote: 'People choose. Businesses compete. Prices move.',
          name: 'Market Economy',
        },
      ],
      enableAdvanced: true,
      advanced: {
        padding: 'compact',
      },
    },
    {
      blockType: 'cards',
      sectionTitle: 'Markets Across ASEAN',
      sectionIntro: aseanIntro,
      cards: [
        {
          title: 'Malaysia',
          description: 'Consumer demand shapes retail, property, and services in real time.',
          icon: 'buildingOffice',
        },
        {
          title: 'Vietnam',
          description: 'Manufacturing growth responds quickly to global demand shifts.',
          icon: 'arrowTrendingUp',
        },
        {
          title: 'Singapore',
          description: 'Trade and services adjust rapidly to regional market signals.',
          icon: 'globeAlt',
        },
      ],
      enableAdvanced: true,
      advanced: {
        columns: '3',
        cardStyle: 'raised',
      },
    },
    {
      blockType: 'featureGrid',
      headline: 'Why It Matters',
      intro: whyItMattersIntro,
      columns: '3',
      features: [
        {
          title: 'Salary & Jobs',
          description: 'Wages and employment track demand in growing sectors.',
          icon: 'briefcase',
        },
        {
          title: 'Small Business',
          description: 'Entrepreneurs expand or pivot based on customer demand.',
          icon: 'buildingStorefront',
        },
        {
          title: 'Investment',
          description: 'Capital flows to industries with clear market signals.',
          icon: 'banknotes',
        },
        {
          title: 'Cost of Living',
          description: 'Prices rise or fall depending on supply and demand.',
          icon: 'scale',
        },
        {
          title: 'Policy Choices',
          description: 'Governments respond to market outcomes and public pressure.',
          icon: 'buildingLibrary',
        },
      ],
      enableAdvanced: true,
      advanced: {
        cardStyle: 'raised',
      },
    },
  ]

  await payload.update({
    collection: 'posts',
    id: existing.docs[0].id,
    data: {
      title: 'What Is a Market Economy? And Why It Affects Your Daily Life More Than You Think',
      excerpt: 'Understanding how everyday choices shape businesses, prices, and global trade.',
      content: null,
      layout: updatedLayout,
      _status: 'published',
    },
  })

  console.log(`Seeded post layout for slug: ${POST_SLUG}`)
}

run()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
