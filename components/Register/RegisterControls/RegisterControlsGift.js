import styled from '@emotion/styled'
import { ErrorMessage } from '@hookform/error-message'
import { FormControlLabel, Radio, RadioGroup } from '@mui/material'
import React, { useEffect, useState } from 'react'
import RedeemIcon from '@mui/icons-material/Redeem'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
const RegisterControlsGift = ({ setValue, register, getFirstError, promotions }) => {
  const id = 'apuesta-gratis-bienvenida-20-soles'
  useEffect(() => {
    if (promotions?.length > 0) {
      // const findIndex = (promotions, id = 'apuesta-gratis-bienvenida-20-soles') => {
      //   return promotions?.findIndex((item) => item.promotion === id) ?? ''
      // }
      const _index = promotions?.findIndex((item) => item.promotion === id) ?? ''
      if (_index === -1) {
        return ''
      } else {
        setValue('promotion', promotions[_index]?.promotion)
      }
    }
  }, [promotions])
  // FREEBET ACTIVO y MONTO_CERO

  return (
    <RegisterGiftStyled className="--gift">
      <div className="gift">
        <RedeemIcon></RedeemIcon>
      </div>
      <header>
        <h4>Elige aquí tu regalo de bienvenida</h4>
      </header>
      {promotions.length > 0 && (
        <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue={id}>
          <FormControlLabelS control={<Radio {...register('promotion')} />} label={'No quiero regalos'} value={'No quiero regalos'} />
          {promotions.map((promotion, i) => {
            return (
              <FormControlLabelS
                control={<Radio {...register('promotion')} />}
                key={i}
                label={promotion?.cms?.summary_title}
                value={promotion?.promotion}
              />
            )
          })}
        </RadioGroup>
      )}
      <ErrorMessage
        errors={getFirstError()}
        name="promotion"
        render={({ message }) => <RegisterErrorStyled>{message}</RegisterErrorStyled>}
      />
    </RegisterGiftStyled>
  )
}

export default RegisterControlsGift
const FormControlLabelS = styled(FormControlLabel)`
  & {
    .MuiTypography-root {
      font-size: 0.85em;
    }
    svg {
      font-size: 1em;
    }
  }
`
const RegisterErrorStyled = styled('p')`
  font-size: clamp(0.75em, 1.5vw, 0.8em);
  color: red;
  margin-left: 1rem;

  animation-name: fadeLeft;
  animation-duration: 0.5s;
  animation-iteration-count: 1;
  position: relative;
  @keyframes fadeLeft {
    from {
      bottom: -5px;
      opacity: 0;
    }
    to {
      bottom: 0;
    }
  }
`
const RegisterGiftStyled = styled('div')`
  background: #ffffff;
  border-style: solid;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.23);
  border-radius: 0.4rem;
  width: 100%;
  padding: 1rem 2rem;
  padding-top: 2rem;
  position: relative;
  margin-top: 1rem;
  /* margin-bottom: 0.6rem; */
  & .gift {
    position: absolute;
    top: -1.3rem;
    left: calc(50% - 1.5rem);
    svg {
      font-size: 2.5em;
    }
    ${MEDIA_QUERIES.min_width.desktopXS} {
      left: 0rem;
      top: 1.5rem;
    }
  }
  & > header {
    margin-bottom: 1rem;
    color: #3e3e45;
    > h4 {
      font-size: 0.8rem;
    }
  }
  & .MuiFormGroup-root {
    gap: 0.5rem;
  }
  & .MuiRadio-root {
    padding-top: 0;
    padding-bottom: 0;
  }
  & .MuiFormControlLabel-root {
    margin-right: 0;
    color: #3e3e45;
  }
  ${MEDIA_QUERIES.min_width.desktopXS} {
    background: transparent;
    padding: 0.5rem 0rem;
    padding-left: 3.123rem;
    border-color: transparent;
    margin-top: 0rem;
    margin-bottom: 0rem;
  }
`
