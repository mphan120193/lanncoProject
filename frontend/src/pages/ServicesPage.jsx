import React, { useRef, useEffect } from 'react';
import './ServicesPage.scss';
import { Container, Button } from 'react-bootstrap';
import HomeHeader from '../components/HomeHeader';

import Homefooter from '../components/Homefooter';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ServicesImg from '../assets/images/dentalservices_img.jpg';
import GeneralImg from '../assets/images/generaldentistry_img.jpg';
import CosmeticImg from '../assets/images/cosmeticdentistry_img.jpg';
import RestorativeImg from '../assets/images/restorativedentistry_img.jpg';
import { useAutoRefreshToken } from '../utils/useAutoRefreshToken.js';















const ServicesPage = () => {
    useAutoRefreshToken();
    const generalRef = useRef(null);
    const cosmeticRef = useRef(null);
    const restorativeRef = useRef(null);

    const handleServiceClick = (ref) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' }); 
    };

    
    
    



    return (


        <Container>
            <HomeHeader></HomeHeader>





            <div className='services-page-content'>


                <div className='title text-center'>SERVICES</div>

                <Row>
                    <Col >
                        <div className='services-picture'>
                            <img src={ServicesImg} alt='img' className='image'></img>
                        </div>

                    </Col>
                    <Col>
                        <div className='services-text p-4'>
                            You and your family can take advantage of a full range of dental services here at Chase Dental. During each visit,
                            you will be treated by trained professionals who will provide top quality care to prevent dental problems and treat current conditions.
                            <ul className='services-list'>
                                <li onClick={() => handleServiceClick(generalRef)}><u>General Dentistry</u></li>
                                <li onClick={() => handleServiceClick(cosmeticRef)}><u>Cosmetic Dentistry</u></li>
                                <li onClick={() => handleServiceClick(restorativeRef)}><u>Restorative Dentistry</u></li>
                            </ul>


                        </div>
                    </Col>
                </Row>

                <div className='services-section'>

                    <div ref={generalRef} id="general-dentistry-content" className='general-dentistry'>

                        <Row>
                            <Col className='custom-col'>
                                <div className='p-4'>
                                    <h1 className='section-title'>General Dentistry</h1>
                                    Helping our patients maintain a healthy mouth and smile is the main goal of general dentistry.
                                    We prefer to provide more minor, preventive care than to see patients suffer with more intensive treatments from a problem that was not managed in time.
                                    We want to ensure that your oral health is in its optimal state and positively contributing to the health of your entire body.
                                    We are here to brighten your smile and pave the way for a brighter life.
                                    <div><Button variant="secondary" className='mt-4'>READ MORE </Button></div>
                                </div>

                            </Col>
                            <Col className='custom-col'>
                                <div className='picture-container'>
                                    <img src={GeneralImg} alt='img' className='image'></img>
                                </div>
                            </Col>
                        </Row>

                    </div>

                    <div ref={cosmeticRef} id="cosmetic-dentistry-content" className='cosmetic-dentistry'>

                        <Row>
                            <Col className='custom-col'>
                                <div className='picture-container'>
                                    <img src={CosmeticImg} alt='img' className='image'></img>
                                </div>
                            </Col>
                            <Col className='custom-col'>
                                <div className='p-4'>
                                    <h1 className='section-title'>Cosmetic Dentistry
                                    </h1>
                                    A beautiful smile is one of the most sought after cosmetic features in the world.
                                    People from all backgrounds and professions want a bright, straight smile, and we are here to help turn that desire into reality.
                                    Whether through minor adjustments or major treatment plans, our cosmetic dentistry practice aims to improve your smile and help
                                    you build confidence in the way your teeth look.
                                    <div><Button variant="secondary" className='mt-4'>READ MORE </Button></div>
                                </div>

                            </Col>

                        </Row>

                    </div>


                    <div ref={restorativeRef} id="restorative-dentistry-content" className='restorative-dentistry'>

                        <Row>
                            
                            <Col className='custom-col'>
                                <div className='p-4'>
                                    <h1 className='section-title'>Rostorative Dentistry
                                    </h1>
                                    A beautiful smile is one of the most sought after cosmetic features in the world.
                                    People from all backgrounds and professions want a bright, straight smile, and we are here to help turn that desire into reality.
                                    Whether through minor adjustments or major treatment plans, our cosmetic dentistry practice aims to improve your smile and help
                                    you build confidence in the way your teeth look.
                                    <div><Button variant="secondary" className='mt-4'>READ MORE </Button></div>
                                </div>

                            </Col>

                            <Col className='custom-col'>
                                <div className='picture-container'>
                                    <img src={RestorativeImg} alt='img' className='image'></img>
                                </div>
                            </Col>

                        </Row>

                    </div>


                </div>



















            </div>

            <Homefooter></Homefooter>

        </Container>


    )


}

export default ServicesPage;