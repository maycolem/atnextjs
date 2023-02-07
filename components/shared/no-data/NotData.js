/* eslint-disable no-const-assign */
import React from 'react'
import styled from 'styled-components'
import DoDisturbAltIcon from '@mui/icons-material/DoDisturbAlt'
const NotData = (props) => {
  const { label } = props

  if(!label){
    label = 'No hay datos'
  }
  
  return (
    <Styled>
      <span>{label}</span>
      <DoDisturbAltIcon></DoDisturbAltIcon>
    </Styled>
  )
}

export default NotData
const Styled = styled.div`
  & {
    display: flex;
    align-items: center;
    min-height: 100px;
    justify-content: center;
    gap: 8px;
    color: ${(p) => p.theme.palette.alternate16.main};
  }
`
