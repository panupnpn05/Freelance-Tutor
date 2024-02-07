import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function CarouselSlider() {
  const settings = {
    className: 'carou',
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        <div className='bg-red-200 p-4 border'>
          <h1>Math</h1>
        </div>
        <div className='bg-blue-200 p-4 border'>
          <h1>Science</h1>
        </div>
        <div className='bg-green-200 p-4 border'>
          <h1>English</h1>
        </div>
        <div className='bg-yellow-200 p-4 border'>
          <h1>Coding</h1>
        </div>
        <div className='bg-pink-200 p-4 border'>
          <h1>Japanese</h1>
        </div>
        <div className='bg-purple-200 p-4 border'>
          <h1>Chinese</h1>
        </div>
        <div className='bg-indigo-200 p-4 border'>
          <h1>Biology</h1>
        </div>
      </Slider>
    </div>
  );
}
