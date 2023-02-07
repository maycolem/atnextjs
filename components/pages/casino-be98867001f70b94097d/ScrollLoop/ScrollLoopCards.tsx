import { MEDIA_QUERIES } from '@styles/MEDIA_QUERIES'
import React, { useState } from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
import styled from 'styled-components'
import LobbyTitle from '../LobbySlides/LobbyTitle'
import { useRouter } from 'next/router'
import { PATHS } from 'routes/paths/PATHS'
import LobbySlide from '../LobbySlides/LobbySlide'
import LoadingDefault from '@components/shared/loading-default/LoadingDefault'
import trofeo from '../assets/sliders/trofeo.png'

export const ScrollLoopCards = ({ aspectRatio, width, gap, data, pathImg = 'logo', hiddenTitle = false, title = '' }) => {
    const router = useRouter()
    // const { data, isLoading, isFetching } = useGetBannersQuery({ container: 'HOME_CASINO' })
    const [animatedNoMoreLobbies, setAnimatedNoMoreLobbies] = useState(false)

    if (!data) {
        return <LoadingDefault loading={true}></LoadingDefault>
    }

    return (
        <div>
            <LobbyTitle
                animatedNoMoreLobbies={animatedNoMoreLobbies}
                onClickShowAll={() => {
                    router.push(PATHS.CASINO.url)
                }}
                title={title}
                image={trofeo.src}
            />
            <LobbySlide
                banners={data ?? []}
                onClickSlide={(url) => router.push(url)}
                onClickSlideParams={['url']}
                // setAnimatedNoMoreLobbies={setAnimatedNoMoreLobbies}
                titleCard="casino"
            />
        </div>
    )
}
