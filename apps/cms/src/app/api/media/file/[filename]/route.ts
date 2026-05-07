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
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
}

type RouteContext = {
  params: Promise<{ filename: string }>
}

function resolveUploadPath(filename: string): string | null {
  if (!filename || filename.includes('/') || filename.includes('\\')) return null

  const resolvedUploadDir = path.resolve(mediaUploadDir)
  const resolvedFile = path.resolve(resolvedUploadDir, filename)
  if (!resolvedFile.startsWith(`${resolvedUploadDir}${path.sep}`)) return null

  return resolvedFile
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
    const headers = new Headers({
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Content-Length': String(fileStat.size),
      'Content-Type': contentTypes[extension] || 'application/octet-stream',
    })

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
