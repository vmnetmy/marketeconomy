import crypto from 'crypto'
import type { PayloadRequest } from 'payload'

import { sendEmail } from '../util/email'

const getBaseUrl = () =>
  process.env.CMS_URL || process.env.NEXT_PUBLIC_CMS_URL || 'https://cms.marketeconomy.org'

const withBaseUrl = (url?: string | null) => {
  if (!url) return null
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  return `${getBaseUrl()}${url.startsWith('/') ? '' : '/'}${url}`
}

export const createGatedDownload = async (req: PayloadRequest): Promise<Response> => {
  const payload = req.payload
  const body =
    (req.body && typeof req.body === 'object' ? req.body : null) ||
    (typeof req.json === 'function' ? await req.json().catch(() => null) : null)

  if (!body) {
    return new Response(JSON.stringify({ message: 'Invalid request body.' }), { status: 400 })
  }

  const { name, email, resourceType, resourceId } = body as {
    name?: string
    email?: string
    resourceType?: 'policyBrief' | 'eventReport'
    resourceId?: string
  }

  if (!name || !email || !resourceType || !resourceId) {
    return new Response(JSON.stringify({ message: 'Missing required fields.' }), { status: 400 })
  }

  const numericId = Number(resourceId)
  const relationId = Number.isNaN(numericId) ? undefined : numericId
  const token = crypto.randomBytes(32).toString('hex')
  const tokenExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()

  const record = await payload.create({
    collection: 'pdfGatedDownloads',
    data: {
      name,
      email,
      resourceType,
      token,
      tokenExpiresAt,
      policyBrief: resourceType === 'policyBrief' ? relationId : undefined,
      eventReport: resourceType === 'eventReport' ? relationId : undefined,
    },
  })

  let title = 'your requested document'
  if (resourceType === 'policyBrief') {
    const brief = await payload.findByID({ collection: 'policyBriefs', id: resourceId, depth: 0 }).catch(() => null)
    title = brief?.title ?? title
  }
  if (resourceType === 'eventReport') {
    const report = await payload.findByID({ collection: 'eventReports', id: resourceId, depth: 0 }).catch(() => null)
    title = report?.title ?? title
  }

  const downloadUrl = `${getBaseUrl()}/api/downloads?token=${token}`
  await sendEmail({
    to: email,
    subject: `Your download link: ${title}`,
    html: `<p>Hi ${name},</p><p>Here is your secure download link for <strong>${title}</strong>:</p><p><a href="${downloadUrl}">${downloadUrl}</a></p><p>This link expires in 7 days.</p><p>— Network for Market Economy</p>`,
    text: `Hi ${name},\n\nHere is your secure download link for ${title}:\n${downloadUrl}\n\nThis link expires in 7 days.\n\n— Network for Market Economy`,
  })

  return new Response(JSON.stringify({ message: 'Download link sent.', id: record.id }), { status: 200 })
}

export const downloadGatedFile = async (req: PayloadRequest): Promise<Response> => {
  const payload = req.payload
  const requestUrl = req.url ?? `${getBaseUrl()}/api/downloads`
  const url = new URL(requestUrl)
  const token = url.searchParams.get('token')

  if (!token) {
    return new Response('Missing token.', { status: 400 })
  }

  const record = await payload.find({
    collection: 'pdfGatedDownloads',
    where: {
      token: { equals: token },
    },
    depth: 1,
    limit: 1,
  })

  const doc = record?.docs?.[0]
  if (!doc) {
    return new Response('Invalid token.', { status: 404 })
  }

  if (doc.tokenExpiresAt && new Date(doc.tokenExpiresAt).getTime() < Date.now()) {
    return new Response('Token expired.', { status: 410 })
  }

  const resourceType = doc.resourceType
  let file = null as { url?: string | null; filename?: string | null } | null

  if (resourceType === 'policyBrief' && doc.policyBrief && typeof doc.policyBrief === 'object') {
    const pdf = doc.policyBrief.pdfFile
    if (pdf && typeof pdf === 'object') {
      file = { url: pdf.url, filename: pdf.filename }
    }
  }

  if (resourceType === 'eventReport' && doc.eventReport && typeof doc.eventReport === 'object') {
    const pdf = doc.eventReport.pdfFile
    if (pdf && typeof pdf === 'object') {
      file = { url: pdf.url, filename: pdf.filename }
    }
  }

  const fileUrl = withBaseUrl(file?.url)
  if (!fileUrl) {
    return new Response('File not available.', { status: 404 })
  }

  const fileRes = await fetch(fileUrl)
  if (!fileRes.ok) {
    return new Response('Unable to fetch file.', { status: 502 })
  }

  const contentType = fileRes.headers.get('content-type') || 'application/pdf'
  const filename = file?.filename || 'download.pdf'
  const buffer = await fileRes.arrayBuffer()

  return new Response(buffer, {
    status: 200,
    headers: {
      'Content-Type': contentType,
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  })
}
