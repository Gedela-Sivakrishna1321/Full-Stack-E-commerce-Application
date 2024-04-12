import { Box, Button, Grid, TextField } from '@mui/material'
import React from 'react'
import AddressCard from '../AddressCard/AddressCard'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createOrder } from '../../../Redux/Order/Action'

const DeliveryAddress = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(store => store?.auth?.user);
    console.log("User Saved Address - ", user?.address);
    // Declaring address variable globally
    var address;

    function handleCreateOrder(address) {

        delete address.id;
        
        const orderData = {address, navigate};

        dispatch(createOrder(orderData))
        
        console.log("Address - ", address);
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

         address = {
            firstName : data.get("firstName"),
            lastName : data.get("lastName"),
            streetAddress : data.get("address"),
            city : data.get("city"),
            state : data.get("state"),
            zipcode : data.get("zip"),
            mobile : data.get("phoneNumber")
        }

        handleCreateOrder(address)

    }
  
    return (
        <div>
            <Grid container spacing={4}>

                <Grid xs={12} lg={5}
                    className='border rounded-md shadow-md h-[30.5rem] overflow-y-scroll' >
                    {user?.address.map((item) => 
                    
                    <div className='p-5 py-7 border-b cursor-pointer'>
                        <AddressCard address={item}  />

                        <Button
                            sx={{ mt: 2, bgcolor: "RGB(145 85 253)" }}
                            size='large'
                            variant='contained'
                            onClick={() => handleCreateOrder(item)}
                        >
                            Deliver Here
                        </Button>
                    </div>
                   
                   )}
                    
                 
                </Grid>

                <Grid xs={12} lg={7} item>
                <Box className='border rounded-md shadow-md p-5' >
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={3} >
                                <Grid item xs={12} sm={6} >
                                    <TextField
                                        required
                                        id="firstName"
                                        name="firstName"
                                        label="First Name"
                                        fullWidth
                                        autoComplete='given-name'
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} >
                                    <TextField
                                        required
                                        id="lastName"
                                        name="lastName"
                                        label="Last Name"
                                        fullWidth
                                        autoComplete='given-name'
                                    />
                                </Grid>
                                <Grid item xs={12} lg={12} >
                                    <TextField
                                        required
                                        id="address"
                                        name="address"
                                        label="Address"
                                        fullWidth
                                        autoComplete='given-name'
                                        multiline
                                        rows={4}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6} >
                                    <TextField
                                        required
                                        id="city"
                                        name="city"
                                        label="City"
                                        fullWidth
                                        autoComplete='given-name'
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6} >
                                    <TextField
                                        required
                                        id="state"
                                        name="state"
                                        label="State/Provision/Region"
                                        fullWidth
                                        autoComplete='given-name'
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6} >
                                    <TextField
                                        required
                                        id="zip"
                                        name="zip"
                                        label="Zip / Postal code"
                                        fullWidth
                                        autoComplete='given-name'
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6} >
                                    <TextField
                                        required
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        label="Phone Number"
                                        fullWidth
                                        autoComplete='given-name'
                                    />
                                </Grid>

                            </Grid>

                            <Button
                                
                                sx={{py:1.5, mt: 2, bgcolor: "RGB(145 85 253)" }}
                                size='large'
                                variant='contained'
                                type='submit'
                            >
                                Deliver Here
                            </Button>
                        </form>
                    </Box>
                </Grid>

            </Grid>
        </div>
    )
}

export default DeliveryAddress