import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '@states/store'

interface InitialState {
    value: boolean
}

const initialState: InitialState = {
    value: true,
}

export const ShowSaldo = createSlice({
    name: 'ShowSaldo',
    initialState,
    reducers: {
        show: (state) => {
            state.value = false
        },
        hidden: (state) => {
            state.value = true
        },
        toggle: (state) => {
            state.value = !state.value
        },
        reset: () => initialState,
    },
})

// Action creators are generated for each case reducer function
export const { show, hidden, reset, toggle } = ShowSaldo.actions
export const ShowSaldoSelector = (state: RootState) => state.ShowSaldo

export default ShowSaldo.reducer
