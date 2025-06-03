// import { Container, Card, Button } from 'react-bootstrap';


// import {  useNavigate } from 'react-router-dom';

// const WelcomeScreen = () => {
//     const navigate = useNavigate();
    
//   return (
//     <div className='py-5'>

//       <Container className='d-flex justify-content-center'>
//       <Card className='p-5 d-flex flex-column align-items-center hero-card bg-info w-60'>
          
//           <h1 className='text-center mb-4'>Booking Care Login</h1>
//           <p className='text-center mb-4'>
//             Welcome to Booking Care 
//           </p>
//           <div className='d-flex'>

//             <Button variant='primary' className='me-3' onClick={()=>{navigate('/login')}}>
//               Sign In
//             </Button>
//             <Button variant='secondary' onClick={()=>{navigate('/register')}} >
//             Register
               
//             </Button>
//           </div>
//         </Card>
      
        
       
//       </Container>
//     </div>
//   );
// };

// export default WelcomeScreen;



import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';
import logoImage from '/Logo.png';
import  {  useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {  logout } from '../slices/authSlice';

import { useLogoutMutation } from '../slices/userApiSlice';


const WelcomeScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [logOut] = useLogoutMutation();
    
    useEffect(()=>{
        const clearUp = async ()=>{
          try{
            await logOut().unwrap();
            dispatch(logout());
            localStorage.clear();
          }catch(e){
            console.log('Clear Up error: ', e);
          }
    
        }
        clearUp();
      }, [])

    return (
        <div className="welcome-screen-wrapper d-flex align-items-center justify-content-center py-5">
            <Container className="welcome-container">
                <Card className="welcome-card shadow-lg border-0 rounded-4">
                    <Card.Body className="p-5 text-center">
                        {/* Optional: Add a logo or icon here */}
                        <img
                            src={logoImage} 
                            alt="Sunshine Dental Care Logo"
                            className="mb-4 welcome-logo"
                            style={{ maxWidth: '120px', height: 'auto' }} // Basic styling, refine in CSS
                        />

                        <h1 className="welcome-title mb-3">Welcome to Sunshine Dental Care</h1>
                        <p className="welcome-subtitle text-muted mb-5">
                            Your brighter smile starts here. Experience gentle, comprehensive dental care.
                        </p>

                        <div className="d-grid gap-3 col-md-8 mx-auto">
                            <Button
                                variant="primary"
                                size="lg"
                                className="welcome-button"
                                onClick={() => { navigate('/login'); }}
                            >
                                Sign In to Your Account
                            </Button>
                            <Button
                                variant="outline-secondary"
                                size="lg"
                                className="welcome-button"
                                onClick={() => { navigate('/register'); }}
                            >
                                Register Now
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default WelcomeScreen;