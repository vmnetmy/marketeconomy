import fs from 'fs/promises'
import path from 'path'
import Papa from 'papaparse'
import * as XLSX from 'xlsx'

export type DatasetColumn = {
  key: string
  label: string
  type: 'string' | 'number' | 'date'
}

export type ParsedDataset = {
  columns: DatasetColumn[]
  rows: Record<string, unknown>[]
  rowCount: number
  isTruncated: boolean
  parseError?: string
}

const MAX_SAMPLE_ROWS = 50

const isEmpty = (value: unknown): boolean => {
  if (value === null || value === undefined) return true
  return String(value).trim() === ''
}

const isNumeric = (value: unknown): boolean => {
  if (isEmpty(value)) return false
  return Number.isFinite(Number(value))
}

const isDateValue = (value: unknown): boolean => {
  if (isEmpty(value)) return false
  if (isNumeric(value)) return false
  if (value instanceof Date) return !Number.isNaN(value.getTime())
  const parsed = Date.parse(String(value))
  return !Number.isNaN(parsed)
}

const toCamel = (value: string): string => {
  const cleaned = value
    .trim()
    .replace(/[_\-]+/g, ' ')
    .replace(/[^a-zA-Z0-9 ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  if (!cleaned) return 'column'
  const parts = cleaned.split(' ')
  const [first, ...rest] = parts
  return (
    first.toLowerCase() +
    rest.map((part) => (part ? part[0].toUpperCase() + part.slice(1).toLowerCase() : '')).join('')
  )
}

const normalizeHeaders = (labels: string[]): { labels: string[]; keys: string[] } => {
  const used = new Map<string, number>()
  const normalizedLabels: string[] = []
  const keys: string[] = []

  labels.forEach((label, index) => {
    const safeLabel = label && String(label).trim() ? String(label).trim() : `Column ${index + 1}`
    let key = toCamel(safeLabel)
    if (/^\d/.test(key)) key = `col${key}`
    const count = used.get(key) ?? 0
    used.set(key, count + 1)
    if (count > 0) key = `${key}${count + 1}`
    normalizedLabels.push(safeLabel)
    keys.push(key)
  })

  return { labels: normalizedLabels, keys }
}

const inferTypes = (rows: Record<string, unknown>[], labels: string[]): DatasetColumn['type'][] => {
  const sample = rows.slice(0, MAX_SAMPLE_ROWS)
  return labels.map((label) => {
    const values = sample.map((row) => row[label]).filter((value) => !isEmpty(value))
    if (values.length === 0) return 'string'
    if (values.every((value) => isNumeric(value))) return 'number'
    if (values.every((value) => isDateValue(value))) return 'date'
    return 'string'
  })
}

const coerceValue = (value: unknown, type: DatasetColumn['type']): string | number | null => {
  if (isEmpty(value)) return null
  if (type === 'number') {
    const num = Number(value)
    return Number.isFinite(num) ? num : null
  }
  if (type === 'date') {
    const date = value instanceof Date ? value : new Date(String(value))
    return Number.isNaN(date.getTime()) ? null : date.toISOString()
  }
  return String(value)
}

export async function parseDataset(filePath: string, maxRows = 2000): Promise<ParsedDataset> {
  try {
    const extension = path.extname(filePath).toLowerCase()
    let rawRows: Record<string, unknown>[] = []
    let headerLabels: string[] = []

    if (extension === '.csv') {
      const contents = await fs.readFile(filePath, 'utf8')
      const parsed = Papa.parse<Record<string, unknown>>(contents, {
        header: true,
        skipEmptyLines: true,
      })
      if (parsed.errors?.length) {
        return {
          columns: [],
          rows: [],
          rowCount: 0,
          isTruncated: false,
          parseError: parsed.errors[0]?.message ?? 'Failed to parse CSV.',
        }
      }
      rawRows = parsed.data ?? []
      headerLabels = parsed.meta.fields ?? Object.keys(rawRows[0] ?? {})
    } else if (extension === '.xlsx' || extension === '.xls') {
      const workbook = XLSX.readFile(filePath, { cellDates: false })
      const sheetName = workbook.SheetNames[0]
      if (!sheetName) {
        return {
          columns: [],
          rows: [],
          rowCount: 0,
          isTruncated: false,
          parseError: 'No sheets found in XLSX file.',
        }
      }
      const sheet = workbook.Sheets[sheetName]
      rawRows = XLSX.utils.sheet_to_json(sheet, { defval: '' }) as Record<string, unknown>[]
      headerLabels = Object.keys(rawRows[0] ?? {})
    } else {
      return {
        columns: [],
        rows: [],
        rowCount: 0,
        isTruncated: false,
        parseError: 'Unsupported file type.',
      }
    }

    if (rawRows.length === 0) {
      return {
        columns: [],
        rows: [],
        rowCount: 0,
        isTruncated: false,
      }
    }

    const { labels, keys } = normalizeHeaders(headerLabels)
    const types = inferTypes(rawRows, headerLabels)
    const columns: DatasetColumn[] = labels.map((label, index) => ({
      key: keys[index],
      label,
      type: types[index],
    }))

    const totalRows = rawRows.length
    const limitedRows = rawRows.slice(0, maxRows)
    const rows = limitedRows.map((row) => {
      const normalized: Record<string, unknown> = {}
      headerLabels.forEach((label, index) => {
        normalized[keys[index]] = coerceValue(row[label], types[index])
      })
      return normalized
    })

    return {
      columns,
      rows,
      rowCount: totalRows,
      isTruncated: totalRows > maxRows,
    }
  } catch (error) {
    return {
      columns: [],
      rows: [],
      rowCount: 0,
      isTruncated: false,
      parseError: error instanceof Error ? error.message : 'Failed to parse dataset.',
    }
  }
}
