import React from 'react'
import { render } from 'react-dom'
import { ContentScripts } from './views/App'

function mountApp() {
  new Promise((resolve) => {
    console.info('start mount react on app element')
    return resolve(true)
  })
    .then(() => {
      if (!document.querySelector('#APP')) {
        const body = document.querySelector('body')
        const app = document.createElement('div')
        app.id = 'APP'
        body.appendChild(app)
      }
      console.info('create app')
      return true
    })
    .then(() => {
      console.info('start mouting')
      render(<ContentScripts />, document.querySelector('#APP'))
      console.info('mounted')
    })
}

mountApp()
