import type { Field } from 'payload'

import { buildAdvancedGroup } from './common'

export function buildContentListAdvancedGroup(): Field {
  return buildAdvancedGroup({ anchorPlaceholder: 'e.g. latest-updates' })
}
