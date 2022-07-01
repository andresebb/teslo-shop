import { FC, useContext } from 'react';
import NextLink from 'next/link';
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';

import { initialData } from '../../database/products';
import { ItemCounter } from '../ui';
import { CartContext } from '../../context';

const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
]

interface Props {
    editable?: boolean;
}

export const CartList: FC<Props> = ({ editable = false }) => {

    const { cart } = useContext(CartContext);

    return (
        <>

            {
                cart.map(product => (
                    <Grid container spacing={2} key={product.slug} sx={{ mb: 1 }}>
                        <Grid item xs={3}>
                            {/* TODO: llevar a la página del producto */}
                            <NextLink href="/product/slug" passHref>
                                <Link>
                                    <CardActionArea>
                                        <CardMedia
                                            image={`/products/${product.image}`}
                                            component='img'
                                            sx={{ borderRadius: '5px' }}
                                        />
                                    </CardActionArea>
                                </Link>
                            </NextLink>
                        </Grid>
                        <Grid item xs={7}>
                            <Box display='flex' flexDirection='column'>
                                <Typography variant='body1'>{product.title}</Typography>
                                <Typography variant='body1'>Size: <strong>M</strong></Typography>

                                {
                                    editable
                                        ? <ItemCounter currentValue={product.quantity} maxValue={10} updatedQuantity={() => { }} />
                                        : <Typography variant='h5'>{product.quantity} {product.quantity > 1 ? "products" : "producto"}</Typography>
                                }

                            </Box>
                        </Grid>
                        <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
                            <Typography variant='subtitle1'>{`$${product.price}`}</Typography>

                            {
                                editable && (
                                    <Button variant='text' color='secondary' >
                                        Remove
                                    </Button>
                                )
                            }
                        </Grid>
                    </Grid>
                ))
            }
        </>
    )
}
