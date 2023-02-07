import { InputLabel } from '@mui/material'
import CustomSelect from './CustomSelect'

const InputNationalIdType = ({ register }) => {
    const items = [
        {
            value: 'DNI',
            label: 'DNI',
        },
        {
            value: 'CARNET_EXTRANJERIA',
            label: 'Carnet de extranjeria',
        },
        {
            value: 'PASAPORTE',
            label: 'Pasaporte',
        },
    ]
    return (
        <>
            <div style={{ position: 'relative' }}>
                <InputLabel>Tipo de documento</InputLabel>
                <CustomSelect items={items} label="Tipo de documento" register={register} />
            </div>
        </>
    )
}

export default InputNationalIdType
