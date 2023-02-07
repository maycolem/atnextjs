import { User } from '@interfaces/index'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@states/store'
import { Session } from 'services/Session'

interface InitialState {
    user: User
}

const initialState: InitialState = {
    user: Session().getUser('user') || null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            let user = action.payload
            let accounts = []
            let cash = 0
            let depositcash = 0
            let bettingbonus = 0
            let casinobonus = 0
            let active = 0
            if (user && user.accounts && Array.isArray(user.accounts)) {
                accounts = user.accounts || []
                accounts.forEach((account) => {
                    if (account && account?.account === 'CASH') {
                        cash += Number(account?.amount) || 0
                        return
                    }
                    if (account && account?.account === 'DEPOSIT-CASH') {
                        depositcash += Number(account?.amount) || 0
                        return
                    }
                    if (account && account?.account === 'BETTING-BONUS') {
                        bettingbonus += Number(account?.amount) || 0
                        return
                    }
                    if (account && account?.account === 'CASINO-BONUS') {
                        casinobonus += Number(account?.amount) || 0
                        active = account?.active
                    }
                })
            }
            user.totalAmount = Number(cash)
            user.depositCash = Number(depositcash)
            user.bettingBonus = Number(bettingbonus)
            user.casinoBonus = Number(casinobonus)
            // user.saldoRetirable = 25000
            user.saldoRetirable = Number(cash) - Number(depositcash)
            user.totalBonus = Number(bettingbonus) + Number(casinobonus)
            user.activeCasinoBonus = Boolean(active)

            state.user = user
            localStorage.setItem('user', JSON.stringify(user))
        },
        setActiveBonus: (state, action: PayloadAction<boolean>) => {
            const user = { ...state.user, activeCasinoBonus: action.payload }
            state.user = user
            localStorage.setItem('user', JSON.stringify(user))
        },
        reset: (state) => {
            localStorage.removeItem('user')
            state.user = null
        },
    },
})

// Action creators are generated for each case reducer function
export const { reset, setUser, setActiveBonus } = userSlice.actions
export const userSelector = (state: RootState) => state?.user?.user as User
export const userSessionSelector = (state: RootState) => state?.user?.user?.session

export default userSlice.reducer
