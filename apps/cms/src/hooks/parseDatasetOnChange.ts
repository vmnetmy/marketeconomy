import path from 'path'
import type { CollectionAfterChangeHook } from 'payload'

import { DATASET_UPLOAD_DIR } from '../util/datasetPaths'
import { parseDataset } from '../util/parseDataset'

export const parseDatasetOnChange: CollectionAfterChangeHook = async ({ doc, previousDoc, req }) => {
  if (req.context?.skipDatasetParse) return doc

  const filename = doc?.filename
  if (!filename) return doc

  const fileChanged = previousDoc?.filename !== filename
  const hasRows = Array.isArray(doc?.rows) && doc.rows.length > 0
  if (!fileChanged && hasRows) return doc

  const filePath = path.join(DATASET_UPLOAD_DIR, filename)
  const parsed = await parseDataset(filePath)

  await req.payload.update({
    collection: 'datasets',
    id: doc.id,
    data: {
      columns: parsed.columns,
      rows: parsed.rows,
      rowCount: parsed.rowCount,
      isTruncated: parsed.isTruncated,
      parseError: parsed.parseError ?? null,
    },
    req: {
      ...req,
      context: {
        ...req.context,
        skipDatasetParse: true,
      },
    },
  })

  return doc
}
