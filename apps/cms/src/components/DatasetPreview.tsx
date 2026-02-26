'use client'

import React from 'react'
import { useFormFields } from '@payloadcms/ui'

const MAX_PREVIEW_ROWS = 10

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '0.85rem',
}

const cellStyle: React.CSSProperties = {
  border: '1px solid var(--theme-elevation-150)',
  padding: '0.4rem 0.6rem',
  textAlign: 'left',
  verticalAlign: 'top',
}

export default function DatasetPreview() {
  const { columns, rows, isTruncated, rowCount, parseError } = useFormFields(([fields]) => {
    const columnsValue = (fields?.columns?.value as { key?: string; label?: string }[]) ?? []
    const rowsValue = (fields?.rows?.value as Record<string, unknown>[]) ?? []
    const isTruncatedValue = Boolean(fields?.isTruncated?.value)
    const rowCountValue = Number(fields?.rowCount?.value ?? rowsValue.length)
    const parseErrorValue = fields?.parseError?.value as string | undefined
    return {
      columns: columnsValue,
      rows: rowsValue,
      isTruncated: isTruncatedValue,
      rowCount: rowCountValue,
      parseError: parseErrorValue,
    }
  })

  if (parseError) {
    return <p style={{ color: 'var(--theme-error-500)' }}>{parseError}</p>
  }

  if (!columns.length || !rows.length) {
    return <p style={{ color: 'var(--theme-elevation-450)' }}>No data parsed yet.</p>
  }

  const previewRows = rows.slice(0, MAX_PREVIEW_ROWS)

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={tableStyle}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key ?? column.label} style={cellStyle}>
                {column.label ?? column.key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {previewRows.map((row, index) => (
            <tr key={`row-${index}`}>
              {columns.map((column) => (
                <td key={`${column.key ?? column.label}-${index}`} style={cellStyle}>
                  {row[column.key ?? ''] ?? ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ marginTop: '0.5rem', color: 'var(--theme-elevation-450)' }}>
        Showing {Math.min(MAX_PREVIEW_ROWS, rows.length)} of {rowCount} rows
        {isTruncated ? ' (dataset truncated).' : '.'}
      </p>
    </div>
  )
}
