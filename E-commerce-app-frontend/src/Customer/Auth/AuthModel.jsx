import { Box, Modal, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
// import RegisterForm from './RegisterForm';
import { useLocation } from 'react-router-dom';
// import LoginForm from './LoginForm';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../Redux/Auth/Action';
import { Button, Grid, TextField } from '@mui/material'
import { getUser, register } from '../../Redux/Auth/Action';
import GoogleButton from 'react-google-button'
import '../../index.css'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    outline:'none',
    boxShadow: 24,
    p: 4,
  };

  
  const AuthModel = ({handleClose, open}) => {
      
      const location = useLocation();
      const navigate = useNavigate();
      const [toggle, setToggle] = useState(true);
      const path = location.pathname;
      console.log("Path Name = ", path);
      const [togglePath, SetTogglePath] = useState('/login');

      function handleToggle() {
        setToggle(!toggle);
        // navigate('/')
      }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    
                   {toggle  ? <LoginForm handleToggle={handleToggle} handleClose={handleClose} />  : <RegisterForm handleToggle={handleToggle} />}

                </Box>
            </Modal>
        </div>
    )
}

export default AuthModel


const LoginForm = ({handleClose, handleToggle}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const userdata = {
            email : data.get("email"),
            password : data.get("password")
        }
        dispatch(login(userdata))
        console.log(userdata);
        // navigate('/')
        handleClose();
    }

  return (
    <div>
        <form onSubmit={handleSubmit} >

        <Grid container spacing={3} >
                
                
                <Grid item xs={12}  >
                        <TextField 
                          required
                          id='email'
                          name='email'
                          label='Email'
                          fullWidth
                          autoComplete='email'
                        />
                </Grid>

                <Grid item xs={12}  >
                        <TextField 
                          required
                          id='password'
                          name='password'
                          label='Password'
                          type='password'
                          fullWidth
                          autoComplete='password'
                        />
                </Grid>
              
                <Grid item xs={12}  >
                        <Button 
                        fullWidth
                         type='submit'
                         variant='contained'
                         size='large'
                         sx={{padding:'.8rem 0', bgcolor:'#9155fd'}}
                        >
                            Login
                        </Button>
                </Grid>
        </Grid>
       
        </form>

        <div className='flex justify-center flex-col items-center'>
            <div className='py-3 flex items-center'>
                <p >If you don't have account ? </p>
                <Button  onClick={() => {
                  handleToggle();
                  navigate('/register')
                }}
                 className='ml-5' size='small' >Register</Button>
            </div>

            <div className='w-full flex justify-center items-center flex-col space-y-3'>
                
                <div className='flex justify-center items-center space-x-4'>
                  <hr className='w-1/3 hr-color' />
                  <span>or</span>
                  <hr className='w-1/3 hr-color' />
                </div>

                <GoogleButton
                  onClick={() => { console.log('Google button clicked') }}
                />
            </div>
        </div>
    </div>
  )
}

// export default LoginForm

const RegisterForm = ({handleToggle}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const {auth} = useSelector(store => store);

    useEffect(()=>{
      if(jwt) {
        dispatch(getUser(jwt))
      }
    }, [jwt, auth.jwt])



    function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const userdata = {
            firstName : data.get("firstName"),
            lastName : data.get("lastName"),
            email : data.get("email"),
            password : data.get("password")
        }
        dispatch(register(userdata));
        console.log(userdata);
    }
  return (
    <div>
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
                        />
                </Grid>
                <Grid item xs={12}  >
                        <TextField 
                          required
                          id='email'
                          name='email'
                          label='Email'
                          fullWidth
                          autoComplete='email'
                        />
                </Grid>

                <Grid item xs={12}  >
                        <TextField 
                          required
                          id='password'
                          name='password'
                          label='Password'
                          type='password'
                          fullWidth
                          autoComplete='password'
                        />
                </Grid>
              
                <Grid item xs={12}  >
                        <Button 
                        fullWidth
                         type='submit'
                         variant='contained'
                         size='large'
                         sx={{padding:'.8rem 0', bgcolor:'#9155fd'}}
                        >
                            Register
                        </Button>
                </Grid>
        </Grid>
       
        </form>

        <div className='flex justify-center flex-col items-center'>
            <div className='py-3 flex items-center'>
                <p >If you already have account ? </p>
             

                  <Button  onClick={() => {
                    handleToggle();
                    navigate('/login')
                  }}
                  className='ml-5' size='small' > Login </Button>        
            </div>
        </div>

        

    </div>
  )
}