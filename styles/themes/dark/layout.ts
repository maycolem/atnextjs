import { ILayoutPalletStyled } from '@styles/types'

export const layout: { layout: ILayoutPalletStyled } = {
    layout: {
        footer: {
            background: '#2E2E2B',
            contrastText: '#C3C3C3',
            tabMenu: {
                background: '#000',
                contrastText: '#fff',
            },
        },
        header: {
            mas: {
                background: '#2E2E2B',
                contrastText: '#F5F5F5',
            },
            masActive: {
                background: '#FF0000',
                contrastText: '#fff',
            },
        },
        login: {
            background: '#1D1D1B',
            formInput: {
                background: '#2E2E2B'
            }
        }
    },
}
