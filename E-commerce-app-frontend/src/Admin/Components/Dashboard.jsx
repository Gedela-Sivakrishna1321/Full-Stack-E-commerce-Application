import React from 'react'
import Achivement from './Achivement'
import { Grid } from '@mui/material'
import MonthlyOverview from './MonthlyOverview'
import OrderTableView from '../View/OrderTableView'
import ProductTableView from '../View/ProductTableView'


const AdminDashboard = () => {


  return (
    <div className='p-10'>
        <Grid container spacing={3}>
            
            <Grid item xs={12} md={4} >
              <div  className='shadow-lg shadow-gray-600'>

               <Achivement/>
              </div>
            </Grid>

            <Grid item xs={12} md={8} >
              <div  className='shadow-lg shadow-gray-600'>

               <MonthlyOverview/>
              </div>
            </Grid>

            <Grid item xs={12} md={6}>
                
              <div className='shadow-lg shadow-gray-600'>
                <OrderTableView/>
              </div>
            </Grid>

            <Grid item xs={12} md={6}>
                
              <div className='shadow-lg shadow-gray-600'>
                <ProductTableView/>
              </div>
            </Grid>


        </Grid>
    </div>
  )
}

export default AdminDashboard