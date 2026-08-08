import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const outDir = fileURLToPath(new URL('../screenshots/', import.meta.url))
mkdirSync(outDir, { recursive: true })

const browser = await chromium.launch()

// Hover — plum underline draws in.
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
  await page.locator('#contact').scrollIntoViewIfNeeded()
  const link = page.locator('#contact a[href^=mailto]')
  const before = await link.evaluate((el) => getComputedStyle(el).textDecorationColor)
  await link.hover()
  await page.waitForTimeout(400)
  const after = await link.evaluate((el) => getComputedStyle(el).textDecorationColor)
  console.log('Email underline color before/after hover (expect transparent -> plum):', before, '|', after)
  await page.screenshot({ path: path.join(outDir, 'contact-hover.png') })
  await page.close()
}

// Keyboard focus.
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
  await page.locator('#contact').scrollIntoViewIfNeeded()
  let focused = ''
  for (let i = 0; i < 50 && !focused.includes('mailto'); i++) {
    await page.keyboard.press('Tab')
    focused = await page.evaluate(() => document.activeElement?.getAttribute('href') ?? '')
  }
  console.log('Focused element href:', focused)
  await page.waitForTimeout(400)
  const decoColor = await page.evaluate(() => {
    const el = document.querySelector('#contact a[href^=mailto]')
    return el ? getComputedStyle(el).textDecorationColor : null
  })
  console.log('Email underline color on keyboard focus (expect plum):', decoColor)
  await page.screenshot({ path: path.join(outDir, 'contact-keyboard-focus.png') })
  await page.close()
}

// Reduced motion — no transition delay, but state still changes.
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
  await page.locator('#contact').scrollIntoViewIfNeeded()
  const link = page.locator('#contact a[href^=mailto]')
  await link.hover()
  await page.waitForTimeout(100)
  const decoColor = await link.evaluate((el) => getComputedStyle(el).textDecorationColor)
  console.log('Reduced-motion underline color 100ms after hover (expect already plum, no wait needed):', decoColor)
  await page.close()
}

await browser.close()
console.log('Saved to', outDir)
