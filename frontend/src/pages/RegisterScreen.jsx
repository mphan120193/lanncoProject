import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Card, Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useRegisterMutation } from '../slices/userApiSlice';
import './RegisterScreen.css';
import logoImage from '/Logo.png';


const RegisterScreen = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const navigate = useNavigate();
    const [register] = useRegisterMutation(); 
    const submitHandler = async (e) => {
        e.preventDefault();




        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        try {
            const res = await register({ firstName, lastName, email, password }).unwrap();

            navigate('/login');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <div className='register-screen-wrapper d-flex align-items-center justify-content-center py-5'>
            <Container className='register-container'>
                <Card className='register-card shadow-lg border-0 rounded-4'>
                    <Card.Body className='p-5 text-center'>

                        <img
                            src={logoImage}
                            alt="Sunshine Dental Care Logo"
                            className="mb-4 register-logo"
                            style={{ maxWidth: '320px', height: 'auto' }}
                        />
                        <h1 className='register-title mb-4'>Create Your Account</h1>
                        <p className='register-subtitle text-muted mb-4'>Join Sunshine Dental Care today.</p>

                        <Form onSubmit={submitHandler}>
                            <Form.Group className='mb-3' controlId='firstName'>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter first name'
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className='form-control-lg'
                                    required
                                />
                            </Form.Group>
                            <Form.Group className='mb-3' controlId='lastName'>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter last name'
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className='form-control-lg'
                                    required
                                />
                            </Form.Group>

                            <Form.Group className='mb-3' controlId='email'>
                                <Form.Control
                                    type='email'
                                    placeholder='Enter email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='form-control-lg'
                                    autoComplete='email'
                                    required
                                />
                            </Form.Group>

                            <Form.Group className='mb-3' controlId='password'>
                                <Form.Control
                                    type='password'
                                    placeholder='Enter password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='form-control-lg'
                                    autoComplete='new-password'
                                    required
                                />
                            </Form.Group>

                            <Form.Group className='mb-4' controlId='confirmPassword'>
                                <Form.Control
                                    type='password'
                                    placeholder='Confirm password'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className='form-control-lg'
                                    autoComplete='new-password'
                                    required
                                />
                            </Form.Group>

                            <Button
                                type='submit'
                                variant='primary'
                                className='register-button w-100'
                                size='lg'

                            >
                                Register
                            </Button>
                        </Form>

                        <div className='mt-4 text-center'>
                            <p className='text-muted'>
                                Already have an account? <Link to='/login' className='login-link'>Sign In Here</Link>
                            </p>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default RegisterScreen;