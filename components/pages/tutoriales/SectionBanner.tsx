/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import bannerMovil from './assets/bannerMovil.png'
import bannerDesk from './assets/banner.png'
import useMediaQueryAT from 'hooks/useMediaQueryAT'

const SectionBanner = () => {
    const bannerMovil_src = bannerMovil.src
    const banner_src = bannerDesk.src
    const [banner, setBanner] = useState<string>('')
    const tabletL = useMediaQueryAT(MEDIA_QUERIES.min_width.tabletL)
    useEffect(() => {
        if (tabletL) {
            setBanner(banner_src)
        } else {
            setBanner(bannerMovil_src)
        }
    }, [tabletL])
    return (
        <StyledBanner>
            <img alt="tutoriales" src={banner} />
        </StyledBanner>
    )
}

export default SectionBanner

const StyledBanner = styled.div`
    margin-bottom: 3rem;
    > img {
        width: 100%;
        height: auto;
        display: block;
    }
`
