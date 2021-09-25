/* eslint-disable no-console */
import React from 'react'
import { onMessage } from 'webext-bridge'
import { App } from './views/App'
import { render } from 'react-dom'

// Firefox `browser.tabs.executeScript()` requires scripts return a primitive value
;(() => {
  console.info('[webext-template] Hello world from content script')

  // communication example: send previous tab title from background page
  onMessage('tab-prev', ({ data }) => {
    console.log(`[webext-template] Navigate from page "${data.title}"`)
  })

  // mount component to context window
  const container = document.createElement('div')
  container.className = 'webext-template'
  document.body.appendChild(container)
  render(<App />, container)
})()
