import React, { useState } from 'react';

const Element = ({coursefilter ,locationfilter}) => {
  const [radioValue, setRadioValue] = useState('');
  const [checkboxValues, setCheckboxValues] = useState({
    individual: false,
    group: false,
    hourly: false,
    onsite: false,
    online: false,
  });

  const handleCourseChange = (checkboxName) => (event) => {
    setCheckboxValues((prevValues) => ({
      ...prevValues,
      [checkboxName]: event.target.checked,
    }));
    coursefilter(checkboxName)
  };

  const handleLocationChange = (checkboxName) => (event) => {
    setCheckboxValues((prevValues) => ({
      ...prevValues,
      [checkboxName]: event.target.checked,
    }));
    locationfilter(checkboxName)
  };

  return (
    <div className='text-base'>
      <form className=' text-gray-500'>
        <h1 className='mb-4 font-bold text-gray-700'>Class Types</h1>
        <div>
          <input
            type="checkbox"
            id="checkboxOption1"
            checked={checkboxValues.checkbox1}
            onChange={handleCourseChange('individual')}
            className=' w-4 h-4 mb-3'
          />
          <label htmlFor="checkboxOption1" className='m-2'>Private course</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="checkboxOption2"
            checked={checkboxValues.checkbox2}
            onChange={handleCourseChange('group')}
            className='w-4 h-4 mb-3'
          />
          <label htmlFor="checkboxOption2" className='m-2'>Group course</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="checkboxOption3"
            checked={checkboxValues.checkbox3}
            onChange={handleCourseChange('hourly')}
            className=' w-4 h-4 mb-8'
          />
          <label htmlFor="checkboxOption1" className='m-2'>Hourly class</label>
        </div>
        <div className='w-3/4 h-px bg-gray-400 mb-4'></div>

        <div>
            <h1 className='mb-4 font-bold text-gray-700'>Location Preference</h1>
        </div>

        <div>
          <input
            type="checkbox"
            id="checkboxOption7"
            checked={checkboxValues.checkbox7}
            onChange={handleLocationChange('onsite')}
            className='w-4 h-4 mb-3'

          />
          <label htmlFor="checkboxOption7" className='m-2'>Onsite</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="checkboxOption8"
            checked={checkboxValues.checkbox8}
            onChange={handleLocationChange('online')}
            className='mb-8 w-4 h-4'
          />
          <label htmlFor="checkboxOption8" className='m-2'>Online</label>
        </div>
        <div className='w-3/4 h-px bg-gray-400 mb-4'></div>

      </form>
    </div>
  );
};

export default Element;
