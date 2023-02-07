import { LAYOUT_TYPES, PROTECTED_LEVEL_TYPES } from 'config/constants'
import { CUENTA_MY_PROFILE } from './cuenta/MI_PERFIL'
import { CUENTA_APUESTAS } from './cuenta/MIS_APUESTAS'
import { CUENTA_BONOS } from './cuenta/BONOS'
import { CUENTA_MENSAJE } from './cuenta/MENSAJE'
import { MAS_DIVERSION } from './mas-diversion/MAS_DIVERSION'
import { CUENTA_RECARGA } from './cuenta/RECARGA'
import { CUENTA_RETIRO } from './cuenta/RETIRO'
import { HISTORIAL_SALDO } from './cuenta/HISTORIAL'
import { MIS_APUESTAS_DEPORTIVAS } from './cuenta/MIS_APUESTAS_DEPORTIVAS'
import { MIS_NOTIFICACIONES } from './cuenta/MIS_NOTIFICACIONES'

export const PATHS = {
    TEST: {
        name: 'AmbienteTest',
        url: '/test',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.DEFAULT,
    },

    PAGINACION: {
        name: 'Paginacion',
        url: '/paginacion',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.DEFAULT,
    },

    PAYOUT_EXITOSO: {
        name: 'payoutOkIframe',
        url: '/private/payoutOkIframe',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.WITHOUT,
    },

    RESET_PASSWORD: {
        name: 'resetPassword',
        url: '/resetPassword',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.DEFAULT,
    },

    PAYOUT_ERROR: {
        name: 'payoutOkIframe',
        url: '/private/payoutErrorIframe',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.WITHOUT,
    },

    HOME: {
        name: '',
        url: '/',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.DEFAULT,
    },

    TORNEO: {
        name: 'Torneos',
        url: '/torneos',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.DEFAULT,
    },
    TORNEO_57ba79a5dfb25b30a053d3c7cb2e06e1e40e2723eade72cf226a77e13de62214: {
        name: 'torneos-57ba79a5dfb25b30a053d3c7cb2e06e1e40e2723eade72cf226a77e13de62214',
        url: '/torneos-57ba79a5dfb25b30a053d3c7cb2e06e1e40e2723eade72cf226a77e13de62214',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.DEFAULT,
    },

    TORNEO_DETAIL: {
        name: 'Torneo detail',
        url: '/torneos/[nameTorneo]',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.DEFAULT,
    },

    TORNEO_DETAIL_57ba79a5dfb25b30a053d3c7cb2e06e1e40e2723eade72cf226a77e13de62214: {
        name: 'torneos-57ba79a5dfb25b30a053d3c7cb2e06e1e40e2723eade72cf226a77e13de62214 detail',
        url: '/torneos-57ba79a5dfb25b30a053d3c7cb2e06e1e40e2723eade72cf226a77e13de62214/[nameTorneo]',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.DEFAULT,
    },

    NOSOTROS: {
        name: 'Acerca de Apuesta Total',
        url: '/acerca-de-apuesta-total',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.DEFAULT,
    },
    SERVICIO_CLIENTE: {
        name: 'Servicio al Cliente',
        url: '/servicio-al-cliente',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.DEFAULT,
    },
    JUEGO_RESPONSABLE: {
        name: 'Juego Responsable',
        url: '/juego-responsable',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.DEFAULT,
    },
    TERRITORIO_RESTRINGIDO: {
        name: 'Territorios Restringidos',
        url: '/territorios-restringidos',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.DEFAULT,
    },
    POLITICA_DE_COOKIES: {
        name: 'Politica de cookies',
        url: '/politica-de-cookies',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.DEFAULT,
    },
    PREGUNTAS_FRECUENTES: {
        name: 'Preguntas frecuentes',
        url: '/preguntas-frecuentes',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.DEFAULT,
    },
    TURORIALES: {
        name: 'Tutoriales',
        url: '/tutoriales',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.DEFAULT,
    },
    TURORIALES_TUTORIAL: {
        name: 'Tutorial',
        url: '/tutoriales/[tutorial]',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.DEFAULT,
    },
    RESULTADOS: {
        name: 'Resultados',
        url: '/resultados',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.DEFAULT,
    },
    LOGIN: {
        name: 'Login',
        url: '/login',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.WITHOUT,
    },
    REGLAMENTO_DEL_JUEGO: {
        name: 'Reglamento de juego',
        url: '/reglamento-de-juego',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.DEFAULT,
    },
    PROMOCIONES: {
        name: 'Promociones',
        url: '/promociones',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.DEFAULT,
    },
    PROMOCIONES_DETALLES: {
        name: 'Promociones detail',
        url: '/promociones/[promotion]',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.DEFAULT,
    },
    PROMOCIONES_GANADORES_PROMO_KUSHKI: {
        name: 'Promociones detail',
        url: '/promociones/ganadores/promo-kushki',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.DEFAULT,
    },
    LUNES_GANADOR: {
        name: 'Lunes Ganador',
        url: '/lunes-ganador',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.DEFAULT,
    },
    REGISTRO: {
        name: 'Registrate',
        url: '/registro',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.WITHOUT,
    },
    REGISTR_CLUBLINE: {
        name: 'Registrate clubonline',
        url: '/registro/clubonline',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.WITHOUT,
    },
    REGISTRO_KINGPALCE: {
        name: 'Registrate kingpalace',
        url: '/registro/kingpalace',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.WITHOUT,
    },
    REGISTRO_MOULINROUGE: {
        name: 'Registrate',
        url: '/registro/moulinrouge',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.WITHOUT,
    },
    TELE_SERVICIOS: {
        name: 'Teleservicios',
        url: '/teleservicios',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.DEFAULT,
    },
    RECARGAS_PAGE_PUBLIC: {
        name: 'Recargas',
        url: '/recargas',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.DEFAULT,
    },
    RETIROS_PAGE_PUBLIC: {
        name: 'Retiros',
        url: '/retiros',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.DEFAULT,
    },
    PODCAST: {
        name: 'Podcast',
        url: '/podcast',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.DEFAULT,
    },
    LIGAS_EUROPEA: {
        name: 'Ligas europeas',
        url: '/ligas-europeas',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.DEFAULT,
    },
    SORTEOS: {
        name: 'Sorteos Camisas',
        url: '/sorteos',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.DEFAULT,
    },
    MUNDIAL: {
        name: 'Promo Mundial',
        url: '/promo-mundial',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.DEFAULT,
    },
    PUNTOS_VIRTUALES: {
        name: 'Puntos Virtuales',
        url: '/puntos-virtuales',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.DEFAULT,
    },

    TERMINALE_TAMBO: {
        name: 'Terminales Tambo',
        url: '/terminales_tambo',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.DEFAULT,
    },
    NUESTRAS_TIENDAS: {
        name: 'Nuestras Tiendas',
        url: '/nuestras-tiendas',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.DEFAULT,
    },
    NOTICIAS: {
        name: 'Noticias',
        url: '/noticias',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.DEFAULT,
    },
    NOTICIA_DETAIL: {
        name: 'Detalles de la noticia',
        url: '/noticias/[slug]/[id]',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.DEFAULT,
    },
    APUESTAS_DEPORTIVAS: {
        name: 'Apuestas deportivas',
        url: '/apuestas-deportivas',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.DEFAULT,
    },
    INFORMACION_APUESTAS_DEPORTIVAS: {
        name: 'Informacion Apuestas Deportivas',
        url: '/informacion-apuestas-deportivas',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.DEFAULT,
    },
    APUESTAS_EN_VIVO: {
        name: 'Apuestas en vivo',
        url: '/apuestas-en-vivo',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.DEFAULT,
    },
    APUESTAS_VIRTUALES: {
        name: 'Apuestas virtuales',
        url: '/apuestas-virtuales',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.DEFAULT,
    },
    BINGO: {
        name: 'Bingo',
        url: '/bingo',
        protectedLevel: PROTECTED_LEVEL_TYPES.PROTECTED,
        layout: LAYOUT_TYPES.DEFAULT,
    },
    CASINO_EN_VIVO: {
        name: 'Casino en vivo',
        url: '/casino-en-vivo',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.DEFAULT,
    },
    CASINO_EN_VIVO_k2js323kd12: {
        name: 'Casino en vivo k2js323kd12',
        url: '/casino-en-vivo-k2js323kd12',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.DEFAULT,
    },
    CASINO: {
        name: 'Casino',
        url: '/casino',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.DEFAULT,
    },
    CASINO_be98867001f70b94097d: {
        name: 'Casino',
        url: '/casino-be98867001f70b94097d',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.DEFAULT,
    },
    CASINO_be98867001f70b94097d_FAVORITOS: {
        name: 'Casino Favoritos',
        url: '/casino-be98867001f70b94097d/favoritos',
        protectedLevel: PROTECTED_LEVEL_TYPES.PROTECTED,
        layout: LAYOUT_TYPES.WITHOUT,
    },
    CASINO_be98867001f70b94097d_TODOS: {
        name: 'Casino Todos',
        url: '/casino-be98867001f70b94097d/todos',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.WITHOUT,
    },
    CASINO_be98867001f70b94097d_SHORTS: {
        name: 'Casino Shorts',
        url: '/casino-be98867001f70b94097d/shorts',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.WITHOUT,
        // layout: LAYOUT_TYPES.DEFAULT,
    },
    CASINO_GAME_PROVIDER_GAME_NAME: {
        name: 'Casino game by provider and name',
        url: '/casino/[provider]/[gameName]',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.DEFAULT,
    },
    CASINO_EN_VIVO_GAME_PROVIDER_GAME_NAME: {
        name: 'Casino en vivo game by provider and name',
        url: '/casino-en-vivo/[provider]/[gameName]',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.DEFAULT,
    },
    CALENDARIO_PREMIER_LEAGUE: {
        name: 'calendario premier league',
        url: '/calendario-premier-league',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.DEFAULT,
    },
    JUEGOS_VIRTUALES_GAME_PROVIDER_GAME_NAME: {
        name: 'Juegos virtuales game by provider and name',
        url: '/juegos-virtuales/[provider]/[gameName]',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.DEFAULT,
    },
    BINGO_GAME: {
        name: 'Bingo game',
        url: '/bingo/game',
        protectedLevel: PROTECTED_LEVEL_TYPES.PROTECTED,
        layout: LAYOUT_TYPES.DEFAULT,
    },
    POLITICAS_DE_PRIVACIDAD: {
        name: 'Politicas de privacidad',
        url: '/politicas-de-privacidad',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.DEFAULT,
    },
    INTERNA_DEPOSITO_EXITOSO: {
        name: 'Deposito exitoso',
        url: '/interna/deposito-exitoso',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.WITHOUT,
    },
    JUEGOS_VIRTUALES: {
        name: 'Juegos virtuales',
        url: '/juegos-virtuales',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.DEFAULT,
    },
    TORITO_DE_ORO: {
        name: 'Torito de oro',
        url: '/torito-de-oro',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.DEFAULT,
    },
    CREADOR_DE_APUESTAS: {
        name: 'Creador de apuestas',
        url: '/creador-de-apuestas',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.DEFAULT,
    },

    ...MAS_DIVERSION,

    // CUENTA_RETIRO: {
    //   name: 'Retiro',
    //   url: '/cuenta/retirar',
    //   protectedLevel: PROTECTED_LEVEL_TYPES.PROTECTED,
    //   layout: LAYOUT_TYPES.DASHBOARD,
    // },

    // CUENTA_RETIRO_TRANSFERENCIA: {
    //   name: 'Transferencia bancaria',
    //   url: '/cuenta/retirar/transferencia-bancaria',
    //   protectedLevel: PROTECTED_LEVEL_TYPES.PROTECTED,
    //   layout: LAYOUT_TYPES.DASHBOARD,
    // },

    // CUENTA_RETIRO_PUNTO_DE_VENTA: {
    //   name: 'Punto de venta',
    //   url: '/cuenta/retirar/punto-de-venta',
    //   protectedLevel: PROTECTED_LEVEL_TYPES.PROTECTED,
    //   layout: LAYOUT_TYPES.DASHBOARD,
    // },

    // CUENTA_RETIRO_OTROS: {
    //   name: 'Otros',
    //   url: '/cuenta/retirar/otros',
    //   protectedLevel: PROTECTED_LEVEL_TYPES.PROTECTED,
    //   layout: LAYOUT_TYPES.DASHBOARD,
    // },

    CUENTA_RETIRO_ESTADO_DE_SOLICITUD: {
        name: 'Estado de solicitud',
        url: '/cuenta/retirar/estado-de-solicitud',
        protectedLevel: PROTECTED_LEVEL_TYPES.PROTECTED,
        layout: LAYOUT_TYPES.DASHBOARD,
    },

    CUENTA_VERIFICAR: {
        name: 'Verificar tu cuenta',
        url: '/cuenta/verificar',
        protectedLevel: PROTECTED_LEVEL_TYPES.PROTECTED,
        layout: LAYOUT_TYPES.DASHBOARD,
    },
    CUENTA_VERIFICAR_ESTADO: {
        name: 'Estado del documento',
        url: '/cuenta/verificar/estado',
        protectedLevel: PROTECTED_LEVEL_TYPES.PROTECTED,
        layout: LAYOUT_TYPES.DASHBOARD,
    },
    CUENTA_BONOS_Y_TORNEOS_BONOS: {
        name: 'Mis bonos',
        url: '/cuenta/bonos-y-torneos/bonos',
        protectedLevel: PROTECTED_LEVEL_TYPES.PROTECTED,
        layout: LAYOUT_TYPES.DASHBOARD,
    },
    CUENTA_BONOS_Y_TORNEOS_TORNEOS: {
        name: 'Mis torneos',
        url: '/cuenta/bonos-y-torneos/torneos',
        protectedLevel: PROTECTED_LEVEL_TYPES.PROTECTED,
        layout: LAYOUT_TYPES.DASHBOARD,
    },
    CUENTA_BONOS_Y_TORNEOS_CODIGO_PROMOCIONAL: {
        name: 'Código promocional',
        url: '/cuenta/bonos-y-torneos/codigo-promocional',
        protectedLevel: PROTECTED_LEVEL_TYPES.PROTECTED,
        layout: LAYOUT_TYPES.DASHBOARD,
    },

    GANA_CONAT: {
        name: 'Gana Conat',
        url: '/ganaconat',
        protectedLevel: PROTECTED_LEVEL_TYPES.UNPROTECTED,
        layout: LAYOUT_TYPES.DEFAULT,
    },

    ...CUENTA_MY_PROFILE,
    ...CUENTA_RECARGA,
    ...CUENTA_RETIRO,
    ...HISTORIAL_SALDO,
    ...MIS_APUESTAS_DEPORTIVAS,
    ...MIS_NOTIFICACIONES,
}
