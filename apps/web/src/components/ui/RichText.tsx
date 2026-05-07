import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'
import type { SerializedEditorState } from 'lexical'

import { MEDIA_PUBLIC_URL } from '../../lib/cms'

type RichTextProps = {
  content?: SerializedEditorState | null
  className?: string
}

export function RichText({ content, className = '' }: RichTextProps) {
  if (!content) return null
  const html = convertLexicalToHTML({ data: content })
  const resolvedHtml = html
    .replace(/src="\/media\//g, `src="${MEDIA_PUBLIC_URL}/`)
    .replace(/src='\/media\//g, `src='${MEDIA_PUBLIC_URL}/`)
    .replace(/href="\/media\//g, `href="${MEDIA_PUBLIC_URL}/`)
    .replace(/href='\/media\//g, `href='${MEDIA_PUBLIC_URL}/`)
    .replace(/srcset="\/media\//g, `srcset="${MEDIA_PUBLIC_URL}/`)
    .replace(/srcset='\/media\//g, `srcset='${MEDIA_PUBLIC_URL}/`)
    .replace(/src="\/api\/media\/file\//g, `src="${MEDIA_PUBLIC_URL}/`)
    .replace(/src='\/api\/media\/file\//g, `src='${MEDIA_PUBLIC_URL}/`)
    .replace(/href="\/api\/media\/file\//g, `href="${MEDIA_PUBLIC_URL}/`)
    .replace(/href='\/api\/media\/file\//g, `href='${MEDIA_PUBLIC_URL}/`)
    .replace(/srcset="\/api\/media\/file\//g, `srcset="${MEDIA_PUBLIC_URL}/`)
    .replace(/srcset='\/api\/media\/file\//g, `srcset='${MEDIA_PUBLIC_URL}/`)
  return (
    <div
      className={`rt-prose prose max-w-none ${className}`.trim()}
      dangerouslySetInnerHTML={{ __html: resolvedHtml }}
    />
  )
}
