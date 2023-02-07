import { Avatar } from '@mui/material'
import React from 'react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import styled from 'styled-components'
import { delay } from '@helpers/delay'

interface Props {
    src?: string
    id: number
    fullName: string
    withoutIMG?: boolean
}

const AvatarInfo = ({ src, id, fullName, withoutIMG }: Props) => {
    return (
        <AvatarInfoS>
            {!withoutIMG && (
                <AvatarS src={src} variant="circular">
                    <InitialS>{fullName.slice(0, 1)}</InitialS>
                </AvatarS>
            )}
            <InfoS>
                <p>{fullName}</p>
                <p className="id">
                    <span>ID: </span>
                    {id}
                    <StyledButton
                        id="button-copy-id-user"
                        onClick={async () => {
                            const button = document.getElementById('button-copy-id-user')
                            const textMsg = document.getElementById('copy-text')
                            button.classList.add('animatedButton')
                            textMsg.classList.add('animatedButton')
                            await delay(500)
                            navigator.clipboard.writeText(String(id)).then(
                                function () {
                                    console.log('Async: Copying to clipboard was successful!')
                                    button.classList.remove('animatedButton')
                                    textMsg.classList.remove('animatedButton')
                                },
                                function (err) {
                                    console.error('Async: Could not copy text: ', err)
                                    button.classList.remove('animatedButton')
                                    textMsg.classList.remove('animatedButton')
                                }
                            )
                        }}
                    >
                        <ContentCopyIcon />
                        <MessageCopyStyled id="copy-text">Copiado!</MessageCopyStyled>
                    </StyledButton>
                </p>
            </InfoS>
        </AvatarInfoS>
    )
}

export default AvatarInfo
const MessageCopyStyled = styled.div`
    position: absolute;
    z-index: 1;
    top: 50%;
    transform: translateY(-50%);
    background: black;
    padding: 3px 7px;
    border-radius: 5px;
    font-size: 0.9rem;
    left: 110%;
    border: 1px solid gray;
    transition: 250ms;
    pointer-events: none;
    visibility: hidden;
    opacity: 0;
    &.animatedButton {
        pointer-events: initial;
        visibility: initial;
        opacity: 1;
    }
`
const StyledButton = styled.button`
    background: red;
    padding: 3px 4px;
    border-radius: 4px;
    color: white;
    margin-left: 10px;
    transition: 250ms;
    position: relative;
    & > svg {
        color: white;
        font-size: 16px;
    }

    &.animatedButton {
        transition: 500ms;

        background: gray;
    }
`
const AvatarInfoS = styled.div`
    display: flex;
    align-items: center;
    /* justify-content: center; */
    justify-content: center;
    padding-right: 5px;
    gap: 1rem;
    /* padding: calc(20px + 0.5vmax) 20px; */
`
const AvatarS = styled(Avatar)`
    & {
        width: 50px;
        height: 50px;

        outline: 1px solid ${(p) => p.theme.palette.primary.main};
        outline-offset: 2px;
    }
`
const InitialS = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: inherit;
    background-color: ${(p) => p.theme.palette.primary.main};
    border-radius: 50%;
    color: white;
    text-transform: capitalize;
    font-size: 25px;
`
const InfoS = styled.div`
    & {
        text-align: left;
        p:first-of-type {
            margin-bottom: 2px;
        }
        p {
            text-transform: capitalize;
            font-weight: 700;
            color: #595959;
        }
        p.id {
            color: ${(p) => p.theme.palette.primary.main};
            font-weight: 400;
        }
    }
`
