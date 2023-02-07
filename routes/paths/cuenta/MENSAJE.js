import { LAYOUT_TYPES, PROTECTED_LEVEL_TYPES } from 'config/constants'

export const CUENTA_MENSAJE = {
  CUENTA_MENSAJE_BANDEJA_DE_ENTRADA: {
    name: 'Bandeja de entrada',
    url: '/cuenta/mensaje/bandeja-de-entrada',
    protectedLevel: PROTECTED_LEVEL_TYPES.PROTECTED,
    layout: LAYOUT_TYPES.DASHBOARD,
  },
  CUENTA_MENSAJE_MENSAJES_ENVIADOS: {
    name: 'Mensajes enviados',
    url: '/cuenta/mensaje/mensajes-enviados',
    protectedLevel: PROTECTED_LEVEL_TYPES.PROTECTED,
    layout: LAYOUT_TYPES.DASHBOARD,
  },
}
