import type { Block } from 'payload'

import { buildAdvancedGroup, enableAdvancedField } from '../util/advancedFields'

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
      required: true,
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
    enableAdvancedField,
    buildAdvancedGroup({ anchorPlaceholder: 'e.g. media' }),
  ],
}
