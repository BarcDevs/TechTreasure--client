import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'

export default i18n.use(initReactI18next)
    .init({
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        },
        resources: {
            en: {
                ...(await import('./translations/en.json')).default
            },
            es: {
                ...(await import('./translations/es.json')).default
            }
        }
    })
