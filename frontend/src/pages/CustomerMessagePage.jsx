import './CustomerMessagePage.scss';
import Table from 'react-bootstrap/Table';
import { Container, Form } from 'react-bootstrap';
import { useGetAllMessageQuery, useUpdateStatusCustomerMessageMutation } from '../slices/userApiSlice';
import Header from '../components/Header';





import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ROLES_LIST } from '../utils/roles_list';
import { useAutoRefreshToken } from '../utils/useAutoRefreshToken.js';





const CustomerMessagePage = () => {
    useAutoRefreshToken();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [messageDetail, setMessageDetail] = useState('');
    const [updateStatusMessage] = useUpdateStatusCustomerMessageMutation();





    const userRole = useSelector((state) => state.auth.userInfo.roles);
    console.log(userRole);

    const { data: messageArrList, isLoading, isError, error } = useGetAllMessageQuery();


    if (isLoading) {
        return <div>Loading messages...</div>;
    }

    if (isError) {
        console.error('Error fetching messages:', error);
        return <div>Error loading messages. Please try again.</div>;
    }
    const messages = messageArrList;



    const handleDelete = async (id) => {

        // await deleteMessage({ id });
        // try {

        //     let messageResult = await getAllMessage().unwrap();

        //     //console.log(messageResult);
        //     if (messageResult) {

        //         const newMessageArray = messageResult.map(item => {
        //             const formattedDate = new Date(item.createdAt).toDateString();
        //             return {
        //                 ...item,
        //                 createdAt: formattedDate
        //             };
        //         })



        //         setMessageList(newMessageArray);
        //     }



        // } catch (e) {
        //     console.log(e);
        // }


    }


    const handleView = async (item) => {


        setShow(true);
        setMessageDetail(item.message);
        updateStatusMessage({ id: item._id });
    }
    const handleClose = () => setShow(false);


















    if (userRole === ROLES_LIST.Amdin) {
        const newMessageArray = messages.messageRes.map(item => {
            const formattedDate = new Date(item.createdAt).toDateString();
            return {
                ...item,
                createdAt: formattedDate
            };
        })

        
        return (
            <div>
                <Header />
                <Container>
                    <div className="title text-center"><h1>Customer Message</h1></div>


                    <Table striped bordered hover className="custom-table">
                        <thead >
                            <tr>

                                <th>Custmer Name</th>
                                <th>Phone Number</th>
                                <th>Email</th>
                                <th>Message</th>
                                <th>Created Date</th>

                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                newMessageArray.map((item, index) => {


                                    return (



                                        <tr key={item._id} style={{ fontWeight: item.statusID === 'S1' ? 'bold' : 'normal' }}>
                                            <td>{item.name}</td>
                                            <td>{item.phoneNmber}</td>
                                            <td>{item.email}</td>
                                            <td style={{
                                                maxWidth: '300px',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }}>{item.message}</td>
                                            <td>{item.createdAt}</td>

                                            <td><button className='btn btn-primary px-3 mx-3' onClick={() => handleView(item)}>View</button>
                                                <button className='btn btn-primary px-3' onClick={() => handleDelete(item._id)}>Delete</button>
                                            </td>
                                        </tr>



                                    )

                                })
                            }

                        </tbody>
                    </Table>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Message Detail</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>

                            <Form.Group className="mb-3" controlId="messageDetail">

                                <Form.Control as="textarea" rows={4} value={messageDetail} disabled />
                            </Form.Group>


                        </Modal.Body>



                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>

                        </Modal.Footer>
                    </Modal>





                </Container>
            </div>
        )

    }
    if (userRole === ROLES_LIST.Doctor) {
        navigate('/system/manage-doctor');
    }
























}

export default CustomerMessagePage