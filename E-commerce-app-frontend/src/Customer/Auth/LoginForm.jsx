import { Button, Grid, TextField } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../Redux/Auth/Action';

const LoginForm = ({handleClose}) => {

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
                <Button  onClick={() => navigate('/register')}
                 className='ml-5' size='small' >Register</Button>
            </div>
        </div>
    </div>
  )
}

export default LoginForm