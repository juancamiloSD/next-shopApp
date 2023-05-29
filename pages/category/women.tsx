import { ShopLayout } from '@/components/layouts'
import type { NextPage } from 'next'
import { Typography } from '@mui/material';
import { ProductList } from '@/components/products';
import { useProducts } from '@/hooks';
import { Loading } from '@/components/ui';



const WomenPage: NextPage = () => {

  const { products, isLoading } = useProducts('products?gender=women')

  return (
    <ShopLayout title={'ShopApp - Mujeres'} pageDescription={'Encuentra los mejores productos para mujeres'}>
      <Typography variant='h1' component='h1'>Mujeres</Typography>
      <Typography variant='h2' sx={{ mb:1 }}>Todos los productos</Typography>

      {
        isLoading
        ? <Loading />
        : <ProductList products={ products } />
      }

      

    </ShopLayout>

  )
}

export default WomenPage
