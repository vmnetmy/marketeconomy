import type { CollectionBeforeValidateHook } from 'payload'

import { slugify } from '../util/slugify'

export const formatSlug =
  (sourceField: string): CollectionBeforeValidateHook =>
  ({ data, originalDoc }) => {
    if (!data) return data

    const current = typeof data.slug === 'string' ? data.slug : ''
    if (current.trim()) {
      data.slug = slugify(current)
      return data
    }

    const source = data[sourceField] ?? originalDoc?.[sourceField]
    if (typeof source === 'string' && source.trim()) {
      data.slug = slugify(source)
    }

    return data
  }
