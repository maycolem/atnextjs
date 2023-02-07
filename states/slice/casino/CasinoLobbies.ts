import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@states/store'

interface InitialState {
    categoria: string
    proveedor: string
}

const initialState: InitialState = {
    categoria: '',
    proveedor: '',
}

export const CasinoLobbies = createSlice({
    name: 'CasinoLobbies',
    initialState,
    reducers: {
        setCategoria: (state, action: PayloadAction<string>) => ({ ...state, categoria: action.payload }),
        setProveedor: (state, action: PayloadAction<string>) => ({ ...state, proveedor: action.payload }),
        reset: () => initialState,
    },
})

// Action creators are generated for each case reducer function
export const { reset, setProveedor, setCategoria } = CasinoLobbies.actions
export const CasinoLobbiesSelector = (state: RootState) => state.CasinoLobbies

export default CasinoLobbies.reducer
