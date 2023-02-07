import { LAYOUT_TYPES, PROTECTED_LEVEL_TYPES } from 'config/constants'

export const CUENTA_RECARGA = {
  CUENTA_RECARGA: {
    name: 'Recargar',
    url: '/cuenta/recargar',
    protectedLevel: PROTECTED_LEVEL_TYPES.PROTECTED,
    layout: LAYOUT_TYPES.DASHBOARD,
  },
  CUENTA_RECARGA_METODO_DE_PAGO: {
    name: 'Metodo de pago',
    url: '/cuenta/recargar/[methodName]',
    protectedLevel: PROTECTED_LEVEL_TYPES.PROTECTED,
    layout: LAYOUT_TYPES.DASHBOARD,
  },
  CUENTA_RECARGA_CONFIRMAR: {
    name: 'Confirmar recarga',
    url: '/cuenta/recargar/[methodName]/confirmar',
    protectedLevel: PROTECTED_LEVEL_TYPES.PROTECTED,
    layout: LAYOUT_TYPES.DASHBOARD,
  },
  CUENTA_RECARGA_HISTORIAL_DE_DEPOSITO: {
    name: 'Historial de depósito',
    url: '/cuenta/recargar/historial-de-deposito',
    protectedLevel: PROTECTED_LEVEL_TYPES.PROTECTED,
    layout: LAYOUT_TYPES.DASHBOARD,
  },
}
