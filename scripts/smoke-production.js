const { createRequire } = require('module')
const fs = require('fs')
const path = require('path')

const requireFromCms = createRequire(path.resolve(__dirname, '../apps/cms/package.json'))
let chromium
try {
  ;({ chromium } = require('playwright'))
} catch {
  try {
    ;({ chromium } = requireFromCms('@playwright/test'))
  } catch {
    ;({ chromium } = requireFromCms('playwright'))
  }
}

const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
const outDir = path.resolve(__dirname, '..', 'smoke-results', `marketeconomy-${timestamp}`)
fs.mkdirSync(outDir, { recursive: true })

const pages = [
  {
    name: 'web-desktop',
    url: 'https://marketeconomy.org/',
    viewport: { width: 1440, height: 1000 },
    screenshot: 'web-desktop.png',
  },
  {
    name: 'web-mobile',
    url: 'https://marketeconomy.org/',
    viewport: { width: 390, height: 844 },
    screenshot: 'web-mobile.png',
  },
  {
    name: 'cms-admin-desktop',
    url: 'https://cms.marketeconomy.org/admin',
    viewport: { width: 1440, height: 1000 },
    screenshot: 'cms-admin-desktop.png',
  },
]

const apiChecks = [
  'https://marketeconomy.org/',
  'https://www.marketeconomy.org/',
  'https://marketeconomy.org/about',
  'https://marketeconomy.org/events',
  'https://marketeconomy.org/publications',
  'https://marketeconomy.org/in-the-news',
  'https://marketeconomy.org/contact',
  'https://cms.marketeconomy.org/admin',
  'https://cms.marketeconomy.org/api/pages?limit=1',
  'https://cms.marketeconomy.org/api/events?limit=1',
]

const interestingRequest = (url) => {
  if (url.startsWith('data:')) return false
  if (url.includes('googletagmanager.com')) return false
  if (url.includes('google-analytics.com')) return false
  if (url.includes('fonts.googleapis.com')) return false
  if (url.includes('fonts.gstatic.com')) return false
  return true
}

const ignoredRequestFailure = (request) => {
  const failure = request.failure()
  if (!failure || failure.errorText !== 'net::ERR_ABORTED') return false

  const url = request.url()
  return url.includes('_rsc=') || /\.(mp4|webm|mov)(?:[?#]|$)/i.test(url)
}

async function inspectPage(browser, spec) {
  const context = await browser.newContext({
    viewport: spec.viewport,
    deviceScaleFactor: spec.name.includes('mobile') ? 2 : 1,
    isMobile: spec.name.includes('mobile'),
    hasTouch: spec.name.includes('mobile'),
  })
  const page = await context.newPage()
  const consoleErrors = []
  const pageErrors = []
  const failedRequests = []
  const badResponses = []

  page.on('console', (message) => {
    if (['error', 'warning'].includes(message.type())) {
      consoleErrors.push({ type: message.type(), text: message.text() })
    }
  })
  page.on('pageerror', (error) => pageErrors.push(error.message))
  page.on('requestfailed', (request) => {
    if (ignoredRequestFailure(request)) return
    if (interestingRequest(request.url())) {
      failedRequests.push({
        url: request.url(),
        failure: request.failure() && request.failure().errorText,
      })
    }
  })
  page.on('response', (response) => {
    if (response.status() >= 400 && interestingRequest(response.url())) {
      badResponses.push({ status: response.status(), url: response.url() })
    }
  })

  const response = await page.goto(spec.url, { waitUntil: 'domcontentloaded', timeout: 45000 })
  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {})

  const metrics = await page.evaluate(() => {
    const body = document.body
    const bodyRect = body ? body.getBoundingClientRect() : { width: 0, height: 0 }
    const visibleText = body ? body.innerText.replace(/\s+/g, ' ').trim() : ''
    const images = Array.from(document.images).map((image) => ({
      src: image.currentSrc || image.src,
      width: image.naturalWidth,
      height: image.naturalHeight,
      renderedWidth: Math.round(image.getBoundingClientRect().width),
      renderedHeight: Math.round(image.getBoundingClientRect().height),
      complete: image.complete,
    }))
    const links = Array.from(document.querySelectorAll('a[href]'))
      .slice(0, 20)
      .map((link) => ({
        text: link.textContent.replace(/\s+/g, ' ').trim().slice(0, 80),
        href: link.href,
      }))
    const h1 = Array.from(document.querySelectorAll('h1'))
      .map((node) => node.textContent.replace(/\s+/g, ' ').trim())
      .filter(Boolean)
    return {
      title: document.title,
      url: location.href,
      bodyWidth: Math.round(bodyRect.width),
      bodyHeight: Math.round(bodyRect.height),
      textLength: visibleText.length,
      textSample: visibleText.slice(0, 240),
      h1,
      imageCount: images.length,
      brokenImages: images.filter((image) => image.complete && (image.width === 0 || image.height === 0)),
      links,
    }
  })

  const screenshotPath = path.join(outDir, spec.screenshot)
  await page.screenshot({ path: screenshotPath, fullPage: true })
  await context.close()

  return {
    name: spec.name,
    url: spec.url,
    status: response && response.status(),
    screenshot: screenshotPath,
    metrics,
    consoleErrors,
    pageErrors,
    failedRequests,
    badResponses,
  }
}

async function run() {
  const browser = await chromium.launch()
  const results = []

  for (const spec of pages) {
    results.push(await inspectPage(browser, spec))
  }

  const requestContext = await browser.newContext()
  const apiResults = []
  for (const url of apiChecks) {
    const response = await requestContext.request.get(url, { timeout: 30000 })
    const contentType = response.headers()['content-type'] || ''
    let bodySample = ''
    try {
      bodySample = (await response.text()).slice(0, 300)
    } catch {
      bodySample = ''
    }
    apiResults.push({
      url,
      status: response.status(),
      contentType,
      bodySample: bodySample.replace(/\s+/g, ' ').trim(),
    })
  }
  await requestContext.close()
  await browser.close()

  const report = {
    generatedAt: new Date().toISOString(),
    outDir,
    pageResults: results,
    apiResults,
  }

  const failures = []
  for (const result of results) {
    if (!result.status || result.status >= 400) failures.push(`${result.name} returned ${result.status}`)
    if (result.metrics.brokenImages.length > 0) failures.push(`${result.name} has ${result.metrics.brokenImages.length} broken image(s)`)
    if (result.consoleErrors.length > 0) failures.push(`${result.name} has ${result.consoleErrors.length} console error/warning(s)`)
    if (result.pageErrors.length > 0) failures.push(`${result.name} has ${result.pageErrors.length} page error(s)`)
    if (result.failedRequests.length > 0) failures.push(`${result.name} has ${result.failedRequests.length} failed request(s)`)
    if (result.badResponses.length > 0) failures.push(`${result.name} has ${result.badResponses.length} bad response(s)`)
  }

  for (const result of apiResults) {
    if (result.status >= 400) failures.push(`${result.url} returned ${result.status}`)
  }

  const reportPath = path.join(outDir, 'report.json')
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))

  console.log(JSON.stringify({
    reportPath,
    screenshots: results.map((result) => result.screenshot),
    apiResults,
    summary: results.map((result) => ({
      name: result.name,
      status: result.status,
      title: result.metrics.title,
      h1: result.metrics.h1,
      textLength: result.metrics.textLength,
      imageCount: result.metrics.imageCount,
      brokenImages: result.metrics.brokenImages.length,
      consoleErrors: result.consoleErrors.length,
      pageErrors: result.pageErrors.length,
      failedRequests: result.failedRequests.length,
      badResponses: result.badResponses.length,
    })),
    failures,
  }, null, 2))

  if (failures.length > 0) {
    process.exitCode = 1
  }
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
