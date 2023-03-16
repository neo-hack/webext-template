import { createRoot } from 'react-dom/client'

import { Options } from './Options'
import './style.css'

const root = createRoot(document.getElementById('root')!)

root.render(
  <Options />,
)
