import React from 'react';
import './ContactPage.scss';
import { Container} from 'react-bootstrap';
import HomeHeader from '../components/HomeHeader';

import Homefooter from '../components/Homefooter';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useAutoRefreshToken } from '../utils/useAutoRefreshToken.js';














const ContactPage = () => {

   useAutoRefreshToken();

    



    return (


        <Container>
            <HomeHeader></HomeHeader>





            <div className='contact-page-content'>


                <div className='title text-center'>CONTACT</div>


                <Row>
                    <Col>
                        <div className='address-infor'>
                            <span className='dark-text'>SunShine Dental </span> <br></br>
                            5918 Dr M.L.K. Jr St N<br></br>
                            St. Petersburg, FL 33703. <br></br>

                            <span className='dark-text'>Phone: <u>727-3108596</u></span>

                        </div>

                        {/* <Form>
                            <div className='message-title'>Send Us A Message</div>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPhone">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control type="text" />
                                </Form.Group>
                            </Row>

                            <Form.Group controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" />
                            </Form.Group>

                            <Form.Group controlId="message">
                                <Form.Label>Message</Form.Label>
                                <Form.Control as="textarea" rows={3} />
                            </Form.Group>

                        </Form>

                        <div className='message-info'>
                            Please use this form for general information purposes only.
                            DO NOT send personal health information through this form.
                            Specific patient care must be addressed during your appointment.
                        </div>

                        <Button variant="secondary" >
                            Submit
                        </Button> */}


                    </Col>

                    <Col>
                        <div className='business-hour'>
                            <span className='dark-text'>Business Hours</span><br></br>
                            Mon-Thu 8:00 AM – 5:00 PM <br></br>
                            Fri 8:00 AM – 12:00 PM <br></br>
                            Sat-Sun – Closed <br></br>
                            Same-Day Appointments Available

                        </div></Col>
                </Row>





















            </div>

            <Homefooter></Homefooter>

        </Container>


    )


}

export default ContactPage;