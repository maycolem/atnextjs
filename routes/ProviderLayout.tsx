import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { PropsWithChildren, useEffect, useState } from 'react'
import { PATHS } from './paths/PATHS'
import { layouts, Page, Key } from '@interfaces/index'

const LayoutUserProfile = dynamic(() => import('@layout/LayoutUserProfile/Layout'))
const Layout = dynamic(() => import('@layout/Layout').then(({ Layout }) => Layout))

export const ProviderLayout = ({ children }: PropsWithChildren) => {
    const router = useRouter()
    const pathname = router.pathname
    const [layout, setLayout] = useState<layouts>(null)
    useEffect(() => {
        if (pathname) {
            for (const key in PATHS) {
                let page = PATHS[key as Key] as Page
                if (page.url === pathname) {
                    setLayout(page.layout)
                    return
                }
            }
        }
    }, [pathname])
    if (layout === 0 || pathname === '/404') {
        return <Layout>{children}</Layout>
    }

    if (layout === 1) {
        return <LayoutUserProfile>{children}</LayoutUserProfile>
    }

    if (layout === -1) {
        return <>{children}</>
    }

    return <></>
}
