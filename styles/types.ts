import { PaletteOptions } from '@mui/material'

export interface ICasinoPalleteStyled {
    carousel: {
        indicator: string
        indicatorActive: string
        arrow: string
        arrowActive: string
    }
    slider: {
        neumorfism: {
            background: string
            contrastText: string
        }
        shadow: string
        background: string
        contrastText: string
        tagsText: string
        showMore: {
            background: string
            contrastText: string
        }
        showMoreActive: {
            background: string
            contrastText: string
        }
    }
    scrollTabButtons: {
        background: string
        contrastText: string
        active: {
            background: string
            contrastText: string
        }
    }
}
export interface ILayoutPalletStyled {
    footer: {
        background: string
        contrastText: string
        tabMenu: {
            background: string
            contrastText: string
        }
    }

    header: {
        mas: {
            background: string
            contrastText: string
        }
        masActive: {
            background: string
            contrastText: string
        }
    }

    login: {
        background: string
        formInput: {
            background: string
        }
    }
}

export interface IHomePalletStyled {
    background: string
}

export interface IPaletteStyled {
    palette?: PaletteOptions
    primary?: string
    secondary?: string
    background?: string
    contrastText?: string
    link?: string
    home?: IHomePalletStyled
    casino?: ICasinoPalleteStyled
    layout?: ILayoutPalletStyled
}
