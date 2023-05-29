import { ShopLayout } from '@/components/layouts'
import type { GetServerSideProps, NextPage } from 'next'
import { Box, Typography } from '@mui/material';
import { ProductList } from '@/components/products';
import { IProduct } from '@/interfaces';
import { dbProducts } from '@/database';


interface Props {
    products: IProduct[],
    foundProducts: boolean,
    query: string
}

const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {

  return (
    <ShopLayout title={'ShopApp - Buscar'} pageDescription={'Encuentra los mejores productos de ShopApp'}>
      <Typography variant='h1' component='h1'>Buscar productos</Typography>
      {
        foundProducts
        ? <Typography variant='h2' sx={{ mb:1 }} textTransform='capitalize'>{ query }</Typography>
        : <Box display='flex'>
            <Typography variant='h2' sx={{ mb:1 }}>No hay ningun producto:</Typography>
            <Typography variant='h2' sx={{ ml:1 }} color='secondary' textTransform='capitalize'>{ query }</Typography>
          </Box>
      }
      <ProductList products={ products } />
    </ShopLayout>

  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    const { query = '' } = params as { query: string }

    if(query.length === 0){
        return {
            redirect: {
                destination: '/',
                permanent: true
            }
        }
    }

    let products = await dbProducts.getProductsByTerm( query )
    const foundProducts = products.length > 0

    if(!foundProducts){
        // products = await dbProducts.getAllProducts()
        products = await dbProducts.getProductsByTerm('shirts')

    }

    return {
        props: {
            products,
            foundProducts,
            query
        }
    }
}

export default SearchPage
