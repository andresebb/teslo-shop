import { useState, useContext } from "react"
import NextLink from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from "next/router";


import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../../components/layouts'
import { validations } from '../../utils';

type FormData = {
    email: string,
    password: string,
};

const LoginPage = () => {

    const router = useRouter()
    // const { loginUser } = useContext(AuthContext);

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [showError, setShowError] = useState(false);

    const onLoginUser = async (data: FormData) => {
        console.log({ data })
    }

    return (
        <AuthLayout title={'Sign In'}>
            <form onSubmit={handleSubmit(onLoginUser)} noValidate>


                <Box sx={{ width: 350, padding: '10px 20px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h1' component="h1">Sign In</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField type="email" label="Email" variant="filled" fullWidth {...register('email', {
                                required: 'This field is required',
                                validate: validations.isEmail
                            })}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField type="password" label="Password" variant="filled" fullWidth {...register('password', {
                                required: 'This field is required',
                                minLength: { value: 6, message: 'Min 6 characters' }
                            })}
                                error={!!errors.password}
                                helperText={errors.password?.message} />
                        </Grid>

                        <Grid item xs={12}>
                            <Button type="submit" color="secondary" className='circular-btn' size='large' fullWidth>
                                Sign In
                            </Button>
                        </Grid>

                        <Grid item xs={12} display='flex' justifyContent='end'>
                            <NextLink href="/auth/register" passHref>
                                <Link underline='always'>
                                    ¿Do not have an account?
                                </Link>
                            </NextLink>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    )
}

export default LoginPage