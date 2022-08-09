import NextLink from 'next/link';
import { GetServerSideProps, NextPage } from 'next';


import { Link, Box, Card, CardContent, Divider, Grid, Typography, Chip } from '@mui/material';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';

import { ShopLayout } from '../../components/layouts/ShopLayout';
import { CartList, OrderSummary } from '../../components/cart';
import { getSession } from 'next-auth/react';
import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';

interface Props {
    order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {

    // console.log(order)

    return (
        <ShopLayout title='Order Summary 123671523' pageDescription={'Resumen de la orden'}>
            <Typography variant='h1' component='h1'>Order: ABC123</Typography>

            {/* <Chip 
            sx={{ my: 2 }}
            label="Order not payed"
            variant='outlined'
            color="error"
            icon={ <CreditCardOffOutlined /> }
        /> */}
            <Chip
                sx={{ my: 2 }}
                label="Order payed"
                variant='outlined'
                color="success"
                icon={<CreditScoreOutlined />}
            />

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
                                {/* TODO */}
                                <h1>Pay</h1>

                                <Chip
                                    sx={{ my: 2 }}
                                    label="Order payed"
                                    variant='outlined'
                                    color="success"
                                    icon={<CreditScoreOutlined />}
                                />
                            </Box>

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>


        </ShopLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

    const { id = '' } = query;

    console.log(`soy el motherfuKERRRRR${id}`)

    const session: any = await getSession({ req });

    if (!session) {
        return {
            redirect: {
                destination: `/auth/login?p=/orders/${id}`,
                permanent: false,
            }
        }
    }

    const order = await dbOrders.getOrderById(id.toString());

    if (!order) {
        return {
            redirect: {
                destination: '/orders/history',
                permanent: false,
            }
        }
    }

    if (order.user !== session.user._id) {
        return {
            redirect: {
                destination: '/orders/history',
                permanent: false,
            }
        }
    }


    return {
        props: {
            order
        }
    }
}

export default OrderPage;