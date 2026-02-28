import type { Field } from 'payload'

import { buildAdvancedGroup } from './common'

export function buildHeroAdvancedGroup(): Field {
  return buildAdvancedGroup({
    includeBackground: false,
    includeWidth: false,
    anchorPlaceholder: 'e.g. hero',
    extraFields: [
      {
        name: 'tone',
        type: 'select',
        defaultValue: 'dark',
        options: [
          { label: 'Dark', value: 'dark' },
          { label: 'Light', value: 'light' },
        ],
      },
      {
        name: 'minHeight',
        type: 'select',
        defaultValue: 'large',
        options: [
          { label: 'Short', value: 'short' },
          { label: 'Medium', value: 'medium' },
          { label: 'Large', value: 'large' },
        ],
      },
      {
        name: 'overlayStrength',
        type: 'select',
        defaultValue: 'medium',
        options: [
          { label: 'Light', value: 'light' },
          { label: 'Medium', value: 'medium' },
          { label: 'Strong', value: 'strong' },
        ],
      },
    ],
  })
}
