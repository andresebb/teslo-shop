import type { NextPage } from 'next';
import { Typography } from '@mui/material';

import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';
import { useProducts } from '../../hooks';
import { FullScreenLoading } from '../../components/ui';


const KidPage: NextPage = () => {

  const { products, isLoading } = useProducts("/products?gender=kid")


  return (
    <ShopLayout title={'Teslo-Shop - Kid'} pageDescription={'Teslo Kid section'}>
      <Typography variant='h1' component='h1'>Kids</Typography>
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

export default KidPage
