/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { ResponsiveBar } from '@nivo/bar'
import { ResponsiveHeatMap } from '@nivo/heatmap'
import { ResponsiveLine } from '@nivo/line'
import { ResponsivePie } from '@nivo/pie'
import { ResponsiveRadar } from '@nivo/radar'
import { ResponsiveScatterPlot } from '@nivo/scatterplot'
import { ResponsiveTreeMap } from '@nivo/treemap'
import React from 'react'

import type { DatasetColumn } from '../../lib/cms'

type ChartConfig = {
  chartType?: string
  indexBy?: string
  valueKeys?: string[]
  valueKey?: string
  xKey?: string
  yKey?: string
  seriesKey?: string
  colorScheme?: string
  height?: number
  showLegend?: boolean
}

type Dataset = {
  columns?: DatasetColumn[] | null
  rows?: Record<string, unknown>[] | null
}

const toNumber = (value: unknown): number => {
  const num = Number(value)
  return Number.isFinite(num) ? num : 0
}

const toString = (value: unknown): string => {
  if (value === null || value === undefined) return ''
  return String(value)
}

const coerceX = (value: unknown): number | string => {
  const num = Number(value)
  if (Number.isFinite(num)) return num
  return toString(value)
}

export function ChartRenderer({ dataset, config }: { dataset: Dataset; config: ChartConfig }) {
  const rows = dataset.rows ?? []
  if (!rows.length) return null

  const height = config.height ?? 360
  const getColorConfig = (chartType?: string, scheme?: string) => {
    const selected = (scheme ?? 'nivo') as any
    if (chartType === 'heatmap') {
      const safeScheme = scheme === 'spectral' ? 'spectral' : 'blues'
      return { type: 'sequential', scheme: safeScheme } as any
    }
    return { scheme: selected } as any
  }
  const colors = getColorConfig(config.chartType, config.colorScheme)
  const showLegend = config.showLegend !== false

  switch (config.chartType) {
    case 'bar':
    case 'stackedBar':
    case 'groupedBar': {
      if (!config.indexBy || !config.valueKeys?.length) return null
      const data: Array<Record<string, string | number>> = rows.map((row) => {
        const item: Record<string, string | number> = {
          [config.indexBy as string]: toString(row[config.indexBy as string]),
        }
        config.valueKeys?.forEach((key) => {
          item[key] = toNumber(row[key])
        })
        return item
      })

      return (
        <div style={{ height }}>
          <ResponsiveBar
            data={data}
            keys={config.valueKeys ?? []}
            indexBy={config.indexBy}
            margin={{ top: 20, right: 20, bottom: 60, left: 60 }}
            padding={0.3}
            groupMode={config.chartType === 'stackedBar' ? 'stacked' : config.chartType === 'groupedBar' ? 'grouped' : 'stacked'}
            colors={colors}
            axisBottom={{ tickRotation: -20 }}
            axisLeft={{ tickSize: 0, tickPadding: 8 }}
            enableLabel={false}
            legends={
              showLegend
                ? ([
                    {
                      anchor: 'bottom',
                      direction: 'row',
                      translateY: 50,
                      itemWidth: 100,
                      itemHeight: 18,
                      symbolSize: 12,
                    },
                  ] as any)
                : []
            }
          />
        </div>
      )
    }
    case 'line':
    case 'area': {
      if (!config.indexBy || !config.valueKeys?.length) return null
      const series = config.valueKeys.map((key) => ({
        id: key,
        data: rows.map((row) => ({
          x: toString(row[config.indexBy as string]),
          y: toNumber(row[key]),
        })),
      }))

      return (
        <div style={{ height }}>
          <ResponsiveLine
            data={series}
            margin={{ top: 20, right: 20, bottom: 60, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
            colors={colors}
            axisBottom={{ tickRotation: -20 }}
            axisLeft={{ tickSize: 0, tickPadding: 8 }}
            enableArea={config.chartType === 'area'}
            pointSize={6}
            useMesh
            legends={
              showLegend
                ? ([
                    {
                      anchor: 'bottom',
                      direction: 'row',
                      translateY: 50,
                      itemWidth: 100,
                      itemHeight: 18,
                      symbolSize: 12,
                    },
                  ] as any)
                : []
            }
          />
        </div>
      )
    }
    case 'pie':
    case 'donut': {
      if (!config.indexBy || !config.valueKey) return null
      const data = rows.map((row) => ({
        id: toString(row[config.indexBy as string]),
        label: toString(row[config.indexBy as string]),
        value: toNumber(row[config.valueKey as string]),
      }))

      return (
        <div style={{ height }}>
          <ResponsivePie
            data={data}
            innerRadius={config.chartType === 'donut' ? 0.6 : 0}
            padAngle={0.7}
            cornerRadius={3}
            colors={colors}
            margin={{ top: 20, right: 20, bottom: 60, left: 20 }}
            legends={
              showLegend
                ? ([
                    {
                      anchor: 'bottom',
                      direction: 'row',
                      translateY: 50,
                      itemWidth: 100,
                      itemHeight: 18,
                      symbolSize: 12,
                    },
                  ] as any)
                : []
            }
          />
        </div>
      )
    }
    case 'scatter': {
      if (!config.xKey || !config.yKey) return null
      const grouped = new Map<string, { id: string; data: Array<{ x: number | string; y: number }> }>()
      rows.forEach((row) => {
        const seriesId = config.seriesKey ? toString(row[config.seriesKey]) : 'Series'
        const existing = grouped.get(seriesId) ?? { id: seriesId, data: [] }
        existing.data.push({
          x: coerceX(row[config.xKey as string]),
          y: toNumber(row[config.yKey as string]),
        })
        grouped.set(seriesId, existing)
      })

      return (
        <div style={{ height }}>
          <ResponsiveScatterPlot
            data={[...grouped.values()]}
            margin={{ top: 20, right: 20, bottom: 60, left: 60 }}
            colors={colors}
            axisBottom={{ tickRotation: -20 }}
            axisLeft={{ tickSize: 0, tickPadding: 8 }}
            legends={
              showLegend
                ? ([
                    {
                      anchor: 'bottom',
                      direction: 'row',
                      translateY: 50,
                      itemWidth: 100,
                      itemHeight: 18,
                      symbolSize: 12,
                    },
                  ] as any)
                : []
            }
          />
        </div>
      )
    }
    case 'radar': {
      if (!config.indexBy || !config.valueKeys?.length) return null
      const data: Array<Record<string, string | number>> = rows.map((row) => {
        const item: Record<string, string | number> = {
          [config.indexBy as string]: toString(row[config.indexBy as string]),
        }
        config.valueKeys?.forEach((key) => {
          item[key] = toNumber(row[key])
        })
        return item
      })
      return (
        <div style={{ height }}>
          <ResponsiveRadar
            data={data}
            keys={config.valueKeys ?? []}
            indexBy={config.indexBy}
            margin={{ top: 20, right: 60, bottom: 40, left: 60 }}
            colors={colors}
            gridLabelOffset={18}
            legends={
              showLegend
                ? ([
                    {
                      anchor: 'bottom',
                      direction: 'row',
                      translateY: 40,
                      itemWidth: 100,
                      itemHeight: 18,
                      symbolSize: 12,
                    },
                  ] as any)
                : []
            }
          />
        </div>
      )
    }
    case 'heatmap': {
      if (!config.xKey || !config.yKey || !config.valueKey) return null
      const grouped = new Map<string, { id: string; data: Array<{ x: string; y: number }> }>()
      rows.forEach((row) => {
        const rowId = toString(row[config.yKey as string])
        const existing = grouped.get(rowId) ?? { id: rowId, data: [] }
        existing.data.push({
          x: toString(row[config.xKey as string]),
          y: toNumber(row[config.valueKey as string]),
        })
        grouped.set(rowId, existing)
      })
      return (
        <div style={{ height }}>
          <ResponsiveHeatMap
            data={[...grouped.values()]}
            margin={{ top: 20, right: 20, bottom: 60, left: 60 }}
            colors={colors}
            axisBottom={{ tickRotation: -20 }}
            axisLeft={{ tickSize: 0, tickPadding: 8 }}
            legends={
              showLegend
                ? ([
                    {
                      anchor: 'bottom',
                      direction: 'row',
                      translateY: 50,
                      itemWidth: 100,
                      itemHeight: 18,
                      symbolSize: 12,
                    },
                  ] as any)
                : []
            }
          />
        </div>
      )
    }
    case 'treemap': {
      if (!config.indexBy || !config.valueKey) return null
      const data = {
        name: 'root',
        children: rows.map((row) => ({
          name: toString(row[config.indexBy as string]),
          value: toNumber(row[config.valueKey as string]),
        })),
      }
      return (
        <div style={{ height }}>
          <ResponsiveTreeMap
            data={data}
            identity="name"
            value="value"
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            colors={colors}
            labelSkipSize={12}
          />
        </div>
      )
    }
    default:
      return null
  }
}
