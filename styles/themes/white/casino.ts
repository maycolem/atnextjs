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
            background: '#f2f2f2',
            contrastText: '#000',
            active: {
                background: '#FF0000',
                contrastText: '#fff',
            },
        },
        slider: {
            neumorfism: {
                background: '#fff',
                contrastText: '#000',
            },
            tagsText: '#ab8600',
            shadow: '#000',
            background: '#fff',
            contrastText: '#000',
            showMore: {
                background: 'rgb(243, 213, 213)',
                contrastText: '#FF0000',
            },
            showMoreActive: {
                background: '#FF0000',
                contrastText: '#fff',
            },
        },
    },
}
