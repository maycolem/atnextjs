import { DesktopDatePicker, LoadingButton, LocalizationProvider } from '@mui/lab'
import { FormControl, FormLabel, TextField } from '@mui/material'
import { format } from 'date-fns'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useGetUserTournamentATQuery } from 'states/calimaco/calimacoDataApi'
import { userSelector } from 'states/features/slices/userSlice'
import styled from 'styled-components'
import TorneosCards from './TorneosCards'
import SearchIcon from '@mui/icons-material/Search'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
const MisTorneos = () => {
    const [date, setDatePicker] = useState(null)
    const user = useSelector(userSelector)
    const [opDateInit, setOpDateInit] = useState('')
    const { data = [] } = useGetUserTournamentATQuery({ session: user?.session, op_date_init: opDateInit })
    const handleSearch = async () => {
        if (!date) {
            return
        }
        const _date = new Date(date)
        if (_date.toString() === 'Invalid Date') {
            return
        }
        const _format = format(_date, 'yyyy/MM/dd')
        setOpDateInit(_format)
    }

    return (
        <MisTorneosS>
            <MisBonosTopS>
                <FormS>
                    <FormControl className="date">
                        <FormLabelS>Fecha</FormLabelS>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                disableFuture
                                disableHighlightToday
                                inputFormat="dd/MM/yyyy"
                                label=""
                                onChange={setDatePicker}
                                openTo="year"
                                renderInput={(params) => {
                                    return (
                                        <TextField
                                            autoComplete="new-password"
                                            hiddenLabel
                                            id="new-password"
                                            inputProps={{
                                                placeholder: 'dd/mm/yyyy',
                                                form: {
                                                    autocomplete: 'new-password',
                                                },
                                            }}
                                            label=""
                                            {...params}
                                        />
                                    )
                                }}
                                value={date}
                                views={['year', 'month', 'day']}
                            />
                        </LocalizationProvider>
                    </FormControl>
                    <FormControl className="search">
                        <FormLabelS className="search-label" style={{ opacity: '0' }}>
                            button
                        </FormLabelS>
                        <LoadingButtonSearchS color="secondary" onClick={handleSearch} variant="contained">
                            <span>Buscar</span>
                            <SearchIcon></SearchIcon>
                        </LoadingButtonSearchS>
                    </FormControl>
                </FormS>
            </MisBonosTopS>
            <TorneosCards data={data?.data}></TorneosCards>
        </MisTorneosS>
    )
}

export default MisTorneos

const MisTorneosS = styled.div`
    & {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        background: ${(p) => p.theme.palette.alternate12.main};
    }
`
const MisBonosTopS = styled.div`
    & {
        background: white;
        padding: 1rem;
    }
`
const LoadingButtonSearchS = styled(LoadingButton)`
    && {
        padding: 0.8rem;
        text-transform: capitalize;
        > span {
            margin-right: 3px;
        }
    }
`
const FormS = styled.form`
    & {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 0.75rem;
        gap: 0.7em;
        max-width: 768px;
        ${MEDIA_QUERIES.min_width.tabletL} {
            display: flex;
            > .date {
                flex: 1;
            }
            > .search {
                flex: 1;
                > .search-label {
                    opacity: 0;
                }
                > button {
                    flex: 1;
                }
            }
        }
    }
`

const FormLabelS = styled(FormLabel)`
    & {
        font-weight: 500;
        color: ${(p) => p.theme.palette.dark2.main};
        &.search-label {
            display: none;
            ${MEDIA_QUERIES.min_width.tabletL} {
                display: block;
            }
        }
    }
`
const MisBonosS = styled.div`
    & {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        background: ${(p) => p.theme.palette.alternate12.main};
    }
`
