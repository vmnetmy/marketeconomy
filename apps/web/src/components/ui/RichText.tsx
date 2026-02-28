import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'
import type { SerializedEditorState } from 'lexical'

type RichTextProps = {
  content?: SerializedEditorState | null
  className?: string
}

export function RichText({ content, className = '' }: RichTextProps) {
  if (!content) return null
  const html = convertLexicalToHTML({ data: content })
  return (
    <div
      className={`rt-prose prose max-w-none ${className}`.trim()}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
