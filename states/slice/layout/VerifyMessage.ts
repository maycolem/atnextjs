import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, store } from '@states/store'
import { Session } from 'services/Session'

interface InitialState {
    isVerify: boolean
}

const initialState: InitialState = {
    isVerify: true,
}

export const VerifyMessage = createSlice({
    name: 'VerifyMessage',
    initialState,
    reducers: {
        set: (state, action: PayloadAction<boolean>) => {
            state.isVerify = action.payload
        },
        reset: () => initialState,
    },
})

// Action creators are generated for each case reducer function
export const { reset, set } = VerifyMessage.actions
export const VerifyMessageSelector = (state: RootState) => state.VerifyMessage

export default VerifyMessage.reducer
