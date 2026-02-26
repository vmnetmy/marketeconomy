import type { CollectionBeforeValidateHook } from 'payload'

export const setSeoDefaults =
  (titleField: string): CollectionBeforeValidateHook =>
  ({ data, originalDoc }) => {
    if (!data) return data

    const title = data[titleField] ?? originalDoc?.[titleField]
    if (typeof title !== 'string' || !title.trim()) return data

    const currentSeo = typeof data.seo === 'object' && data.seo ? data.seo : {}
    if (!('metaTitle' in currentSeo) || !currentSeo.metaTitle) {
      currentSeo.metaTitle = title
    }

    data.seo = currentSeo
    return data
  }
