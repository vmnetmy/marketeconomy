import type { CMSBlock, DatasetDoc } from '../../lib/cms'

import { ChartRenderer } from '../charts/ChartRenderer'
import { DataTable } from '../charts/DataTable'
import { SectionWrapper } from '../layout/SectionWrapper'

type DataVizBlock = CMSBlock & {
  headline?: string
  description?: string
  dataset?: DatasetDoc | string | null
  viewMode?: 'chart' | 'table' | 'chartAndTable'
  chartType?: string
  indexBy?: string
  valueKeys?: Array<{ key?: string | null }> | string[]
  valueKey?: string
  xKey?: string
  yKey?: string
  seriesKey?: string
  colorScheme?: string
  height?: number
  showLegend?: boolean
}

export function DataVizBlock({ block }: { block: DataVizBlock }) {
  const dataset = typeof block.dataset === 'object' ? block.dataset : null
  if (!dataset) return null

  const valueKeys = Array.isArray(block.valueKeys)
    ? block.valueKeys
        .map((item) => (typeof item === 'string' ? item : item?.key ?? null))
        .filter((key): key is string => Boolean(key))
    : []

  const viewMode = block.viewMode ?? 'chart'
  const showChart = viewMode === 'chart' || viewMode === 'chartAndTable'
  const showTable = viewMode === 'table' || viewMode === 'chartAndTable'

  return (
    <SectionWrapper>
      <section className="space-y-6">
        {(block.headline || block.description) && (
          <div>
            {block.headline ? <h2 className="text-2xl font-semibold">{block.headline}</h2> : null}
            {block.description ? <p className="mt-2 text-slate-600">{block.description}</p> : null}
          </div>
        )}
        {showChart ? (
          <ChartRenderer
            dataset={dataset}
            config={{
              chartType: block.chartType,
              indexBy: block.indexBy,
              valueKeys,
              valueKey: block.valueKey,
              xKey: block.xKey,
              yKey: block.yKey,
              seriesKey: block.seriesKey,
              colorScheme: block.colorScheme,
              height: block.height,
              showLegend: block.showLegend,
            }}
          />
        ) : null}
        {showTable ? (
          <DataTable
            columns={dataset.columns}
            rows={dataset.rows}
            rowCount={dataset.rowCount}
            isTruncated={dataset.isTruncated}
          />
        ) : null}
      </section>
    </SectionWrapper>
  )
}
