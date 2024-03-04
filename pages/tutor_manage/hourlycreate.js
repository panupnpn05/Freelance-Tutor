import Navbar from '../component/Navbar'
import TimeRangePicker from '../component/timePicker'
import { format } from 'date-fns'
import { useState, useEffect } from 'react'

export default function groupcreate() {
  const [startTime, setStartTime] = useState([])
  const [endTime, setEndTime] = useState([])
  const [course, setCourse] = useState('')
  const [cost, setCost] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('none')
  const [participants, setParticipant] = useState('')
  const [duration, setDuration] = useState('')
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
  const [file, setFile] = useState({
    courseImage: null,
    imagePreview: null,
  });
  const [borderStyle, setBorderStyle] = useState(
    'border-2 border-solid border-gray-500',
  )

  const openFileInput = () => {
    document.getElementById('fileInput').click()
  }


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile((prevData) => ({
      ...prevData,
      courseImage: file,
      imagePreview: URL.createObjectURL(file),
    }));
  };

  const handleCreate = async () => {
    // Create FormData instance
    const formData = new FormData();
  
    // Append form fields to FormData
    formData.append('Fullname', User.user_info.user_data.name);
    formData.append('Email', User.user_info.user_data.email);
    formData.append('Class', User.user_info.user_data.class);
    formData.append('Course', course);
    formData.append('Cost', cost);
    formData.append('Description', description);
    formData.append('location', location);
    formData.append('participants', '1');
    formData.append('days', JSON.stringify(selectedDays));
    formData.append('startTime', startTime);
    formData.append('endTime', endTime);
    formData.append('duration', duration);
    formData.append('Type', 'hourly');
  
    try {
      // Make the first request to create the course with JSON data
      const response = await fetch('http://127.0.0.1:8000/create_course', {
        method: 'POST',
        headers: {
          // You are sending JSON data, so set the Content-Type accordingly
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log(result);
      } else {
        console.error('Error during create course');
      }
    } catch (error) {
      console.error('Error during create course', error);
    }
  
    try {
      // Make the second request to upload the image
      formData.delete('file'); // Remove previous 'file' entry
      formData.append('file', file.courseImage);
  
      const uploadResponse = await fetch(
        `${process.env.NEXT_PUBLIC_UPLOAD_TUTOR_PROFILE}/${course}`,
        {
          method: 'POST',
          body: formData,
        },
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
  };
  

  const handleDayToggle = (day) => {
    setSelectedDays((prevDays) => ({
      ...prevDays,
      [day]: !prevDays[day],
    }))
  }

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
              onChange={(e) => setCourse(e.target.value)}
            ></input>
          </div>
          <textarea
            placeholder="Course Description"
            className=" h-32 w-full pl-5 pr-4 pt-3 border-b border-gray-600 rounded-lg drop-shadow outline-none mt-5"
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
            {/* <div className=" w-full">
              <label htmlFor="location" className="text-md">
                Number of Participants:
              </label>
              <input
                placeholder="Number of Participants"
                className="h-11 w-full pl-5 pr-4 border-b border-gray-600 rounded-lg drop-shadow outline-none"
                onChange={(e) => setParticipant(e.target.value)}
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
          <div className=" flex justify-between pt-3">
            <div className="w-2/3">
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
            <div
              id="imageCircle"
              onClick={openFileInput}
              className={`w-40 h-40 rounded-full overflow-hidden relative cursor-pointer flex justify-center items-center ${borderStyle} hover:bg-gray-200 duration-150`}
            >
              <img
                id="previewImage"
                src={file.imagePreview}
                alt=""
                className="w-full h-full object-cover rounded-full absolute inset-0"
              />
              Select course Image
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
            {/* <div className=" w-full">
              <label htmlFor="location" className="text-md">
                Course Duration (weeks):
              </label>
              <input
                placeholder="Course Duration"
                className="h-11 w-full pl-5 pr-4 border-b border-gray-600 rounded-lg drop-shadow outline-none"
                onChange={(e) => setDuration(e.target.value)}
              ></input>
            </div> */}
            <div className=" w-full">
              <label htmlFor="location" className="text-md">
                Course Cost:
              </label>
              <input
                placeholder="Course Cost"
                className="h-11 w-full pl-5 pr-4 border-b border-gray-600 rounded-lg drop-shadow outline-none"
                onChange={(e) => setCost(e.target.value)}
              ></input>
            </div>
          </div>
          <div
            className="h-11 text-white font-semibold text-lg hover:bg-emerald-600 duration-200 w-full rounded-lg flex items-center justify-center bg-emerald-400"
            onClick={handleCreate}
          >
            Create Course
          </div>
        </div>
      </div>
    </div>
  )
}
