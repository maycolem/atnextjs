import styled, { css } from 'styled-components'
import { MenuItem, Select, Button, FormControl, FormLabel, Modal, Grid } from '@mui/material'
import React, { useState } from 'react'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import { useSelector } from 'react-redux'
import CloseIcon from '@mui/icons-material/Close'
import { userSelector } from 'states/features/slices/userSlice'
import { usePostAutoexcludeMutation } from 'states/calimaco/calimacoDataApi'
import { ProviderAt } from 'services/ProviderAtService'
import { useRouter } from 'next/router'
import { PATHS } from 'routes/paths/PATHS'

const periodos = [
    {
        id: '1',
        periodo: '7 dias',
        dias: 7,
    },
    {
        id: '2',
        periodo: '15 dias',
        dias: 15,
    },
    {
        id: '3',
        periodo: '1 mes',
        dias: 30,
    },
    {
        id: '4',
        periodo: '6 meses',
        dias: 180,
    },
    {
        id: '5',
        periodo: 'Infinito',
        dias: 1803232,
    },
]

const AutoExclusion = ({ className }) => {
    const providerAt = new ProviderAt()
    const [open, setOpen] = useState(false)
    const [periodNameValue, setPeriodNameValue] = useState('')
    const [autoexclude, { isLoading: isPayment }] = usePostAutoexcludeMutation()
    const user = useSelector(userSelector)
    const router = useRouter()

    const dtConfirmacion = async (e) => {
        setOpen(true)
    }

    const dtCancelar = async (e) => {
        setOpen(false)
    }

    const handlePeriodoChange = async (e) => {
        const value = e.target.value
        setPeriodNameValue(value)
    }

    const handleAutoexcluirme = async (e) => {
        const exclusion = await autoexclude({ company: 'ATP', session: user?.session, days: periodNameValue })

        if (exclusion.data.result === 'OK') {
            setOpen(false)
            setPeriodNameValue('')

            await providerAt.logout()
            // dispatch(reset())
            await router.push(PATHS.HOME.url)
            window.location.reload(false)
        } else {
            setPeriodNameValue('')
        }
    }

    return (
        <AutoexclusionS id="scroll-page">
            <div className="Contenedor1">
                <CabDatosPerfilS>
                    <Grid container spacing={0}>
                        <Grid item xs={1}>
                            <div className="iconS">
                                <CheckCircleOutlineOutlinedIcon />
                            </div>
                        </Grid>
                        <Grid item xs={11}>
                            <div className="TituloModalS">
                                Especifique el período en el que desea autoexcluirse. No podrá iniciar sesión en su cuenta durante ese
                                período de tiempo (entre 1 semana a más).
                            </div>
                        </Grid>
                    </Grid>
                </CabDatosPerfilS>
            </div>

            <div className="Contenedor2">
                <FormContentS>
                    <FormLabel>Escoger periodo*</FormLabel>
                    <FormControl size="medium" sx={{ m: 1, minWidth: 120 }}>
                        <Select
                            defaultValue=""
                            id="demo-select-small"
                            labelId="demo-select-small"
                            onChange={handlePeriodoChange}
                            value={periodNameValue}
                        >
                            {periodos &&
                                periodos.map((item, i) => {
                                    return (
                                        <MenuItem key={i} value={item.dias}>
                                            {item.periodo}
                                        </MenuItem>
                                    )
                                })}
                        </Select>
                    </FormControl>
                </FormContentS>
            </div>
            <Button color="primary" onClick={dtConfirmacion} variant="contained">
                Autoexcluirme
            </Button>
            <ModalS onClose={() => setOpen(false)} open={open}>
                <ModalWrapperS>
                    <BackAndCloseS>
                        <ButtonS></ButtonS>
                        <LocationS> </LocationS>
                        <Button className="close" onClick={dtCancelar} variant="contained">
                            <CloseIcon></CloseIcon>
                        </Button>
                    </BackAndCloseS>
                    <MethodsPaymentS className={className}>
                        <div className="TextModalAuto">
                            Ten en cuenta que no podrás iniciar sesión, depositar, jugar ni retirar ganancias cuando estás autoexcluido.
                        </div>
                        <div className="ContenedorBotones">
                            <Button color="light" onClick={() => handleAutoexcluirme()} variant="contained">
                                Autoexcluirme
                            </Button>

                            <Button color="primary" onClick={dtCancelar} variant="contained">
                                Cancelar
                            </Button>
                        </div>
                    </MethodsPaymentS>
                </ModalWrapperS>
            </ModalS>
        </AutoexclusionS>
    )
}

export default AutoExclusion
const ModalS = styled(Modal)`
    & {
        z-index: 9999;
        overflow: auto;
        display: flex;
        align-items: center;
        font-size: 13px;
    }
`
const AutoexclusionS = styled.div`
    & {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        background: #fafafa;
        position: relative;
        header {
            display: flex;
            align-items: center;
            gap: 1rem;
            color: ${(p) => p.theme.palette.alternate5.main};
        }
    }

    ${MEDIA_QUERIES.min_width.tabletS} {
        & {
            gap: 1rem;
            background: #fafafa;
            padding: 20px;

            margin: 0 auto;
            display: flex;
            flex-direction: column;

            align-items: center;
            header {
                display: flex;

                gap: 1rem;
                color: ${(p) => p.theme.palette.alternate5.main};
            }
        }
        .Contenedor2 {
            display: grid;
            grid-template-columns: 500px;

            gap: 1rem;
            padding: 1rem;
        }
    }

    .Contenedor1 {
        display: grid;
        grid-template-columns: auto auto;
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
`
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
        justify-content: justify;
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
`
const FormContentS = styled.div`
    & {
        position: relative;
        display: flex;
        flex-direction: column;
        padding: 10px;
        span.lineStyle {
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 400;
            font-size: 19.42px;
            height: 45px;
            display: flex;
            align-items: center;
            text-align: center;
            color: #000000;
        }
        span.textFooter {
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 16px;
            display: flex;
            align-items: center;
            text-align: center;
            color: #000000;
        }
    }

    ${MEDIA_QUERIES.min_width.tabletS} {
        & {
            position: relative;
            display: flex;
            flex-direction: column;
            gap: 1rem;

            text-align: left;

            span.lineStyle {
                font-family: 'Rubik';
                font-style: normal;
                font-weight: 400;
                font-size: 19.42px;
                height: 45px;
                display: flex;
                align-items: center;
                text-align: center;
                color: #000000;
            }
            span.textFooter {
                font-family: 'Rubik';
                font-style: normal;
                font-weight: 400;
                font-size: 12px;
                line-height: 16px;
                display: flex;
                align-items: center;
                text-align: center;
                color: #000000;
            }
        }
    }
`
const MethodsPaymentS = styled.div`
    background: ${(p) => p.theme.palette.alternate12.main};
    min-height: 100%;
    .TextModalAuto {
        font-weight: 400;
        font-size: 15px;
        line-height: 26px;
        /* or 173% */

        display: flex;
        align-items: center;
        text-align: center;

        color: #323232;
        padding: 50px;
    }
    .ContenedorBotones {
        display: grid;
        grid-template-columns: auto auto;

        gap: 1rem;
        padding: 1rem;
    }
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
const ModalWrapperS = styled.div`
    outline: none;
    background: white;
    position: relative;
    z-index: 1;

    min-width: 230px;
    /* overflow: auto; */
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    ${MEDIA_QUERIES.min_width.mobileL} {
        height: auto;
        min-height: auto;
        width: 90%;
        max-width: 400px;
    }
    & {
        .close-modal {
            width: 100%;
            display: flex;
            justify-content: flex-end;
            margin-bottom: 10px;
            svg {
                cursor: pointer;
                font-size: 30px;
            }
        }
        iframe {
            width: 100%;
            height: 80vh;
            max-height: 400px;
        }
    }
`
const BackAndCloseS = styled.div`
    background: white;
    display: flex;
    width: 100%;
    justify-content: space-between;

    align-items: center;
    border-bottom: 1px solid ${(p) => p.theme.palette.alternate8.main};
    .MuiButton-root {
        border-radius: 0;
        padding: 0.3rem;
        line-height: 1;
        min-width: initial;
        svg {
            color: red;
            font-size: 2rem;
        }
    }
    .MuiButton-root.close {
        svg {
            color: white;
        }
    }
`
const ButtonS = styled(Button)`
    & {
        &.MuiButton-root.back {
            ${(p) => {
                console.log(p.$stepNext)
                if (p.$stepNext < 1)
                    return css`
                        & {
                            opacity: 0;
                            pointer-events: none;
                        }
                    `
            }}
        }
    }
`
const LocationS = styled.div`
    & {
        font-size: 0.95rem;
    }
`
