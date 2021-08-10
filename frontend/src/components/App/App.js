import { BrowserRouter, Routes, Route } from 'react-router-dom';
import VendorPastOrders from '../VendorPastOrders/VendorPastOrders';
import VendorRecentOrders from '../VendorCurrentOrders/VendorCurrentOrders';
import VendorDashboardHome from '../VendorDashboardHome/VendorDashboardHome';
import './App.css';
import UserAnalytics from '../UserAnalytics/UserAnalytics';
import Rewards from '../Rewards/Rewards';
import AccountProfile from '../AccountProfile/AccountProfile';
import Menu from '../Menu/Menu';
import Login from '../Login/Login'
import SignUp from "../SignUp/SignUp"
import Cart from '../Cart/Cart';
import PaymentForm from '../PaymentForm/PaymentForm';
import { AppStateProvider} from "../../contexts/appStateContext"
import CheckOut from '../CheckOut/CheckOut';
import Home from '../Home/Home';
import VendorProductPage from '../VendorProductPage/VendorProductPage';

export default function AppContainer(){
  return(
    <AppStateProvider>
      <App/>
    </AppStateProvider>
  )
}

function App() {
  return (
    <div className="App">
      {/* <PaymentForm></PaymentForm> */}
      <BrowserRouter>
      <Routes>
        <Route path="/checkout" element={<CheckOut/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/menu" element={<Menu/>}/>
        <Route path="/rewards" element={<Rewards/>}/>
        <Route path="/accountprofile" element={<AccountProfile/>}/>
        <Route path="/userAnalytics" element={<UserAnalytics/>}/>
         <Route path="/vendorDashboard" element={<VendorDashboardHome/>} />
        <Route path="/vendor/currentOrders" element={<VendorRecentOrders/>} />
        <Route path="/vendor/pastOrders" element={<VendorPastOrders/>} />
        <Route path="/vendor/products" element={<VendorProductPage/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

