import { defineConfig, UserConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import WindiCSS from 'vite-plugin-windicss'
import StyledWindiCSS from 'vite-plugin-styled-windicss'
import react from '@vitejs/plugin-react-refresh'
import windiConfig from './windi.config'
import { r, port, isDev } from './scripts/utils'

export const sharedConfig: UserConfig = {
  root: r('src'),
  resolve: {
    alias: {
      '~/': `${r('src')}/`,
    },
  },
  define: {
    __DEV__: isDev,
  },
  plugins: [
    react(),
    AutoImport({
      imports: [
        {
          'webextension-polyfill': [['default', 'browser']],
        },
      ],
      dts: r('src/auto-imports.d.ts'),
    }),

    // rewrite assets to use relative path
    {
      name: 'assets-rewrite',
      enforce: 'post',
      apply: 'build',
      transformIndexHtml(html) {
        return html.replace(/"\/assets\//g, '"../assets/')
      },
    },
  ],
  optimizeDeps: {
    include: ['webextension-polyfill'],
  },
}

export default defineConfig(({ command }) => {
  return {
    ...sharedConfig,
    base: command === 'serve' ? `http://localhost:${port}/` : undefined,
    server: {
      port,
      hmr: {
        host: 'localhost',
      },
    },
    build: {
      outDir: r('extension/dist'),
      emptyOutDir: false,
      sourcemap: isDev ? 'inline' : false,
      // https://developer.chrome.com/docs/webstore/program_policies/#:~:text=Code%20Readability%20Requirements
      terserOptions: {
        mangle: false,
      },
      rollupOptions: {
        input: {
          background: r('src/background/index.html'),
          options: r('src/options/index.html'),
          popup: r('src/popup/index.html'),
        },
      },
    },
    plugins: [
      ...sharedConfig.plugins!,

      // https://github.com/antfu/vite-plugin-windicss
      WindiCSS({
        config: windiConfig,
      }),
      StyledWindiCSS(),
    ],
  }
})
