import i18nResources from '@helpers/i18n'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

class Languaje {
    constructor() {
        i18n.use(initReactI18next).init({
            resources: i18nResources(),
            lng: 'es',
            fallbackLng: 'en',

            interpolation: {
                escapeValue: false,
            },
        })
    }
}

export const LanguajeResource = new Languaje()
