// components/CourseCard.js

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '../api/getimage'
import EditCourse from './courseEdit'

const CourseCard = ({ course, id }) => {
  const days = JSON.parse(course.Days)
  const [imageUrl, setImageUrl] = useState()
  const [OpenEdit, setEditcourse] = useState(false)

  useEffect(() => {
    const fetchImage = async () => {
      const url = await getDownloadURL(ref(storage, `${course.Course}.jpg`))
      setImageUrl(url)
    }

    fetchImage()
  }, [])

  const handleOpenEdit = () => {
    setEditcourse(!OpenEdit)
  }

  const handleClose = () => {
    setEditcourse(!OpenEdit)
  }

  const handleActivation = async (status) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_UPDATE_STATUS}/${course.Courseid}/${status}`,
        {
          method: 'POST',
          headers: {
            // You are sending JSON data, so set the Content-Type accordingly
            'Content-Type': 'application/json',
          },
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
  }

  const handleDelete = async() => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DELETE_COURSE}/${course.TutorName}/${course.Courseid}`,
        {
          method: 'DELETE',
          headers: {
            // You are sending JSON data, so set the Content-Type accordingly
            'Content-Type': 'application/json',
          },
        },
      )

    } catch (error) {
      console.error('Error during create course', error)
    }
  }

  return (
    <div className="">
      <div
        className={`${
          course.status !== 'inactive' ? 'bg-white ' : 'bg-gray-100'
        } shadow-md rounded-lg overflow-hidden`}
      >
        <h2
          className={`text-xl ${
            course.status !== 'inactive'
              ? 'bg-green-400 border-b border-black '
              : 'bg-gray-300 border-b border-black'
          } font-semibold mb-2 text-center py-2`}
        >
          {course.Course}
        </h2>

        <div className=" w-full flex justify-center items-center pt-2">
          <div className=" w-40 h-40 rounded-full overflow-hidden relative grow-0 shrink-0">
            <Image src={imageUrl} fill style={{ objectFit: 'cover' }} />
          </div>
        </div>

        <div className=" px-4 pb-4">
          <p>
            <strong>Teaching Format:</strong> {course.Type}
          </p>
          <p>
            <strong>Email:</strong> {course.TutorEmail}
          </p>
          <p>
            <strong>Teaching Mode:</strong>{' '}
            {course.Location === 'onsite' ? 'Onsite' : 'Online'}
          </p>
          <strong>Days:</strong>{' '}
          <p className=" w-1/2">
            {Object.entries(days).map(([day, timeData]) => (
              <div key={day} className="text-center">
                {timeData && timeData.startTime && timeData.endTime ? (
                  <div className="border rounded-lg overflow-hidden font-medium mt-1 flex bg-white">
                    <div className="w-2/12 py-1 bg-gray-200 flex justify-center items-center">
                      {day.substring(0, 3)}
                    </div>
                    <div className="w-10/12 py-1">
                      {`${timeData.startTime} - ${timeData.endTime}`}
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </p>
          {course.Type !== 'hourly' && (
            <div>
              <p>
                <strong>Duration:</strong> {course.Duration} hours
              </p>
              <p>
                <strong>Participants:</strong> {course.Participants}
              </p>
            </div>
          )}
          <p>
            <strong>Cost:</strong> {course.Cost}
          </p>
          <div className="flex justify-between mt-4">
            <div>
              {' '}
              <button
                className={`px-4 py-2 rounded-md mr-2 ${
                  course.status === 'inactive'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-300 text-gray-700'
                }`}
                onClick={() => handleActivation(course.status === 'inactive' ? 'active' : 'inactive')}
              >
                {course.status === 'inactive' ? 'Reactive' : 'Inactive'}
              </button>
              <button
                className="px-6 py-2 rounded-md bg-yellow-500 cursor-pointer hover:bg-yellow-600 duration-200"
                onClick={() => handleOpenEdit()}
              >
                Edit
              </button>
            </div>
            <div>
              <button
                className="px-4 py-2 rounded-md bg-red-500 text-white"
                onClick={() => handleDelete()}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      {OpenEdit && (
        <div className=" absolute w-full left-0 top-0 z-50">
          <EditCourse
            SendData={course}
            imgUrl={imageUrl}
            SendClose={handleClose}
          />
        </div>
      )}
    </div>
  )
}

export default CourseCard
