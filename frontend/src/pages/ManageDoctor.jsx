import './ManageDoctor.scss';
import { useAutoRefreshToken } from '../utils/useAutoRefreshToken.js';
import { Container, Form } from 'react-bootstrap';
import Header from '../components/Header';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect, useRef, useMemo } from 'react';


import { useGetAllCodeQuery } from '../slices/userApiSlice';
import { useGetDoctorListQuery } from '../slices/doctorApiSlice';

import { useSaveDoctorInforMutation } from '../slices/doctorApiSlice';
import MarkdownEditor from '@uiw/react-markdown-editor';
import MarkdownIt from 'markdown-it';

import { useGetDoctorDetailByIDMutation } from '../slices/doctorApiSlice';















const ManageDoctor = () => {
    useAutoRefreshToken();
    const price = useRef([]);
    const paymentMethod = useRef([]);
    
    const doctor = useRef([]);

    const [selectedDoctor, setselectedDoctor] = useState();
    const [selectedPrice, setSelectedPrice] = useState('');
    const [selectedPayment, setSelectedPayment] = useState('');
    
    const [note, setNote] = useState('');
    const [description, setDescription] = useState('');
    const [getDoctorDetail] = useGetDoctorDetailByIDMutation();
    const [saveDoctorInfor] = useSaveDoctorInforMutation();
    const [markdown, setMarkdown] = useState('');
    const [contentHTML, setContentHTML] = useState('');
    const mdParser = new MarkdownIt();
    const toolbarConfig = {
        bold: true,
        italic: true,
        code: true,
        title: true,
        quote: true,
        unorderedList: true,
        orderedList: true,
        link: true,
        image: true,
        codeBlock: true,
        table: true,
        fullScreen: true,
        preview: true,
    };

    useEffect(() => {

        const fetchDoctorData = async () => {
            console.log(selectedDoctor);
            setSelectedPrice('');
            setSelectedPayment('');
            
            setDescription('');
            setNote('');

            if (selectedDoctor) {
                const data = await getDoctorDetail({ id: selectedDoctor }).unwrap();
                
                if (data.doctorInfo[0].markdowns[0]) {
                    setDescription(data.doctorInfo[0].markdowns[0].description);
                    setMarkdown(data.doctorInfo[0].markdowns[0].content);

                }
                
                if (data.doctorInfo[0].additionalDoctorinfo[0]) {
                    
                    setNote(data.doctorInfo[0].additionalDoctorinfo[0].note);
                    
                    const foundPrice = price.current.find(item => item.key === data.doctorInfo[0].additionalDoctorinfo[0].priceID);
                    const foundPayment = paymentMethod.current.find(item => item.key === data.doctorInfo[0].additionalDoctorinfo[0].paymentID);
                    

                    
                    setSelectedPrice(foundPrice.key);
                    setSelectedPayment(foundPayment.key);
                    


                }
            }


        }

        fetchDoctorData();

    }, [selectedDoctor])

    const { data: doctorArrList, isLoading, isError, error } = useGetDoctorListQuery();

    

    const { data: priceListArrRs, isLoading: isPriceLoading, isError: isPriceError, error: priceError } = useGetAllCodeQuery({ type: "PRICE" });



    const { data: paymentListArrRS, isLoading: isPaymentLoading, isError: isPaymentError, error: paymentError } = useGetAllCodeQuery({ type: "PAYMENT" });



    

    const priceListArr = priceListArrRs || [];
    const paymentListArr = paymentListArrRS || [];
    
    const doctorListArr = doctorArrList?.data || [];

   

    useMemo(()=>{
        if(priceListArr){
            price.current = priceListArr.allcode;
        }
        if(paymentListArr){
            paymentMethod.current= paymentListArr.allcode
        }
        
        if(doctorListArr){
            doctor.current = doctorListArr
        }

    }, [priceListArr, paymentListArr, doctorListArr])

    

    // Combine loading states
    const overallLoading = isPriceLoading || isPaymentLoading ;
    // Combine error states
    const overallError = isPriceError || isPaymentError ;

    // 1. Handle overall loading state
    if (overallLoading) {
        return <div>Loading all code lists...</div>;
    }

    // 2. Handle overall error state
    if (overallError) {
        // You might want to log specific errors for debugging
        console.error('PriceError:', priceError);
        console.error('Payment Error:', paymentError);
        
        return <div>Error loading code lists. Please try again.</div>;
    }
    


    
    


    

    



    



    const handleSave = async (e) => {
        e.preventDefault();
        console.log('selected doctor ID: ', selectedDoctor);
        console.log('Doctor Description: ', description);
        console.log('selected Price: ', selectedPrice);
        console.log('Selected payment: ', selectedPayment);
        console.log('Clinic Note: ', note);
        console.log('markdown: ', markdown);
        console.log('Content HTML: ', contentHTML);


        try {

            const res = await saveDoctorInfor({
                id: selectedDoctor,
                description: description,
                content: markdown,

                contentHTML: contentHTML,
                price: selectedPrice,
                payment: selectedPayment,
                
                clinicNote: note,
            });



            if (res.data.message === "Markdown saved successfully!") {

                setselectedDoctor('');
                setDescription('');
                setSelectedPrice('');
                setSelectedPayment('');
                
                setNote('');
                setMarkdown('');
                setContentHTML('')



            }
        } catch (error) {
            console.error('Error saving markdown:', error);
        }



    }

    



    const handleSelectDoctorChange = async (e) => {

        setselectedDoctor(e.target.value);
        

    }





    return (
        <div>
            <Header />

            <Container>
                <div className="title text-center"><h1>Manage Doctor</h1></div>
                <Row className="custom-row">
                    <Col >

                        <div>Select Doctor</div>
                        <Form.Control as="select" value={selectedDoctor} onChange={(e) => handleSelectDoctorChange(e)}>
                            <option value="">
                                Select a doctor...
                            </option>

                            {doctor.current.map((item, index) => {
                                

                                return (

                                    <option value={item._id} key={item._id} >{item.firstName}</option>



                                )
                            })}
                        </Form.Control>

                    </Col>
                    <Col ><div>Doctor Description</div>
                        <Form.Control
                            as="textarea"

                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></Form.Control>
                    </Col>
                </Row>

                <Row className="custom-row">
                    <Col><div >Select Price</div>
                        <Form.Control as="select" value={selectedPrice} onChange={(e) => setSelectedPrice(e.target.value)}>
                            <option value="">
                                Select a price...
                            </option>

                            {price.current.map((item, index) => {
                                
                                return (

                                    <option value={item.key} key={item._id} >{item.value_en}</option>



                                )
                            })}
                        </Form.Control>
                    </Col>
                    <Col><div >Payment Method</div>
                        <Form.Control as="select" value={selectedPayment} onChange={(e) => setSelectedPayment(e.target.value)}>
                            <option value="">
                                Select a payment...
                            </option>

                            {paymentMethod.current.map((item, index) => {

                                return (

                                    <option value={item.key} key={item._id} >{item.value_en}</option>


                                )
                            })}
                        </Form.Control>
                    </Col>
                    
                </Row>
                <Row className="custom-row">
                    
                    <Col><div >Note</div>
                        <Form.Control
                            as="textarea"

                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        ></Form.Control></Col>
                </Row>
                <Row className="custom-row" >
                    <Col>
                        <div >
                            <h2>Markdown Editor</h2></div>
                        <MarkdownEditor className="markdown-custom-row"
                            value={markdown}
                            onChange={(value) => {
                                setMarkdown(value);

                                setContentHTML(mdParser.render(value));

                                console.log('content ', markdown, 'contentHTML', contentHTML)
                            }}

                            toolbar={toolbarConfig}
                        /></Col>

                </Row>
                <Button variant="primary" className='mt-2' onClick={handleSave}>
                    Save
                </Button>



            </Container>

        </div>
    )





}

export default ManageDoctor