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

const aboutOrganisationalContext = [
  'In an era of renewed protectionism, tariffs and other trade barriers may be sold as a way to defend domestic industries. But they often end up raising costs, distorting markets, and triggering retaliation that harms businesses and consumers alike. Trade restrictions disrupt supply chains, dampen investment confidence, and make everyday goods more expensive.',
  'Large economies can sometimes cushion the blow or use their market size as leverage.',
  'Smaller states like Malaysia however, have far fewer tools. Highly dependent on open trade and external demand, they may in the short term have little choice but to absorb the impact of more protectionist policies imposed by their major trading partners.',
  'Unlike bigger powers, Malaysia cannot easily retaliate without hurting themselves. Their more realistic path lies in the long term: strengthening domestic competitiveness, deepening economic resilience, and consistently advocating for open markets and rules-based trade that ultimately serve their interests best.',
  'With this in mind, we are establishing the Network for Market Economy, dedicated to advancing free market principles as a long-term response to this increasingly protectionist era.',
  'While governments and political leaders may understandably concentrate on mitigating immediate economic pressures and shielding vulnerable sectors in the short term, we believe it is equally important not to lose sight of the bigger picture.',
  'Over time, sustained advocacy for open markets, competition, and rules-based trade will be essential to preserving growth, innovation, and economic resilience — especially for smaller economies that depend on a stable and predictable global trading system.',
]

const aboutWhatWeDo = [
  {
    heading: 'Policy Briefings for Lawmakers and Government Officials',
    paragraphs: [
      'Providing research-based, practical policy options that support open markets, competition, and long-term economic resilience.',
    ],
  },
  {
    heading: 'Industry Roundtables',
    paragraphs: [
      'Convening businesses and sector experts to discuss regulatory barriers, trade challenges, and market-oriented reforms.',
    ],
  },
  {
    heading: 'Empowering SMEs with Advocacy Tools',
    paragraphs: [
      'Equipping small and medium enterprises with accessible resources, talking points, and platforms to advocate for policies that uphold free market principles.',
    ],
  },
  {
    heading: 'Partnerships with Like-Minded Organisations',
    paragraphs: [
      'Collaborating with research institutes, business associations, and civil society groups in Malaysia and internationally to strengthen the case for open, rules-based economic systems.',
    ],
  },
  {
    heading: 'Grassroots and Community Leader Engagement',
    paragraphs: [
      'Supporting local businesses, community leaders, and civic groups with clear, practical materials that help translate free market principles into everyday economic concerns, strengthening bottom-up understanding and support for market-oriented policies.',
    ],
  },
]

const run = async () => {
  const payload = await getPayload({ config })

  const aboutContent = makeRichTextWithSections([
    {
      heading: 'Organisational Context',
      paragraphs: aboutOrganisationalContext,
      subheadingTag: 'h2' as const,
    },
    {
      heading: 'What We Do',
      paragraphs: [],
      subheadingTag: 'h2' as const,
    },
    ...aboutWhatWeDo.map((item) => ({
      heading: item.heading,
      paragraphs: item.paragraphs,
      subheadingTag: 'h3' as const,
    })),
  ])

  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'about' } },
    limit: 1,
  })

  const data = {
    title: 'About',
    slug: 'about',
    layout: [
      {
        blockType: 'richText' as const,
        content: aboutContent,
        enableAdvanced: true,
        advanced: {
          width: 'standard' as const,
          padding: 'large' as const,
        },
      },
    ],
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
