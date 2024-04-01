import { Avatar, Box, Card, CardContent, CardHeader, Grid, IconButton, Typography } from '@mui/material'
import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { TrendingUp } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsCellIcon from '@mui/icons-material/SettingsCell';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const MonthlyOverview = () => {

    const salesData = [
        {
          stats : '245k',
          title : 'Sales',
          color : '#E5D68A',
          icon : <TrendingUp sx={{fontSize:'1.75rem'}} />
        },
        {
          stats : '12.5k',
          title : 'Customers',
          color : '#22CB5C',
          icon : <AccountCircleIcon sx={{fontSize:'1.75rem'}}/>
        },
        {
          stats : '1.54k',
          title : 'Products',
          color : '#DE4839',
          icon : <SettingsCellIcon sx={{fontSize:'1.75rem'}}/>
        },
        {
          stats : '88k',
          title : 'Revenue',
          color : '#12B0E8',
          icon : <AttachMoneyIcon sx={{fontSize:'1.75rem'}}/>
        }
    
      ]

    const renderStats = () => {

        return salesData.map((item, index) => (
            <Grid item xs={12} sm={3} key={index} >
                <Box 
                    sx={{
                        display:'flex', alignItems:'center'
                    }}
                >
                    <Avatar variant='rounded' sx={{
                        mr:3,
                        width:44,
                        height:44,
                        boxShadow:3,
                        color : 'white',
                        backgroundColor : `${item.color}`
                    }}   >
                        {item.icon}
                    </Avatar>

                    <Box sx={{display:'flex', flexDirection:'column'}}>
                        <Typography variant='caption'  > {item.title} </Typography>
                        <Typography variant='h6'  > {item.stats} </Typography>
                    </Box>

                </Box>
            </Grid>
        ))
    }

  return (
    <div>
        <Card sx={{}}>
            <CardHeader title='Monthly Overview'
                action={
                    <IconButton size='small' color='white' >
                        <MoreVertIcon  className='text-white' />
                    </IconButton>
                }

                subheader= {
                    <Typography variant='body2' >
                        <Box component="span" sx={{fontWeight:600, color: ''}} >
                            Total 48.5% growth
                        </Box>
                        😍 this month
                    </Typography>
                }

                titleTypographyProps={
                    {
                        sx : {
                            mb:2.5,
                            lineHeight : '2rem !important',
                            letterSpacing : '.15px !important'
                        }
                    }
                }
            >
                 
            </CardHeader>

            <CardContent sx={{pt:theme=>`${theme.spacing(3)} !important`}} >
                <Grid container spacing={[5,0]} >
                    {renderStats()}
                </Grid>
            </CardContent>
        </Card>
    </div>
  )
}

export default MonthlyOverview