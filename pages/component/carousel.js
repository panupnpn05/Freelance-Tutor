import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';

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
        <div className='bg-red-600 p-4 border rounded-lg'>
        <div className='flex justify-center'>
        <Image
                src="/Image/math.png"
                width={100}
                height={100}
                alt="Get up to 10 tutor applications"
                />
        </div>
          <h1 className='text-3xl'>Math</h1>
        </div>
        <div className='bg-blue-600 p-4 border rounded-lg'>
        <div className='flex justify-center'>
        <Image
                src="/Image/science.png"
                width={100}
                height={100}
                alt="Get up to 10 tutor applications"
                />
        </div>
          <h1 className='text-3xl'>Science</h1>
        </div>
        <div className='bg-sky-500 p-4 border rounded-lg'>
        <div className='flex justify-center'>
        <Image
                src="/Image/english.png"
                width={100}
                height={100}
                alt="Get up to 10 tutor applications"
                />
        </div>
          <h1 className='text-3xl'>English</h1>
        </div>
        <div className='bg-yellow-600 p-4 border rounded-lg'>
        <div className='flex justify-center'>
        <Image
                src="/Image/coding.png"
                width={100}
                height={100}
                alt="Get up to 10 tutor applications"
                />
        </div>
          <h1 className='text-3xl'>Coding</h1>
        </div>
        <div className='bg-pink-600 p-4 border rounded-lg'>
        <div className='flex justify-center'>
        <Image
                src="/Image/Japanese_icon_(for_user_box).svg.png"
                width={100}
                height={100}
                alt="Get up to 10 tutor applications"
                />
        </div>
          <h1 className='text-3xl'>Japanese</h1>
        </div>
        <div className='bg-yellow-500 p-4 border rounded-lg'>
        <div className='flex justify-center'>
        <Image
                src="/Image/chinese.png"
                width={100}
                height={100}
                alt="Get up to 10 tutor applications"
                />
        </div>
          <h1 className='text-3xl'>Chinese</h1>
        </div>
        <div className='bg-green-600 p-4 border rounded-lg'>
        <div className='flex justify-center'>
        <Image
                src="/Image/biology.png"
                width={100}
                height={100}
                alt="Get up to 10 tutor applications"
                />
        </div>
          <h1 className='text-3xl'>Biology</h1>
        </div>
      </Slider>
    </div>
  );
}
