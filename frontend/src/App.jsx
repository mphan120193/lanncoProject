import { ToastContainer } from 'react-toastify';
import './App.css'
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import Login from './pages/Login';
import { useSelector } from 'react-redux';

import Dashboard from './pages/Dashboard';
import Welcome from './pages/Welcome';
import RegisterScreen from './pages/RegisterScreen';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NewPatientsPage from './pages/NewPatientsPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import UserManageScreen from './pages/UserManageScreen';
import CreateNewUser from './pages/CreateNewUser';
import ManageDoctor from './pages/ManageDoctor';
import CustomerMessagePage from './pages/CustomerMessagePage';
import ManageDoctorSchedule from './pages/ManageDoctorSchedule';
import AppointmentPage from './pages/AppointmentPage';
import ConfirmMail from './pages/ConfirmMail';
import DoctorDetailPage from './pages/DoctorDetailPage';

// const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem('accessToken');
//   return token ? children : <Navigate to="/" replace />;
// };
const ProtectedRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo ? <Outlet /> : (<Navigate to='/login' replace />);
};

function App() {
  return (

    <Router>
      <ToastContainer />
      <Routes>
        <Route index={true} path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/appointment" element={<AppointmentPage />} />
        <Route path='' element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/new-patient" element={<NewPatientsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />

          <Route path="/system/user-manage" element={<UserManageScreen />} />
          <Route path="/system/create-new-user" element={<CreateNewUser />} />
          <Route path="/system/manage-doctor" element={<ManageDoctor />} />

          <Route path="/system/customer-message" element={<CustomerMessagePage />} />
          <Route path="/system/manage-doctor-schedule" element={<ManageDoctorSchedule />} />
          <Route path="/confirm-email" element={<ConfirmMail />} />
          <Route path="/get-doctor-detail/:id" element={<DoctorDetailPage />} />



        </Route>





      </Routes>
    </Router>
  );
}

export default App;
