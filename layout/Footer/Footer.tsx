import styled from 'styled-components'
import { PATHS } from '@routes/paths/PATHS'
import { useRouter } from 'next/router'
import useMediaQueryAT from '@hooks/useMediaQueryAT'
import { MEDIA_QUERIES } from '@styles/MEDIA_QUERIES'
import { TabMenu, PaymentMethods, Links, Captions } from '@layout/Footer'
import { Divider } from '@mui/material'
import hexAlpha from 'hex-alpha'

export const Footer = () => {
    const router = useRouter()
    const pathname = router.pathname
    const desktopS = useMediaQueryAT(MEDIA_QUERIES.min_width.desktopS)

    const hiddenFooter = (path = '') => {
        const urls = [
            PATHS.CASINO_GAME_PROVIDER_GAME_NAME.url,
            PATHS.CASINO_EN_VIVO_GAME_PROVIDER_GAME_NAME.url,
            PATHS.JUEGOS_VIRTUALES_GAME_PROVIDER_GAME_NAME.url,
            PATHS.CASINO_be98867001f70b94097d_SHORTS.url,
        ]
        const hasInclued = urls.includes(path)
        if (hasInclued) {
            return true
        }
        return false
    }
    return (
        <>
            {hiddenFooter(pathname) ? null : (
                <>
                    <Styled>
                        <PaymentMethods />
                        <StyledDivider />
                        <StyledInfoAt>
                            <div className="left">
                                <Links />
                            </div>
                            <div className="rigth">
                                <Captions />
                            </div>
                        </StyledInfoAt>
                        <StyledBottom>
                            <p className="left">
                                El sitio www.apuestatotal.com cuenta con sublicencia otorgada a favor de Free Games B.V. conforme a la
                                Master License 8048/JAZ Antillephone (Antillephone N.V.). Todos los derechos reservados. En Perú es operado
                                por Pasarella Peru S.A.C., sujeto a los terminos y condiciones de este sitio.
                            </p>
                            <p className="domain">Contacto: atencionalcliente@apuestatotal.com</p>
                            <p className="domain">© 2015 - 2022 Apuestatotal.com</p>
                        </StyledBottom>
                    </Styled>
                    {desktopS ? null : <TabMenu />}
                </>
            )}
        </>
    )
}

const StyledInfoAt = styled.div`
    display: flex;
    gap: 1rem;
    flex-direction: column;
    padding: 14px;

    ${MEDIA_QUERIES.min_width.tabletL} {
        flex-direction: row;
        .left {
            flex: 1 1 55%;
        }
        .rigth {
            flex: 1 1 45%;
        }
    }
    ${MEDIA_QUERIES.min_width.desktopS} {
        padding: 14px 50px;
    }
`

const StyledDivider = styled(Divider)`
    && {
        border-color: #ed1c24;
        border-bottom-width: 1.8rem;
    }
`

const Styled = styled.footer`
    background: ${(p) => p.theme.background};
    position: relative;
    z-index: 5;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`

const StyledBottom = styled.div`
    position: relative;
    background-color: transparent;
    z-index: 2;
    /* background: #e0e0e0; */
    background: ${(p) => p.theme.layout.footer.background};
    padding: 14px;
    overflow: hidden;
    ${MEDIA_QUERIES.min_width.desktopS} {
        padding: 14px 50px;
    }
    > p {
        text-align: center;
        color: ${(p) => hexAlpha(p.theme.layout.footer.contrastText, 0.7)};
        font-size: 0.9rem;
        @media (min-width: 900px) {
            &.left {
                text-align: left;
            }
        }
        &.domain {
            margin-top: 1rem;
        }
    }
`
