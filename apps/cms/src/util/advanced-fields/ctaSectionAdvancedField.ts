import type { Field } from 'payload'

import { buildAdvancedGroup } from './common'

export function buildCTASectionAdvancedGroup(): Field {
  return buildAdvancedGroup({
    anchorPlaceholder: 'e.g. cta',
    extraFields: [
      {
        name: 'align',
        type: 'select',
        defaultValue: 'left',
        options: [
          { label: 'Left', value: 'left' },
          { label: 'Center', value: 'center' },
        ],
      },
    ],
  })
}
