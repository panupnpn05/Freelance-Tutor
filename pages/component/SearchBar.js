import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchText1, setSearchText1] = useState('');
  const [searchText2, setSearchText2] = useState('');

  

  const handleInputChange1 = (e) => {
    setSearchText1(e.target.value);
  };

  const handleInputChange2 = (e) => {
    setSearchText2(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <div className='flex justify-evenly'>
      <input
        type="text"
        placeholder="พิมพ์เพื่อค้นหาวิชา"
        value={searchText1}
        onChange={handleInputChange1}
      />
      <button onClick={handleSearch} className='mr-8'>ค้นหา</button>
    <input
      type="text"
      placeholder="พิมพ์เพื่อค้นหาสถานที่"
      value={searchText2}
      onChange={handleInputChange2}
    />
    <button onClick={handleSearch}>ค้นหา</button>
  </div>
  );
};

export default SearchBar;