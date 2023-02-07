import { currencyAT } from '@helpers/currency'
import { userSelector } from '@states/features/slices/userSlice'
import { useAppSelector } from '@states/store'
import React from 'react'
import styled from 'styled-components'

export const Balance = () => {
    const user = useAppSelector(userSelector)

    return (
        <Styled>
            <div>
                <span>Balance Actual</span>
                <span>{currencyAT(user?.totalAmount / 100)}</span>
            </div>
            <div>
                <span>Balance Retirable</span>
                <span>{currencyAT(user?.saldoRetirable / 100)}</span>
            </div>
        </Styled>
    )
}

const Styled = styled.div`
    display: flex;
    justify-content: space-around;
    & {
        div {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: ${(p: any) => p.theme.palette.alternate14.main};
            border-bottom: 1px solid #d9d9d9;
            padding: 0.7rem 1.4rem;
            box-shadow: rgba(149, 157, 165, 0.1) 0px 1px 2px;
            span {
                color: #828282;
                font-weight: 400;
                font-size: 0.8rem;
            }
            span:nth-of-type(2) {
                font-weight: 600;
                color: #595959;
                font-size: 1rem;
            }
        }
    }
`
