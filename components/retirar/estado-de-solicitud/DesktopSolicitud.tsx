/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { LoadingButton } from '@mui/lab'
import {
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
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CancelIcon from '@mui/icons-material/Cancel'
import esLocale from 'date-fns/locale/es'
import { useDispatch, useSelector } from 'react-redux'
import { userSelector, setUser } from 'states/features/slices/userSlice'
import { useCancelPayoutMutation, useGetOperationsHistoryPayoutPaginateMutation } from 'states/calimaco/calimacoDataApi'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import Box from '@mui/material/Box'
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { format } from 'date-fns'
import CloseIcon from '@mui/icons-material/Close'
import NotData from 'components/shared/no-data/NotData'
import FilterListIcon from '@mui/icons-material/FilterList'
import Pagination from '@mui/material/Pagination'
import Loading from 'components/shared/no-data/Loading'
import { ProviderAt } from 'services/ProviderAtService'
import { Session } from 'services/Session'
import { GoogleTagManager } from 'google/TagManager'

const fechaInicio = ''
const fechaFin = ''

const EstadoSolicitud = () => {
    const dispatch = useDispatch()
    const isDesktop = useMediaQuery(MEDIA_QUERIES.min_width.desktopS)
    const user = useSelector(userSelector)
    const [getHistoryPayaout, { isLoading: isLoadingActive }] = useGetOperationsHistoryPayoutPaginateMutation()
    const [getHistory, setGetHistory] = useState([])
    const [datePicker, setValueDatePicker] = React.useState(null)
    const [datePickerFin, setValueDatePickerFin] = React.useState(null)
    const [cancelRetiros, { isLoading: isLoadingCancel }] = useCancelPayoutMutation()
    const [open, setOpen] = useState(false)
    const [smsAlert, setSmsAlert] = useState<string>()
    const { t } = useTranslation()
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const [data, setData] = useState([])
    const [totalItems, setTotalItems] = useState(0)
    const [limits, setLimits] = useState(null)
    const [cancel, setCancel] = useState(false)
    const providerAt = new ProviderAt()
    const cbEffect = async () => {
        const cantidad_per_page = 8
        const cantidad_per_page_real = cantidad_per_page + 1
        const { limit, offset, offsetEnd } = getPagination(page - 1, cantidad_per_page)

        const response: any = await getHistoryPayaout({
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

        return () => setData([])
    }
    useEffect(() => {
        cbEffect()
    }, [page, limits, cancel])

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

    const handleCancel = async (item) => {
        // GTM

        GoogleTagManager.push({
            event: 'atm.event',
            eventName: 'retiro_estado_solicitud',
            option: 'cancelar',
            action: 'click',
        })

        const response: any = await cancelRetiros({
            company: 'ATP',
            session: user?.session,
            operation: item.operation,
        })


        if (response.data.result === 'OK') {
            setCancel(true)
            setOpen(true)
            setSmsAlert('¡El retiro ha sido cancelado a su solicitud!')

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

    const getPagination = (page, size) => {
        // GTM

        GoogleTagManager.push({
            event: 'atm.event',
            eventName: 'retiro_estado_de_solicitud',
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

    const dtCancelar = async (e) => {
        setOpen(false)
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

    const handleFilter = async () => {
        GoogleTagManager.push({
            event: 'atm.event',
            eventName: 'retiro_estado_de_solicitud',
            option: 'filtro de busqueda',
            action: 'click',
        })
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
            <FormS>
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

                                <div className="DivButton">
                                    <FormControl>
                                        <FormLabel>
                                            <div className="LabelBS">-----</div>
                                        </FormLabel>
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
                                        </FormContenedorS>
                                    </FormControl>
                                </div>
                            </div>
                        </div>
                    </AccordionDetails>
                </AccordionS>
            </FormS>

            {data.length > 0 ? (
                <div>
                    <FormDetalle>
                        <Box>
                            <TableContainer sx={{ maxHeight: 440 }}>
                                <Table aria-label="sticky table" stickyHeader>
                                    <TableHeadS>
                                        <TableRow>
                                            <TableCell>Estado</TableCell>
                                            <TableCell>Id</TableCell>
                                            <TableCell>Fecha y Hora</TableCell>
                                            <TableCell>Monto</TableCell>
                                            <TableCell>Medio Pago</TableCell>
                                            <TableCell>Accion</TableCell>
                                        </TableRow>
                                    </TableHeadS>
                                    <TableBodyS>
                                        {data &&
                                            data.map((item, i) => {
                                                return (
                                                    <TableRow key={i}>
                                                        <TableCell>{t(item.status)}</TableCell>
                                                        <TableCell>{item.operation}</TableCell>
                                                        <TableCell>{customFormatDateLocation(item.operation_date)}</TableCell>
                                                        <TableCell>
                                                            {new Intl.NumberFormat('es-PE', {
                                                                style: 'currency',
                                                                currency: 'PEN',
                                                                maximumFractionDigits: 2,
                                                            }).format(item.amount / 100)}
                                                        </TableCell>
                                                        <TableCell>{t(item.method_name)}</TableCell>
                                                        <TableCell>
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
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                    </TableBodyS>
                                </Table>
                            </TableContainer>
                        </Box>
                    </FormDetalle>

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
                                <div className="TextModalAuto">{t(smsAlert)}</div>
                                <div className="ContenedorBotones"></div>
                            </CardFooterS>
                        </ModalWrapperS>
                    </ModalS>

                    <Pagination
                        boundaryCount={2}
                        color="primary"
                        count={totalPage}
                        onChange={handleChange}
                        page={page}
                        shape="rounded"
                        siblingCount={2}
                        variant="text"
                    />
                </div>
            ) : (
                <NotData>NO HAY DATOS</NotData>
            )}
        </div>
    )
}

export default EstadoSolicitud

const FormS = styled.form`
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
        grid-template-columns: 33% 33% 33%;
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

            grid-template-columns: 33% 33% 33%;
        }
        .ContenedorNewCuenta2 {
            display: block;
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

            grid-template-columns: 33% 33% 33%;
        }
        .ContenedorNewCuenta2 {
            display: block;
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
const FormDetalle = styled.form`
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
const AccordionS = styled(Accordion)`
    font-size: 0.8rem;
`

const FilterListIconS = styled(FilterListIcon)`
    color: #f90707;
`
const TableHeadS = styled(TableHead)`
    .MuiTableCell-root {
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.5rem;
        display: table-cell;
        vertical-align: inherit;
        border-bottom: 1px solid rgba(224, 224, 224, 1);
        text-align: center;
        padding: 10px;
        color: #6e6e73;
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        z-index: 2;
        background-color: #fff;
        align-items: center;
    }
`
const TableBodyS = styled(TableBody)`
    .MuiTableCell-root {
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 400;

        align-items: center;
        color: #6e6e73;
        font-size: 1rem;
        line-height: 1.43;
        display: table-cell;
        vertical-align: inherit;
        border-bottom: 1px solid rgba(224, 224, 224, 1);
        padding: 16px;
        text-align: center;
        background: #ffffff;
    }
`
