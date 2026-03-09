import type { Block } from 'payload'

import { buildRichTextAdvancedGroup, enableAdvancedField } from '../util/advanced-fields'
import { showPlaceholderField } from '../util/placeholders'

export const RichTextBlock: Block = {
  slug: 'richText',
  labels: {
    singular: 'Rich Text',
    plural: 'Rich Text',
  },
  fields: [
    {
      name: 'content',
      type: 'richText',
    },
    showPlaceholderField,
    enableAdvancedField,
    buildRichTextAdvancedGroup(),
  ],
}
