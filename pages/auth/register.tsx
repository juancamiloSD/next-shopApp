import { AuthLayout } from "@/components/layouts"
import { Box, Grid, Typography, TextField, Button, Link } from '@mui/material';
import NextLink from 'next/link';

const RegisterPage = () => {
  return (
    <AuthLayout title={'Ingresar'}>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
            <Grid container spacing={ 2 }>
                <Grid item>
                    <Typography variant='h1' component='h1'>CREAR CUENTA</Typography>
                </Grid>
                <Grid item xs={ 12 }>
                    <TextField label='Nombre completo' variant='filled' fullWidth/>
                </Grid>
                <Grid item xs={ 12 }>
                    <TextField label='Correo eletrónico' variant='filled' fullWidth/>
                </Grid>
                <Grid item xs={ 12 }>
                    <TextField label='Contraseña' type='password' variant='filled' fullWidth/>
                </Grid>
                <Grid item xs={ 12 }>
                    <Button color='secondary' className='cirular-btn' size='large'>
                        Registrarse
                    </Button>
                </Grid>
                <Grid item xs={ 12 } display='flex' justifyContent='end'>
                    <NextLink href='/auth/login' passHref legacyBehavior>
                        <Link underline="always">
                            Ya tienes cuenta?
                        </Link>
                    </NextLink>
                </Grid>
            </Grid>
        </Box>
    </AuthLayout>
  )
}

export default RegisterPage