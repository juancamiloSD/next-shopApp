import { CartContext } from '@/context';
import { currency } from '@/utils';
import { Grid, Typography } from '@mui/material';
import { useContext } from 'react';


export const OrderSummary = () => {

    const { numberOfItems, subTotal, total, taxRate } = useContext(CartContext)

  return (
    <Grid container>
        <Grid item xs={ 6 }>
            <Typography>
                No hay productos
            </Typography>
        </Grid>
        <Grid item xs={ 6 } display='flex' justifyContent='end'>
            <Typography>
                { numberOfItems } { numberOfItems > 1 ? 'items': 'item' }
            </Typography>
        </Grid>
        <Grid item xs={ 6 }>
            <Typography>
                Subutotal
            </Typography>
        </Grid>
        <Grid item xs={ 6 } display='flex' justifyContent='end'>
            <Typography>
                { currency.format(subTotal) }
            </Typography>
        </Grid>
        <Grid item xs={ 6 }>
            <Typography>
                Impuestos { Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100 }%
            </Typography>
        </Grid>
        <Grid item xs={ 6 } display='flex' justifyContent='end'>
            <Typography>
                { currency.format(taxRate) }
            </Typography>
        </Grid>
        <Grid item xs={ 6 } sx={{ mt:2 }}>
            <Typography variant='subtitle1'>
                Total:
            </Typography>
        </Grid>
        <Grid item xs={ 6 } sx={{ mt:2 }}  display='flex' justifyContent='end'>
            <Typography variant='subtitle1'>
                { currency.format(total) }
            </Typography>
        </Grid>
    </Grid>
  )
}
