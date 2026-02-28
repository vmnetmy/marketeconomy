import type { Block } from 'payload'

import { buildAdvancedGroup, enableAdvancedField } from '../util/advancedFields'

export const LogoCloud: Block = {
  slug: 'logoCloud',
  labels: {
    singular: 'Logo Cloud',
    plural: 'Logo Clouds',
  },
  fields: [
    {
      name: 'headline',
      type: 'text',
    },
    {
      name: 'logos',
      type: 'array',
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'name',
          type: 'text',
        },
        {
          name: 'url',
          type: 'text',
        },
      ],
    },
    enableAdvancedField,
    buildAdvancedGroup({ anchorPlaceholder: 'e.g. partners' }),
  ],
}
