import type { Field } from 'payload'

import { buildAdvancedTabsGroup } from './common'

export function buildFormAdvancedGroup(): Field {
  return buildAdvancedTabsGroup({
    tabs: [
      {
        label: 'Layout',
        fields: [
          {
            name: 'layout',
            type: 'select',
            defaultValue: 'stacked',
            options: [
              { label: 'Stacked', value: 'stacked' },
              { label: 'Two columns', value: 'twoColumn' },
            ],
          },
          {
            name: 'align',
            type: 'select',
            defaultValue: 'left',
            options: [
              { label: 'Left', value: 'left' },
              { label: 'Center', value: 'center' },
            ],
          },
          {
            name: 'showLabels',
            type: 'checkbox',
            defaultValue: true,
          },
          {
            name: 'fullWidthButton',
            type: 'checkbox',
            defaultValue: false,
          },
        ],
      },
      {
        label: 'Container',
        fields: [
          {
            name: 'cardStyle',
            type: 'select',
            defaultValue: 'card',
            options: [
              { label: 'None', value: 'none' },
              { label: 'Soft', value: 'soft' },
              { label: 'Card', value: 'card' },
              { label: 'Outline', value: 'outline' },
            ],
          },
          {
            name: 'radius',
            type: 'select',
            defaultValue: 'lg',
            options: [
              { label: 'Small', value: 'sm' },
              { label: 'Medium', value: 'md' },
              { label: 'Large', value: 'lg' },
            ],
          },
          {
            name: 'shadow',
            type: 'select',
            defaultValue: 'soft',
            options: [
              { label: 'None', value: 'none' },
              { label: 'Soft', value: 'soft' },
              { label: 'Medium', value: 'medium' },
            ],
          },
        ],
      },
      {
        label: 'Buttons',
        fields: [
          {
            name: 'buttonStyle',
            type: 'select',
            defaultValue: 'solid',
            options: [
              { label: 'Solid', value: 'solid' },
              { label: 'Outline', value: 'outline' },
            ],
          },
        ],
      },
    ],
  })
}
