import './CreateNewRegister.scss';
import { Container, Form } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useAddNewRegisterMutation } from '../slices/userApiSlice';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
// import { useAutoRefreshToken } from '../utils/useAutoRefreshToken.js';


const CreateNewRegister = () => {

    //useAutoRefreshToken();
    let today = new Date();
    today = today.toISOString().split('T')[0];


    const navigate = useNavigate();
    const [date, setDate] = useState(today);
    const [customerName, setCustomerName] = useState('');
    const [jobNumber, setJobNumber] = useState('');
    const [jobName, setJobName] = useState('');
    const [projectValue, setProjectValue] = useState('');

    const [chargeFee, setFee] = useState('');
    const [invoiceNumber, setInvoiceNumber] = useState('');
    const [note, setNote] = useState('');
    const [status, setStatus] = useState('');


    const [createNewRegister] = useAddNewRegisterMutation();














    const handleSaveUser = async (e) => {
        e.preventDefault();
        // try {
        //     await createNewRegister(
        //         {
        //             date: new Date().toISOString().slice(0, 10), customerName, jobNumber, jobName, projectValue,
        //             chargeFee, invoiceNumber, note, status: 'o'
        //         });

        //     navigate('/home');
        //     toast.success('New Register is created!!')
        // } catch (e) {
        //     console.log(e)
        // }

        try {
            await createNewRegister(
                {
                    date, customerName, jobNumber, jobName, projectValue,
                    chargeFee, invoiceNumber, note, status: 'o'
                });

            navigate('/home');
            toast.success('New Register is created!!')
        } catch (e) {
            console.log(e)
        }





    }

    return (
        <div>
            <Container>
                <div className="title text-center"><h1>Add New Register</h1></div>

                <textarea rows="4" cols="60"></textarea>
                <Form >
                    <Row>
                        <Col>
                            <Form.Group className='my-2' controlId='date'>
                                <Form.Label>Date</Form.Label>
                                <Form.Control
                                    type='text'

                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group className='my-2' controlId='customerName'>
                                <Form.Label>Customer Name</Form.Label>
                                <Form.Control
                                    type='text'

                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group className='my-2' controlId='jobNumber'>
                                <Form.Label>Job Number</Form.Label>
                                <Form.Control
                                    type='text'

                                    value={jobNumber}
                                    onChange={(e) => setJobNumber(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group className='my-2' controlId='jobName'>
                                <Form.Label>Job Name</Form.Label>
                                <Form.Control
                                    type='text'

                                    value={jobName}
                                    onChange={(e) => setJobName(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className='my-2' controlId='projectValue'>
                                <Form.Label>($) Project Value</Form.Label>
                                <Form.Control
                                    type='text'

                                    value={projectValue}
                                    onChange={(e) => setProjectValue(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group className='my-2' controlId='fee'>
                                <Form.Label>($) Fee</Form.Label>
                                <Form.Control
                                    type='text'

                                    value={chargeFee}
                                    onChange={(e) => setFee(e.target.value)}
                                ></Form.Control>
                            </Form.Group>


                            <Form.Group className='my-2' controlId='invoiceNumber'>
                                <Form.Label>Invoice Number</Form.Label>
                                <Form.Control
                                    type='text'

                                    value={invoiceNumber}
                                    onChange={(e) => setInvoiceNumber(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>












                </Form>

                <Button variant="primary" className='mb-2' onClick={handleSaveUser} >
                    Save
                </Button>

            </Container>

        </div>
    )
}

export default CreateNewRegister;