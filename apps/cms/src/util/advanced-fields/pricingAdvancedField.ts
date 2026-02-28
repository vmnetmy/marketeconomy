import type { Field } from 'payload'

import { buildAdvancedGroup } from './common'

export function buildPricingAdvancedGroup(): Field {
  return buildAdvancedGroup({
    anchorPlaceholder: 'e.g. pricing',
    extraFields: [
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
        name: 'cardStyle',
        type: 'select',
        defaultValue: 'flat',
        options: [
          { label: 'Flat', value: 'flat' },
          { label: 'Raised', value: 'raised' },
        ],
      },
      {
        name: 'highlightStyle',
        type: 'select',
        defaultValue: 'solid',
        options: [
          { label: 'Solid', value: 'solid' },
          { label: 'Outline', value: 'outline' },
        ],
      },
    ],
  })
}
