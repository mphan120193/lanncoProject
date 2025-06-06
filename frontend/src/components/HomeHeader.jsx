
import './HomeHeader.scss';
import { useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaUserPlus, FaSignOutAlt, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/userApiSlice';
import { useGetDoctorListQuery } from '../slices/doctorApiSlice';
import { logout } from '../slices/authSlice';
import logoImage from '/Logo.png';
import React from 'react';





const HomeHeader = () => {

    const { userInfo } = useSelector((state) => state.auth);

    const navigate = useNavigate();

    const { data: doctorArrList, isLoading, isError, error } = useGetDoctorListQuery();

    const doctorArr = doctorArrList?.data;






    const dispatch = useDispatch();
    const [logoutApiCall] = useLogoutMutation();




    const handleGetDoctorDetail = (doctorID) => {
        console.log('Selected doctor ID ', doctorID);

        navigate(`/get-doctor-detail/${doctorID}`);




    }



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

            <div className='top-contact-bar bg-primary text-white py-2'>
                <Container className="d-flex justify-content-between align-items-center">
                    <div className='contact-item'>
                        <FaMapMarkerAlt className='me-2' />
                        5918 DR M.L.K Jr St N St.Petersburg, FL 33703
                    </div>
                    <div className='contact-item'>
                        <FaPhone className='me-2' />
                        (727) 310-9596
                    </div>
                </Container>
            </div>


            <Navbar expand="lg" className="navbar-custom py-3">
                <Container>
                    <Navbar.Brand onClick={() => { navigate('/home') }} className='navbar-brand-custom'>

                        <img
                            src={logoImage}
                            alt="Sunshine Dental Logo"
                            className="logo-img me-2"
                            style={{ maxWidth: '150px', height: 'auto' }}
                        />
                        <span className="brand-text">Sunshine Dental</span>
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">

                        <Nav className="mx-auto main-nav-links">


                            <NavDropdown title={<span onClick={() => navigate('/about')} style={{ cursor: 'pointer' }}>
                                ABOUT
                            </span>} id="about-nav-dropdown">


                                {doctorArr && doctorArr.length > 0 ? (
                                    doctorArr.map((doctor, index) => (

                                        <React.Fragment key={doctor._id}>

                                            <NavDropdown.Item onClick={() => handleGetDoctorDetail(doctor._id)} >
                                                {doctor.firstName}
                                            </NavDropdown.Item>
                                            {index < doctorArr.length - 1 && <NavDropdown.Divider />}
                                        </React.Fragment>
                                    ))
                                ) : (
                                    <NavDropdown.Item disabled>No Doctors Available</NavDropdown.Item>
                                )}



                            </NavDropdown>

                            
                            <Nav.Link onClick={() => { navigate('/new-patient') }} > NEW PATIENT</Nav.Link>

                            <Nav.Link onClick={() => { navigate('/appointment') }} to="/appointment">APPOINTMENTS</Nav.Link>


                            <NavDropdown title="SERVICES" id="services-nav-dropdown" onClick={() => { navigate('/services') }}>

                                <NavDropdown.Item href="#action/3.4">
                                    General Dentistry
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Cosmetic Dentistry
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Restorative Dentistry
                                </NavDropdown.Item>

                            </NavDropdown>

                            <Nav.Link onClick={() => { navigate('/contact') }}>CONTACT</Nav.Link>
                        </Nav>


                        <Nav className="ms-auto auth-nav-links">
                            {userInfo ? (
                                <NavDropdown title={userInfo.firstName || 'Profile'} id='user-profile-dropdown'>
                                    <NavDropdown.Item onClick={() => { navigate(`/profile/${userInfo._id}`) }}>Profile</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <>
                                    <Nav.Link to="/login" className="me-2">
                                        <Button onClick={() => { navigate('/login') }} variant="outline-primary" className="header-auth-button">
                                            <FaSignInAlt className='me-1' /> Sign In
                                        </Button>
                                    </Nav.Link>
                                    <Nav.Link to="/register">
                                        <Button onClick={() => { navigate('/register') }} variant="primary" className="header-auth-button">
                                            <FaUserPlus className='me-1' /> Register
                                        </Button>
                                    </Nav.Link>
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