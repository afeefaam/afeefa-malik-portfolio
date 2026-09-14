import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

// VITE_BASE_PATH is supplied at build time (see .github/workflows/deploy.yml).
// Left as '/' for local dev and until a real GitHub Pages repo path is known.
export default defineConfig({
  base: process.env.VITE_BASE_PATH ?? '/',
  plugins: [
    react(),
    tailwindcss(),
    // Recompresses every imported raster asset at build time only — dev
    // serves originals untouched, so this never slows down `npm run dev`.
    // Several photos in src/assets/images are multi-megabyte straight-off-
    // camera/Canva exports; visually-lossless recompression cuts that
    // considerably without anyone having to re-export each one by hand.
    // Quality levels below are libvips/mozjpeg's "visually lossless" range,
    // not aggressive compression — this is a transfer-size fix, not a
    // quality trade-off.
    ViteImageOptimizer({
      jpg: { quality: 80 },
      jpeg: { quality: 80 },
      png: { quality: 80 },
      webp: { lossless: true },
    }),
  ],
})
