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

export const themeLightMui = createTheme(themeMui)
export const themeLightStyled = createTheme(themeStyled)
