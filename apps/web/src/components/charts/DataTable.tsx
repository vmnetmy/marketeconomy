import type { DatasetColumn } from '../../lib/cms'

type DataTableProps = {
  columns?: DatasetColumn[] | null
  rows?: Record<string, unknown>[] | null
  rowCount?: number | null
  isTruncated?: boolean | null
}

const formatCell = (value: unknown): string => {
  if (value === null || value === undefined) return ''
  if (typeof value === 'number') return value.toLocaleString()
  return String(value)
}

export function DataTable({ columns, rows, rowCount, isTruncated }: DataTableProps) {
  if (!columns?.length || !rows?.length) return null
  const displayRows = rows
  const count = rowCount ?? rows.length

  return (
    <div className="space-y-3">
      <div className="overflow-x-auto rounded-2xl border border-slate-200">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              {columns.map((column) => (
                <th key={column.key ?? column.label} className="px-4 py-3 text-left font-semibold text-slate-600">
                  {column.label ?? column.key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {displayRows.map((row, index) => (
              <tr key={`row-${index}`}>
                {columns.map((column) => (
                  <td key={`${column.key ?? column.label}-${index}`} className="px-4 py-3 text-slate-700">
                    {formatCell(row[column.key ?? ''])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-500">
        Showing {rows.length} of {count} rows{isTruncated ? ' (dataset truncated).' : '.'}
      </p>
    </div>
  )
}
