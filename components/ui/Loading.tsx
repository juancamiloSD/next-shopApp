import { Box, CircularProgress, Typography } from '@mui/material';

export const Loading = () => {
  return (
    <Box 
        display='flex' 
        justifyContent='center' 
        alignItems='center' 
        flexDirection='column'
        height='calc(100vh - 200px)'>
        <CircularProgress thickness={ 2 }/>
    </Box>
  )
}
