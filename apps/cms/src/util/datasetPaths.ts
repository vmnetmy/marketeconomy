import path from 'path'

const defaultUploadRoot =
  process.env.NODE_ENV === 'production'
    ? '/srv/apps/marketeconomy/shared/uploads'
    : path.resolve(process.cwd(), 'uploads')

export const DATASET_UPLOAD_DIR =
  process.env.DATASET_UPLOAD_DIR || path.resolve(defaultUploadRoot, 'datasets')
