import { useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { useForm } from 'react-hook-form';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';

import { AuthLayout } from '../../components/layouts'
import { tesloApi } from '../../api';
import { validations } from '../../utils';

type FormData = {
    name: string;
    email: string;
    password: string;
};

const RegisterPage = () => {
    const router = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [showError, setShowError] = useState(false);

    const onRegisterForm = async ({ name, email, password }: FormData) => {
        setShowError(false);

        try {
            const { data } = await tesloApi.post('/user/register', { email, password, name })
            const { token, user } = data;
            console.log({ token, user });
        }
        catch (error) {
            console.log(error.response.data);
            setShowError(true);
            setTimeout(() => setShowError(false), 30001);
        }
    }

    return (
        <AuthLayout title={'Sign up'}>
            <form onSubmit={handleSubmit(onRegisterForm)} noValidate>

                <Box sx={{ width: 350, padding: '10px 20px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h1' component="h1">Create Account</Typography>
                            <Chip
                                label="User or password not valid"
                                color="error"
                                icon={<ErrorOutline />}
                                className="fadeIn"
                                sx={{ display: showError ? 'flex' : 'none' }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField label="Full Name" variant="filled" fullWidth  {...register('name', {
                                required: 'This field is required',
                                minLength: { value: 2, message: 'Mínimo 2 characters' }
                            })}
                                error={!!errors.name}
                                helperText={errors.name?.message} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Email" variant="filled" fullWidth {...register('email', {
                                required: 'This field is required',
                                validate: validations.isEmail

                            })}
                                error={!!errors.email}
                                helperText={errors.email?.message} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Password" type='password' variant="filled" fullWidth {...register('password', {
                                required: 'This field is required',
                                minLength: { value: 6, message: 'Mínimo 6 characters' }
                            })}
                                error={!!errors.password}
                                helperText={errors.password?.message} />
                        </Grid>

                        <Grid item xs={12}>
                            <Button type="submit" color="secondary" className='circular-btn' size='large' fullWidth>
                                Sign up
                            </Button>
                        </Grid>

                        <Grid item xs={12} display='flex' justifyContent='end'>
                            <NextLink href="/auth/login" passHref>
                                <Link underline='always'>
                                    ¿Already have an account?
                                </Link>
                            </NextLink>
                        </Grid>
                    </Grid>
                </Box>
            </form>

        </AuthLayout>
    )
}

export default RegisterPage