/* eslint-disable no-const-assign */
import React from 'react'
import styled from 'styled-components'
import PendingIcon from '@mui/icons-material/Pending';
const Loading = () => {
  
  return (
    <Styled>
      <span>Cargando</span>
      <PendingIcon></PendingIcon>
    </Styled>
  )
}

export default Loading
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
