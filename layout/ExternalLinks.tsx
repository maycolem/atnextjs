import { PATHS } from 'routes/paths/PATHS'
import Link from 'next/link'
import styled from 'styled-components'
import Podcast from '@layout/assets/redes-sociales/Podcast'
import instagramIMG from '@layout/assets/redes-sociales/instagram.png'
import facebookIMG from '@layout/assets/redes-sociales/facebook.png'
import tiktokIMG from '@layout/assets/redes-sociales/tiktok.png'
import twiterIMG from '@layout/assets/redes-sociales/twitter.png'
import youtubeIMG from '@layout/assets/redes-sociales/youtube.png'
import telegramIMG from '@layout/assets/redes-sociales/telegram.png'
import whatsappIMG from '@layout/assets/redes-sociales/whatsapp.png'
import { dtHeaderMenu } from './dt'
import hexAlpha from 'hex-alpha'
export const ExternalLink = () => {
    return (
        <Styled>
            <Link
                href="https://www.instagram.com/apuestatotaloficial/"
                onClick={() => dtHeaderMenu('instagram')}
                rel="nofollow"
                target="_blank"
            >
                <a>
                    <img alt="Instagram" src={instagramIMG.src}></img>
                </a>
            </Link>
            <Link
                href="https://www.facebook.com/apuestatotaloficial/"
                onClick={() => dtHeaderMenu('facebook')}
                rel="nofollow"
                target="_blank"
            >
                <a>
                    <img alt="Facebook" src={facebookIMG.src}></img>
                </a>
            </Link>
            <Link href="https://www.tiktok.com/@apuestatotaloficial/" onClick={() => dtHeaderMenu('tiktok')} rel="nofollow" target="_blank">
                <a>
                    <img alt="Tiktok" src={tiktokIMG.src}></img>
                </a>
            </Link>
            <Link href="https://twitter.com/apuestatotalof/" onClick={() => dtHeaderMenu('twitter')} rel="nofollow" target="_blank">
                <a>
                    <img alt="Twitter" src={twiterIMG.src}></img>
                </a>
            </Link>
            <Link
                href="https://www.youtube.com/c/ApuestaTotal/featured/"
                onClick={() => dtHeaderMenu('youtube')}
                rel="nofollow"
                target="_blank"
            >
                <a>
                    <img alt="Youtube" src={youtubeIMG.src}></img>
                </a>
            </Link>
            <DividerS></DividerS>
            <Link
                href="https://teleservicios.at/juega/"
                className="Teleservicios"
                onClick={() => dtHeaderMenu('Teleservicios')}
                rel="nofollow noreferrer"
                target="_blank"
            >
                <StyledTeleservicios href="https://teleservicios.at/juega/" target="_blank">
                    <p>Teleservicios</p>
                    <div>
                        <img className="whatsapp" alt="whatsapp" src={whatsappIMG.src}></img>
                        <img className="Telegram" alt="Telegram" src={telegramIMG.src}></img>
                    </div>
                </StyledTeleservicios>
            </Link>
            <Link href={PATHS.PODCAST.url} onClick={() => dtHeaderMenu('podcast')}>
                <a href={PATHS.PODCAST.url}>
                    Podcast
                    <Podcast size="20px" />
                </a>
            </Link>
        </Styled>
    )
}

const StyledTeleservicios = styled.a`
    position: relative;
    > div {
        display: flex;
        flex-direction: column;
        img {
            position: relative;
            &.whatsapp {
                min-width: 17px;
                max-width: 17px;
                z-index: 1;
            }
            &.Telegram {
                z-index: 2;
                min-width: 18px;
                max-width: 18px;
                margin-top: -6px;
                margin-left: 5px;
            }
        }
    }
`
const DividerS = styled.span`
    & {
        height: 100%;
        background: ${(p) => p.theme.palette.alternate18.main};
        width: 1px;
        min-width: 1px;
        max-height: 15px;
        margin-left: 1rem;
        margin-right: 1rem;
    }
`
const Styled = styled.div`
    & {
        display: flex;
        align-items: center;
        flex: 1;
        max-width: 420px;
        gap: 0.8rem;
        > a {
            cursor: pointer;
            font-size: 0.7rem;
            font-weight: 400;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.2rem;
            transition: 150ms;
            flex: 1 0 22px;
            min-height: 100%;
            color: ${(p) => hexAlpha(p.theme.contrastText, 0.8)};
            svg,
            img {
                max-width: 22px;
                filter: grayscale(100%) opacity(0.8);
                transition: 150ms;
                fill: ${(p) => hexAlpha(p.theme.contrastText, 0.8)};
            }

            > svg,
            > svg path {
                transition: 150ms;
            }

            &.Teleservicios,
            &.Podcast {
                transition: 150ms;
                flex: 1 1 initial;
                max-width: initial;
                filter: grayscale(100%) opacity(1);
                img {
                    max-width: 22px;
                    filter: grayscale(100%) opacity(0.9);
                }
            }
            &.Podcast {
                margin-left: 1rem;
            }

            &:hover {
                color: ${(p) => hexAlpha(p.theme.contrastText, 1)};

                transform: translateY(-2px);
                img,
                svg {
                    filter: grayscale(0%) opacity(1);
                    fill: ${(p) => p.theme.primary};
                }
                &.Teleservicios {
                    filter: grayscale(0%) opacity(1);
                    img {
                        filter: grayscale(0%) opacity(1);
                    }
                }
            }
        }
    }
`
