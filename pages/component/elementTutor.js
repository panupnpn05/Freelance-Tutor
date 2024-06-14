import React, { useState } from 'react'

const Element = ({ subjectfilter}) => {
  const [radioValue, setRadioValue] = useState('')
  const [checkboxValues, setCheckboxValues] = useState({
    math: false,
    science: false,
    biology: false,
    coding: false,
    chinese: false,
    japanese: false,
    thai: false,
    english: false,
  })

  const handleCourseChange = (checkboxName) => (event) => {
    setCheckboxValues((prevValues) => ({
      ...prevValues,
      [checkboxName]: event.target.checked,
    }))
    subjectfilter(checkboxName)
  }

  return (
    <div className="text-base">
      <form className=" text-gray-500">
        <h1 className="mb-4 font-bold text-gray-700">Subjects</h1>
        <div>
          <input
            type="checkbox"
            id="checkboxOption1"
            checked={checkboxValues.checkbox1}
            onChange={handleCourseChange('math')}
            className=" w-4 h-4 mb-3"
          />
          <label htmlFor="checkboxOption1" className="m-2">
            Math 
          </label>
        </div>
        <div>
          <input
            type="checkbox"
            id="checkboxOption1"
            checked={checkboxValues.checkbox1}
            onChange={handleCourseChange('science')}
            className=" w-4 h-4 mb-3"
          />
          <label htmlFor="checkboxOption1" className="m-2">
            Science 
          </label>
        </div>
        <div>
          <input
            type="checkbox"
            id="checkboxOption1"
            checked={checkboxValues.checkbox1}
            onChange={handleCourseChange('biology')}
            className=" w-4 h-4 mb-3"
          />
          <label htmlFor="checkboxOption1" className="m-2">
            Biology 
          </label>
        </div>
        <div>
          <input
            type="checkbox"
            id="checkboxOption1"
            checked={checkboxValues.checkbox1}
            onChange={handleCourseChange('coding')}
            className=" w-4 h-4 mb-3"
          />
          <label htmlFor="checkboxOption1" className="m-2">
            Coding 
          </label>
        </div>
        <div>
          <input
            type="checkbox"
            id="checkboxOption1"
            checked={checkboxValues.checkbox1}
            onChange={handleCourseChange('chinese')}
            className=" w-4 h-4 mb-3"
          />
          <label htmlFor="checkboxOption1" className="m-2">
          Chinese 
          </label>
        </div>
        <div>
          <input
            type="checkbox"
            id="checkboxOption1"
            checked={checkboxValues.checkbox1}
            onChange={handleCourseChange('japanese')}
            className=" w-4 h-4 mb-3"
          />
          <label htmlFor="checkboxOption1" className="m-2">
          Japanese 
          </label>
        </div>
        <div>
          <input
            type="checkbox"
            id="checkboxOption1"
            checked={checkboxValues.checkbox1}
            onChange={handleCourseChange('thai')}
            className=" w-4 h-4 mb-3"
          />
          <label htmlFor="checkboxOption1" className="m-2">
          Thai 
          </label>
        </div>
        <div>
          <input
            type="checkbox"
            id="checkboxOption1"
            checked={checkboxValues.checkbox1}
            onChange={handleCourseChange('english')}
            className=" w-4 h-4 mb-3"
          />
          <label htmlFor="checkboxOption1" className="m-2">
          English 
          </label>
        </div>

      </form>
    </div>
  )
}

export default Element
