import type { Field } from 'payload'

import { buildAdvancedGroup } from './common'

export function buildStatsAdvancedGroup(): Field {
  return buildAdvancedGroup({
    anchorPlaceholder: 'e.g. impact',
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
        name: 'numberSize',
        type: 'select',
        defaultValue: 'md',
        options: [
          { label: 'Small', value: 'sm' },
          { label: 'Medium', value: 'md' },
          { label: 'Large', value: 'lg' },
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
    ],
  })
}
