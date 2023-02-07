import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@states/store'

type Severity = 'error' | 'success' | 'info' | 'warning'

interface InitialState {
    message: string
    severity?: Severity
    open?: boolean
    autoHideDuration?: number
}

const initialState: InitialState = {
    message: '',
    severity: 'error',
    open: false,
    autoHideDuration: 0,
}

export const SnackBar = createSlice({
    name: 'SnackBar',
    initialState,
    reducers: {
        onOpen: (state, action: PayloadAction<InitialState>) => {
            state.message = action.payload?.message
            state.severity = action.payload?.severity || 'error'
            state.autoHideDuration = action.payload?.autoHideDuration || 10000
            state.open = action.payload?.open || true
        },
        onClose: (state) => ({
            open: false,
            severity: state.severity,
            message: state.message,
            autoHideDuration: state.autoHideDuration,
        }),
        reset: () => initialState,
    },
})

// Action creators are generated for each case reducer function
export const { reset, onOpen, onClose } = SnackBar.actions
export const SnackBarSelector = (state: RootState) => state.SnackBar

export default SnackBar.reducer
