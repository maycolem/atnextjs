/* eslint-disable no-undef */
/* eslint-disable camelcase */
import TagManager from 'react-gtm-module'

class _GoogleTagManager {
    constructor() {
        this.gtmId = 'GTM-TNCZW2F'
    }

    inizialtion() {
        if (typeof window !== 'undefined') {
            TagManager.initialize({ gtmId: this.gtmId })
        }
    }

    push({
        event = 'atm.event',
        eventName = '',
        title = '',
        gift = '',
        hash_id = '',
        success = '',
        option = '',
        promotion_name = '',
        location_id = '',
        section = '',
        action = '',
        search_term = '',
        creative_name = '',
        payout_option = '',
        amount = '',
        view = '',
        recharge_option = '',
        amount_option = '',
        game_name = '',
        ecommerce = '',
        items = '',
        item_name = '',
        medio = '',
        eventLabel = ''
    }) {
        if (typeof window !== 'undefined') {
            TagManager.dataLayer({
                dataLayer: {
                    event,
                    eventName,
                    title,
                    gift,
                    hash_id,
                    success,
                    option,
                    promotion_name,
                    location_id,
                    section,
                    action,
                    search_term,
                    creative_name,
                    payout_option,
                    amount,
                    view,
                    recharge_option,
                    amount_option,
                    game_name,
                    ecommerce,
                    items,
                    item_name,
                    medio,
                    eventLabel
                },
            })
        }
    }
}

export const GoogleTagManager = new _GoogleTagManager()
