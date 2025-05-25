import './DentalControlledCarousel.scss';
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from './ExampleCarouselImage.jsx';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function ControlledCarousel() {
    const [index, setIndex] = useState(0);
    const navigate = useNavigate();


    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };
    const handleNavigateAndScroll = (path) => {
        navigate(path);
        window.scrollTo(0, 0); 
    };

    return (

        // <Carousel activeIndex={index} onSelect={handleSelect} className='custom-carousel'>

        //     <Carousel.Item className="custom-carousel-item">



        //         <div className="image-wrapper">
        //             <ExampleCarouselImage text="First slide" />

        //             <div className='detail-infor'>
        //                 <h1>We Welcome New <br></br> Patients</h1>
        //                 <p>We invite you to contact us to discuss your dental care <br></br>
        //                     Please don't hesitate to call us at (727)-310-8596</p> 
        //                 <div><Button variant="secondary" className='mb-2'onClick={()=>{navigate('/new-patients'); window.scrollTo(0, 0);}}>Read More</Button></div>

        //             </div>
        //             <div></div>



        //         </div>
        //     </Carousel.Item>
        //     <Carousel.Item className="custom-carousel-item">



        //         <div className="image-wrapper">
        //             <ExampleCarouselImage text="Second slide" />

        //             <div className='detail-infor'>
        //                 <h1>Request An Appointment <br></br> Today!</h1>

        //                 <p>Quickly and easily request online appointment
        //                     today!</p>

        //                 <div><Button variant="secondary" className='mb-2' onClick={()=>{navigate('/appointment'); window.scrollTo(0, 0);}}>REQUEST APPOINTMENT </Button></div>

        //             </div>





        //         </div>
        //     </Carousel.Item>

        // </Carousel>

        <Carousel activeIndex={index} onSelect={handleSelect} className='sunshine-carousel'>

            {/* Carousel Item 1: Welcome New Patients */}
            <Carousel.Item className="sunshine-carousel-item">
                
                <ExampleCarouselImage className="d-block w-100 carousel-background-image" text="First slide" />

                <Carousel.Caption className="sunshine-carousel-caption">
                    <h1 className="caption-title animate__animated animate__fadeInDown">We Welcome New Patients</h1>
                    <p className="caption-text animate__animated animate__fadeInUp">
                        We invite you to contact us to discuss your dental care needs.
                        <br />Please don't hesitate to call us at <span className="d-block d-md-inline-block">(727) 310-9596</span>
                    </p>
                    <Button
                        variant="primary" // Use your primary brand color (green)
                        size="lg"
                        className="caption-button animate__animated animate__zoomIn"
                        onClick={() => handleNavigateAndScroll('/new-patients')}
                    >
                        Read More
                    </Button>
                </Carousel.Caption>
            </Carousel.Item>

            
            <Carousel.Item className="sunshine-carousel-item">
                
                
                <ExampleCarouselImage className="d-block w-100 carousel-background-image" text="Second slide" />
                <Carousel.Caption className="sunshine-carousel-caption">
                    <h1 className="caption-title animate__animated animate__fadeInDown">Request An Appointment Today!</h1>
                    <p className="caption-text animate__animated animate__fadeInUp">
                        Quickly and easily request your next dental appointment online.
                    </p>
                    <Button
                        variant="primary" // Use your primary brand color (green)
                        size="lg"
                        className="caption-button animate__animated animate__zoomIn"
                        onClick={() => handleNavigateAndScroll('/appointment')}
                    >
                        REQUEST APPOINTMENT
                    </Button>
                </Carousel.Caption>
            </Carousel.Item>

            

        </Carousel>



    );
}

export default ControlledCarousel;