import { Limits } from '@interfaces/retiro'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@states/store'

interface Method {
    name: string
    method: string
    img: string
    limits: Limits
}

interface InitialState {
    isOpen: boolean
    method: Method
    frame: string
}

const initialState: InitialState = {
    isOpen: false,
    method: { name: null, method: null, img: null, limits: null },
    frame: null,
}

export const ModalRecarga = createSlice({
    name: 'ModalRecarga',
    initialState,
    reducers: {
        close: (state) => {
            state.isOpen = false
        },
        open: (state) => {
            state.isOpen = true
        },
        setMethod: (state, action: PayloadAction<Method>) => {
            state.method = action.payload
        },
        setFrame: (state, action: PayloadAction<string>) => {
            state.frame = action.payload
        },
        reset: () => initialState,
    },
})

// Action creators are generated for each case reducer function
export const { open, close, reset, setMethod, setFrame } = ModalRecarga.actions
export const ModalRecargaSelector = (state: RootState) => state.ModalRecarga
export const ModalRecargaMethodSelector = (state: RootState) => state.ModalRecarga.method
export const ModalRecargaFrameSelector = (state: RootState) => state.ModalRecarga.frame

export default ModalRecarga.reducer
