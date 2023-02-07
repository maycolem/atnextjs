import styled from '@emotion/styled'
import React from 'react'
import { useGetFragmentQuery } from 'states/calimaco/calimacoContentApi'
import FragmentCustomAT from 'components/shared/fragment-custom-at/FragmentCustomAT'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'

const TeleGT = () => {
  const { data } = useGetFragmentQuery({
    fragment: 'SEC_TELESERVICIOS_GRUPO_TELEGRAM',
  })
  return (
    <StyledS>
      <FragmentCustomAT fragment={data ?? ''}></FragmentCustomAT>
    </StyledS>
  )
}

export default TeleGT
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
