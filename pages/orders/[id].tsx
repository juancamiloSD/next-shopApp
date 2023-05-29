import { ShopLayout } from "@/components/layouts"
import { Box, Button, Card, CardContent, Chip, Divider, Grid, Link, Typography } from '@mui/material';
import { CartList } from '../../components/cart/CartList';
import { OrderSummary } from '../../components/cart/OrderSummary';
import NextLink from 'next/link';
import { CreditCardOffOutlined, CreditScoreOutlined } from "@mui/icons-material";

const OrderPage = () => {
  return (
    <ShopLayout title='Resumen de la orden 123456' pageDescription={'Resumen de la orden 123456'}>
        <Typography variant='h1' component='h1'>Orden: 123456</Typography>

        {/* <Chip
            sx={{ my: 2 }}
            label="Pendiente de pago"
            variant="outlined"
            color='error'
            icon={ <CreditCardOffOutlined/> }
        /> */}
        <Chip
            sx={{ my: 2 }}
            label="Orden ya fue pagada"
            variant="outlined"
            color='success'
            icon={ <CreditScoreOutlined/> }
        />

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
                                <h1>Pagar</h1>
                                <Chip
                                    sx={{ my: 2 }}
                                    label="Orden ya fue pagada"
                                    variant="outlined"
                                    color='success'
                                    icon={ <CreditScoreOutlined/> }
                                />
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </ShopLayout>
  )
}

export default OrderPage