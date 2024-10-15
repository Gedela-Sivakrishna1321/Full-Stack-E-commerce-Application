import React, { useEffect, useState } from 'react';
import { Box, Button, CssBaseline, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Modal, TextField, useMediaQuery, useTheme } from '@mui/material';
import { Route, Routes, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Dashboard from './Components/Dashboard';
import CustomersTable from './Components/CustomersTable';
import OrdersTable from './Components/OrdersTable';
import ProductsTable from './Components/ProductsTable';
import CreateProductForm from './Components/CreateProductForm';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, logout, updateUserProfile } from '../Redux/Auth/Action';
import { toast, ToastContainer  } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { sendEmailOtp, sendMobileOtp } from '../Redux/Address/Action';


const Admin = () => {
  const menu = [
    { name: "Dashboard", path: '/admin', icon: <DashboardIcon /> },
    { name: "Products", path: '/admin/products', icon: <DashboardIcon /> },
    { name: "Customers", path: '/admin/customers', icon: <DashboardIcon /> },
    { name: "Orders", path: '/admin/orders', icon: <DashboardIcon /> },
    { name: "AddProduct", path: '/admin/product/create', icon: <DashboardIcon /> }
  ];

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state?.auth?.user)
  

  function handleClose() {
    setOpenModal(false);
  }

  function handleOpen() {
    setOpenModal(true);
  }

  useEffect(()=>{
    dispatch(getUser(localStorage.getItem("jwt")));
  },[])

  useEffect(() => {
    if (openModal) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      // Apply padding to prevent layout shift
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;

      // Adjust fixed sidebar position
      document.querySelector('.fixed-sidebar').style.paddingRight = `${scrollbarWidth}px`;
    } else {
      // Reset styles when the modal closes
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';

      // Reset fixed sidebar position
      document.querySelector('.fixed-sidebar').style.paddingRight = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      if (document.querySelector('.fixed-sidebar')) {
        document.querySelector('.fixed-sidebar').style.paddingRight = '';
      }
    };
  }, [openModal]);

  const drawer = (
    <Box
      sx={{
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: '100%',
      }}
    >
      <List>
        {menu.map((item) => (
          <ListItem key={item.name} disablePadding onClick={() => navigate(item.path)} >
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText>{item.name}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleOpen}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText>Account</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div className='flex h-[100vh] relative'>
      <CssBaseline />
      <div 
      className='w-[15%] shadow-lg shadow-gray-600 h-full fixed fixed-sidebar'>
        {drawer}
      </div>
      <div className='w-[85%] ml-[15%]'>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/product/create' element={<CreateProductForm />} />
          <Route path='/products' element={<ProductsTable />} />
          <Route path='/orders' element={<OrdersTable />} />
          <Route path='/customers' element={<CustomersTable />} />
        </Routes>
      </div>
      <ManageProfileModal open={openModal} handleClose={handleClose} />
    </div>
  );
};

export default Admin;

const style = {
  position: 'absolute',
  bottom: '2%',
  left: '17%',
  transform: 'translate(-50%, -50%)',
  width: 150,
  bgcolor: 'white',
  outline: 'none',
  boxShadow: 4,
  borderRadius: 2,
};

export const ManageProfileModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store?.auth?.user);
  console.log("User Data in Manage Profile Data = ", user);
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [formData, setFormData] = useState({
    id : '',
    firstName : '',
    lastName : '',
    email : '',
    mobile : '',
});

  function handleLogout() {
    dispatch(logout());
    handleClose();
    navigate("/");
    toast.success('Logged out successfully ')
  }

  function handleUpdateProfile() {
    const data = {
        id : user?.id,
        firstName : user?.firstName,
        lastName : user?.lastName,
        email : user?.email,
        mobile : user?.mobile,
    }
    setFormData(data);
    console.log("Update Profile Data = ", formData);
    setOpenProfileModal(true);
  }

  function handleProfileModalClose(event, reason) {
    if(reason === 'backdropClick') {
        return;
    }
    setOpenProfileModal(false);
    handleClose();
  }

  const handleUpdatedInputChange = (e) => {
    const {name, value} = e.target;
    console.log(value);
    setFormData(
        {...formData,
        [name] : value,}
    )
}

  return (
    <div>

    <Modal
      open={open}
      onClose={handleClose}
      BackdropProps={{
        style: { backgroundColor: 'transparent' }, // Transparent backdrop
      }}
    >
      <Box sx={style}>
        <ul className='px-1 py-2'>
          <li  onClick={handleUpdateProfile}
           className='hover:cursor-pointer hover:scale-105 transition-all ease-in-out duration-200 px-4 py-1'>Profile</li>
          <li className='hover:cursor-pointer hover:scale-105 transition-all ease-in-out duration-200 px-4 py-1'
            onClick={handleLogout}
          >Logout</li>
        </ul>
      </Box>
    </Modal>

    <EditProfileModel open={openProfileModal} handleClose={handleProfileModalClose} formData={formData} handleUpdatedInputChange={handleUpdatedInputChange} toast={toast} />
    </div>
  );
};

const style2 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    outline:'none',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px',
  };

export const EditProfileModel = ({open, handleClose, formData, handleUpdatedInputChange, toast}) => {

    const dispatch = useDispatch();
    const [mobileOtpVisibile, setMobileOtpVisibile] = useState(false);
    const [emailOtpVisibile, setEmailOtpVisibile] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [isEmailVerified, setisEmailVerified] = useState(true);
    const [isMobileVerified, setisMobileVerified] = useState(true);
    const [emailOrMobile, setEmailOrMobile] = useState("");
    // const user = useSelector(state => state?.auth?.user);

    const openOtpModal = () => {
      console.log("Verifying = ", emailOrMobile);
      setOpenModal(true);
    }

    const handleCloseOtpModal = (event, reason) => {
      if(reason === 'backdropClick') {
        return;
    }
      setOpenModal(false);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

       const  reqData = {
            // id : formData.id,
            firstName : data.get("firstName"),
            lastName : data.get("lastName"),
            email : data.get("email"),
            mobile : data.get("mobile")
        }

        if(!isEmailVerified) {
          toast.warn("Email Not Verified ");
        }
        else if (!isMobileVerified) {
          toast.warn("Mobile Number Not Verified ");
        }
        else {
          
                  console.log("Updated Profile Data = ", reqData);
                  dispatch(updateUserProfile(reqData));
                  toast.success("Profile updated successfully ");
                  handleClose();

        }
    }

 

    return (
        <div>
            <Modal 
                open={open}
                onClose={handleClose}
                disableBackdropClick={{ onClick: (event) => event.stopPropagation() }}
            >
                <Box sx={style2}>
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
                        <Grid item xs={12} sm={6}  >
                                <TextField 
                                required
                                id='email'
                                name='email'
                                label='email'
                                fullWidth
                                type='email'
                                autoComplete='email'
                                value={formData.email}
                                onChange={(e) => {
                                  setisEmailVerified(false);
                                  handleUpdatedInputChange(e);
                                }}
                                aria-readonly='true'
                                readOnly
                                />
                                {/* <p className='hover:text-yellow-600 hover:underline text-end cursor-pointer'>Edit</p> */}
                                {!isEmailVerified ? <p onClick = {() => {
                                  setEmailOrMobile("EMAIL");
                                  dispatch(sendEmailOtp({
                                    email : formData.email
                                  }))
                                  toast.success("Otp sent your email successfully ");
                                  openOtpModal();
                                }}
                                 className='text-blue-400 text-end text-sm mt-1 cursor-pointer'>Verify</p> 
                                :
                               
                                <div className='w-full flex justify-end '>
                                  <img 
                                  className='h-9 w-9 '
                                  src="https://res.cloudinary.com/dheuqshro/image/upload/v1728727843/E-commerce%20Project/Verified_Tick-removebg-preview_x5qtma.png" alt="" />
                              </div>
                                }
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
                                onChange={(e)=>{
                                  setisMobileVerified(false);
                                  handleUpdatedInputChange(e);
                                }}
                                />
                               {!isMobileVerified ? <p onClick={() => {
                                  setEmailOrMobile("MOBILE");
                                  if(formData?.mobile?.length == 10) {
                                      dispatch(sendMobileOtp({
                                        mobileNumber : formData.mobile
                                      }))
                                      toast.success("Otp sent to your mobile successfully ");
                                      openOtpModal();
                                  }
                                  else {
                                    toast.warn("Enter Valid Mobile Number ");
                                  }
                                }}
                                className='text-blue-400 text-end text-sm mt-1 cursor-pointer'>Verify</p>
                              :
                               <div className='w-full flex justify-end '>
                                {formData.mobile &&
                                  <img 
                                className='h-9 w-9 '
                                 src="https://res.cloudinary.com/dheuqshro/image/upload/v1728727843/E-commerce%20Project/Verified_Tick-removebg-preview_x5qtma.png" alt="" />}
                              </div>
                                }
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
                                    Update 
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
            <OtpModal emailOrMobile={emailOrMobile} 
              open={openModal} close={handleCloseOtpModal}
              handleEmailVerified={setisEmailVerified}
              handleMobileVerified={setisMobileVerified}
              ></OtpModal>
        </div>
    )
}


const style3 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  outline: 'none',
  boxShadow: 24,
  p: 4,
  borderRadius: '8px', 
};

export const OtpModal = ({emailOrMobile, open, close, handleEmailVerified, handleMobileVerified }) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const generatedOtp = useSelector(state => state?.address?.otp);
  // console.log("Backend Otp = ", generatedOtp);
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Automatically focus on the next input field
      if (value && index < 5) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalOtp = otp.join(""); // Combine OTP values into a single string
    console.log("Entered OTP:", finalOtp);
    // Handle the OTP submission logic here
    if(finalOtp == generatedOtp) {

        // Verified Check Mark
        if(emailOrMobile == "EMAIL") {
          toast.success("Email verified successfully ");
          handleEmailVerified(true);
        }
        if(emailOrMobile == "MOBILE") {
          toast.success("Mobile verified successfully ");
          handleMobileVerified(true);
        }
        close();
        setOtp(new Array(6).fill(""));
    }
    else {
      toast.error("Invalid otp entered ");
    }
  };

  function closeOtpModal() {
    close();
    setOtp(new Array(6).fill(""));
  }

  return (
    <div>
      
      <Modal open={open} onClose={close}>
        <Box sx={style3}>
            <div onClick={closeOtpModal}
             className='flex w-full justify-end'>
              <img className='h-5 w-5 cursor-pointer'
              src="data:image/png;base64,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" alt="" />
            </div>
          <Grid container spacing={1} sx={{ justifyContent: 'center', alignItems: 'center' }}> 
            <Grid item sx={{ padding: 0, textAlign: 'center' }}>
              <p className='text-xl'>Enter the OTP</p>
              <div className='mb-1'>
                {otp.map((value, index) => (
                  <input
                    key={index}
                    id={`otp-input-${index}`}
                    className='w-[40px] h-[40px] m-1 text-center border border-black'
                    type="text"
                    value={value}
                    onChange={(e) => handleChange(e, index)}
                    maxLength="1"
                  />
                ))}
              </div>
              <Button 
                fullWidth
                type='submit'
                variant='contained'
                size='large'
                onClick={handleSubmit}
                sx={{
                  padding: '.8rem 0',
                  bgcolor: '#11ed4b',
                  color: 'black',
                  '&:hover': {
                    backgroundColor: '#11ed4b',
                    boxShadow: 'none',
                  },
                }}
              >
                Submit 
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>

        <ToastContainer/>
    </div>
  );
};
