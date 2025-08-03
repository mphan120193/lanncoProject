import './CreateNewInvoice.scss';
import { Container, Form } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {  useAddNewPaySheetMutation } from '../slices/userApiSlice';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';



const CreateNewInvoice = () => {

    
    let today = new Date();
    today = today.toISOString().split('T')[0];

    const navigate = useNavigate();
    const [date, setDate] = useState(today);
    const [totalAmount, setTotalAmount] = useState('');
    


    const [createNewPaySheet] = useAddNewPaySheetMutation();














    const handleSaveUser = async (e) => {
        e.preventDefault();
        
        try{
            await createNewPaySheet(
                {date, totalAmount });

                    navigate('/invoice-page');
                    toast.success('A new record is saved!')
        }catch(e)
        {
            console.log(e)
        }
        
        
       
    }

    return (
        <div>
            <Container>
                <div className="title text-center"><h1>Add New INVOICE</h1></div>

                
                <Form >
                    <Row>
                        <Col>
                            <Form.Group className='my-2' controlId='customerName'>
                                <Form.Label>Date</Form.Label>
                                <Form.Control
                                    type='text'

                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group className='my-2' controlId='jobNumber'>
                                <Form.Label>($) Total Amount</Form.Label>
                                <Form.Control
                                    type='text'
                                    disabled={true}
                                    value={totalAmount}
                                    onChange={(e) => setTotalAmount(e.target.value)}
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

export default CreateNewInvoice;