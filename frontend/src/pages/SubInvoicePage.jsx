import React from 'react';
import './SubInvoicePage.scss';
import { Container } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';

import Table from 'react-bootstrap/Table';
import { useGetAllSubPaySheetQuery, useDeleteSubPaySheetMutation } from '../slices/userApiSlice';















const SubInvoicePage = ({paySheetId}) => {

    
    const navigate = useNavigate();
    const [deleteSubPaySheet] = useDeleteSubPaySheetMutation();

    const { data: subPaySheetArrayList, isLoading, isError, error } = useGetAllSubPaySheetQuery({id:paySheetId});


    const subPaySheetList = subPaySheetArrayList;
    

    
    const handleDelete = async (id) => {
        try {

            await deleteSubPaySheet({id, paySheetId})





        } catch (e) {
            console.log(e);
        }
    }

    


    if (isLoading) {
        return (
            
            <div>Loading...</div>

                    
        )
    }
    if (isError) {
        return <p>Error: {error?.message || 'Something went wrong'}</p>;
    }

    if (subPaySheetList && Array.isArray(subPaySheetList) && subPaySheetList.length > 0) {

        return (

            <div className='home-page'>
                <Container>
                    






                    <div className='aboutpage-content'>



                        

                        <Table striped bordered hover className="custom-table">
                            <thead >
                                <tr>

                                    <th>($)Amount</th>
                                    <th>Invoice Number</th>
                                    <th>Action</th>
                                    

                                    

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    subPaySheetList.map((item, index) => {
                                        
                                        return (<tr key={item._id}>
                                            <td>{item.amount}</td>
                                            <td>{item.invoiceNumber}</td>

                                            <td>
                                                <div className='button-container'>
                                                    


                                                    <div className='delete-button-container'>
                                                        <button className='delete-button'
                                                            onClick={() => { handleDelete(item._id) }}> X

                                                        </button>

                                                    </div>

                                                </div>




                                            </td>
                                        </tr>)


                                    })
                                }


                            </tbody>
                        </Table>



















                    </div>



                </Container>

            </div>
        )

    }else{
        return (
            <div className='home-page'>
                <Container>
                    
                    <div className='aboutpage-content'>
                        

                        <Table striped bordered hover className="custom-table">
                            <thead >
                                <tr>

                                    <th>Created Date</th>
                                    <th>Total Amount</th>

                                    <th>Action</th>

                                </tr>
                            </thead>
                            
                        </Table>
                        

                    </div>

                </Container>


            </div>
        )

    }




}

export default SubInvoicePage;