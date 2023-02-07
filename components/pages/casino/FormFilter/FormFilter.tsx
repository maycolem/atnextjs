import React, { useEffect, useState } from 'react'
import { Autocomplete, Button, FormControl, TextField, useMediaQuery } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import styled, { createGlobalStyle, css } from 'styled-components'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import { useGetTagsQuery } from 'states/calimaco/calimacoContentApi'
import { setCategoria, setProveedor } from 'states/slice/casino/CasinoLobbies'
import { InputSearch } from './index'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'
import Head from 'next/head'
import { dtCasinoVendor } from '../index'
import { useAppDispatch } from '@states/store'
import { Provider } from '@interfaces/index'

interface Tag {
    tag: string
    name: string
}
interface Props {
    providers: Provider[]
    filterTags: string[]
    lobbyName: string
    pathname: string
    section: string
}

export const FormFilter = ({ providers, filterTags, lobbyName, pathname, section }: Props) => {
    const tabletL = useMediaQuery(MEDIA_QUERIES.min_width.tabletL)
    const { data } = useGetTagsQuery(null)
    const [tags, setTags] = useState<Tag[]>([])
    // const { data: providers = [] } = useGetProvidersQuery()
    const [categoriaInput, setCategoriaInput] = useState('')
    const [newCategoria, setNewCategoria] = useState(null)
    const [proveedorInput, setProveedorInput] = useState('')
    const [newProveedor, setNewProveedor] = useState(null)
    const dispatch = useAppDispatch()
    const id = Math.random().toString()
    const [openFilterForm, setOpenFilterForm] = useState(false)
    const handleToggleFilterForm = () => {
        setOpenFilterForm(!openFilterForm)
    }

    useEffect(() => {
        const defaultTags = [
            { tag: 'Favoritos', name: 'Favoritos' },
            { tag: '', name: 'Todos' },
        ]
        if (data && 'tags' in data) {
            const tags = data?.tags
            if (tags.length > 0) {
                const filter = tags.filter((item) => filterTags.includes(item.tag))
                setTags([...defaultTags, ...filter])
            }
        }
    }, [data])

    useEffect(() => {
        if (!openFilterForm) {
            setCategoriaInput('')
            setNewCategoria(null)
            setProveedorInput('')
            setNewProveedor(null)
            dispatch(setCategoria(''))
            dispatch(setProveedor(''))
        }
    }, [openFilterForm])

    return (
        <>
            <Head>
                <meta content="width=device-width, initial-scale=1, maximum-scale=1" name="viewport"></meta>
            </Head>
            <FormSearchFilterS autoComplete="off" id="FormSearchFilterS" method="post" onSubmit={(e) => e.preventDefault()}>
                <FormAndFiltersContainerS id="FormAndFiltersContainerS">
                    <FormControlS>
                        <InputSearch pathname={pathname} lobbyName={lobbyName} section={section} />
                    </FormControlS>
                    {!tabletL && (
                        <ButtonFilterS onClick={handleToggleFilterForm} variant="contained">
                            {openFilterForm ? <FilterAltOffIcon /> : <FilterAltIcon />}
                        </ButtonFilterS>
                    )}
                </FormAndFiltersContainerS>
                <FormFilterS $openFilterForm={openFilterForm}>
                    <FormControlS>
                        <StyledAutocomplete
                            getOptionLabel={(option: Tag) => option?.name}
                            inputValue={categoriaInput}
                            noOptionsText="No hay opciones"
                            onChange={(event, newValue: Tag) => {
                                const tag = newValue?.tag || ''
                                dispatch(setCategoria(tag))
                                setNewCategoria(newValue)
                            }}
                            onInputChange={(event, newInputValue) => {
                                setCategoriaInput(newInputValue)
                            }}
                            options={tags}
                            popupIcon={<KeyboardArrowDownIcon></KeyboardArrowDownIcon>}
                            renderInput={(params) => (
                                <TextFieldS
                                    {...params}
                                    autoComplete={id}
                                    id={id}
                                    inputProps={{
                                        id,
                                        ...params.inputProps,
                                        autoComplete: id, // disable autocomplete and autofill
                                        form: {
                                            autocomplete: id,
                                        },
                                    }}
                                    label="Categoría"
                                    name={id}
                                />
                            )}
                            renderOption={(props, option: Tag, state) => {
                                return (
                                    <li {...props} key={option?.tag}>
                                        <div>
                                            <p>{option?.name}</p>
                                        </div>
                                    </li>
                                )
                            }}
                            value={newCategoria}
                        ></StyledAutocomplete>
                    </FormControlS>
                    <FormControlS>
                        <StyledAutocomplete
                            getOptionLabel={(option: Provider) => option?.name}
                            inputValue={proveedorInput}
                            onChange={(event, newValue: Provider) => {
                                let provider = newValue?.provider || ''
                                setNewProveedor(newValue)
                                dtCasinoVendor(newValue?.name ? newValue?.name : 'sin titulo', section)
                                dispatch(setProveedor(provider))
                            }}
                            onInputChange={(event, newInputValue) => {
                                setProveedorInput(newInputValue)
                            }}
                            // options={computedData(providers) ?? []}
                            options={providers}
                            popupIcon={<KeyboardArrowDownIcon></KeyboardArrowDownIcon>}
                            renderInput={(params) => (
                                <TextFieldS
                                    {...params}
                                    autoComplete={id}
                                    id={id}
                                    inputProps={{
                                        id,
                                        ...params.inputProps,
                                        autoComplete: id, // disable autocomplete and autofill
                                        form: {
                                            autocomplete: id,
                                        },
                                    }}
                                    label="Proveedor"
                                    name={id}
                                />
                            )}
                            renderOption={(props, option: Provider) => {
                                return (
                                    <li {...props} key={option.provider}>
                                        <div>
                                            <p>{option.name}</p>
                                        </div>
                                    </li>
                                )
                            }}
                            value={newProveedor}
                        ></StyledAutocomplete>
                    </FormControlS>
                </FormFilterS>
            </FormSearchFilterS>
        </>
    )
}

const FormSearchFilterS = styled.form`
    & {
        display: flex;
        flex-direction: column;
        gap: 5px;
        ${MEDIA_QUERIES.min_width.tabletL} {
            flex-direction: row;
            > div {
                flex: 1;
            }
        }
    }
`
interface PropsStyled {
    $openFilterForm: boolean
}
const FormFilterS = styled.div<PropsStyled>`
    & {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 5px;
        max-height: 0px;
        transition: 200ms;
        > * {
            transition: 200ms;
        }
        > :nth-child(even) {
            transform: translateX(100%);
            opacity: 0;
        }
        > :nth-child(odd) {
            transform: translateX(-100%);
            opacity: 0;
        }
        ${(p) => {
            if (p.$openFilterForm) {
                return css`
                    max-height: 400px;
                    pointer-events: all;

                    > :nth-child(even),
                    > :nth-child(odd) {
                        transform: translateX(0%);
                        opacity: 1;
                    }
                `
            } else {
                return css`
                    max-height: 0;
                `
            }
        }}
        ${MEDIA_QUERIES.min_width.tabletL} {
            > :nth-child(even) {
                transform: translateX(0%);
                opacity: 1;
            }
            > :nth-child(odd) {
                transform: translateX(0%);
                opacity: 1;
            }
        }
    }
`
const TextFieldS = styled(TextField)`
    & {
        > label.MuiInputLabel-root.MuiInputLabel-formControl {
            transform: translate(14px, 11px) scale(1);
        }
        > label.MuiInputLabel-root.MuiInputLabel-formControl.Mui-focused,
        > label.MuiInputLabel-root.MuiInputLabel-formControl.MuiFormLabel-filled {
            transform: translate(14px, -9px) scale(0.75);
        }
        .MuiOutlinedInput-root.MuiInputBase-root {
            > input {
                padding-top: 0;
                padding-bottom: 0;
            }
        }
    }
`
const StyledAutocomplete = styled(Autocomplete)`
    & {
        position: relative;
        z-index: 9;
        flex: 1;
        .MuiOutlinedInput-root {
            padding: 11px !important;
        }

        ~ .MuiAutocomplete-popper {
            z-index: 999;
        }
    }
`
const ButtonFilterS = styled(Button)`
    & {
        min-width: 50px !important;
        max-width: 50px !important;
        box-shadow: none !important;
        :hover {
            box-shadow: none !important;
        }
    }
`
const FormAndFiltersContainerS = styled.div`
    & {
        display: flex;
        gap: 5px;
    }
`
const FormControlS = styled(FormControl)`
    & {
        background: white;
        flex: 1;
    }
`
