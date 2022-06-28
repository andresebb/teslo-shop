import type { NextPage } from 'next';
import { Typography } from '@mui/material';

import { ShopLayout } from '../components/layouts';
import { ProductList } from '../components/products';
import { useProducts } from '../hooks';
import { FullScreenLoading } from '../components/ui';


const HomePage: NextPage = () => {

  const { products, isLoading } = useProducts("/products")


  return (
    <ShopLayout title={'Teslo-Shop - Home'} pageDescription={'Find the best products of teslo here'}>
      <Typography variant='h1' component='h1'>Store</Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>All the products</Typography>
      {
        isLoading
          ? (<FullScreenLoading />)
          : (<ProductList
            products={products}
          />)
      }
    </ShopLayout>
  )
}

export default HomePage
