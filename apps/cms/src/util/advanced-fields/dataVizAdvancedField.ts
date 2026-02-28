import type { Field } from 'payload'

import { buildAdvancedGroup } from './common'

export function buildDataVizAdvancedGroup(): Field {
  return buildAdvancedGroup({ anchorPlaceholder: 'e.g. data-viz' })
}
