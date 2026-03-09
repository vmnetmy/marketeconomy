import type { Block } from 'payload'

import { buildMediaBlockAdvancedGroup, enableAdvancedField } from '../util/advanced-fields'
import { requireValueUnlessPlaceholder, showPlaceholderField } from '../util/placeholders'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  labels: {
    singular: 'Media',
    plural: 'Media',
  },
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      validate: requireValueUnlessPlaceholder('Media is required.'),
    },
    {
      name: 'caption',
      type: 'text',
    },
    {
      name: 'alignment',
      type: 'select',
      defaultValue: 'center',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
        { label: 'Full Width', value: 'full' },
      ],
    },
    showPlaceholderField,
    enableAdvancedField,
    buildMediaBlockAdvancedGroup(),
  ],
}
