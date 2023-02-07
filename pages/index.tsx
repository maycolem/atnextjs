import RegisterModalSuccess from 'components/Register/RegisterModalSuccess'
import Games from 'components/HomeLayout/Games'
import Casino from 'components/HomeLayout/Casino'
import Lore from 'components/HomeLayout/Lore'
import styled from 'styled-components'
import MoreFun from 'components/HomeLayout/MoreFun'
import HomeBanner from 'components/HomeLayout/HomeBanner'
import CasinoVivo from 'components/HomeLayout/CasinoVivo'
import JuegosVirtuales from 'components/HomeLayout/JuegosVirtuales'
import { useEffect } from 'react'
import { Meta } from '@components/Meta'
import Floodlight from '@components/shared/floodlight/Floodlight'
import { DEVICE_SIZE } from '@styles/DEVICE_SIZE'
import { MEDIA_QUERIES } from '@styles/MEDIA_QUERIES'

export default function Index() {
    const random = Math.random() * 10000000000000 + ''
    useEffect(() => {
        window?.scrollTo({ top: 0, behavior: 'auto' })
    }, [])

    return (
        <>
            <Meta />
            <Floodlight CAT={'apt_home'} NUMBER_RANDOM={random} />

            <RegisterModalSuccess />
            <Styled>
                {/* <AnunciosAT /> */}
                <HomeBanner />
                <HomeContentS>
                    <Games />
                    <Casino />
                    <CasinoVivo />
                    <JuegosVirtuales />
                    <MoreFun />
                    <Lore />
                </HomeContentS>
            </Styled>
        </>
    )
}

const Styled = styled.div`
    background: ${(p) => p.theme.home.background};
    position: relative;
    width: calc(100% + 28px);
    right: 14px;
`
const HomeContentS = styled('div')`
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0 14px;
`
