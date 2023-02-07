import { PaletteOptions, SimplePaletteColorOptions } from '@mui/material'
import { ThemeOptions } from '@mui/material'
import { IPaletteStyled } from '@styles/types'
import { casino } from './casino'
import { home } from './home'
import { layout } from './layout'

interface PaletteOptionsOverride {
    alternate?: SimplePaletteColorOptions
    alternate2?: SimplePaletteColorOptions
    alternate3?: SimplePaletteColorOptions
    alternate4?: SimplePaletteColorOptions
    alternate5?: SimplePaletteColorOptions
    alternate7?: SimplePaletteColorOptions
    alternate8?: SimplePaletteColorOptions
    alternate9?: SimplePaletteColorOptions
    alternate10?: SimplePaletteColorOptions
    alternate11?: SimplePaletteColorOptions
    alternate12?: SimplePaletteColorOptions
    alternate13?: SimplePaletteColorOptions
    alternate14?: SimplePaletteColorOptions
    alternate15?: SimplePaletteColorOptions
    alternate16?: SimplePaletteColorOptions
    alternate17?: SimplePaletteColorOptions
    alternate18?: SimplePaletteColorOptions
    alternate19?: SimplePaletteColorOptions
    alternate20?: SimplePaletteColorOptions
    success2?: SimplePaletteColorOptions
    whatsapp?: SimplePaletteColorOptions
    telegram?: SimplePaletteColorOptions
    info2?: SimplePaletteColorOptions
    info3?: SimplePaletteColorOptions
    info4?: SimplePaletteColorOptions
    dark?: SimplePaletteColorOptions
    dark2?: SimplePaletteColorOptions
    dark3?: SimplePaletteColorOptions
    light?: SimplePaletteColorOptions
    buttonPink?: SimplePaletteColorOptions
    linkPink?: SimplePaletteColorOptions
    primary?: SimplePaletteColorOptions
    secondary?: SimplePaletteColorOptions
    error?: SimplePaletteColorOptions
    warning?: SimplePaletteColorOptions
    info?: SimplePaletteColorOptions
    success?: SimplePaletteColorOptions
}

declare module '@mui/material/styles' {
    export interface PaletteOptions extends PaletteOptionsOverride {}
    export interface palette extends PaletteOptionsOverride {}
}

// type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
// type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N

declare module 'styled-components' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface DefaultTheme extends ThemeOptions, IPaletteStyled {
        palette: PaletteOptionsOverride
    }
}
declare module '@mui/material/TextField' {
    interface TextFieldPropsColorOverrides {
        alternate: true
        alternate2: true
        alternate3: true
        alternate4: true
        alternate5: true
        alternate7: true
        alternate8: true
        alternate9: true
        alternate10: true
        alternate11: true
        alternate12: true
        alternate13: true
        alternate14: true
        alternate15: true
        alternate16: true
        alternate17: true
        alternate18: true
        alternate19: true
        alternate20: true
        success2: true
        whatsapp: true
        telegram: true
        info2: true
        info3: true
        info4: true
        dark: true
        dark2: true
        dark3: true
        light: true
        buttonPink: true
        linkPink: true
        primary: true
        secondary: true
        error: true
        warning: true
        info: true
        success: true
    }
}
declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        alternate: true
        alternate2: true
        alternate3: true
        alternate4: true
        alternate5: true
        alternate7: true
        alternate8: true
        alternate9: true
        alternate10: true
        alternate11: true
        alternate12: true
        alternate13: true
        alternate14: true
        alternate15: true
        alternate16: true
        alternate17: true
        alternate18: true
        alternate19: true
        alternate20: true
        success2: true
        whatsapp: true
        telegram: true
        info2: true
        info3: true
        info4: true
        dark: true
        dark2: true
        dark3: true
        light: true
        buttonPink: true
        linkPink: true
        primary: true
        secondary: true
        error: true
        warning: true
        info: true
        success: true
    }
}

export const paletteMui = {
    palette: {
        primary: {
            main: '#FF0000',
            light: '#FF0808',
            dark: '#D40606',
        },
        secondary: {
            main: '#ffc700',
        },
        error: { main: '#f44336' },
        warning: { main: '#ffa726' },
        info: { main: '#29b6f6' },
        success: { main: '#66bb6a' },
        background: { default: '#F2F2F2' },
        alternate: { main: '#E5E5E5' },
        alternate2: { main: '#dedede' },
        alternate3: { main: '#828282' },
        alternate4: { main: '#F2F2F2', light: '#FFFFFF', dark: '#CFCFCF' },
        alternate5: { main: '#4F4F4F', light: '#828282' },
        alternate7: { main: '#6E6E6E' },
        alternate8: { main: '#D9D9D9', dark: '#D1D1D1' },
        alternate9: { main: '#ededed' },
        alternate10: { main: '#F1F3F4' },
        alternate11: { main: '#595959' },
        alternate12: { main: '#F3F3F3' },
        alternate13: { main: '#6E6E73' },
        alternate14: { main: '#FBFBFB' },
        alternate15: { main: '#646464' },
        alternate16: { main: '#707070' },
        alternate17: { main: '#f5f5f7' },
        alternate18: { main: '#808080' },
        alternate19: { main: '#878787' },
        alternate20: { main: '#D1D1D1' },
        success2: { main: '#00A110', light: '#00BF13', dark: '#00800D', contrastText: '#fff' },
        whatsapp: { main: '#4ECC5C', contrastText: '#fff' },
        telegram: { main: '#35ADE1', contrastText: '#fff' },
        info2: { main: '#2783ff' },
        info3: { main: '#3467FF' },
        info4: { main: '#006AFF', contrastText: '#fff' },
        dark: { main: '#373737', light: '#5C5C5C', dark: '#141414', contrastText: '#fff' },
        dark2: { main: '#0D0D0D', light: '#333333', dark: '#000', contrastText: '#fff' },
        dark3: { main: '#1D1D1F' },
        light: { main: '#fff' },
        buttonPink: { main: '#F3D5D5', dark: '#D9BFBF' },
        linkPink: { main: '#FFE5E5', dark: '#D9BFBF' },
    } as PaletteOptions,
}

export const paletteStyled: IPaletteStyled = {
    // Mui
    palette: { ...paletteMui.palette },
    // Styled owned
    primary: '#FF0000',
    secondary: '#ffc700',
    background: '#1D1D1B',
    contrastText: '#F5F5F5',
    link: '#0f80d2',
    ...home,
    ...casino,
    ...layout,
}
