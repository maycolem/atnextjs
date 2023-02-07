import { Meta } from '@components/Meta'
import { Game } from '@components/pages/casino/Game'
import { PATHS } from '@routes/paths/PATHS'
import React from 'react'

const Index = () => {
    return (
        <>
            <Meta title="Juega al Casino Online" />
            <Game closePathname={PATHS.CASINO.url} />
        </>
    )
}

export default Index
