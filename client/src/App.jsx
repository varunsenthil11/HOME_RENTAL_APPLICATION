import './App.css';
import React from 'react';
import Layout from './helpers/Layout';
import Indexpage from './pages/Indexpage';
import Loginpage from './pages/Loginpage';
import Addplacespage from './pages/Addplacespage';
import Registerpage from './pages/Registerpage';
import { Usercontextprovider } from './Usercontext';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import axios from 'axios';
import Profilepage from './pages/Profilepage';
import Placespage from './pages/Placespage';
import Placesdefine from './pages/Placesdefine';
import Bookingpage from './pages/Bookingpage';
import Bookingspage from './pages/Bookingspage';
import Accountpage from './pages/Accountpage';
import Forgotpassword from './pages/Forgotpassword';
import Changepassword from './pages/Changepassword';
axios.defaults.withCredentials = true;

function App() {
  return (
    <div>
      <Usercontextprovider>
        <Router>
          <AppRoutes />
        </Router>
      </Usercontextprovider>
    </div>
  );
}

function AppRoutes() {
  const location = useLocation();
  
  if (location.pathname === '/forgot_password'||location.pathname==='/changepassword') {
    return (
      <Routes>
        <Route path="/forgot_password" element={<Forgotpassword />} />
        <Route path="/changepassword" element={<Changepassword />} />
      </Routes>
    );
  }

  return (
    <>
      <Layout />
      <Routes>
        <Route path="/" element={<Indexpage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/Register" element={<Registerpage />} />
        <Route path="/Accounts" element={<Accountpage />} />
        <Route path="/Accounts/profile" element={<Profilepage />} />
        <Route path="/Accounts/places" element={<Placespage />} />
        <Route path="/Accounts/places/new" element={<Addplacespage />} />
        <Route path="/Accounts/places/:id" element={<Addplacespage />} />
        <Route path="/places/:id" element={<Placesdefine />} />
        <Route path="/Accounts/bookings" element={<Bookingspage />} />
        <Route path="/Accounts/bookings/:id" element={<Bookingpage />} />
      </Routes>
    </>
  );
}

export default App;
