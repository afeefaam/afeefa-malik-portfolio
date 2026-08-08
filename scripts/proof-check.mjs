import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const outDir = fileURLToPath(new URL('../screenshots/', import.meta.url))
mkdirSync(outDir, { recursive: true })

const browser = await chromium.launch()

// 1) Hover near one corner of the proof — confirm visible tilt + shadow.
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
  const box = await page.locator('a[aria-label*="Setlist"]').boundingBox()
  await page.mouse.move(box.x + box.width * 0.12, box.y + box.height * 0.12, { steps: 15 })
  await page.waitForTimeout(500)
  await page.screenshot({ path: path.join(outDir, 'proof-hover-tilt.png') })
  await page.close()
}

// 2) Keyboard focus — tab until the proof link is focused, confirm focus tilt
//    + visible focus ring, then press Enter and confirm it navigates.
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
  let focused = ''
  for (let i = 0; i < 15 && !focused.includes('Setlist'); i++) {
    await page.keyboard.press('Tab')
    focused = await page.evaluate(() => document.activeElement?.getAttribute('aria-label') ?? '')
  }
  console.log('Focused element aria-label:', focused)
  await page.waitForTimeout(500)
  await page.screenshot({ path: path.join(outDir, 'proof-keyboard-focus.png') })
  await page.keyboard.press('Enter')
  await page.waitForURL('**/work/setlist', { timeout: 3000 }).catch(() => {})
  console.log('URL after Enter:', page.url())
  await page.close()
}

// 3) Reduced motion — confirm flat, static, no tilt applied.
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
  const box = await page.locator('a[aria-label*="Setlist"]').boundingBox()
  await page.mouse.move(box.x + box.width * 0.12, box.y + box.height * 0.12, { steps: 15 })
  await page.waitForTimeout(300)
  const transform = await page.locator('a[aria-label*="Setlist"] > div').evaluate((el) => getComputedStyle(el).transform)
  console.log('Reduced-motion proof transform (expect none/identity):', transform)
  await page.screenshot({ path: path.join(outDir, 'proof-reduced-motion.png') })
  await page.close()
}

await browser.close()
console.log('Saved to', outDir)
