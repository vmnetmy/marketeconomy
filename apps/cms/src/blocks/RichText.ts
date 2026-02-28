import type { Block } from 'payload'

import { buildRichTextAdvancedGroup, enableAdvancedField } from '../util/advancedFields'

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
    enableAdvancedField,
    buildRichTextAdvancedGroup(),
  ],
}
