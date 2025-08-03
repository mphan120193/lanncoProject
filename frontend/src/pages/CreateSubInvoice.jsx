import './CreateSubInvoice.scss';
import { Container, Form } from 'react-bootstrap';
import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
// import { toast } from 'react-toastify';
  
import {useAddNewSubPaySheetMutation} from '../slices/userApiSlice';
import { useNavigate } from 'react-router-dom';



const CreateSubInvoice = ({paySheetId}) => {

    


    const navigate = useNavigate();
    const [amount, setAmount] = useState('');
    const [invoiceNumber, setInvoiceNumber] = useState('');
    const [addNewSubInvoice] = useAddNewSubPaySheetMutation();


    














    const handleSaveUser = async (e) => {
        
        try{
            await addNewSubInvoice({paySheetId, amount, invoiceNumber});
            

            
        }catch(e)
        {
            console.log(e)
        }
        
        
       
    }

    return (
        <div>
            <Container>
                

                
                <Form >
                    <Row>
                    
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className='my-2' controlId='amount'>
                                <Form.Label>($)Amount</Form.Label>
                                <Form.Control
                                    type='text'

                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
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
                    Add
                </Button>

            </Container>

        </div>
    )
}

export default CreateSubInvoice;