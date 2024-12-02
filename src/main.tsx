import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import './index.css'
import { LanguageProvider } from '@/components/languageProvider'
import UserContextProvider from "@/context/user_context.tsx";
import AvailabilityContextProvider from "@/context/availability_context.tsx";

createRoot(document.getElementById('root')!).render(
    <AvailabilityContextProvider>
        <UserContextProvider>
            <LanguageProvider>
                <StrictMode>
                    <App />
                </StrictMode>
            </LanguageProvider>
        </UserContextProvider>
    </AvailabilityContextProvider>

)
