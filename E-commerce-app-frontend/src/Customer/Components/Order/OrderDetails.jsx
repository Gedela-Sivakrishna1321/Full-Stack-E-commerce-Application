import React from 'react'
import AddressCard from '../AddressCard/AddressCard'
import OrderTracker from './OrderTracker'
import { Box, Grid } from '@mui/material'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { deepPurple } from '@mui/material/colors';

const OrderDetails = () => {
  return (
    <div className='px-5 lg:px-20'>
        
        <div>
            <h1 className='font-bold text-xl py-7' >Delivery Address</h1>
            <AddressCard/>
        </div>

        <div className='py-20'>
                <OrderTracker activeStep={3}/>
        </div>
    
        <Grid container className='space-y-5'>
            {[1,1,1,1,1,1].map((item) => 
            
                    <Grid item container className='shadow-lg rounded-md p-5 border'
                    sx={{alignItems:'center', justifyContent:"space-between"}}>
                            
                            <Grid item xs={6}>
                                <div className='flex items-center space-x-4'>
                                    <img className='w-[5rem] h-[5rem] object-cover object-top'
                                     src="data:image/webp;base64,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" alt="" />
                                    <div className='space-y-2 ml-5'>
                                        <p className='font-semibold'>Men Slim Mid Rise Black Jeans</p>
                                        <p className='space-x-5 opacity-50 font-semibold'>
                                        <span>Color : pink</span> <span>Size : M</span>
                                        </p>
                                        <p>Seller : linaria</p>
                                        <p>₹1099</p>
                                    </div>
                                </div>
                            </Grid>
    
                            <Grid item>
                                    <Box sx={{color:deepPurple[500]}} > 
                                        <StarBorderIcon sx={{fontSize:'2rem'}} className='px-2' />
                                        <span>Rate & Review Product</span>
                                    </Box>
                            </Grid>
                    
                    </Grid>
            )}
                
        </Grid>
    </div>
  )
}

export default OrderDetails