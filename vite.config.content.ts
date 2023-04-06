import { defineConfig } from 'vite'
import { sharedConfig } from './vite.config'
import { isDev, r } from './scripts/utils'

// bundling the content script using Vite
export default defineConfig({
  ...sharedConfig,
  build: {
    watch: isDev
      ? {
          include: [r('src/contentScripts/**/*')],
        }
      : undefined,
    outDir: r('extension/dist/contentScripts'),
    minify: !isDev,
    cssCodeSplit: false,
    emptyOutDir: false,
    sourcemap: isDev ? 'inline' : false,
    lib: {
      entry: r('src/contentScripts/index.tsx'),
      formats: ['es'],
    },
    rollupOptions: {
      output: {
        entryFileNames: 'index.global.js',
      },
    },
  },
  plugins: [...sharedConfig.plugins!],
})
