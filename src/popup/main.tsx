import React from 'react'
import ReactDOM from 'react-dom'
import 'virtual:windi.css'
import { Popup } from './Popup'
import ready from 'document-ready'

ready(() => {
  ReactDOM.render(
    <React.StrictMode>
      <Popup />
    </React.StrictMode>,
    document.getElementById('root'),
  )
})
