import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  // Crucial for GitHub Pages: tells Vite to look for assets relative to your repo path
  base: '/pictobuddy/', 
  plugins: [
    svelte(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'inline', // Automatically inserts the service worker registration script into index.html
      includeAssets: ['favicon.svg', 'robots.txt'],
      manifest: {
        name: 'PictoBuddy',
        short_name: 'PB',
        description: 'Visual storytelling made simple—create pictogram-based stories and schedules for meaningful communication.',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'images/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'images/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable' // Helpful for adaptive icons on Android
          }
        ]
      }
    })
  ],
  server: {
    host: true,
  },
})