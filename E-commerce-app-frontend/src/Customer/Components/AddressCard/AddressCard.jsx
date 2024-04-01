import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const AddressCard = ({address}) => {
  // console.log("Yes, I am in address card");

  // Fetch the users default address
  const {auth} = useSelector(store => store);
  // console.log("userrrrr -> ", auth?.user);

  return (
    <div className='space-y-3'>
        <p className='font-semibold'> {address?.firstName ? auth?.user?.firstName : ""} {address?.lastName ? auth?.user?.lastName : ""}</p>
        <p>{ address?.state ? address?.state :  ""}, {address?.city ? address?.city : ""}, { address?.streetAddress ? address?.streetAddress : ""}, {address?.zipcode ? address?.zipcode : ""} </p>
        <div className='space-y-1'>
            <p className='font-semibold'>Phone Number</p>
            <p>{address?.mobile ? address?.mobile : ""}</p>
        </div>
    </div>
  )
}

export default AddressCard

// {address.firstName + " " + address.lastName} 
// {address.state}, {address.city}, {address.streetAddress}, {address.zipcode}
// {address.mobile}
