import { useState, useContext } from 'react';

import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { ProductSlideshow, SizeSelector } from '../../components/products';

import { ItemCounter } from '../../components/ui/ItemCounter';
import { ShopLayout } from '../../components/layouts';
import { IProduct } from '../../interfaces/products';
import { dbProducts } from '../../database';
import { useProducts } from '../../hooks';
import { ICartProduct, ISize } from '../../interfaces';
import { CartContext } from '../../context';


interface Props {
  product: IProduct
}

const ProductPage: NextPage<Props> = ({ product }) => {

  //Esta es una forma de hacerlo (lo haremos de otra forma, asi no hay ceo)
  // const router = useRouter();
  // const { products: product, isLoading } = useProducts(`/products/${router.query.slug}`)

  const { addProductToCart } = useContext(CartContext)
  const router = useRouter()

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  })


  const onAddProduct = () => {
    if (!tempCartProduct.size) return

    addProductToCart(tempCartProduct)
    router.push("/cart")

  }

  const selectedSize = (size: ISize) => {
    setTempCartProduct({
      ...tempCartProduct,
      size
    })
  }

  const updateQuantity = (quantity: number) => {
    setTempCartProduct({
      ...tempCartProduct,
      quantity
    })
  }


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
              <ItemCounter
                currentValue={tempCartProduct.quantity}
                updatedQuantity={(quantity) => updateQuantity(quantity)}
                maxValue={5}
              />
              <SizeSelector
                selectedSize={tempCartProduct.size}
                sizes={product.sizes}
                onSelectedSize={(size) => selectedSize(size)}
              />
            </Box>


            {/* Add to the cart */}
            {
              (product.inStock > 0)
                ? (
                  <Button
                    color="secondary"
                    className='circular-btn'
                    onClick={onAddProduct}
                  >
                    {
                      tempCartProduct.size
                        ? 'Add to cart'
                        : 'Select a size'
                    }
                  </Button>
                )
                : (
                  <Chip label="Out of Stock" color="error" variant='outlined' />
                )
            }


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