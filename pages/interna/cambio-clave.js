import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { Button } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'
import { PATHS } from 'routes/paths/PATHS'
const DepositoExitoso = () => {
  const [message, setMessage] = useState('ON CLICK')
  const r = useRouter()
  const handleOnclick = () => {
   
    r.push(PATHS.HOME.url)
  }
  useEffect(() => {
    if (r?.query?.db && r?.query?.hash) {
      const hash = r?.query?.hash
      const db = r?.query?.db
      const url = `${process.env.REACT_APP_CALIMACO_API_BASE}/payment/getOperationByHash?operationHash=${hash}&db=${db}`
      axios
        .get(url)
        .then((res) => {
          const status = res.data.operation.status
          const method = res.data.operation.method
          if (status === 'SUCCESS') {
            setMessage(`¡Tu contraseña fue actualizada con éxito! ${method}`)
            return
          }

          setMessage(`Algo pasó, no pudimos actualizar tu contraseña. ${method}`)
        })
        .catch((e) => {
          console.log('Ocurrio algo')
          setMessage(`Ocurrio algo`)
        })
    }
  }, [r])

  return (
    <BodyMensajeS>
      <Button className="textMsj" onClick={handleOnclick}>
        {message}
      </Button>
    </BodyMensajeS>
  )
}

export default DepositoExitoso

const BodyMensajeS = styled.div`
  .textMsj {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 400;
    font-size: 19.42px;
    line-height: 24px;
    /* or 124% */

    display: flex;
    align-items: center;
    text-align: center;

    color: #323232;
  }
`
