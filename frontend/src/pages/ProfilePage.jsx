import React from 'react';
import './ProfilePage.scss';
import HomeHeader from '../components/HomeHeader';
import Homefooter from '../components/Homefooter';
import { useParams } from 'react-router-dom';

import { useAutoRefreshToken } from '../utils/useAutoRefreshToken.js';

import { Container, Row, Col, Card, ListGroup, Badge, Alert, Spinner } from 'react-bootstrap';
import { FaUserCircle, FaEnvelope, FaPhone, FaCalendarAlt } from 'react-icons/fa';

import { useGetAllUserQuery, useGetAppointmentByUserIDQuery } from '../slices/userApiSlice';









const ProfilePage = () => {
    useAutoRefreshToken();
    const { id: userID } = useParams();
    


    const {
        data: userDataArray, 
        isLoading: isUserLoading,
        isError: isUserError,
        error: userError,
    } = useGetAllUserQuery({ id: userID }, { skip: !userID });

    const {
        data: appointmentListResponse, 
        isLoading: isLoadingAppointments,
        isError: isErrorAppointments,
        error: appointmentsError, 
        
    } = useGetAppointmentByUserIDQuery({ id: userID }, { skip: !userID });

    const userInfo = userDataArray?.[0] || null;
    const appointments = appointmentListResponse || [];


    
    const overallLoading = isUserLoading || isLoadingAppointments;
    
    const overallError = isUserError || isErrorAppointments;


    if (overallLoading) {
        return (
            <Container className="my-5 text-center">
                <Spinner animation="border" role="status" className="text-primary" />
                <p className="mt-2">Loading user profile and appointments...</p>
            </Container>
        );
    }


    if (overallError) {
        
        return (
            <Container className="my-5 text-center">
                <Alert variant="danger">
                    <p>Error loading profile data. Please try again.</p>
                    {userError && <p>User data error: {userError?.data?.message || userError.error}</p>}
                    {appointmentsError && <p>Appointments error: {appointmentsError?.data?.message || appointmentsError.error}</p>}
                </Alert>
            </Container>
        );
    }













    if (!userInfo) {
        return (
            <Container className="my-5 text-center">
                <Alert variant="info">No user found with ID: <strong>{userID}</strong>.</Alert>
            </Container>
        );
    }

    
    return (
        <>
        <HomeHeader/>
        <Container className="my-5 profile-container">
            <h2 className="text-center mb-4 profile-heading">User Profile</h2>
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card className="shadow-lg profile-card">
                        <Card.Body>
                            <div className="text-center mb-4">
                                <FaUserCircle size={80} className="text-primary profile-avatar" />
                                <h3 className="mt-3">{userInfo.firstName} {userInfo.lastName}</h3>
                                {/* Using optional chaining for roles in case it's not always present */}
                                <p className="text-muted">{userInfo.roles || 'Patient'}</p>
                            </div>

                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <FaEnvelope className="me-2 text-secondary" /> Email: <strong>{userInfo.email}</strong>
                                </ListGroup.Item>

                                {userInfo.phone && (
                                    <ListGroup.Item>
                                        <FaPhone className="me-2 text-secondary" /> Phone: <strong>{userInfo.phone}</strong>
                                    </ListGroup.Item>
                                )}

                                {userInfo.address && (
                                    <ListGroup.Item>
                                        <FaCalendarAlt className="me-2 text-secondary" /> Address: <strong>{userInfo.address}</strong>
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="justify-content-center mt-5">
                <Col md={10} lg={8}>
                    <Card className="shadow-lg appointments-card">
                        <Card.Header className="d-flex justify-content-between align-items-center">
                            <h4><FaCalendarAlt className="me-2" />Your Appointments</h4>
                            
                        </Card.Header>
                        <Card.Body>
                            {/* Appointments specific loading/error states (though overall should catch most) */}
                            {isLoadingAppointments ? (
                                <div className="text-center">
                                    <Spinner animation="border" role="status" className="text-primary" />
                                    <p className="mt-2">Loading appointments...</p>
                                </div>
                            ) : isErrorAppointments ? (
                                <Alert variant="danger" className="text-center">
                                    Error loading appointments: {appointmentsError?.data?.message || appointmentsError?.error || 'Unknown error'}
                                </Alert>
                            ) : appointments.length === 0 ? ( // Check .length directly here
                                <Alert variant="info" className="text-center">
                                    You have no appointments.
                                </Alert>
                            ) : (
                                <ListGroup variant="flush">
                                    {appointments.map((appointment) => (
                                        // Use appointment.id first, fallback to _id if needed for key
                                        <ListGroup.Item key={appointment.id || appointment._id} className="d-flex justify-content-between align-items-center appointment-item">
                                            <div>
                                                <strong>{appointment.date} at {appointment.timeType}</strong>
                                                <br />
                                                {/* Assuming doctorID might need to be translated to a name later if not directly provided */}
                                                <small className="text-muted">Doctor ID: {appointment.doctorID}</small>
                                                <br />
                                                <small className="text-muted">Message: {appointment.message}</small>
                                            </div>
                                            <div>
                                                {/* Status mapping, adjust 'S2', 'S1' to your actual status codes */}
                                                <Badge bg={appointment.statusID === 'S2' ? 'success' : appointment.statusID === 'S1' ? 'warning' : 'danger'}>
                                                    {appointment.statusID.toUpperCase()}
                                                </Badge>
                                            </div>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        <Homefooter/>
        </>
        
    );




}

export default ProfilePage;