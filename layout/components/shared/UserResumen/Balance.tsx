import { userSelector } from '@states/features/slices/userSlice'
import { useAppSelector } from '@states/store'
import styled from 'styled-components'

const Balance = () => {
    const user = useAppSelector(userSelector)

    return (
        <Styled>
            <div>
                <span>Saldo Total</span>
                <span>{Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(user?.totalAmount / 100)}</span>
            </div>
            <div>
                <span>Saldo Retirable</span>
                <span>{Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(user?.saldoRetirable / 100)}</span>
            </div>
        </Styled>
    )
}

export default Balance
const Styled = styled.div`
    display: flex;
    justify-content: space-around;
    gap: 0.2rem;
    width: 100%;

    & {
        div {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            // background: ${(p) => p.theme.palette.alternate12.main};
            padding: 0.7rem 1.4rem;
            gap: 0.2rem;
            width: 100%;
            span {
                color: #828282;
                font-weight: 400;
                text-align: center;
            }
            span:nth-of-type(2) {
                font-weight: 600;
                color: #595959;
            }
        }
    }
`
