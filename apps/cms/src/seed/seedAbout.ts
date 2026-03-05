import 'dotenv/config'

import { getPayload } from 'payload'
import type { Page } from '../payload-types'
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

type RichTextFormat = '' | 'left' | 'center' | 'right' | 'start' | 'end' | 'justify'

type ParagraphNode = {
  type: 'paragraph'
  children: TextNode[]
  direction: 'ltr'
  format: RichTextFormat
  indent: number
  version: number
}

type HeadingNode = {
  type: 'heading'
  tag: 'h2' | 'h3'
  children: TextNode[]
  direction: 'ltr'
  format: RichTextFormat
  indent: number
  version: number
}

type LexicalEditorState = {
  root: {
    type: 'root'
    children: Array<ParagraphNode | HeadingNode>
    direction: 'ltr'
    format: RichTextFormat
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
  format: '' as const,
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
  format: '' as const,
  indent: 0,
  version: 1,
})

const makeRichTextWithSections = (
  sections: Array<{ heading: string; paragraphs: string[]; subheadingTag?: 'h2' | 'h3' }>,
): LexicalEditorState => ({
  root: {
    type: 'root',
    children: sections.flatMap((section) => [
      makeHeadingNode(section.heading, section.subheadingTag ?? 'h2'),
      ...section.paragraphs.map((text) => makeParagraphNode(text)),
    ]),
    direction: 'ltr',
    format: '' as const,
    indent: 0,
    version: 1,
  },
})

type LayoutBlock = NonNullable<Page['layout']>[number]
type HeroBlock = Extract<LayoutBlock, { blockType: 'hero' }>
type SplitSectionBlock = Extract<LayoutBlock, { blockType: 'splitSection' }>
type FeatureGridBlock = Extract<LayoutBlock, { blockType: 'featureGrid' }>
type StatsBlock = Extract<LayoutBlock, { blockType: 'stats' }>
type MediaBlock = Extract<LayoutBlock, { blockType: 'mediaBlock' }>
type CTASectionBlock = Extract<LayoutBlock, { blockType: 'ctaSection' }>

const parseMediaId = (value?: string): number | undefined => {
  if (!value) return undefined
  const asNumber = Number(value)
  return Number.isNaN(asNumber) ? undefined : asNumber
}

const aboutHero: HeroBlock = {
  blockType: 'hero',
  headline: 'Network for Market Economy',
  subheadline: 'Advancing free market principles for resilient and competitive economies.',
  alignment: 'left',
  backgroundImageUrl:
    'https://images.unsplash.com/photo-1501147830916-ce44a6359892?auto=format&fit=crop&w=1600&q=80',
  primaryCTA: {
    label: 'Contact Us',
    url: '/contact',
  },
  secondaryCTA: {
    label: 'Attend Our Events',
    url: '/events',
  },
  enableAdvanced: true,
  advanced: {
    tone: 'dark',
    minHeight: 'large',
    overlayStrength: 'medium',
    padding: 'large',
  },
}

const aboutContextSummary = [
  'Rising protectionism and trade barriers increase costs, disrupt supply chains, and weaken the predictability smaller economies rely on.',
  'Malaysia and other trade-dependent nations have limited tools to respond in the short term, making long-term competitiveness and resilience essential.',
  'We advance free market principles, open competition, and rules-based trade as the most durable path to growth, innovation, and stability.',
]

const aboutContextMediaId = parseMediaId(process.env.ABOUT_CONTEXT_MEDIA_ID)
const aboutContextSplit: SplitSectionBlock = {
  blockType: 'splitSection',
  content: makeRichTextWithSections([
    {
      heading: 'Organisational Context',
      paragraphs: aboutContextSummary,
      subheadingTag: 'h2' as const,
    },
  ]),
  ...(aboutContextMediaId ? { media: aboutContextMediaId } : {}),
  mediaPosition: 'right',
  background: 'light',
  enableAdvanced: true,
  advanced: {
    padding: 'large',
    width: 'wide',
    imageSize: 'large',
  },
}

const aboutWhatWeDoGrid: FeatureGridBlock = {
  blockType: 'featureGrid',
  headline: 'What We Do',
  intro: 'Practical, research-driven work that keeps markets open and competitive.',
  columns: '2',
  features: [
    {
      title: 'Policy Briefings',
      description: 'Research-based policy options supporting open markets and long-term resilience.',
      icon: 'documentText',
    },
    {
      title: 'Industry Roundtables',
      description: 'Conversations with businesses and sector experts on barriers and reforms.',
      icon: 'users',
    },
    {
      title: 'Empowering SMEs',
      description: 'Tools for SMEs to advocate for pro-market policies.',
      icon: 'lightBulb',
    },
    {
      title: 'Partnerships',
      description: 'Collaboration with research institutes and associations in Malaysia and beyond.',
      icon: 'globeAlt',
    },
    {
      title: 'Grassroots Engagement',
      description: 'Supporting community leaders and local businesses with clear, practical materials.',
      icon: 'megaphone',
    },
  ],
  enableAdvanced: true,
  advanced: {
    padding: 'large',
    width: 'wide',
    cardStyle: 'raised',
  },
}

const aboutStats: StatsBlock = {
  blockType: 'stats',
  headline: 'Impact at a glance',
  layout: 'grid',
  stats: [
    { value: '20+', label: 'Policy Dialogues Hosted' },
    { value: '15+', label: 'Policy Briefs Published' },
    { value: '50+', label: 'Industry Leaders Engaged' },
    { value: '10', label: 'Countries Collaborated' },
  ],
  enableAdvanced: true,
  advanced: {
    padding: 'large',
    width: 'wide',
    background: 'none',
    columns: '4',
    numberSize: 'lg',
    cardStyle: 'flat',
  },
}

const aboutMediaId = parseMediaId(process.env.ABOUT_MEDIA_ID)
const aboutMediaBlock: MediaBlock | null = aboutMediaId
  ? {
      blockType: 'mediaBlock',
      media: aboutMediaId,
      caption: 'Bringing policymakers, businesses, and researchers together.',
      alignment: 'full',
      enableAdvanced: true,
      advanced: {
        padding: 'large',
        width: 'full',
        frameStyle: 'card',
        radius: 'lg',
        shadow: 'soft',
      },
    }
  : null

const aboutCTA: CTASectionBlock = {
  blockType: 'ctaSection',
  title: 'Interested in collaborating with us?',
  description: 'Join our events, briefings, or partner on research and advocacy.',
  buttonLabel: 'Contact Us',
  buttonURL: '/contact',
  theme: 'light',
  enableAdvanced: true,
  advanced: {
    padding: 'large',
    width: 'standard',
    align: 'center',
  },
}

const run = async () => {
  const payload = await getPayload({ config })

  const aboutLayout: Page['layout'] = [
    aboutHero,
    aboutContextSplit,
    aboutWhatWeDoGrid,
    aboutStats,
    ...(aboutMediaBlock ? [aboutMediaBlock] : []),
    aboutCTA,
  ]

  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'about' } },
    limit: 1,
  })

  const data = {
    title: 'About',
    slug: 'about',
    layout: aboutLayout,
    _status: 'published' as const,
  }

  if (existing.docs[0]) {
    await payload.update({
      collection: 'pages',
      id: existing.docs[0].id,
      data,
      draft: false,
    })
  } else {
    await payload.create({
      collection: 'pages',
      data,
      draft: false,
    })
  }

  console.log('Seeded About page.')
}

run()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
