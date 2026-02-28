import type { Block } from 'payload'

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
    {
      name: 'advanced',
      type: 'group',
      fields: [
        {
          name: 'anchorId',
          type: 'text',
          admin: {
            placeholder: 'e.g. key-activities',
          },
        },
        {
          name: 'background',
          type: 'select',
          defaultValue: 'none',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Light', value: 'light' },
            { label: 'Dark', value: 'dark' },
          ],
        },
        {
          name: 'padding',
          type: 'select',
          defaultValue: 'standard',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Compact', value: 'compact' },
            { label: 'Standard', value: 'standard' },
            { label: 'Large', value: 'large' },
          ],
        },
        {
          name: 'width',
          type: 'select',
          defaultValue: 'standard',
          options: [
            { label: 'Standard', value: 'standard' },
            { label: 'Wide', value: 'wide' },
            { label: 'Full', value: 'full' },
          ],
        },
        {
          name: 'hideOnMobile',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'hideOnDesktop',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
  ],
}
