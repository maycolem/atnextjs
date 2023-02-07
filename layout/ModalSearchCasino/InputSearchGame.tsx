import { Autocomplete, Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useGetLobbyQuery } from 'states/calimaco/calimacoContentApi'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { PATHS } from 'routes/paths/PATHS'
import { debounce } from 'lodash'
import SearchIcon from '@mui/icons-material/Search'
import { useAppSelector } from '@states/store'
import { userSelector } from '@states/features/slices/userSlice'
import { Lobby, Provider } from '@interfaces/index'
import { GoogleTagManager } from 'google/TagManager'

interface Props {
    setSearchLobby: any
    lobbyName: string
    pathname: string
    section: string
}

interface Query {
    name: string
    providers: string
    tags: string
    favourites: boolean
    lobby: string
    op_date_init: string
    op_date_end: string
    init: number
    end: number
    session?: string
}

export const InputSearchGame = ({ pathname, lobbyName, section, setSearchLobby }: Props) => {
    const [inputSearch, setInputSearch] = useState('')
    const [search, setSearch] = useState(null)
    const id = Math.random().toString()

    return (
        <>
            <StyledAutocomplete
                freeSolo
                disableClearable
                disablePortal
                // getOptionLabel={(option: Lobby) => option?.name}
                inputValue={inputSearch}
                onChange={(event, newValue) => {
                    setSearch(newValue)
                }}
                onInputChange={(event, newInputValue) => {
                    setSearchLobby(newInputValue)
                    setInputSearch(newInputValue)
                }}
                options={[]}
                popupIcon={null}
                renderInput={(params) => (
                    <StyledTextSearch {...params}>
                        <StyledTextField
                            InputProps={{
                                autoComplete: 'off',
                            }}
                            {...params}
                            autoComplete={`name-apuestatotal-${id}`}
                            id={`name-apuestatotal-${id}`}
                            inputProps={{
                                type: 'text',
                                ...params.inputProps,
                                id: `name-apuestatotal-${id}`,
                                autoComplete: `name-apuestatotal-${id}`, // disable autocomplete and autofill
                            }}
                            label="Buscar juego"
                            name={`name-apuestatotal-${id}`}
                            type="text"
                        />
                        <Button variant="contained">
                            <SearchIcon></SearchIcon>
                        </Button>
                    </StyledTextSearch>
                )}
                value={search}
            ></StyledAutocomplete>
        </>
    )
}

const StyledTextField = styled(TextField)`
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
const StyledTextSearch = styled.div`
    & {
        display: flex;
        > .MuiFormControl-fullWidth.MuiTextField-root {
            width: initial;
            flex: 1;
        }
        > button {
            /* border-radius: initial; */
            border-bottom-left-radius: initial;
            border-top-left-radius: initial;
            box-shadow: none;
            position: absolute;
            right: 0;
            height: 100%;
            min-width: 50px;
            max-width: 50px;
            :hover {
                box-shadow: none;
            }
        }
    }
`
const StyledAutocomplete = styled(Autocomplete)`
    && {
        position: relative;
        z-index: 99;
        flex: 1;
        .MuiOutlinedInput-root {
            padding: 11px !important;
        }

        ~ .MuiAutocomplete-popper {
            z-index: 99 !important;
            .MuiAutocomplete-listbox {
                > li {
                    padding: 0 !important;
                }
            }
        }
    }
`
const StyledRenderOption = styled.div`
    & {
        padding: 1rem !important;
        display: flex;
        align-items: center;
        gap: 1rem;
        width: 100%;
        > .left {
            flex: 0 1 30%;
            max-width: 80px;
        }
        > .right {
            flex: 1 1 70%;
            display: flex;
            flex-direction: column;
            gap: 0.2rem;
            .accions {
                display: flex;
                justify-content: space-between;
                gap: 1rem;
            }
        }
    }
`
const StyledButton = styled(Button)`
    && {
        min-width: 120px;
        text-transform: initial;
        padding: 8px 12px;
        font-size: 12px;
    }
`
