import { ShopLayout } from "@/components/layouts"
import { Box, Typography } from '@mui/material';

const Custom404 = () => {
  return (
    <ShopLayout title='Página no encontrada' pageDescription="No existe la página">
        <Box display='flex' justifyContent='center' alignItems='center' height='calc(100vh - 200px)'>
            <Typography variant="h1" component='h1' fontWeight={200} sx={{ fontSize: { xs: '30px', sm: '40px', md: '60px' } }}>
                404 | 
            </Typography>
            <Typography marginLeft={2}>
                No encontramos ninguna página
            </Typography>
        </Box>
    </ShopLayout>
  )
}

export default Custom404