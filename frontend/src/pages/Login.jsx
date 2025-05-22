import './Login.css';
import React, { useState } from 'react';

import { useLoginMutation } from '../slices/usersApiSlice';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Card } from 'react-bootstrap';
import logoImage from '/Logo.png';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../slices/authSlice';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleLogin = async (e) => {
    e.preventDefault();

    

    try {
      
      const res = await login({ email, password }).unwrap();
      localStorage.setItem('accessToken', res.accessToken);
      dispatch(setCredentials({ _id: res._id , role: res.role, firstName: res.firstName}));

        
     

      
      
      navigate('/home');
      
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  
  return (
    <div className='login-screen-wrapper d-flex align-items-center justify-content-center py-5'>
        <Container className='login-container'>
            <Card className='login-card shadow-lg border-0 rounded-4'>
                <Card.Body className='p-5 text-center'>
                    {/* Optional: Add a logo here for brand consistency */}
                    <img
                        src={logoImage} 
                        alt="Sunshine Dental Care Logo"
                        className="mb-4 login-logo"
                        style={{ maxWidth: '100px', height: 'auto' }}
                    />
                    <h1 className='login-title mb-4'>Welcome Back!</h1>
                    <p className='login-subtitle text-muted mb-4'>Sign in to manage your appointments.</p>

                    <Form onSubmit={handleLogin}>
                        <Form.Group className='mb-3' controlId='email'>
                            <Form.Control
                                type='email'
                                placeholder='Enter email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='form-control-lg' // Larger input fields
                                autoComplete='email' // Enable browser auto-fill
                            />
                        </Form.Group>

                        <Form.Group className='mb-4' controlId='password'>
                            <Form.Control
                                type='password'
                                placeholder='Enter password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='form-control-lg' // Larger input fields
                                autoComplete='current-password' // Enable browser auto-fill
                            />
                        </Form.Group>

                        <Button
                            type='submit'
                            variant='primary'
                            className='login-button w-100' // Full width button
                            size='lg' // Larger button
                        >
                            Sign In
                        </Button>
                    </Form>

                    <div className='mt-4 text-center'>
                        <p className='text-muted'>
                            Don't have an account? <Link to='/register' className='register-link'>Register Here</Link>
                        </p>
                        
                    </div>
                </Card.Body>
            </Card>
        </Container>
    </div>
);
};

export default Login;