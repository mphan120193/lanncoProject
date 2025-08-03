import React from 'react';
import './DoctorDetailPage.scss';
import { Container } from 'react-bootstrap';
import HomeHeader from '../components/HomeHeader';

import Homefooter from '../components/Homefooter';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {useGetDoctorDetailByIDMutation} from '../slices/doctorApiSlice';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Buffer } from 'buffer';
import ReactMarkdown from 'react-markdown';
import { useAutoRefreshToken } from '../utils/useAutoRefreshToken.js';













const DoctorDetailPage = () => {
    useAutoRefreshToken();
    const { id } = useParams();
    let doctorID = id;

    const [getDoctorDetail] = useGetDoctorDetailByIDMutation();
    const [doctorInfo, setDoctorInfo] = useState('');



    useEffect(() => {



        const getDoctor = async () => {
            
            
            try {
                const doctorRespone = await getDoctorDetail({id:doctorID}).unwrap();
                if (doctorRespone) {
                    setDoctorInfo(doctorRespone.doctorInfo[0]);
                }

            } catch (e) {
                console.log(e);
            }


        };
        getDoctor();

    },[doctorID])





    
   

    if(doctorInfo){

        const markdownContent = doctorInfo.markdowns[0].content;

        let image64;
    

        if (doctorInfo.image) {



            image64 = new Buffer(doctorInfo.image, 'base64').toString('binary');
        } else {
            image64 = null;
        }
        

        return (

        
        

            <div className='home-page'>
                
                <Container>
                    <HomeHeader></HomeHeader>
    
    
    
    
    
                    <div className='doctor-detail-page-content'>
    
                        
                        <div className='title text-center'>{doctorInfo.firstName} {doctorInfo.lastName}</div>
    
                        <Row>
                            <Col>
                            <div className='about-picture'>
                                <img src={image64} alt='img' className='image'></img>
                            </div>
                                
                                </Col>
                            <Col>
                                <div className='doctor-infor-text'>
                                <ReactMarkdown>{markdownContent}</ReactMarkdown>
                                    
    
                                
                                </div>
                            </Col>
                        </Row>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
                    </div>
    
                    <Homefooter></Homefooter>
    
                </Container>
    
            </div>
        )

    }else{
        return(
            <div>Loading....</div>
        )
    }

    


}

export default DoctorDetailPage;