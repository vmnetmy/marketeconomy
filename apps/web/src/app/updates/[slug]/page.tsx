import type { SerializedEditorState } from 'lexical'
import { notFound } from 'next/navigation'
import { headers } from 'next/headers'

import { BlockRenderer } from '../../../components/blocks/BlockRenderer'
import { SectionWrapper } from '../../../components/layout/SectionWrapper'
import { RichText } from '../../../components/ui/RichText'
import { getPostBySlug, getPostsPage } from '../../../lib/cms'

export const dynamic = 'force-dynamic'

export default async function PostPage({ params }: { params: { slug?: string } }) {
  const requestHeaders = await headers()
  const requestPath =
    requestHeaders.get('x-pathname') ||
    requestHeaders.get('x-original-url') ||
    requestHeaders.get('x-original-uri') ||
    requestHeaders.get('x-envoy-original-path') ||
    requestHeaders.get('x-rewrite-url') ||
    requestHeaders.get('x-forwarded-uri') ||
    requestHeaders.get('x-forwarded-path') ||
    requestHeaders.get('x-url') ||
    null

  const rawSlug = typeof params.slug === 'string' ? params.slug : ''
  let slug = rawSlug ? decodeURIComponent(rawSlug) : ''
  if (!slug || slug === 'undefined') {
    const match = requestPath?.match(/\/updates\/([^/?#]+)(?:\/|$)/)
    if (match?.[1]) slug = decodeURIComponent(match[1])
  }
  let post = await getPostBySlug(slug)

  if (!post) {
    const fallback = await getPostsPage({ page: 1, limit: 200 })
    post = fallback.docs.find((doc) => doc.slug === slug) ?? null
  }
  if (!post) return notFound()

  return (
    <div className="flex w-full flex-col">
      <SectionWrapper>
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold">{post.title}</h1>
          {post.excerpt ? <p className="text-slate-600">{post.excerpt}</p> : null}
        </header>
      </SectionWrapper>
      <SectionWrapper>
        <RichText content={post.content as SerializedEditorState} />
      </SectionWrapper>
      <BlockRenderer blocks={post.layout} />
    </div>
  )
}
