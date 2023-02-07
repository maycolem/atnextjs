import styled from '@emotion/styled'
import React from 'react'
import ReactPlayer from 'react-player'
import { useGetFragmentQuery } from 'states/calimaco/calimacoContentApi'
import FragmentCustomAT from 'components/shared/fragment-custom-at/FragmentCustomAT'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'

const TeleJRC = () => {
  const { data } = useGetFragmentQuery({
    fragment: 'SEC_TELESERVICIOS_COMO_RECARGAR',
  })
  return (
    <StyledS>
      <FragmentCustomAT fragment={data ?? ''}></FragmentCustomAT>
    </StyledS>
  )
}

export default TeleJRC
const StyledS = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  display: flex;
  position: relative;
  justify-content: center;
  background: white;

  ${MEDIA_QUERIES.min_width.desktopS} {
    width: calc(100% + 100px);
    right: 50px;
  }
`
