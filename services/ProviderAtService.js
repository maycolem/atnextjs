// import { CalimacoClient } from '@calimaco/base'
import { CalimacoClient } from '@calimaco/base'
// import CalimacoSession from '@calimaco/npm-package-react-test/dist/components/Session'
import cfg from 'config/config'
import { Session } from './Session'
export class ProviderAt {
  #client
  #sessionId
  #config
  constructor() {
    this.#client = new CalimacoClient(cfg)
    this.#config = cfg
  }

  async login(username, password) {
    const res = await this.#client.login(username, password)

    if (res.result === 'OK') {
      this.#sessionId = res.user.session

      return {
        success: true,
        user: res.user,
        session: res.user.session,
        message: 'Login Ok!',
        code: null,
      }
    }
    if (res.result === 'error') {
      return {
        success: false,
        user: null,
        session: null,
        message: res.description,
        code: res.code,
      }
    }
  }

  async userDetail(sessionId) {
    const res = await this.#client.getUserDetails(sessionId ?? this.#sessionId)
    if (res.result === 'OK') {
      return {
        success: true,
        user: res.user,
        message: 'Details Ok!',
        code: null,
      }
    } else {
      return {
        success: false,
        user: null,
        message: res.description,
        code: res.code,
      }
    }
  }

  // validar la session - el user almacenado en LocalStorage debe tener la propiedad session (session token)

  // almacenar el usuario en la sessionStorage
  async setUserInSession(user) {
    const total = this.#userTotalAmount(user.accounts)
    user.totalAmount = total
    user.session = this.#sessionId
    await Promise.resolve(Session().setUser(user))
  }

  // obtener los datos del usuario almacenados en SessioStorage
  static getUserOfSession() {
    return Session().getUser()
  }

  // {
  //   "event": "logoutOk",
  //   "ip": "181.66.151.171",
  //   "result": "OK"
  // }
  async logout() {
    const session = Session().getUser()?.session ?? ''
    const res = await this.#client.logout(session)
    Session().removeUser('user')

    if (res.result === 'OK') {
      return {
        success: true,
        user: null,
        message: res.result,
        code: null,
      }
    }
    return {
      success: false,
      user: null,
      message: res.result,
      code: null,
    }
  }

  #userTotalAmount(accounts) {
    let total = 0
    accounts.forEach((account) => {
      if (account.account !== 'XP') {
        total += account.amount
      }
    })
    return total
  }
}
