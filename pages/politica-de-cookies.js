import React from 'react'
import { useGetFragmentQuery } from 'states/calimaco/calimacoContentApi'
import FragmentCustomAT from 'components/shared/fragment-custom-at/FragmentCustomAT'
import styled from 'styled-components'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
const PoliticasDeCookies = () => {
  // SEC_POLITICA_DE_COOKIES
  const { data } = useGetFragmentQuery({
    fragment: 'SEC_POLITICA_DE_COOKIES',
  })
  return (
    <StyledS>
      <FragmentCustomAT fragment={data ?? ''}></FragmentCustomAT>
    </StyledS>
  )
}

export default PoliticasDeCookies
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
