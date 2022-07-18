import { useState, useContext } from 'react';
import NextLink from 'next/link';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { signIn, getSession } from 'next-auth/react';

import { useForm } from 'react-hook-form';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';

import { AuthLayout } from '../../components/layouts'
import { tesloApi } from '../../api';
import { validations } from '../../utils';
import { AuthContext } from '../../context';

type FormData = {
    name: string;
    email: string;
    password: string;
};

const RegisterPage = () => {
    const router = useRouter()

    const { registerUser } = useContext(AuthContext)

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const onRegisterForm = async ({ name, email, password }: FormData) => {
        setShowError(false);

        const { hasError, message } = await registerUser(name, email, password);

        if (hasError) {
            setShowError(true);
            setErrorMessage(message!);
            setTimeout(() => setShowError(false), 3000);
            return;
        }

        await signIn('credentials', { email, password });
        // router.replace('/');
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
                                minLength: { value: 6, message: 'Mín 6 characters' }
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
                            <NextLink href={router.query.p ? `/auth/login?p=${router.query.p}` : '/auth/login'} passHref>
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


//Redirect and dont allow screen to no users
export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

    const session = await getSession({ req });
    // console.log({session});

    const { p = '/' } = query;

    if (session) {
        return {
            redirect: {
                destination: p.toString(),
                permanent: false
            }
        }
    }


    return {
        props: {}
    }
}

export default RegisterPage