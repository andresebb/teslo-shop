import type { NextPage } from 'next';
import { Typography } from '@mui/material';

import { ShopLayout } from '../components/layouts';
import { initialData } from '../database/products';
import { ProductList } from '../components/products';
import { useProducts } from '../hooks';


const HomePage: NextPage = () => {

  const { products, isLoading } = useProducts("/products")


  return (
    <ShopLayout title={'Teslo-Shop - Home'} pageDescription={'Encuentra los mejores productos de Teslo aquí'}>
      <Typography variant='h1' component='h1'>Store</Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>All the products</Typography>

      {
        isLoading
          ? (<Typography variant="h1" component="h1">Loading ...</Typography>)
          : (<ProductList
            products={products}
          />)
      }



    </ShopLayout>
  )
}

export default HomePage
