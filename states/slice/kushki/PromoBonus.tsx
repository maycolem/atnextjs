import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@states/store'

type types = 'winner' | 'loser'

interface InitialState {
    type?: types
    showModal?: boolean
    promotionId?: string
}

const initialState: InitialState = {
    type: undefined,
    showModal: false,
    promotionId: '',
}

export const KushkiPromoBonus = createSlice({
    name: 'KushkiPromoBonus',
    initialState,
    reducers: {
        show: (state, action: PayloadAction<InitialState>) => {
            state.showModal = true
            state.type = action.payload.type
            state.promotionId = action.payload.promotionId
        },

        reset: () => initialState,
    },
})

// Action creators are generated for each case reducer function
export const { show, reset } = KushkiPromoBonus.actions
export const KushkiPromoBonusSelector = (state: RootState) => state.KushkiPromoBonus

export default KushkiPromoBonus.reducer
