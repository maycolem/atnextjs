import { ICasinoPalleteStyled } from '@styles/types'

export const casino: { casino: ICasinoPalleteStyled } = {
    casino: {
        carousel: {
            indicator: '#D9D9D9',
            indicatorActive: '#FF0000',
            arrow: '#4D4D4D',
            arrowActive: '#FF0000',
        },
        scrollTabButtons: {
            background: '#262624',
            contrastText: '#C3C3C3',
            active: {
                background: '#FF0000',
                contrastText: '#fff',
            },
        },
        slider: {
            neumorfism: {
                background: '#000',
                contrastText: '#fff',
            },
            tagsText: '#ffc700',
            shadow: '#000',
            background: '#262624',
            contrastText: '#F5F5F5',
            showMore: {
                background: '#3A3A3A',
                contrastText: '#C3C3C3',
            },
            showMoreActive: {
                background: '#FF0000',
                contrastText: '#fff',
            },
        },
    },
}
