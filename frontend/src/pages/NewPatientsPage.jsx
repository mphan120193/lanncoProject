import React, { useRef, useEffect } from 'react';
import './NewPatientsPage.scss';
import { Container } from 'react-bootstrap';
import HomeHeader from '../components/HomeHeader';
import { useNavigate } from 'react-router-dom';
import Homefooter from '../components/Homefooter';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import newPatientImg from '../assets/images/newpatients_img.jpg';
import { useAutoRefreshToken } from '../utils/useAutoRefreshToken.js';















const NewPatientsPage = () => {

    useAutoRefreshToken();
    const navigate = useNavigate();
    
    
    



    return (

        <div className='home-page'>
            <Container>
                <HomeHeader></HomeHeader>





                <div className='aboutpage-content'>


                    <div className='title text-center'>NEW PATIENTS</div>

                    <Row>
                        <Col >
                            <div className='about-picture'>
                                <img src={newPatientImg} alt='img' className='image'></img>
                            </div>

                        </Col>
                        <Col>
                            <div className='about-text'>
                                Here at Chase Dental, we love meeting new patients. Part of easing your concerns is explaining what you can expect from our practice. When you are new to our office, we put in the effort to provide you with a positive and comforting experience.
                                Once you have been with us for a while, you can continue to expect the highest level of service.
                                We focus on providing quality dental care, excellent customer service, and a relaxing environment to maintain a lasting patient relationship.
                                We consider your first visit the start of a long-term relationship with you. <br></br> <br></br>

                                During your initial appointment, we will perform various tests to assess the condition of your oral health and to create a dental plan based on your unique, individual needs.
                                We look forward to meeting you! <br></br> <br></br>

                                For more information on your initial visit or to <span className='darker-text'><u onClick={() => { navigate('/appointment') }}>request an appointment,</u></span>
                                please don’t hesitate to contact us today at <span className='darker-text'><u>(727) 527-4955!</u></span>

                            </div>
                        </Col>
                    </Row>



















                </div>

                <Homefooter></Homefooter>

            </Container>

        </div>
    )


}

export default NewPatientsPage;