// One-off verification: captures the hero at two different pointer
// positions, at both 1440 and 1024, to confirm the light visibly drifts.
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const outDir = fileURLToPath(new URL('../screenshots/', import.meta.url))
mkdirSync(outDir, { recursive: true })

const browser = await chromium.launch()

for (const [label, viewport] of [
  ['1440', { width: 1440, height: 900 }],
  ['1024', { width: 1024, height: 900 }],
]) {
  const page = await browser.newPage({ viewport })
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })

  // Position A: near the default anchor (lower-left, near the text).
  await page.mouse.move(viewport.width * 0.15, viewport.height * 0.85, { steps: 10 })
  await page.waitForTimeout(1100) // let the 0.9s eased transition settle
  await page.screenshot({ path: path.join(outDir, `light-${label}-a.png`) })

  // Position B: far side of the frame, upper-right.
  await page.mouse.move(viewport.width * 0.85, viewport.height * 0.15, { steps: 10 })
  await page.waitForTimeout(1100)
  await page.screenshot({ path: path.join(outDir, `light-${label}-b.png`) })

  await page.close()
}

await browser.close()
console.log('Saved to', outDir)
