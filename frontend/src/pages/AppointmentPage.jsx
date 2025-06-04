import React, { useState, useRef, useEffect, useMemo } from 'react';

import './AppointmentPage.scss';
import { Container, Form, Button } from 'react-bootstrap';
import HomeHeader from '../components/HomeHeader';

import Homefooter from '../components/Homefooter';
import { DayPicker } from 'react-day-picker';

import { toast } from 'react-toastify';

import {useBookAppointmentMutation, useSendConfirmEmailMutation} from '../slices/userApiSlice';

import { useNavigate } from 'react-router-dom';

import Col from 'react-bootstrap/Col';

import Row from 'react-bootstrap/Row';

import { useGetAllCodeQuery } from '../slices/userApiSlice';
import { useGetDoctorListQuery, useGetScheduleDetailsByDoctorIDandDateMutation } from '../slices/doctorApiSlice';


















const AppointmentPage = () => {
    const [selectedDate, setSelectedDate] = useState();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    
    let noChangeSchedule = useRef();
    let scheduleTime = useRef();

    const doctor = useRef([]);
    const [selectedDoctor, setselectedDoctor] = useState();




    const isInitialRender = useRef(true);
    const [getDetailSchedule] = useGetScheduleDetailsByDoctorIDandDateMutation();



    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const [selectedButton, setSelectedButton] = useState(null);
    const [booking] = useBookAppointmentMutation();
    const [sendConfirmEmail] = useSendConfirmEmailMutation();
    const navigate = useNavigate();

    const [isVisible, setIsVisible] = useState(false);










    useEffect(() => {
        const fetchData = async () => {
            if (isInitialRender.current) {
                isInitialRender.current = false;
                // Skip the logic for the initial render
                return;
            }


            if (selectedDate && selectedDoctor) {
                console.log('useEffet check...')
                console.log('select Date: ', selectedDate.toDateString());
                console.log('Selected DoctorID ', selectedDoctor);
                console.log('useRef nochange time: ', noChangeSchedule.current);
                let existingTime = [];


                if (selectedDate && selectedDoctor) {
                    try {

                        const queryParams = {
                            doctorID: selectedDoctor,
                            selectedDate: selectedDate.toDateString()
                        };

                        const res = await getDetailSchedule(queryParams);
                        console.log('Respone Data: ', res);

                        if (res) {
                            existingTime = res.data.existingTime;



                            let currentSchedule = noChangeSchedule.current.filter((item, index) => {


                                if (!existingTime.includes(item.key)) {

                                    return { ...item };
                                } else {
                                    return false;
                                }

                            })




                            scheduleTime.current=currentSchedule;
                        }




                    } catch (e) {
                        console.log(e);
                    }
                }

            } else {
                return
            }




        }
        fetchData();

    }, [selectedDate, selectedDoctor])


    const { data: doctorArrList, isLoading, isError, error } = useGetDoctorListQuery();
    const { data: scheduleTimeData, isLoading: isScheduleLoading, isError: isScheduleError, error: ScheduleError } = useGetAllCodeQuery({ type: "TIME" });
    
    const doctorListArr = doctorArrList?.data || [];
    const timeListArr = scheduleTimeData?.allcode || [];


    useMemo(()=>{
        
        if(doctorListArr){
            //console.log('check doctor List array: ', doctorListArr);
            doctor.current = doctorListArr
        }
        if(timeListArr){
            //console.log('check time List array: ',timeListArr);
            const transformedScheduleTime = timeListArr.map(item => ({ ...item, isSelected: false }));
            scheduleTime.current= transformedScheduleTime;
            noChangeSchedule.current=transformedScheduleTime;
            

        }

    }, [ doctorListArr, timeListArr])



    

    


    const overallLoading = isLoading || isScheduleLoading;
    
    const overallError = isError || isScheduleError;

    
    if (overallLoading) {
        return <div>Loading all code lists...</div>;
    }

    
    if (overallError) {

        return <div>Error loading code lists. Please try again.</div>;
    }




    const handleSelectDoctorChange = async (e) => {

        setselectedDoctor(e.target.value);



    }


    const handleOnclickTime = (dataTime) => {




        let newAllScheduleTime;
        if (selectedButton === dataTime._id) {
            setSelectedButton(null);
        } else {
            setSelectedButton(dataTime._id);

        }


        if (scheduleTime.current && scheduleTime.current.length > 0) {


            newAllScheduleTime = scheduleTime.current.map((item, index) => {


                if (item._id === dataTime._id) {
                    return {
                        ...item,
                        isSelected: !item.isSelected,

                    };
                } else {
                    return item;
                }
            });

        }

        scheduleTime.current=newAllScheduleTime;






        





    }

    const handleSave = async () => {


        if (!selectedDate) {
            toast.error('invalid Date');
            return;
        }

        if (!selectedDoctor) {
            toast.error('Invalid Doctor');
            return;
        }

        

       
        let selectedScheduleTime;
        if (scheduleTime.current && scheduleTime.current.length > 0) {
            selectedScheduleTime = scheduleTime.current.filter(
                item => item.isSelected === true


            );

        }

       

        const bookingData = {
            doctorId: selectedDoctor,
            time: selectedScheduleTime[0]?.key, 
            date: selectedDate?.toDateString(), 
            name: name,
            phoneNumber: phoneNumber,
            email: email,
            message: message
        };

        console.log('Booking Data:', bookingData);
        let bookingResult = await booking(bookingData);
        console.log(bookingResult);



        const emailDetails = {
            to: 'mphan120193@gmail.com',
            subject: 'Test Email from Front End',
            message: "Hello",
            bookingDa: bookingData,
            bookingResult: bookingResult.data.result,
        }

        sendConfirmEmail(emailDetails);
        toast.success('Success to book appointment, please check email to confirm');
        navigate('/home');
        window.scrollTo(0, 0);



    }


    const handleDateSelect = (date) => {
        setSelectedDate(date);
        setIsVisible(false); 
    };

    const toggleVisibility = (event) => {
        event.preventDefault();
        setIsVisible(!isVisible);
    };





    

    return (
        
        <div className='home-page'>
            <Container>
                <HomeHeader></HomeHeader>





                <div className='appointment-content'>


                    <div className='title text-center'>APPOINTMENT</div>



                    <Form>

                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => { setName(e.target.value) }} />

                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="phonenumber">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control type="tel" placeholder="Enter Phone Number" value={phoneNumber} onChange={(e) => { setPhoneNumber(e.target.value) }} />

                                </Form.Group>
                            </Col>
                        </Row>


                        <Row>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                        </Row>


                        <Row className=''>



                            <Col>

                                <Form.Group className="mb-3" controlId="date">

                                    <div className='select-date-container'>

                                        <div >
                                            <Button variant="primary" onClick={toggleVisibility}>

                                                Select Date
                                            </Button>
                                            {/* <DayPicker
                                        mode="single"
                                        selectedDate={selectedDate}
                                        onSelect={handleDateSelect}
                                        disabled={{ before: today }}

                                    /> */}
                                            {isVisible && (
                                                <div>
                                                    <DayPicker
                                                        mode="single"
                                                        selected={selectedDate}
                                                        onSelect={handleDateSelect}
                                                        disabled={{ before: today }}
                                                    />
                                                </div>
                                            )}

                                        </div>
                                        {selectedDate ? (<p>Selected: {selectedDate.toDateString()}</p>) : (<p>Selected:</p>)}
                                    </div>

                                </Form.Group>
                            </Col>
                            <Col>

                                <Form.Group className="mb-3" controlId="doctor">
                                    <Form.Label>Select Doctor</Form.Label>

                                    <div className='select-doctor-container'>
                                        <Form.Control as="select" value={selectedDoctor} onChange={(e) => handleSelectDoctorChange(e)}>
                                            <option value="">
                                                Select a doctor...
                                            </option>

                                            {doctor.current.map((item, index) => {
                                                

                                                return (

                                                    <option value={item._id} key={item._id} >{item.firstName}</option>


                                                )
                                            })}
                                        </Form.Control>



                                    </div>




                                </Form.Group>
                            </Col>


                        </Row>

                        <Row>


                            <Form.Group className="mb-3" controlId="time">
                                <Form.Label>Select Time</Form.Label>

                                <div className='select-time-container'>
                                    {scheduleTime.current && scheduleTime.current.length > 0 && scheduleTime.current.map((item, index) => {


                                        return (




                                            <Button variant="secondary" className={
                                                item.isSelected === true ? "time-button selected" : "time-button "

                                            }
                                                key={item._id} onClick={() => handleOnclickTime(item)}
                                                disabled={selectedButton && selectedButton !== item._id}
                                                active={selectedButton === item._id}
                                            >{item.value_vn}
                                            </Button>

                                        )
                                    })}


                                </div>




                            </Form.Group>
                        </Row>







                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Message</Form.Label>
                            <Form.Control as="textarea" rows={3} value={message} onChange={(e) => { setMessage(e.target.value) }} />
                        </Form.Group>

                        <div className='appointment-info-text'>

                            Please use this form for general information purposes only. DO NOT send personal health information through this form.
                            Specific patient care must be addressed during your appointment. <br></br>

                            Please complete the following form to request an appointment.
                            Please also note that availability will vary depending on your request.
                            Your appointment will be confirmed by phone by a member of our staff. Thank you!

                        </div>


                        <Button variant="secondary" onClick={handleSave}>
                            Submit
                        </Button>
                    </Form>





















                </div>

                <Homefooter></Homefooter>

            </Container>

        </div>
    )


}

export default AppointmentPage;