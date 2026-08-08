import { chromium } from 'playwright'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

const failedRequests = []
const allImageRequests = []

page.on('response', (response) => {
  const url = response.url()
  if (/\.(jpe?g|png|webp|gif|svg)(\?|$)/i.test(url)) {
    allImageRequests.push({ url, status: response.status() })
    if (!response.ok()) failedRequests.push({ url, status: response.status() })
  }
})
page.on('requestfailed', (request) => {
  const url = request.url()
  if (/\.(jpe?g|png|webp|gif|svg)(\?|$)/i.test(url)) {
    failedRequests.push({ url, error: request.failure()?.errorText })
  }
})
const consoleErrors = []
page.on('console', (msg) => {
  if (msg.type() === 'error') consoleErrors.push(msg.text())
})
page.on('pageerror', (err) => consoleErrors.push(String(err)))

await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
await page.locator('#about').scrollIntoViewIfNeeded()
await page.waitForTimeout(500)

// Actual rendered <img> elements inside #about, with their resolved src,
// naturalWidth/naturalHeight (0,0 means the browser failed to decode it),
// and complete flag.
const imgInfo = await page.evaluate(() => {
  const section = document.querySelector('#about')
  const imgs = Array.from(section.querySelectorAll('img'))
  return imgs.map((img) => ({
    src: img.src,
    alt: img.alt,
    naturalWidth: img.naturalWidth,
    naturalHeight: img.naturalHeight,
    complete: img.complete,
  }))
})

console.log('--- <img> elements found in #about ---')
console.log(JSON.stringify(imgInfo, null, 2))

console.log('\n--- All image network requests seen ---')
console.log(JSON.stringify(allImageRequests, null, 2))

console.log('\n--- Failed image requests ---')
console.log(JSON.stringify(failedRequests, null, 2))

console.log('\n--- Console/page errors ---')
console.log(JSON.stringify(consoleErrors, null, 2))

await browser.close()
