import Link from 'next/link'
import { PATHS } from 'routes/paths/PATHS'
import styled from 'styled-components'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import { GoogleTagManager } from 'google/TagManager'
import React from 'react'
import hexAlpha from 'hex-alpha'

const APUESTA_TOTAL_LINKS = [
    {
        ...PATHS.NOSOTROS,
    },
    {
        ...PATHS.REGLAMENTO_DEL_JUEGO,
    },
    {
        ...PATHS.JUEGO_RESPONSABLE,
    },
    {
        url: PATHS.POLITICAS_DE_PRIVACIDAD.url,
        name: PATHS.POLITICAS_DE_PRIVACIDAD.name,
    },
    {
        url: PATHS.SERVICIO_CLIENTE.url,
        name: PATHS.SERVICIO_CLIENTE.name,
    },
    {
        ...PATHS.TERRITORIO_RESTRINGIDO,
    },
    {
        ...PATHS.POLITICA_DE_COOKIES,
    },

    {
        url: PATHS.NUESTRAS_TIENDAS.url,
        name: PATHS.NUESTRAS_TIENDAS.name,
    },
]
const PRODUCTOS = [
    {
        name: PATHS.APUESTAS_DEPORTIVAS.name,
        url: PATHS.APUESTAS_DEPORTIVAS.url,
    },
    {
        name: PATHS.APUESTAS_EN_VIVO.name,
        url: PATHS.APUESTAS_EN_VIVO.url,
    },
    {
        name: PATHS.CASINO.name,
        url: PATHS.CASINO.url,
    },
    {
        name: PATHS.CASINO_EN_VIVO.name,
        url: PATHS.CASINO_EN_VIVO.url,
    },
    {
        name: PATHS.JUEGOS_VIRTUALES.name,
        url: PATHS.JUEGOS_VIRTUALES.url,
    },
    // {
    //   name: PATHS.PREDICTOR.name,
    //   url: PATHS.PREDICTOR.url,
    // },
    {
        name: PATHS.TORITO_DE_ORO.name,
        url: PATHS.TORITO_DE_ORO.url,
    },
    {
        name: PATHS.BINGO.name,
        url: PATHS.BINGO.url,
    },
]
const AYUDA = [
    {
        name: PATHS.PREGUNTAS_FRECUENTES.name,
        url: PATHS.PREGUNTAS_FRECUENTES.url,
    },

    {
        url: PATHS.RECARGAS_PAGE_PUBLIC.url,
        name: PATHS.RECARGAS_PAGE_PUBLIC.name,
    },
    {
        url: PATHS.RETIROS_PAGE_PUBLIC.url,
        name: PATHS.RETIROS_PAGE_PUBLIC.name,
    },
    {
        url: PATHS.PROMOCIONES.url,
        name: PATHS.PROMOCIONES.name,
    },
    {
        url: PATHS.TELE_SERVICIOS.url,
        name: 'Acerca de Teleservicios',
    },
    {
        url: PATHS.TURORIALES.url,
        name: PATHS.TURORIALES.name,
    },
    // {
    //   url: PATHS.NUESTRAS_TIENDAS.url,
    //   name: PATHS.NUESTRAS_TIENDAS.name,
    // },
]
export const Links = () => {
    const dtFooterMenu = (name) => {
        GoogleTagManager.push({ event: 'atm.event', option: name.toLowerCase(), eventName: 'footer_click' })
    }
    return (
        <Styled>
            <LinkS>
                <p>APUESTA TOTAL</p>
                <LinksBottomS>
                    {APUESTA_TOTAL_LINKS.map((link, i) => {
                        // if (link.name.toLowerCase().includes('apuesta total')) {
                        //     return (
                        //         <DivS className={link.name.split(' ').join('-')} key={i}>
                        //             <Link href={link.url} onClick={() => dtFooterMenu(link.name)} title={link.name}>
                        //                 <a>
                        //                     <span>
                        //                         <span>{link.name.split(' ')[0] + ' ' + link.name.split(' ')[1]}</span>
                        //                         <span>{link.name.split(' ').slice(2).join(' ')}</span>
                        //                     </span>
                        //                 </a>
                        //             </Link>
                        //         </DivS>
                        //     )
                        // }
                        return (
                            <React.Fragment key={i}>
                                <div onClick={() => dtFooterMenu(link.name)}>
                                    <Link href={link.url} title={link.name}>
                                        <a>{link.name}</a>
                                    </Link>
                                </div>
                            </React.Fragment>
                        )
                    })}
                </LinksBottomS>
            </LinkS>

            <LinkS>
                <p>PRODUCTOS</p>
                <LinksBottomS>
                    {PRODUCTOS.map((link, i) => (
                        <React.Fragment key={i}>
                            <div onClick={() => dtFooterMenu(link.name)}>
                                <Link href={link.url} title={link.name}>
                                    <a>{link.name}</a>
                                </Link>
                            </div>
                        </React.Fragment>
                    ))}
                </LinksBottomS>
            </LinkS>

            <LinkS>
                <p>AYUDA</p>
                <LinksBottomS>
                    {AYUDA.map((link, i) => (
                        <React.Fragment key={i}>
                            <div onClick={() => dtFooterMenu(link.name)}>
                                <Link href={link.url} title={link.name}>
                                    <a>{link.name}</a>
                                </Link>
                            </div>
                        </React.Fragment>
                    ))}
                </LinksBottomS>
            </LinkS>
        </Styled>
    )
}

const Styled = styled.div`
    display: flex;
`

const LinkS = styled.div`
    flex: 1;
    padding-right: 10px;
    &:not(:first-of-type) {
        border-left: 1px solid ${(p) => hexAlpha(p.theme.layout.footer.contrastText, 0.4)};
        padding-left: 10px;
    }
    & {
        p {
            font-weight: 700;
            font-size: 1rem;
            min-height: 30px;
            color: ${(p) => p.theme.layout.footer.contrastText};
        }
        ${MEDIA_QUERIES.min_width.desktopS} {
            p {
                font-size: 1.1rem;
            }
        }
    }
`
const LinksBottomS = styled.div`
    && {
        margin-top: 0.6rem;
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
        a {
            font-size: 1rem;
            transition: 250ms;
            white-space: initial;
            overflow: hidden;
            text-overflow: ellipsis;
            text-transform: lowercase;
            /* color: ${(p) => p.theme.palette.alternate11.main}; */
            color: ${(p) => hexAlpha(p.theme.layout.footer.contrastText, 0.7)};
            ::first-letter {
                text-transform: uppercase;
            }
        }
    }
`
