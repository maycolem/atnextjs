import { Meta } from '@components/Meta'
import { PATHS } from '@routes/paths/PATHS'
import { Casino } from '@components/pages/casino/index'
import { useEffect, useState } from 'react'
import Floodlight from '@components/shared/floodlight/Floodlight'

const Index = () => {
    const [load, setLoad] = useState(false)
    const randomStringLoad = Math.random().toString(15).substr(2, 20)
    const randomStringTimer = Math.random().toString(15).substr(2, 20)
    useEffect(() => {
        setTimeout(() => {
            setLoad(true)
        }, 20000)
    }, [])

    return (
        <>
            <Meta title="Casino en vivo" />
            <Floodlight CAT="cas_lnp2" NUMBER_RANDOM={randomStringLoad} />
            {load && <Floodlight CAT="cas_tim2" NUMBER_RANDOM={randomStringTimer} />}
            <Casino
                containerLeft="LIVECASINO_TOP_LEFT"
                containerRight="LIVECASINO_TOP_RIGHT"
                dtSection="casino en vivo"
                lobbyName="LIVECASINO_TODOS"
                pathname={PATHS.CASINO_EN_VIVO_GAME_PROVIDER_GAME_NAME.url}
                filterTags={['TV_SHOW', 'BLACKJACK', 'RULETA', 'BACCARAT', 'POKER', 'CARTAS', 'DADOS', 'OTROS']}
            />
        </>
    )
}

export default Index
