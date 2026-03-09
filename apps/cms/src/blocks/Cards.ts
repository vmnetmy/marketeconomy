import type { Block } from 'payload'

import { buildCardsAdvancedGroup, enableAdvancedField } from '../util/advanced-fields'
import { iconOptions } from '../util/iconOptions'
import { requireArrayItemsUnlessPlaceholder, requireValueUnlessPlaceholder, showPlaceholderField } from '../util/placeholders'

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
      validate: requireValueUnlessPlaceholder('Section title is required.'),
    },
    {
      name: 'sectionIntro',
      type: 'textarea',
    },
    {
      name: 'cards',
      type: 'array',
      validate: requireArrayItemsUnlessPlaceholder(['title'], 'Each card needs a title.'),
      fields: [
        {
          name: 'title',
          type: 'text',
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
    showPlaceholderField,
    enableAdvancedField,
    buildCardsAdvancedGroup(),
  ],
}
