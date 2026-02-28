import type { Field } from 'payload'

import { buildAdvancedGroup } from './common'

export function buildCardsAdvancedGroup(): Field {
  return buildAdvancedGroup({
    anchorPlaceholder: 'e.g. ways-to-engage',
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
      {
        name: 'columns',
        type: 'select',
        defaultValue: '2',
        options: [
          { label: '2 Columns', value: '2' },
          { label: '3 Columns', value: '3' },
          { label: '4 Columns', value: '4' },
        ],
      },
    ],
  })
}
