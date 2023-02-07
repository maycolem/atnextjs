import { LAYOUT_TYPES, PROTECTED_LEVEL_TYPES } from 'config/constants'

export const MAS_DIVERSION = {
  MAS_DIVERSION_TORNEOS: {
    name: 'Torneos',
    url: '/torneos',
    protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
    layout: LAYOUT_TYPES.DEFAULT,
  },
  MAS_DIVERSION_POKER: {
    name: 'Poker',
    url: '/poker',
    protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
    layout: LAYOUT_TYPES.DEFAULT,
  },
  MAS_DIVERSION_PREDICTOR: {
    name: 'Predictor',
    url: '/predictor',
    protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
    layout: LAYOUT_TYPES.DEFAULT,
  },
  MAS_DIVERSION_JUEGOS_VIRTUALES: {
    name: 'Juegos virtuales',
    url: '/juegos-virtuales',
    protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
    layout: LAYOUT_TYPES.DEFAULT,
  },
  MAS_DIVERSION_ACIERTO_TOTAL: {
    name: 'Acierto total',
    url: '/acierto-total',
    protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
    layout: LAYOUT_TYPES.DEFAULT,
  },
}
