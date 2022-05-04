import { NextPage, GetStaticPaths, GetStaticProps } from 'next';

import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { ProductSlideshow, SizeSelector } from '../../components/products';

import { ItemCounter } from '../../components/ui/ItemCounter';
import { ShopLayout } from '../../components/layouts';
import { IProduct } from '../../interfaces/products';
import { dbProducts } from '../../database';
import { useProducts } from '../../hooks';


interface Props {
  product: IProduct
}

const ProductPage: NextPage<Props> = ({ product }) => {

  //Esta es una forma de hacerlo (lo haremos de otra forma, asi no hay ceo)
  // const router = useRouter();
  // const { products: product, isLoading } = useProducts(`/products/${router.query.slug}`)


  return (
    <ShopLayout title={product.title} pageDescription={product.description}>

      <Grid container spacing={3}>

        <Grid item xs={12} sm={7}>
          <ProductSlideshow
            images={product.images}
          />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Box display='flex' flexDirection='column'>

            {/* titles */}
            <Typography variant='h1' component='h1'>{product.title}</Typography>
            <Typography variant='subtitle1' component='h2'>{`$${product.price}`}</Typography>

            {/* Quantity */}
            <Box sx={{ my: 2 }}>
              <Typography variant='subtitle2'>Quantity</Typography>
              <ItemCounter />
              <SizeSelector
                selectedSize={product.sizes[2]}
                sizes={product.sizes}
              />
            </Box>


            {/* Add to the cart */}
            <Button color="secondary" className='circular-btn'>
              Agregar al carrito
            </Button>

            {/* <Chip label="No Available" color="error" variant='outlined' /> */}

            {/* Description */}
            <Box sx={{ mt: 3 }}>
              <Typography variant='subtitle2'>Description</Typography>
              <Typography variant='body2'>{product.description}</Typography>
            </Box>

          </Box>
        </Grid>


      </Grid>

    </ShopLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const productSlugs = await dbProducts.getAllProductSlugs()

  return {
    paths: productSlugs.map(({ slug }) => (
      {
        params: { slug }
      }
    )),
    fallback: 'blocking' // false or 'blocking'
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

  const { slug = "" } = params as { slug: string };
  const product = await dbProducts.getProductBySlug(slug)

  if (!product) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24
  }
}








//SSR 
// RECUERDA: si lo hacemos de esta manera se le haria una peticion al servidor cada vez que alguien entre en la pagina, eso no es lo que queremos.
// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const { slug } = params as { slug: string }

//   const product = await dbProducts.getProductBySlug(slug)

//   if (!product) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false
//       }
//     }
//   }

//   return {
//     props: {
//       product
//     }
//   }
// }

export default ProductPage