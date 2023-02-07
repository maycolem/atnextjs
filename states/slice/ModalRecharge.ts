import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '@states/store'

interface InitialState {
    isOpen: boolean
}
const initialState: InitialState = {
    isOpen: false,
}

export const ModalRecharge = createSlice({
    name: 'ModalRecharge',
    initialState,
    reducers: {
        close: (state) => {
            state.isOpen = false
        },
        open: (state) => {
            state.isOpen = true
        },
    },
})

// Action creators are generated for each case reducer function
export const { open, close } = ModalRecharge.actions
export const ModalRechargeSelector = (state: RootState) => state.ModalRecharge

export default ModalRecharge.reducer
