import { Meta } from '@components/Meta'
import { Game } from '@components/pages/casino/Game'
import { PATHS } from '@routes/paths/PATHS'
import React from 'react'

const Index = () => {
    return (
        <>
            <Meta title="Juega al Casino en vivo Online" />
            <Game closePathname={PATHS.CASINO_EN_VIVO.url} />
        </>
    )
}

export default Index
