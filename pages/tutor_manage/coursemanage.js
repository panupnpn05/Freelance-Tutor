// pages\tutor_manage\coursemanage.js

import { useState, useEffect } from 'react'
import Navbar from '../component/Navbar'
import CourseCard from '../component/coursecard'
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '../api/getimage'

const ManageCourses = () => {
  // Mock data for courses (replace with actual data from backend)
  const [courses, setCourses] = useState([])
  const [tutorName, setTutorName] = useState([])
  const [imageurl, setImageUrl] = useState()

  // Define the updateCourseStatus function
  const updateCourseStatus = (courseId, newStatus) => {
    // Add logic here to update the status of the course
    // This function will be called from CourseCard component
    console.log(`Updating status of course ${courseId} to ${newStatus}`);
  };

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'))
    if (storedUserData) {
      const fetchImage = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_GET_COURSE}/${storedUserData.user_info.user_data.name}/courses`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            },
          )
          const result = await response.json()
          setCourses(result.courses)
        } catch (error) {
          console.error('Error fetching image:', error)
        }
      }
      fetchImage()
    }
  }, [])

  return (
    <div>
      <Navbar />
      <div className='bg-gray-100'>
      <div className="py-12 px-10 ">
        <div className="flex">
          <h1 className="text-3xl font-bold mb-6">Manage Courses</h1>
          <div className='flex ml-3 space-x-2 mt-1'>
            <div className=" w-8 h-8 rounded-full bg-green-500"> </div>
            <div className=' text-xl font-medium'>= active</div>
          </div>
          <div className='flex ml-3 space-x-2 mt-1'>
            <div className=" w-8 h-8 rounded-full bg-gray-300"> </div>
            <div className=' text-xl font-medium'>= inactive</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
          {Object.entries(courses).map((course) => (
            <CourseCard
              key={course.id}
              id={course[0]}
              course={course[1]}
              updateCourseStatus={updateCourseStatus} // Pass the function as a prop
            />
          ))}
        </div>
      </div>
      </div>
    </div>
  )
}

export default ManageCourses
