import type { Block } from 'payload'

import { buildHeroAdvancedGroup, enableAdvancedField } from '../util/advanced-fields'
import { iconOptions } from '../util/iconOptions'
import { requireArrayItemsUnlessPlaceholder, requireValueUnlessPlaceholder, showPlaceholderField } from '../util/placeholders'

export const Hero: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero',
    plural: 'Hero',
  },
  fields: [
    {
      name: 'headline',
      type: 'text',
      validate: requireValueUnlessPlaceholder('Headline is required.'),
    },
    {
      name: 'subheadline',
      type: 'textarea',
    },
    {
      name: 'eyebrow',
      type: 'text',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'backgroundImageUrl',
      type: 'text',
      admin: {
        description: 'Optional: use a direct image URL instead of uploading to Media.',
        placeholder: 'https://images.unsplash.com/photo-... (optional)',
      },
    },
    {
      name: 'latestLink',
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
    {
      name: 'impactTitle',
      type: 'text',
    },
    {
      name: 'impactItems',
      type: 'array',
      validate: requireArrayItemsUnlessPlaceholder(['value', 'label'], 'Each impact item needs a value and label.'),
      fields: [
        {
          name: 'value',
          type: 'text',
        },
        {
          name: 'label',
          type: 'text',
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
      ],
    },
    {
      name: 'primaryCTA',
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
    {
      name: 'secondaryCTA',
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
    {
      name: 'alignment',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
        { label: 'Split', value: 'split' },
      ],
    },
    showPlaceholderField,
    enableAdvancedField,
    buildHeroAdvancedGroup(),
  ],
}
