import { Button } from '@mui/material'
import React from 'react'
import styled, { css } from 'styled-components'
import { GoogleTagManager } from 'google/TagManager'

const LobbyTitle = ({ title, onClickShowAll, hiddenShowAll = false, animatedNoMoreLobbies = false }) => {
    const dtHomeClick = (name) => {
        GoogleTagManager.push({
            event: 'atm.event',
            title: name.toLowerCase(),
            eventName: 'home_click',
            option: 'ver todas',
        })
    }
    return (
        <LobbyTitleS>
            <h1 className="MorePromotions__title">{title}</h1>
            {!hiddenShowAll && (
                <ButtonS
                    $animatedNoMoreLobbies={animatedNoMoreLobbies}
                    color="buttonPink"
                    onClick={() => {
                        onClickShowAll()
                        dtHomeClick('ver todas')
                    }}
                    size="small"
                    variant="contained"
                >
                    Ver todas {'>'}
                </ButtonS>
            )}
        </LobbyTitleS>
    )
}

export default LobbyTitle

const LobbyTitleS = styled('div')`
    & {
        display: flex;
        justify-content: space-between;
        h1.MorePromotions__title {
            font-size: clamp(16px, 2.5vw, 25px);
            font-weight: 500;
            text-transform: lowercase;
            letter-spacing: 0;
            display: block;
            color: ${(p) => p.theme.casino.slider.contrastText};
            ::first-letter {
                text-transform: capitalize;
            }
        }
    }
`
const ButtonS = styled(Button)`
    && {
        box-shadow: none;
        text-transform: capitalize;
        background: ${(p) => p.theme.casino.slider.showMore.background};
        color: ${(p) => p.theme.casino.slider.showMore.contrastText};

        transition: 250ms;
        :hover {
            background: ${(p) => p.theme.casino.slider.showMoreActive.background};
            color: ${(p) => p.theme.casino.slider.showMoreActive.contrastText};
            box-shadow: none;
        }
        animation-name: none;
        animation-duration: 1.5s;
        animation-iteration-count: infinite;
        ${(p) => {
            if (p.$animatedNoMoreLobbies) {
                return css`
                    color: ${(p) => p.theme.casino.slider.showMoreActive.contrastText};
                    background: ${(p) => p.theme.casino.slider.showMoreActive.background};
                    animation-name: pulse;
                    &:hover {
                        background: ${(p) => p.theme.casino.slider.showMoreActive.background};
                    }
                    @keyframes pulse {
                        0% {
                            box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.7), 0 0 0 0 rgba(255, 0, 0, 0.7);
                        }
                        40% {
                            /* transform: scale(1.1); */
                            box-shadow: 0 0 0 40px rgba(255, 0, 0, 0), 0 0 0 0 rgba(255, 0, 0, 0.7);
                        }
                        80% {
                            transform: scale(1);
                            box-shadow: 0 0 0 40px rgba(255, 0, 0, 0), 0 0 0 20px rgba(255, 0, 0, 0);
                        }
                        100% {
                            box-shadow: 0 0 0 0 rgba(255, 0, 0, 0), 0 0 0 20px rgba(255, 0, 0, 0);
                        }
                    }
                `
            }
        }}
    }
`
