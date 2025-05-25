import React from 'react';
import './UserManageScreen.scss';
import Table from 'react-bootstrap/Table';
import { Container, Form } from 'react-bootstrap';
import plusIcon from '../assets/images/plus-solid.svg';


import { useGetAllUserQuery } from '../slices/userApiSlice';


import { useState, useEffect } from 'react';
import { data, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import { Buffer } from 'buffer';
import { toast } from 'react-toastify';


const UserManageScreen = () => {



    const navigate = useNavigate();

    const { data: userArrayList, isLoading, isError, error } = useGetAllUserQuery();


    const userList = userArrayList;





    // const [getOneUser] = useGetOneUserMutation()
    // const [deleteApiCall] = useDeleteUserMutation();
    // const [edit] = useEditUserMutation();


    // const [show, setShow] = useState(false);

    // const handleClose = ()=> setShow(false);


    // const [firstName, setfirstName] = useState();
    // const [lastName, setlastName] = useState();
    // const [email, setEmail] = useState();
    // const [address, setAddress] = useState();
    // const [image, setImage] = useState();
    // const [id, setId]= useState();








    const handleDelete = async (id) => {
        try {
            await deleteApiCall({ id }).unwrap();
            const res = await getAlluser().unwrap();



            if (res) {
                setUserList(res.allUserslist);
            }



        } catch (e) {
            console.log(e);
        }
    }


    const handleEditUser = async (user) => {
        setImage(null);
        setShow(true);

        setfirstName(user.firstName);
        setlastName(user.lastName);
        setEmail(user.email);
        setAddress(user.address);
        setId(user._id);

        const res = await getOneUser({ id: user._id }).unwrap();




        let img = res.allUserslist[0].image;
        if (img) {
            let image64 = new Buffer(img, 'base64').toString('binary');
            setImage(image64);

        }













    }
    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        })
    }


    const handleImageChange = async (e) => {

        const file = e.target.files[0];
        if (file) {
            let base64 = await getBase64(file);
            setImage(base64);

        }



    };

    const handleShowImage = () => {
        const newTab = window.open();
        newTab.document.write(`<img src="${image}"  alt="Image Preview" />`);
    }

    const handleSave = async () => {



        try {

            await edit({ id, firstName, lastName, email, address, image }).unwrap();
            setShow(false);
            const res = await getAlluser().unwrap();



            if (res) {
                setUserList(res.allUserslist);
            }


        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }

    }
    const handleAddNewUser = () => {
        navigate('/system/create-new-user');
    }




    //const userRoleId = useSelector((state) => state.auth.userInfo.roleID);

    if (isLoading) {
        return (
            <div>

                Loading...
            </div>
        )
    }
    else {

        if (userList.length > 0) {


            return (
                <div>

                    <Container>
                        <div className="title text-center"><h1>Manage user</h1></div>
                        <div className='add-new-button'>
                            <Button variant="primary" className='mb-2' >
                                <img className='plus-icon' src={plusIcon} alt='icon'></img>Add new user
                            </Button>

                        </div>


                        <Table striped bordered hover className="custom-table">
                            <thead >
                                <tr>

                                    <th>First Names</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Address</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {

                                    userList.map((item, index) => {

                                        


                                        return (



                                            <tr key={item._id}>
                                                <td>{item.firstName}</td>
                                                <td>{item.lastName}</td>
                                                <td>{item.email}</td>
                                                <td>{item.address}</td>
                                                <td><button className='btn btn-primary px-3 mx-3' >Edit</button>
                                                    <button className='btn btn-primary px-3' >Delete</button>
                                                </td>
                                            </tr>





                                        )

                                    })
                                }

                            </tbody>
                        </Table>


                        {/* <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Edit User</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Form.Group className='my-2' controlId='firstname'>
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control
                                                type='text'
                                                placeholder='Enter name'
                                                value={firstName}
                                                onChange={(e) => setfirstName(e.target.value)}
                                            ></Form.Control>
                                        </Form.Group>
                                        <Form.Group className='my-2' controlId='lastname'>
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control
                                                type='text'
                                                placeholder='Enter name'
                                                value={lastName}
                                                onChange={(e) => setlastName(e.target.value)}
                                            ></Form.Control>
                                        </Form.Group>

                                        <Form.Group className='my-2' controlId='email'>
                                            <Form.Label>Email Address</Form.Label>
                                            <Form.Control
                                                type='email'
                                                placeholder='Enter email'
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            ></Form.Control>
                                        </Form.Group>
                                        <Form.Group className='my-2' controlId='address'>
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control
                                                type='text'
                                                placeholder='Enter address'
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                            ></Form.Control>
                                        </Form.Group>

                                        <Form.Group className='my-2' controlId='image'>
                                        <Form.Label>Image</Form.Label>
                                        <Form.Control

                                            type="file"
                                            className="form-control"
                                            accept="image/*"
                                            onChange={handleImageChange}



                                        ></Form.Control>

                                        <div className='preview-image' onClick={handleShowImage}>
                                            <img className='img' src={image}
                                                alt="Preview"></img>
                                        </div>

                                    </Form.Group>




                                    </Form>

                                </Modal.Body>



                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={handleSave}>
                                        Save Changes
                                    </Button>
                                </Modal.Footer>
                            </Modal> */}


                    </Container>
                </div>
            )



        }















    }
}

export default UserManageScreen