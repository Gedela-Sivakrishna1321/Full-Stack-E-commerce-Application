import { Box, Button, Grid, Modal, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddressCard from '../AddressCard/AddressCard'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createOrder } from '../../../Redux/Order/Action'
import { toast, ToastContainer  } from 'react-toastify'
import { addNewUserAddress, removeUserAddress, updateUserAddress } from '../../../Redux/Address/Action'
import { getUser } from '../../../Redux/Auth/Action'
import { RxCross2 } from "react-icons/rx";

const DeliveryAddress = () => {

    const [open, setOpen] = useState(false);
    const [openRemoveModal, setOpenRemoveModal] = useState(false);
    const [addressId, setAddressId] = useState();

    function handleClose(event, reason) {
        if(reason == 'backdropClick') {
            return;
        }
       setOpen(false);
    }
    
    function handleOpen(savedAddress) {
        setOpen(true);
        setUpdatedFormData(savedAddress);
        console.log("About to open the model ..!")
    }

    function handleRemoveOpen(id) {
        setOpenRemoveModal(true);
        setAddressId(id);
    }

    function handleRemoveClose(event, reason) {
        if(reason == 'backdropClick') {
            return;
        }
        setOpenRemoveModal(false);
    }

    

    const [formData, setFormData] = useState({
        firstName : '',
        lastName : '',
        streetAddress : '',
        city : '',
        state : '',
        zipCode : '',
        mobile : '',
    });

    const [updatedFormData, setUpdatedFormData] = useState({
        id : '',
        firstName : '',
        lastName : '',
        streetAddress : '',
        city : '',
        state : '',
        zipCode : '',
        mobile : '',
    });

    const initialFormState = {
        firstName : '',
        lastName : '',
        streetAddress : '',
        city : '',
        state : '',
        zipCode : '',
        mobile : '',
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        console.log(value);
        setFormData(
            {...formData,
            [name] : value,}
        )
    }
    const handleUpdatedInputChange = (e) => {
        const {name, value} = e.target;
        console.log(value);
        setUpdatedFormData(
            {...updatedFormData,
            [name] : value,}
        )
    }


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(store => store?.auth?.user);
    // console.log("User Saved Address - ", user?.address);
    var userAddresses = user?.address;
    const {newlyAddedAddress, updatedAddress, removedAddress} = useSelector((store) => store?.address);
    // Declaring address variable globally
    var address;

    function notify() {
        toast.error("Address already saved ")
    }

    function isDuplicateAddressExist(address) {
        const filteredAddresses = userAddresses.filter((savedAddress) => (
            savedAddress.firstName.toLowerCase() === address.firstName.toLowerCase() && 
            savedAddress.lastName.toLowerCase() === address.lastName.toLowerCase() &&
            savedAddress.streetAddress.toLowerCase() === address.streetAddress.toLowerCase() && 
            savedAddress.city.toLowerCase() === address.city.toLowerCase() && 
            savedAddress.state.toLowerCase() === address.state.toLowerCase() &&
            savedAddress.zipCode === address.zipCode && 
            savedAddress.mobile === address.mobile
          ));
        return filteredAddresses.length > 0;
    }

    function handleCreateOrder(id) {

        // delete address.id;
        
        const orderData = {id, navigate};

        dispatch(createOrder(orderData))
        
        // console.log("Order Dispatch Address Id - ", id);
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

         address = {
            firstName : data.get("firstName"),
            lastName : data.get("lastName"),
            streetAddress : data.get("streetAddress"),
            city : data.get("city"),
            state : data.get("state"),
            zipCode : data.get("zipCode"),
            mobile : data.get("mobile")
        }

        if(!isDuplicateAddressExist(address)) {
            dispatch(addNewUserAddress({address, toast}));
        }
        else {
             toast.error("Address already saved ")
        }

        setFormData(initialFormState);

    }

    useEffect(()=>{
        dispatch(getUser(localStorage.getItem("jwt")));
    },[newlyAddedAddress, updatedAddress, removedAddress])
  
    return (
        <div>
            <Grid container spacing={4} >

                {/* Your Addresses overflow-y-scroll */}
                <Grid xs={12} lg={5}
                    className='border rounded-md shadow-md   ' >
                        <h1 className='text-3xl text-center mt-4 mb-2 pb-2  shadow-md'>Your Addresses</h1>
             
                    <div className='h-[30rem] overflow-y-scroll'>

                    {

                    user?.address.map((savedAddress) => 
                    
                    <div className='p-5 py-7 border-b cursor-pointer '>

                        <AddressCard address={savedAddress}  />

                        <div className='flex justify-between items-center'>

                        <Button
                            sx={{ mt: 2, bgcolor: "RGB(145 85 253)" }}
                            size='large'
                            variant='contained'
                            onClick={() => handleCreateOrder(savedAddress.id)}
                        >
                            Deliver Here
                        </Button>

                        <div className='space-x-4 text-gray-700'>
                            <span onClick={() => handleOpen(savedAddress)} className='hover:text-yellow-600 hover:underline'>Edit</span>
                            <span className='cursor-default'>|</span>
                            <span onClick={() => handleRemoveOpen(savedAddress.id)}
                            className='hover:text-yellow-600 hover:underline'>Remove</span>
                        </div>
                        </div>

                 
                    </div>
                    
                
                )}

                    </div>
                   
                    
                 
                </Grid>

                {/* Add Addresses */}
                <Grid xs={12} lg={7} item>
                <h1 className='text-3xl text-center mb-2'>Add Address</h1>
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
                                        value={formData.firstName}
                                        onChange={handleInputChange}
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
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12} lg={12} >
                                    <TextField
                                        required
                                        id="streetAddress"
                                        name="streetAddress"
                                        label="Address"
                                        fullWidth
                                        autoComplete='given-name'
                                        multiline
                                        rows={4}
                                        value={formData.streetAddress}
                                        onChange={handleInputChange}
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
                                        value={formData.city}
                                        onChange={handleInputChange}
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
                                        value={formData.state}
                                        onChange={handleInputChange}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6} >
                                    <TextField
                                        required
                                        id="zipCode"
                                        name="zipCode"
                                        label="Zip / Postal code"
                                        fullWidth
                                        autoComplete='given-name'
                                        value={formData.zipCode}
                                        onChange={handleInputChange}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6} >
                                    <TextField
                                        required
                                        id="mobile"
                                        name="mobile"
                                        label="Phone Number"
                                        fullWidth
                                        autoComplete='given-name'
                                        value={formData.mobile}
                                        onChange={handleInputChange}
                                    />
                                </Grid>

                            </Grid>

                            <Button
                                
                                sx={{ mt: 2, 
                                    bgcolor: "RGB(255, 216, 20)",
                                     color : 'black',
                                    '&:hover': {
                                    backgroundColor: "RGB(255, 216, 20)",
                                    boxShadow: 'none',
                                  } }}
                                size='large'
                                variant='contained'
                                type='submit'
                            >
                                Add Address
                            </Button>
                        </form>
                    </Box>
                </Grid>

            </Grid>

            <ToastContainer />

            <EditAddressModel open={open} handleClose={handleClose} formData={updatedFormData} handleUpdatedInputChange={handleUpdatedInputChange} toast = {toast}/>
            
            <RemoveAddressModal open={openRemoveModal} handleClose={handleRemoveClose} id={addressId} toast={toast} />
        </div>
    )
}

export default DeliveryAddress


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    outline:'none',
    boxShadow: 24,
    p: 4,
  };

const EditAddressModel = ({open, handleClose, formData, handleUpdatedInputChange, toast}) => {

    const dispatch = useDispatch();

    function handleSubmit(e) {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

       const  address = {
            id : formData.id,
            firstName : data.get("firstName"),
            lastName : data.get("lastName"),
            streetAddress : data.get("streetAddress"),
            city : data.get("city"),
            state : data.get("state"),
            zipCode : data.get("zipCode"),
            mobile : data.get("mobile")
        }

        // console.log("Updated Address Values = ", address);
        dispatch(updateUserAddress(address));
        handleClose();
        toast.success("Address updated successfully ");
    }

 

    return (
        <div>
            <Modal 
                open={open}
                onClose={handleClose}
                disableBackdropClick={{ onClick: (event) => event.stopPropagation() }}
            >
                <Box sx={style}>
                <form onSubmit={handleSubmit} >

                <Grid container spacing={3} >
                        <Grid item xs={12} sm={6} >
                                <TextField 
                                required
                                id='firstName'
                                name='firstName'
                                label='First Name'
                                fullWidth
                                autoComplete='given-name'
                                value={formData.firstName}
                                onChange={handleUpdatedInputChange}
                                />
                        </Grid>
                        <Grid item xs={12} sm={6} >
                                <TextField 
                                required
                                id='lastName'
                                name='lastName'
                                label='Last Name'
                                fullWidth
                                autoComplete='given-name'
                                value={formData.lastName}
                                onChange={handleUpdatedInputChange}
                                />
                        </Grid>
                        <Grid item xs={12}  >
                                <TextField 
                                required
                                id='streetAddress'
                                name='streetAddress'
                                label='streetAddress'
                                fullWidth
                                autoComplete='streetAddress'
                                value={formData.streetAddress}
                                onChange={handleUpdatedInputChange}
                                />
                        </Grid>

                        <Grid item xs={6}  >
                                <TextField 
                                required
                                id='city'
                                name='city'
                                label='city'
                                type='text'
                                fullWidth
                                autoComplete='city'
                                value={formData.city}
                                onChange={handleUpdatedInputChange}
                                />
                        </Grid>

                        <Grid item xs={6}  >
                                <TextField 
                                required
                                id='state'
                                name='state'
                                label='state'
                                type='text'
                                fullWidth
                                autoComplete='state'
                                value={formData.state}
                                onChange={handleUpdatedInputChange}
                                />
                        </Grid>

                        <Grid item xs={6}  >
                                <TextField 
                                required
                                id='zipCode'
                                name='zipCode'
                                label='zipCode'
                                type='text'
                                fullWidth
                                autoComplete='zipCode'
                                value={formData.zipCode}
                                onChange={handleUpdatedInputChange}
                                />
                        </Grid>

                        <Grid item xs={6}  >
                                <TextField 
                                required
                                id='mobile'
                                name='mobile'
                                label='mobile'
                                type='text'
                                fullWidth
                                autoComplete='mobile'
                                value={formData.mobile}
                                onChange={handleUpdatedInputChange}
                                />
                        </Grid>
                    
                        <Grid item xs={6}  >
                                <Button 
                                fullWidth
                                type='submit'
                                variant='contained'
                                size='large'
                                sx={{padding:'.8rem 0',
                                     bgcolor:'#F9EA09',
                                     color : 'black',
                                    '&:hover': {
                                    backgroundColor: '#F9EA09',
                                    boxShadow: 'none',
                                  },}}
                                className=''
                                >
                                    Update Address
                                </Button>
                        </Grid>

                        <Grid item xs={6}  >
                                <Button 
                                fullWidth
                                onClick={handleClose}
                                variant='contained'
                                size='large'
                                sx={{padding:'.8rem 0',
                                     bgcolor:'#F74D28',  
                                     '&:hover': {
                                    backgroundColor: '#F74D28',
                                    boxShadow: 'none',
                                  },}}
                                >
                                    Close
                                </Button>
                        </Grid>
                </Grid>

                </form>
                </Box>
            </Modal>
        </div>
    )
}

const style2 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    outline:'none',
    boxShadow: 24,
    p: 4,
    
  };

const RemoveAddressModal = ({open, handleClose, id}) => {
    
    const dispatch = useDispatch();

    function handleRemoveAddress() {
        const data = {
            id : Number(id),
        }
        // console.log("Remove Address ReqData = ", data);
        dispatch(removeUserAddress(data));
        handleClose();
        toast.info("Address removed successfully ");
    }

    return (
        <Modal
          open={open}
          onClose={handleClose}
        >
            <Box sx={style2} >

                <div className='flex justify-between'>

                <div className='space-y-3'>
                    <h1 className='text-xl'>Do you want to remove this Address ?</h1>
                    <Button
                    
                     variant='contained'
                     size='large'
                    sx={{padding:'.4rem 0',
                        bgcolor:'#F74D28',  
                        '&:hover': {
                       backgroundColor: '#F74D28',
                       boxShadow: 'none',
                     },
                     width : '25%',
                     display: 'flex',
                     justifyItems : 'center'
                    }}
                    onClick={handleRemoveAddress}
                     >Yes
                     </Button>
                </div>
                <RxCross2 onClick={handleClose} className='text-right cursor-pointer text-2xl'/>
                </div>
            </Box>

        </Modal>
    )
}