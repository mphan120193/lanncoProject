import React, { useState } from 'react';
import './HomePage.scss';
import { Container } from 'react-bootstrap';
//import { useAutoRefreshToken } from '../utils/useAutoRefreshToken.js';

import HomeHeader from '../components/HomeHeader';
import RegisterPage from './RegisterPage';
import { useNavigate } from 'react-router-dom';




const HomePage = () => {
    

    //useAutoRefreshToken();

    const navigate = useNavigate();

    

    



    return (

        <div className='home-page'>
            <Container>
                <HomeHeader />

                
                <h3 className='text-center'>Register List</h3>



                
                

                <RegisterPage/>



            </Container>

        </div>
    )


}

export default HomePage;