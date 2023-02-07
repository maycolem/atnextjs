const { default: styled } = require('styled-components')
const { MEDIA_QUERIES } = require('styles/MEDIA_QUERIES')

const styles = () => {
    return {
        Page: styled.div`
            position: relative;
            right: 14px;
            width: calc(100% + 28px);
            padding: 14px 0;
            background: white;
            ${MEDIA_QUERIES.min_width.desktopS} {
                width: calc(100% + 100px);
                right: 50px;
            }
        `,
        Wrapper: styled.div`
            width: 100%;
            max-width: 1200px;
            margin: auto;
            ${MEDIA_QUERIES.min_width.tabletL} {
                max-width: calc(1200px + 28px);
                padding: 0 14px;
            }
        `,
    }
}

export default styles
