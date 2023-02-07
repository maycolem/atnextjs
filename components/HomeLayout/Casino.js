import { useGetBannersQuery } from 'states/calimaco/calimacoContentApi'
// import { CalimacoClient } from '@calimaco/base'
import SwiperCore, { Navigation, Pagination } from 'swiper'
import 'swiper/css'
import { useRouter } from 'next/router'
import { PATHS } from 'routes/paths/PATHS'
import Lobby from 'components/shared/lobby-cards/Lobby'
import LobbyTitle from 'components/shared/lobby-cards/LobbyTitle'
import LobbySlide from 'components/shared/lobby-cards/LobbySlide'
import LoadingDefault from 'components/shared/loading-default/LoadingDefault'
import { useState } from 'react'

SwiperCore.use([Navigation, Pagination])
const Casino = () => {
  const router = useRouter()

  const { data, isLoading, isFetching } = useGetBannersQuery({ container: 'HOME_CASINO' })
  const [animatedNoMoreLobbies, setAnimatedNoMoreLobbies] = useState(false)

  if (isLoading || isFetching) {
    return <LoadingDefault loading={isLoading || isFetching}></LoadingDefault>
  }

  return (
    <>
      <Lobby>
        <LobbyTitle
          animatedNoMoreLobbies={animatedNoMoreLobbies}
          onClickShowAll={() => {
            router.push(PATHS.CASINO.url)
          }}
          title="Casino"
        />
        <LobbySlide
          banners={data?.banners}
          onClickSlide={(url) => router.push(url)}
          onClickSlideParams={['url']}
          setAnimatedNoMoreLobbies={setAnimatedNoMoreLobbies}
          titleCard = "casino"
        />
      </Lobby>
    </>
  )
}

export default Casino
