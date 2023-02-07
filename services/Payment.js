import { CalimacoClient } from '@calimaco/base'
import _cfg from 'config/config'

const getDepositLobby = (client) => {
  return {
    getDepositLobby: async (userSession) => {
      try {
        const response = await client.getDepositLobby(userSession)
        return response
      } catch (error) {
        return error
      }
    },
  }
}

export const Payment = () => {
  const cfg = _cfg
  const client = new CalimacoClient(cfg)

  return {
    ...getDepositLobby(client),
  }
}
