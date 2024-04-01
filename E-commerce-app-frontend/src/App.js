import { Route, Routes } from 'react-router-dom';
import './App.css';
import Cart from './Customer/Components/Cart/Cart';
import Checkout from './Customer/Components/Checkout/Checkout';
import Footer from './Customer/Components/Footer/Footer';
import Navigation from './Customer/Components/Navigation/Navigation';
import Order from './Customer/Components/Order/Order';
import OrderDetails from './Customer/Components/Order/OrderDetails';
import ProductDetails from './Customer/Components/Product Details/ProductDetails';
import Product from './Customer/Components/Product/Product';
import HomePage from './Customer/Pages/HomePage/HomePage';
import CustomerRouter from './Routers/CustomerRouter';
import Admin from './Admin/Admin';
import AdminRouter from './Routers/AdminRouter';



function App() {
  return (
    <div>

      

          <Routes>
              <Route path='/*' element={<CustomerRouter/>} />
              <Route path='/admin/*' element={<AdminRouter/>} />
          </Routes>

    
        
    </div>
  );
}

export default App;
