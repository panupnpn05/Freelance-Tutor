import React from 'react';
import SearchBar from './compernent/SearchBar';
import Element from './compernent/element';
import Navbar from './compernent/Navbar';

const Tutor = () => {
  const handleSearch = (searchText) => {
    console.log('ค้นหา: ', searchText);
  };

  return (
    <div>
      <Navbar/>
    <div className='w-full flex justify-center'>
      <div className='pt-32 w-3/4 bg-green-200'>
        <div>
        <div className='mb-4 font-bold text-3xl'>
        <h1>Tutors in Bangkok</h1>
        </div>
        <div className='text-xl mb-8'>
          <h1>Find the best tutors in Bangkok. Get personalized one-on-one learning to boost your grades with our skilled Bangkok tutors. Get Test Prep and Homework assistance too.</h1>
        </div>
        <div className='mb-8'>
        <SearchBar onSearch={handleSearch} />
        </div>
        </div>
        <div className=' w-1/4 bg-orange-200'>
        <Element/>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Tutor;
