import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './ErrorBoundary.jsx'

const container = document.getElementById('root')

if (container) {
  try {
    const root = createRoot(container)
    root.render(
      <StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </StrictMode>,
    )
  } catch (err) {
    console.error('Mounting Error:', err)
    container.innerHTML = `
      <div style="padding: 40px; font-family: monospace; max-width: 600px; margin: 40px auto; background: #fff; border: 1px solid #f87171; border-radius: 8px;">
        <h3 style="color: #dc2626; margin-top: 0;">React Mount Error</h3>
        <p style="color: #4b5563; font-size: 13px;">${err.message || err}</p>
        <button onclick="location.reload()" style="padding: 6px 12px; background: #18181b; color: #fff; border: none; border-radius: 4px; cursor: pointer;">Reload</button>
      </div>
    `
  }
} else {
  console.error('Fatal: #root container missing')
}
