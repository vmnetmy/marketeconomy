import 'dotenv/config'

import { getPayload } from 'payload'

import config from '../payload.config'

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

  const footer = await payload.findGlobal({ slug: 'footer' })

  const homeId = await findPageIdBySlug(payload, 'home')
  const aboutId = await findPageIdBySlug(payload, 'about')
  const contactId = await findPageIdBySlug(payload, 'contact')

  const navItems = [
    { label: 'Home', linkType: 'internal' as const, page: homeId ?? undefined, url: '/' },
    { label: 'About', linkType: 'internal' as const, page: aboutId ?? undefined, url: '/about' },
    { label: 'Events', linkType: 'internal' as const, url: '/events' },
    { label: 'Publications', linkType: 'internal' as const, url: '/publications' },
    { label: 'In the News', linkType: 'internal' as const, url: '/in-the-news' },
    { label: 'Contact', linkType: 'internal' as const, page: contactId ?? undefined, url: '/contact' },
  ]

  const exploreItems = [
    { label: 'Policy Briefs', linkType: 'internal' as const, url: '/publications/policy-brief' },
    { label: 'Event Reports', linkType: 'internal' as const, url: '/publications/event-reports' },
    { label: 'Upcoming Events', linkType: 'internal' as const, url: '/events#upcoming' },
  ]

  await payload.updateGlobal({
    slug: 'footer',
    data: {
      columns: [
        {
          title: 'Navigation',
          links: navItems,
        },
        {
          title: 'Explore',
          links: exploreItems,
        },
      ],
      contact: footer?.contact ?? {},
      cta: {
        title: 'Stay Updated',
        description: 'Get the latest research, policy briefs, and event highlights delivered to your inbox.',
        buttonLabel: 'Subscribe',
        buttonUrl: '/in-the-news',
        finePrint: 'We respect your inbox and never spam.',
      },
      legalLinks: [
        {
          label: 'Privacy',
          linkType: 'external',
          url: 'https://marketeconomy.org/privacy',
        },
        {
          label: 'Terms',
          linkType: 'external',
          url: 'https://marketeconomy.org/terms',
        },
      ],
      copyright:
        footer?.copyright ??
        `© ${new Date().getFullYear()} Network for Market Economy`,
    },
  })

  console.log('Seeded footer only.')
}

run()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
