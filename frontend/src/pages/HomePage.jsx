import React from 'react';
import './HomePage.scss';
import { Container } from 'react-bootstrap';
import { useAutoRefreshToken } from '../utils/useAutoRefreshToken.js';
import welcomePic from '../assets/images/welcome.jpg';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GumDiseaseIcon from '../assets/images/teethIcon.png';
import CosmeticDentistryIcon from '../assets/images/teethIconwS.png';
import DentalImplantsIcon from '../assets/images/teethScrew.png';
import CleaningAndExamsIcon from '../assets/images/teethtarget.png';
import HomeHeader from '../components/HomeHeader';
import DentalControlledCarousel from '../components/DentalControlledCarousel';
import Homefooter from '../components/Homefooter';
import { useNavigate } from 'react-router-dom';



const HomePage = () => {
    useAutoRefreshToken();

    const navigate = useNavigate();




    return (

        <div className='home-page'>
            <Container>
                 <HomeHeader/>


                <DentalControlledCarousel/>


                <div className='homepage-content'>

                    <div className='welcome-section'>
                        <div className='title text-center custom-title'>Welcome to SunShine Dental</div>

                        <Row>
                            <Col className="d-flex justify-content-center">
                                <div className='welcome-section-picture'>

                                    <img src={welcomePic} alt='welcome-picture' className='image'></img>
                                </div>
                            </Col>

                            <Col className="d-flex justify-content-center">
                                <div className='welcome-section-para'>

                                    Here at Chase Dental, we believe that a smile tells a thousand words, and we are dedicated to giving our patients high-quality dental care. We offer a full range of dental services, so all of your family’s needs are met under one roof. <br></br> <br></br>

                                    Our goal is for you to leave our office with a memorable and enjoyable dental experience, which is why our welcoming and compassionate staff will do everything they can to make you feel right at home.<br></br> <br></br>

                                    If you are looking to brighten and enhance your smile, please don’t hesitate to call us today at <span className='telephone'>(727) 527-4955!</span>

                                </div>
                            </Col>
                        </Row>

                    </div>




                    <div className='service-section'>
                        <Container>
                            <div className='title text-center custom-title'>We Specialize In:</div>

                            <Row className="d-flex justify-content-center" style={{ gap: '20px' }}>
                                <Col className="d-flex justify-content-center service-container" onClick={()=>{navigate('/services'); window.scrollTo(0, 0);}}>

                                    <div className='service-icon'>
                                        <img src={GumDiseaseIcon} alt='gumIcon' className='image'></img>
                                    </div>
                                    <div className='service-text'><h4>Gum Disease Treatment</h4></div>




                                </Col>
                                <Col className="d-flex justify-content-center service-container" onClick={()=>{navigate('/services'); window.scrollTo(0, 0);}}>

                                    <div className='service-icon'>
                                        <img src={CosmeticDentistryIcon} alt='gumIcon' className='image'></img>
                                    </div>
                                    <div className='service-text'><h4>Cosmetic Dentistry</h4></div>




                                </Col>
                                <Col className="d-flex justify-content-center service-container" onClick={()=>{navigate('/services'); window.scrollTo(0, 0);}}>

                                    <div className='service-icon'>
                                        <img src={DentalImplantsIcon} alt='gumIcon' className='image'></img>
                                    </div>
                                    <div className='service-text'><h4>Dental Implants</h4></div>




                                </Col>
                                <Col className="d-flex justify-content-center service-container" onClick={()=>{navigate('/services'); window.scrollTo(0, 0);}}>

                                    <div className='service-icon'>
                                        <img src={CleaningAndExamsIcon} alt='gumIcon' className='image'></img>
                                    </div>
                                    <div className='service-text'><h4>Cleaning and Exams</h4></div>




                                </Col>

                            </Row>

                        </Container>

                    </div>

                    <div className='about-us-section'>
                        <Container>
                            <Row className="d-flex justify-content-center">


                                <Col>



                                </Col>
                                <Col>
                                    <div className='about-us-title'>
                                        About Our Office
                                    </div>

                                    <div className='about-us-text'>
                                        SunShine Dental is proud to serve St. Petersburg, FL and surrounding areas. We are dedicated to providing the highest level of dental medicine along with friendly, compassionate service.
                                        <br></br>
                                        <br></br>

                                        If you have any questions about how we can care for your teeth & mouth, please don’t hesitate to call us at<span className='phone-number'>(727) 527-4955</span> . Thank you!
                                    </div>


                                </Col>

                            </Row>

                        </Container>

                    </div>

                    
                </div>

                <Homefooter/>

            </Container>

        </div>
    )


}

export default HomePage;