import { LAYOUT_TYPES, PROTECTED_LEVEL_TYPES } from 'config/constants'

export const CUENTA_MY_PROFILE = {
  CUENTA_MY_PROFILE: {
    name: 'Datos',
    url: '/cuenta/mi-perfil',
    protectedLevel: PROTECTED_LEVEL_TYPES.PROTECTED,
    layout: LAYOUT_TYPES.DASHBOARD,
  },
  CUENTA_MY_PROFILE_CAMBIAR_CONTRASEÑA: {
    name: 'Cambio de contraseña',
    url: '/cuenta/mi-perfil/cambiar-password',
    protectedLevel: PROTECTED_LEVEL_TYPES.PROTECTED,
    layout: LAYOUT_TYPES.DASHBOARD,
  },
  CUENTA_MY_PROFILE_NOTIFICACIONES: {
    name: 'Notificaciones',
    url: '/cuenta/mi-perfil/notificaciones',
    protectedLevel: PROTECTED_LEVEL_TYPES.PROTECTED,
    layout: LAYOUT_TYPES.DASHBOARD,
  },
  CUENTA_MY_PROFILE_AUTOEXCLUSION: {
    name: 'Autoexclusión',
    url: '/cuenta/mi-perfil/autoexclusion',
    protectedLevel: PROTECTED_LEVEL_TYPES.PROTECTED,
    layout: LAYOUT_TYPES.DASHBOARD,
  },
}
