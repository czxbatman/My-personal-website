import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

/* 在渲染前恢复主题与强调色，避免闪烁 */
const html = document.documentElement
html.dataset.scene = 'field-notes'
const accent = localStorage.getItem('accent')
html.dataset.accent = accent && ['coral', 'mint', 'lemon', 'sky'].includes(accent) ? accent : 'coral'
const theme = localStorage.getItem('theme')
if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  html.classList.add('dark')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
