import { Grid } from '@mui/material'
import styled from '@emotion/styled'
import React from 'react'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'

const metodosRetiroArray = ['Transferencia Bancaria', 'Puntos de Venta', 'Otros']

function arrayComputed() {
  return metodosRetiroArray.slice(0, 4)
}

const MetodosDeRetiros = ({ onBack, onNext, className }) => {
  return (
    <div>
      <BalanceS>
        <div>
          <span>Balance actual</span>
          <span>1,929.59 PEN</span>
        </div>
        <div>
          <span>Balance retirable</span>
          <span>1,900.00 PEN</span>
        </div>
      </BalanceS>
      <CabeceraPaymentS>
        <Grid container spacing={2}>
          <Grid item xs={1}>
            <div className="iconS">
              <CheckCircleOutlineOutlinedIcon />
            </div>
          </Grid>
          <Grid item xs={11}>
            <div className="TituloModalS">
              Sobrin@, puedes retirar tus premios fácilmente a través de una transferencia bancaria a tu cuenta o en
              nuestras más de 500 tiendas a nivel nacional.
            </div>
          </Grid>
        </Grid>
      </CabeceraPaymentS>

      <MethodsPaymentS className={className}>
        <div className="wrapper">
          {arrayComputed().map((retiro, i) => {
            return (
              <CardMethodS key={i} variant="contained">
                <div className="logoPagoS" onClick={onNext}>
                  {retiro}
                </div>
              </CardMethodS>
            )
          })}
        </div>
      </MethodsPaymentS>
    </div>
  )
}

export default MetodosDeRetiros
const CardMethodS = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  aspect-ratio: 4 / 3;
  .logoPagoS {
    background: white;
    border-radius: 1rem;
    display: flex;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    flex: 1;
    padding: 1.5rem;
    cursor: pointer;
    transition: 250ms;
    box-shadow: rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
    :hover {
      box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px,
        rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
    }
    img {
      flex: 1;
      width: 70%;
      object-fit: contain;
      max-width: fit-content;
    }
  }
  .textInfoS {
    text-align: center;
    color: ${(p) => p.theme.palette.alternate13.main};
    white-space: nowrap;
    font-size: 0.8rem;
  }
`
const MethodsPaymentS = styled.div`
  background: ${(p) => p.theme.palette.alternate12.main};
  min-height: 100%;
  & {
    .wrapper {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 1rem;
      padding: 1rem;
      ${MEDIA_QUERIES.min_width.tabletS} {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      }
      ${MEDIA_QUERIES.min_width.tabletS} {
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      }
      ${MEDIA_QUERIES.min_width.tabletL} {
        grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
        padding: 2rem;
      }
      ${MEDIA_QUERIES.min_width.desktopXS} {
        grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
        padding: 2rem 3rem;
      }
      ${MEDIA_QUERIES.min_width.desktopS} {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        padding: 2rem 4rem;
      }
      ${MEDIA_QUERIES.min_width.desktopM} {
        grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
        padding: 2rem 10vmax;
      }
    }
  }
`
const CabeceraPaymentS = styled.div`
  outline: none;
  background: #ffffff;
  position: relative;
  z-index: 1;
  height: auto;
  padding: 0 30px 0 30px;
  /* overflow: auto; */
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: justify;
  .TituloModalS {
    padding: 20px 0px 30px 0px;
    color: #5a5a5a;
    font-size: 1rem;
    line-height: 16px;
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 400;
  }
  .iconS {
    text-align: right;
    padding-top: 25px;
  }

  .subtitS {
    padding: 20px 0px 30px 0px;
    color: #5a5a5a;
    font-size: 12px;
    line-height: 16px;
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 700;
  }
  .subtitS2 {
    padding: 20px 0px 30px 0px;
    color: #ff0000;
    font-size: 12px;
    line-height: 16px;
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 400;
    text-decoration: underline;
  }
`
const BalanceS = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 0.2rem;
  & {
    div {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: ${(p) => p.theme.palette.alternate14.main};
      padding: 0.7rem 1.4rem;
      gap: 0.2rem;
      span {
        color: #828282;
        font-weight: 400;
      }
      span:nth-of-type(2) {
        font-weight: 600;
        color: #595959;
      }
    }
  }
`
