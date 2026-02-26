import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'
import type { SerializedEditorState } from 'lexical'
import { notFound } from 'next/navigation'

import { BlockRenderer } from '../../../components/blocks/BlockRenderer'
import { getPostBySlug } from '../../../lib/cms'

const renderRichText = (content?: SerializedEditorState | null) => {
  if (!content) return null
  const html = convertLexicalToHTML({ data: content })
  return <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
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
