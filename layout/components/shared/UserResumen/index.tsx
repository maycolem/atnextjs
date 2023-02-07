import React from 'react'
import { userSelector } from 'states/features/slices/userSlice'
import AvatarInfo from './AvatarInfo'
import Balance from './Balance'
import styled from 'styled-components'
import { Accordion, AccordionDetails, AccordionSummary, useMediaQuery } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { MEDIA_QUERIES } from 'styles/MEDIA_QUERIES'
import BalanceDetalle from './BalanceDetalle'
import { useAppSelector } from '@states/store'

const UserResumen = () => {
    const user = useAppSelector(userSelector)
    const desktopS = useMediaQuery(MEDIA_QUERIES.min_width.desktopS)
    const [expanded, setExpanded] = React.useState<string>('')

    const handleChangeAccordion = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false)
    }

    return (
        <Styled>
            {desktopS && <AvatarInfo fullName={`${user?.firstName} ${user?.lastName}`} id={user?.user} src={user?.image} />}
            {desktopS && <DivierS></DivierS>}
            {desktopS && (
                <div className="">
                    <AccordionS>
                        <AccordionSummaryDesktop>
                            <div className="balanceS">
                                <Balance />
                            </div>
                            <div className="bottonBono">
                                Total Bonos{' '}
                                {Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(user?.totalBonus / 100)}{' '}
                                <KeyboardArrowDownIcon />
                            </div>
                        </AccordionSummaryDesktop>
                        <BalanceDetalle />
                    </AccordionS>
                </div>
            )}
            {!desktopS && (
                <AccordionS
                    expanded={expanded === 'panel1'}
                    onChange={handleChangeAccordion('panel1')}
                    onClick={(e) => {
                        const node = e.target as Node
                        const buttonCopy = document.getElementById('button-copy-id-user')
                        if (buttonCopy && buttonCopy.contains(node)) {
                            setExpanded(expanded)
                        }
                    }}
                >
                    <AccordionSummaryS
                        aria-controls="panel1a-content"
                        expandIcon={<KeyboardArrowDownIcon></KeyboardArrowDownIcon>}
                        id="panel1a-header"
                    >
                        <AvatarInfo fullName={`${user?.firstName} ${user?.lastName}`} id={user?.user} src={user?.image} withoutIMG />
                    </AccordionSummaryS>
                    <AccordionDetailsS>
                        <Balance />
                        <BalanceDetalle />
                    </AccordionDetailsS>
                </AccordionS>
            )}
        </Styled>
    )
}

export default UserResumen
const DivierS = styled.div`
    & {
        /* margin-top: 1rem; */
        margin-top: 1rem;
        background: ${(p) => p.theme.palette.alternate8.main};
        height: 1px;
        width: 90%;
        margin-left: auto;
        margin-right: auto;
    }
`
const Styled = styled.div`
    display: flex;
    flex-direction: column;
    /* gap: 1rem; */
    ${MEDIA_QUERIES.min_width.desktopS} {
        /* padding-top: calc(1rem + 3vh); */
    }
`
const AccordionDetailsS = styled(AccordionDetails)`
    & {
        padding: 1rem 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        max-width: 450px;
        margin: auto !important;
    }
`
const AccordionS = styled(Accordion)`
    && {
        box-shadow: none;
        ::before {
            content: none;
        }
    }
`
const AccordionSummaryS = styled(AccordionSummary)`
    & {
        min-height: 60px !important;
        padding: 0;
        padding: 1rem 0;
        padding-right: 8px;
        &:hover {
            background: ${(p) => p.theme.palette.linkPink.main};
        }
        .MuiAccordionSummary-content {
            justify-content: center;
            margin: 0 !important;
            color: ${(p) => p.theme.palette.primary.main};
            padding-left: 3rem;
        }
        .MuiAccordionSummary-expandIconWrapper {
            .MuiSvgIcon-root {
                font-size: 3rem;
                color: ${(p) => p.theme.palette.primary.main};
            }
        }
    }
`

const AccordionSummaryDesktop = styled(AccordionSummary)`
    & {
        padding: 1rem !important;
        height: initial !important;
        &:hover {
            background: ${(p) => p.theme.palette.linkPink.main};
        }
        .MuiAccordionSummary-content {
            flex: initial;
            justify-content: center;
            margin: 0 !important;
            color: ${(p) => p.theme.palette.primary.main};
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .MuiAccordionSummary-expandIconWrapper {
            margin-left: 1rem;
            .MuiSvgIcon-root {
                font-size: 3rem;
            }
        }
        .bottonBono {
            /* position: absolute;
      bottom: 0px; */
            display: flex;
            align-items: center;
        }
        .balanceS {
            /* padding-bottom: 30px; */
            white-space: nowrap;
        }
    }
`
