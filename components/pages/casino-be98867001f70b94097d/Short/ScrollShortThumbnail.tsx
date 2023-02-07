import LobbyTitle from '../LobbySlides/LobbyTitle'
import { PATHS } from '@routes/paths/PATHS'
import { MEDIA_QUERIES } from '@styles/MEDIA_QUERIES'
import { useRouter } from 'next/router'
import ScrollContainer from 'react-indiana-drag-scroll'
import styled from 'styled-components'
import data from './dataShorts'
import Gift from '../assets/sliders/gif.png'
import hexAlpha from 'hex-alpha'

interface ScrollShortThumbnailProps {
    hiddenTitle: boolean
    title: string
    gap: any
    width: number
}

export const ScrollShortThumbnail = ({ hiddenTitle = false, title, gap, width }: ScrollShortThumbnailProps) => {
    const router = useRouter()

    const openPath = () => {
        router.push(PATHS.CASINO_be98867001f70b94097d_SHORTS.url)
    }

    return (
        <div>
            <LobbyTitle
                // animatedNoMoreLobbies={animatedNoMoreLobbies}
                onClickShowAll={() => {
                    router.push(PATHS.CASINO_be98867001f70b94097d_SHORTS.url)
                }}
                title={title}
                image={Gift.src}
            />

            <StyledScrollContainer $width={width} $gap={gap}>
                {data.slice(7, 8).map((item) => (
                    <StyledScrollItem key={item.id} onClick={openPath}>
                        <div>
                            <video width={270} height="auto" src={item.url} />
                        </div>
                        <p>{item.title}</p>
                    </StyledScrollItem>
                ))}
                {data.slice(0, 2).map((item) => (
                    <StyledScrollItem key={item.id} onClick={openPath}>
                        <div>
                            <video width={270} height="auto" src={item.url} />
                        </div>
                        <p>
                            <span>{item.title}</span>
                        </p>
                    </StyledScrollItem>
                ))}
            </StyledScrollContainer>
        </div>
    )
}

interface StyledProps {
    $width?: number
    $gap?: string
    $color?: string
    $widthOrder?: string
}

const StyledScrollContainer = styled(ScrollContainer)<StyledProps>`
    display: flex;
    && {
        position: relative;
        display: flex;
        min-width: 100%;
        gap: 14px;
        padding: 14px;
        width: calc(100% + 28px);
        right: 14px;
    }
`

const StyledScrollItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex: 0 0 45%;
    position: relative;
    box-shadow: ${(p) => hexAlpha(p.theme.casino.slider.shadow, 0.1)} 0px 3px 6px;
    overflow: hidden;
    max-width: 260px;
    > div {
        aspect-ratio: 2/3;
        overflow: hidden;
        background-color: #000;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        video {
            flex: 1;
            width: 100%;
            object-fit: contain;
            transform: scale(100%);
        }
    }
    > p {
        position: absolute;
        bottom: 0;
        font-weight: 600;
        color: white;
        padding: 8px;
        text-shadow: #000 1px 0 10px;
        span {
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;

            @supports (-webkit-line-clamp: 2) {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: initial;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
        }
    }
`
