import { Alert } from '@mui/material'
import React from 'react'
import HandymanIcon from '@mui/icons-material/Handyman'
import styled from '@emotion/styled'
const WeAreWorking = ({ text = 'Estamos trabajando en esta sección.' }) => {
  return (
    <AlertS icon={<HandymanIcon />} severity="info" variant="filled">
      {text}
    </AlertS>
  )
}

export default WeAreWorking
const AlertS = styled(Alert)`
  & {
    font-size: 12px;
  }
`
