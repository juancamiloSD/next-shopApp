import { useContext, useState } from "react";
import NextLink from 'next/link';
import { getSession, signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";

import { Box, Grid, Typography, TextField, Button, Link, Chip, Divider } from '@mui/material';
import { AuthLayout } from "@/components/layouts"
import { ErrorOutline } from "@mui/icons-material";
import { validations } from "@/utils";
import { AuthContext } from "@/context";

type FormData = {
    name: string,
    email: string,
    password: string,
};

const RegisterPage = () => {

    const router = useRouter()
    const { registerUser } = useContext(AuthContext)

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [showError, setShowError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')


    const onRegisterUser = async ( { name, email, password }: FormData ) => {
        setShowError(false)
        const { hasError, message } = await registerUser(name, email, password)
        if( hasError ){
            setShowError(true)
            setErrorMessage( message || '' )
            setTimeout(() => {
                setShowError(false)
            }, 3000);
            return
        }
        // const destination = router.query.p?.toString() || '/'
        // router.replace(destination)
        await signIn('credentials', { email, password })
    }

    return (
        <AuthLayout title={'Ingresar'}>
            <form onSubmit={ handleSubmit(onRegisterUser) }>
                <Box sx={{ width: 350, padding: '10px 20px' }}>
                    <Grid container spacing={ 2 }>
                        <Grid item>
                            <Typography variant='h1' component='h1'>CREAR CUENTA</Typography>
                            <Chip 
                                label="No se reconoce ese usuario / contraseña"
                                color='error'
                                icon={ <ErrorOutline /> }
                                className='fadeIn'
                                sx={{ display: showError ? 'flex' : 'none' }}
                            />
                        </Grid>
                        <Grid item xs={ 12 }>
                            <TextField 
                                label='Nombre completo' 
                                variant='filled' 
                                fullWidth
                                { 
                                    ...register('name', {
                                        required: 'Este campo es requerido',
                                        minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                                    })
                                }
                                error={ !!errors.name }
                                helperText={ errors.name?.message }
                            />
                        </Grid>
                        <Grid item xs={ 12 }>
                            <TextField 
                                type='email'
                                label='Correo eletrónico' 
                                variant='filled' 
                                fullWidth
                                { 
                                    ...register('email', {
                                        required: 'Este campo es requerido',
                                        validate: validations.isEmail
                                    })
                                }
                                error={ !!errors.email }
                                helperText={ errors.email?.message }
                            />
                        </Grid>
                        <Grid item xs={ 12 }>
                            <TextField 
                                label='Contraseña' 
                                type='password' 
                                variant='filled' 
                                fullWidth
                                { 
                                    ...register('password', {
                                        required: 'Este campo es requerido',
                                        minLength: { value: 3, message: 'Mínimo 3 caracteres' }
                                    }) 
                                }
                                error={ !!errors.password }
                                helperText={ errors.password?.message }
                            />
                        </Grid>
                        <Grid item xs={ 12 }>
                            <Button 
                                type='submit'
                                color='secondary' 
                                className='cirular-btn' 
                                size='large'
                            >
                                Registrarse
                            </Button>
                        </Grid>
                        <Grid item xs={ 12 } display='flex' justifyContent='end'>
                            <NextLink 
                                href={ router.query.p ? `/auth/login?p=${ router.query.p }` : '/auth/login' } 
                                passHref 
                                legacyBehavior
                            >
                                <Link underline="always">
                                    Ya tienes cuenta?
                                </Link>
                            </NextLink>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    const session = await getSession({ req })

    const { p = '/' } = query

    if( session ){
        return {
            redirect: {
                destination: p.toString(),
                permanent: false
            }
        } 
    }

    return {
        props: {
            
        }
    }
}

export default RegisterPage