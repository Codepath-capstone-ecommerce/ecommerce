import { BrowserRouter, Routes, Route } from 'react-router-dom';
import VendorPastOrders from '../VendorPastOrders/VendorPastOrders';
import VendorRecentOrders from '../VendorCurrentOrders/VendorCurrentOrders';
import VendorDashboardHome from '../VendorDashboardHome/VendorDashboardHome';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/vendorDashboard" element={<VendorDashboardHome/>} />
        <Route path="/vendor/currentOrders" element={<VendorRecentOrders/>} />
        <Route path="/vendor/pastOrders" element={<VendorPastOrders/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
