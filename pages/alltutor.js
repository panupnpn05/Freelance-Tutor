import React from 'react';
import SearchBar from './compernent/SearchBar';

const Tutor = () => {
  const handleSearch = (searchText) => {
    console.log('ค้นหา: ', searchText);
  };

  return (
    <div className='text-center'>
      <div className='mt-32 flex-col'>
        <div className='mb-4 font-bold text-3xl flex-col'>
        <h1>Tutors in Bangkok</h1>
        </div>
        <div className='w-3/5 text-xl mb-8'>
          <h1>Find the best tutors in Bangkok. Get personalized one-on-one learning to boost your grades with our skilled Bangkok tutors. Get Test Prep and Homework assistance too.</h1>
        </div>
      </div>
      <SearchBar onSearch={handleSearch} />
    </div>
  );
};

export default Tutor;
