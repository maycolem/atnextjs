import React from 'react'
import styled from 'styled-components'
import TorneoCard from './TorneoCard'
import { useGetUserTournamentQuery } from 'states/calimaco/calimacoDataApi'
import { useSelector } from 'react-redux'
import { userSelector } from 'states/features/slices/userSlice'

const TorneosCards = ({ data = [] }) => {
  return (
    <TorneosCardsS>
      {data?.map((item, i) => {
        return <TorneoCard key={i} tournament={item}></TorneoCard>
      })}
    </TorneosCardsS>
  )
}

export default TorneosCards

const TorneosCardsS = styled.div`
  & {
    padding: 1rem;
    padding-bottom: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`
