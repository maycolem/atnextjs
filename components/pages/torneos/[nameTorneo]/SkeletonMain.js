import React from 'react'
import styled from 'styled-components'
import { Skeleton } from '@mui/material'
import styles from './styles/styles'

const SkeletonMain = () => {
    return (
        <Styled.Torneo>
            <Skeleton animation="wave" height={200} variant="rounded"></Skeleton>
            <Skeleton animation="wave" height={40} variant="rounded"></Skeleton>
            <Styled.Details>
                <Skeleton animation="wave" height={40} variant="rounded"></Skeleton>
                <Skeleton animation="wave" height={40} variant="rounded"></Skeleton>
                <Skeleton animation="wave" height={40} variant="rounded"></Skeleton>
                <Skeleton animation="wave" height={40} variant="rounded"></Skeleton>
                <Skeleton animation="wave" height={40} variant="rounded"></Skeleton>
            </Styled.Details>
            <Skeleton animation="wave" height={40} variant="rounded"></Skeleton>
            <Skeleton animation="wave" height={30} variant="rounded"></Skeleton>
            <Skeleton animation="wave" height={30} variant="rounded"></Skeleton>
            <Skeleton animation="wave" height={100} variant="rounded"></Skeleton>
            <Skeleton animation="wave" height={100} variant="rounded"></Skeleton>
        </Styled.Torneo>
    )
}

export default SkeletonMain

const Styled = styles()
