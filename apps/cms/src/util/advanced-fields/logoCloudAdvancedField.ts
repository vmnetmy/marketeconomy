import type { Field } from 'payload'

import { buildAdvancedGroup } from './common'

export function buildLogoCloudAdvancedGroup(): Field {
  return buildAdvancedGroup({ anchorPlaceholder: 'e.g. partners' })
}
