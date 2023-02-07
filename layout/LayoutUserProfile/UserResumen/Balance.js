import styled from 'styled-components'
import React from 'react'

const Balance = ({ total, retirable }) => {
    return (
        <Styled>
            <div>
                <span>Saldo total</span>
                <span>{total}</span>
            </div>
            <div>
                <span>Saldo retirable</span>
                <span>{retirable}</span>
            </div>
        </Styled>
    )
}

export default Balance
const Styled = styled.div`
    display: flex;
    justify-content: space-around;
    & {
        div {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            span {
                color: #828282;
                font-weight: 400;
            }
            span:nth-of-type(2) {
                font-weight: 600;
                color: #595959;
            }
        }
    }
`
