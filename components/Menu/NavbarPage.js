import styled from '@emotion/styled'
import { PATHS } from 'routes/paths/PATHS'
import Link from 'next/link'
import { FONTS_SIZE } from 'styles/FONTS_SIZE'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'

export const NAVBAR_LINKS = [
    {
        name: 'APUESTAS DEPORTIVAS',
        url: '/apuestas-deportivas',
    },
    {
        name: 'APUESTAS EN VIVO',
        url: '/apuestas-en-vivo',
    },
    {
        name: 'CASINO',
        url: '/casino',
    },
    {
        name: 'JUEGOS VIRTUALES',
        url: '/juegos-virtuales',
    },
    {
        name: 'TIENDAS',
        url: '/nuestras-tiendas',
    },
]
const NavbarPage = () => {
    return (
        <NavbarPageS>
            {NAVBAR_LINKS.map((item) => (
                <Link href={item.url} key={item.name}>
                    <span>{item.name}</span>
                </Link>
            ))}
        </NavbarPageS>
    )
}

export default NavbarPage
const NavbarPageS = styled.div`
    & {
        display: flex;
        align-items: center;
        gap: 1rem;
        a {
            text-align: right;
            font-size: ${FONTS_SIZE.xs};
            font-weight: 500;
        }
        ${MEDIA_QUERIES.min_width.desktopM} {
            a {
                text-align: right;
                font-size: ${FONTS_SIZE.sm};
                font-weight: 500;
            }
        }
    }
`
