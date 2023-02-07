import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '@states/store'

interface InitialState {
    open: boolean
}

const initialState: InitialState = {
    open: false,
}

export const recuperarPasswordSlice = createSlice({
    name: 'recuperarPasswordModal',
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
export const { setOpen, onClose } = recuperarPasswordSlice.actions
export const recuperarPasswordSelector = (state: RootState) => state.recuperarPasswordModal

export default recuperarPasswordSlice.reducer
