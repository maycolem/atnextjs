import React, { useEffect } from 'react'
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import esLocale from 'date-fns/locale/es'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import CustomTextField from './CustomTextField'
import { isValid } from 'date-fns'
import { delay } from '@helpers/delay'

const InputDatePicker = ({ register, hookFormProps }) => {
    const [datePicker, setValueDatePicker] = React.useState(null)
    const clearErrors = hookFormProps.clearErrors
    const setError = hookFormProps.setError
    const resetField = hookFormProps.resetField
    const setValue = hookFormProps.setValue
    const trigger = hookFormProps.trigger
    const todayMax = new Date()
    const cbEffect = async () => {
        clearErrors('birthday')
        if (datePicker) {
            setError('birthday', { type: 'custom', message: 'La fecha es inválida' })
            if (isValid(datePicker)) {
                const year = new Date(datePicker).getFullYear()
                if (year < 1900) {
                    resetField('birthday')
                    await delay(150)
                    setError('birthday', { type: 'custom', message: 'La fecha es inválida' })
                    return
                }
                const date = new Date()
                const limite = date.setFullYear(date.getUTCFullYear() - 18)
                const LIMIT = new Date(limite).getTime()
                const CURRENT = new Date(datePicker).getTime()
                if (CURRENT > LIMIT) {
                    resetField('birthday')
                    await delay(150)
                    setError('birthday', { type: 'custom', message: 'Solo mayores de 18 años' })
                    return
                }
                setValue('birthday', datePicker, { shouldTouch: true })
                await delay(150)
            }
            await trigger('birthday')
        }
    }
    useEffect(() => {
        cbEffect()
    }, [datePicker])

    // useEffect(() => {
    //     trigger('birthday')
    // }, [hookFormProps.getValues('birthday')])

    return (
        <>
            <LocalizationProvider adapterLocale={esLocale} dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                    defaultCalendarMonth={todayMax.setFullYear(todayMax.getUTCFullYear() - 18)}
                    disableFuture
                    disableHighlightToday
                    inputFormat="dd/MM/yyyy"
                    label="Fecha de nacimiento"
                    // maxDate={todayMax.setFullYear(todayMax.getUTCFullYear() - 18)}
                    onChange={setValueDatePicker}
                    renderInput={(params) => {
                        return (
                            <CustomTextField
                                inputProps={{
                                    placeholder: 'dd/mm/yyyy',
                                }}
                                {...params}
                            />
                        )
                    }}
                    // openTo="year"
                    // shouldDisableYear={todayMax.setFullYear(todayMax.getUTCFullYear() - 18)}
                    value={datePicker}
                    // views={['year', 'month', 'day']}
                />
            </LocalizationProvider>
            <input type="text" {...register} style={{ position: 'absolute', opacity: '0', zIndex: '-1' }} />
        </>
    )
}

export default InputDatePicker
