import 'dotenv/config'

import { getPayload } from 'payload'

import config from '../payload.config'

type LexicalEditorState = {
  root: {
    type: 'root'
    children: Array<{
      type: 'paragraph'
      children: Array<{
        type: 'text'
        text: string
        detail: number
        format: number
        mode: 'normal'
        style: string
        version: number
      }>
      direction: 'ltr'
      format: string
      indent: number
      version: number
    }>
    direction: 'ltr'
    format: string
    indent: number
    version: number
  }
}

const makeRichText = (paragraphs: string[]): LexicalEditorState => ({
  root: {
    type: 'root',
    children: paragraphs.map((text) => ({
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
    })),
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
      },
      {
        blockType: 'richText',
        content: makeRichText(introParagraphs.slice(0, 3)),
      },
      {
        blockType: 'cards',
        sectionTitle: 'Key Activities',
        cards: keyActivities,
      },
      {
        blockType: 'ctaSection',
        title: 'Stay Connected',
        description: stayConnectedParagraphs[0],
        buttonLabel: 'Contact Us',
        buttonURL: '/contact',
        theme: 'dark',
      },
    ],
  },
  {
    title: 'About',
    slug: 'about',
    layout: [
      {
        blockType: 'richText',
        content: makeRichText(introParagraphs),
      },
    ],
  },
  {
    title: 'Activities',
    slug: 'activities',
    layout: [
      {
        blockType: 'richText',
        content: makeRichText([introParagraphs[introParagraphs.length - 1]]),
      },
      {
        blockType: 'cards',
        sectionTitle: 'Key Activities',
        cards: keyActivities,
      },
    ],
  },
  {
    title: 'Updates',
    slug: 'updates',
    layout: [
      {
        blockType: 'contentList',
        source: 'posts',
        limit: 6,
        layout: 'list',
      },
    ],
  },
  {
    title: 'Policy Briefs',
    slug: 'policy-briefs',
    layout: [
      {
        blockType: 'contentList',
        source: 'policyBriefs',
        limit: 6,
        layout: 'list',
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
        cards: keyActivities,
      },
      {
        blockType: 'newsletter',
        headline: 'Stay Connected',
        description: stayConnectedParagraphs[0],
        inputPlaceholder: 'Enter your email',
        buttonLabel: 'Subscribe',
        formAction: '',
        finePrint: 'We will only use your email to share updates and invitations.',
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
      data: { ...data, _status: 'published' },
    })
  }

  return payload.create({
    collection: 'pages',
    data: { ...data, _status: 'published' },
  })
}

const findPageIdBySlug = async (
  payload: Awaited<ReturnType<typeof getPayload>>,
  slug: string,
): Promise<string | null> => {
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
        linkType: 'internal',
        page: pageId,
      })
    }
  }

  await payload.updateGlobal({
    slug: 'header',
    data: {
      navItems: navWithIds,
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
            linkType: 'internal',
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
