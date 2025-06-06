import { ToastContainer } from 'react-toastify';
import './App.css'
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import { useSelector } from 'react-redux';
import { PATHS } from './constants/paths';
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
import ProfilePage from './pages/ProfilePage';

const ProtectedRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo ? <Outlet /> : (<Navigate to='/login' replace />);
};



// const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem('accessToken');
//   return token ? children : <Navigate to="/" replace />;
// };




function App() {


  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();



  useEffect(() => {

    if (!userInfo) {

      if (window.location.pathname !== PATHS.LOGIN && window.location.pathname !== PATHS.REGISTER && window.location.pathname !== PATHS.WELCOME) {
        console.log('User logged out or session expired. Navigating to welcome...');
        navigate(PATHS.WELCOME);
      }
    }
  }, [userInfo, navigate]);

  return (
    <>



      <ToastContainer />
      <Routes>
        <Route index={true} path={PATHS.WELCOME} element={<Welcome />} />
        <Route path={PATHS.LOGIN} element={<Login />} />

        <Route path={PATHS.REGISTER} element={<RegisterScreen />} />
        <Route path={PATHS.APPOINTMENT} element={<AppointmentPage />} />
        <Route path='' element={<ProtectedRoute />}>
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path={PATHS.HOME} element={<HomePage />} />
          <Route path={PATHS.ABOUT} element={<AboutPage />} />
          <Route path={PATHS.NEW_PATIENT} element={<NewPatientsPage />} />
          <Route path={PATHS.SERVICES} element={<ServicesPage />} />
          <Route path={PATHS.CONTACT} element={<ContactPage />} />

          <Route path={PATHS.PROFILE} element={<ProfilePage />} />

          <Route path={PATHS.SYSTEM_USER_MANAGE} element={<UserManageScreen />} />
          <Route path={PATHS.SYSTEM_CREATE_NEW_USER} element={<CreateNewUser />} />
          <Route path={PATHS.SYSTEM_MANAGE_DOCTOR} element={<ManageDoctor />} />

          <Route path={PATHS.SYSTEM_CUSTOMER_MESSAGE} element={<CustomerMessagePage />} />
          <Route path={PATHS.SYSTEM_MANAGE_DOCTOR_SCHEDULE} element={<ManageDoctorSchedule />} />
          <Route path={PATHS.CONFIRM_EMAIL} element={<ConfirmMail />} />
          <Route path={PATHS.GET_DOCTOR_DETAIL} element={<DoctorDetailPage />} />




        </Route>





      </Routes>
    </>

  );
}

export default App;
