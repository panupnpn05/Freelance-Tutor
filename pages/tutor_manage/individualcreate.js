import Navbar from '../component/Navbar'
import TimeRangePicker from '../component/timePicker'
import { format } from 'date-fns'
import { useState, useEffect } from 'react'

export default function groupcreate() {
  const [startTime, setStartTime] = useState([])
  const [endTime, setEndTime] = useState([])
  const [selectedDays, setSelectedDays] = useState({
    Sunday: false,
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
  })
  const [User, setUser] = useState()

  const handleDayToggle = (day) => {
    console.log(day)
    setSelectedDays((prevDays) => ({
      ...prevDays,
      [day]: !prevDays[day],
    }))
  }

  console.log(startTime, endTime)

  const handleStartTime = (startTime) => {
    setStartTime((FormData.startTime = format(startTime, 'HH:mm')))
  }
  const handleEndTime = (endTime) => {
    setEndTime((FormData.endTime = format(endTime, 'HH:mm')))
  }

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('userData')))
  }, [])

  console.log(User)
  return (
    <div className=" bg-gray-200">
      <div>
        <Navbar />
      </div>
      <div className=" flex justify-center">
        <div className="bg-white w-2/5 mt-5 px-6 space-y-3 rounded-lg mb-5 pb-5">
          <div className=" text-center text-xl font-medium mb-4 mt-4">
            Create Individual Course 
          </div>
          <div>
            <input
              placeholder="Course title"
              className="h-11 w-full pl-5 pr-4 border-b border-gray-600 rounded-lg drop-shadow outline-none"
            ></input>
          </div>
          <textarea
            placeholder="Course Description"
            className=" h-32 w-full pl-5 pr-4 pt-3 border-b border-gray-600 rounded-lg drop-shadow outline-none mt-5"
          ></textarea>
          <div className=" flex justify-between items-center space-x-4 w-full">
            <div className=" w-full">
              <label htmlFor="location" className="text-md">
                Teaching location:
              </label>
              <select
                id="location"
                className="h-11 w-full pl-5 pr-4 border-b border-gray-600 rounded-lg drop-shadow outline-none"
              >
                <option value="none">Please select</option>
                <option value="online">Online</option>
                <option value="onsite">Onsite</option>
              </select>
            </div>
            {/* <div className=" w-full">
              <label htmlFor="location" className="text-md">
                Number of Participants:
              </label>
              <input
                placeholder="Number of Participants"
                className="h-11 w-full pl-5 pr-4 border-b border-gray-600 rounded-lg drop-shadow outline-none"
              ></input>
            </div> */}
          </div>
          <div className="pt-3">Select Teaching day per week</div>
          <div className="flex w-full h-11 justify-between space-x-3">
            {Object.keys(selectedDays).map((day) => (
              <div
                key={day}
                onClick={() => handleDayToggle(day)}
                className={`w-1/3 flex items-center justify-center border rounded-md ${
                  selectedDays[day]
                    ? 'bg-emerald-600 text-white border-white'
                    : 'bg-white'
                }`}
                style={{ cursor: 'pointer' }}
              >
                {day.substring(0, 3)}
              </div>
            ))}
          </div>
          <div className=" flex justify-center pt-3">
            <div className="w-2/3 ">
              <TimeRangePicker
                onStartTimeChange={handleStartTime}
                onEndTimeChange={handleEndTime}
              />
              {/* <div
                className=" p-3 text-center bg-green-300 cursor-pointer"
                onClick={handleApply}
              >
                Apply
              </div> */}
            </div>
          </div>
          <div className=" flex justify-between items-center space-x-4 w-full pb-3">
            <div className=" w-full">
              <label htmlFor="location" className="text-md">
                Course Duration (weeks):
              </label>
              <input
                placeholder="Course Duration"
                className="h-11 w-full pl-5 pr-4 border-b border-gray-600 rounded-lg drop-shadow outline-none"
              ></input>
            </div>
            <div className=" w-full">
              <label htmlFor="location" className="text-md">
                Course Cost:
              </label>
              <input
                placeholder="Course Cost"
                className="h-11 w-full pl-5 pr-4 border-b border-gray-600 rounded-lg drop-shadow outline-none"
              ></input>
            </div>
          </div>
          <div className="h-11 text-white font-semibold text-lg hover:bg-emerald-600 duration-200 w-full rounded-lg flex items-center justify-center bg-emerald-400">
            Create Course
          </div>
        </div>
      </div>
    </div>
  )
}
