import Head from 'next/head'
import { AltenarClient } from '@calimaco/components'
import cfg from 'config/config'
import { userSessionSelector } from 'states/features/slices/userSlice'
import { useAppSelector } from '@states/store'
import { useEffect } from 'react'
interface customWindow extends Window {
    ASb?: any
}
declare const window: customWindow
const Resultados = () => {
    const session = useAppSelector(userSessionSelector)
    useEffect(() => {
        return () => {
            window?.ASb?.destroy()
        }
    }, [])
    return (
        <>
            <Head>
                <title>Resultados | Apuesta Total</title>
            </Head>
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

export default Resultados
