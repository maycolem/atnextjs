import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { LoadingButton } from '@mui/lab'
import { useInView } from 'react-intersection-observer'
import { delay } from '@helpers/delay'

interface Props {
    loading: boolean
    onClick: () => void
}

export const ButtonMoreLobbies = ({ loading, onClick }: Props) => {
    const [delayHiddenButton, setDelayHiddenButton] = useState(true)
    const { ref, inView } = useInView({
        /* Optional options */
        threshold: 0,
    })

    const handleOnClick = async () => {
        if (loading) {
            return
        }
        if (!inView) {
            return
        }
        if (inView) {
            await onClick()
        }
    }
    useEffect(() => {
        handleOnClick()
    }, [inView])

    useEffect(() => {
        handleDelayHiddenButton()
    }, [])

    const handleDelayHiddenButton = async () => {
        await delay(2000)
        setDelayHiddenButton(false)
    }

    if (delayHiddenButton) {
        return <></>
    }

    return (
        <Styled>
            <LoadingButton disabled={loading} fullWidth loading={loading} onClick={onClick} variant="text">
                Ver mas +
            </LoadingButton>
            <LoadingButtonInfiniteAbsoluteS disabled={loading} fullWidth loading={loading} onClick={onClick} ref={ref} variant="text">
                Ver mas +
            </LoadingButtonInfiniteAbsoluteS>
        </Styled>
    )
}

const LoadingButtonInfiniteAbsoluteS = styled(LoadingButton)`
    && {
        position: absolute;
        bottom: 400%;
        pointer-events: none;
        opacity: 0;
        visibility: hidden;
    }
`
const Styled = styled.div`
    & {
        padding-top: 0rem;
        padding-bottom: 0rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 3rem;
        cursor: pointer;
        position: relative;
        z-index: 99;
        background-image: linear-gradient(
            to bottom,
            transparent,
            ${(p) => p.theme.palette.alternate4.main},
            ${(p) => p.theme.palette.alternate4.main}
        );
        > button {
            background: none;
            flex: 1;
            text-align: center;
            font-weight: 500;
            font-size: 1rem;
            color: ${(p) => p.theme.palette.primary.main};
            box-shadow: none;
            border-radius: 0;
            padding: 1rem;

            .MuiCircularProgress-root {
                width: 2rem !important;
                height: 2rem !important;
                svg {
                    color: ${(p) => p.theme.palette.primary.main};
                }
            }
            :hover {
                background: transparent;
            }
        }
    }
`
