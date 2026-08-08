// Inspects the xl-breakpoint transition (contained -> viewport-breaking
// composition) at a range of intermediate widths to catch any awkward jump.
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const outDir = fileURLToPath(new URL('../screenshots/sweep/', import.meta.url))
mkdirSync(outDir, { recursive: true })

const widths = [1180, 1240, 1279, 1280, 1320, 1366, 1440]
const browser = await chromium.launch()

for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: 900 } })
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
  const proofBox = await page.locator('a[aria-label*="Setlist"]').boundingBox()
  const overflowsRight = proofBox ? proofBox.x + proofBox.width > width + 1 : null
  console.log(`${width}px: proof box =`, proofBox, 'overflowsViewport:', overflowsRight)
  await page.screenshot({ path: path.join(outDir, `w-${width}.png`) })
  await page.close()
}

await browser.close()
console.log('Saved to', outDir)
