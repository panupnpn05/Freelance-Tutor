import React, { useState } from 'react';

const Element = ({ coursefilter, locationfilter, subjectfilter }) => {
  const [checkboxValues, setCheckboxValues] = useState({
    individual: false,
    group: false,
    hourly: false,
    onsite: false,
    online: false,
    math: false,
    science: false,
    biology: false,
    coding: false,
    chinese: false,
    japanese: false,
    thai: false,
    english: false,
  });

  const handleCourseChange = (checkboxName) => (event) => {
    setCheckboxValues((prevValues) => ({
      ...prevValues,
      [checkboxName]: event.target.checked,
    }));
    coursefilter(checkboxName);
  };

  const handleLocationChange = (checkboxName) => (event) => {
    setCheckboxValues((prevValues) => ({
      ...prevValues,
      [checkboxName]: event.target.checked,
    }));
    locationfilter(checkboxName);
  };

  const handleSubjectChange = (checkboxName) => (event) => {
    setCheckboxValues((prevValues) => ({
      ...prevValues,
      [checkboxName]: event.target.checked,
    }));
    subjectfilter(checkboxName);
  };

  return (
    <div className='text-base'>
      <form className='text-gray-500'>
        <h1 className='mb-4 font-bold text-gray-700'>Class Types</h1>
        <div className='checkbox-group'>
          <input
            type="checkbox"
            id="checkboxOption1"
            checked={checkboxValues.individual}
            onChange={handleCourseChange('individual')}
            className='w-4 h-4 mb-3'
          />
          <label htmlFor="checkboxOption1" className='m-2'>Private course</label>
        </div>

        <div className='checkbox-group'>
          <input
            type="checkbox"
            id="checkboxOption2"
            checked={checkboxValues.group}
            onChange={handleCourseChange('group')}
            className='w-4 h-4 mb-3'
          />
          <label htmlFor="checkboxOption2" className='m-2'>Group course</label>
        </div>

        <div className='checkbox-group'>
          <input
            type="checkbox"
            id="checkboxOption3"
            checked={checkboxValues.hourly}
            onChange={handleCourseChange('hourly')}
            className='w-4 h-4 mb-8'
          />
          <label htmlFor="checkboxOption3" className='m-2'>Hourly class</label>
        </div>

        <div className='w-3/4 h-px bg-gray-400 mb-4'></div>

        <h1 className='mb-4 font-bold text-gray-700'>Location Preference</h1>
        <div className='checkbox-group'>
          <input
            type="checkbox"
            id="checkboxOption7"
            checked={checkboxValues.onsite}
            onChange={handleLocationChange('onsite')}
            className='w-4 h-4 mb-3'
          />
          <label htmlFor="checkboxOption7" className='m-2'>Onsite</label>
        </div>

        <div className='checkbox-group'>
          <input
            type="checkbox"
            id="checkboxOption8"
            checked={checkboxValues.online}
            onChange={handleLocationChange('online')}
            className='w-4 h-4 mb-8'
          />
          <label htmlFor="checkboxOption8" className='m-2'>Online</label>
        </div>

        <div className='w-3/4 h-px bg-gray-400 mb-4'></div>

        <h1 className='mb-4 font-bold text-gray-700'>Subject</h1>
        <div className='checkbox-group'>
          <input
            type="checkbox"
            id="checkboxOption9"
            checked={checkboxValues.math}
            onChange={handleSubjectChange('math')}
            className='w-4 h-4 mb-3'
          />
          <label htmlFor="checkboxOption9" className='m-2'>Math</label>
        </div>

        <div className='checkbox-group'>
          <input
            type="checkbox"
            id="checkboxOption10"
            checked={checkboxValues.science}
            onChange={handleSubjectChange('science')}
            className='w-4 h-4 mb-3'
          />
          <label htmlFor="checkboxOption10" className='m-2'>Science</label>
        </div>

        <div className='checkbox-group'>
          <input
            type="checkbox"
            id="checkboxOption11"
            checked={checkboxValues.biology}
            onChange={handleSubjectChange('biology')}
            className='w-4 h-4 mb-3'
          />
          <label htmlFor="checkboxOption11" className='m-2'>Biology</label>
        </div>

        <div className='checkbox-group'>
          <input
            type="checkbox"
            id="checkboxOption12"
            checked={checkboxValues.coding}
            onChange={handleSubjectChange('coding')}
            className='w-4 h-4 mb-3'
          />
          <label htmlFor="checkboxOption12" className='m-2'>Coding</label>
        </div>

        <div className='checkbox-group'>
          <input
            type="checkbox"
            id="checkboxOption13"
            checked={checkboxValues.chinese}
            onChange={handleSubjectChange('chinese')}
            className='w-4 h-4 mb-3'
          />
          <label htmlFor="checkboxOption13" className='m-2'>Chinese</label>
        </div>

        <div className='checkbox-group'>
          <input
            type="checkbox"
            id="checkboxOption14"
            checked={checkboxValues.japanese}
            onChange={handleSubjectChange('japanese')}
            className='w-4 h-4 mb-3'
          />
          <label htmlFor="checkboxOption14" className='m-2'>Japanese</label>
        </div>

        <div className='checkbox-group'>
          <input
            type="checkbox"
            id="checkboxOption15"
            checked={checkboxValues.thai}
            onChange={handleSubjectChange('thai')}
            className='w-4 h-4 mb-3'
          />
          <label htmlFor="checkboxOption15" className='m-2'>Thai</label>
        </div>

        <div className='checkbox-group'>
          <input
            type="checkbox"
            id="checkboxOption16"
            checked={checkboxValues.english}
            onChange={handleSubjectChange('english')}
            className='w-4 h-4 mb-3'
          />
          <label htmlFor="checkboxOption16" className='m-2'>English</label>
        </div>
      </form>
    </div>
  );
};

export default Element;
