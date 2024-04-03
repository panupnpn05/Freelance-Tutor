import React, { useState } from 'react';

const Ratingstar = ({sendReview}) => {
  const [selectedStars, setSelectedStars] = useState(0);

  const handleStarClick = (index) => {
    setSelectedStars(index + 1)
    sendReview(index + 1); // Call the callback function to send the review to the parent component
  };

  return (
    <ul className="flex justify-left">
      {[...Array(5)].map((_, index) => (
        <li key={index}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={index < selectedStars ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={`mr-1 h-7 w-7 cursor-pointer ${index < selectedStars ? " text-amber-300" : ""}`}
            onClick={() => handleStarClick(index)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
        </li>
      ))}
    </ul>
  );
};

export default Ratingstar;
