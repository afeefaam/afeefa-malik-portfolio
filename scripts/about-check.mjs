import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const outDir = fileURLToPath(new URL('../screenshots/', import.meta.url))
mkdirSync(outDir, { recursive: true })

const browser = await chromium.launch()

// Hover a photo — lift + shadow deepen.
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
  await page.locator('#about').scrollIntoViewIfNeeded()
  await page.locator('div[aria-label="Holding a boba"]').hover()
  await page.waitForTimeout(400)
  await page.screenshot({ path: path.join(outDir, 'about-hover.png') })
  await page.close()
}

// Keyboard focus through the three photos.
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
  await page.locator('#about').scrollIntoViewIfNeeded()
  let focused = ''
  const seen = []
  for (let i = 0; i < 40; i++) {
    await page.keyboard.press('Tab')
    focused = await page.evaluate(() => document.activeElement?.getAttribute('aria-label') ?? '')
    if (['Presenting at the CaseHacks Finals', 'Holding a boba', 'Portrait of Afeefa Malik'].includes(focused)) {
      seen.push(focused)
    }
  }
  console.log('Focusable photos reached via Tab:', JSON.stringify([...new Set(seen)]))
  await page.close()
}

// Reduced motion — no transform on hover.
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
  await page.locator('#about').scrollIntoViewIfNeeded()
  const target = page.locator('div[aria-label="Holding a boba"]')
  const before = await target.evaluate((el) => getComputedStyle(el).transform)
  await target.hover()
  await page.waitForTimeout(300)
  const after = await target.evaluate((el) => getComputedStyle(el).transform)
  console.log('Reduced-motion transform before/after hover (expect equal):', before, '|', after)
  await page.close()
}

await browser.close()
console.log('Saved to', outDir)
