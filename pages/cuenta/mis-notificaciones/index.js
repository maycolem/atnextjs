import React from 'react'
import MisNotificaciones from 'components/MisNotificaciones/MisNotificaciones'
import styled from 'styled-components'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import Head from 'next/head'

const Notificaciones = () => {
    return (
        <>
            <Head>
                <title>Mis Notificaciones | Apuesta Total</title>
            </Head>

            <FormS></FormS>
            <MisNotificaciones></MisNotificaciones>
        </>
    )
}

export default Notificaciones

const FormS = styled.form`
    & {
        padding: 2rem 1rem;

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

    .Contenedor {
        display: grid;
        grid-template-columns: auto;
        gap: 1rem;
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
        font-weight: 600;
        font-size: 1.1rem;
        line-height: 16px;
        display: flex;
        align-items: center;
        color: #6e6e73;
    }
    .TextTitulo {
        font-weight: 400;
        font-size: 1.1rem;
        line-height: 16px;
        display: flex;
        align-items: center;
        color: #6e6e73;
        padding-top: 20px;
    }
    .TextContent2 {
        font-weight: 600;
        font-size: 14px;
        line-height: 16px;
        display: flex;
        align-items: center;
        color: #6e6e73;
    }
    ${MEDIA_QUERIES.min_width.tabletS} {
        & {
            padding: 0px;
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
        .Contenedor {
            display: grid;
            grid-template-columns: auto;
            gap: 1rem;
            padding: 1.2rem;
        }
        .Contenedor1 {
            display: grid;
            grid-template-columns: auto auto auto auto;
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
            font-weight: 600;
            font-size: 1.1rem;
            line-height: 16px;
            display: flex;
            align-items: center;
            color: #6e6e73;
        }
        .TextTitulo {
            font-weight: 400;
            font-size: 1.1rem;
            line-height: 16px;
            display: flex;
            align-items: center;
            color: #6e6e73;
            padding-top: 20px;
        }
        .TextContent2 {
            font-weight: 600;
            font-size: 14px;
            line-height: 16px;
            display: flex;
            align-items: center;
            color: #6e6e73;
        }
    }
`
