import { LAYOUT_TYPES, PROTECTED_LEVEL_TYPES } from 'config/constants'

export const CUENTA_RETIRO = {
  
  CUENTA_RETIRO: {
    name: 'Retiro',
    url: '/cuenta/retirar',
    protectedLevel: PROTECTED_LEVEL_TYPES.PROTECTED,
    layout: LAYOUT_TYPES.DASHBOARD,
  },

  CUENTA_RETIRO_METODO_DE_PAGO: {
    name: 'Metodo de retiro',
    url: '/cuenta/retirar/[methodName]',
    protectedLevel: PROTECTED_LEVEL_TYPES.PROTECTED,
    layout: LAYOUT_TYPES.DASHBOARD,
  }

}
