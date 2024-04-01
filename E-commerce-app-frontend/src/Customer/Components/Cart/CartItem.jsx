import { Button, IconButton } from '@mui/material'
import React from 'react'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useDispatch } from 'react-redux';
import { removeCartItem, updateCartItem } from '../../../Redux/Cart/Action';
import { useLocation } from 'react-router-dom';

const CartItem = ({item}) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const step = searchParams.get("step");
    // console.log("Step --------> ", step);
    
    // Remove Cart Item
    function handleRemoveCartItem() {
        dispatch(removeCartItem(item.id))
        // console.log("Item removed from cart successfully !")
    }

    // Update Cart Item
    function handleupdateCartItem(num) {
        const data = {
           data : { quantity : (item.quantity)+num}, cartItemId : item.id
        }
        console.log("Quantity data - ", data);
        dispatch(updateCartItem(data))
    }

    console.log(item);



    return (
        <div className='p-5 shadow-lg border rounded-md'>

            <div className='flex items-center'>

                <div className='w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]' >
                    <img className='h-full w-full object-cover object-top'
                        src={item.product.imageUrl} alt="" />
                </div>

                <div className='ml-5 space-y-1'>
                    <p className='font-semibold' > {item.product.title} </p>
                    <p className='opacity-70 '>Size: {item.size},{item.product.color}</p>
                    <p className='opacity-70 mt-2'>Seller : {item.product.brand}</p>
                    <div className='flex space-x-5 items-center text-gray-900 pt-6'>
                        <p className='font-semibold'>₹{item.discountedPrice}</p>
                        <p className='line-through opacity-50'>₹{item.price}</p>
                        <p className='font-semibold text-green-600'>{item.product.discountPercent}% off</p>
                    </div>
                </div>
            </div>

            {/* Should not display the option to more items once the order got placed */}
            {step !== 3 && <div className='lg:flex items-center lg:space-x-10 pt-4'>
                <div className='flex items-center space-x-2'>
                    <IconButton onClick={() => {handleupdateCartItem(-1)}} disabled={item.quantity <= 1}>
                        <RemoveCircleOutlineIcon  />
                    </IconButton>
                    <span className='py-1 px-7 border rounded-sm'>{item.quantity}</span>
                    <IconButton  onClick={() => {handleupdateCartItem(1)}}>
                        <AddCircleOutlineIcon/>
                    </IconButton>
                </div>

                <div>
                    <Button onClick={handleRemoveCartItem} sx={{color:"RGB(145, 85, 253)"}}>Remove</Button>
                </div>
            </div>}

        </div>
    )
}

export default CartItem