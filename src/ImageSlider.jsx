import React from 'react';
import Slider from 'react-slick';
import './ImageSlider.css';
import slide1 from './images/slide1.jpg'; 
import slide2 from './images/slide2.jpg'; 
import slide3 from './images/slide3.jpg';   
import slide4 from './images/slide4.jpg';   
import slide5 from './images/slide5.jpg'; 
import slide6 from './images/slide6.jpg';
import slide7 from './images/slide7.jpg';
const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return ( 
    
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <img src={slide1} alt="Image 1" className="slider-image" />
        </div>
        <div>
          <img src={slide2} alt="Image 2" className="slider-image" />
        </div>
        <div>
          <img src={slide3} alt="Image 3" className="slider-image" />
        </div>  
        <div>
          <img src={slide4} alt="Image 3" className="slider-image" />
        </div> 
        <div>
          <img src={slide5} alt="Image 5" className="slider-image" />
        </div> 
        <div>
          <img src={slide6} alt="Image 6" className="slider-image" />
        </div> 
        <div>
          <img src={slide7} alt="Image 7" className="slider-image" />
        </div>
        
      </Slider>
    </div> 
    
  );
}

export default ImageSlider;