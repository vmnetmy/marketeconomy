import type { Field } from 'payload'

import { buildAdvancedGroup } from './common'

export function buildLogoCloudAdvancedGroup(): Field {
  return buildAdvancedGroup({
    anchorPlaceholder: 'e.g. partners',
    extraFields: [
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
        name: 'columns',
        type: 'select',
        defaultValue: '4',
        options: [
          { label: '2 Columns', value: '2' },
          { label: '3 Columns', value: '3' },
          { label: '4 Columns', value: '4' },
          { label: '6 Columns', value: '6' },
        ],
      },
    ],
  })
}
