import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const outDir = fileURLToPath(new URL('../screenshots/', import.meta.url))
mkdirSync(outDir, { recursive: true })

const browser = await chromium.launch()

for (const [label, viewport] of [
  ['desktop-1440', { width: 1440, height: 900 }],
  ['tablet-1024', { width: 1024, height: 900 }],
  ['mobile-390', { width: 390, height: 844 }],
]) {
  const page = await browser.newPage({ viewport })
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
  await page.locator('#experience').scrollIntoViewIfNeeded()
  await page.waitForTimeout(400)
  await page.screenshot({ path: path.join(outDir, `ledger-${label}.png`) })
  await page.close()
}

// Hover one row — ink deepens, plum marker appears.
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
  await page.locator('#experience').scrollIntoViewIfNeeded()
  await page.locator('li[aria-label*="Markaz"]').hover()
  await page.waitForTimeout(400)
  await page.screenshot({ path: path.join(outDir, 'ledger-hover.png') })
  await page.close()
}

// Keyboard focus through rows.
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
  await page.locator('#experience').scrollIntoViewIfNeeded()
  let focused = ''
  for (let i = 0; i < 30 && !focused.includes('MSR'); i++) {
    await page.keyboard.press('Tab')
    focused = await page.evaluate(() => document.activeElement?.getAttribute('aria-label') ?? '')
  }
  console.log('Focused element aria-label:', focused)
  await page.waitForTimeout(400)
  await page.screenshot({ path: path.join(outDir, 'ledger-keyboard-focus.png') })
  await page.close()
}

// Reduced motion — org already full ink at rest, no transition on hover.
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
  await page.locator('#experience').scrollIntoViewIfNeeded()
  const orgColor = await page
    .locator('li[aria-label*="BlackBerry"] .font-display')
    .evaluate((el) => getComputedStyle(el).color)
  console.log('Reduced-motion org color at rest (expect full ink, e.g. rgb(31, 31, 31)):', orgColor)
  await page.screenshot({ path: path.join(outDir, 'ledger-reduced-motion.png') })
  await page.close()
}

await browser.close()
console.log('Saved to', outDir)
