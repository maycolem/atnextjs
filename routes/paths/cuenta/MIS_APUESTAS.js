import { LAYOUT_TYPES, PROTECTED_LEVEL_TYPES } from 'config/constants'

export const CUENTA_APUESTAS = {
  CUENTA_APUESTAS_MIS_APUESTAS: {
    name: 'Mis apuestas',
    url: '/cuenta/apuestas/mis-apuestas',
    protectedLevel: PROTECTED_LEVEL_TYPES.PROTECTED,
    layout: LAYOUT_TYPES.DASHBOARD,
  },
}
