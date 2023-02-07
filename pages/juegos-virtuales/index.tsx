import { Meta } from '@components/Meta'
import { PATHS } from '@routes/paths/PATHS'
import { Casino } from '@components/pages/casino/index'
import Floodlight from '@components/shared/floodlight/Floodlight'
import { useState } from 'react'

const Index = () => {
    const [load, setLoad] = useState(false)

    const numLoad = Math.random().toString(15).substr(2, 20)
    const numTimer = Math.random().toString(15).substr(2, 20)

    setTimeout(() => {
        setLoad(true)
    }, 20000)

    //           '1X2 Network',
    //           'BetConstruct Virtual Games',
    //           'BRVirtual',
    //           'Edge',
    //           'goldenrace',
    //           'Kiron',
    //           'KomplexBet',
    //           'Leap Gaming',
    //           'Leap Gaming Direct',
    //           'NSoft',
    //           'OneXTwoNetwork',
    //           'pragmatic',

    // const CONSTANTE_1 = Math.random().toString(36).substr(2, 13); //q9cza5wy4og

    return (
        <>
            <Meta title="Juegos virtuales">
                <script
                    type="text/javascript"
                    src="https://ads.sonataplatform.com/pixel/script/conversion/permanence/63c17325de433a002b7fc906"
                ></script>
            </Meta>
            <Floodlight CAT="jvi_lnp1" NUMBER_RANDOM={numLoad} />
            {load && <Floodlight CAT="jvi_tim1" NUMBER_RANDOM={numTimer} />}

            <Casino
                containerLeft="JUEGOS_VIRTUALES_TOP_LEFT"
                containerRight="JUEGOS_VIRTUALES_TOP_RIGHT"
                dtSection="juegos virtuales"
                lobbyName="JUEGOS_VIRTUALES_TODOS"
                pathname={PATHS.JUEGOS_VIRTUALES_GAME_PROVIDER_GAME_NAME.url}
                filterTags={['FUTBOL', 'DEPORTES', 'CARRERAS', 'NUMEROS']}
            />
        </>
    )
}

export default Index
