import React, { useEffect } from 'react'
import TorneoDetailInfo from 'components/torneos/TorneoDetailInfo'
import { useTournamentDetailQuery } from 'states/calimaco/calimacoContentApi'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { userSelector } from 'states/features/slices/userSlice'
import SkeletonMain from './SkeletonMain'
import styles from './styles/styles'

const Main = () => {
    const router = useRouter()
    const nameTorneo = router?.query?.nameTorneo
    const user = useSelector(userSelector)

    const { data, refetch, isLoading, isFetching } = useTournamentDetailQuery(
        { tournament: nameTorneo },
        {
            skip: !nameTorneo,
        }
    )

    useEffect(() => {
        if (user) {
            refetch()
        }
    }, [user])

    const loadingData = isLoading || isFetching
    const tournament = data?.tournament || {}

    const Content = () => (
        <Styled.Torneo>
            <TorneoDetailInfo tournament={tournament}></TorneoDetailInfo>
        </Styled.Torneo>
    )

    if (loadingData) return <SkeletonMain />

    if (nameTorneo) {
        return <Content></Content>
    }

    return <></>
}

export default Main

const Styled = styles()
