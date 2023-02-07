/* eslint-disable no-undef */
import styled from '@emotion/styled'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import { useSaveUserConsentMutation } from 'states/calimaco/calimacoDataApi'
import { useSelector } from 'react-redux'
import { userSelector } from 'states/features/slices/userSlice'
import { useEffect, useState } from 'react'
import axios from 'axios'
import CloseIcon from '@mui/icons-material/Close'
import { LoadingButton } from '@mui/lab'

import {
    Grid,
    Button,
    Divider,
    FormControl,
    FormLabel,
    InputLabel,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Modal,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    useMediaQuery,
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@mui/material'

// eslint-disable-next-line prefer-const

const notifications = [
    {
        company: 'ATP',
        consent: 'EMAIL',
        name: 'Contactar por email',
        type: 'CONTACT',
        agree: 0,
    },

    {
        company: 'ATP',
        consent: 'PHONE',
        name: 'Contactar por teléfono',
        type: 'CONTACT',
        agree: 0,
    },
    {
        company: 'ATP',
        consent: 'PUSH',
        name: 'Notificaciones push',
        type: 'CONTACT',
        agree: 0,
    },
    {
        company: 'ATP',
        consent: 'SMS',
        name: 'Contactar por SMS',
        type: 'CONTACT',
        agree: 0,
    },
]

const Notificaciones = () => {
    const user = useSelector(userSelector)
    const [consent, setConsent] = useState([])
    const [check, setCheck] = useState([])
    const [saveConsent, { isLoading }] = useSaveUserConsentMutation()
    const [reload, setReload] = useState(false)
    const [open, setOpen] = useState(false)

    const handleSaveNotifications = () => {
        setReload(true)
        setOpen(true)
    }

    const handleCheck = async (item, op) => {
        const response = await saveConsent({
            company: 'ATP',
            session: user?.session,
            consent: item.consent,
            agree: op,
        })
    }

    const dtCancelar = async (e) => {
        setOpen(false)
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_CALIMACO_API_BASE}/data/getUserConsents?company=ATP&session=${user.session}`).then((res) => {
            const response = res.data.data

            notifications.forEach(function (item, index) {
                response.forEach(function (getItem, indexResponse) {
                    if (item.consent === getItem.consent) {
                        const pos = notifications[index]
                        pos.company = 'ATP'
                        pos.consent = item.consent
                        pos.name = item.name
                        pos.type = item.type
                        pos.agree = getItem.agree
                    }
                })
            })

            setConsent(notifications)
        })
    }, [reload])

    return (
        <NotificacionesS id="scroll-page">
            <div className="Contenedor1">
                <CabDatosPerfilS>
                    <Grid container spacing={0}>
                        <Grid item xs={1}>
                            <div className="iconS">
                                <CheckCircleOutlineOutlinedIcon />
                            </div>
                        </Grid>
                        <Grid item xs={11}>
                            <div className="TituloModalS">Autorizo que se me notifique de novedades y bonos a través de:</div>
                        </Grid>
                    </Grid>
                </CabDatosPerfilS>
            </div>
            <div className="Contenedor2">
                <FormContentS>
                    <NotificationsPermissions>
                        {consent.length > 0 &&
                            consent.map((item, i) => {
                                return (
                                    <div className="notification" key={i}>
                                        <div className="left">{item.name}</div>
                                        <div className="rigth">
                                            <RadioGroup
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                defaultValue={item.agree}
                                                name="row-radio-buttons-group"
                                                row
                                            >
                                                <FormControlLabel
                                                    control={<Radio />}
                                                    label="Si"
                                                    onClick={() => handleCheck(item, '1')}
                                                    value="1"
                                                />
                                                <FormControlLabel
                                                    control={<Radio />}
                                                    label="No"
                                                    onClick={() => handleCheck(item, '0')}
                                                    value="0"
                                                />
                                            </RadioGroup>
                                        </div>
                                    </div>
                                )
                            })}
                    </NotificationsPermissions>
                </FormContentS>
            </div>

            <ModalS onClose={() => setOpen(false)} open={open}>
                <ModalWrapperS>
                    <BackAndCloseS>
                        <ButtonS></ButtonS>
                        <LocationS> </LocationS>
                        <Button className="close" onClick={dtCancelar} variant="contained">
                            <CloseIcon></CloseIcon>
                        </Button>
                    </BackAndCloseS>
                    <CardFooterS>
                        <div className="TextModalAuto">Tu selección ha sido guardada</div>
                        <div className="ContenedorBotones"></div>
                    </CardFooterS>
                </ModalWrapperS>
            </ModalS>

            <Button color="primary" onClick={() => handleSaveNotifications()} variant="contained">
                Confirmar
            </Button>
        </NotificacionesS>
    )
}

export default Notificaciones

const NotificacionesS = styled.div`
    & {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        background: #fafafa;

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
        grid-template-columns: auto;
        gap: 1rem;
        padding: 1.2rem;
        width: 80%;
    }
    .Secciones {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 1rem;

        text-align: left;
    }
`
const NotificationsPermissions = styled.div`
    & {
        display: flex;
        flex-direction: column;

        .notification {
            display: flex;
            align-items: center;
            justify-content: space-between;
            line-height: 16px;
            padding: 1rem 3rem;
            .left {
                color: #595959;
                font-size: 1.2rem;
            }
            .rigth {
                color: #595959;

                font-size: 1.2rem;
            }
        }
    }
`
const CabDatosPerfilS = styled.div`
    border: 1px solid #d9d9d9;
    padding: 5px;
    .TituloModalS {
        padding: 30px 0px 30px 20px;
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
const ModalS = styled(Modal)`
    & {
        z-index: 9999;
        overflow: auto;
        display: flex;
        align-items: center;
        font-size: 13px;
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
const ButtonS = styled(LoadingButton)`
    & {
        text-transform: capitalize;
        font-size: 1rem;
    }
    ${MEDIA_QUERIES.min_width.tabletS} {
        & {
            text-transform: capitalize;
            font-size: 1rem;
        }
    }
`
const LocationS = styled.div`
    & {
        font-size: 0.95rem;
    }
`
const CardFooterS = styled.div`
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
