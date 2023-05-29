import { ShopLayout } from '@/components/layouts'
import type { NextPage } from 'next'
import { Typography } from '@mui/material';
import { ProductList } from '@/components/products';
import { useProducts } from '@/hooks';
import { Loading } from '@/components/ui';



const MenPage: NextPage = () => {

  const { products, isLoading } = useProducts('products?gender=men')

  return (
    <ShopLayout title={'ShopApp - Hombres'} pageDescription={'Encuentra los mejores productos para hombres'}>
      <Typography variant='h1' component='h1'>Hombres</Typography>
      <Typography variant='h2' sx={{ mb:1 }}>Todos los productos</Typography>

      {
        isLoading
        ? <Loading />
        : <ProductList products={ products } />
      }

      

    </ShopLayout>

  )
}

export default MenPage
