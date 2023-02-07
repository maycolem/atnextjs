import styled from '@emotion/styled'
import { IconButton, Modal } from '@mui/material'
import PaymentMethods from 'components/recarga/PaymentMethods'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setOpen } from 'states/features/slices/LoginModalSlice'
import { userSelector } from 'states/features/slices/userSlice'
import { close, ModalRechargeSelector } from 'states/slice/ModalRecharge'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import CloseIcon from '@mui/icons-material/Close'
import Grid from '@mui/material/Grid'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import useGetWidthScrollBar from 'hooks/useGetWidthScrollBar'

const ModalRecharge = () => {
    const user = useSelector(userSelector)
    const { isOpen } = useSelector(ModalRechargeSelector)
    const dispatch = useDispatch()
    const { scrollBardWidth } = useGetWidthScrollBar()
    if (!user) {
        dispatch(setOpen())
        dispatch(close())
        return null
    }
    if (user) {
        return (
            <ModalS onClose={() => dispatch(close())} open={isOpen} scrollBardWidth={scrollBardWidth}>
                <ModalContentS>
                    <div className="close-modal">
                        <div className="closeS">
                            <IconButton onClick={() => dispatch(close())}>
                                <CloseIcon className="closeS2"></CloseIcon>
                            </IconButton>
                        </div>
                    </div>
                    <div></div>
                    <div className="BodyModalS">
                        <PaymentMethods />
                    </div>
                </ModalContentS>
            </ModalS>
        )
    }
}

export default ModalRecharge
const ModalS = styled(Modal)`
    & {
        z-index: 9999;
        overflow: auto;
        display: flex;
        align-items: center;
        font-size: 13px;
        padding-left: 1rem;
        padding-right: 1rem;
    }
`
const ModalContentS = styled.div`
    outline: none;
    background: #fafafa;
    position: relative;
    z-index: 1;
    height: auto;

    /* overflow: auto; */
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .closeS {
        background: #ec3323;
    }
    .closeS2 {
        color: #ffffff;
    }
    .iconS {
        text-align: right;
        padding-top: 25px;
    }

    .TituloModalS {
        padding: 20px 0px 30px 0px;
        color: #5a5a5a;
        font-size: 12px;
        line-height: 16px;
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 400;
    }
    .BodyModalS {
        padding: 0px 30px 30px 30px;
    }

    .subtitS {
        padding: 20px 0px 30px 0px;
        color: #5a5a5a;
        font-size: 12px;
        line-height: 16px;
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 700;
    }
    .subtitS2 {
        padding: 20px 0px 30px 0px;
        color: #ff0000;
        font-size: 12px;
        line-height: 16px;
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 400;
        text-decoration: underline;
    }

    ${MEDIA_QUERIES.min_width.tabletS} {
        width: 80%;
        max-width: 697px;
        outline: none;
        background: #fafafa;
        position: relative;
        z-index: 1;
        height: auto;

        /* overflow: auto; */
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .closeS {
            background: #ec3323;
        }
        .closeS2 {
            color: #ffffff;
        }
        .iconS {
            text-align: right;
            padding-top: 25px;
        }

        .TituloModalS {
            padding: 20px 0px 30px 0px;
            color: #5a5a5a;
            font-size: 12px;
            line-height: 16px;
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 400;
        }
        .BodyModalS {
            padding: 0px 30px 30px 30px;
        }

        .subtitS {
            padding: 20px 0px 30px 0px;
            color: #5a5a5a;
            font-size: 12px;
            line-height: 16px;
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 700;
        }
        .subtitS2 {
            padding: 20px 0px 30px 0px;
            color: #ff0000;
            font-size: 12px;
            line-height: 16px;
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 400;
            text-decoration: underline;
        }
    }
    ${MEDIA_QUERIES.min_width.tabletL} {
        width: 60%;
        max-width: 700px;

        outline: none;
        background: #fafafa;
        position: relative;
        z-index: 1;
        height: auto;

        /* overflow: auto; */
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .closeS {
            background: #ec3323;
        }
        .closeS2 {
            color: #ffffff;
        }
        .iconS {
            text-align: right;
            padding-top: 25px;
        }

        .TituloModalS {
            padding: 20px 0px 30px 0px;
            color: #5a5a5a;
            font-size: 12px;
            line-height: 16px;
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 400;
        }
        .BodyModalS {
            padding: 0px 40px 30px 40px;
        }

        .subtitS {
            padding: 20px 0px 30px 0px;
            color: #5a5a5a;
            font-size: 12px;
            line-height: 16px;
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 700;
        }
        .subtitS2 {
            padding: 20px 0px 30px 0px;
            color: #ff0000;
            font-size: 12px;
            line-height: 16px;
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 400;
            text-decoration: underline;
        }
    }
    ${MEDIA_QUERIES.min_width.desktopXS} {
        width: 60%;
        max-width: 700px;

        outline: none;
        background: #fafafa;
        position: relative;
        z-index: 1;
        height: auto;

        /* overflow: auto; */

        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .closeS {
            background: #ec3323;
        }
        .closeS2 {
            color: #ffffff;
        }
        .iconS {
            text-align: right;
            padding-top: 25px;
        }

        .TituloModalS {
            padding: 20px 0px 30px 0px;
            color: #5a5a5a;
            font-size: 12px;
            line-height: 16px;
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 400;
        }
        .BodyModalS {
            padding: 0px 30px 30px 30px;
        }

        .subtitS {
            padding: 20px 0px 30px 0px;
            color: #5a5a5a;
            font-size: 12px;
            line-height: 16px;
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 700;
        }
        .subtitS2 {
            padding: 20px 0px 30px 0px;
            color: #ff0000;
            font-size: 12px;
            line-height: 16px;
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 400;
            text-decoration: underline;
        }
    }
    & {
        .close-modal {
            width: 100%;
            display: flex;
            justify-content: flex-end;
            margin-bottom: 10px;
            border: 1px solid #c2c2c2;

            svg {
                cursor: pointer;
                font-size: 30px;
            }
        }
    }
`
