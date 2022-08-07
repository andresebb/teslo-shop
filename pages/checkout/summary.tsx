import { useContext, useEffect, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Link, Box, Button, Card, CardContent, Divider, Grid, Typography, Chip } from '@mui/material';

import { CartContext } from '../../context';
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { CartList, OrderSummary } from '../../components/cart';
import { countries } from '../../utils';
import Cookies from 'js-cookie';

const SummaryPage = () => {

    const [isPosting, setIsPosting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const router = useRouter()
    const { shippingAddress, numberOfItems, createOrder } = useContext(CartContext);

    useEffect(() => {
        if (!Cookies.get('firstName')) {
            router.push('/checkout/address');
        }
    }, [router]);

    if (!shippingAddress) {
        return <h1>There is not shipping addres</h1>;
    }

    const { firstName, lastName, address, address2 = '', city, country, phone, zip } = shippingAddress;

    const onCreateOrder = async () => {
        setIsPosting(true)

        const { hasError, message } = await createOrder();

        if (hasError) {
            setIsPosting(false);
            setErrorMessage(message);
            return;
        }

        router.replace(`/orders/${message}`);
    }

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
                            <Typography variant='h2'>Summary  ({numberOfItems} {numberOfItems === 1 ? 'product' : 'products'})</Typography>
                            <Divider sx={{ my: 1 }} />

                            <Box display='flex' justifyContent='space-between'>
                                <Typography variant='subtitle1'>Order Address</Typography>
                                <NextLink href='/checkout/address' passHref>
                                    <Link underline='always'>
                                        Edit
                                    </Link>
                                </NextLink>
                            </Box>


                            <Typography>{firstName} {lastName}</Typography>
                            <Typography>{address}{address2 ? `, ${address2}` : ''} </Typography>
                            <Typography>{city}, {zip}</Typography>
                            <Typography>{countries.find(c => c.code === country)?.name}</Typography>
                            <Typography>{phone}</Typography>
                            <Divider sx={{ my: 1 }} />

                            <Box display='flex' justifyContent='end'>
                                <NextLink href='/cart' passHref>
                                    <Link underline='always'>
                                        Edit
                                    </Link>
                                </NextLink>
                            </Box>

                            <OrderSummary />

                            <Box sx={{ mt: 3 }} display="flex" flexDirection="column">
                                <Button
                                    color="secondary"
                                    className='circular-btn'
                                    fullWidth
                                    onClick={onCreateOrder}
                                    disabled={isPosting}
                                >
                                    Confirm Order
                                </Button>


                                <Chip
                                    color="error"
                                    label={errorMessage}
                                    sx={{ display: errorMessage ? 'flex' : 'none', mt: 2 }}
                                />


                            </Box>

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>


        </ShopLayout>
    )
}


export default SummaryPage;