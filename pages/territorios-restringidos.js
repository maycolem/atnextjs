import React from 'react'
import { useGetFragmentQuery } from 'states/calimaco/calimacoContentApi'
import FragmentCustomAT from 'components/shared/fragment-custom-at/FragmentCustomAT'
import styled from '@emotion/styled'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'

const TerritoriosRestringidos = () => {
  // SEC_TERRITORIOS_RESTRINGIDOS
  const { data } = useGetFragmentQuery({
    fragment: 'SEC_TERRITORIOS_RESTRINGIDOS',
  })
  return (
    <StyledS>
      <FragmentCustomAT fragment={data ?? ''}></FragmentCustomAT>
    </StyledS>
  )
}

export default TerritoriosRestringidos
const StyledS = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  display: flex;
  position: relative;
  justify-content: center;
  background: white;
  width: calc(100% + 28px);
  right: 14px;
  padding: 1rem;
  ${MEDIA_QUERIES.min_width.desktopS} {
    width: calc(100% + 100px);
    right: 50px;
  }
`
