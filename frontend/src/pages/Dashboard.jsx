
import React, { useEffect, useState } from 'react';
import { useAutoRefreshToken } from '../utils/useAutoRefreshToken.js';

import { useLogoutMutation } from '../redux/api';

import { useNavigate } from 'react-router-dom';

import { logout } from '../slices/authSlice';
import { useDispatch } from 'react-redux';


const Dashboard = () => {

  useAutoRefreshToken();

  const [message, setMessage] = useState('');
  const [logOut] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();



  useEffect(() => {
    const fetchProtected = async () => {
      const token = localStorage.getItem('accessToken');
      const res = await fetch('http://localhost:8080/api/protected', {
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include'
      });
      if (res.ok) {
        const data = await res.json();
        setMessage(data.message);
      } else {
        setMessage('Access denied');
        logOut();
        dispatch(logout());
        localStorage.clear();
        navigate('/');
      }
    };
    fetchProtected();
  }, []);





  const handleLogout = () => {
    logOut();
    dispatch(logout());
    localStorage.clear();
    navigate('/');

  }



  return (
    <div>
      <h1>{message}</h1>

      <button onClick={handleLogout}>Logout</button>


    </div>

  );
};

export default Dashboard;