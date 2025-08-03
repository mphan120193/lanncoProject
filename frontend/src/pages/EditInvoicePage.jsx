import './EditInvoicePage.scss';
import { Container, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeHeader from '../components/HomeHeader';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useGetAllPaySheetQuery, useEditInvoiceMutation } from '../slices/userApiSlice';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import CreateSubInvoice from '../pages/CreateSubInvoice';
import SubInvoicePage from './SubInvoicePage';



const EditInvoice = () => {

    //useAutoRefreshToken();
    const { id } = useParams();
    const { data: paySheetArrayList, isLoading, isError, error } = useGetAllPaySheetQuery({ id: id });


    const paySheetList = paySheetArrayList;

    const navigate = useNavigate();
    const [date, setDate] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    const [editPaySheet] = useEditInvoiceMutation();

    useEffect(() => {



        const getPaySheet = async () => {


            try {



                if (paySheetList) {
                    setDate(paySheetList.date || '');
                    setTotalAmount(paySheetList.totalAmount || '');

                }




            } catch (e) {
                console.log(e);
            }


        };
        getPaySheet();

    }, [paySheetList])

















    const handleSaveUser = async (e) => {
        e.preventDefault();
        try {
            await editPaySheet({ id, date, totalAmount })


            navigate('/invoice-page');
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
            <>
            <HomeHeader></HomeHeader>
            <Container className='test'>
                    


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














                        <Button variant="primary" className='mb-2' onClick={handleSaveUser} >
                            Save
                        </Button>


                    </Form>

                    <SubInvoicePage paySheetId={id} />
                    <CreateSubInvoice paySheetId={id} />
                    


                </Container>
            </>
                

            
        )


    }


}

export default EditInvoice;