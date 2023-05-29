import { ShopLayout } from '@/components/layouts'
import type { NextPage } from 'next'
import { Typography } from '@mui/material';
import { ProductList } from '@/components/products';
import { useProducts } from '@/hooks';
import { Loading } from '@/components/ui';



const KidPage: NextPage = () => {

  const { products, isLoading } = useProducts('products?gender=kid')

  return (
    <ShopLayout title={'ShopApp - Kids'} pageDescription={'Encuentra los mejores productos para niños'}>
      <Typography variant='h1' component='h1'>Niños</Typography>
      <Typography variant='h2' sx={{ mb:1 }}>Todos los productos</Typography>

      {
        isLoading
        ? <Loading />
        : <ProductList products={ products } />
      }

      

    </ShopLayout>

  )
}

export default KidPage
