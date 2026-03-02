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

  const navSlugs = ['home', 'about', 'activities', 'updates', 'policy-briefs', 'contact']
  const navItems = []
  for (const slug of navSlugs) {
    const pageId = await findPageIdBySlug(payload, slug)
    if (pageId) {
      navItems.push({
        label: slug === 'policy-briefs' ? 'Policy Briefs' : slug[0].toUpperCase() + slug.slice(1),
        linkType: 'internal' as const,
        page: pageId,
      })
    }
  }

  const exploreSlugs = ['updates', 'policy-briefs', 'activities']
  const exploreItems = []
  for (const slug of exploreSlugs) {
    const pageId = await findPageIdBySlug(payload, slug)
    if (pageId) {
      exploreItems.push({
        label: slug === 'policy-briefs' ? 'Policy Briefs' : slug[0].toUpperCase() + slug.slice(1),
        linkType: 'internal' as const,
        page: pageId,
      })
    }
  }

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
        buttonUrl: '/updates',
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
