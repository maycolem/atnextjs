import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '@states/store'

function getValue() {
    if (typeof window !== 'undefined') {
        return JSON.parse(window.localStorage.getItem('IsLogout')) || false
    }
}
function setValue() {
    if (typeof window !== 'undefined') {
        localStorage?.setItem('IsLogout', JSON.stringify('true'))
    }
}
function remove() {
    if (typeof window !== 'undefined') {
        localStorage?.removeItem('IsLogout')
    }
}

interface InitialState {
    isOpen: boolean
}

const initialState: InitialState = {
    isOpen: getValue() || false,
}

export const ModalLogout = createSlice({
    name: 'ModalLogout',
    initialState,
    reducers: {
        open: (state) => {
            state.isOpen = true
        },
        setIsLogout: () => {
            setValue()
        },
        removeIsLogout: () => {
            remove()
        },
        reset: (state) => {
            remove()
            state.isOpen = false
        },
    },
})

// Action creators are generated for each case reducer function
export const { open, reset, setIsLogout, removeIsLogout } = ModalLogout.actions
export const ModalLogoutSelector = (state: RootState) => state.ModalLogout

export default ModalLogout.reducer
