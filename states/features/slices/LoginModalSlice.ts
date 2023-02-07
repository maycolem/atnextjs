import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '@states/store'

interface InitialState {
    open: boolean
}

const initialState: InitialState = {
    open: false,
}

export const loginModalSlice = createSlice({
    name: 'loginModal',
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
export const { setOpen, onClose } = loginModalSlice.actions
export const loginModalSelector = (state: RootState) => state.loginModal

export default loginModalSlice.reducer
