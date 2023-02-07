import { createTheme, ThemeOptions } from '@mui/material'
import { paletteMui, paletteStyled } from './palette'

const themeMui: ThemeOptions = {
    typography: {
        fontFamily: ['Rubik', 'Helvetica Neue', 'Arial', 'sans-serif'].join(','),
    },
    ...paletteMui,
}

const themeStyled = {
    ...paletteStyled,
}

export const themeDarkMui = createTheme(themeMui)
export const themeDarkStyled = createTheme(themeStyled)
