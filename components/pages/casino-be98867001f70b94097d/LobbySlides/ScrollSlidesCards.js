import { useGetBannersQuery } from 'states/calimaco/calimacoContentApi'
import SwiperCore, { Navigation, Pagination } from 'swiper'
import 'swiper/css'
import { useRouter } from 'next/router'
import { PATHS } from 'routes/paths/PATHS'
import Lobby from './Lobby'
import LobbyTitle from './LobbyTitle'
import LobbySlide from './LobbySlide'
import LoadingDefault from 'components/shared/loading-default/LoadingDefault'
import { useState } from 'react'
import styled from 'styled-components'

SwiperCore.use([Navigation, Pagination])

const ScrollSlidesCards = () => {
    const router = useRouter()
    const { data, isLoading, isFetching } = useGetBannersQuery({ container: 'HOME_CASINO' })
    const [animatedNoMoreLobbies, setAnimatedNoMoreLobbies] = useState(false)

    if (isLoading || isFetching) {
        return <LoadingDefault loading={isLoading || isFetching}></LoadingDefault>
    }

    return (
        <Lobby>
            <LobbyTitle
                animatedNoMoreLobbies={animatedNoMoreLobbies}
                onClickShowAll={() => {
                    router.push(PATHS.CASINO.url)
                }}
                title="Continúa jugando"
            />
            <LobbySlide
                banners={data?.banners}
                onClickSlide={(url) => router.push(url)}
                onClickSlideParams={['url']}
                setAnimatedNoMoreLobbies={setAnimatedNoMoreLobbies}
                titleCard="casino"
            />
        </Lobby>
    )
}

export default ScrollSlidesCards