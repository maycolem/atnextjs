import styled from '@emotion/styled'
import SwiperCore, { Navigation, Pagination } from 'swiper'
import 'swiper/css'
import React, { useEffect, useState } from 'react'
import Lobby from 'components/shared/lobby-cards/Lobby'
import LobbyTitle from 'components/shared/lobby-cards/LobbyTitle'
import LobbySlideOnlyIMG from 'components/shared/lobby-cards/LobbySlideOnlyIMG'
import { useRouter } from 'next/router'
import { useGetBannersQuery } from 'states/calimaco/calimacoContentApi'
import LoadingDefault from 'components/shared/loading-default/LoadingDefault'

SwiperCore.use([Navigation, Pagination])

const MoreFunTest = () => {
  const router = useRouter()
  const { data, isLoading, isFetching } = useGetBannersQuery({ container: 'HOME_MASDIVERSION' })

  if (isLoading || isFetching) {
    return <LoadingDefault loading={isLoading || isFetching}></LoadingDefault>
  }

  return (
    <MoreFunTestS>
      <Lobby>
        <LobbyTitle hiddenShowAll title={'Más diversión'}></LobbyTitle>
        <LobbySlideOnlyIMG
          banners={data?.banners}
          baseURL={process.env.REACT_APP_WEB_BASE}
          onClickSlide={(url) => router.push(url)}
          onClickSlideParams={['url']}
          titleCard = "mas diversion"
        />
      </Lobby>
    </MoreFunTestS>
  )
}

export default MoreFunTest
const MoreFunTestS = styled.div`
  position: relative;
  z-index: 1;
`
