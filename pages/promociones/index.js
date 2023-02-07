// import SimpleBanner from 'components/SimpleBanner/SimpleBanner'
import React, { useState } from 'react'
import styled from '@emotion/styled'
import MyHead from 'components/promociones/MyHead'
import { useGetFragmentQuery } from 'states/calimaco/calimacoContentApi'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import PromocionesLobbies from 'components/promociones/PromocionesLobbies'
import FragmentCustomAT from 'components/shared/fragment-custom-at/FragmentCustomAT'
import { useEffect } from 'react'

const promotions = () => {
    const { data } = useGetFragmentQuery({
        fragment: 'PROMOCIONES',
    })

    useEffect(() => {
        let iframe = document.createElement('iframe')
        iframe.src = `https://11210665.fls.doubleclick.net/activityi;src=11210665;type=ma_aptot;cat=pro_lnp1;gdpr=;gdpr_consent=;ord=${Math.random()
            .toString(15)
            .substr(2, 20)}?`
        iframe.style.display = 'none'
        document.body.appendChild(iframe)
        setTimeout(
            () => {
                let iframe = document.createElement('iframe')
                iframe.src = `https://11210665.fls.doubleclick.net/activityi;src=11210665;type=ma_aptot;cat=pro_tim1;gdpr=;gdpr_consent=;ord=${Math.random()
                    .toString(15)
                    .substr(2, 20)}?`
                iframe.style.display = 'none'
                document.body.appendChild(iframe)
            },
            20000,
            []
        )
    }, [])

    return (
        <PromotionS>
            <div className="wrapper">
                <MyHead></MyHead>
                <PromotionTitleS>Promociones</PromotionTitleS>
                <PromocionesLobbies></PromocionesLobbies>
                <StyledS>
                    <FragmentCustomAT fragment={data ?? ''}></FragmentCustomAT>
                </StyledS>
            </div>
        </PromotionS>
    )
}

export default promotions
const StyledS = styled.div`
    padding: 1rem;
`

const PromotionTitleS = styled.h1`
    & {
        font-size: 1.5rem;
        font-weight: 500;
        text-align: center;
        margin-bottom: 1rem;
        color: ${(p) => p.theme.palette.dark3.main} ${MEDIA_QUERIES.min_width.tabletS} {
            text-align: left;
        }
    }
`
const PromotionS = styled.div`
    & {
        padding-bottom: 1rem;
        position: relative;
        width: 100%;
        margin: auto;
        background: white;
        /* right: 14px; */
        width: calc(100% + 28px);
        position: relative;
        right: 14px;

        ${MEDIA_QUERIES.min_width.desktopS} {
            width: calc(100% + 100px);
            right: 50px;
            padding-top: 1rem;
        }
        > .wrapper {
            max-width: 1000px;
            margin: auto;
        }
    }
`
