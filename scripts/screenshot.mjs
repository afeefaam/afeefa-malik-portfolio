// Dev-only verification tool for the editorial redesign — captures desktop
// (1440x900) and mobile (390x844) screenshots of the local dev server, plus
// a console-error check, so every shot gets the same before/after evidence.
// Usage: node scripts/screenshot.mjs <name> [path]
//   node scripts/screenshot.mjs shot1
//   node scripts/screenshot.mjs shot2 /work/setlist
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const [, , name = 'screenshot', routePath = '/'] = process.argv
const baseUrl = `http://localhost:5173${routePath}`
const outDir = fileURLToPath(new URL('../screenshots/', import.meta.url))
mkdirSync(outDir, { recursive: true })

const browser = await chromium.launch()
const consoleErrors = []

for (const [label, viewport] of [
  ['desktop-1440', { width: 1440, height: 900 }],
  ['mobile-390', { width: 390, height: 844 }],
]) {
  const page = await browser.newPage({ viewport })
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(`[${label}] ${msg.text()}`)
  })
  page.on('pageerror', (err) => consoleErrors.push(`[${label}] ${err}`))
  await page.goto(baseUrl, { waitUntil: 'networkidle' })
  await page.screenshot({ path: path.join(outDir, `${name}-${label}.png`) })
  await page.close()
}

await browser.close()
console.log('Saved to', outDir)
console.log('CONSOLE_ERRORS:', JSON.stringify(consoleErrors))
