import { useContext } from "react"


import { GetServerSideProps } from 'next'
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import Cookies from "js-cookie"

import { Box, Button, FormControl, Grid, MenuItem, Select, TextField, Typography } from "@mui/material"
import { ShopLayout } from "../../components/layouts"
import { CartContext } from "../../context"
import { countries, jwt } from "../../utils"

type FormData = {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    zip: string;
    city: string;
    country: string;
    phone: string;
}

const getAddressFromCookies = (): FormData => {
    return {
        firstName: Cookies.get('firstName') || '',
        lastName: Cookies.get('lastName') || '',
        address: Cookies.get('address') || '',
        address2: Cookies.get('address2') || '',
        zip: Cookies.get('zip') || '',
        city: Cookies.get('city') || '',
        country: Cookies.get('country') || '',
        phone: Cookies.get('phone') || '',
    }
}

const AddressPage = () => {

    const router = useRouter();
    const { updateAddress } = useContext(CartContext);

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues: getAddressFromCookies()
    });

    const onRegisterAddress = (address: FormData) => {
        updateAddress(address);
        router.push('/checkout/summary');
    }

    return (
        <ShopLayout title="Address" pageDescription="Confirm Address">
            <Typography variant="h1" component='h1'>Address</Typography>

            <form onSubmit={handleSubmit(onRegisterAddress)} noValidate>

                <Grid container spacing={2} sx={{ mt: 2 }}>

                    <Grid item xs={12} sm={6}>
                        <TextField label='Name' variant="filled" fullWidth {...register('firstName', {
                            required: 'this field is required'
                        })}
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label='Last Name' variant="filled" fullWidth {...register('lastName', {
                            required: 'this field is required'
                        })}
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message} />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField label='Address' variant="filled" fullWidth {...register('address', {
                            required: 'this field is required'
                        })}
                            error={!!errors.address}
                            helperText={errors.address?.message} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label='Address 2 (optional)' variant="filled" fullWidth {...register('address2')} />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField label='Postal Code' variant="filled" fullWidth {...register('zip', {
                            required: 'this field is required'
                        })}
                            error={!!errors.address}
                            helperText={errors.address?.message} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label='City' variant="filled" fullWidth {...register('city', {
                            required: 'this field is required'
                        })}
                            error={!!errors.address}
                            helperText={errors.address?.message} />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <TextField
                                select
                                variant="filled"
                                label="País"
                                defaultValue={Cookies.get('country') || countries[0].code}
                                {...register('country', {
                                    required: 'this field is required'
                                })}
                                error={!!errors.country}
                            // helperText={ errors.country?.message }
                            >
                                {
                                    countries.map(country => (
                                        <MenuItem
                                            key={country.code}
                                            value={country.code}
                                        >{country.name}</MenuItem>
                                    ))
                                }
                            </TextField>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label='Teléfono' variant="filled" fullWidth {...register('phone', {
                            required: 'this field is required'
                        })}
                            error={!!errors.address}
                            helperText={errors.address?.message} />
                    </Grid>

                </Grid>


                <Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
                    <Button type="submit" color="secondary" className="circular-btn" size="large">
                        Check your order
                    </Button>
                </Box>
            </form>

        </ShopLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


//We are not usign our token anymore.

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//     const { token = '' } = req.cookies  // your fetch function here 
//     let isValidToken = false

//     try {
//         await jwt.isValidToken(token);
//         isValidToken = true;
//     } catch (error) {
//         isValidToken = false;
//     }

//     if (!isValidToken) {
//         return {
//             redirect: {
//                 destination: '/auth/login?p=/checkout/address',
//                 permanent: false,
//             }
//         }
//     }

//     return {
//         props: {

//         }
//     }
// }

export default AddressPage