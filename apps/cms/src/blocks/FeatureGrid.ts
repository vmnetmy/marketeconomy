import type { Block } from 'payload'

import { buildAdvancedGroup, enableAdvancedField } from '../util/advancedFields'
import { iconOptions } from '../util/iconOptions'

export const FeatureGrid: Block = {
  slug: 'featureGrid',
  labels: {
    singular: 'Feature Grid',
    plural: 'Feature Grids',
  },
  fields: [
    {
      name: 'headline',
      type: 'text',
    },
    {
      name: 'intro',
      type: 'textarea',
    },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
      ],
    },
    {
      name: 'features',
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
    buildAdvancedGroup({
      anchorPlaceholder: 'e.g. key-activities',
      extraFields: [
        {
          name: 'cardStyle',
          type: 'select',
          defaultValue: 'raised',
          options: [
            { label: 'Flat', value: 'flat' },
            { label: 'Raised', value: 'raised' },
          ],
        },
      ],
    }),
  ],
}
