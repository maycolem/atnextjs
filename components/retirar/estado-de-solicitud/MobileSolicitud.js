/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useTranslation } from 'react-i18next'
import { LoadingButton } from '@mui/lab'
import {
    FormControl,
    FormLabel,
    TextField,
    useMediaQuery,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Modal,
    Pagination,
    Button,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import esLocale from 'date-fns/locale/es'
import { useSelector, useDispatch } from 'react-redux'
import { userSelector, setUser } from 'states/features/slices/userSlice'
import {
    useGetOperationsHistoryPayoutMutation,
    useCancelPayoutMutation,
    useGetOperationsHistoryPayoutPaginateMutation,
} from 'states/calimaco/calimacoDataApi'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { format } from 'date-fns'
import DesktopSolicitud from 'components/retirar/estado-de-solicitud/DesktopSolicitud'
import CardsMobileSolicitud from 'components/retirar/estado-de-solicitud/CardsMobileSolicitud'
import NotData from 'components/shared/no-data/NotData'
import FilterListIcon from '@mui/icons-material/FilterList'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import CancelIcon from '@mui/icons-material/Cancel'
import CloseIcon from '@mui/icons-material/Close'
import Loading from 'components/shared/no-data/Loading'
import { GoogleTagManager } from 'google/TagManager'
import { ProviderAt } from 'services/ProviderAtService'
import { Session } from 'services/Session'
import useMediaQueryAT from 'hooks/useMediaQueryAT'

const EstadoSolicitud = () => {
    const dispatch = useDispatch()
    const isDesktop = useMediaQuery(MEDIA_QUERIES.min_width.desktopS)
    const user = useSelector(userSelector)
    const providerAt = new ProviderAt()
    const [getHistoryPayaout, { isLoading: isLoadingActive }] = useGetOperationsHistoryPayoutPaginateMutation()
    const [datePicker, setValueDatePicker] = React.useState(null)
    const [datePickerFin, setValueDatePickerFin] = React.useState(null)
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const [data, setData] = useState([])
    const [totalItems, setTotalItems] = useState(0)
    const [limits, setLimits] = useState(null)
    const { t } = useTranslation()
    const [open, setOpen] = useState(false)
    const [smsAlert, setSmsAlert] = useState(false)
    const [cancelRetiros, { isLoading: isLoadingCancel }] = useCancelPayoutMutation()
    const [cancel, setCancel] = useState(false)
    const desktopS = useMediaQueryAT(MEDIA_QUERIES.min_width.desktopS)
    const cbEffect = async () => {
        if (!isDesktop) {
            const cantidad_per_page = 6
            const cantidad_per_page_real = cantidad_per_page + 1
            const { limit, offset, offsetEnd } = getPagination(page - 1, cantidad_per_page)

            const response = await getHistoryPayaout({
                type: 'PAYOUT',
                init: offset,
                end: offsetEnd,
                op_date_init: limits?.fechaInicio ?? '',
                op_date_end: limits?.fechaFin ?? '',
            })

            if (response?.data?.result === 'OK') {
                const res = getPagingData(
                    {
                        count: response?.data?.total,
                        rows: response?.data?.data,
                    },
                    page - 1,
                    limit,
                    offset,
                    offsetEnd
                )

                const { totalItems, items, totalPages, currentPage } = res
                setData(items)
                setTotalItems(totalItems)
                let end_range_total_page = 0
                for (let i = totalPages; i > -1; i--) {
                    if (i * cantidad_per_page_real - cantidad_per_page_real < totalItems) {
                        end_range_total_page = i
                        break
                    }
                }
                setTotalPage(end_range_total_page)
            }
        }
        return () => setData([])
    }
    useEffect(() => {
        cbEffect()
    }, [page, limits, !isDesktop, cancel])

    const getPagingData = (data, page, limit, offset, offsetEnd) => {
        const { count: totalItems, rows: _items } = data
        const currentPage = page ? +page : 0
        const items = _items
        const totalPages = Math.ceil(totalItems / limit)

        return { totalItems, items, totalPages, currentPage }
    }

    const handleResetHistoryPayout = () => {
        setValueDatePicker(null)
        setValueDatePickerFin(null)
        setPage(1)
        setLimits({
            fechaInicio: '',
            fechaFin: '',
        })
    }

    const handleHistoryPayaout = async () => {
        // GTM
        GoogleTagManager.push({
            event: 'atm.event',
            eventName: 'retiro_estado_de_solicitud',
            option: 'buscar',
            action: 'click',
        })

        if (!datePicker || !datePickerFin) return
        const _date = new Date(datePicker)
        const _dateFin = new Date(datePickerFin)

        const _formaInicio = format(_date, 'yyyy/MM/dd')
        const _formaFin = format(_dateFin, 'yyyy/MM/dd') + ' ' + '23:59:59'

        setPage(1)
        setLimits({
            fechaInicio: _formaInicio,
            fechaFin: _formaFin,
        })
    }

    const getPagination = (page, size) => {
        // GTM

        GoogleTagManager.push({
            event: 'atm.event',
            eventName: 'retiro_estado_solicitud',
            option: 'pagina ' + Number(page + 1),
            action: 'click',
        })

        const limit = size ? +size : 3
        const offset = page ? page * limit + page : 0

        const offsetEnd = offset + limit
        return { limit, offset, offsetEnd }
    }

    const handleChange = (event, value) => {
        setPage(value)
    }

    const customFormatDateLocation = (dateCreated) => {
        if (!dateCreated) return ''
        const rest = new Date(dateCreated.replace(' ', 'T'))
        // const fromDate = new Date('2022-08-06T02:00:00')
        // if (rest > fromDate) {
        //   rest.setHours(rest.getHours() - 5)
        // }
        rest.setHours(rest.getHours() - 5)
        const resultFormatDate = format(rest, "dd-MM-yyyy hh:mm aaaaa'm'")
        // TODO: RESTAR 5 horas apartir del 6 de agostro del 2022 alas 02:00 horas.
        return `${resultFormatDate}`
    }

    const handleCancel = async (item) => {
        // GTM

        GoogleTagManager.push({
            event: 'atm.event',
            eventName: 'retiro_estado_solicitud',
            option: 'cancelar',
            action: 'click',
        })

        const response = await cancelRetiros({
            company: 'ATP',
            session: user?.session,
            operation: item.operation,
        })

        if (response.data.result === 'OK') {
            setOpen(true)
            setSmsAlert('¡Retiro cancelado!')
            setCancel(true)

            // UPDATE BALANCE

            const resUserDetail = await providerAt.userDetail(user.session)
            const _user = {
                ...resUserDetail.user,
                session: user.session,
            }
            Session().setUser(_user)
            dispatch(setUser(Session().getUser()))
        } else if (response.data.result === 'error') {
            setOpen(true)
            setSmsAlert(response.data.description)
        }
    }

    const handleFilter = async () => {
        GoogleTagManager.push({
            event: 'atm.event',
            eventName: 'retiro_estado_de_solicitud',
            option: 'filtro de busqueda',
            action: 'click',
        })

        // console.log('Enter...')
    }

    const dtCancelar = async (e) => {
        setOpen(false)
    }

    if (isLoadingActive) {
        return (
            <>
                <Loading></Loading>
            </>
        )
    }

    return (
        <div>
            <FormCardS>
                <AccordionS>
                    <AccordionSummary
                        aria-controls="panel1a-content"
                        expandIcon={<FilterListIconS />}
                        id="panel1a-header"
                        onClick={() => handleFilter()}
                    >
                        <p>Filtros</p>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="ContenedorNewCuenta2">
                            <div className="ContenedorNewCuenta">
                                <FormContenedorS>
                                    <FormLabel>
                                        <div className="LabelS">Fecha Inicio</div>
                                    </FormLabel>
                                    <LocalizationProvider adapterLocale={esLocale} dateAdapter={AdapterDateFns}>
                                        <DesktopDatePicker
                                            disableFuture
                                            disableHighlightToday
                                            inputFormat="yyyy-MM-dd"
                                            onChange={setValueDatePicker}
                                            openTo="year"
                                            renderInput={(params) => {
                                                return (
                                                    <TextField
                                                        autoComplete="none"
                                                        inputProps={{
                                                            placeholder: 'dd/mm/yyyy',
                                                        }}
                                                        {...params}
                                                    />
                                                )
                                            }}
                                            value={datePicker}
                                            views={['year', 'month', 'day']}
                                        />
                                    </LocalizationProvider>
                                </FormContenedorS>

                                <FormContenedorS>
                                    <FormLabel>
                                        <div className="LabelS">Fecha Fin</div>
                                    </FormLabel>

                                    <LocalizationProvider adapterLocale={esLocale} dateAdapter={AdapterDateFns}>
                                        <DesktopDatePicker
                                            disableFuture
                                            disableHighlightToday
                                            inputFormat="yyyy-MM-dd"
                                            onChange={setValueDatePickerFin}
                                            openTo="year"
                                            renderInput={(params) => {
                                                return (
                                                    <TextField
                                                        autoComplete="none"
                                                        inputProps={{
                                                            placeholder: 'dd/mm/yyyy',
                                                        }}
                                                        {...params}
                                                    />
                                                )
                                            }}
                                            value={datePickerFin}
                                            views={['year', 'month', 'day']}
                                        />
                                    </LocalizationProvider>
                                </FormContenedorS>
                            </div>

                            <div className="DivButton">
                                <FormControl>
                                    <FormContenedorS>
                                        <ButtonS
                                            color="secondary"
                                            endIcon={<SearchIcon />}
                                            loading={isLoadingActive}
                                            onClick={() => handleHistoryPayaout()}
                                            size="large"
                                            variant="contained"
                                        >
                                            Buscar
                                        </ButtonS>
                                        <br></br>

                                        {/* 
                        <ButtonS
                            color="primary"
                            endIcon={<DeleteForeverIcon />}
                            loading={isLoadingActive}
                            onClick={() => handleResetHistoryPayout()}
                            size="large"
                            variant="contained">
                            Borrar
                        </ButtonS> 
                      */}
                                    </FormContenedorS>
                                </FormControl>
                            </div>
                        </div>
                    </AccordionDetails>
                </AccordionS>
            </FormCardS>

            {data.length > 0 ? (
                <>
                    <HistoryCardsS>
                        {data &&
                            data.map((item, i) => {
                                return (
                                    <CardSM key={i}>
                                        <div className="TitiloCard">{item.operation}</div>
                                        <LineS></LineS>

                                        <div className="Contenedor1">
                                            <div className="Secciones">
                                                <div className="TextTitulo">Estado</div>
                                                <div className="TextContent">{t(item.status)}</div>
                                            </div>
                                            <div className="Secciones">
                                                <div className="TextTitulo">Fecha y hora</div>
                                                <div className="TextContent">{customFormatDateLocation(item.operation_date)}</div>
                                            </div>
                                        </div>
                                        <LineS></LineS>

                                        <div className="Contenedor1">
                                            <div className="Secciones">
                                                <div className="TextTitulo">Monto</div>
                                                <div className="TextContent">
                                                    {new Intl.NumberFormat('es-PE', {
                                                        style: 'currency',
                                                        currency: 'PEN',
                                                        maximumFractionDigits: 2,
                                                    }).format(item.amount / 100)}
                                                </div>
                                            </div>
                                            <div className="Secciones">
                                                <div className="TextTitulo">Medio de Pago</div>
                                                <div className="TextContent">{t(item.method_name)}</div>
                                            </div>
                                        </div>
                                        <LineS></LineS>

                                        <div className="Contenedor1">
                                            <div className="Secciones">
                                                <div className="TextTitulo">Acción</div>
                                                <div className="TextContent">
                                                    {item.status === 'NEW' ? (
                                                        <ButtonS
                                                            color="primary"
                                                            endIcon={<CancelIcon />}
                                                            loading={isLoadingCancel}
                                                            onClick={() => handleCancel(item)}
                                                            size="large"
                                                            variant="contained"
                                                        >
                                                            Cancelar
                                                        </ButtonS>
                                                    ) : (
                                                        ''
                                                    )}

                                                    {item.status === 'ACCEPTED' && item.method === 'ATPAYMENTSERVICE_PAYOUT' ? (
                                                        <ButtonS
                                                            color="primary"
                                                            endIcon={<CancelIcon />}
                                                            loading={isLoadingCancel}
                                                            onClick={() => handleCancel(item)}
                                                            size="large"
                                                            variant="contained"
                                                        >
                                                            Cancelar
                                                        </ButtonS>
                                                    ) : (
                                                        ''
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="Secciones"></div>
                                    </CardSM>
                                )
                            })}

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
                                    <div className="TextModalAuto">{smsAlert}</div>
                                    <div className="ContenedorBotones"></div>
                                </CardFooterS>
                            </ModalWrapperS>
                        </ModalS>
                    </HistoryCardsS>

                    <HistoryCardsS>
                        <Pagination
                            boundaryCount={desktopS ? 2 : 1}
                            color="primary"
                            count={totalPage}
                            onChange={handleChange}
                            page={page}
                            shape="rounded"
                            siblingCount={desktopS ? 2 : 1}
                            variant="text"
                        />
                    </HistoryCardsS>
                </>
            ) : (
                <NotData>No hay datos</NotData>
            )}
        </div>
    )
}

export default EstadoSolicitud

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
const FormContenedorS = styled.div`
    & {
        position: relative;
        display: flex;
        flex-direction: column;
        padding: 5px;
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
const FormCardS = styled.form`
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
    .LabelS2 {
        margin-left: 40px;
    }
    .ContenedorNewCuenta {
        display: grid;
        grid-template-columns: 50% 50%;
    }
    .ContenedorNewCuenta2 {
        display: grid;
        grid-template-columns: auto;
    }
    .LabelBS {
        opacity: 0;
    }
    .DivButton {
        display: grid;
        grid-template-columns: auto;
    }

    ${MEDIA_QUERIES.min_width.tabletS} {
        .ContenedorNewCuenta {
            display: grid;

            grid-template-columns: 50% 50%;
        }
        .ContenedorNewCuenta2 {
            display: flex;
        }
        .LabelBS {
            opacity: 0;
        }
        .DivButton {
            display: flex;
            flex-direction: column;

            > div {
                flex: 1;
                justify-content: space-between;
                padding: 5px;
                gap: 1rem;
                > div {
                    padding: 0;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    > button {
                        flex: 1;
                    }
                }
            }
        }
    }

    ${MEDIA_QUERIES.min_width.desktopL} {
        .ContenedorNewCuenta {
            display: grid;

            grid-template-columns: 50% 50%;
        }
        .ContenedorNewCuenta2 {
            display: flex;
        }
        .LabelBS {
            opacity: 0;
        }
        .DivButton {
            display: flex;
            flex-direction: column;

            > div {
                flex: 1;
                justify-content: space-between;
                padding: 5px;
                gap: 1rem;
                > div {
                    padding: 0;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    > button {
                        flex: 1;
                    }
                }
            }
        }
    }
`
const HistoryCardsS = styled.div`
    background: ${(p) => p.theme.palette.alternate12.main};
    padding: 1rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`
const AccordionS = styled(Accordion)`
    font-size: 0.8rem;
`
const FilterListIconS = styled(FilterListIcon)`
    color: #f90707;
`
const CardSM = styled('div')`
    background: #ffffff;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    .TitiloCard {
        font-weight: 400;
        font-size: 1.2rem;
        line-height: 17px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #6e6e73;
        padding: 20px;
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

    .TextContent {
        font-weight: 400;
        font-size: 1.2rem;
        line-height: 17px;
        color: #6e6e73;
    }
    .TextTitulo {
        font-weight: 400;
        font-size: 0.8rem;
        line-height: 10px;
        color: #6e6e73;
    }
    .TextContent2 {
        font-weight: 400;
        font-size: 1.2rem;
        line-height: 17px;
        color: #ff0000;
    }
`
const LineS = styled.div`
    & {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 15px;
        border: 1px solid #d9d9d9;
        width: 90%;
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
