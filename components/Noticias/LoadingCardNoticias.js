import { Skeleton, Stack } from '@mui/material'
import React from 'react'

const LoadingCardNoticias = () => {
    return (
        <Stack spacing={1}>
            <Skeleton variant="rounded" animation="pulse" height={200} sx={{ mt: 4 }} />
            {/* <Skeleton variant="rounded" animation="wave" height={30} />
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} /> */}
        </Stack>
    )
}

export default LoadingCardNoticias
