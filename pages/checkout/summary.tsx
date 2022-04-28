import NextLink from 'next/link';

import { Link, Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';

import { ShopLayout } from '../../components/layouts/ShopLayout';
import { CartList, OrderSummary } from '../../components/cart';


const SummaryPage = () => {
    return (
        <ShopLayout title='Order Summary' pageDescription={'This is the order summary'}>
            <Typography variant='h1' component='h1'>Order Summary</Typography>

            <Grid container>
                <Grid item xs={12} sm={7}>
                    <CartList />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2'>Summary (3 products)</Typography>
                            <Divider sx={{ my: 1 }} />

                            <Box display='flex' justifyContent='space-between'>
                                <Typography variant='subtitle1'>Order Address</Typography>
                                <NextLink href='/checkout/address' passHref>
                                    <Link underline='always'>
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>


                            <Typography>Fernando Herrera</Typography>
                            <Typography>323 Algun lugar</Typography>
                            <Typography>Stittsville, HYA 23S</Typography>
                            <Typography>Canadá</Typography>
                            <Typography>+1 23123123</Typography>

                            <Divider sx={{ my: 1 }} />

                            <Box display='flex' justifyContent='end'>
                                <NextLink href='/cart' passHref>
                                    <Link underline='always'>
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>

                            <OrderSummary />

                            <Box sx={{ mt: 3 }}>
                                <Button color="secondary" className='circular-btn' fullWidth>
                                    Confirm Order
                                </Button>
                            </Box>

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>


        </ShopLayout>
    )
}

export default SummaryPage;