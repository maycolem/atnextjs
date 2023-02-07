const { default: styled } = require('styled-components')

const styles = () => {
    return {
        Torneo: styled.div`
            padding: 1.2rem 0;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            max-width: 1100px;
            margin: auto;
            width: 100%;
        `,
        Details: styled.div`
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
            > div {
                grid-column: span 2;
            }
        `,
    }
}

export default styles
