import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'
import type { SerializedEditorState } from 'lexical'

import { CMS_URL } from '../../lib/cms'

type RichTextProps = {
  content?: SerializedEditorState | null
  className?: string
}

export function RichText({ content, className = '' }: RichTextProps) {
  if (!content) return null
  const html = convertLexicalToHTML({ data: content })
  const resolvedHtml = html
    .replace(/src="\/media\//g, `src="${CMS_URL}/api/media/file/`)
    .replace(/src='\/media\//g, `src='${CMS_URL}/api/media/file/`)
    .replace(/href="\/media\//g, `href="${CMS_URL}/api/media/file/`)
    .replace(/href='\/media\//g, `href='${CMS_URL}/api/media/file/`)
    .replace(/srcset="\/media\//g, `srcset="${CMS_URL}/api/media/file/`)
    .replace(/srcset='\/media\//g, `srcset='${CMS_URL}/api/media/file/`)
    .replace(/src="\/api\/media\//g, `src="${CMS_URL}/api/media/`)
    .replace(/src='\/api\/media\//g, `src='${CMS_URL}/api/media/`)
    .replace(/href="\/api\/media\//g, `href="${CMS_URL}/api/media/`)
    .replace(/href='\/api\/media\//g, `href='${CMS_URL}/api/media/`)
    .replace(/srcset="\/api\/media\//g, `srcset="${CMS_URL}/api/media/`)
    .replace(/srcset='\/api\/media\//g, `srcset='${CMS_URL}/api/media/`)
  return (
    <div
      className={`rt-prose prose max-w-none ${className}`.trim()}
      dangerouslySetInnerHTML={{ __html: resolvedHtml }}
    />
  )
}
