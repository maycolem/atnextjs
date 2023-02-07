import { Meta } from '@components/Meta'
import Main from '@components/pages/tutoriales/[tutorial]/Main'
// import Main from '@components/pages/tutoriales/[tutorial]/Main'
import Head from 'next/head'
import { NextRouter, useRouter } from 'next/router'
import React from 'react'

interface OverrideNextRouter extends NextRouter {
    query: {
        tutorial: string
    }
}

const Tutorial = () => {
    const router = useRouter() as OverrideNextRouter
    const withoutFormatTutorial = router?.query?.tutorial || ''
    const withFormatTutorial = withoutFormatTutorial.split('-').join(' ')

    return (
        <>
            <Meta canonical={`/tutoriales/${withoutFormatTutorial}`} title={`Tutoriales | ${withFormatTutorial}`}>
                <div id="fb-root"></div>
                <script
                    async
                    crossOrigin="anonymous"
                    defer
                    nonce="e7vAu8BV"
                    src="https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v15.0"
                ></script>
            </Meta>
            <Main />
        </>
    )
}

export default Tutorial
