// import styles from '../../styles/Home.module.css'
import { useGetFragmentQuery } from 'states/calimaco/calimacoContentApi'
import FragmentCustomAT from 'components/shared/fragment-custom-at/FragmentCustomAT'
import styled from 'styled-components'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import { Meta } from '@components/Meta'

const Index = () => {
    const { data } = useGetFragmentQuery({
        fragment: 'SEC_ACERCA_DE_APUESTA_TOTAL',
    })

    return (
        <>
            <Meta
                title="Acerca de apuesta total"
                description="Descubre toda la información sobre Apuesta Total y conoce más sobre nuestra empresa."
            />

            <Styled>
                <FragmentCustomAT fragment={data ?? ''}></FragmentCustomAT>
            </Styled>
        </>
    )
}

export default Index

const Styled = styled.div`
    padding-top: 1rem;
    padding-bottom: 1rem;
    display: flex;
    position: relative;
    justify-content: center;
    background: ${(p) => p.theme.background};
    width: calc(100% + 28px);
    right: 14px;
    padding: 1rem;
    ${MEDIA_QUERIES.min_width.desktopS} {
        width: calc(100% + 100px);
        right: 50px;
    }
`
