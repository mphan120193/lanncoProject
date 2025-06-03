import React from 'react';
import './AboutPage.scss';
import { Container } from 'react-bootstrap';
import HomeHeader from '../components/HomeHeader';

import Homefooter from '../components/Homefooter';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import aboutImg from '../assets/images/aboutus_img.jpg';
import { useAutoRefreshToken } from '../utils/useAutoRefreshToken.js';













const AboutPage = () => {
    useAutoRefreshToken();




    return (

        <div className='home-page'>
            <Container>
                <HomeHeader></HomeHeader>





                <div className='aboutpage-content'>


                    <div className='title text-center'>About</div>

                    <Row>
                        <Col>
                        <div className='about-picture'>
                            <img src={aboutImg} alt='img' className='image'></img>
                        </div>
                            
                            </Col>
                        <Col>
                            <div className='about-text'>
                                <span className='darker-text'>At SunShine Dental of St. Petersburg, Florida</span>, we do everything possible to ensure your utmost comfort and safety. From the receptionist to the doctor himself, everyone at our dental practice is intelligent, gentle, patient, and caring when it comes to your health and your budget. <br></br>
                                <span className='bigger-text'>Compassionate Care</span> <br></br>
                                Our professionals understand that a dental visit can be a stressful time. Therefore, we deliver your treatment information in a straightforward manner designed to make you comfortable while helping you make informed decisions about your dental care. We also help you prioritize your concerns and design a treatment schedule that meets your needs.
                            </div>
                        </Col>
                    </Row>



















                </div>

                <Homefooter></Homefooter>

            </Container>

        </div>
    )


}

export default AboutPage;