import type { Block } from 'payload'

import { buildCardsAdvancedGroup, enableAdvancedField } from '../util/advanced-fields'
import { iconOptions } from '../util/iconOptions'

export const Cards: Block = {
  slug: 'cards',
  labels: {
    singular: 'Cards',
    plural: 'Cards',
  },
  fields: [
    {
      name: 'sectionTitle',
      type: 'text',
      required: true,
    },
    {
      name: 'sectionIntro',
      type: 'textarea',
    },
    {
      name: 'cards',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'icon',
          type: 'select',
          options: iconOptions,
          admin: {
            placeholder: 'Select an icon',
            components: {
              Field: '/components/IconSelect',
            },
          },
        },
        {
          name: 'link',
          type: 'group',
          fields: [
            {
              name: 'label',
              type: 'text',
            },
            {
              name: 'url',
              type: 'text',
            },
          ],
        },
      ],
    },
    enableAdvancedField,
    buildCardsAdvancedGroup(),
  ],
}
