import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import { useSelector } from 'react-redux'
import { Meta } from '@components/Meta'
import { userSelector, userSessionSelector } from '@states/features/slices/userSlice'

const PromoMundial = () => {
    const session = useSelector(userSessionSelector)
    const user = useSelector(userSelector)
    const [url, setUrl] = useState()

    useEffect(() => {
        if (session) {
            // const urlPrev = "https://sorteos.apuestatotal.com/promo-mundial?auth_data="+ JSON.stringify(authData)
            const urlPrev = 'https://sorteos.apuestatotal.com/promo-mundial/' + user?.company + '/' + user?.session
            setUrl(urlPrev)
        } else {
            const urlPrev = 'https://sorteos.apuestatotal.com/promo-mundial'
            setUrl(urlPrev)
        }
    }, [session])
    return (
        <>
            <Meta title="Promo Mundial" description="Encuentra en Apuesta Total la promo mundial 2022"></Meta>
            <Styled>
                <iframe frameBorder="0" src={url} />
            </Styled>
        </>
    )
}

export default PromoMundial

const Styled = styled.div`
    & {
        display: flex;
        flex-direction: column;
        width: calc(100% + 28px);
        position: relative;
        right: 14px;
        min-height: 2000px;
        ${MEDIA_QUERIES.min_width.desktopS} {
            width: calc(100% + 100px);
            right: 50px;
        }
        > iframe {
            flex: 1;
            height: 100%;
            width: 100%;
        }
    }
`
