import './EditRegisterPage.scss';
import { Container, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HomeHeader from '../components/HomeHeader';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
// import { useAutoRefreshToken } from '../utils/useAutoRefreshToken.js';
import { useParams } from 'react-router-dom';
import { useGetAllRegisterQuery, useEditRegisterMutation } from '../slices/userApiSlice'


const EditRegisterPage = () => {

    //useAutoRefreshToken();

    const { id } = useParams();

    const { data: registerArrayList, isLoading, isError, error } = useGetAllRegisterQuery({ id: id });
    const registerList = registerArrayList;
    const navigate = useNavigate();
    const [date, setDate] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [jobNumber, setJobNumber] = useState('');
    const [jobName, setJobName] = useState('');
    const [projectValue, setProjectValue] = useState('');

    const [chargeFee, setFee] = useState('');
    const [invoiceNumber, setInvoiceNumber] = useState('');
    const [note, setNote] = useState('');
    const [status, setStatus] = useState('');
    const [editRegister] = useEditRegisterMutation();




    useEffect(() => {



        const getRegister = async () => {


            try {

                
                    
                    if (registerList) {
                        setDate(registerList.date || '');
                        setCustomerName(registerList.customerName || '');
                        setJobNumber(registerList.jobNumber || '');
                        setJobName(registerList.jobName || '');
                        setProjectValue(registerList.projectValue || '');
                        setFee(registerList.chargeFee || '');
                        setInvoiceNumber(registerList.invoiceNumber || '');
                    }
                



            } catch (e) {
                console.log(e);
            }


        };
        getRegister();

    }, [registerList])












    const handleSaveUser = async (e) => {
        e.preventDefault();
        try {
            await editRegister(
                { id, customerName, jobNumber, jobName, projectValue,
                    chargeFee, invoiceNumber  });

                    navigate('/register-page');
                    toast.success('Update is saved!!')


        } catch (e) {
            console.log(e)
        }



    }


    if (isLoading) {
        return (
            <div>

                Loading...
            </div>
        )
    }
    if (isError) {
        return <p>Error: {error?.message || 'Something went wrong'}</p>;
    } else {
        return (
            <div>
                <Container>
                <HomeHeader></HomeHeader>
    
                    
                    <Form >
                        <Row>
                            <Col>
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




    




}

export default EditRegisterPage;