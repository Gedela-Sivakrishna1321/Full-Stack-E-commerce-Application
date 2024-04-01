import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../Customer/Pages/HomePage/HomePage'
import Navigation from '../Customer/Components/Navigation/Navigation'
import Footer from '../Customer/Components/Footer/Footer'
import Cart from '../Customer/Components/Cart/Cart'
import Product from '../Customer/Components/Product/Product'
import ProductDetails from '../Customer/Components/Product Details/ProductDetails'
import Checkout from '../Customer/Components/Checkout/Checkout'
import Order from '../Customer/Components/Order/Order'
import OrderDetails from '../Customer/Components/Order/OrderDetails'
import PaymentSuccess from '../Customer/Components/Payment/PaymentSuccess'

const CustomerRouter = () => {
  return (
    <div>

        <div>
            <Navigation/>
        </div>

        <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path='/login' element={<HomePage/>} />
            <Route path='/register' element={<HomePage/>} />
            <Route path='/cart' element={<Cart/>} />
            <Route path='/:lavelOne/:lavelTwo/:lavelThree' element={<Product/>} />
            <Route path='/product/:productId' element={<ProductDetails/>} />
            <Route path='/checkout' element={<Checkout/>} />
            <Route path='/account/order' element={<Order/>} />
            <Route path='/account/order/:orderId' element={<OrderDetails/>} />
            <Route path='/payment/:orderId' element={<PaymentSuccess/>} />
        </Routes>



        <div>
            <Footer/>
       </div>
   
   
    </div>
  )
}

export default CustomerRouter