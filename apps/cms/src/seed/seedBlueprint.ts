import 'dotenv/config'

import { getPayload } from 'payload'
import type { RequiredDataFromCollectionSlug } from 'payload'

import config from '../payload.config'

type RichTextNode = {
  type: string
  version: number
  format?: string
  indent?: number
  direction?: 'ltr' | 'rtl' | null
  children?: RichTextNode[]
  text?: string
  style?: string
  mode?: string
}

const makeParagraph = (text: string): RichTextNode => ({
  type: 'paragraph',
  format: '' as const,
  indent: 0,
  direction: 'ltr' as const,
  version: 1,
  children: [
    {
      type: 'text',
      version: 1,
      text,
      format: '',
      style: '',
      mode: 'normal',
    },
  ],
})

const makeRichText = (paragraphs: string[]) => ({
  root: {
    type: 'root',
    format: '' as const,
    indent: 0,
    direction: 'ltr' as const,
    version: 1,
    children: paragraphs.map(makeParagraph),
  },
})

type UpsertCollection = 'inTheNews' | 'events' | 'eventReports'
type UpsertData =
  | RequiredDataFromCollectionSlug<'inTheNews'>
  | RequiredDataFromCollectionSlug<'events'>
  | RequiredDataFromCollectionSlug<'eventReports'>

const upsertBySlug = async (
  payload: Awaited<ReturnType<typeof getPayload>>,
  collection: UpsertCollection,
  slug: string,
  data: UpsertData,
) => {
  const existing = await payload.find({
    collection,
    where: {
      slug: { equals: slug },
    },
    limit: 1,
  })

  if (existing.docs[0]) {
    if (collection === 'events') {
      return payload.update({
        collection,
        id: existing.docs[0].id,
        data: data as RequiredDataFromCollectionSlug<'events'>,
        draft: false,
      })
    }

    if (collection === 'eventReports') {
      return payload.update({
        collection,
        id: existing.docs[0].id,
        data: data as RequiredDataFromCollectionSlug<'eventReports'>,
        draft: false,
      })
    }

    return payload.update({
      collection,
      id: existing.docs[0].id,
      data: data as RequiredDataFromCollectionSlug<'inTheNews'>,
      draft: false,
    })
  }

  if (collection === 'events') {
    return payload.create({
      collection,
      data: data as RequiredDataFromCollectionSlug<'events'>,
      draft: false,
    })
  }

  if (collection === 'eventReports') {
    return payload.create({
      collection,
      data: data as RequiredDataFromCollectionSlug<'eventReports'>,
      draft: false,
    })
  }

  return payload.create({
    collection,
    data: data as RequiredDataFromCollectionSlug<'inTheNews'>,
    draft: false,
  })
}

const run = async () => {
  const payload = await getPayload({ config })

  const leadership: Array<RequiredDataFromCollectionSlug<'leadership'>> = [
    {
      name: 'Yang Berhormat Datuk Wan Saiful Wan Jan',
      role: 'Chairman',
      bio: makeRichText([
        'Member of Parliament for Tasek Gelugor, Penang, and a long-time advocate of institutional reform and market-based policy solutions.',
        'Former Founding CEO of the Institute for Democracy and Economic Affairs (IDEAS), recognised globally for advancing free market policy in Malaysia.',
      ]),
      displayOrder: 1,
    },
    {
      name: 'Adib Zalkapli',
      role: 'General Manager',
      bio: makeRichText([
        'Political and public affairs consultant with experience advising multinational companies across technology, financial services, healthcare, and mining.',
        'Leads Viewfinder Global Affairs and has supported clients on geopolitical risk, supply chain resilience, and regulatory strategy.',
      ]),
      displayOrder: 2,
    },
  ]

  for (const person of leadership) {
    const existing = await payload.find({
      collection: 'leadership',
      where: {
        name: { equals: person.name },
      },
      limit: 1,
    })

    if (existing.docs[0]) {
      await payload.update({
        collection: 'leadership',
        id: existing.docs[0].id,
        data: person,
      })
    } else {
      await payload.create({
        collection: 'leadership',
        data: person,
      })
    }
  }

  await upsertBySlug(payload, 'inTheNews', 'market-economy-launch', {
    title: 'Network for Market Economy Launches Regional Dialogue Series',
    slug: 'market-economy-launch',
    excerpt:
      'The Network for Market Economy convened policymakers and business leaders to discuss open markets, investment resilience, and regional cooperation.',
    content: makeRichText([
      'The Network for Market Economy officially launched its regional dialogue series with a focus on trade resilience, investment confidence, and market reforms.',
      'Speakers highlighted the importance of predictable regulation and cross-border cooperation to sustain growth across Malaysia and ASEAN.',
    ]),
    publishedDate: new Date().toISOString(),
    tags: [{ tag: 'ASEAN' }, { tag: 'Trade' }],
    _status: 'published',
  })

  const event = await upsertBySlug(payload, 'events', 'market-economy-roundtable-2026', {
    title: 'Market Economy Roundtable 2026',
    slug: 'market-economy-roundtable-2026',
    startDate: new Date(new Date().getFullYear(), 6, 15).toISOString(),
    endDate: new Date(new Date().getFullYear(), 6, 16).toISOString(),
    location: 'Kuala Lumpur',
    eventType: 'Roundtable',
    eventStatus: 'upcoming',
    description: makeRichText([
      'A two-day roundtable bringing together policymakers, SMEs, and industry leaders to discuss market reform priorities and implementation pathways.',
    ]),
    _status: 'published',
  })

  await upsertBySlug(payload, 'eventReports', 'market-economy-roundtable-2025', {
    title: 'Market Economy Roundtable 2025 Report',
    slug: 'market-economy-roundtable-2025',
    event: event?.id,
    summary: 'Key takeaways from the 2025 roundtable, focused on market openness and SME competitiveness.',
    content: makeRichText([
      'This report summarises the key insights from the 2025 roundtable, including recommended reforms and proposed collaboration initiatives.',
    ]),
    publishedDate: new Date(new Date().getFullYear(), 0, 20).toISOString(),
    _status: 'published',
  })

  payload.logger.info('Seeded Leadership, In the News, and Event/Event Report samples.')
  process.exit(0)
}

run().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error)
  process.exit(1)
})
