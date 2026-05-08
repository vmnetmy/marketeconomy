import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import path from 'node:path'
import { Readable } from 'node:stream'

import type { NextRequest } from 'next/server'

const isProduction = process.env.NODE_ENV === 'production'
const defaultUploadRoot = isProduction
  ? '/srv/apps/marketeconomy/shared/uploads'
  : path.resolve(process.cwd(), 'uploads')
const mediaUploadDir = process.env.MEDIA_UPLOAD_DIR || path.resolve(defaultUploadRoot, 'media')

const contentTypes: Record<string, string> = {
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.mp4': 'video/mp4',
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webm': 'video/webm',
  '.webp': 'image/webp',
}

type RouteContext = {
  params: Promise<{ filename: string }>
}

function resolveUploadPath(filename: string): string | null {
  let decodedFilename: string
  try {
    decodedFilename = decodeURIComponent(filename)
  } catch {
    return null
  }
  if (!decodedFilename || decodedFilename.includes('/') || decodedFilename.includes('\\')) return null

  const resolvedUploadDir = path.resolve(mediaUploadDir)
  const resolvedFile = path.resolve(resolvedUploadDir, decodedFilename)
  if (!resolvedFile.startsWith(`${resolvedUploadDir}${path.sep}`)) return null

  return resolvedFile
}

function parseRange(rangeHeader: string | null, size: number): { end: number; start: number } | null {
  if (!rangeHeader) return null

  const match = /^bytes=(\d*)-(\d*)$/.exec(rangeHeader)
  if (!match) return null

  const [, startValue, endValue] = match
  const start = startValue ? Number(startValue) : 0
  const end = endValue ? Number(endValue) : size - 1

  if (!Number.isInteger(start) || !Number.isInteger(end) || start < 0 || end < start || end >= size) {
    return null
  }

  return { start, end }
}

async function serveUpload(request: NextRequest, context: RouteContext): Promise<Response> {
  const { filename } = await context.params
  const filePath = resolveUploadPath(filename)
  if (!filePath) {
    return new Response('Not Found', { status: 404 })
  }

  try {
    const fileStat = await stat(filePath)
    if (!fileStat.isFile()) {
      return new Response('Not Found', { status: 404 })
    }

    const extension = path.extname(filePath).toLowerCase()
    const contentType = contentTypes[extension] || 'application/octet-stream'
    const range = parseRange(request.headers.get('range'), fileStat.size)
    const headers = new Headers({
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Content-Type': contentType,
    })

    if (range) {
      const contentLength = range.end - range.start + 1
      headers.set('Content-Length', String(contentLength))
      headers.set('Content-Range', `bytes ${range.start}-${range.end}/${fileStat.size}`)

      if (request.method === 'HEAD') {
        return new Response(null, { headers, status: 206 })
      }

      const stream = Readable.toWeb(createReadStream(filePath, range))
      return new Response(stream as BodyInit, { headers, status: 206 })
    }

    headers.set('Content-Length', String(fileStat.size))

    if (request.method === 'HEAD') {
      return new Response(null, { headers })
    }

    const stream = Readable.toWeb(createReadStream(filePath))
    return new Response(stream as BodyInit, { headers })
  } catch {
    return new Response('Not Found', { status: 404 })
  }
}

export async function GET(request: NextRequest, context: RouteContext): Promise<Response> {
  return serveUpload(request, context)
}

export async function HEAD(request: NextRequest, context: RouteContext): Promise<Response> {
  return serveUpload(request, context)
}
