import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  // Crucial for GitHub Pages: tells Vite to look for assets relative to your repo path
  base: '/pictogram-storyteller/', 
  plugins: [
    svelte(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'inline', // Automatically inserts the service worker registration script into index.html
      includeAssets: ['favicon.svg', 'robots.txt'],
      manifest: {
        name: 'PictoBuddy',
        short_name: 'PB',
        description: 'An interactive application to tell stories using pictograms.',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
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