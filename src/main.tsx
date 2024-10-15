import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import './index.css'
import { LanguageProvider } from './components/languageProvider/index.tsx'

createRoot(document.getElementById('root')!).render(
  <LanguageProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </LanguageProvider>

)
