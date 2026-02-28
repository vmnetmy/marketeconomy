import type { Field } from 'payload'

import { buildAdvancedGroup } from './common'

export function buildMediaBlockAdvancedGroup(): Field {
  return buildAdvancedGroup({
    anchorPlaceholder: 'e.g. media',
    extraFields: [
      {
        name: 'frameStyle',
        type: 'select',
        defaultValue: 'outline',
        options: [
          { label: 'None', value: 'none' },
          { label: 'Outline', value: 'outline' },
          { label: 'Card', value: 'card' },
        ],
      },
      {
        name: 'radius',
        type: 'select',
        defaultValue: 'md',
        options: [
          { label: 'Small', value: 'sm' },
          { label: 'Medium', value: 'md' },
          { label: 'Large', value: 'lg' },
        ],
      },
      {
        name: 'shadow',
        type: 'select',
        defaultValue: 'none',
        options: [
          { label: 'None', value: 'none' },
          { label: 'Soft', value: 'soft' },
          { label: 'Medium', value: 'medium' },
        ],
      },
    ],
  })
}
