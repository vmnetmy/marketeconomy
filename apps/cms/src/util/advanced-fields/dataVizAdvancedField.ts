import type { Field } from 'payload'

import { buildAdvancedGroup } from './common'

export function buildDataVizAdvancedGroup(): Field {
  return buildAdvancedGroup({
    anchorPlaceholder: 'e.g. data-viz',
    extraFields: [
      {
        name: 'panelStyle',
        type: 'select',
        defaultValue: 'none',
        options: [
          { label: 'None', value: 'none' },
          { label: 'Soft', value: 'soft' },
          { label: 'Card', value: 'card' },
        ],
      },
    ],
  })
}
