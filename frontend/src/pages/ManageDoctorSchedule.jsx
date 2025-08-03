import './ManageDoctorSchedule.scss';

import { Container, Form } from 'react-bootstrap';
import Header from '../components/Header';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef, useMemo } from 'react';

import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
//import { toast } from 'react-toastify';
import Table from 'react-bootstrap/Table';
import { useSelector } from 'react-redux';
import { ROLES_LIST } from '../utils/roles_list';
import {useGetDoctorListQuery, useGetScheduleListByDoctorIDDateMutation} from '../slices/doctorApiSlice';
















const ManageDoctorSchedule = () => {
    
    const doctor = useRef([]);
    const isInitialRender = useRef(true);
    const [selectedDoctor, setselectedDoctor] = useState();
    
    
    const [selectedDate, setSelectedDate] = useState(new Date());
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const [scheduleList, setScheduleList] = useState('');
    const [getScheduleList] = useGetScheduleListByDoctorIDDateMutation();

    const userRoles = useSelector((state) => state.auth.userInfo.roles);
    const userID = useSelector((state) => state.auth.userInfo._id);
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
                
                


                if (selectedDate && selectedDoctor) {
                    try {

                        const queryParams = {
                            doctorID: selectedDoctor,
                            selectedDate: selectedDate.toDateString()
                        };

                        

                        const scheduleRes = await getScheduleList(queryParams).unwrap();
                        
                        
                        if (scheduleRes) {
                            setScheduleList(scheduleRes);
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

    const doctorListArr = doctorArrList?.data || [];

    useMemo(()=>{
       
        if(doctorListArr){
            doctor.current = doctorListArr
        }

    }, [doctorListArr])

    if (isLoading) {
        return <div>Loading all code lists...</div>;
    }

   
    if (isError) {
        
        
        return <div>Error loading code lists. Please try again.</div>;
    }




    

    

    


    
    const handleSelectDoctorChange = async (e) => {

        setselectedDoctor(e.target.value);



    }
    

    return (
        <div>
            <Header />

            <Container>
                <div className="title text-center"><h1>Manage Doctor Schedule</h1></div>

                <Row className='custom-row'>
                    <Col>
                        <div>Select Doctor</div>
                        <Form.Control as="select" value={selectedDoctor} onChange={(e) => handleSelectDoctorChange(e)}>
                            <option value="">
                                Select a doctor...
                            </option>
                            {userRoles === ROLES_LIST.Amdin ? (
                                

                                doctor.current.map((item, index) => {

                                    return (

                                        
                                        <option value={item._id} key={item._id} >{item.firstName}</option>




                                    )
                                })

                            ) : (<option value={userID} key={userID} >Hao</option>)}

                        </Form.Control>
                    </Col>
                    <Col>
                        <div>Select Date</div>

                        <div >
                            <DayPicker
                                mode="single"
                                selectedDate={selectedDate}
                                onSelect={setSelectedDate}
                            
                            />
                            {selectedDate && <p>Selected: {selectedDate.toLocaleDateString()}</p>}
                        </div>

                    </Col>
                </Row>
                


                <div className='schedule-list-table'>
                    <div className='title text-center mb-4'><h2>Appointment Schedule</h2></div>

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Message</th>
                                <th>Time</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scheduleList && scheduleList.length > 0 ? (scheduleList.map((item, index) => {
                                console.log(item);
                                return (
                                    <tr key={item._id}>
                                        <td>{index}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phoneNmber}</td>
                                        <td>{item.message}</td>
                                        <td>{item.timeTypeData[0].value_en}</td>
                                        <td>{item.statusData[0].value_en}</td>
                                    </tr>
                                )
                            })) : (<tr>
                                <td colSpan="6" className="text-center">No schedules.</td>
                            </tr>)}


                        </tbody>
                    </Table>

                </div>






            </Container>

        </div>
    )





}

export default ManageDoctorSchedule