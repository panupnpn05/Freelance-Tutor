// pages/manage-courses.js

import { useState, useEffect } from 'react';
import Navbar from '../component/Navbar';
import CourseCard from '../component/coursecard';

const ManageCourses = () => {
  // Mock data for courses (replace with actual data from backend)
  const [courses, setCourses] = useState([
    {
      id: 1,
      name: 'Teaching Mathematics (One-on-One)',
      tutor: 'John Doe',
      format: 'One-on-One',
      email: 'johndoe@example.com',
      mode: 'Online',
      active: true
    },
    {
      id: 2,
      name: 'Teaching English (Hourly)',
      tutor: 'Jane Smith',
      format: 'Hourly',
      email: 'janesmith@example.com',
      mode: 'Offline',
      active: false
    },
    {
      id: 3,
      name: 'Teaching Science (Group)',
      tutor: 'Michael Johnson',
      format: 'Group',
      email: 'michaeljohnson@example.com',
      mode: 'Online',
      active: true
    }
  ]);

  // Function to toggle course activation status
  const toggleActivation = (id) => {
    setCourses(courses.map(course => {
      if (course.id === id) {
        return { ...course, active: !course.active };
      }
      return course;
    }));
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-10">
        <h1 className="text-3xl font-bold mb-6">Manage Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map(course => (
            <CourseCard
              key={course.id}
              course={course}
              toggleActivation={toggleActivation}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ManageCourses;
