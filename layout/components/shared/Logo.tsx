import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { PATHS } from 'routes/paths/PATHS'
import logomin from 'public/assets/logomin.png'
import logofull from 'public/assets/logofull.png'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import { userSelector, userSessionSelector } from 'states/features/slices/userSlice'
import useMediaQueryAT from '@hooks/useMediaQueryAT'
import { useAppSelector } from '@states/store'
import { dtHomeLD, dtHomeLM } from '@layout/dt'
const Logo = () => {
    const session = useAppSelector(userSessionSelector)
    const desktopS = useMediaQueryAT(MEDIA_QUERIES.min_width.desktopS)

    return (
        <Link href={PATHS.HOME.url} legacyBehavior>
            <Styled>
                {desktopS ? (
                    <img alt="Banner Apuesta Total" onClick={dtHomeLD} src={logofull.src} />
                ) : (
                    <img alt="Banner Apuesta Total" onClick={dtHomeLM} src={session ? logomin.src : logofull.src} />
                )}
            </Styled>
        </Link>
    )
}

export default Logo
const Styled = styled.div`
    cursor: pointer;
    height: 30px;
    display: flex;
    align-items: center;

    img {
        width: 100%;
        object-fit: contain;
    }
`
