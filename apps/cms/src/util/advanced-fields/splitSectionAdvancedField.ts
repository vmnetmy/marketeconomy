import type { Field } from 'payload'

import { buildAdvancedGroup } from './common'

export function buildSplitSectionAdvancedGroup(): Field {
  return buildAdvancedGroup({
    anchorPlaceholder: 'e.g. mission',
    extraFields: [
      {
        name: 'imageSize',
        type: 'select',
        defaultValue: 'medium',
        options: [
          { label: 'Small', value: 'small' },
          { label: 'Medium', value: 'medium' },
          { label: 'Large', value: 'large' },
        ],
      },
      {
        name: 'reverseOnMobile',
        type: 'checkbox',
        defaultValue: false,
      },
    ],
  })
}
