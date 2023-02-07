import { LAYOUT_TYPES, PROTECTED_LEVEL_TYPES } from 'config/constants'

export const CUENTA_BONOS = {
  CUENTA_BONOS_SPORTBOOK: {
    name: 'Sportbook',
    url: '/cuenta/bonos/sportbook',
    protectedLevel: PROTECTED_LEVEL_TYPES.PROTECTED,
    layout: LAYOUT_TYPES.DASHBOARD,
  },
  CUENTA_BONOS_CASINO: {
    name: 'Casino',
    url: '/cuenta/bonos/casino',
    protectedLevel: PROTECTED_LEVEL_TYPES.PROTECTED,
    layout: LAYOUT_TYPES.DASHBOARD,
  },
}
