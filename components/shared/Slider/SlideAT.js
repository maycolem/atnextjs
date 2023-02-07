import styled from '@emotion/styled'
import React from 'react'

const SlideAT = ({ children, ...rest }) => {
  return <SlideS {...rest}>{children}</SlideS>
}

export default SlideAT

const SlideS = styled.div`
  & {
    cursor: pointer;
    position: relative;
    display: initial !important;
    img {
      object-fit: cover;
    }
  }
`
