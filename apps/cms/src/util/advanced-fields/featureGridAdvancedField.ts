import type { Field } from 'payload'

import { buildAdvancedGroup } from './common'

export function buildFeatureGridAdvancedGroup(): Field {
  return buildAdvancedGroup({
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
  })
}
