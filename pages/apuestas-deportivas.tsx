import { AltenarClient } from '@calimaco/components'
import cfg from 'config/config'
import { Meta } from '@components/Meta'
import { userSessionSelector } from '@states/features/slices/userSlice'
import { useEffect } from 'react'
import { useAppSelector } from '@states/store'
import { useRouter } from 'next/router'
import Head from 'next/head'
// import { useRouter } from 'next/router'
interface customWindow extends Window {
    ASb?: any
}
declare const window: customWindow
const Index = () => {
    const session = useAppSelector(userSessionSelector)
    const router = useRouter()

    useEffect(() => {
        return () => {
            window?.ASb?.destroy()
        }
    }, [])

    // useEffect(() => {
    //     const fisrtUrl = router.asPath === '/apuestas-deportivas/#/sport/66/livenow'
    //     const secondUrl = router.asPath === '/apuestas-deportivas/#/sport/68/livenow'
    //     const thirdUrl = router.asPath === '/apuestas-deportivas/#/sport/67/livenow'
    //     if (fisrtUrl) {
    //         const iframe = document.createElement('iframe')
    //         iframe.src = `https://11210665.fls.doubleclick.net/activityi;src=11210665;type=ma_aptot;cat=dep_lnp3;ord=${Math.floor(
    //             Math.random() * Math.pow(10, 13)
    //         )}?`
    //         iframe.style.display = 'none'
    //         document.body.appendChild(iframe)
    //     }
    //     if (secondUrl) {
    //         const iframe = document.createElement('iframe')
    //         iframe.src = `https://11210665.fls.doubleclick.net/activityi;src=11210665;type=ma_aptot;cat=dep_lnp5;ord=${Math.floor(
    //             Math.random() * Math.pow(10, 13)
    //         )}?`
    //         iframe.style.display = 'none'
    //         document.body.appendChild(iframe)
    //     }
    //     if (thirdUrl) {
    //         const iframe = document.createElement('iframe')
    //         iframe.src = `https://11210665.fls.doubleclick.net/activityi;src=11210665;type=ma_aptot;cat=dep_lnp6;ord=${Math.floor(
    //             Math.random() * Math.pow(10, 13)
    //         )}?`
    //         iframe.style.display = 'none'
    //         document.body.appendChild(iframe)
    //     } else {
    //         return null
    //     }
    // // }, [router.asPath])

    const urls = [
        '/apuestas-deportivas/#/prelive',
        '/apuestas-deportivas/#/tree/all/0/0/16808/0/odds/byleague',
        '/apuestas-deportivas/#/tree/all/0/0/2936/0/odds/byleague',
        '/apuestas-deportivas/#/tree/all/0/0/2943/0/odds/byleague',
        '/apuestas-deportivas/#/tree/all/0/0/4042/0/odds/byleague',
    ]

    const srcScript = 'https://ads.sonataplatform.com/pixel/script/conversion/permanence/63c17325de433a002b7fc906'
    if (urls.includes(router.asPath)) {
        var src = srcScript
    }

    return (
        <>
            <Meta
                title="Apuestas Deportivas"
                description="Encuentra promociones, apuestas deportivas en vivo, próximos encuentros, juegos virtuales, casino y más en Apuesta Total"
                canonical="/apuestas-deportivas"
            />
            <Head>
                <script type="text/javascript" src={src}></script>
            </Head>
            {session ? (
                <div key="db6f16c698917fb62416f0cfc195b0c703d4fffa">
                    <AltenarClient cfg={cfg} />
                </div>
            ) : (
                <div key="432b62d3d4d89ebe169d18c7cca744c408940816">
                    <AltenarClient cfg={cfg} />
                </div>
            )}
        </>
    )
}

export default Index
