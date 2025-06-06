import './Homefooter.scss'
import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, Container } from 'react-bootstrap';

import logoImage from '/Logo.png';
import { useState } from 'react';
import { useCreateGetInTouchMessageMutation } from '../slices/userApiSlice';
import { toast } from 'react-toastify';

import {
    useGetInTouchSendConfirmEmailMutation,
} from '../slices/userApiSlice';


const Homefooter = () => {

    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [createMessage] = useCreateGetInTouchMessageMutation();

    const [sendConfirmEmail] = useGetInTouchSendConfirmEmailMutation();

    const handleSubmit = async () => {


        try {
            let resMessage = await createMessage({ name, phoneNumber, email, message });
            console.log(resMessage);
            setName('');
            setPhoneNumber('');
            setEmail('');
            setMessage('');

            const emailDetails = {
                to: 'mphan120193@gmail.com',
                subject: 'Get In Touch Email from Front End',
                message: "Hello",
                messageDetail: { name, phoneNumber, email, message },
                responseDetail: resMessage.data.messageRes,
            }



            sendConfirmEmail(emailDetails);
            toast.success('Success to send the message');




        } catch (e) {
            console.log(e);
        }



    }

    return (
        <div className="home-footer-section">

            <div className='get-in-touch-section'>
                <Container>
                    <div className='title text-center custom-title'>Get In Touch With Us Today</div>

                    <Row className='get-in-touch-custom-row'>
                        <Col className='custom-Col'>
                            <div className='custom-input'>
                                <input type='text' placeholder='Name*' value={name} onChange={(e) => setName(e.target.value)}></input>

                            </div>




                        </Col>
                        <Col className='custom-Col'>
                            <div className='custom-input'>
                                <input type='text' placeholder='Phone*' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}></input>

                            </div>



                        </Col>

                    </Row>
                    <Row className='get-in-touch-custom-row'>
                        <Col>
                            <div className='custom-input'>
                                <input type='email' placeholder='Email*' value={email} onChange={(e) => setEmail(e.target.value)}></input>

                            </div>
                        </Col>
                        <Col></Col>

                    </Row>
                    <Row className='get-in-touch-custom-row'>
                        <Col>
                            <div className='custom-input'>
                                <input type='text' placeholder='Message*' value={message} onChange={(e) => setMessage(e.target.value)}></input>

                            </div>
                        </Col>


                    </Row>
                    <div className='get-in-touch-message-section'>
                        Please use this form for general information purposes only. DO NOT send personal health information through this form.
                        Specific patient care must be addressed during your appointment.
                    </div>
                    <div className='text-center'>
                        <Button variant="secondary" onClick={handleSubmit}>SUBMIT</Button>
                    </div>

                </Container>
            </div>

            {/* <div className='maps-section'>
                <iframe
                    title='maps'
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7056.945343824706!2d-82.64972508855168!3d27.82599822014792!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88c2e6aa60fc761b%3A0x7e2296a04781c9cd!2s5918%20Dr%20M.L.K.%20Jr%20St%20N%2C%20St.%20Petersburg%2C%20FL%2033703!5e0!3m2!1sen!2sus!4v1749179516014!5m2!1sen!2sus"

                    width="100%" 
                    height="100%"
                    style={{ border: 0 }} 
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>



            </div> */}


            <div className='contact-infor-section'>
                <Container>
                    <Row className='custom-row'>
                        <Col className='d-flex'>
                            <div className='logo'>
                                <img className='image' src={logoImage} alt='logo'></img>
                            </div>
                            

                        </Col>
                        <Col className='phone-address-col'>
                            <div className='phone-number'>
                                (727)-310-8596

                            </div>
                            <div className='address'>
                                5918 DR M.L.K Jr St N St.Petersburg, FL 33703
                            </div>
                        </Col>
                        <Col className='business-hour-col'>
                            <div className='business-hour'>
                                Mon-Thu 8:00 AM – 5:00 PM <br></br>
                                Fri 8:00 AM – 12:00 PM <br></br>
                                Sat-Sun – Closed <br></br>
                                Same-Day Appointments Available
                            </div>
                        </Col>
                    </Row>

                </Container>


            </div>





            <div className='copy-right-section'>
                <p>&copy; SunShine Dental | Sitemap | Accessibility | Website by Hao Phan
                    {/* <a href='https://www.youtube.com/watch?v=147SkAVXEqM&t=120s' target="_blank" > &#8594; Click here &#8592;</a> */}
                </p>

            </div>





        </div>



    );


}
export default Homefooter;