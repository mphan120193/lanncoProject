
import './HomeHeader.scss';
import { useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaUserPlus, } from 'react-icons/fa';
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/userApiSlice';

import { logout } from '../slices/authSlice';

import React from 'react';





const HomeHeader = () => {

    const { userInfo } = useSelector((state) => state.auth);

    const navigate = useNavigate();

    






    const dispatch = useDispatch();
    const [logoutApiCall] = useLogoutMutation();




    



    const logoutHandler = async () => {

        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            localStorage.clear();
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };



    return (





        <header className='main-header'>

            


            <Navbar expand="lg" className="navbar-custom py-3">
                <Container>
                    <Navbar.Brand onClick={() => { navigate('/home') }} className='navbar-brand-custom'>

                        
                        <span className="brand-text">Lannco</span>
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">

                        <Nav className="mx-auto main-nav-links">
 
                            
                            <Nav.Link onClick={() => { navigate('/invoice-page') }}>INVOICE</Nav.Link>
                        </Nav>


                        <Nav className="ms-auto auth-nav-links">
                            {userInfo ? (
                                <NavDropdown title={userInfo.firstName || 'Profile'} id='user-profile-dropdown'>
                                    
                                    
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <>
                                    {/* <Nav.Link to="/login" className="me-2">
                                        <Button onClick={() => { navigate('/login') }} variant="outline-primary" className="header-auth-button">
                                            <FaSignInAlt className='me-1' /> Sign In
                                        </Button>
                                    </Nav.Link>
                                    <Nav.Link to="/register">
                                        <Button onClick={() => { navigate('/register') }} variant="primary" className="header-auth-button">
                                            <FaUserPlus className='me-1' /> Register
                                        </Button>
                                    </Nav.Link> */}
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>






    )


}

export default HomeHeader;