import React, { useState } from 'react';

const Review = ({ sendReview }) => {
  const [review, setReview] = useState('');

  const handleReviewChange = (e) => {
    const newReview = e.target.value;
    setReview(newReview);
    sendReview(newReview); // Call the callback function to send the review to the parent component
  };

  return (
    <div>
      <form>
        <textarea
          value={review}
          onChange={handleReviewChange}
          placeholder="Write your review here..."
          required
          className='w-full h-20 outline-none'
        ></textarea>
      </form>
    </div>
  );
};

export default Review;
