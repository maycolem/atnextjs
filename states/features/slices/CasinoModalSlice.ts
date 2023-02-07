import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '@states/store'

interface InitialState {
    open: boolean
}

const initialState: InitialState = {
    open: false,
}

export const casinoModalSlice = createSlice({
    name: 'casinoModal',
    initialState,
    reducers: {
        onClose: (state) => {
            state.open = false
        },
        setOpen: (state) => {
            state.open = true
        },
    },
})

// Action creators are generated for each case reducer function
export const { setOpen, onClose } = casinoModalSlice.actions
export const casinoModalSelector = (state: RootState) => state.casinoModal

export default casinoModalSlice.reducer
