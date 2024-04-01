import { Box, CssBaseline, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import React, { useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import InboxIcon from '@mui/icons-material/Inbox';
import Dashboard from './Components/Dashboard';
import CustomersTable from './Components/CustomersTable';
import OrdersTable from './Components/OrdersTable';
import ProductsTable from './Components/ProductsTable';
import CreateProductForm from './Components/CreateProductForm';
import AdminDashboard from './Components/Dashboard';

const Admin = () => {

    const menu = [
        {name : "Dashboard", path : '/admin', icon : <DashboardIcon/>},
        {name : "Products", path : '/admin/products', icon : <DashboardIcon/>},
        {name : "Customers", path : '/admin/customers', icon : <DashboardIcon/>},
        {name : "Orders", path : '/admin/orders', icon : <DashboardIcon/>},
        {name : "AddProduct", path : '/admin/product/create', icon : <DashboardIcon/>}
    ];

    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
    const [sideBarVisible, setSideBarVisible] = useState(false);
    const navigate = useNavigate();

    const drawer = (
      <Box
        sx={{
          overflow:"auto",
          display:"flex",
          flexDirection:"column",
          justifyContent: "space-between",
          height:'100%',
        }}
      >
          {/* {isLargeScreen && <Toolbar/>} */}

          <List>
              {menu.map((item, index) => <ListItem key={item.name} disablePadding onClick={() => navigate(item.path)} >
                    <ListItemButton>
                        
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>

                        <ListItemText>
                            {item.name}
                        </ListItemText>

                    </ListItemButton>
              </ListItem>)}
          </List>
          
          <List>
            <ListItem  disablePadding  >
                    <ListItemButton>
                        <ListItemIcon>
                            <AccountCircleIcon/>
                        </ListItemIcon>

                        <ListItemText>
                            Account
                        </ListItemText>
                    </ListItemButton>
              </ListItem>
          </List>


      </Box>
    )



  return (

        <div className='flex h-[100vh]  relative' >
              <CssBaseline/>

              <div  className='w-[15%] shadow-lg shadow-gray-600 h-full fixed '
              >
                  {drawer}
              </div>

              <div className='w-[85%] ml-[15%]'>
                  <Routes>
                      <Route path='/' element={<AdminDashboard/>} />
                      <Route path='/product/create' element={<CreateProductForm/>} />
                      <Route path='/products' element={<ProductsTable/>} />
                      <Route path='/orders' element={<OrdersTable/>} />
                      <Route path='/customers' element={<CustomersTable/>} />
                  </Routes>
              </div>
        </div>
    
  )
}

export default Admin