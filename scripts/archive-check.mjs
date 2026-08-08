import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const outDir = fileURLToPath(new URL('../screenshots/', import.meta.url))
mkdirSync(outDir, { recursive: true })

const browser = await chromium.launch()

// 1) Static shots at the three canonical breakpoints, scrolled to #work.
for (const [label, viewport] of [
  ['desktop-1440', { width: 1440, height: 900 }],
  ['tablet-1024', { width: 1024, height: 900 }],
  ['mobile-390', { width: 390, height: 844 }],
]) {
  const page = await browser.newPage({ viewport })
  await page.goto('http://localhost:5173/#work', { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)
  await page.screenshot({ path: path.join(outDir, `archive-${label}.png`) })
  await page.close()
}

// 2) Hover one booklet — confirm lift/rotate/shadow, no scale.
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.goto('http://localhost:5173/#work', { waitUntil: 'networkidle' })
  const link = page.locator('a[aria-label*="Markaz"]')
  await link.hover()
  await page.waitForTimeout(450)
  await page.screenshot({ path: path.join(outDir, 'archive-hover.png') })
  await page.close()
}

// 3) Keyboard focus through the three booklets, confirm equivalent state + Enter navigates.
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.goto('http://localhost:5173/#work', { waitUntil: 'networkidle' })
  let focused = ''
  for (let i = 0; i < 25 && !focused.includes('Markaz'); i++) {
    await page.keyboard.press('Tab')
    focused = await page.evaluate(() => document.activeElement?.getAttribute('aria-label') ?? '')
  }
  console.log('Focused element aria-label:', focused)
  await page.waitForTimeout(400)
  await page.screenshot({ path: path.join(outDir, 'archive-keyboard-focus.png') })
  await page.keyboard.press('Enter')
  await page.waitForURL('**/work/markaz', { timeout: 3000 }).catch(() => {})
  console.log('URL after Enter:', page.url())
  await page.close()
}

// 4) Reduced motion — confirm no transform on hover, only shadow change.
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })
  await page.goto('http://localhost:5173/#work', { waitUntil: 'networkidle' })
  const link = page.locator('a[aria-label*="Markaz"]')
  const before = await link.locator('div').first().evaluate((el) => getComputedStyle(el).transform)
  await link.hover()
  await page.waitForTimeout(300)
  const after = await link.locator('div').first().evaluate((el) => getComputedStyle(el).transform)
  console.log('Reduced-motion transform before hover:', before)
  console.log('Reduced-motion transform after hover (expect same):', after)
  await page.screenshot({ path: path.join(outDir, 'archive-reduced-motion.png') })
  await page.close()
}

// 5) Horizontal scroll on mobile doesn't affect vertical page scroll.
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
  await page.goto('http://localhost:5173/#work', { waitUntil: 'networkidle' })
  const scrollYBefore = await page.evaluate(() => window.scrollY)
  const row = page.locator('#work .overflow-x-auto')
  const box = await row.boundingBox()
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
  await page.mouse.wheel(300, 0) // horizontal wheel only
  await page.waitForTimeout(300)
  const scrollYAfter = await page.evaluate(() => window.scrollY)
  const rowScrollLeft = await row.evaluate((el) => el.scrollLeft)
  console.log('Page scrollY before/after horizontal wheel:', scrollYBefore, scrollYAfter, '(expect equal)')
  console.log('Row scrollLeft after horizontal wheel:', rowScrollLeft, '(expect > 0)')
  await page.close()
}

await browser.close()
console.log('Saved to', outDir)
