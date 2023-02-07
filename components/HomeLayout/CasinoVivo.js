import LobbyTitle from 'components/shared/lobby-cards/LobbyTitle'
import LobbySlide from 'components/shared/lobby-cards/LobbySlide'
import Lobby from 'components/shared/lobby-cards/Lobby'
import { useRouter } from 'next/router'
import { PATHS } from 'routes/paths/PATHS'
import LoadingDefault from 'components/shared/loading-default/LoadingDefault'
import { useGetBannersQuery } from 'states/calimaco/calimacoContentApi'
import { useState } from 'react'

const CasinoVivo = () => {
  const router = useRouter()
  const { data, isLoading, isFetching } = useGetBannersQuery({ container: 'HOME_CASINOVIVO' })
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
            router.push(PATHS.CASINO_EN_VIVO.url)
          }}
          title="Casino en vivo"
        />
        <LobbySlide
          banners={data?.banners}
          onClickSlide={(url) => router.push(url)}
          onClickSlideParams={['url']}
          setAnimatedNoMoreLobbies={setAnimatedNoMoreLobbies}
          titleCard = "casino en vivo"
        />
      </Lobby>
    </>
  )
}

export default CasinoVivo
