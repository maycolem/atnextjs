import { Meta } from '@components/Meta'
import { PATHS } from '@routes/paths/PATHS'
import { Casino } from '@components/pages/casino/index'
import { useEffect, useState } from 'react'
import Floodlight from '@components/shared/floodlight/Floodlight'

const Index = () => {
    const [load, setLoad] = useState(false)
    const numLoad = Math.random().toString(15).substr(2, 20)
    const numTimer = Math.random().toString(15).substr(2, 20)

    setTimeout(function () {
        setLoad(true)
    }, 20000)

    return (
        <>
            <Meta title="Casino" />
            <Floodlight CAT="cas_lnp1" NUMBER_RANDOM={numLoad} />
            {load && <Floodlight CAT="cas_tim1" NUMBER_RANDOM={numTimer} />}
            <Casino
                containerLeft="CASINO_TOP_LEFT"
                containerRight="CASINO_TOP_RIGHT"
                dtSection="casino"
                lobbyName="CASINO_TODOS"
                pathname={PATHS.CASINO_GAME_PROVIDER_GAME_NAME.url}
                filterTags={['TRAGAMONEDAS', 'BUY_FEATURE', 'JACKPOT', 'ESPECIALES', 'BLACKJACK', 'POKER', 'RULETA', 'RASPADITAS']}
            />
        </>
    )
}

export default Index
