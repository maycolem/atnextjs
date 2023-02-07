import { Meta } from '@components/Meta'
import { CreadorDeApuestas } from '@components/pages/creador-de-apuestas/index'
import React from 'react'

const Index = () => {
    return (
        <>
            <Meta canonical="/creador-de-apuestas" title="Creador de apuestas" />
            <CreadorDeApuestas />
        </>
    )
}

export default Index
