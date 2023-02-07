import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '@states/store'

interface InitialState {
    showModal?: boolean
}

const initialState: InitialState = {
    showModal: false,
}

export const PromoCashGifts = createSlice({
    name: 'PromoCashGifts',
    initialState,
    reducers: {
        show: (state) => {
            state.showModal = true
        },

        reset: () => initialState,
    },
})

// Action creators are generated for each case reducer function
export const { show, reset } = PromoCashGifts.actions
export const PromoCashGiftsSelector = (state: RootState) => state.PromoCashGifts

export default PromoCashGifts.reducer
