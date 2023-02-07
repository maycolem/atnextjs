import { delay } from '@helpers/delay'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const useRedirectBy404 = () => {
    const router = useRouter()

    const cbEffect = async () => {
        if (router?.asPath) {
            if (router.pathname === '/404') {
                const asPath = router.asPath
                const length = asPath.substring(1, asPath.length - 1).split('/').length

                if (router.asPath.includes('/torneos/')) {
                    if (length === 2) {
                        await push(router.asPath)
                    }
                }
                if (router.asPath.includes('/tutoriales/')) {
                    if (length === 2) {
                        await push(router.asPath)
                    }
                }
                if (router.asPath.includes('/casino/')) {
                    if (length === 3) {
                        await push(router.asPath)
                    }
                }
                if (router.asPath.includes('/casino-en-vivo/')) {
                    if (length === 3) {
                        await push(router.asPath)
                    }
                }
                if (router.asPath.includes('/juegos-virtuales/')) {
                    if (length === 3) {
                        await push(router.asPath)
                    }
                }
            }
        }
    }
    const push = async (path: string) => {
        await delay(1000)
        return await router.push(path)
    }
    useEffect(() => {
        cbEffect()
    }, [router.asPath])

    return null
}

export default useRedirectBy404
