import React, { useState, useEffect } from 'react';
import './InvoicePage.scss';
import { Container } from 'react-bootstrap';
import HomeHeader from '../components/HomeHeader';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import plusIcon from '../assets/images/plus-solid.svg';
import Table from 'react-bootstrap/Table';
import { useAutoRefreshToken } from '../utils/useAutoRefreshToken.js';

import { useDeletePaySheetMutation, useGetAllPaySheetbyDateQuery } from '../slices/userApiSlice';



const InvoicePage = () => {
    let today = new Date();
    today = today.toISOString().split('T')[0];


    const [selectedDate, setSelectedDate] = useState(today);

    const [selectDateTo, setDateTo] = useState('');
    




    useAutoRefreshToken();
    const navigate = useNavigate();
    const [deletePaySheet] = useDeletePaySheetMutation();


    const { data: paySheetList,
        isLoading,
        isError,
        error,
        refetch }
        = useGetAllPaySheetbyDateQuery({
            dateFrom: selectedDate,
            dateTo: selectDateTo
        });

        

    useEffect(() => {
        if (selectedDate||selectDateTo) {
            refetch(); // will trigger data reload
        }
    }, [selectDateTo, selectedDate , refetch]);


    const handleAddNewUser = () => {

        navigate('/create-new-invoice');
    }
    const handleDelete = async (id) => {
        try {
            await deletePaySheet({ id });






        } catch (e) {
            console.log(e);
        }
    }

    const handleEditRegister = async (id) => {

        navigate(`/edit-invoice/${id}`);

    }

    

    if (isLoading) {
        return (

            <div>Loading...</div>


        )
    }
    if (isError) {
        return <p>Error: {error?.message || 'Something went wrong'}</p>;
    }




    if (paySheetList && Array.isArray(paySheetList) && paySheetList.length > 0) {

        return (

            <div className='home-page'>

                <Container>
                    <HomeHeader></HomeHeader>

                    <h3 className='text-center'>Invoice List</h3>
                    <div className='search-area'>
                        <div className='single-date-search'>
                            <label>Select a Date:</label>
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => { setSelectedDate(e.target.value) }}
                            />

                        </div>
                        <div className='range-date-search'>


                            <label>&#160;&#160;To&#160;&#160;</label>
                            <input
                                type="date"
                                value={selectDateTo}
                                onChange={(e) => { setDateTo(e.target.value) }}
                            />
                            <label>&#160;&#160;&#160;&#160;</label>
                            
                        </div>


                    </div>




                    <div className='aboutpage-content'>



                        <div className='add-new-button'>
                            <Button variant="primary" className='mb-2' onClick={handleAddNewUser}>
                                <img className='plus-icon' src={plusIcon} alt='icon'></img>Add new
                            </Button>

                        </div>

                        <Table striped bordered hover className="custom-table">
                            <thead >
                                <tr>

                                    <th>Created Date</th>
                                    <th>($)Total Amount</th>

                                    <th>Action</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    paySheetList.map((item, index) => {
                                        return (<tr key={item._id}>
                                            <td>{item.date}</td>
                                            <td>{item.totalAmount}</td>

                                            <td>
                                                <div className='button-container'>
                                                    <div className='edit-button-container'>
                                                        <button className='edit-button'
                                                            onClick={() => { handleEditRegister(item._id) }}> O

                                                        </button>

                                                    </div>


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

    }
    else {
        return (
            <div className='home-page'>

                <Container>
                    <HomeHeader></HomeHeader>





                    <h3 className='text-center'>Invoice List</h3>
                    <div className='search-area'>
                        <div className='single-date-search'>
                            <label>Select a Date:</label>
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => { setSelectedDate(e.target.value) }}
                            />

                        </div>
                        <div className='range-date-search'>
                            <label>From&#160;&#160;</label>


                            <label>&#160;&#160;To&#160;&#160;</label>
                            <input
                                type="date"
                                value={selectDateTo}
                                onChange={(e) => { setDateTo(e.target.value) }}
                            />
                            <label>&#160;&#160;&#160;&#160;</label>
                            
                        </div>


                    </div>

                    <div className='aboutpage-content'>

                        <div className='add-new-button'>
                            <Button variant="primary" className='mb-2' onClick={handleAddNewUser}>
                                <img className='plus-icon' src={plusIcon} alt='icon'></img>Add new
                            </Button>

                        </div>

                        {paySheetList && paySheetList.length === 0 && (
                            <p className="text-center">No pay sheet found for selected date range.</p>
                        )}
                    </div>

                </Container>

            </div>
        )

    }


}

export default InvoicePage;



