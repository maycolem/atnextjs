import { Limits } from '@interfaces/retiro'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@states/store'

interface InitialState {
    monto: number
    montoShop: number
    limit?: Limits
}

const initialState: InitialState = {
    monto: 0,
    montoShop: 0,
    limit: null,
}

export const retiroPaymentSlice = createSlice({
    name: 'retiroPayment',
    initialState,
    reducers: {
        setMonto: (state, action: PayloadAction<number>) => {
            state.monto = action.payload
        },
        setMontoShop: (state, action: PayloadAction<number>) => {
            state.montoShop = action.payload
        },

        setLimit: (state, action: PayloadAction<Limits>) => {
            state.limit = action.payload
        },

        reset: () => initialState,
    },
})

export const { setMonto, setMontoShop, setLimit, reset } = retiroPaymentSlice.actions
export const retiroPaymentSelector = (state: RootState) => state.retiroPayment

export default retiroPaymentSlice.reducer
