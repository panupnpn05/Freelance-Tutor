// pages/manage-courses.js

import { useState, useEffect } from 'react';
import Navbar from '../component/Navbar';
import CourseCard from '../component/coursecard';

const ManageCourses = () => {
  // Mock data for courses (replace with actual data from backend)
  const [courses, setCourses] = useState([
  ]);

  // const coursesArray = Object.values(coursesData.courses);

  useEffect(() => {
    const fetchImage = async () => {
      try {

        const response = await fetch(
          `https://testapi-test-1.fly.dev/user_tutor/Joe Rawipas/courses`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        const result = await response.json()
        console.log(result)
        setCourses(result.courses)
      } catch (error) {
        console.error('Error fetching image:', error)
      }
    }
    fetchImage()
  }, [])

  // Function to toggle course activation status
  const toggleActivation = (id) => {
    setCourses(courses.map(course => {
      if (course.id === id) {
        return { ...course, active: !course.active };
      }
      return course;
    }));
  }

  console.log(courses)
  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-10">
        <h1 className="text-3xl font-bold mb-6">Manage Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(courses).map(course => (
            <CourseCard
              key={course.id}
              course={course[1]}
              toggleActivation={toggleActivation}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ManageCourses;