
import './HomeHeader.scss';

import { useNavigate } from 'react-router-dom';

import { FaSignInAlt, FaUserPlus, FaSignOutAlt, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';

//import { useGetDoctorListMutation } from '../slices/doctorApiSlice';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import logoImage from '/Logo.png';




const HomeHeader = () => {
    
    const { userInfo } = useSelector((state) => state.auth);
    const navigate = useNavigate();
   
    //const [getDoctorList] = useGetDoctorListMutation();
    const [doctorArr, setDoctorArr] = useState();
    
    const dispatch = useDispatch();
    const [logoutApiCall] = useLogoutMutation();

    // useEffect(() => {
    //     const fetchData = async () => {
    //         let doctorListRes = await getDoctorList().unwrap();
    //         if (doctorListRes) {
    //             setDoctorArr(doctorListRes.doctorList);

    //         }


    //     }
    //     fetchData();

    // }, [])

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


        // <div className='home-header'>

        //     <Navbar expand="lg" className="bg-body-secondary custom-navbar">
        //         <Container>
        //             <Navbar.Brand className='custom-brand' onClick={() => { navigate('/home') }}>
        //                 <p className="custom-brand-text">SunShine <span className='and-text'>Detal</span></p>
        //             </Navbar.Brand>

        //             <Navbar.Toggle aria-controls="basic-navbar-nav" />
        //             <Navbar.Collapse id="basic-navbar-nav">
        //                 <Nav className="me-auto">



        //                     <NavDropdown title={<span onClick={() => navigate('/about')} style={{ cursor: 'pointer' }}>
        //                         ABOUT </span>} id="basic-nav-dropdown"  >


        //                         {/* {doctorArr && doctorArr.length > 0 ? (
        //                             doctorArr.map((doctor, index) => (
        //                                 <div key={doctor._id} >
        //                                     <NavDropdown.Item onClick={() => handleGetDoctorDetail(doctor._id)} >
        //                                         {doctor.firstName}
        //                                     </NavDropdown.Item>
        //                                     {index < doctorArr.length - 1 && <NavDropdown.Divider />}


        //                                 </div>



        //                             ))
        //                         ) : (
        //                             <NavDropdown.Item disabled>No Doctors Available</NavDropdown.Item>
        //                         )} */}

        //                         <NavDropdown.Item disabled>No Doctors Available</NavDropdown.Item>





        //                     </NavDropdown>

        //                     <NavDropdown title="NEW PATIENT" id="basic-nav-dropdown" onClick={() => { navigate('/new-patients') }}>


        //                         <NavDropdown.Item href="#action/3.4">
        //                             Your First Visit
        //                         </NavDropdown.Item>
        //                         <NavDropdown.Divider />
        //                         <NavDropdown.Item href="#action/3.4">
        //                             Finanical Information
        //                         </NavDropdown.Item>
        //                         <NavDropdown.Divider />
        //                         <NavDropdown.Item href="#action/3.4">
        //                             Online Form
        //                         </NavDropdown.Item>


        //                     </NavDropdown>
        //                     <Nav.Link onClick={() => { navigate('/appointment') }}>APPOINTMENTS</Nav.Link>

        //                     <NavDropdown title="SERVICES" id="basic-nav-dropdown" onClick={() => { navigate('/services') }}>


        //                         <NavDropdown.Item href="#action/3.4">
        //                             General Dentistry
        //                         </NavDropdown.Item>
        //                         <NavDropdown.Divider />
        //                         <NavDropdown.Item href="#action/3.4">
        //                             Cosmetic Dentistry
        //                         </NavDropdown.Item>
        //                         <NavDropdown.Divider />
        //                         <NavDropdown.Item href="#action/3.4">
        //                             Restorative Dentistry
        //                         </NavDropdown.Item>


        //                     </NavDropdown>

        //                     <Nav.Link onClick={() => { navigate('/contact') }}>CONTACT</Nav.Link>

                            



        //                 </Nav>
        //             </Navbar.Collapse>
        //             <Form>
        //                 <Row>
                            


        //                     <Col xs="auto">
        //                         {userInfo ? (<>
        //                             <NavDropdown title={userInfo.firstName} id='username'>

        //                                 <NavDropdown.Item onClick={logoutHandler}>
        //                                     Logout
        //                                 </NavDropdown.Item>
        //                             </NavDropdown>


        //                         </>) : (<>
        //                             <Nav.Link onClick={() => { navigate('/login') }}>
        //                                 <FaSignInAlt /> Sign In
        //                             </Nav.Link>


        //                             <Nav.Link onClick={() => { navigate('/register') }}>
        //                                 <FaSignOutAlt /> Sign Up
        //                             </Nav.Link>
        //                         </>




        //                         )}


        //                         </Col>
        //                 </Row>


        //             </Form>

        //         </Container>

        //     </Navbar>
        //     <div className='header-down'>
        //         <Container>
        //             <Row className='custom-row-header-down'>
        //                 <Col className='d-fex justify-content-center'><div className='address-infor'>
        //                     <img alt='location' src={locationIcon}></img>5918 DR M.L.K Jr St N St.Petersburg, FL 33703</div></Col>
        //                 <Col className="d-flex justify-content-end"><div className='phone-number-infor'>
        //                     <img alt='phone' src={phoneIcon}></img>727-310-9596</div></Col>

        //             </Row>

        //         </Container>

        //     </div>



        // </div>

        <header className='main-header'>
            {/* Top Bar for Contact Info */}
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

            {/* Main Navigation Bar */}
            <Navbar expand="lg" className="navbar-custom py-3">
                <Container>
                    <Navbar.Brand onClick={() => { navigate('/home') }} className='navbar-brand-custom'>
                        
                        <img
                            src={logoImage} 
                            alt="Sunshine Dental Logo"
                            className="logo-img me-2"
                        />
                        <span className="brand-text">Sunshine Dental</span>
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {/* Primary Navigation Links */}
                        <Nav className="mx-auto main-nav-links"> {/* Center the nav links */}
                            <Nav.Link onClick={() => { navigate('/home') }} to="/">HOME</Nav.Link> {/* Consistent home link */}

                            <NavDropdown title="ABOUT" id="about-nav-dropdown">
                                
                                
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={() => { navigate('/about') }} to="/about">Our Team</NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown title="NEW PATIENT" id="new-patient-nav-dropdown">
                                
                            </NavDropdown>

                            <Nav.Link onClick={() => { navigate('/appointment') }} to="/appointment">APPOINTMENTS</Nav.Link>

                            <NavDropdown title="SERVICES" id="services-nav-dropdown">
                                
                            </NavDropdown>

                            <Nav.Link onClick={() => { navigate('/contact') }} to="/contact">CONTACT</Nav.Link>
                        </Nav>

                        {/* User Authentication/Profile Section */}
                        <Nav className="ms-auto auth-nav-links"> {/* Align to the right */}
                            {userInfo ? (
                                <NavDropdown title={userInfo.firstName || 'Profile'} id='user-profile-dropdown'>
                                    <NavDropdown.Item onClick={() => { navigate('/profile') }} to="/profile">Profile</NavDropdown.Item> {/* Example profile link */}
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <>
                                    <Nav.Link  to="/login" className="me-2">
                                        <Button onClick={() => { navigate('/login') }} variant="outline-primary" className="header-auth-button">
                                            <FaSignInAlt className='me-1' /> Sign In
                                        </Button>
                                    </Nav.Link>
                                    <Nav.Link  to="/register">
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