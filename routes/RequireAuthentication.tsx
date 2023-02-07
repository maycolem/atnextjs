import { NextRouter, useRouter } from 'next/router'
import React, { PropsWithChildren, useEffect } from 'react'
import { PATHS } from './paths/PATHS'
import { Page, Key, User } from '@interfaces/index'
import { useAppSelector } from '@states/store'
import { userSessionSelector } from '@states/features/slices/userSlice'

interface OverrideNextRouter extends NextRouter {
    backReferrer: string
}

let backReferrer = ''
export const RequireAuthentication = ({ children }: PropsWithChildren) => {
    const router = useRouter() as OverrideNextRouter
    const pathname = router.pathname
    const asPath = router.asPath
    const session = useAppSelector(userSessionSelector)

    const handleChanguePage = () => {
        if (!pathname.includes('/cuenta')) {
            backReferrer = asPath
        }
        if (pathname === PATHS.LOGIN.url) {
            backReferrer = '/'
        }
        router.backReferrer = backReferrer
    }
    const handleSearchPage = async () => {
        if (pathname) {
            for (const key in PATHS) {
                let page = PATHS[key as Key] as Page
                if (page.url === pathname) {
                    if (page.protectedLevel === 2 && !session) {
                        router.push({
                            pathname: PATHS.LOGIN.url,
                            query: { returnUrl: asPath },
                        })
                        return
                    }
                }
            }
        }
    }

    useEffect(() => {
        handleChanguePage()
    }, [asPath])

    useEffect(() => {
        handleSearchPage()
    }, [pathname, asPath, session])

    return <div>{children}</div>
}
