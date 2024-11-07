/// <reference lib="dom" />
import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import ViteLocalConfig from './vite.local';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      registerType: 'autoUpdate',
      injectRegister: false,

      pwaAssets: {
        disabled: false,
        config: true,
      },

      manifest: {
        id: "./",
        start_url: "./",
        theme_color: "black",
        orientation: "landscape",
        background_color: "black",
        lang: "en",
        display_override: ["fullscreen", "minimal-ui"],
        display: "standalone",
        name: "My First Application",
        short_name: "SW",
        description: "A web PWA to example",
        shortcuts: [
          {
            name: "SwapiGallery",
            short_name: "GalSTRWRS",
            url: "./",
            icons: [{
              purpose: "maskable",
              sizes: "96x96",
              src: "/icons/android-icon-96x96.png",
              type: "image/png"
            }]
          }
        ],
        icons: [
          {
            purpose: "maskable",
            sizes: "512x512",
            src: "/icons/starwars_darth_vader_icon_512.png",
            type: "image/png"
          },
          {
            purpose: "maskable",
            sizes: "48x48",
            src: "/icons/android-icon-48x48.png",
            type: "image/png"
          },
          {
            purpose: "maskable",
            sizes: "72x72",
            src: "/icons/android-icon-72x72.png",
            type: "image/png"
          },
          {
            purpose: "maskable",
            sizes: "96x96",
            src: "/icons/android-icon-96x96.png",
            type: "image/png"
          },
          
          {
            purpose: "maskable",
            sizes: "144x144",
            src: "/icons/android-icon-144x144.png",
            type: "image/png"
          },
          {
            purpose: "any",
            sizes: "144x144",
            src: "/icons/android-icon-144x144.png",
            type: "image/png"
          },
          {
            purpose: "maskable",
            sizes: "192x192",
            src: "/icons/android-icon-192x192.png",
            type: "image/png"
          }
        ],
        screenshots: [
          {
            src: "/icons/starwars_darth_vader_icon_512.png",
            sizes: "512x512",
            type: "image/png",
            form_factor: "wide",
            label: "Wonder Widgets",
            platform: "window"
          },
          {
            src: "/icons/starwars_darth_vader_icon_320.png",
            sizes: "320x320",
            type: "image/png",
            form_factor: "narrow",
            label: "Wonder Widgets",
            platform: "android"
          }
        ]
      },

      workbox: {
        runtimeCaching: [{
          handler: "CacheFirst" as const,
          urlPattern: ({url}) => {return url.pathname.startsWith("/api")},
          options: {
            cacheName: "starsWarCache",
            cacheableResponse: {
              statuses: [0, 200],
            }
          }
        }]
      },
      
      injectManifest: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      },

      devOptions: {
        enabled: false,
        navigateFallback: 'index.html',
        suppressWarnings: true,
        type: 'module',
      },
    })
  ],
  ...ViteLocalConfig
})
