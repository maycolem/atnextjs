import styled from 'styled-components'
import Link from 'next/link'
import { BsBook } from 'react-icons/bs'
import facebook from '@layout/assets/redes-sociales/facebook.png'
import twitter from '@layout/assets/redes-sociales/twitter.png'
import instagram from '@layout/assets/redes-sociales/instagram.png'
import youtube from '@layout/assets/redes-sociales/youtube.png'
import tiktok from '@layout/assets/redes-sociales/tiktok.png'
import telegram from '@layout/assets/redes-sociales/telegram.png'
import libroIMG from '@layout/assets/captions/libro.jpeg'
import { GoogleTagManager } from 'google/TagManager'
import Script from 'next/script'
import { MEDIA_QUERIES } from '@styles/MEDIA_QUERIES'

export const Captions = () => {
    const dtFooterMenu = (name) => {
        GoogleTagManager.push({ event: 'atm.event', option: name.toLowerCase(), eventName: 'footer_click' })
    }
    return (
        <CaptionsS>
            <CaptionsTopWrapperS className="CaptionsTopWrapperS">
                <p>SÍGUENOS</p>
                <CaptionsTopLinksS>
                    <Link
                        href="https://www.facebook.com/apuestatotaloficial/"
                        onClick={() => dtFooterMenu('facebook')}
                        rel="nofollow"
                        target="_blank"
                    >
                        <a>
                            <img alt="Facebook" src={facebook.src} />
                        </a>
                    </Link>
                    <Link href="https://twitter.com/apuestatotalof" onClick={() => dtFooterMenu('twitter')} rel="nofollow" target="_blank">
                        <a>
                            <img alt="Twitter" src={twitter.src} />
                        </a>
                    </Link>
                    <Link
                        href="https://www.instagram.com/apuestatotaloficial/"
                        onClick={() => dtFooterMenu('instagram')}
                        rel="nofollow"
                        target="_blank"
                    >
                        <a>
                            <img alt="Instagram" src={instagram.src} />
                        </a>
                    </Link>
                    <Link
                        href="https://www.tiktok.com/@apuestatotaloficial"
                        className="tiktok"
                        onClick={() => dtFooterMenu('tiktok')}
                        rel="nofollow"
                        target="_blank"
                    >
                        <a>
                            <img alt="Tiktok" src={tiktok.src} />
                        </a>
                    </Link>
                    <Link
                        href="https://www.youtube.com/c/ApuestaTotal/featured"
                        onClick={() => dtFooterMenu('youtube')}
                        rel="nofollow"
                        target="_blank"
                    >
                        <a>
                            <img alt="Youtube" src={youtube.src} />
                        </a>
                    </Link>
                    <Link
                        href="https://t.me/televentasapuestatotal"
                        onClick={() => dtFooterMenu('telegram')}
                        rel="nofollow"
                        target="_blank"
                    >
                        <a>
                            <img alt="Telegram" src={telegram.src} />
                        </a>
                    </Link>
                </CaptionsTopLinksS>
            </CaptionsTopWrapperS>

            <Contenedor>
                <Legal
                    data-xcm-image-size="128"
                    data-xcm-image-type="basic-small"
                    data-xcm-seal-id="5a091b68-8b84-43e4-b94f-9caaddd58204"
                    id="xcm-5a091b68-8b84-43e4-b94f-9caaddd58204"
                ></Legal>
                <Script
                    src="https://5a091b68-8b84-43e4-b94f-9caaddd58204.seals-xcm.certria.com/xcm-seal.js"
                    type="text/javascript"
                ></Script>

                <IMGS className="certificate">
                    <div
                        data-apg-image-size="128"
                        data-apg-image-type="basic-small"
                        data-apg-seal-id="8916704f-dcea-4aec-a5f1-aea63f4eed6d"
                        id="apg-8916704f-dcea-4aec-a5f1-aea63f4eed6d"
                    ></div>
                </IMGS>
            </Contenedor>
            <StyledLastItem>
                <More18S>
                    <span>18</span>
                    <span>+</span>
                </More18S>
                <CaptionsBottomS className="CaptionsBottomS">
                    <Link
                        href="https://librodereclamaciones.apuestatotal.com/complaints"
                        className="libro"
                        onClick={() => dtFooterMenu('libro de reclamaciones')}
                        rel="nofollow"
                        target="_blank"
                    >
                        <a className="libro" href="https://librodereclamaciones.apuestatotal.com/complaints" target="_blank">
                            <img src={libroIMG.src} alt="Libro de reclamaciones" />
                        </a>
                    </Link>
                </CaptionsBottomS>
            </StyledLastItem>
        </CaptionsS>
    )
}

const StyledLastItem = styled.div`
    grid-row: span 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 1.5rem;
    margin-top: 1.2em;
    margin-bottom: 1.2em;
`
const Contenedor = styled.div`
    & {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    ${MEDIA_QUERIES.min_width.tabletL} {
        grid-column: span 2;
        flex-direction: row;
        justify-content: center;
    }
    ${MEDIA_QUERIES.min_width.desktopS} {
        grid-column: span 1;
        order: 3;
    }
`

const Legal = styled.div`
    & {
        max-width: 100px;
        margin-top: 1.2em;
    }
`

const IMGS = styled.div`
    & {
        max-width: 150px;
    }
`
const CaptionsS = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    grid-auto-flow: dense;
    ${MEDIA_QUERIES.min_width.tabletL} {
        grid-template-columns: 1fr;
    }
    ${MEDIA_QUERIES.min_width.desktopS} {
        grid-template-columns: 1fr 1fr;
    }
`
const CaptionsTopWrapperS = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    grid-column: span 2;
    color: ${(p) => p.theme.layout.footer.contrastText};

    ${MEDIA_QUERIES.min_width.tabletL} {
        grid-column: span 2;
    }
    ${MEDIA_QUERIES.min_width.desktopS} {
        grid-column: span 1;
    }
`
const CaptionsTopLinksS = styled('div')`
    & {
        display: flex;
        justify-content: center;
        a {
            flex: 1;
            display: flex;
            padding: 0.3rem;
            align-items: center;
            justify-content: center;
            transition: 150ms;
            > svg {
                font-size: 2rem;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            > img,
            > svg {
                filter: grayscale(100%) opacity(80%);
                width: 100%;
                height: initial;
                transition: 150ms;
                max-width: 50px;
            }
            :hover {
                transform: translateY(-3px);
                > svg,
                > img {
                    filter: grayscale(0%) opacity(1);
                }
            }
            /* &.tiktok {
        transform: scale(1.2);
        :hover {
          transform: scale(1.2) translateY(-3px);
        }
      } */
        }
    }
`

const CaptionsBottomS = styled('div')`
    gap: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;

    > .certificate {
        max-width: 150px;
    }
    > .libro {
        display: flex;
        flex-direction: column;
        align-items: center;
        > p {
            text-align: center;
        }
        > svg {
            font-size: 2rem;
        }
        img {
            max-width: 180px;
        }
    }
`
const More18S = styled('div')`
    background-color: #424242;
    border-radius: 0.7rem;
    padding: 0.7rem;
    max-width: 80px;
    aspect-ratio: 1 / 1;
    display: flex;
    align-items: center;
    justify-content: center;
    /* margin: auto; */
    & {
        span {
            font-size: 3rem;
            font-weight: 400;
            color: white;
            :nth-of-type(2) {
                font-size: 2rem;
            }
        }
    }
`
