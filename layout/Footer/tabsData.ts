import { SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { PATHS } from '@routes/paths/PATHS'
import WifiTetheringIcon from '@mui/icons-material/WifiTethering'
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer'
import CasinoIcon from '@mui/icons-material/Casino'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
import SendTimeExtensionIcon from '@mui/icons-material/SendTimeExtension'
export const tabs: {
    path: string
    hash?: string
    dtText: string
    text: string
    Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
        muiName: string
    }
}[] = [
    {
        path: PATHS.APUESTAS_EN_VIVO.url,
        hash: '#/live',
        dtText: 'apuestas en vivo',
        text: 'APUESTAS EN VIVO',
        Icon: WifiTetheringIcon,
    },
    {
        path: PATHS.APUESTAS_DEPORTIVAS.url,
        hash: '',
        dtText: 'apuestas deportivas',
        text: 'APUESTAS DEPORTIVAS',
        Icon: SportsSoccerIcon,
    },
    {
        path: PATHS.CASINO.url,
        hash: '',
        dtText: 'jugar casino',
        text: 'JUGAR CASINO',
        Icon: CasinoIcon,
    },
    {
        path: PATHS.CASINO_EN_VIVO.url,
        hash: '',
        dtText: 'live casino',
        text: 'LIVE CASINO',
        Icon: MonetizationOnIcon,
    },
    {
        path: PATHS.MAS_DIVERSION_JUEGOS_VIRTUALES.url,
        hash: '',
        dtText: 'juegos virtuales',
        text: 'JUEGOS VIRTUALES',
        Icon: SendTimeExtensionIcon,
    },
]
