import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '@states/store'

interface InitialState {
    animated: boolean
}

const initialState: InitialState = {
    animated: false,
}

export const ActiveBonusAnimationAvatar = createSlice({
    name: 'ActiveBonusAnimationAvatar',
    initialState,
    reducers: {
        activeAnimated: (state) => {
            state.animated = true
        },
        closeAnimated: (state) => {
            state.animated = false
        },
        reset: () => initialState,
    },
})

// Action creators are generated for each case reducer function
export const { activeAnimated, closeAnimated, reset } = ActiveBonusAnimationAvatar.actions
export const ActiveBonusAnimationAvatarSelector = (state: RootState) => state.ActiveBonusAnimationAvatar

export default ActiveBonusAnimationAvatar.reducer
