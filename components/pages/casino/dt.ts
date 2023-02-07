import { GoogleTagManager } from '@google/TagManager'

export const dtBannerClick = (name: string, section: string) => {
    GoogleTagManager.push({
        event: 'atm.event',
        title: name.toLowerCase(),
        eventName: 'banner_click',
        section,
        action: 'click',
    })
}
export const dtBannerView = (name: string, section: string) => {
    GoogleTagManager.push({
        event: 'atm.event',
        title: name?.toLowerCase().replace(/'/g, ''),
        eventName: 'banner_view',
        section: section,
        action: 'view',
    })
}

export const dtPromoView = (name: string, section: string, index: number) => {
    GoogleTagManager.push({
        event: 'atm.ecommerce',
        eventName: 'view_promotion',
        ecommerce: {
            items: {
                item_name: name?.toLowerCase() || '',
                item_list_name: section,
                item_category: 'juego',
                index: index,
            },
        } as any,
    })
}

export const dtQuickLink = (name: string, section: string) => {
    GoogleTagManager.push({
        event: 'atm.event',
        option: name.toLowerCase(),
        eventName: 'quick_link',
        section: section,
        action: 'click',
    })
}

export const dtCasinoVendor = (name: string, section: string) => {
    GoogleTagManager.push({
        event: 'atm.event',
        option: name.toLowerCase(),
        eventName: `${section}_vendor`.replace(/ /g, '_'),
        action: 'change',
    })
}
export const dtCasinoSearch = (name: string, section: string) => {
    GoogleTagManager.push({
        event: 'atm.event',
        search_term: name.toLowerCase().replace(/-/g, ' '),
        eventName: `${section}_search`.replace(/ /g, '_'),
        action: 'search',
    })
}
export const dtCasinoGame = (name: string, section: string, option: string) => {
    GoogleTagManager.push({
        event: 'atm.event',
        game_name: name.toLowerCase().replace(/[-_]/g, ' ').replace(/[^\w\d ]+/g, ''),
        eventName: `${section}_game`.replace(/ /g, '_'),
        option: option,
        action: 'click',
    })
}
