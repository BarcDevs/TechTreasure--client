import {StrictMode} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/globals.css'
import './styles/theme.css'
import i18n from 'i18next'
import {I18nextProvider} from 'react-i18next'

i18n.init({
    // lng: 'en',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false
    },
    resources: {
        en: {
            translation: import('./translations/en.json')
        }
    }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <I18nextProvider i18n={i18n}>
            <App/>
        </I18nextProvider>
    </StrictMode>
)
