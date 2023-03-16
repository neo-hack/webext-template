// generate stub index.html files for dev entry
import { execSync } from 'child_process'
import fs from 'fs-extra'
import chokidar from 'chokidar'
import { r, port, isDev, log } from './utils'

/**
 * Stub index.html to use Vite in development
 */
async function stubIndexHtml() {
  const views = ['options', 'popup']

  for (const view of views) {
    await fs.ensureDir(r(`extension/dist/${view}`))
    let data = await fs.readFile(r(`src/${view}/index.html`), 'utf-8')
    data = data
      .replace(/".\/main.(tsx?)"/g, (_match, p1) => {
        return `"http://localhost:${port}/${view}/main.${p1}"`
      })
      .replace(
        /<!-- hmr -->/g,
        `<script type="module" src="http://localhost:${port}/hmr.ts"></script>`,
      )
      .replace('<div id="root"></div>', '<div id="root">Vite server did not start</div>')
    await fs.writeFile(r(`extension/dist/${view}/index.html`), data, 'utf-8')
    log('PRE', `stub ${view}`)
  }
}

function copyPublicAssets() {
  fs.copy(r('public/assets'), r('extension/assets'))
}

function writeManifest() {
  execSync('npx esno ./scripts/manifest.ts', { stdio: 'inherit' })
}

writeManifest()
copyPublicAssets()

if (isDev) {
  stubIndexHtml()
  chokidar.watch(r('src/**/*.html')).on('change', () => {
    stubIndexHtml()
  })
  chokidar.watch([r('src/manifest.ts'), r('package.json')]).on('change', () => {
    writeManifest()
  })
}
