import { React, useEffect, useState } from 'react'
import { storage } from './api/getimage'
import { ref, getDownloadURL } from 'firebase/storage'
import SearchBar from './component/SearchBar'
import Element from './component/element'
import Navbar from './component/Navbar'
import Tutorcard from './component/tutorcard'
import Subject from './component/Subject'

const Tutor = () => {
  const [tutorsData, setTutorsData] = useState(null)
  const [typeFilter, setTypeFilter] = useState()
  const [locationFilter, setLocationFilter] = useState()
  const [subjectfilter, setSubjectFilter] = useState()
  const handleSearch = (searchText) => {
    console.log('ค้นหา: ', searchText)
  }

  const tutorsCount = tutorsData
    ? Object.entries(tutorsData).filter(
        ([tutorName, tutorData]) => tutorData.status !== 'inactive',
      ).length
    : 0
  console.log(tutorsData)


  const fetchData = async (typeFilter, locationFilter, subjectfilter) => {
    try {
      let url = process.env.NEXT_PUBLIC_GET_ALL_COURSE
      
      if (typeFilter !== undefined) {
        url += (locationFilter !== undefined ? `?type=${typeFilter}&location=${locationFilter}` : `?type=${typeFilter}`);
      }
      if (locationFilter !== undefined) {
        url += (typeFilter !== undefined ? `&location=${locationFilter}` : `?location=${locationFilter}`);
      }
      if (subjectfilter !== undefined) {
        url += (typeFilter !== undefined || locationFilter !== undefined ? `&subject=${subjectfilter}` : `?subject=${subjectfilter}`);
      }
      

      const response = await fetch(url)

      console.log(url)

      if (response.ok) {
        const result = await response.json()
        setTutorsData(result.Courses_data)
      } else {
        console.error('Failed to fetch tutors data')
      }
    } catch (error) {
      console.error('Error fetching tutors data:', error)
    }
  }

  useEffect(() => {
    fetchData(typeFilter, locationFilter)
  }, [])

  const handleCourseFilter = (data) => {
    console.log(data)
    if (data !== typeFilter) {
      setTypeFilter(data)
      fetchData(data, locationFilter, subjectfilter)
    } else {
      setTypeFilter('')
      fetchData('',locationFilter,subjectfilter)
    }
  }

  const handleLocationFilter = (location) => {
    console.log(location)
    if (location !== locationFilter) {
      setLocationFilter(location)
      fetchData(typeFilter, location, subjectfilter) 
    } else {
      setLocationFilter('')
      fetchData(typeFilter, '',subjectfilter )
    }
  }

  const handleSubjectFilter = (data) => {
    console.log(data);
    if (data !== subjectfilter) { // เปลี่ยนจาก subjectFilter เป็น subjectfilter
      setSubjectFilter(data);
      fetchData(typeFilter, locationFilter, data); // เพิ่มพารามิเตอร์ subjectfilter ที่นี่
    } else {
      setSubjectFilter('');
      fetchData(typeFilter, locationFilter, ''); // เพิ่มพารามิเตอร์ subjectfilter ที่นี่
    }
  }

  console.log(tutorsData)

  return (
    <div className="">
      <Navbar />
      <div className="w-full flex justify-center bg-gradient-to-t from-cyan-600 to-green-400">
        <div className=" pt-14 w-3/4 h-full text-white">
          <div>
            <div className="mb-4 font-bold text-3xl">
              <h1>Find the best Tutor</h1>
            </div>
            <div className="text-xl mb-8">
              <h1>
                Find the best tutors in Bangkok. Get personalized one-on-one
                learning to boost your grades with our skilled Bangkok tutors.
                Get Test Prep and Homework assistance too.
              </h1>
            </div>
          </div>
          <div className="pb-8"></div>
        </div>
      </div>
      <div className="flex w-full justify-center bg-gray-50">
        <div className="w-3/4  flex space-x-5">
          <div className="w-1/3 "></div>
          <div className="w-full font-semibold text-gray-500 mt-4 mb-3">
            {tutorsCount} Courses Found
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center bg-gray-50">
        <div className="w-3/4  flex space-x-5">
          <div className="w-1/3">
            <Element
              coursefilter={handleCourseFilter}
              locationfilter={handleLocationFilter}
              subjectfilter={handleSubjectFilter}
            />
          </div>
          <div className="w-full">
            {tutorsData &&
              Object.entries(tutorsData).map(([tutorName, tutorData]) => (
                <div key={tutorName} className="mb-5">
                  {tutorData.status !== 'inactive' && (
                    <Tutorcard tutorData={tutorData} />
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tutor
