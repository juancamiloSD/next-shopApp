import { ShopLayout } from '@/components/layouts'
import type { NextPage } from 'next'
import { Typography } from '@mui/material';
import { ProductList } from '@/components/products';
import { useProducts } from '@/hooks';
import { Loading } from '@/components/ui';



const HomePage: NextPage = () => {

  const { products, isLoading } = useProducts('products')

  return (
    <ShopLayout title={'ShopApp - inicio'} pageDescription={'Encuentra los mejores productos de ShopApp'}>
      <Typography variant='h1' component='h1'>Tienda</Typography>
      <Typography variant='h2' sx={{ mb:1 }}>Todos los productos</Typography>

      {
        isLoading
        ? <Loading />
        : <ProductList products={ products } />
      }

      

    </ShopLayout>

  )
}

export default HomePage
