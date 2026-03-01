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

const introParagraphs = [
  'In an era of renewed protectionism, tariffs and other trade barriers may be sold as a way to defend domestic industries. But they often end up raising costs, distorting markets, and triggering retaliation that harms businesses and consumers alike. Trade restrictions disrupt supply chains, dampen investment confidence, and make everyday goods more expensive.',
  'Large economies can sometimes cushion the blow or use their market size as leverage.',
  'Smaller states like Malaysia however, have far fewer tools. Highly dependent on open trade and external demand, they may in the short term have little choice but to absorb the impact of more protectionist policies imposed by their major trading partners.',
  'Unlike bigger powers, Malaysia cannot easily retaliate without hurting themselves. Their more realistic path lies in the long term: strengthening domestic competitiveness, deepening economic resilience, and consistently advocating for open markets and rules-based trade that ultimately serve their interests best.',
  'With this in mind, we are establishing Network for Market Economy (NME), dedicated to advancing free market principles as a long-term response to this increasingly protectionist era. While governments and political leaders may understandably concentrate on mitigating immediate economic pressures and shielding vulnerable sectors in the short term, we believe it is equally important not to lose sight of the bigger picture.',
  'Over time, sustained advocacy for open markets, competition, and rules-based trade will be essential to preserving growth, innovation, and economic resilience especially for smaller economies that depend on a stable and predictable global trading system.',
]

const stayConnectedParagraphs = [
  'We welcome policymakers, industry leaders, and community partners to keep in touch with our network for upcoming briefings, dialogues, and opportunities for collaboration in advancing practical, market-oriented policy solutions.',
]

const heroBackgroundImageUrl =
  'https://images.unsplash.com/photo-1486628935334-55f292e8e93e?auto=format&fit=crop&w=1600&q=80'

const heroLatestLink = {
  label: 'Latest Policy Brief: Navigating AFTA 2025 — read here',
  url: '/policy-briefs/',
}

const heroImpactItems = [
  {
    value: '15',
    label: 'Industry Roundtables held',
    icon: 'users',
  },
  {
    value: '8',
    label: 'Policy Papers Published',
    icon: 'documentText',
  },
  {
    value: '350+',
    label: 'Engaged Members',
    icon: 'chartBar',
  },
]

const missionParagraphs = introParagraphs.slice(0, 2)
const comparisonLeft = introParagraphs.slice(1, 3)
const comparisonRight = introParagraphs.slice(3, 6)

const keyActivities = [
  {
    title: 'Policy Briefings for Lawmakers and Government Officials',
    description:
      'Providing research-based, practical policy options that support open markets, competition, and long-term economic resilience.',
    icon: 'documentText',
  },
  {
    title: 'Industry Roundtables',
    description:
      'Convening businesses and sector experts to discuss regulatory barriers, trade challenges, and market-oriented reforms.',
    icon: 'users',
  },
  {
    title: 'Empowering SMEs with Advocacy Tools',
    description:
      'Equipping small and medium enterprises with accessible resources, talking points, and platforms to advocate for policies that uphold free market principles.',
    icon: 'lightBulb',
  },
  {
    title: 'Partnerships with Like-Minded Organisations',
    description:
      'Collaborating with research institutes, business associations, and civil society groups in Malaysia and internationally to strengthen the case for open, rules-based economic systems.',
    icon: 'globeAlt',
  },
  {
    title: 'Grassroots and Community Leader Engagement',
    description:
      'Supporting local businesses, community leaders, and civic groups with clear, practical materials that help translate free market principles into everyday economic concerns, strengthening bottom-up understanding and support for market-oriented policies.',
    icon: 'megaphone',
  },
]

const logoCloud = [
  { name: 'Policy Research Council' },
  { name: 'Regional Economic Forum' },
  { name: 'Industry Roundtable' },
  { name: 'Academic Network' },
  { name: 'SME Coalition' },
  { name: 'Trade & Investment Group' },
  { name: 'Business Association' },
  { name: 'Civic Partners' },
]

const contactCards = [
  {
    title: 'Media Inquiries',
    description: 'Press interviews, comments, and media requests.',
    icon: 'megaphone',
    link: { label: 'press@marketeconomy.org', url: 'mailto:press@marketeconomy.org' },
  },
  {
    title: 'Partnerships',
    description: 'Collaborate on research, briefings, or roundtables.',
    icon: 'briefcase',
    link: { label: 'Start a partnership', url: '/contact' },
  },
  {
    title: 'General Enquiries',
    description: 'Questions about our work or how to get involved.',
    icon: 'atSymbol',
    link: { label: 'hello@marketeconomy.org', url: 'mailto:hello@marketeconomy.org' },
  },
]

const faqItems = [
  {
    question: 'How can my SME participate?',
    answer: makeRichText([
      'You can join briefings, attend roundtables, or request advocacy resources tailored to your sector.',
    ]),
  },
  {
    question: 'Do you charge for policy briefings?',
    answer: makeRichText([
      'Most briefings are offered as part of our public engagement work. For custom sessions, we will discuss scope and costs.',
    ]),
  },
  {
    question: 'Can we request a policy brief?',
    answer: makeRichText([
      'Yes. Share your topic and audience needs, and we will advise on timelines and feasibility.',
    ]),
  },
]

const pages = [
  {
    title: 'Home',
    slug: 'home',
    layout: [
      {
        blockType: 'hero',
        headline: 'Network for Market Economy',
        subheadline:
          'Dedicated to advancing free market principles as a long-term response to this increasingly protectionist era.',
        alignment: 'left',
        backgroundImageUrl: heroBackgroundImageUrl,
        latestLink: heroLatestLink,
        impactTitle: 'Impact at a glance',
        impactItems: heroImpactItems,
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
        content: makeRichText(introParagraphs.slice(0, 3)),
        enableAdvanced: true,
        advanced: {
          container: {
            surface: 'card',
            radius: 'lg',
            shadow: 'soft',
            innerPadding: 'standard',
            borderStyle: 'subtle',
          },
          padding: 'compact',
          width: 'standard',
        },
      },
      {
        blockType: 'testimonials',
        headline: '“The market economy is the ultimate driver of innovation.”',
        items: [
          {
            quote:
              'A strong market economy requires champions like this network to truly thrive.',
            name: 'Sarah Lee',
            role: 'CEO',
            organization: 'Malaysian Innovators Group',
          },
        ],
      },
      {
        blockType: 'featureGrid',
        headline: 'Key Activities',
        intro: 'Our work focuses on research, dialogue, and practical advocacy to keep markets open and competitive.',
        columns: '2',
        features: keyActivities,
        enableAdvanced: true,
        advanced: {
          cardStyle: 'raised',
        },
      },
      {
        blockType: 'contentList',
        source: 'posts',
        limit: 3,
        layout: 'grid',
        enableAdvanced: true,
        advanced: {
          cardStyle: 'raised',
          showImages: true,
        },
      },
      {
        blockType: 'logoCloud',
        headline: 'Featured Partners',
        logos: logoCloud,
      },
    ],
  },
  {
    title: 'About',
    slug: 'about',
    layout: [
      {
        blockType: 'splitSection',
        content: makeRichTextWithHeading('Our Mission', missionParagraphs),
        mediaPosition: 'right',
        background: 'light',
      },
      {
        blockType: 'twoColumnRichText',
        left: makeRichText(comparisonLeft),
        right: makeRichText(comparisonRight),
        background: 'none',
      },
      {
        blockType: 'logoCloud',
        headline: 'Our Network',
        logos: logoCloud,
      },
    ],
  },
  {
    title: 'Activities',
    slug: 'activities',
    layout: [
      {
        blockType: 'hero',
        headline: 'Driving Market-Oriented Reforms',
        subheadline: introParagraphs[introParagraphs.length - 1],
      },
      {
        blockType: 'featureGrid',
        headline: 'Key Activities',
        intro: 'Our work focuses on research, dialogue, and practical advocacy to keep markets open and competitive.',
        columns: '2',
        features: keyActivities,
      },
      {
        blockType: 'ctaSection',
        title: 'Partner With Us on Our Next Roundtable',
        description: 'Work with us to convene leaders and advance practical market reforms.',
        buttonLabel: 'Contact Us',
        buttonURL: '/contact',
        theme: 'dark',
      },
    ],
  },
  {
    title: 'Updates',
    slug: 'updates',
    layout: [
      {
        blockType: 'richText',
        content: makeRichText([
          'Latest announcements, research updates, and highlights from our briefings and roundtables.',
        ]),
      },
    ],
  },
  {
    title: 'Policy Briefs',
    slug: 'policy-briefs',
    layout: [
      {
        blockType: 'hero',
        headline: 'Research & Policy Briefs',
        subheadline: 'Actionable insights for lawmakers, business leaders, and community partners.',
      },
      {
        blockType: 'contentList',
        source: 'policyBriefs',
        limit: 9,
        layout: 'grid',
      },
      {
        blockType: 'newsletter',
        headline: 'Stay Informed',
        description: 'Get the latest briefs delivered to your inbox.',
        inputPlaceholder: 'Enter your email',
        buttonLabel: 'Subscribe',
        formAction: '',
        finePrint: 'We will only email you when new briefs are published.',
      },
    ],
  },
  {
    title: 'Contact',
    slug: 'contact',
    layout: [
      {
        blockType: 'hero',
        headline: 'Contact',
        subheadline: stayConnectedParagraphs[0],
        alignment: 'left',
      },
      {
        blockType: 'cards',
        sectionTitle: 'Ways to Engage',
        sectionIntro: 'Choose the best channel and we will respond quickly.',
        cards: contactCards,
      },
      {
        blockType: 'faq',
        items: faqItems,
      },
    ],
  },
]

const upsertPage = async (payload: Awaited<ReturnType<typeof getPayload>>, data: (typeof pages)[number]) => {
  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: data.slug } },
    limit: 1,
  })

  if (existing.docs[0]) {
    return payload.update({
      collection: 'pages',
      id: existing.docs[0].id,
      data: { ...data, _status: 'published' as const } as any,
    })
  }

  return payload.create({
    collection: 'pages',
    data: { ...data, _status: 'published' as const } as any,
  })
}

const findPageIdBySlug = async (
  payload: Awaited<ReturnType<typeof getPayload>>,
  slug: string,
): Promise<number | null> => {
  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  return result.docs[0]?.id ?? null
}

const run = async () => {
  const payload = await getPayload({ config })

  for (const page of pages) {
    await upsertPage(payload, page)
  }

  const navItems = [
    { label: 'Home', slug: 'home' },
    { label: 'About', slug: 'about' },
    { label: 'Activities', slug: 'activities' },
    { label: 'Updates', slug: 'updates' },
    { label: 'Policy Briefs', slug: 'policy-briefs' },
    { label: 'Contact', slug: 'contact' },
  ]

  const navWithIds = []
  for (const item of navItems) {
    const pageId = await findPageIdBySlug(payload, item.slug)
    if (pageId) {
      navWithIds.push({
        label: item.label,
        linkType: 'internal' as const,
        page: pageId,
      })
    }
  }

  await payload.updateGlobal({
    slug: 'header',
    data: {
      navItems: navWithIds as any,
    },
  })

  await payload.updateGlobal({
    slug: 'footer',
    data: {
      columns: [
        {
          title: 'Navigation',
          links: navWithIds.map((item) => ({
            label: item.label,
            linkType: 'internal' as const,
            page: item.page,
          })),
        },
      ],
      contact: {},
      copyright: 'Network for Market Economy',
    },
  })

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'Network for Market Economy',
      tagline:
        'Dedicated to advancing free market principles as a long-term response to this increasingly protectionist era.',
      defaultSeo: {
        title: 'Network for Market Economy',
        description:
          'Advancing free market principles to preserve growth, innovation, and economic resilience through open, rules-based trade.',
      },
      socialLinks: [],
    },
  })
}

run()
  .then(() => {
    console.log('Seeded pages from handout.')
    process.exit(0)
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
