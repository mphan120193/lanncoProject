import { ToastContainer } from 'react-toastify';
import './App.css'
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';

import Dashboard from './pages/Dashboard';
import Welcome from './pages/Welcome';
import RegisterScreen from './pages/RegisterScreen';
import HomePage from './pages/HomePage';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('accessToken');
  return token ? children : <Navigate to="/" replace />;
};

function App() {
  return (
    
    <Router>
      <ToastContainer />
      <Routes>
          <Route index={true} path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          
          <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />


          
       </Routes>
     </Router>
  );
}

export default App;
