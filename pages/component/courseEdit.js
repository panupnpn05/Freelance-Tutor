import Navbar from '../component/Navbar'
import TimeRangePicker from '../component/timePicker'
import { format } from 'date-fns'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';

export default function editCourse({ SendData, imgUrl, SendClose }) {
  const [course, setCourse] = useState(SendData.Course)
  const [cost, setCost] = useState(SendData.Cost)
  const [description, setDescription] = useState(SendData.Description)
  const [participants, setParticipants] = useState(SendData.Participants)
  const [duration, setDuration] = useState(SendData.Duration)
  const [location, setLocation] = useState(SendData.Location)
  const [imageUrl, setImageUrl] = useState(imgUrl)
  const days = JSON.parse(SendData.Days)
  const router = useRouter();
  const [borderStyle, setBorderStyle] = useState(
    'border-2 border-solid border-gray-500',
  )
  const [file, setFile] = useState({
    courseImage: null,
    imagePreview: null,
  })
  const openFileInput = () => {
    document.getElementById('fileInput').click()
  }

  const [selectedDays, setSelectedDays] = useState(days)
  const [editedDay, setEditedDay] = useState(null)

  const handleDayClick = (day) => {
    setSelectedDays((prevSchedule) => ({
      ...prevSchedule,
      [day]: !prevSchedule[day], // Toggle the value between true and false
    }))
    setEditedDay(day)
  }


  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setFile((prevData) => ({
      ...prevData,
      courseImage: file,
      imagePreview: URL.createObjectURL(file),
    }))
  }

  const handleClose = () => {
    SendClose()
  }


  const handleEdit = async () => {
    // Create FormData instance
    const formData = new FormData()

    // Append form fields to FormData
    formData.append('Fullname', SendData.TutorName)
    formData.append('Email', SendData.TutorEmail)
    formData.append('Class', SendData.TutorClass)
    formData.append('Course', course)
    formData.append('Cost', cost)
    formData.append('Description', description)
    formData.append('location', location)
    formData.append('participants', participants)
    formData.append('days', JSON.stringify(selectedDays))
    formData.append('duration', duration)
    formData.append('Type', SendData.Type)

    try {
      // Make the first request to create the course with JSON data
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_EDIT_COURSE}/${SendData.Courseid}`,
        {
          method: 'POST',
          headers: {
            // You are sending JSON data, so set the Content-Type accordingly
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(Object.fromEntries(formData)),
        },
      )

      if (response.ok) {
        const result = await response.json()
        console.log(result)
      } else {
        console.error('Error during create course')
      }
    } catch (error) {
      console.error('Error during create course', error)
    }
    router.reload();
    if (file.courseImage !== null) {
      try {
        // Make the second request to upload the image
        formData.delete('file'); // Remove previous 'file' entry
        formData.append('file', file.courseImage);
    
        const uploadResponse = await fetch(
          `${process.env.NEXT_PUBLIC_UPLOAD_TUTOR_PROFILE}/${course}`,
          {
            method: 'POST',
            body: formData,
          }
        );
    
        if (uploadResponse.ok) {
          const uploadData = await uploadResponse.json();
          console.log(uploadData);
        } else {
          console.error('Error uploading image');
        }
      } catch (error) {
        console.error('Error uploading image', error);
      }
    } else {
      try {
        // Send the request with the old image URL
        const uploadResponse = await fetch(
          `${process.env.NEXT_PUBLIC_RENAME_IMAGE}/${SendData.Course}/${course}`,
          {
            method: 'PUT',
          }
        );
    
        if (uploadResponse.ok) {
          const uploadData = await uploadResponse.json();
          console.log(uploadData);
        } else {
          console.error('Error uploading image');
        }
      } catch (error) {
        console.error('Error uploading image', error);
      }
    }
    
  }

  const handleStartTime = (day, time) => {
    const formattedTime = new Date(time).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
    setSelectedDays((prevState) => ({
      ...prevState,
      [day]: {
        ...prevState[day],
        startTime: formattedTime,
      },
    }))
  }

  const handleEndTime = (day, time) => {
    const formattedTime = new Date(time).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
    setSelectedDays((prevState) => ({
      ...prevState,
      [day]: {
        ...prevState[day],
        endTime: formattedTime,
      },
    }))
  }

  return (
    <div className="bg-gray-100/50 backdrop-blur-xl">
      <div>
        <Navbar />
      </div>
      <div className=" flex justify-center">
        <div className="bg-white w-2/5 mt-5 px-6 space-y-3 rounded-lg mb-5 pb-5">
          <div className=" text-center text-xl font-medium mb-4 mt-4">
            Edit Course
          </div>
          <div>
            <input
              placeholder="Course title"
              className="h-11 w-full pl-5 pr-4 border-b border-gray-600 rounded-lg drop-shadow outline-none"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            ></input>
          </div>
          <textarea
            placeholder="Course Description"
            className=" h-32 w-full pl-5 pr-4 pt-3 border-b border-gray-600 rounded-lg drop-shadow outline-none mt-5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <div className=" flex justify-between items-center space-x-4 w-full">
            <div className=" w-full">
              <label htmlFor="location" className="text-md">
                Teaching location:
              </label>
              <select
                id="location"
                className="h-11 w-full pl-5 pr-4 border-b border-gray-600 rounded-lg drop-shadow outline-none"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="none">Please select</option>
                <option value="online">Online</option>
                <option value="onsite">Onsite</option>
              </select>
            </div>
            {SendData.Type == 'group' && (
              <div className=" w-full">
                <label htmlFor="location" className="text-md">
                  Number of Participants:
                </label>
                <input
                  placeholder="Number of Participants"
                  value={participants}
                  className="h-11 w-full pl-5 pr-4 border-b border-gray-600 rounded-lg drop-shadow outline-none"
                  onChange={(e) => setParticipants(e.target.value)}
                ></input>
              </div>
            )}
          </div>
          <div className="pt-3">Select Teaching day per week</div>
          <div className="flex w-full h-11 justify-between space-x-3">
            {Object.keys(selectedDays).map((day) => (
              <div
                key={day}
                onClick={() => handleDayClick(day)}
                className={`w-1/3 flex items-center justify-center border rounded-md ${
                  selectedDays[day] &&
                  (typeof selectedDays[day] === 'object' ||
                    selectedDays[day] !== false)
                    ? 'bg-emerald-600 text-white border-white'
                    : 'bg-white'
                }`}
                style={{ cursor: 'pointer' }}
              >
                {day.substring(0, 3)}
              </div>
            ))}
          </div>
          <div>
            <div
              className={`grid ${
                Object.keys(days).filter((day) => days[day]).length === 1
                  ? 'grid-cols-1'
                  : 'grid-cols-2'
              } gap-4`}
            >
              {Object.keys(selectedDays).map((day) =>
                (selectedDays[day] && typeof selectedDays[day] === 'object') ||
                selectedDays[day] === true ? (
                  <div
                    key={day}
                    className={`grid ${
                      parseInt(day) % 2 !== 0 ? 'grid-cols-1' : 'grid-cols-2'
                    } border rounded-xl overflow-hidden`}
                  >
                    <span className="text-center w-full py-2 mb-1 bg-gray-300 text-lg font-medium">
                      {day}
                    </span>
                    <div className="px-2 pb-2">
                      {selectedDays[day] &&
                      typeof selectedDays[day] === 'object' ? (
                        <TimeRangePicker
                          className="bg-white rounded-lg shadow-md"
                          startDefTime={selectedDays[day].startTime}
                          endDefTime={selectedDays[day].endTime}
                          onStartTimeChange={(time) =>
                            handleStartTime(day, time)
                          }
                          onEndTimeChange={(time) => handleEndTime(day, time)}
                        />
                      ) : (
                        <>
                          <TimeRangePicker
                            className="bg-white rounded-lg shadow-md"
                            onStartTimeChange={(time) =>
                              handleStartTime(day, time)
                            }
                            onEndTimeChange={(time) => handleEndTime(day, time)}
                          />
                        </>
                      )}
                    </div>
                  </div>
                ) : null,
              )}
            </div>
          </div>
          <div className="flex justify-center pt-3">
            <div
              id="imageCircle"
              onClick={openFileInput}
              className={`w-40 h-40 rounded-full overflow-hidden relative cursor-pointer flex justify-center items-center border hover:bg-gray-200 duration-150`}
            >
              <div className="relative w-full h-full">
                <img
                  id="previewImage"
                  src={
                    file.imagePreview !== null ? file.imagePreview : imgUrl
                  }
                  alt=""
                  className="w-full h-full object-cover z-10 rounded-full absolute inset-0"
                />
                {/* Overlay to dim the image */}
                <div className="absolute inset-0 z-20 bg-black opacity-0 hover:opacity-20 transition-opacity duration-150"></div>
              </div>
              <span className="z-0 text-white absolute">
                Select course Image
              </span>
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                placeholder=""
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>
          <div className=" flex justify-between items-center space-x-4 w-full pb-3">
            {SendData.Type !== 'hourly' && (
              <div className=" w-full">
                <label htmlFor="location" className="text-md">
                  Course Duration (weeks):
                </label>
                <input
                  placeholder="Course Duration"
                  className="h-11 w-full pl-5 pr-4 border-b border-gray-600 rounded-lg drop-shadow outline-none"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                ></input>
              </div>
            )}

            <div className=" w-full">
              <label htmlFor="location" className="text-md">
                Course Cost:
              </label>
              <input
                placeholder="Course Cost"
                value={cost}
                className="h-11 w-full pl-5 pr-4 border-b border-gray-600 rounded-lg drop-shadow outline-none"
                onChange={(e) => setCost(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="flex space-x-4">
            <div
              className="h-11 text-white font-semibold text-lg hover:bg-emerald-600 duration-200 w-full rounded-lg flex items-center justify-center bg-emerald-400"
              onClick={handleEdit}
            >
              Save Edit
            </div>
            <div
              className="h-11 text-white font-semibold text-lg hover:bg-red-600 duration-200 w-full rounded-lg flex items-center justify-center bg-red-400"
              onClick={handleClose}
            >
              Cancle
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
