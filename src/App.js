import logo from './logo.svg';
import './styles/App.css';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import LayoutNavbar from './pages/LayoutNavbar';
import Home from './pages/Home';
import Booking from './pages/Booking';
import About from './pages/About';
import Menu from './pages/Menu';
import Basket from './pages/Basket';
import Login from './pages/Login';
import Register from './pages/Register';
// import Admin from './pages/Admin';
import AdminMenu from './pages/admin/Admin-Menu';
import Admin from './pages/admin/Admin';
import AdminBooking from './pages/admin/Admin-Booking';
import AdminReport from './pages/admin/Admin-Report';
import AdminOrders from './pages/admin/Admin-Orders';
import SelectBooking from './pages/admin/select_booking';
import SettingTime from './pages/admin/setting_times';
import AdminWalkIn from './pages/admin/Admin-WalkIn';

function App() {
  return (
    <div className="App">
      {/* <h1>Food lance</h1> */}
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path='/' element={<LayoutNavbar />}>
            <Route index element={<Home />} />
            {/* <Route path='menu' element={<Menu />} /> */}
            <Route path='booking' element={<Booking />} />
            <Route path='about' element={<About />} />
            {/* <Route path='basket' element={<Basket />} /> */}
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='admin' element={<Admin />} />
            <Route path='admin-menu' element={<AdminMenu />} />
            <Route path='admin-booking' element={<AdminBooking />} />
            <Route path='admin-walkIn' element={<AdminWalkIn />} />
            <Route path='admin-report' element={<AdminReport />} />
            <Route path='admin-kitchen' element={<AdminOrders />} />
            <Route path='select-booking' element={<SelectBooking />} />
            <Route path='setting-times' element={<SettingTime />} />
          </Route>

          <Route path='menu' element={<Menu />} />
          <Route path='basket' element={<Basket />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
