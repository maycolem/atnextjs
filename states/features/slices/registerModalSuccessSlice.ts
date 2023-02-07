import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '@states/store'

interface InitialState {
    isSuccesfully: boolean
}

const initialState: InitialState = {
    isSuccesfully: false,
}

export const registerModalSuccessSlice = createSlice({
    name: 'registerModalSuccess',
    initialState,
    reducers: {
        resetRegisterModalSuccess: (state) => initialState,
        showModalSuccessfully: (state) => {
            state.isSuccesfully = true
        },
    },
})

// Action creators are generated for each case reducer function
export const { showModalSuccessfully, resetRegisterModalSuccess } = registerModalSuccessSlice.actions
export const registerModalSuccessSelector = (state: RootState) => state.registerModalSuccess

export default registerModalSuccessSlice.reducer
