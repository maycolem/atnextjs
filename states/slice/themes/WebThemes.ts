import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@states/store'

type TypesTheme = 'dark' | 'light'
interface InitialState {
    theme: TypesTheme
}

function getItem(): any {
    if (typeof window !== 'undefined') {
        return window?.localStorage?.getItem('theme-432432vrdv32432bsva')
    }
    return null
}

const initialState: InitialState = {
    theme: getItem() || 'dark',
}

export const WebThemes = createSlice({
    name: 'WebThemes',
    initialState,
    reducers: {
        set: (state, action: PayloadAction<TypesTheme>) => {
            state.theme = action.payload
            localStorage.setItem('theme-432432vrdv32432bsva', action.payload)
        },
        reset: () => initialState,
    },
})

// Action creators are generated for each case reducer function
export const { reset, set } = WebThemes.actions
export const ThemeWebSelector = (state: RootState) => state.WebThemes.theme

export default WebThemes.reducer
