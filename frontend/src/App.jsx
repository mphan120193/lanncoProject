import { ToastContainer } from 'react-toastify';
import './App.css'
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import { useSelector } from 'react-redux';
import { PATHS } from './constants/paths';

import Welcome from './pages/Welcome';
import RegisterScreen from './pages/RegisterScreen';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import CreateNewRegister from './pages/CreateNewRegister'
import EditRegisterPage from './pages/EditRegisterPage';

import InvoicePage from './pages/InvoicePage';
import CreateNewInvoice from './pages/CreateNewInvoice'
import EditInvoice from './pages/EditInvoicePage';
 

const ProtectedRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo ? <Outlet /> : (<Navigate to='/login' replace />);
};






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
        
        <Route path='' element={<ProtectedRoute />}>
          
          <Route path={PATHS.HOME} element={<HomePage />} />
          <Route path={PATHS.REGISTER_PAGE} element={<RegisterPage />} />
          <Route path={PATHS.NEWREGISTER_PAGE} element={<CreateNewRegister />} />
          <Route path={PATHS.EDITREGISTER_PAGE} element={<EditRegisterPage />} />
          
          <Route path={PATHS.INVOICE_PAGE} element={<InvoicePage />} />
          <Route path={PATHS.NEWINVOICE_PAGE} element={<CreateNewInvoice />} />
          <Route path={PATHS.EDITINVOICE_PAGE} element={<EditInvoice />} />

          




        </Route>





      </Routes>
    </>

  );
}

export default App;
