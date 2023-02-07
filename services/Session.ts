// import { CalimacoClient } from '@calimaco/base'
import { CalimacoClient } from '@calimaco/base'
import { User } from '@interfaces/index'
import _cfg from 'config/config'

function getUser() {
    return {
        getUser: (key = 'user'): User => {
            if (typeof window !== 'undefined' && window.localStorage) {
                return JSON.parse(localStorage?.getItem(key))
            }
        },
    }
}

const sessionIsValid = (client) => {
    return {
        sessionIsValid: async (session) => {
            try {
                const response = await client.validateSession(session)
                if (response.result === 'OK') {
                    return true
                } else {
                    return false
                }
            } catch (error) {
                return false
            }
        },
    }
}

const setUser = () => {
    // CASH
    // BETTING-BONUS
    // CASINO-BONUS
    // DEPOSIT-CASH

    return {
        setUser: (user, key = 'user') => {
            if (typeof window !== 'undefined' && window.localStorage) {
                let accounts = []
                let cash = 0
                let depositcash = 0
                let bettingbonus = 0
                let casinobonus = 0
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
                            // user.activeCasinoBonus = account?.active
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
                localStorage.setItem(key, JSON.stringify(user)) //   document.getElementById("aliasLink").innerHTML=session.getUser().alias;
                return user
            }
        },
    }
}

const removeUser = () => {
    return {
        removeUser: (key = 'user') => {
            if (typeof window !== 'undefined') {
                localStorage?.removeItem(key)
            }
        },
    }
}

export const Session = () => {
    const cfg = _cfg
    const client = new CalimacoClient(cfg)

    return {
        ...setUser(),
        ...getUser(),
        ...sessionIsValid(client),
        ...removeUser(),
    }
}
