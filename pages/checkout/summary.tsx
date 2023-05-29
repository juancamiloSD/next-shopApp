import { ShopLayout } from "@/components/layouts"
import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from '@mui/material';
import { CartList } from '../../components/cart/CartList';
import { OrderSummary } from '../../components/cart/OrderSummary';
import NextLink from 'next/link';

const SummaryPage = () => {
  return (
    <ShopLayout title='Resumen de la orden' pageDescription={'Resumen de la orden'}>
        <Typography variant='h1' component='h1'>Resumen de la orden</Typography>
        <Grid container sx={{ mt:3 }}>
            <Grid item xs={ 12 } sm={ 7 }>
                <CartList/>
            </Grid>
            <Grid item xs={ 12 } sm={ 5 }>
                <Card className="summary-card">
                    <CardContent>
                        <Typography variant='h2'>Resumen (3 productos)</Typography>
                        <Divider sx={{ my:1 }}/>
                        <Box display="flex" justifyContent='space-between'>
                            <Typography variant='subtitle1'>Dirección de la entrega</Typography>
                            <NextLink href="/checkout/address" legacyBehavior>
                                <Link underline='always'>
                                    Editar
                                </Link>
                            </NextLink>
                        </Box>
                        <Typography>Juan Salazar</Typography>
                        <Typography>Calle 14</Typography>
                        <Typography>Bochalema</Typography>
                        <Typography>Colombia</Typography>
                        <Typography>321</Typography>
                        <Divider sx={{ my:1 }}/>
                        <Box display="flex" justifyContent='space-between'>
                            <Typography variant='subtitle1'>Facturación</Typography>
                            <NextLink href="/cart" legacyBehavior>
                                <Link underline='always'>
                                    Editar
                                </Link>
                            </NextLink>
                        </Box>
                        <OrderSummary/>
                        <Box sx={{ mt:3 }}>
                            <Button color='secondary' className="circular-btn" fullWidth>
                                Confirmar orden
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </ShopLayout>
  )
}

export default SummaryPage