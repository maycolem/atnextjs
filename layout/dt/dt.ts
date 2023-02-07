import { GoogleTagManager } from 'google/TagManager'

export const dtHomeLD = () => {
    GoogleTagManager.push({ event: 'atm.event', option: 'logo', eventName: 'header_click' })
}
export const dtHomeLM = () => {
    GoogleTagManager.push({ event: 'atm.event', option: 'logoMovil', eventName: 'header_click' })
}
export const dtHeaderRecarga = async () => {
    GoogleTagManager.push({ event: 'atm.event', option: 'recarga', eventName: 'header_click' })
}

export const dtHeaderClick = (name: string) => {
    GoogleTagManager.push({
        event: 'atm.event',
        option: name.toLowerCase(),
        eventName: 'header_click',
    })
}

export const dtHeaderMenu = (name: string) => {
    GoogleTagManager.push({
        event: 'atm.event',
        option: 'mi cuenta /' + ' ' + name.toLowerCase(),
        eventName: 'header_click',
    })
}

export const dtHeaderMenuMobile = (name: string) => {
    GoogleTagManager.push({
        event: 'atm.event',
        option: 'menu /' + ' ' + name.toLowerCase(),
        eventName: 'header_click',
    })
}

export const dtHamburguerClick = () => {
    GoogleTagManager.push({ event: 'atm.event', option: 'menu hamburguesa', eventName: 'header_click' })
}
export const dtHomeClick = (name: string) => {
    GoogleTagManager.push({
        event: 'atm.event',
        option: name.toLowerCase(),
        eventName: 'home_click',
        title: 'metodos_pago',
    })
}

export const dtFooterClick = (name: string) => {
    GoogleTagManager.push({
        event: 'atm.event',
        option: name.toLowerCase(),
        eventName: 'footer_click',
    })
}

export const dtRecargaBack = (name: string, back: string) => {
    GoogleTagManager.push({
        event: 'atm.event',
        eventName: 'recarga_' + name.toLowerCase().replace(/ /g, '_'),
        option: back,
        action: 'click',
    })
}
export const dtRecargaClose = (name) => {
    GoogleTagManager.push({
        event: 'atm.event',
        option: 'cerrar',
        eventName: name ? 'recarga_' + name.toLowerCase().replace(/ /g, '_') : 'recarga',
        action: 'click',
    })
}
export const dtRecargaTerms = (name: string, value: boolean) => {
    GoogleTagManager.push({
        event: 'atm.event',
        option: 'acepto terminos y condiciones',
        eventName: 'recarga_' + name.toLowerCase().replace(/ /g, '_'),
        action: value ? 'uncheck' : 'check',
    })
}
export const dtRecargar = (option: string, amount: number, name: string) => {
    GoogleTagManager.push({
        event: 'atm.event',
        amount: 's/ ' + amount,
        eventName: 'recarga_' + name.toLowerCase().replace(/ /g, '_'),
        option: option,
        action: 'click',
    })
}
export const dtRecargaClick = (name: string, amount: number) => {
    GoogleTagManager.push({
        event: 'atm.event',
        eventName: 'recarga',
        medio: name.toLowerCase(),
        eventLabel: amount.toFixed(2) + ' pen',
    })
}
export const dtRecargarButtonTab = (amount: number, name: string) => {
    GoogleTagManager.push({
        event: 'atm.event',
        amount_option: 's/ ' + amount,
        eventName: 'recarga_' + name.toLowerCase().replace(/ /g, '_'),
        action: 'click',
    })
}
