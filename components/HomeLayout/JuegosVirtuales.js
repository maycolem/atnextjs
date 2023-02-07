import LobbyTitle from 'components/shared/lobby-cards/LobbyTitle'
import LobbySlide from 'components/shared/lobby-cards/LobbySlide'
import Lobby from 'components/shared/lobby-cards/Lobby'
import { useRouter } from 'next/router'
import { PATHS } from 'routes/paths/PATHS'
import { useGetBannersQuery } from 'states/calimaco/calimacoContentApi'
import LoadingDefault from 'components/shared/loading-default/LoadingDefault'
import { useState } from 'react'

const JuegosVirtuales = () => {
  const router = useRouter()
  const { data, isLoading, isFetching } = useGetBannersQuery({ container: 'HOME_VIRTUALES' })
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
            router.push(PATHS.JUEGOS_VIRTUALES.url)
          }}
          title="Juegos virtuales"
        />
        <LobbySlide
          banners={data?.banners}
          onClickSlide={(url) => router.push(url)}
          onClickSlideParams={['url']}
          setAnimatedNoMoreLobbies={setAnimatedNoMoreLobbies}
          titleCard = "juegos virtuales"
        />
      </Lobby>
    </>
  )
}

export default JuegosVirtuales
