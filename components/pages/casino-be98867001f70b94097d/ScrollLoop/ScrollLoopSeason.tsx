import { MEDIA_QUERIES } from '@styles/MEDIA_QUERIES'
import React from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
import styled from 'styled-components'
import { LobbyCardRelease } from '../LobbySlides/LobbyCardRelease'
import gif from '../assets/sliders/gif.png'
import LobbyTitle from '../LobbySlides/LobbyTitle'
import { useRouter } from 'next/router'
import { PATHS } from 'routes/paths/PATHS'
import LoadingDefault from '@components/shared/loading-default/LoadingDefault'
import hexAlpha from 'hex-alpha'

export const ScrollLoopSeason = ({ aspectRatio, width, gap, data, pathImg = 'logo', hiddenTitle = false, title = '' }) => {
    const router = useRouter()
    if (!data) {
        return <LoadingDefault loading={true}></LoadingDefault>
    }

    return (
        <Styled>
            <LobbyTitle
                // animatedNoMoreLobbies={animatedNoMoreLobbies}
                onClickShowAll={() => {
                    router.push(PATHS.CASINO.url)
                }}
                title={title}
                image={gif.src}
            />
            <StyledScrollContainer $aspectRatio={aspectRatio} $width={width} $gap={gap}>
                <TextSection>
                    <span>
                        Lorem ipsum dolor sit Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat odit esse tenetur nemo ab
                        maiores animi? Corrupti, omnis, eos enim at a placeat molestias numquam, nesciunt ab quo cupiditate beatae?amet
                        consectetur adipisicing elit. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa aperiam dolore
                        doloribus quia earum, necessitatibus magnam, nulla officiis, modi sapiente quo accusamus nihil molestiae sunt?
                        Corporis quia blanditiis quis ex.
                    </span>
                </TextSection>
                {data?.map((item, i) => {
                    return (
                        <StyledScrollItem key={i}>
                            <LobbyCardRelease lobby={item} pathname="/casino/[provider]/[gameName]" section="casino" />
                        </StyledScrollItem>
                    )
                })}
            </StyledScrollContainer>
        </Styled>
    )
}

interface StyledProps {
    $aspectRatio: string
    $width: number
    $gap: string
    $color?: string
    $widthOrder?: string
}
const Styled = styled.div`
    padding: 14px;
`
const StyledScrollItem = styled.div`
    flex: 1 0 40%;
    max-width: 220px;
    border-radius: 12px;
    overflow: hidden;
    position: relative;
    > div {
        flex-direction: column;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden;
        transition: 200ms;
        box-shadow: 1px 1px 4px #000;
        flex: 1;

        img {
            object-fit: cover;
        }
    }
`
const StyledScrollContainer = styled(ScrollContainer)<StyledProps>`
    position: relative;
    display: flex;
    align-items: center;
    min-width: 100%;
    gap: 14px;
    padding: 14px;
    width: calc(100% + 28px);
    right: 14px;
`
const TextSection = styled.div`
    color: ${(p) => hexAlpha(p.theme.contrastText, 0.8)};
    max-width: 450px;
    min-width: 200px;
    flex: 1 0 40%;
    overflow: hidden;
    display: flex;
    align-items: center;
    > span {
        display: block;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        opacity: 0.8;
        @supports (-webkit-line-clamp: 2) {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: initial;
            display: -webkit-box;
            -webkit-line-clamp: 6;
            -webkit-box-orient: vertical;
        }
    }
`
