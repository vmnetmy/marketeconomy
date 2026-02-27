import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'
import type { SerializedEditorState } from 'lexical'
import { notFound } from 'next/navigation'
import { headers } from 'next/headers'

import { BlockRenderer } from '../../../components/blocks/BlockRenderer'
import { CMS_URL, getPostBySlug, getPostsPage } from '../../../lib/cms'

export const dynamic = 'force-dynamic'

const renderRichText = (content?: SerializedEditorState | null) => {
  if (!content) return null
  const html = convertLexicalToHTML({ data: content })
  return <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const slug = decodeURIComponent(params.slug)
  let post = await getPostBySlug(slug)

  if (!post) {
    const fallback = await getPostsPage({ page: 1, limit: 200 })
    post = fallback.docs.find((doc) => doc.slug === slug) ?? null
  }

  if (!post) {
    try {
      const requestHeaders = headers()
      const requestPath =
        requestHeaders.get('x-original-url') ||
        requestHeaders.get('x-url') ||
        requestHeaders.get('x-forwarded-uri') ||
        requestHeaders.get('x-forwarded-path')
      const userAgent = requestHeaders.get('user-agent')
      const debugParams = new URLSearchParams({
        'where[slug][equals]': slug,
        'where[_status][equals]': 'published',
        depth: '1',
        limit: '1',
      })
      const debugUrl = `${CMS_URL.replace(/\/$/, '')}/api/posts?${debugParams.toString()}`
      const res = await fetch(debugUrl, { cache: 'no-store' })
      let docsCount: number | null = null
      if (res.ok) {
        const data = (await res.json()) as { docs?: unknown[] }
        docsCount = Array.isArray(data.docs) ? data.docs.length : null
      }
      console.error(
        `[updates-slug] not found`,
        JSON.stringify({
          params,
          slug,
          requestPath,
          userAgent: userAgent?.slice(0, 80) ?? null,
          cmsUrl: CMS_URL,
          status: res.status,
          docsCount,
        }),
      )
    } catch (error) {
      console.error(
        `[updates-slug] debug fetch failed`,
        JSON.stringify({ params, slug, cmsUrl: CMS_URL, error: String(error) }),
      )
    }
  }
  if (!post) return notFound()

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-12">
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold">{post.title}</h1>
          {post.excerpt ? <p className="text-slate-600">{post.excerpt}</p> : null}
        </header>
        {renderRichText(post.content as SerializedEditorState)}
        <BlockRenderer blocks={post.layout} />
      </div>
    </main>
  )
}
