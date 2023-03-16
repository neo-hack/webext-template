import { createRoot } from 'react-dom/client'
import { Popup } from './Popup'
import ready from 'document-ready'

ready(() => {
  const root = createRoot(document.getElementById('root')!)

  root.render(
    <Popup />,
  )
})
