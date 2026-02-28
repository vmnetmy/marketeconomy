import type { Field } from 'payload'

import { buildAdvancedGroup } from './common'

export function buildFAQAdvancedGroup(): Field {
  return buildAdvancedGroup({
    anchorPlaceholder: 'e.g. faq',
    extraFields: [
      {
        name: 'layout',
        type: 'select',
        defaultValue: 'cards',
        options: [
          { label: 'Cards', value: 'cards' },
          { label: 'Minimal', value: 'minimal' },
        ],
      },
      {
        name: 'columns',
        type: 'select',
        defaultValue: '1',
        options: [
          { label: '1 Column', value: '1' },
          { label: '2 Columns', value: '2' },
        ],
      },
    ],
  })
}
