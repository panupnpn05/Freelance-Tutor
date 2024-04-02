import React, { useState } from 'react';

const Element = () => {
  const [radioValue, setRadioValue] = useState('');
  const [checkboxValues, setCheckboxValues] = useState({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
    checkbox5: false,
    checkbox6: false,
    checkbox7: false,
    checkbox8: false,
  });

  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
  };

  const handleCheckboxChange = (checkboxName) => (event) => {
    setCheckboxValues((prevValues) => ({
      ...prevValues,
      [checkboxName]: event.target.checked,
    }));
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
            onChange={handleCheckboxChange('checkbox1')}
            className=' w-4 h-4 mb-3'
          />
          <label htmlFor="checkboxOption1" className='m-2'>Private Lessons</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="checkboxOption2"
            checked={checkboxValues.checkbox2}
            onChange={handleCheckboxChange('checkbox2')}
            className='w-4 h-4 mb-8'
          />
          <label htmlFor="checkboxOption2" className='m-2'>Group Class</label>
        </div>
        <div className='w-3/4 h-px bg-gray-400 mb-4'></div>
        
        <div>
            <h1 className='mb-4 font-bold text-gray-700'>Gender Preference</h1>
          <input
            type="checkbox"
            id="checkboxOption3"
            checked={checkboxValues.checkbox3}
            onChange={handleCheckboxChange('checkbox3')}
            className='w-4 h-4 mb-3'

          />
          <label htmlFor="checkboxOption3" className='m-2'>Male</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="checkboxOption4"
            checked={checkboxValues.checkbox4}
            onChange={handleCheckboxChange('checkbox4')}
            className='w-4 h-4 mb-3'

          />
          <label htmlFor="checkboxOption4" className='m-2'>Female</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="checkboxOption5"
            checked={checkboxValues.checkbox5}
            onChange={handleCheckboxChange('checkbox5')}
            className='mb-8 w-4 h-4'
          />
          <label htmlFor="checkboxOption5" className='m-2'>Other</label>
        </div>
        <div className='w-3/4 h-px bg-gray-400 mb-4'></div>

        <d  iv>
            <h1 className='mb-4 font-bold text-gray-700'>Location Preference</h1>
          <input
            type="checkbox"
            id="checkboxOption6"
            checked={checkboxValues.checkbox6}
            onChange={handleCheckboxChange('checkbox6')}
            className='w-4 h-4 mb-3'

          />
          <label htmlFor="checkboxOption6" className='m-2'>Tutor's place</label>
        </d>

        <div>
          <input
            type="checkbox"
            id="checkboxOption7"
            checked={checkboxValues.checkbox7}
            onChange={handleCheckboxChange('checkbox7')}
            className='w-4 h-4 mb-3'

          />
          <label htmlFor="checkboxOption7" className='m-2'>Student's place</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="checkboxOption8"
            checked={checkboxValues.checkbox8}
            onChange={handleCheckboxChange('checkbox8')}
            className='mb-8 w-4 h-4'
          />
          <label htmlFor="checkboxOption8" className='m-2'>Online</label>
        </div>
        <div className='w-3/4 h-px bg-gray-400 mb-4'></div>

        <div>
            <h1 className='mb-4 font-bold text-gray-700'>Free First Lesson</h1>
          <input
            type="radio"
            id="radioOption1"
            name="radioGroup"
            value="option1"
            checked={radioValue === 'option1'}
            onChange={handleRadioChange}
            className='w-4 h-4 mb-3'

          />
          <label htmlFor="radioOption1" className='m-2'>Yes</label>
        </div>

        <div>
          <input
            type="radio"
            id="radioOption2"
            name="radioGroup"
            value="option2"
            checked={radioValue === 'option2'}
            onChange={handleRadioChange}
            className='w-4 h-4 mb-8'

          />
          <label htmlFor="radioOption2"className='m-2'>No</label>
        </div>

        <div className='w-3/4 h-px bg-gray-400 mb-4'></div>
        <d  iv>
            <h1 className='mb-4 font-bold text-gray-700'>Subject</h1>
          <input
            type="checkbox"
            id="checkboxOption6"
            checked={checkboxValues.checkbox6}
            onChange={handleCheckboxChange('checkbox6')}
            className='w-4 h-4 mb-3'

          />
          <label htmlFor="checkboxOption6" className='m-2'>Math</label>
        </d>

        <div>
          <input
            type="checkbox"
            id="checkboxOption7"
            checked={checkboxValues.checkbox7}
            onChange={handleCheckboxChange('checkbox7')}
            className='w-4 h-4 mb-3'

          />
          <label htmlFor="checkboxOption7" className='m-2'>Science</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="checkboxOption7"
            checked={checkboxValues.checkbox7}
            onChange={handleCheckboxChange('checkbox7')}
            className='w-4 h-4 mb-3'

          />
          <label htmlFor="checkboxOption7" className='m-2'>Biology</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="checkboxOption7"
            checked={checkboxValues.checkbox7}
            onChange={handleCheckboxChange('checkbox7')}
            className='w-4 h-4 mb-3'

          />
          <label htmlFor="checkboxOption7" className='m-2'>Coding</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="checkboxOption7"
            checked={checkboxValues.checkbox7}
            onChange={handleCheckboxChange('checkbox7')}
            className='w-4 h-4 mb-3'

          />
          <label htmlFor="checkboxOption7" className='m-2'>Chinese</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="checkboxOption7"
            checked={checkboxValues.checkbox7}
            onChange={handleCheckboxChange('checkbox7')}
            className='w-4 h-4 mb-3'

          />
          <label htmlFor="checkboxOption7" className='m-2'>Japanese</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="checkboxOption7"
            checked={checkboxValues.checkbox7}
            onChange={handleCheckboxChange('checkbox7')}
            className='w-4 h-4 mb-3'

          />
          <label htmlFor="checkboxOption7" className='m-2'>English</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="checkboxOption8"
            checked={checkboxValues.checkbox8}
            onChange={handleCheckboxChange('checkbox8')}
            className='mb-8 w-4 h-4'
          />
          <label htmlFor="checkboxOption8" className='m-2'>Thai</label>
        </div>
        
        
      </form>
    </div>
  );
};

export default Element;
