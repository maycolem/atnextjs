import React, { useEffect, useState } from 'react'
import { Autocomplete, Button, FormControl, TextField, useMediaQuery } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import styled, { createGlobalStyle, css } from 'styled-components'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import { useGetTagsQuery } from 'states/calimaco/calimacoContentApi'
import { setCategoria, setProveedor } from 'states/slice/casino/CasinoLobbies'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'
import Head from 'next/head'
import { useAppDispatch, useAppSelector } from '@states/store'
import { Provider } from '@interfaces/index'
import { casinoModalSelector } from '@states/features/slices/CasinoModalSlice'
import { InputSearchGame } from './InputSearchGame'

interface Tag {
    tag: string
    name: string
}
interface Props {
    setSearchLobby: any
    providers: Provider[]
    filterTags: string[]
    lobbyName: string
    pathname: string
    section: string
}

export const FormSearchGame = ({ providers, filterTags, lobbyName, pathname, section, setSearchLobby }: Props) => {
    const { open } = useAppSelector(casinoModalSelector)
    const { data } = useGetTagsQuery(null)
    const [tags, setTags] = useState<Tag[]>([])
    const [categoriaInput, setCategoriaInput] = useState('')
    const [newCategoria, setNewCategoria] = useState(null)
    const [proveedorInput, setProveedorInput] = useState('')
    const [newProveedor, setNewProveedor] = useState(null)
    const dispatch = useAppDispatch()
    const id = Math.random().toString()
    const [openFilterForm, setOpenFilterForm] = useState(false)

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
            <FormSearchGameS autoComplete="off" id="FormSearchGameS" method="post" onSubmit={(e) => e.preventDefault()}>
                <FormContainerS id="FormContainerS">
                    <FormControlS>
                        <InputSearchGame pathname={pathname} lobbyName={lobbyName} section={section} setSearchLobby={setSearchLobby} />
                    </FormControlS>
                </FormContainerS>
            </FormSearchGameS>
        </>
    )
}

const FormSearchGameS = styled.form`
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
const FormContainerS = styled.div`
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
