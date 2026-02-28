import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'
import type { SerializedEditorState } from 'lexical'

type RichTextProps = {
  content?: SerializedEditorState
  className?: string
}

export function RichText({ content, className = '' }: RichTextProps) {
  if (!content) return null
  const html = convertLexicalToHTML({ data: content })
  return (
    <div
      className={`prose prose-slate max-w-none prose-a:text-blue-600 ${className}`.trim()}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
