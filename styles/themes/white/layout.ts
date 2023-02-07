import { ILayoutPalletStyled } from '@styles/types'

export const layout: { layout: ILayoutPalletStyled } = {
    layout: {
        footer: {
            background: '#f2f2f2',
            contrastText: '#000',
            tabMenu: {
                background: '#000',
                contrastText: '#fff',
            },
        },
        header: {
            mas: {
                background: '#fff',
                contrastText: '#000',
            },
            masActive: {
                background: '#FF0000',
                contrastText: '#fff',
            },
        },
        login: {
            background: '#f1f2f2',
            formInput: {
                background: '#fff'
            }
        }
    },
}
