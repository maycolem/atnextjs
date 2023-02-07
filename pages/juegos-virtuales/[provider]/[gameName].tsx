import { Meta } from '@components/Meta'
import { Game } from '@components/pages/casino/Game'
import Floodlight from '@components/shared/floodlight/Floodlight'
import { PATHS } from '@routes/paths/PATHS'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const Index = () => {
    const router = useRouter()

    const [loadVirtual, setLoadVirtual] = useState(false)
    const [laodWorld, setLaodWorld] = useState(false)

    const numVirtualSoccer = Math.floor(Math.random() * Math.pow(10, 13)).toString()
    const numWorldCup = Math.floor(Math.random() * Math.pow(10, 13)).toString()

    useEffect(() => {
        // router.pathname === '/1X2%20Network/Virtual-Soccer/'
        const itsTrue1 = router.asPath === '/juegos-virtuales/1X2%20Network/Virtual-Soccer/'

        if (itsTrue1) {
            setLoadVirtual(true)
        }
    }, [router.pathname])

    useEffect(() => {
        const itsTrue2 = router.asPath === '/juegos-virtuales/BRVirtual/World-Cup/'
        if (itsTrue2) {
            setLaodWorld(true)
        }
    }, [router.pathname])

    return (
        <>
            <Meta title="Juega juegos virtuales Online" />
            {loadVirtual && <Floodlight CAT="jvi_lnp2" NUMBER_RANDOM={numVirtualSoccer} />}
            {laodWorld && <Floodlight CAT="jvi_lnp3" NUMBER_RANDOM={numWorldCup} />}
            <Game closePathname={PATHS.JUEGOS_VIRTUALES.url} />
        </>
    )
}

export default Index
