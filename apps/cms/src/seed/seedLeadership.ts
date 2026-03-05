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

const makeHeadingNode = (text: string, tag: HeadingNode['tag'] = 'h3'): HeadingNode => ({
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
      makeHeadingNode(section.heading, section.subheadingTag ?? 'h3'),
      ...section.paragraphs.map((text) => makeParagraphNode(text)),
    ]),
    direction: 'ltr',
    format: '' as const,
    indent: 0,
    version: 1,
  },
})

const parseMediaId = (value?: string): number | undefined => {
  if (!value) return undefined
  const asNumber = Number(value)
  return Number.isNaN(asNumber) ? undefined : asNumber
}

const placeholderPhotoId = parseMediaId(process.env.LEADERSHIP_PLACEHOLDER_MEDIA_ID)

const leadershipEntries = [
  {
    name: 'Yang Berhormat Datuk Wan Saiful Wan Jan',
    role: 'Chairman' as const,
    displayOrder: 1,
    bio: makeRichTextWithSections([
      {
        heading: 'Chairman of the Advisory Board',
        paragraphs: [
          'YB Datuk Wan Saiful bin Wan Jan is the Member of Parliament for Tasek Gelugor, Penang. Wan Saiful has been engaged in institutional reform for many years.',
          'Among others, he was appointed by Prime Minister Tun Dr Mahathir Mohamad as a member of the Electoral Reform Committee under the Prime Minister’s Department from 2018 to 2020, and before that he was appointed by Prime Minister Dato Seri Najib Tun Razak as a member of the National Consultative Committee on Political Funding from 2015 to 2016.',
          'Before actively involving himself in politics, Wan Saiful held the position of Founding CEO of the Institute for Democracy and Economic Affairs (IDEAS), an independent think tank established in 2010.',
          'Wan Saiful successfully positioned IDEAS as the first research institution in Malaysia to focus on policy solutions based on market principles. Under his leadership, the Global Go-To Think Tank report recognised IDEAS as the 13th best new think tank in the world in 2011 and the best in Asia in 2013.',
          'Wan Saiful was also a Senior Visiting Fellow at the ISEAS–Yusof Ishak Institute, Singapore (2014–2018).',
          'He lived in the United Kingdom from August 1993 to October 2009, where he worked at the Commonwealth Policy Studies Unit, the Research Department of the Conservative Party of the United Kingdom, and Social Enterprise London.',
        ],
      },
    ]),
    photo: placeholderPhotoId,
  },
  {
    name: 'Adib Zalkapli',
    role: 'General Manager' as const,
    displayOrder: 2,
    bio: makeRichTextWithSections([
      {
        heading: 'General Manager',
        paragraphs: [
          'Adib Zalkapli leads the executive office and the management of the Network for Market Economy.',
          'He is an experienced political and public affairs consultant with a track record of advising multinational companies across various industries.',
          'Since 2025 he has led Viewfinder Global Affairs, an advisory firm focusing on geopolitical risks and strategic campaigns.',
          'Adib has advised companies across sectors including internet services, FMCG, financial services, mining, and healthcare.',
          'His notable work includes supporting global manufacturers in managing supply chain disruptions during the COVID-19 lockdowns and helping corporations prepare business continuity plans in response to geopolitical tensions such as the Taiwan Strait and the South China Sea.',
          'He has also advised companies on halal certification and certificate of origin processes.',
          'Previously, Adib served as a political analyst at the British High Commission in Kuala Lumpur, where he supported British foreign policy priorities and commercial interests in Malaysia.',
          'He holds a Master’s Degree in International Relations with Distinction from the University of Nottingham Malaysia, where he researched national security issues of Thailand and Singapore.',
        ],
      },
    ]),
    photo: placeholderPhotoId,
  },
]

const run = async () => {
  const payload = await getPayload({ config })

  for (const entry of leadershipEntries) {
    const existing = await payload.find({
      collection: 'leadership',
      where: { name: { equals: entry.name } },
      limit: 1,
    })

    if (existing.docs[0]) {
      console.log(`Skipping existing leadership: ${entry.name}`)
      continue
    }

    const data = {
      name: entry.name,
      role: entry.role,
      bio: entry.bio,
      displayOrder: entry.displayOrder,
      ...(entry.photo ? { photo: entry.photo } : {}),
    }

    await payload.create({
      collection: 'leadership',
      data,
      draft: false,
    })

    console.log(`Created leadership: ${entry.name}`)
  }

  console.log('Seeded leadership entries.')
}

run()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
