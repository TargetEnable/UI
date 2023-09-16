import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './App.css'; // You can create your own CSS file for styling

const ImageCarousel = () => {
  return (
    <div class="carousel">
    <Carousel showThumbs={false} infiniteLoop={true}>
      <div>
        <img src="Enable.gif" alt="Image 1" />
      </div>
      <div>
        <img src="vision1.jpeg" alt="Image 3" />
      </div>
    </Carousel>
    </div>
  );
};

export default ImageCarousel;
