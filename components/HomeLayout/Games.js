import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Lobby from 'components/shared/lobby-cards/Lobby'
import LobbyTitle from 'components/shared/lobby-cards/LobbyTitle'
import LobbySlide from 'components/shared/lobby-cards/LobbySlide'
import { useRouter } from 'next/router'
import { PATHS } from 'routes/paths/PATHS'
import { useGetBannersQuery } from 'states/calimaco/calimacoContentApi'
import LoadingDefault from 'components/shared/loading-default/LoadingDefault'
import { useState } from 'react'

const Games = () => {
  const router = useRouter()
  const { data, isLoading, isFetching } = useGetBannersQuery({ container: 'HOME_DEPORTIVAS' })
  const [animatedNoMoreLobbies, setAnimatedNoMoreLobbies] = useState(false)

  if (isLoading || isFetching) {
    return <LoadingDefault loading={isLoading || isFetching}></LoadingDefault>
  }

  return (
    <Lobby>
      <LobbyTitle
        animatedNoMoreLobbies={animatedNoMoreLobbies}
        onClickShowAll={() => {
          router.push(PATHS.APUESTAS_DEPORTIVAS.url)
        }}
        title="Apuestas deportivas"
      />

      <LobbySlide
        banners={data?.banners}
        onClickSlide={(url) => router.push(url)}
        onClickSlideParams={['url']}
        setAnimatedNoMoreLobbies={setAnimatedNoMoreLobbies}
        titleCard = "apuestas deportivas"
      />
    </Lobby>
  )
}

export default Games
