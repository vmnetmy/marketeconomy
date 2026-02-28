import type { Field } from 'payload'

import { buildAdvancedGroup } from './common'

export function buildPricingAdvancedGroup(): Field {
  return buildAdvancedGroup({ anchorPlaceholder: 'e.g. pricing' })
}
