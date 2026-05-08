import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'
import type { SerializedEditorState } from 'lexical'

import { CMS_PUBLIC_URL, MEDIA_PUBLIC_URL } from '../../lib/cms'

type RichTextProps = {
  content?: SerializedEditorState | null
  className?: string
}

export function RichText({ content, className = '' }: RichTextProps) {
  if (!content) return null
  const html = convertLexicalToHTML({ data: content }) || ''
  const mediaBaseUrl = MEDIA_PUBLIC_URL || `${CMS_PUBLIC_URL}/api/media/file`
  const resolvedHtml = html
    .replace(/src="\/media\//g, `src="${mediaBaseUrl}/`)
    .replace(/src='\/media\//g, `src='${mediaBaseUrl}/`)
    .replace(/href="\/media\//g, `href="${mediaBaseUrl}/`)
    .replace(/href='\/media\//g, `href='${mediaBaseUrl}/`)
    .replace(/srcset="\/media\//g, `srcset="${mediaBaseUrl}/`)
    .replace(/srcset='\/media\//g, `srcset='${mediaBaseUrl}/`)
    .replace(/src="\/api\/media\/file\//g, `src="${mediaBaseUrl}/`)
    .replace(/src='\/api\/media\/file\//g, `src='${mediaBaseUrl}/`)
    .replace(/href="\/api\/media\/file\//g, `href="${mediaBaseUrl}/`)
    .replace(/href='\/api\/media\/file\//g, `href='${mediaBaseUrl}/`)
    .replace(/srcset="\/api\/media\/file\//g, `srcset="${mediaBaseUrl}/`)
    .replace(/srcset='\/api\/media\/file\//g, `srcset='${mediaBaseUrl}/`)
  return (
    <div
      className={`rt-prose prose max-w-none ${className}`.trim()}
      dangerouslySetInnerHTML={{ __html: resolvedHtml }}
    />
  )
}
