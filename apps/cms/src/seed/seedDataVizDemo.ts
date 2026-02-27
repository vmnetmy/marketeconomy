import 'dotenv/config'

import fs from 'fs/promises'
import path from 'path'
import { getPayload } from 'payload'

import config from '../payload.config'

type LexicalEditorState = {
  root: {
    type: 'root'
    children: Array<{
      type: 'paragraph'
      children: Array<{
        type: 'text'
        text: string
        detail: number
        format: number
        mode: 'normal'
        style: string
        version: number
      }>
      direction: 'ltr'
      format: string
      indent: number
      version: number
    }>
    direction: 'ltr'
    format: string
    indent: number
    version: number
  }
}

const makeRichText = (paragraphs: string[]): LexicalEditorState => ({
  root: {
    type: 'root',
    children: paragraphs.map((text) => ({
      type: 'paragraph',
      children: [
        {
          type: 'text',
          text,
          detail: 0,
          format: 0,
          mode: 'normal',
          style: '',
          version: 1,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    })),
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  },
})

const seedDir = path.resolve(process.cwd(), 'src', 'seed', 'data')

const datasets = [
  {
    title: 'Macro Indicators',
    slug: 'macro-indicators',
    description: 'Macro indicators by year for demo charts.',
    filePath: path.join(seedDir, 'macro-indicators.csv'),
  },
  {
    title: 'Regional Matrix',
    slug: 'regional-matrix',
    description: 'Regional matrix values for heatmap and scatter demos.',
    filePath: path.join(seedDir, 'regional-matrix.csv'),
  },
]

const getMimeType = (filePath: string): string => {
  const ext = path.extname(filePath).toLowerCase()
  if (ext === '.csv') return 'text/csv'
  if (ext === '.xlsx') return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  if (ext === '.xls') return 'application/vnd.ms-excel'
  return 'application/octet-stream'
}

const loadFile = async (filePath: string) => {
  const data = await fs.readFile(filePath)
  const stat = await fs.stat(filePath)
  return {
    name: path.basename(filePath),
    data,
    mimetype: getMimeType(filePath),
    size: stat.size,
  }
}

const upsertDataset = async (payload: Awaited<ReturnType<typeof getPayload>>, dataset: (typeof datasets)[number]) => {
  const existing = await payload.find({
    collection: 'datasets',
    where: { slug: { equals: dataset.slug } },
    limit: 1,
  })

  const file = await loadFile(dataset.filePath)
  const data = {
    title: dataset.title,
    slug: dataset.slug,
    description: dataset.description,
    _status: 'published' as const,
  }

  if (existing.docs[0]) {
    return payload.update({
      collection: 'datasets',
      id: existing.docs[0].id,
      data,
      file,
      overwriteExistingFiles: true,
    })
  }

  return payload.create({
    collection: 'datasets',
    data,
    file,
  })
}

const upsertPage = async (
  payload: Awaited<ReturnType<typeof getPayload>>,
  data: { title: string; slug: string; layout: unknown[] },
) => {
  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: data.slug } },
    limit: 1,
  })

  if (existing.docs[0]) {
    return payload.update({
      collection: 'pages',
      id: existing.docs[0].id,
      data: { ...data, _status: 'published' as const } as any,
    })
  }

  return payload.create({
    collection: 'pages',
    data: { ...data, _status: 'published' as const } as any,
  })
}

const upsertPost = async (
  payload: Awaited<ReturnType<typeof getPayload>>,
  data: { title: string; slug: string; excerpt?: string; content?: LexicalEditorState; layout: unknown[] },
) => {
  const existing = await payload.find({
    collection: 'posts',
    where: { slug: { equals: data.slug } },
    limit: 1,
  })

  if (existing.docs[0]) {
    return payload.update({
      collection: 'posts',
      id: existing.docs[0].id,
      data: { ...data, _status: 'published' as const } as any,
    })
  }

  return payload.create({
    collection: 'posts',
    data: { ...data, _status: 'published' as const } as any,
  })
}

const run = async () => {
  const payload = await getPayload({ config })

  const datasetDocs = await Promise.all(datasets.map((dataset) => upsertDataset(payload, dataset)))
  const macroDataset = datasetDocs.find((doc) => doc.slug === 'macro-indicators')
  const regionalDataset = datasetDocs.find((doc) => doc.slug === 'regional-matrix')

  if (!macroDataset || !regionalDataset) {
    throw new Error('Dataset creation failed.')
  }

  const chartBlocks = [
    {
      blockType: 'dataViz',
      headline: 'Bar Chart: GDP vs Trade Balance',
      description: 'Bar chart with yearly GDP growth and trade balance.',
      dataset: macroDataset.id,
      viewMode: 'chartAndTable',
      chartType: 'bar',
      indexBy: 'year',
      valueKeys: [{ key: 'gdpGrowth' }, { key: 'tradeBalance' }],
      colorScheme: 'paired',
      height: 360,
      showLegend: true,
    },
    {
      blockType: 'dataViz',
      headline: 'Stacked Bar: Macro Indicators',
      description: 'Stacked bar comparing multiple indicators.',
      dataset: macroDataset.id,
      viewMode: 'chartAndTable',
      chartType: 'stackedBar',
      indexBy: 'year',
      valueKeys: [{ key: 'gdpGrowth' }, { key: 'inflationRate' }, { key: 'tradeBalance' }],
      colorScheme: 'set3',
      height: 360,
      showLegend: true,
    },
    {
      blockType: 'dataViz',
      headline: 'Grouped Bar: Growth vs Sentiment',
      description: 'Grouped bar comparing GDP growth and market sentiment.',
      dataset: macroDataset.id,
      viewMode: 'chartAndTable',
      chartType: 'groupedBar',
      indexBy: 'year',
      valueKeys: [{ key: 'gdpGrowth' }, { key: 'marketSentiment' }],
      colorScheme: 'spectral',
      height: 360,
      showLegend: true,
    },
    {
      blockType: 'dataViz',
      headline: 'Line Chart: GDP & Inflation',
      description: 'Line chart to show GDP growth and inflation over time.',
      dataset: macroDataset.id,
      viewMode: 'chartAndTable',
      chartType: 'line',
      indexBy: 'year',
      valueKeys: [{ key: 'gdpGrowth' }, { key: 'inflationRate' }],
      colorScheme: 'category10',
      height: 360,
      showLegend: true,
    },
    {
      blockType: 'dataViz',
      headline: 'Area Chart: Trade Balance Trend',
      description: 'Area chart with trade balance by year.',
      dataset: macroDataset.id,
      viewMode: 'chartAndTable',
      chartType: 'area',
      indexBy: 'year',
      valueKeys: [{ key: 'tradeBalance' }],
      colorScheme: 'nivo',
      height: 360,
      showLegend: false,
    },
    {
      blockType: 'dataViz',
      headline: 'Pie Chart: GDP Growth Share',
      description: 'Pie chart showing GDP growth distribution by year.',
      dataset: macroDataset.id,
      viewMode: 'chartAndTable',
      chartType: 'pie',
      indexBy: 'year',
      valueKey: 'gdpGrowth',
      colorScheme: 'paired',
      height: 360,
      showLegend: true,
    },
    {
      blockType: 'dataViz',
      headline: 'Donut Chart: Trade Balance Share',
      description: 'Donut chart showing trade balance distribution by year.',
      dataset: macroDataset.id,
      viewMode: 'chartAndTable',
      chartType: 'donut',
      indexBy: 'year',
      valueKey: 'tradeBalance',
      colorScheme: 'set3',
      height: 360,
      showLegend: true,
    },
    {
      blockType: 'dataViz',
      headline: 'Radar Chart: Indicator Mix',
      description: 'Radar chart comparing indicators per year.',
      dataset: macroDataset.id,
      viewMode: 'chartAndTable',
      chartType: 'radar',
      indexBy: 'year',
      valueKeys: [{ key: 'gdpGrowth' }, { key: 'inflationRate' }, { key: 'tradeBalance' }],
      colorScheme: 'spectral',
      height: 360,
      showLegend: true,
    },
    {
      blockType: 'dataViz',
      headline: 'Treemap: Market Sentiment',
      description: 'Treemap showing market sentiment by year.',
      dataset: macroDataset.id,
      viewMode: 'chartAndTable',
      chartType: 'treemap',
      indexBy: 'year',
      valueKey: 'marketSentiment',
      colorScheme: 'nivo',
      height: 360,
      showLegend: false,
    },
    {
      blockType: 'dataViz',
      headline: 'Scatter Plot: Value A vs Value B',
      description: 'Scatter plot comparing Value A and Value B by region.',
      dataset: regionalDataset.id,
      viewMode: 'chartAndTable',
      chartType: 'scatter',
      xKey: 'valueA',
      yKey: 'valueB',
      seriesKey: 'region',
      colorScheme: 'category10',
      height: 360,
      showLegend: true,
    },
    {
      blockType: 'dataViz',
      headline: 'Heatmap: Value A by Region and Year',
      description: 'Heatmap showing Value A intensity across regions and years.',
      dataset: regionalDataset.id,
      viewMode: 'chartAndTable',
      chartType: 'heatmap',
      xKey: 'year',
      yKey: 'region',
      valueKey: 'valueA',
      colorScheme: 'spectral',
      height: 360,
      showLegend: false,
    },
  ]

  await upsertPage(payload, {
    title: 'Data Insights',
    slug: 'data-insights',
    layout: [
      {
        blockType: 'hero',
        headline: 'Data Insights Showcase',
        subheadline: 'Demonstration of CSV/XLSX-driven tables and interactive charts.',
        alignment: 'left',
      },
      ...chartBlocks,
    ],
  })

  await upsertPost(payload, {
    title: 'Chart Showcase',
    slug: 'chart-showcase',
    excerpt: 'A demo post showing all chart types with their underlying tables.',
    content: makeRichText([
      'This post demonstrates the new data visualization module. Each chart is backed by a CSV dataset and can render both a chart and its data table.',
      'Editors can switch chart types and map dataset columns directly inside the CMS.',
    ]),
    layout: chartBlocks,
  })
}

run()
  .then(() => {
    console.log('Seeded DataViz demo page and post.')
    process.exit(0)
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
