import type { Block } from 'payload'

import { buildDataVizAdvancedGroup, enableAdvancedField } from '../util/advanced-fields'

const isChart = (types: string[]) => {
  return (_: unknown, siblingData: { chartType?: string }) => {
    return Boolean(siblingData?.chartType && types.includes(siblingData.chartType))
  }
}

const columnSelectAdmin = {
  components: {
    Field: '/components/DatasetColumnSelect',
  },
}

export const DataViz: Block = {
  slug: 'dataViz',
  labels: {
    singular: 'Data Visualization',
    plural: 'Data Visualizations',
  },
  fields: [
    {
      name: 'headline',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'dataset',
      type: 'relationship',
      relationTo: 'datasets',
      required: true,
    },
    {
      name: 'viewMode',
      type: 'select',
      defaultValue: 'chart',
      options: [
        { label: 'Chart Only', value: 'chart' },
        { label: 'Table Only', value: 'table' },
        { label: 'Chart + Table', value: 'chartAndTable' },
      ],
    },
    {
      name: 'chartType',
      type: 'select',
      defaultValue: 'bar',
      admin: {
        components: {
          Field: '/components/ChartTypePicker',
        },
      },
      options: [
        { label: 'Bar', value: 'bar' },
        { label: 'Line', value: 'line' },
        { label: 'Area', value: 'area' },
        { label: 'Pie', value: 'pie' },
        { label: 'Donut', value: 'donut' },
        { label: 'Stacked Bar', value: 'stackedBar' },
        { label: 'Grouped Bar', value: 'groupedBar' },
        { label: 'Scatter', value: 'scatter' },
        { label: 'Radar', value: 'radar' },
        { label: 'Heatmap', value: 'heatmap' },
        { label: 'Treemap', value: 'treemap' },
      ],
    },
    {
      name: 'indexBy',
      type: 'text',
      admin: {
        ...columnSelectAdmin,
        condition: isChart(['bar', 'stackedBar', 'groupedBar', 'line', 'area', 'radar', 'pie', 'donut', 'treemap']),
      },
    },
    {
      name: 'valueKeys',
      type: 'array',
      fields: [
        {
          name: 'key',
          type: 'text',
          admin: {
            ...columnSelectAdmin,
          },
        },
      ],
      admin: {
        condition: isChart(['bar', 'stackedBar', 'groupedBar', 'line', 'area', 'radar']),
      },
    },
    {
      name: 'valueKey',
      type: 'text',
      admin: {
        ...columnSelectAdmin,
        condition: isChart(['pie', 'donut', 'treemap', 'heatmap']),
      },
    },
    {
      name: 'xKey',
      type: 'text',
      admin: {
        ...columnSelectAdmin,
        condition: isChart(['scatter', 'heatmap']),
      },
    },
    {
      name: 'yKey',
      type: 'text',
      admin: {
        ...columnSelectAdmin,
        condition: isChart(['scatter', 'heatmap']),
      },
    },
    {
      name: 'seriesKey',
      type: 'text',
      admin: {
        ...columnSelectAdmin,
        condition: isChart(['scatter']),
      },
    },
    {
      name: 'colorScheme',
      type: 'select',
      defaultValue: 'nivo',
      options: [
        { label: 'Nivo', value: 'nivo' },
        { label: 'Category 10', value: 'category10' },
        { label: 'Paired', value: 'paired' },
        { label: 'Set 3', value: 'set3' },
        { label: 'Spectral', value: 'spectral' },
      ],
    },
    {
      name: 'height',
      type: 'number',
      defaultValue: 360,
    },
    {
      name: 'showLegend',
      type: 'checkbox',
      defaultValue: true,
    },
    enableAdvancedField,
    buildDataVizAdvancedGroup(),
  ],
}
