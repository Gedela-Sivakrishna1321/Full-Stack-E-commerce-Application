import { Grid } from '@mui/material'
import React from 'react'
import AdjustIcon from '@mui/icons-material/Adjust';
import { useNavigate } from 'react-router-dom';

const OrderCard = ({orderItem, order}) => {
    const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/account/order/${5}`)} className='p-5 shadow-md hover:shadow-xl transition-all duration-200'>
        <Grid container spacing={2} sx={{justifyContent:'space-between'}}>

                <Grid item xs={8}>
                        <div className='cursor-pointer flex'>
                            <img className='w-[7rem] h-[7rem] object-cover object-top'
                            src={orderItem.product.imageUrl} alt="" />
                            <div className='ml-5 space-y-2'>
                                <p>{orderItem.product.title}</p>
                                <p className='opacity-50 text-xs font-semibold'>Size: {orderItem.size}</p>
                                <p className='opacity-50 text-xs font-semibold'>Color: {orderItem.product.color}</p>
                                <p> <span className='opacity-50 text-xs font-semibold'>Price</span> - ₹{order.totalDiscountedPrice} </p>
                                <p><span className='opacity-50 text-xs font-semibold'>Ordered on </span> - {order.orderDate.substring(0,10)}
                                 </p>
                            </div>
                        </div>
                </Grid>

                {/* <Grid item xs={2}>
                      <p></p>
                </Grid> */}

                <Grid item xs={4}>
                        {order.orderStatus === 'DELIVERED' && <div>
                                <p>
                                    <AdjustIcon sx={{width:'15px', height:"15px"}}
                                     className='text-green-600 mr-2 text-sm'
                                    />
                                    <span>Delivered On March 03</span>
                                </p>
                                <p className='text-sm'>
                                   DELIVERED
                                </p>
                            </div>}
                </Grid>
        
        </Grid>
    </div>
  )
}

export default OrderCard