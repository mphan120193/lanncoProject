import './CreateNewUser.scss';
import { Container, Form } from 'react-bootstrap';
import {  useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGetAllCodeQuery } from '../slices/userApiSlice';
import { useRegisterWImageMutation } from '../slices/userApiSlice';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { useAutoRefreshToken } from '../utils/useAutoRefreshToken.js';


const CreateNewUser = () => {
    
    useAutoRefreshToken();
    
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [genderID, setGenderID] = useState('M');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [positionID, setPositionID] = useState('P2');
    const [roleID, setRoleID] = useState('102');
    const [image, setImage] = useState(null);
    const [registerWimage] = useRegisterWImageMutation();

    const { data: genderList, isLoading: isGenderLoading, isError: isGenderError, error: genderError } = useGetAllCodeQuery({ type: "GENDER" });
  

  
  const { data: positionList, isLoading: isPositionLoading, isError: isPositionError, error: positionError } = useGetAllCodeQuery({ type: "POSITION" });
  

  
  const { data: rolesList, isLoading: isRolesLoading, isError: isRolesError, error: rolesError } = useGetAllCodeQuery({ type: "ROLE" });
  

  // Combine loading states
  const overallLoading = isGenderLoading || isPositionLoading || isRolesLoading;
  // Combine error states
  const overallError = isGenderError || isPositionError || isRolesError;

  // 1. Handle overall loading state
  if (overallLoading) {
    return <div>Loading all code lists...</div>;
  }

  // 2. Handle overall error state
  if (overallError) {
    // You might want to log specific errors for debugging
    console.error('Gender Error:', genderError);
    console.error('Position Error:', positionError);
    console.error('Roles Error:', rolesError);
    return <div>Error loading code lists. Please try again.</div>;
  }

 
  const genderArr = genderList?.allcode || []; 
  const positionArr = positionList?.allcode || [];
  const roleIDArr = rolesList?.allcode || [];





    
    
    

   

    const handleImageChange = async (e) => {
        const file = e.target.files[0];


        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function (event) {
            const img = new Image();
            img.src = event.target.result;

            img.onload = function () {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const size = 300; // Target size

                // Set canvas size
                canvas.width = size;
                canvas.height = size;

                // Draw the resized image on the canvas
                ctx.drawImage(img, 0, 0, size, size);

                // Convert canvas to Base64 in PNG format
                const resizedBase64 = canvas.toDataURL('image/png');

                setImage(resizedBase64);




            };



        }

    }
    const handleSaveUser = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
        } else {
            try {

                await registerWimage({
                    firstName, lastName, email, password, address,
                    phoneNumber, roleID, genderID, positionID, image
                }).unwrap();


                navigate('/system/user-manage');
            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <div>
            <Container>
                <div className="title text-center"><h1>Add New User</h1></div>
                <Form >
                    <Form.Group className='my-2' controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Enter email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group className='my-2' controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group className='my-2' controlId='confirmPassword'>

                        <Form.Control
                            type='password'
                            placeholder='Confirm password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group className='my-2' controlId='firstname'>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter first name'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group className='my-2' controlId='lastname'>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter last name'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
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

                    <Form.Group className='my-2' controlId='phoneNumber'>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            type='tel'
                            placeholder='Enter Phone Number'
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                            title="Please enter a 10-digit phone number (e.g., 1234567890)" 
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group className='my-2' controlId='gender'>
                        <Form.Label>Gender</Form.Label>
                        <Form.Control as="select" value={genderID} onChange={(e) => setGenderID(e.target.value)}>
                            {genderArr && genderArr.length > 0 && genderArr.map((item, index) => {

                                return (

                                    <option value={item.key} key={item._id} >{item.value_en}</option>



                                )
                            })}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className='my-2' controlId='position'>
                        <Form.Label>Position</Form.Label>
                        <Form.Control as="select" value={positionID} onChange={(e) => setPositionID(e.target.value)}>
                            {positionArr && positionArr.length > 0 && positionArr.map((item, index) => {

                                return (

                                    <option value={item.key} key={item._id} >{item.value_en}</option>



                                )
                            })}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className='my-2' controlId='roleID'>
                        <Form.Label>Role</Form.Label>
                        <Form.Control as="select" value={roleID} onChange={(e) => setRoleID(e.target.value)}>
                            {roleIDArr && roleIDArr.length > 0 && roleIDArr.map((item, index) => {

                                return (

                                    <option value={item.key} key={item._id} >{item.value_en}</option>



                                )
                            })}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className='my-2' controlId='image'>
                        <Form.Label>Image</Form.Label>
                        <Form.Control

                            type="file"
                            className="form-control"
                            accept="image/*"
                            onChange={handleImageChange}



                        ></Form.Control>

                        <div className='preview-image'>
                            <img className='img' src={image}
                                alt="Preview"></img>
                        </div>

                    </Form.Group>




                </Form>

                <Button variant="primary" className='mb-2' onClick={handleSaveUser} >
                    Save
                </Button>

            </Container>

        </div>
    )
}

export default CreateNewUser;