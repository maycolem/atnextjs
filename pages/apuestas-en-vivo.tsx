import { AltenarClient } from '@calimaco/components'
import cfg from 'config/config'
import { useAppSelector } from '@states/store'
import { userSessionSelector } from '@states/features/slices/userSlice'
import { Meta } from '@components/Meta'
import { useEffect, useState } from 'react'
import Floodlight from '@components/shared/floodlight/Floodlight'
interface customWindow extends Window {
    ASb?: any
}
declare const window: customWindow
const Index = () => {
    const session = useAppSelector(userSessionSelector)

    useEffect(() => {
        return () => {
            window?.ASb?.destroy()
        }
    }, [])

    const numLoader = Math.random() * 10000000000000
    const numTimer = Math.random() * 10000000000000

    useEffect(() => {
        // TODO: reload page after 20 seconds in type Component
        setTimeout(() => {
            const iframe = document.createElement('iframe')
            iframe.src = `https://11210665.fls.doubleclick.net/activityi;src=11210665;type=ma_aptot;cat=dep_tim1;ord=${numTimer}?`

            iframe.style.display = 'none'
            document.body.appendChild(iframe)
        }, 20000)
    }, [])

    return (
        <>
            <Meta
                title="Apuestas En Vivo"
                description="Encuentra promociones, apuestas deportivas en vivo, próximos encuentros, juegos virtuales, casino y más en Apuesta Total"
                canonical="/apuestas-en-vivo"
            />

            <Floodlight CAT="dep_lnp1" NUMBER_RANDOM={numLoader} />
            {session ? (
                <div key="99715f96781c0e8ac17d42f46e0dd943b521559a">
                    <AltenarClient cfg={cfg} />
                </div>
            ) : (
                <div key="5be122e47ba33120df7cc57d7aa3ed968fb6f1ec">
                    <AltenarClient cfg={cfg} />
                </div>
            )}
        </>
    )
}

export default Index
