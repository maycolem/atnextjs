import React from 'react'
import { useSelector } from 'react-redux'
import styled, { createGlobalStyle } from 'styled-components'
import { ModalRecargaFrameSelector } from 'states/slice/ModalRecarga'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
const GlobalCssOverride = createGlobalStyle`
 iframe html,iframe body{
  width: 100%;
  height: 100%;
  margin: 0;
  > form {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  }    
  `
const MetodoFrame = () => {
    const frame = useSelector(ModalRecargaFrameSelector)
    return (
        <>
            <MetodoFrameS src={frame}></MetodoFrameS>
            <GlobalCssOverride />
            <GlobalCssOverride />
        </>
    )
}

export default MetodoFrame
const MetodoFrameS = styled.iframe`
    background: ${(p) => p.theme.palette.alternate12.main};
    height: 100%;
    min-width: 100%;
    border: 0;
    outline: 0;
    display: block;
    ${MEDIA_QUERIES.min_width.desktopS} {
        min-height: 100%;
    }
`
