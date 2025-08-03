import React from 'react';
import firstSlide from '../assets/images/slide1.jpg';
import secondSlide from '../assets/images/slide2.jpg';



function ExampleCarouselImage({ text}) {
    let imageSource;
    let altText = text;
  
    switch (text) {
      case "First slide":
        imageSource = firstSlide;
        break;
      case "Second slide":
        imageSource = secondSlide;
        break;
      
      default:
        imageSource = ''; // Or a default image import
        altText = 'Default Image';
    }
  
    return <img className="d-block w-100" src={imageSource} alt={altText} />;
}

export default ExampleCarouselImage;