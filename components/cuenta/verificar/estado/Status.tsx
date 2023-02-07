import React, { useEffect, useState } from 'react'
import { Step, StepLabel, Stepper } from '@mui/material'
import styled, { css } from 'styled-components'

interface Props {
    status: string
}
interface Steps {
    label: string
    keys: Array<any>
}
const INITIAL_STEPS: Steps[] = [
    {
        label: 'Iniciada',
        keys: [],
    },
    { label: 'En proceso', keys: ['REVISING', 'PENDING'] },
    {
        label: 'Verificado',
        keys: ['EXPIRED', 'DENIED', 'APPROVED'],
    },
]
const Status = ({ status = '' }: Props) => {
    const [errorSteps, setErrorSteps] = useState(false)
    const [steps, setSteps] = useState<Steps[]>(INITIAL_STEPS)
    const initSteps = () => {
        if (status === 'DENIED') {
            setErrorSteps(true)
            setSteps([
                {
                    label: 'Iniciada',
                    keys: [],
                },
                { label: 'En proceso', keys: ['REVISING', 'PENDING'] },
                {
                    label: 'Verificación rechazada',
                    keys: ['EXPIRED', 'DENIED'],
                },
            ])
        }
        if (['REVISING', 'PENDING'].includes(status)) {
            setErrorSteps(false)
            setSteps(INITIAL_STEPS)
        }
    }
    useEffect(() => {
        initSteps()
    }, [status])

    const findStatus = (steps: Steps[]) => {
        if (steps && steps.length > 0) {
            const index = steps.findIndex((step) => step.keys.includes(status as never))
            if (index < 1) {
                return 0
            } else {
                return index
            }
        }
    }

    return (
        <WrapperSteps>
            <StepperS $errorSteps={errorSteps} activeStep={findStatus(steps)} alternativeLabel>
                {steps.map((label, i) => (
                    <Step key={i}>
                        <StepLabel>{label.label}</StepLabel>
                    </Step>
                ))}
            </StepperS>
        </WrapperSteps>
    )
}

export default Status
const WrapperSteps = styled.div`
    & {
        padding: 1rem;
    }
`

interface PropsStyled {
    activeStep: number
    $errorSteps: boolean
}

const StepperS = styled(Stepper)<PropsStyled>`
    & {
        background: white;
        padding: 2rem 1rem;
        border: 1px solid ${(p) => p.theme.palette.alternate8.main};
        .MuiSvgIcon-root {
            font-size: 1.8rem;
            &.Mui-active,
            &.Mui-completed {
                color: ${(p) => p.theme.palette.success2.main};
            }
            > text {
                font-size: 1rem;
            }
        }
        .MuiStepLabel-label {
            font-size: 1rem;
        }
    }
    & {
        ${(p) => {
            if (p.$errorSteps) {
                return css`
                    .MuiSvgIcon-root {
                        font-size: 1.8rem;
                        &.Mui-active,
                        &.Mui-completed {
                            color: ${(p) => p.theme.palette.alternate13.main};
                            opacity: 0.5;
                        }
                        > text {
                            font-size: 1rem;
                        }
                    }
                    .MuiStepLabel-label {
                        font-size: 1rem;
                        color: ${(p) => p.theme.palette.alternate13.main};
                        opacity: 0.5;
                    }

                    .Mui-active {
                        color: ${(p) => p.theme.palette.primary.main};
                        opacity: 1;
                        &.MuiSvgIcon-root {
                            color: ${(p) => p.theme.palette.primary.main};
                            opacity: 1;
                        }
                    }
                `
            }
        }}
    }
`
