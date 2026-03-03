import 'dotenv/config'

import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { getPayload } from 'payload'

import type { RequiredDataFromCollectionSlug } from 'payload'
import config from '../src/payload.config'

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
      format: '' | 'left' | 'right' | 'center' | 'start' | 'end' | 'justify'
      indent: number
      version: number
    }>
    direction: 'ltr'
    format: '' | 'left' | 'right' | 'center' | 'start' | 'end' | 'justify'
    indent: number
    version: number
  }
}

type PolicyBriefData = RequiredDataFromCollectionSlug<'policyBriefs'>
type PersonData = RequiredDataFromCollectionSlug<'people'>

const RESET_EXISTING = false

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

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')

const ensurePerson = async (
  payload: Awaited<ReturnType<typeof getPayload>>,
  data: PersonData,
): Promise<number> => {
  const existing = await payload.find({
    collection: 'people',
    where: {
      fullName: { equals: data.fullName },
    },
    limit: 1,
  })

  if (existing.docs[0]) {
    return existing.docs[0].id
  }

  const created = await payload.create({
    collection: 'people',
    data,
  })

  return created.id
}

const ensureMediaFromUrl = async (
  payload: Awaited<ReturnType<typeof getPayload>>,
  filename: string,
  url: string,
  alt: string,
  caption?: string,
): Promise<number> => {
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
    throw new Error(`Failed to download media ${url}`)
  }

  const buffer = Buffer.from(await response.arrayBuffer())
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

const ensurePdfMedia = async (
  payload: Awaited<ReturnType<typeof getPayload>>,
  filename: string,
  title: string,
  summary: string,
  recommendations: string[],
): Promise<number> => {
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

  const pdfDoc = await PDFDocument.create()
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

  const bodyText = [
    summary,
    '',
    'Key Recommendations:',
    ...recommendations.map((rec) => `• ${rec}`),
    '',
    'Placeholder policy text for review. This document is a sample PDF generated for demonstration purposes.',
    'It will be replaced with the finalized policy brief PDF once the research team approves the final draft.',
  ].join('\n')

  const addPage = (heading: string) => {
    const page = pdfDoc.addPage([612, 792])
    const { width, height } = page.getSize()
    page.drawText(heading, {
      x: 50,
      y: height - 70,
      size: 20,
      font: bold,
      color: rgb(0.1, 0.1, 0.1),
    })
    page.drawText(bodyText, {
      x: 50,
      y: height - 110,
      size: 12,
      font,
      color: rgb(0.15, 0.15, 0.15),
      lineHeight: 16,
      maxWidth: width - 100,
    })
  }

  addPage(title)
  addPage(`${title} (continued)`)
  addPage(`${title} (appendix)`)

  const pdfBytes = await pdfDoc.save()

  const created = await payload.create({
    collection: 'media',
    data: {
      alt: `${title} PDF`,
      caption: 'Sample policy brief PDF.',
    },
    file: {
      data: Buffer.from(pdfBytes),
      name: filename,
      mimetype: 'application/pdf',
      size: pdfBytes.length,
    },
  })

  return created.id
}

const policyBriefs: Array<{
  title: string
  tags: string[]
  briefType: PolicyBriefData['briefType']
  summary: string
  executiveSummary: string[]
  recommendations: string[]
}> = [
  {
    title: 'Strengthening SME Competitiveness in ASEAN',
    tags: ['SME', 'ASEAN', 'Trade'],
    briefType: 'policy',
    summary:
      'A roadmap for strengthening SME productivity and export readiness through regional standards, digital finance access, and targeted trade facilitation.',
    executiveSummary: [
      'Small and medium enterprises are the backbone of ASEAN economies, yet many remain locked in low-productivity sectors. This brief outlines practical pathways for Malaysia and regional partners to improve SME competitiveness without distorting market incentives.',
      'We recommend a regional productivity agenda that aligns standards, accelerates digital adoption, and lowers cross-border compliance costs. The approach prioritizes export readiness, formalization, and integration into regional supply chains while preserving entrepreneurial flexibility.',
    ],
    recommendations: [
      'Create ASEAN-wide digital onboarding standards for SME exporters.',
      'Expand credit guarantee schemes tied to measurable productivity outcomes.',
      'Streamline cross-border logistics and customs for SME shipment sizes.',
    ],
  },
  {
    title: 'Digital Taxation and Cross-Border Trade',
    tags: ['Digital Economy', 'Trade', 'Tax'],
    briefType: 'policy',
    summary:
      'Policy options for taxing digital services while maintaining fair competition, preserving innovation, and avoiding double taxation across ASEAN markets.',
    executiveSummary: [
      'Digital trade is growing faster than regulatory coordination in the region. Governments need approaches that collect legitimate revenue without suppressing innovation or fragmenting cross-border commerce.',
      'This brief evaluates global models for digital taxation and proposes a coordinated ASEAN framework focused on transparency, dispute resolution, and clear thresholds that keep compliance feasible for smaller firms.',
    ],
    recommendations: [
      'Adopt clear regional thresholds for taxable digital presence.',
      'Implement a shared ASEAN dispute mechanism for digital tax conflicts.',
      'Ensure tax design supports platform competition and SME participation.',
    ],
  },
  {
    title: 'Reforming Subsidies Without Hurting the Poor',
    tags: ['Fiscal Policy', 'Equity', 'Energy'],
    briefType: 'policy',
    summary:
      'An evidence-based approach to subsidy reform using targeted cash transfers, transparent pricing, and phased implementation that protects vulnerable households.',
    executiveSummary: [
      'Subsidy reform is essential for fiscal sustainability, yet abrupt changes can harm low-income households. This brief outlines a market-friendly transition that protects the poor while restoring price signals.',
      'We recommend transparent subsidy rationalization paired with targeted transfers, supported by clear communication and phased rollouts that reduce political risk and improve policy credibility.',
    ],
    recommendations: [
      'Replace blanket subsidies with targeted cash transfers.',
      'Publish transparent price adjustment schedules and fiscal impact data.',
      'Use phased pricing reforms with household resilience monitoring.',
    ],
  },
  {
    title: 'ESG Standards and Export Market Access',
    tags: ['ESG', 'Trade', 'Manufacturing'],
    briefType: 'research',
    summary:
      'How Malaysian exporters can meet rising ESG requirements and protect market access while maintaining cost competitiveness.',
    executiveSummary: [
      'ESG compliance is rapidly becoming a prerequisite for trade access, particularly in Europe and North America. This brief maps the most relevant standards and outlines how exporters can comply without excessive cost.',
      'We propose a coordinated national support system that offers audit readiness, ESG financing, and shared industry benchmarks, allowing firms to meet requirements while sustaining margin competitiveness.',
    ],
    recommendations: [
      'Launch sector-level ESG readiness toolkits for exporters.',
      'Create financing incentives linked to verified ESG progress.',
      'Coordinate ESG reporting standards across Malaysia’s export agencies.',
    ],
  },
  {
    title: 'The Future of Carbon Pricing in Southeast Asia',
    tags: ['Carbon Pricing', 'Climate', 'Fiscal Policy'],
    briefType: 'report',
    summary:
      'An assessment of carbon pricing models and their implications for competitiveness, investment flows, and green industrial transition in ASEAN.',
    executiveSummary: [
      'Carbon pricing is inevitable as global supply chains decarbonize. Southeast Asia can either shape the policy frameworks or absorb external constraints. This brief compares pricing models and their impact on trade and domestic growth.',
      'We recommend a phased, market-aligned approach that protects export competitiveness while attracting green investment and avoiding fragmented regulatory burdens.',
    ],
    recommendations: [
      'Adopt carbon pricing pilots in high-emission sectors first.',
      'Align carbon policy with investment incentives for green tech.',
      'Coordinate regional benchmarks to prevent regulatory fragmentation.',
    ],
  },
  {
    title: 'Industrial Policy vs Free Market Strategy',
    tags: ['Industrial Policy', 'Competition', 'ASEAN'],
    briefType: 'policy',
    summary:
      'A balanced framework for strategic industrial policy that preserves market signals and competition while supporting national priorities.',
    executiveSummary: [
      'Industrial policy can be effective when it strengthens productivity and competition, but risks rise when subsidies distort markets. This brief outlines guardrails for pro-market industrial strategy in Malaysia and ASEAN.',
      'The recommended model emphasizes measurable outcomes, sunset clauses, and transparent evaluation to prevent policy capture while supporting strategic industries.',
    ],
    recommendations: [
      'Attach clear productivity metrics to industrial incentives.',
      'Use sunset clauses for all strategic subsidies.',
      'Publish annual competitiveness audits for supported sectors.',
    ],
  },
  {
    title: 'Youth Employment and Market Flexibility',
    tags: ['Labor', 'Youth', 'Human Capital'],
    briefType: 'research',
    summary:
      'Policy measures to reduce youth unemployment through labor market flexibility, skills alignment, and private-sector hiring incentives.',
    executiveSummary: [
      'Youth unemployment in emerging markets reflects skills mismatches and rigid hiring frameworks. This brief outlines reforms that encourage hiring while protecting basic worker security.',
      'We propose aligning training programs with employer demand, updating labor regulations for flexible work, and incentivizing private-sector apprenticeship schemes.',
    ],
    recommendations: [
      'Expand employer-led apprenticeship and internship pathways.',
      'Align vocational programs with priority growth sectors.',
      'Modernize labor laws to support flexible hiring models.',
    ],
  },
  {
    title: 'Supply Chain Resilience Post-Pandemic',
    tags: ['Supply Chain', 'Trade', 'Resilience'],
    briefType: 'report',
    summary:
      'Strategies for enhancing supply chain resilience through diversification, regional logistics coordination, and digital trade infrastructure.',
    executiveSummary: [
      'The pandemic exposed critical vulnerabilities in supply chains. This brief outlines steps to diversify sourcing, strengthen regional logistics, and reduce exposure to single-point disruptions.',
      'We recommend coordinated regional investments in infrastructure, simplified trade compliance, and digital visibility tools that reduce inventory shocks while sustaining trade efficiency.',
    ],
    recommendations: [
      'Invest in shared ASEAN logistics and port modernization.',
      'Streamline cross-border compliance for resilient sourcing.',
      'Adopt digital trade visibility platforms for critical sectors.',
    ],
  },
  {
    title: 'Monetary Policy in Emerging Markets',
    tags: ['Monetary Policy', 'Financial Stability', 'ASEAN'],
    briefType: 'research',
    summary:
      'A comparative analysis of monetary policy trade-offs in emerging markets and their impact on inflation control and investment confidence.',
    executiveSummary: [
      'Emerging markets face tighter trade-offs between inflation control and growth. This brief reviews recent monetary policy responses across ASEAN and highlights lessons for maintaining investor confidence.',
      'We propose a communication-first strategy that reinforces central bank credibility while supporting market-driven credit expansion for productive investment.',
    ],
    recommendations: [
      'Strengthen forward guidance and policy transparency.',
      'Coordinate fiscal and monetary tools to reduce volatility.',
      'Promote productive credit channels over consumption-heavy lending.',
    ],
  },
  {
    title: 'Public-Private Partnerships in Infrastructure',
    tags: ['Infrastructure', 'PPP', 'Investment'],
    briefType: 'policy',
    summary:
      'Designing effective PPP frameworks to attract private capital, reduce fiscal burdens, and deliver resilient infrastructure.',
    executiveSummary: [
      'PPP structures can unlock private investment for infrastructure, but only when risk allocation and governance are credible. This brief outlines best practices for structuring bankable PPPs in Malaysia and ASEAN.',
      'We recommend transparent procurement, predictable regulatory frameworks, and independent oversight mechanisms to increase investor confidence and reduce project delays.',
    ],
    recommendations: [
      'Standardize PPP contracts with clear risk allocation rules.',
      'Strengthen independent oversight for procurement quality.',
      'Create a pipeline of bankable projects with predictable returns.',
    ],
  },
]

const run = async () => {
  const payload = await getPayload({ config })

  if (RESET_EXISTING) {
    const existing = await payload.find({ collection: 'policyBriefs', limit: 200 })
    await Promise.all(
      existing.docs.map((doc) =>
        payload.delete({
          collection: 'policyBriefs',
          id: doc.id,
        }),
      ),
    )
  }

  const authorIds = await Promise.all([
    ensurePerson(payload, { fullName: 'Dr. Farah Iskandar', roleTitle: 'Senior Policy Analyst' }),
    ensurePerson(payload, { fullName: 'Imran Yusof', roleTitle: 'Research Fellow' }),
    ensurePerson(payload, { fullName: 'Siti Nabilah', roleTitle: 'ASEAN Policy Lead' }),
  ])

  const createdEntries: PolicyBriefData[] = []
  const today = new Date()

  for (const [index, brief] of policyBriefs.entries()) {
    const slug = toSlug(brief.title)
    const imageUrl = `https://placehold.co/1200x900/png?text=${encodeURIComponent(brief.title)}`
    const imageId = await ensureMediaFromUrl(
      payload,
      `policy-brief-${slug}.png`,
      imageUrl,
      `${brief.title} cover image`,
      'Placeholder cover image for policy brief.',
    )

    const pdfId = await ensurePdfMedia(
      payload,
      `policy-brief-${slug}.pdf`,
      brief.title,
      brief.summary,
      brief.recommendations,
    )

    const publishedAt = new Date(today)
    publishedAt.setMonth(today.getMonth() - index)

    const data: PolicyBriefData = {
      title: brief.title,
      slug,
      summary: brief.summary,
      briefType: brief.briefType,
      executiveSummary: makeRichText(brief.executiveSummary),
      keyRecommendations: brief.recommendations.map((recommendation) => ({ recommendation })),
      tags: brief.tags.map((tag) => ({ tag })),
      authors: authorIds.slice(0, 2),
      coverImage: imageId,
      pdfFile: pdfId,
      featured: index < 2,
      publishedAt: publishedAt.toISOString(),
      _status: 'published',
    }

    const existing = await payload.find({
      collection: 'policyBriefs',
      where: { slug: { equals: slug } },
      limit: 1,
    })

    if (existing.docs[0]) {
      await payload.update({
        collection: 'policyBriefs',
        id: existing.docs[0].id,
        data,
        draft: false,
      })
    } else {
      await payload.create({
        collection: 'policyBriefs',
        data,
        draft: false,
      })
    }

    createdEntries.push(data)
  }

  console.log(`Seeded ${createdEntries.length} policy briefs.`)
}

run()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
