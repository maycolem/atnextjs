import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@states/store'

interface InitialState {
    backURL: string
}

const initialState: InitialState = {
    backURL: null,
}

export const PannelBackArrowURL = createSlice({
    name: 'PannelBackArrowURL',
    initialState,
    reducers: {
        set: (state, action: PayloadAction<string>) => {
            state.backURL = action.payload
        },
        reset: () => initialState,
    },
})

// Action creators are generated for each case reducer function
export const { reset, set } = PannelBackArrowURL.actions
export const PannelBackArrowURLSelector = (state: RootState) => state.PannelBackArrowURL

export default PannelBackArrowURL.reducer
