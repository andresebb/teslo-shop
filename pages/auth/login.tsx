import { useState, useContext } from "react"
import NextLink from 'next/link';
import { useRouter } from "next/router";

import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { ErrorOutline } from '@mui/icons-material';


import { AuthContext } from "../../context";
import { AuthLayout } from '../../components/layouts'
import { validations } from '../../utils';
import { tesloApi } from "../../api";

type FormData = {
    email: string,
    password: string,
};

const LoginPage = () => {

    const router = useRouter()
    const { loginUser } = useContext(AuthContext);

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [showError, setShowError] = useState(false);

    const onLoginUser = async ({ email, password }: FormData) => {
        setShowError(false);

        const isValidLogin = await loginUser(email, password)

        if (!isValidLogin) {
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
            return;
        }

        //change navegator url
        const destination = router.query.p?.toString() || '/';
        router.replace(destination);
    }

    return (
        <AuthLayout title={'Sign In'}>
            <form onSubmit={handleSubmit(onLoginUser)} noValidate>


                <Box sx={{ width: 350, padding: '10px 20px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h1' component="h1">Sign In</Typography>
                            <Chip
                                label="User or password not valid"
                                color="error"
                                icon={<ErrorOutline />}
                                className="fadeIn"
                                sx={{ display: showError ? 'flex' : 'none' }}
                            />
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
                            <NextLink href={router.query.p ? `/auth/register?p=${router.query.p}` : '/auth/register'} passHref>
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