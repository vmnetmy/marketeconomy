import type { Block } from 'payload'

import { buildLogoCloudAdvancedGroup, enableAdvancedField } from '../util/advanced-fields'
import { showPlaceholderField } from '../util/placeholders'

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
    showPlaceholderField,
    enableAdvancedField,
    buildLogoCloudAdvancedGroup(),
  ],
}
