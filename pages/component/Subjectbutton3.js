// components/Slider.js
import React, { useRef } from 'react';

const totalBoxes = 30;

const Slider = () => {
  const sliderRef = useRef(null);

  const nextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += sliderRef.current.clientWidth;
    }
  };

  const prevSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= sliderRef.current.clientWidth;
      console.log("prev")
    }
  };

  return (
    <div className="flex items-center justify-center my-8 relative overflow-hidden">
      <button className="absolute left-0 top-1/2 transform -translate-y-1/2" onClick={prevSlide}>
        Previous
      </button>
      <div className="flex items-center space-x-4" ref={sliderRef}>
        {[...Array(totalBoxes)].map((_, index) => (
          <div key={index} className="bg-gray-500 h-32 w-32 mx-2 rounded-md p-4">
            <p className="text-white text-center">{index + 1}</p>
          </div>
        ))}
      </div>
      <button className="absolute right-0 top-1/2 transform -translate-y-1/2" onClick={nextSlide}>
        Next
      </button>
    </div>
  );
};

export default Slider;
