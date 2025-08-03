import React, {useState} from 'react';
import './RegisterPage.scss';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import plusIcon from '../assets/images/plus-solid.svg';

import { useAutoRefreshToken } from '../utils/useAutoRefreshToken.js';
import { useGetAllRegisterByDateQuery, useDeleteRegisterMutation } from '../slices/userApiSlice'













const RegisterPage = () => {
    let today = new Date();
    today = today.toISOString().split('T')[0];


    const [selectedDate, setSelectedDate] = useState(today);

    const [selectDateTo, setDateTo] = useState('');

    useAutoRefreshToken();
    const navigate = useNavigate();
    const [deleteRegister] = useDeleteRegisterMutation();

    const { data: registerList, 
        isLoading, 
        isError, 
        error, 
        refetch } = useGetAllRegisterByDateQuery({
            dateFrom: selectedDate,
            dateTo: selectDateTo
        });


    

    const handleAddNewUser = () => {

        navigate('/create-new-register');
    }
    const handleDelete = async (id) => {
        try {
            await deleteRegister({ id }).unwrap();






        } catch (e) {
            console.log(e);
        }
    }

    const handleEditRegister = async (id) => {

        navigate(`/edit-register/${id}`);

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
    }
    if (registerList && Array.isArray(registerList) && registerList.length > 0) {

        return (


            <Container>


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
                                <th>Customer Name</th>
                                <th>Job Number</th>
                                <th>Job Name</th>
                                <th>($)Project Value</th>
                                <th>($)Fee</th>
                                <th>Invoice Number</th>
                                <th>Status</th>
                                <th>Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                registerList.map((item, index) => {
                                    return (<tr key={item._id}>
                                        <td>{item.date}</td>
                                        <td>{item.customerName}</td>
                                        <td>{item.jobNumber}</td>
                                        <td>{item.jobName}</td>
                                        <td>{item.projectValue}</td>
                                        <td>{item.chargeFee}</td>
                                        <td>{item.invoiceNumber}</td>
                                        <td>{item.status === 'o' ? 'Open' : 'Paid'}</td>
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


        )

    } else {
        return (
            <Container>



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





















                </div>



            </Container>
        )
    }







}

export default RegisterPage;