import 'dotenv/config'

import { getPayload } from 'payload'
import type { Footer, Header, Page, SiteSetting } from '../payload-types'

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
  direction: 'ltr' | 'rtl'
  format: RichTextFormat
  indent: number
  version: number
}

type HeadingNode = {
  type: 'heading'
  tag: 'h2' | 'h3'
  children: TextNode[]
  direction: 'ltr' | 'rtl'
  format: RichTextFormat
  indent: number
  version: number
}

type LexicalEditorState = {
  root: {
    type: 'root'
    children: Array<ParagraphNode | HeadingNode>
    direction: 'ltr' | 'rtl' | null
    format: RichTextFormat
    indent: number
    version: number
  }
}

type LayoutBlock = NonNullable<Page['layout']>[number]
type SeedPage = Pick<Page, 'title' | 'slug' | 'layout'>
type HeroBlock = Extract<LayoutBlock, { blockType: 'hero' }>
type RichTextBlock = Extract<LayoutBlock, { blockType: 'richText' }>
type TestimonialsBlock = Extract<LayoutBlock, { blockType: 'testimonials' }>
type FeatureGridBlock = Extract<LayoutBlock, { blockType: 'featureGrid' }>
type LogoCloudBlock = Extract<LayoutBlock, { blockType: 'logoCloud' }>
type CardsBlock = Extract<LayoutBlock, { blockType: 'cards' }>
type FaqBlock = Extract<LayoutBlock, { blockType: 'faq' }>

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

const homeIntroParagraphs = [
  'The Network for Market Economy committed to advancing the principles of a free market economy as the foundation of a dynamic, resilient, and prosperous society. We believe that open competition, free enterprise, and sound institutions create the conditions for innovation, opportunity, and long-term growth.',
  'Our work champions policies that expand economic freedom while strengthening the rule of law, regulatory clarity, and institutional integrity. Markets function best when they are underpinned by predictable rules, transparent governance, and fair competition. We therefore advocate practical, evidence-based reforms that improve efficiency, enhance productivity, and support sustainable development.',
  'Through rigorous research, policy dialogue, and public engagement, we seek to contribute constructive and implementable ideas. Our focus is on strengthening economic resilience, encouraging innovation, and ensuring that prosperity is broad-based and enduring.',
  'We work with policymakers, industry leaders, academics, and civil society to promote solutions that are principled yet pragmatic and grounded in data, informed by experience, and tailored to real-world challenges.',
  'We invite you to learn more about our work, engage with our research, attend our events, or get in touch to explore opportunities for collaboration and partnership.',
]

const stayConnectedParagraphs = [
  'We welcome policymakers, industry leaders, and community partners to keep in touch with our network for upcoming briefings, dialogues, and opportunities for collaboration in advancing practical, market-oriented policy solutions.',
]

const heroBackgroundImageUrl =
  'https://images.unsplash.com/photo-1486628935334-55f292e8e93e?auto=format&fit=crop&w=1600&q=80'

const heroLatestLink: NonNullable<HeroBlock['latestLink']> = {
  label: 'Latest Policy Brief: Navigating AFTA 2025 — read here',
  url: '/publications/policy-brief',
}

const heroImpactItems: NonNullable<HeroBlock['impactItems']> = [
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
    icon: 'arrowTrendingUp',
  },
]

const keyActivities: NonNullable<FeatureGridBlock['features']> = [
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

const logoCloud: NonNullable<LogoCloudBlock['logos']> = [
  { name: 'Policy Research Council' },
  { name: 'Regional Economic Forum' },
  { name: 'Industry Roundtable' },
  { name: 'Academic Network' },
  { name: 'SME Coalition' },
  { name: 'Trade & Investment Group' },
  { name: 'Business Association' },
  { name: 'Civic Partners' },
]

const contactCards: NonNullable<CardsBlock['cards']> = [
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

const faqItems: NonNullable<FaqBlock['items']> = [
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

const homeHero: HeroBlock = {
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
}

const homeIntro: RichTextBlock = {
  blockType: 'richText',
  content: makeRichText(homeIntroParagraphs),
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
}

const homeTestimonials: TestimonialsBlock = {
  blockType: 'testimonials',
  headline: '“The market economy is the ultimate driver of innovation.”',
  items: [
    {
      quote: 'A strong market economy requires champions like this network to truly thrive.',
      name: 'Sarah Lee',
      role: 'CEO',
      organization: 'Malaysian Innovators Group',
    },
  ],
}

const homeFeatureGrid: FeatureGridBlock = {
  blockType: 'featureGrid',
  headline: 'Key Activities',
  intro: 'Our work focuses on research, dialogue, and practical advocacy to keep markets open and competitive.',
  columns: '2',
  features: keyActivities,
  enableAdvanced: true,
  advanced: {
    cardStyle: 'raised',
  },
}

const homeLogoCloud: LogoCloudBlock = {
  blockType: 'logoCloud',
  headline: 'Featured Partners',
  logos: logoCloud,
}

const contactHero: HeroBlock = {
  blockType: 'hero',
  headline: 'Contact',
  subheadline: stayConnectedParagraphs[0],
  alignment: 'left',
}

const contactCardsBlock: CardsBlock = {
  blockType: 'cards',
  sectionTitle: 'Ways to Engage',
  sectionIntro: 'Choose the best channel and we will respond quickly.',
  cards: contactCards,
}

const contactRichText: RichTextBlock = {
  blockType: 'richText',
  content: makeRichText([
    stayConnectedParagraphs[0],
    'Please reach out at contact@marketeconomy.org. A member of our team will respond promptly.',
  ]),
}

const contactFaq: FaqBlock = {
  blockType: 'faq',
  items: faqItems,
}

const pages: SeedPage[] = [
  {
    title: 'Home',
    slug: 'home',
    layout: [homeHero, homeIntro, homeTestimonials, homeFeatureGrid, homeLogoCloud],
  },
  // About is now seeded via seedAbout.ts
  {
    title: 'Contact',
    slug: 'contact',
    layout: [contactHero, contactCardsBlock, contactRichText, contactFaq],
  },
]

const upsertPage = async (payload: Awaited<ReturnType<typeof getPayload>>, data: SeedPage) => {
  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: data.slug } },
    limit: 1,
  })

  const pageData = { ...data, _status: 'published' as const }

  if (existing.docs[0]) {
    return payload.update({
      collection: 'pages',
      id: existing.docs[0].id,
      data: pageData,
      draft: false,
    })
  }

  return payload.create({
    collection: 'pages',
    data: pageData,
    draft: false,
  })
}

const findPageIdBySlug = async (
  payload: Awaited<ReturnType<typeof getPayload>>,
  slug: string,
): Promise<Page['id'] | null> => {
  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  return result.docs[0]?.id ?? null
}

const run = async () => {
  try {
    const payload = await getPayload({ config })

    for (const page of pages) {
      await upsertPage(payload, page)
    }

    const homeId = await findPageIdBySlug(payload, 'home')
    const aboutId = await findPageIdBySlug(payload, 'about')
    const contactId = await findPageIdBySlug(payload, 'contact')

    const navWithIds: NonNullable<Header['navItems']> = [
      {
        label: 'Home',
        linkType: 'internal' as const,
        page: homeId ?? undefined,
        url: '/',
      },
      {
        label: 'About',
        linkType: 'internal' as const,
        page: aboutId ?? undefined,
        url: '/about',
        children: [
          {
            label: 'Leadership',
            linkType: 'internal' as const,
            url: '/about/leadership',
          },
        ],
      },
      {
        label: 'Events',
        linkType: 'internal' as const,
        url: '/events',
        children: [
          {
            label: 'Upcoming Events',
            linkType: 'internal' as const,
            url: '/events#upcoming',
          },
          {
            label: 'Past Events',
            linkType: 'internal' as const,
            url: '/events#past',
          },
        ],
      },
      {
        label: 'Publications',
        linkType: 'internal' as const,
        url: '/publications',
        children: [
          {
            label: 'Event Reports',
            linkType: 'internal' as const,
            url: '/publications/event-reports',
          },
          {
            label: 'Policy Brief',
            linkType: 'internal' as const,
            url: '/publications/policy-brief',
          },
        ],
      },
      {
        label: 'In the News',
        linkType: 'internal' as const,
        url: '/in-the-news',
      },
      {
        label: 'Contact',
        linkType: 'internal' as const,
        page: contactId ?? undefined,
        url: '/contact',
      },
    ].filter((item) => item.label)

    await payload.updateGlobal({
      slug: 'header',
      data: {
        navItems: navWithIds,
      } as Partial<Header>,
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
              url: item.url,
            })),
          },
        ],
        contact: {},
        copyright: 'Network for Market Economy',
      } as Partial<Footer>,
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
      } as Partial<SiteSetting>,
    })

    console.log('Seeded pages successfully.')
  } catch (error) {
    console.error('Error seeding pages:', error)
    process.exit(1)
  }
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
