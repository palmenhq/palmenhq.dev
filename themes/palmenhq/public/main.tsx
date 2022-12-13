import 'vite/modulepreload-polyfill'
import './src/darcula.css'
import { createRoot } from 'react-dom/client'
import { App } from './src/app'

const reactRoot = document.getElementById('react-root')

if (reactRoot) {
  const root = createRoot(reactRoot)
  root.render(<App state={(window as any).__phq_state} />)
}
