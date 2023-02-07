import styled from '@emotion/styled'
import React from 'react'
import { Grid, Radio, RadioGroup, FormControlLabel } from '@mui/material'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import { useSelector } from 'react-redux'
import { userSelector } from 'states/features/slices/userSlice?'
import { useTranslation } from 'react-i18next'

const DatosPerfil = () => {
    const { t } = useTranslation()
    const [value, setValue] = React.useState('Varon')
    const user = useSelector(userSelector)

    const handleChange = (event) => {
        setValue(event.target.value)
    }
    return (
        <>
            <FormPerfilS>
                {/* <div className="Contenedor">
          <CabDatosPerfilS>
            <Grid container spacing={0}>
              <Grid item xs={1}>
                <div className="iconS">
                  <CheckCircleOutlineOutlinedIcon />
                </div>
              </Grid>
              <Grid item xs={11}>
                <div className="TituloModalS">
                  Si desea actualizar cualquiera de estos datos por favor comuníquese con
                  <span className="subtext"> atencionalcliente@apuestatotal.com</span>
                </div>
              </Grid>
            </Grid>
          </CabDatosPerfilS>
        </div> */}

                <div className="Contenedor1">
                    <div className="Secciones">
                        <div className="TextTitulo">Nombres</div>
                        <div className="TextContent">{user?.firstName ? user?.firstName : 'xxxxx'}</div>
                        <LineS></LineS>
                    </div>

                    <div className="Secciones">
                        <div className="TextTitulo">Apellidos</div>
                        <div className="TextContent">{user?.lastName ? user?.lastName : 'xxxxx'}</div>
                        <LineS></LineS>
                    </div>
                    <div className="Secciones">
                        <div className="TextTitulo">Tipo de Documento</div>
                        <div className="TextContent">{user?.national_id_type ? user?.national_id_type : 'DNI'}</div>
                        <LineS></LineS>
                    </div>
                    <div className="Secciones">
                        <div className="TextTitulo">Número de Documento</div>
                        <div className="TextContent">{user?.national_id ? user?.national_id : '00000000'}</div>
                        <LineS></LineS>
                    </div>
                    <div className="Secciones">
                        <div className="TextTitulo">Fecha de Nacimiento</div>
                        <div className="TextContent">{user?.birthday ? user?.birthday : '00/00/0000'}</div>
                        <LineS></LineS>
                    </div>
                    <div className="Secciones">
                        <div className="TextTitulo">Sexo</div>
                        <div className="TextContent">{t(user?.gender)}</div>

                        {/* <div className="TextContent22">
                <RadioGroupS aria-labelledby="demo-row-radio-buttons-group-label" defaultValue={user?.gender} row>
                  <FormControlLabelS control={<Radio />} label="Varon" value="MALE" />
                  <FormControlLabelS control={<Radio />} label="Mujer" value="FEMALE" />
                </RadioGroupS>
              </div> */}

                        <LineS></LineS>
                    </div>
                    <div className="Secciones">
                        <div className="TextTitulo">Celular</div>
                        <div className="TextContent">{user?.mobile ? user?.mobile : '000000000'}</div>
                        <LineS></LineS>
                    </div>
                    <div className="Secciones">
                        <div className="TextTitulo">Pais</div>
                        <div className="TextContent">{user?.countryName ? user?.countryName : 'Perú'}</div>
                        <LineS></LineS>
                    </div>
                    <div className="Secciones">
                        <div className="TextTitulo">Ciudad</div>
                        <div className="TextContent">{user?.city ? user?.city : 'Lima'}</div>
                        <LineS></LineS>
                    </div>
                    <div className="Secciones">
                        <div className="TextTitulo">Dirección</div>
                        <div className="TextContent">{user?.address ? user?.address : 'Lima'}</div>
                        <LineS></LineS>
                    </div>
                    <div className="Secciones">
                        <div className="TextTitulo">Correo electrónico</div>
                        <div className="TextContent">{user?.email ? user?.email : 'nombre@correo.com'}</div>
                        <LineS></LineS>
                    </div>
                    <div className="Secciones">
                        <div className="TextTitulo"> </div>
                        <div className="TextContent"> </div>
                    </div>
                </div>
            </FormPerfilS>
        </>
    )
}

export default DatosPerfil
const CabDatosPerfilS = styled.div`
    border: 1px solid #d9d9d9;
    padding: 5px;
    .TituloModalS {
        padding: 20px 0px 30px 20px;
        color: #5a5a5a;
        font-size: 1rem;
        line-height: 16px;
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 400;
    }
    span.subtext {
        padding: 20px 0px 30px 0px;
        color: #171717;
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
    ${MEDIA_QUERIES.min_width.tabletL} {
        border: 1px solid #d9d9d9;
        padding: 10px;
        .TituloModalS {
            padding: 20px 0px 30px 20px;
            color: #5a5a5a;
            font-size: 1rem;
            line-height: 16px;
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 400;
            align-items: center;
            justify-content: center;
        }
    }
`
const FormPerfilS = styled.div`
    & {
        padding: 2rem 1rem;

        grid-gap: 1rem;
        grid-column-gap: 2rem;
        grid-template-columns: repeat(2, 1fr);

        > div {
            grid-column: span 2;
            &.date,
            &.method {
                grid-column: span 1;
            }
        }
    }

    .Contenedor {
        display: grid;
        grid-template-columns: auto;
        gap: 1rem;
        padding: 1.2rem;
    }
    .Contenedor1 {
        display: grid;
        grid-template-columns: 50% 50%;
        gap: 1rem;
        padding: 1.2rem;
    }
    .Secciones {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 1rem;

        text-align: left;
    }

    .Secciones2 {
        position: relative;
        display: flex;
        flex-direction: column;

        text-align: left;
    }

    .TextContent {
        font-weight: 600;
        font-size: 1.1rem;
        line-height: 16px;
        display: flex;
        align-items: center;
        color: #6e6e73;
    }

    .notification {
        line-height: 16px;
        padding: 2px;
        .TextContent22 {
            color: #595959;
            font-size: 1.2rem;
        }
        .TextTitulo22 {
            font-weight: 400;
            font-size: 1.1rem;
            line-height: 16px;
            display: flex;
            align-items: center;
            color: #6e6e73;
            padding-top: 20px;
        }
    }

    .TextTitulo {
        font-weight: 400;
        font-size: 1.1rem;
        line-height: 16px;
        display: flex;
        align-items: center;
        color: #6e6e73;
        padding-top: 20px;
    }
    .TextContent2 {
        font-weight: 600;
        font-size: 14px;
        line-height: 16px;
        display: flex;
        align-items: center;
        color: #6e6e73;
    }
    ${MEDIA_QUERIES.min_width.desktopL} {
        & {
            grid-gap: 1rem;
            grid-column-gap: 2rem;
            grid-template-columns: repeat(2, 1fr);

            > div {
                grid-column: span 2;
                &.date,
                &.method {
                    grid-column: span 1;
                }
            }
        }
        .Contenedor {
            display: grid;
            grid-template-columns: auto;
            gap: 1rem;
            padding: 1.2rem;
        }
        .Contenedor1 {
            display: grid;
            grid-template-columns: auto auto auto auto;
            gap: 1rem;
            padding: 1.2rem;
        }
        .Secciones {
            position: relative;
            display: flex;
            flex-direction: column;
            gap: 1rem;

            text-align: left;
        }

        .notification {
            line-height: 16px;
            padding: 3px;
            .TextContent22 {
                color: #595959;
                font-size: 1.2rem;
            }
            .TextTitulo22 {
                font-weight: 400;
                font-size: 1.1rem;
                line-height: 16px;
                display: flex;
                align-items: center;
                color: #6e6e73;
                padding-top: 20px;
            }
        }

        .Secciones2 {
            position: relative;
            display: flex;
            flex-direction: column;

            text-align: left;
        }

        .TextContent {
            font-weight: 600;
            font-size: 1.1rem;
            line-height: 16px;
            display: flex;
            align-items: center;
            color: #6e6e73;
        }
        .TextTitulo {
            font-weight: 400;
            font-size: 1.1rem;
            line-height: 16px;
            display: flex;
            align-items: center;
            color: #6e6e73;
            padding-top: 20px;
        }
        .TextContent2 {
            font-weight: 600;
            font-size: 14px;
            line-height: 16px;
            display: flex;
            align-items: center;
            color: #6e6e73;
        }
    }
`
const LineS = styled.div`
    & {
        display: flex;
        align-items: left;
        justify-content: left;

        border-bottom: 1px solid #d9d9d9;
        width: 80%;
    }
`
const RadioGroupS = styled(RadioGroup)`
    padding: 0px;
`

const FormControlLabelS = styled(FormControlLabel)`
    padding: 0px;
`
