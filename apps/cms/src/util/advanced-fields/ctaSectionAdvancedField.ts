import type { Field } from 'payload'

import { buildAdvancedGroup } from './common'

export function buildCTASectionAdvancedGroup(): Field {
  return buildAdvancedGroup({ anchorPlaceholder: 'e.g. cta' })
}
