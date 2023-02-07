import Head from 'next/head'
import React, { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
    title?: string
    description?: string
    canonical?: string
}

export const Meta = ({
    title = '',
    description = 'Construye tu jugada combinando diversos mercados en un mismo evento, lo que aumentará el multiplicador de tu jugada y más en Apuesta Total',
    canonical = '',
    children,
}: Props) => {
    const titleOverride = title ? `${title} | Apuesta Total` : 'Apuestas Deportivas Online | Apuesta Total'
    const canonicalOverride = canonical
        ? `https://www.apuestatotal.com${canonical}`
        : `https://www.apuestatotal.com${window.location.pathname}`

    return (
        <Head>
            <title>{titleOverride}</title>
            <meta content={titleOverride} property="og:title" />
            <meta content={titleOverride} itemProp="name" />
            <meta content={titleOverride} name="twitter:title" />
            {/* Google Optimize Ant-Flicker Snippet https://support.google.com/optimize/answer/9692472?ref_topic=6197443 */}

            <meta
                content="https://static.springbuilder.site/fs/userFiles-v2/apuestatotal2/images/85-seo-apuesta-total.png"
                property="og:image"
            />
            <meta
                content="https://static.springbuilder.site/fs/userFiles-v2/apuestatotal2/images/85-seo-apuesta-total.png"
                property="og:image:secure_url"
            />
            <meta content="1145" property="og:image:width" />
            <meta content="513" property="og:image:height" />

            <meta content={description} name="description" />
            <meta content={description} itemProp="description" />
            <meta content={description} property="og:description" />
            <meta content={description} name="twitter:description" />
            <meta
                content="apuesta total, torneos, poker, juegos, recargas, casino, Bet Games, TV Bet, ruleta rusa, yan ken po, tragamonedas online, torneos de casino, premios"
                name="keywords"
            />
            <meta content="https://static.springbuilder.site/fs/userFiles-v2/apuestatotal2/images/85-seo-apuesta-total.png" name="image" />
            <meta
                content="https://static.springbuilder.site/fs/userFiles-v2/apuestatotal2/images/85-seo-apuesta-total.png"
                itemProp="image"
            />
            <meta
                content="https://static.springbuilder.site/fs/userFiles-v2/apuestatotal2/images/85-seo-apuesta-total.png"
                name="twitter:image"
            />
            <meta content="summary" name="twitter:card" />
            <meta content="text/html; charset=utf-8" httpEquiv="content-type" />
            <meta content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=0" name="viewport" />
            <meta content="true" name="HandheldFriendly" />
            <meta content="telephone=no" name="format-detection" />
            <meta content="YES" name="apple-mobile-web-app-capable" />

            <meta content={canonicalOverride} property="og:url" />
            <meta content="website" property="og:type" />

            <link href={canonicalOverride} rel="canonical" />
            <link href="/favicon.ico" rel="icon" />
            <link href="/favicon.ico" rel="apple-touch-icon" />
            {children}
        </Head>
    )
}
