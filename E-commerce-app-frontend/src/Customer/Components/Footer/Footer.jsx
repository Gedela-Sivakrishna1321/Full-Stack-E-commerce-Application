import { Button, Grid, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div>
            <Grid className='text-center mt-10' container
                sx={{ color: 'white', bgcolor: "black", py: 3 }} >

                <Grid item xs={12} sm={6} md={3}>
                    <Typography className='pb-5' variant='h6' >
                        Company
                    </Typography>
                    <div>
                        <Button className='pb-5' variant='h6'  >About</Button>
                    </div>
                    <div>
                        <Button className='pb-5' variant='h6'  >Blog</Button>
                    </div>
                    <div>
                        <Button className='pb-5' variant='h6'  >Press</Button>
                    </div>
                    <div>
                        <Button className='pb-5' variant='h6'  >Jobs</Button>
                    </div>
                </Grid>

                <Grid item xs={12} sm={6} md={3} >
                    <Typography className='pb-5' variant='h6' >
                        Solutions
                    </Typography>
                    <div>
                        <Button className='pb-5' variant='h6' gutterBottom >Marketing</Button>
                    </div>
                    <div>
                        <Button className='pb-5' variant='h6' gutterBottom >Analytics</Button>
                    </div>
                    <div>
                        <Button className='pb-5' variant='h6' gutterBottom >Commerce</Button>
                    </div>
                    <div>
                        <Button className='pb-5' variant='h6' gutterBottom >Insights</Button>
                    </div>
                </Grid>

                <Grid item xs={12} sm={6} md={3} >
                    <Typography className='pb-5' variant='h6' >
                        Documentation
                    </Typography>
                    <div>
                        <Button className='pb-5' variant='h6' gutterBottom >Guides</Button>
                    </div>
                    <div>
                        <Button className='pb-5' variant='h6' gutterBottom >API Status</Button>
                    </div>

                </Grid>

                <Grid item xs={12} sm={6} md={3} >
                    <Typography className='pb-5' variant='h6' >
                        Legal
                    </Typography>
                    <div>
                        <Button className='pb-5' variant='h6' gutterBottom >Claim</Button>
                    </div>
                    <div>
                        <Button className='pb-5' variant='h6' gutterBottom >Privacy</Button>
                    </div>
                    <div>
                        <Button className='pb-5' variant='h6' gutterBottom >Terms</Button>
                    </div>

                </Grid>

                {/* Footer */}
                <Grid className='pt-20' item xs={12} >

                    <Typography variant='body2' component='p' align='center' >
                        &copy; 2023 My Company. All rights reserved.
                    </Typography>

                    <Typography variant='body2' component='p' align='center' >
                        Made with love by Me.
                    </Typography>

                    <Typography variant='body2' component='p' align='center' >
                       
                        Icons made by {' '}
                        <Link href='https://www.freepik.com' color='inherit' underline='always' >
                            Freepik
                        </Link>
                        from {' '}
                        <Link href='https://www.flaticon.com' color='inherit' underline='always'>
                            www.flaticon.com
                        </Link>
                  
                    </Typography>


                </Grid>

            </Grid>
        </div>
    )
}

export default Footer