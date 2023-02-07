import { PATHS } from 'routes/paths/PATHS'
import Link from 'next/link'
import styled from 'styled-components'
import { GoogleTagManager } from 'google/TagManager'
import Podcast from './ExternalLinksSVG/Podcast'
import instagramIMG from '@layout/assets/redes-sociales/instagram.png'
import facebookIMG from '@layout/assets/redes-sociales/facebook.png'
import tiktokIMG from '@layout/assets/redes-sociales/tiktok.png'
import twiterIMG from '@layout/assets/redes-sociales/twitter.png'
import youtubeIMG from '@layout/assets/redes-sociales/youtube.png'
import telegramIMG from '@layout/assets/redes-sociales/telegram.png'
const ExternalLink = () => {
    const dtHeaderMenu = (name) => {
        GoogleTagManager.push({ event: 'atm.event', option: name.toLowerCase(), eventName: 'header_click' })
    }

    return (
        <ExternalLinkS>
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
                href="https://t.me/Televentas_at_bot"
                className="Teleservicios"
                onClick={() => dtHeaderMenu('Teleservicios')}
                rel="nofollow noreferrer"
                target="_blank"
            >
                <a>
                    Teleservicios<img alt="Telegram" src={telegramIMG.src}></img>
                </a>
            </Link>
            <Link href={PATHS.PODCAST.url} className="Podcast" onClick={() => dtHeaderMenu('podcast')}>
                <a>
                    Podcast
                    <Podcast size="20px" />
                </a>
            </Link>
        </ExternalLinkS>
    )
}

export default ExternalLink
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
const ExternalLinkS = styled.div`
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
            color: ${(p) => p.theme.palette.alternate18.main};
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.2rem;
            transition: 150ms;
            flex: 1 0 22px;
            min-height: 100%;
            svg,
            img {
                max-width: 22px;
            }
            > img {
                filter: grayscale(100%) opacity(0.8);
                transition: 150ms;
            }

            > svg,
            > svg path {
                transition: 150ms;
            }
            /* :hover {
      color: ${(p) => p.theme.palette.primary.main};
      > svg,
      > svg path {
        color: ${(p) => p.theme.palette.primary.main};
        fill: ${(p) => p.theme.palette.primary.main};
      }
    }  */
            &.Teleservicios,
            &.Podcast {
                transition: 150ms;
                flex: 1 1 initial;
                max-width: initial;
                filter: grayscale(100%) opacity(1);
                > img {
                    max-width: 22px;
                    filter: grayscale(100%) opacity(0.9);
                }
            }
            &.Podcast {
                margin-left: 1rem;
            }

            &:hover {
                transform: translateY(-2px);
                > img,
                > svg {
                    filter: grayscale(0%) opacity(1);
                }
                &.Teleservicios {
                    /* color: #29b6f6; */
                    filter: grayscale(0%) opacity(1);
                    > img {
                        filter: grayscale(0%) opacity(1);
                    }
                }
                &.Podcast {
                    /* color: ${(p) => p.theme.palette.primary.main}; */
                    filter: grayscale(0%) opacity(1);
                    > svg,
                    > svg > path {
                        color: ${(p) => p.theme.palette.primary.main};
                        fill: ${(p) => p.theme.palette.primary.main};
                        filter: grayscale(0%) opacity(1);
                    }
                }
            }
        }
    }
`
