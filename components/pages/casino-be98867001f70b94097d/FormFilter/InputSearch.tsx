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
import { dtCasinoSearch } from '../dt'
import { Lobby, Provider } from '@interfaces/index'
import { GoogleTagManager } from 'google/TagManager'

interface Props {
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

export const InputSearch = ({ pathname, lobbyName, section }: Props) => {
    const size = 35
    const [inputSearch, setInputSearch] = useState('')
    const [search, setSearch] = useState(null)
    const router = useRouter()
    const id = Math.random().toString()
    const [skip, setSkip] = useState<boolean>(true)
    const user = useAppSelector(userSelector)
    const [lobby, setLobby] = useState<Lobby[]>([])
    const [providers, setProviders] = useState<Provider[]>([])
    const defaultQuery = {
        end: size,
        favourites: false,
        lobby: lobbyName,
        init: 0,
        name: '',
        providers: '',
        tags: '',
        op_date_init: '',
        op_date_end: '',
        session: user ? user.session : undefined,
    }
    const [query, setQuery] = useState<Query>(defaultQuery)
    const { data, isFetching, isLoading } = useGetLobbyQuery(query, {
        skip,
    })

    useEffect(() => {
        if (data) {
            if ('providers' in data) {
                if (providers.length < 1) {
                    setProviders(data.providers)
                }
            }
            if ('lobby' in data) {
                setLobby(data.lobby)
            }
        }
    }, [data])

    const debouncedSearch = React.useRef(
        debounce(async (inputSearch: string) => {
            setQuery({ ...query, name: inputSearch })
        }, 1000)
    ).current

    useEffect(() => {
        if (inputSearch) {
            if (inputSearch.length >= 3) {
                debouncedSearch(inputSearch)
                setSkip(false)
            }
        }
    }, [inputSearch])

    useEffect(() => {
        return () => {
            debouncedSearch.cancel()
        }
    }, [debouncedSearch])

    const handleOnClick = async (provider: string, gameName: string) => {
        GoogleTagManager.push({
            event: 'atm.event',
            eventName: `${section}_search`,
            game_name: gameName.toLowerCase().replace(/!/g, ''),
            option: 'jugar',
            action: 'search',
        })
        await router.push({
            pathname,
            query: {
                provider,
                gameName,
            },
        })
    }

    return (
        <>
            <StyledAutocomplete
                disablePortal
                getOptionLabel={(option: Lobby) => option?.name}
                inputValue={inputSearch}
                loading={isLoading || isFetching}
                loadingText="Cargando..."
                onChange={(event, newValue) => {
                    setSearch(newValue)
                    // dtCasinoSearch(inputSearch)
                }}
                onFocus={() => {
                    const banner = document.getElementById('casino-banner')
                    const clear = setTimeout(() => {
                        window?.scrollTo({
                            top: banner.offsetHeight - 10,
                            // behavior: 'smooth',
                        })
                        clearTimeout(clear)
                    }, 100)
                }}
                onInputChange={(event, newInputValue) => {
                    setInputSearch(newInputValue)
                    dtCasinoSearch(inputSearch, section)
                }}
                options={lobby}
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
                renderOption={(props, option: Lobby) => {
                    return (
                        <li {...props} key={`${option?.machine}${option?.name}`}>
                            <StyledRenderOption>
                                <div className="left">
                                    <img alt="" src={`${process.env.REACT_APP_WEB_BASE}/${option?.logo}`} />
                                </div>
                                <div className="right">
                                    <p>{option?.name}</p>
                                    <div className="accions">
                                        <StyledButton
                                            onClick={() => handleOnClick(option?.sub_provider, option?.web_name)}
                                            variant="contained"
                                        >
                                            Jugar
                                        </StyledButton>
                                    </div>
                                </div>
                            </StyledRenderOption>
                        </li>
                    )
                }}
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
