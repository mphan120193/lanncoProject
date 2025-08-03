import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/userApiSlice';
import { logout } from '../slices/authSlice';
import './Header.scss';
import { setLanguage } from '../slices/languageSlice';

const AdminNavbar = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const currentLanguage = useSelector((state) => state.language.currentLanguage);


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {

        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            localStorage.clear();
            navigate('/login');
        } catch (err) {
            console.error(err);
        }
    };

    const handleCRUDUser = () => {
        navigate('/system/user-manage');
    }
    

    const handleManageDoctor = () => {
        navigate('/system/manage-doctor');
    }
    const handleManageDoctorSchedule = () => {
        navigate('/system/manage-doctor-schedule')
    }
    const handleHome = () => {
        navigate('/home');
    }
    const handleCustomerMessage = ()=>{
        navigate('/system/customer-message');
    }
    const titleName = `Welcome ${userInfo.firstName}`;


    return (
        <Navbar bg="info" className="custom-navbar-height">
            <Container>
                <div className='branch-container' onClick={handleHome}>
                    <Navbar.Brand >SunShine Dental </Navbar.Brand>

                </div>



                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="System" id='username'>

                            <NavDropdown.Item onClick={handleCRUDUser}>
                                CRUD User
                            </NavDropdown.Item>
                            

                            <NavDropdown.Item onClick={handleManageDoctor}>
                                Manage Doctor
                            </NavDropdown.Item>


                            <NavDropdown.Item onClick={handleManageDoctorSchedule}>
                                Manage Doctor Appointment
                            </NavDropdown.Item>

                            <NavDropdown.Item onClick={handleCustomerMessage}>
                                Customer Messages
                            </NavDropdown.Item>
                        </NavDropdown>


                        





                    </Nav>
                    <Nav className='ms-auto'>

                        {userInfo ? (<>
                            <NavDropdown title={titleName} id='username'>

                                <NavDropdown.Item onClick={logoutHandler}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>


                        </>) : (<>
                            <Nav.Link onClick={() => { navigate('/login') }}>
                                <FaSignInAlt /> Sign In
                            </Nav.Link>


                            <Nav.Link onClick={() => { navigate('/register') }}>
                                <FaSignOutAlt /> Sign Up
                            </Nav.Link>
                        </>




                        )}
                        <NavDropdown title="Languge" id='language'>

                            <NavDropdown.Item onClick={() => dispatch(setLanguage('en'))} disabled={currentLanguage === 'en'}>
                                EN
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={() => dispatch(setLanguage('vn'))} disabled={currentLanguage === 'vn'}>
                                VN
                            </NavDropdown.Item>

                        </NavDropdown>








                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    )
};

export default AdminNavbar;
