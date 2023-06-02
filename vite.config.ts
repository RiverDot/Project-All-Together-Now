import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa'

const pwaOptions: Partial<VitePWAOptions> = {
  registerType: 'autoUpdate',
  mode: 'development',
  base: '/',
  includeAssets: ['favicon.svg'],
  manifest: {
    name: 'Project All Together Now',
    short_name: 'Project ATN',
    theme_color: '#34eb8f',
    icons: [
      {
        src: 'pwa-192x192.png', // <== don't add slash, for testing
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/pwa-512x512.png', // <== don't remove slash, for testing
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: 'pwa-512x512.png', // <== don't add slash, for testing
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    preact(),
    VitePWA(pwaOptions)
  ],
})
