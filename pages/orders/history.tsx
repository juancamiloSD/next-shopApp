import { ShopLayout } from '@/components/layouts'
import { Button, Chip, Grid, Link, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import React from 'react'
import NextLink from 'next/link';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'fullname', headerName: 'Nombre completo', width: 300 },
  {
    field: 'paid',
    headerName: 'Pagada',
    description: 'Muestra información si pago o no',
    width: 200,
    renderCell: ( params: GridValueGetterParams ) => {
      return (
        params.row.paid
          ? <Chip color='success' label='Pagada' variant="outlined"/>
          : <Chip color='error' label='No pagada' variant="outlined"/>
            
      )
    }
  },
  { 
    field: 'actions',
    headerName: 'Acciones',
    width: 200,
    sortable: false,
    renderCell: ( params: GridValueGetterParams ) => {
      return (
        <NextLink href={`/orders/${ params.row.id }`} passHref legacyBehavior>
          <Link underline='always'>
            Ver orden
          </Link>
        </NextLink>
      )
    }
  }
]

const rows = [
  { id: 1, paid: true, fullname: 'Juan Salazar' },
  { id: 2, paid: true, fullname: 'Diana Gomez' },
  { id: 3, paid: false, fullname: 'Carlos Diaz' },
  { id: 4, paid: false, fullname: 'Vanessa Uribe' },
  { id: 5, paid: true, fullname: 'Maria Perez' }
]

const HistoryPage = () => {
  return (
    <ShopLayout title='Historial de ordenes' pageDescription={'Historial de ordenes'}>
        <Typography variant='h1' component='h1'>Historial de ordenes</Typography>
        <Grid container sx={{ mt:3 }}>
            <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
                <DataGrid 
                  rows={ rows }
                  columns={ columns }
                  pageSize={ 10 }
                  rowPerPageOptions={ [10] }
                />
            </Grid>
        </Grid>
    </ShopLayout>   
  )
}

export default HistoryPage