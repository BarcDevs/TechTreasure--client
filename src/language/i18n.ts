import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import language from '@/language/index.ts'

export default i18n.use(initReactI18next)
    .init({
        lng: language,
        fallbackLng: language,
        interpolation: {
            escapeValue: false
        },
        resources: {
            en: {
                ...(await import('../translations/en.json')).default
            },
            es: {
                ...(await import('../translations/es.json')).default
            },
            ru: {
                ...(await import('../translations/ru.json')).default
            }
        }
    })
