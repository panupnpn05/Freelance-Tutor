import React, { useState } from 'react';

const Review = ({ onSubmit }) => {
  const [review, setReview] = useState('');
  const [submittedReview, setSubmittedReview] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(review);
    setSubmittedReview(review); // เก็บข้อความรีวิวที่ส่งไปยัง onSubmit เพื่อแสดงผล
    setReview(''); // ล้างค่าข้อความรีวิวหลังจาก Submit
  };

  return (
    <div className='mt-4'>
      <h2>{submittedReview ? 'Your Review:' : 'Write a Review:'}</h2>
      {submittedReview ? (
        <p>{submittedReview}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your review here..."
            required
            className='w-3/4'
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default Review;
