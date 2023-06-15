import { ShopLayout } from "@/components/layouts"
import { Box, Button, Card, CardContent, Chip, Divider, Grid, Link, Typography } from '@mui/material';
import { CartList } from '../../components/cart/CartList';
import { OrderSummary } from '../../components/cart/OrderSummary';
import NextLink from 'next/link';
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/context";
import { countries } from "@/utils";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const SummaryPage = () => {

    const router = useRouter()
    const { shippingAddress, numberOfItems, createOrder } = useContext(CartContext)

    const [isPosting, setIsPosting] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
      if( !Cookies.get('firstName') ){
        router.push('/checkout/address')
      }
    }, [router])
    
    const onCreateOrder = () => {
        createOrder()
        // setIsPosting(true)
        // const { hasError, message } = await createOrder()
        // if( hasError ){
        //     setIsPosting(false)
        //     setErrorMessage(message)
        //     return
        // }
        // router.replace(`/orders/${message}`)
    }

    if( !shippingAddress ){
            return <></>
    }

    const { firstName, lastName, address, city, country, zip, phone } = shippingAddress

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
                            <Typography variant='h2'>Resumen ({ numberOfItems } {numberOfItems === 1 ? 'producto' : 'productos'})</Typography>
                            <Divider sx={{ my:1 }}/>
                            <Box display="flex" justifyContent='space-between'>
                                <Typography variant='subtitle1'>Dirección de la entrega</Typography>
                                <NextLink href="/checkout/address" legacyBehavior>
                                    <Link underline='always'>
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>
                            <Typography>{ firstName } { lastName }</Typography>
                            <Typography>{ address }</Typography>
                            <Typography>{ city } - { zip }</Typography>
                            {/* <Typography>{ countries.find(c => c.code === country)?.name }</Typography> */}
                            <Typography>{ country }</Typography>
                            <Typography>{ phone }</Typography>
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
                            <Box sx={{ mt:3 }} display='flex' flexDirection='column'>
                                <Button 
                                    onClick={ onCreateOrder }
                                    // disabled={ isPosting }
                                    color='secondary' 
                                    className="circular-btn" 
                                    fullWidth
                                >
                                    Confirmar orden
                                </Button>
                                <Chip
                                    color='error'
                                    label={ errorMessage }
                                    sx={{ display: errorMessage ? 'flex' : 'none', mt: 2 }}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

export default SummaryPage