import styled from '@emotion/styled'
import React from 'react'
import { FONTS_SIZE } from 'styles/FONTS_SIZE'
import { LoadingButton } from '@mui/lab'
import { PATHS } from 'routes/paths/PATHS'
import Link from 'next/link'
import { useSelect } from '@mui/base'
import { useSelector } from 'react-redux'
import { userSelector } from 'states/features/slices/userSlice'
import hexAlpha from 'hex-alpha'
import AvatarInfo from './AvatarInfo'
import Balance from './Balance'
import Bonos from './Bonos'
const UserResumen = () => {
    const user = useSelector(userSelector)
    return (
        <ResumenS>
            <AvatarInfo fullName={`${user?.firstName} ${user?.lastName}`} id={user?.user} src={user?.image} />
            <Balance
                retirable={Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(4343.0 / 100)}
                total={Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(user?.totalAmount / 100)}
            />
            <Bonos
                casino={Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(3211 / 100)}
                deportivas={Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(3233 / 100)}
                totalBonos={Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(3233 / 100)}
            />
        </ResumenS>
    )
}

export default UserResumen
const ButotnsS = styled.div`
    & {
        display: flex;
        align-items: center;
        gap: 0.8rem;
        width: 100%;
        margin-top: 1.2rem;
    }
`
const ResumenS = styled.div`
    & {
        .top {
            padding-top: 4em;
            padding-bottom: 4em;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            .name {
                font-family: 'Rubik';
                font-style: normal;
                font-weight: 700;
                font-size: 1.3em;
                color: #595959;
                display: block;
                text-transform: capitalize;
            }
            .id {
                font-family: 'Rubik';
                font-style: normal;
                font-weight: 400;
                font-size: 1em;
                /* line-height: 16px; */
                color: #969696;
            }
        }
        .bottom {
            border: 1px solid ${(p) => hexAlpha(p.theme.palette.alternate4.dark, 0.3)};
            background: #f2f2f2;
            border-radius: 4px;
            padding: 1.1rem;
            padding-top: 3.8rem;
            padding-top: 3rem;
            display: flex;
            flex-direction: column;
            gap: 1.1rem;
            align-items: center;
            .text-total {
                font-family: 'Rubik';
                font-style: normal;
                font-weight: 400;
                font-size: 0.8em;
                color: #828282;
            }
            .total {
                font-family: 'Rubik';
                font-style: normal;
                font-weight: 500;
                color: #595959;
                font-size: 1.3em;
            }
            .total-detail {
                font-family: 'Rubik';
                font-style: normal;
                font-weight: 700;
                font-size: 0.8em;

                color: #828282;
                .bono {
                    color: #969696;
                    font-weight: 400;
                }
            }
        }
    }
`
const ButtonChargeS = styled(LoadingButton)`
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 400;
    font-size: 0.9em;
    letter-spacing: 0.01rem;
    /* background: #ffc700; */
    border-radius: 4px;
    /* padding: 7px 21px; */
    padding: 1.1em;
    cursor: pointer;

    flex: 1;
    text-align: center;
    & {
        &.retirar {
            /* background: #dedede; */
            color: #828282;
        }
    }
`
