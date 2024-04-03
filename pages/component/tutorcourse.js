import { React, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Element from './element'
import Navbar from './Navbar'
import Image from 'next/image'
import TutorCoursecard from './tutorcoursecard'
const Tutor = () => {
  const [tutorsData, setTutorsData] = useState(null)
  const [typeFilter, setTypeFilter] = useState()
  const [courseData, setCourseData] = useState()
  const router = useRouter()
  const [locationFilter, setLocationFilter] = useState()
  const handleSearch = (searchText) => {
    console.log('ค้นหา: ', searchText)
  }

  const courseCount = courseData
    ? Object.entries(courseData).filter(
        ([courseName, courseData]) => courseData.status !== 'inactive',
      ).length
    : 0

  const fetchData = async (typeFilter, locationFilter) => {
      try {
        let url = `${process.env.NEXT_PUBLIC_GET_COURSE}/${tutorsData.name}/courses`


        if (typeFilter !== undefined) {
          url +=
            locationFilter !== undefined
              ? `?type=${typeFilter}&location=${locationFilter}`
              : `?type=${typeFilter}`
        }
        if (locationFilter !== undefined) {
          url +=
            typeFilter !== undefined
              ? `&location=${locationFilter}`
              : `?location=${locationFilter}`
        }

        console.log(url)
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (response.ok) {
          const result = await response.json()
          console.log(result)
          setCourseData(result.courses)
        } else {
          console.error('Failed to fetch tutors data')
          return []
        }

      } catch (error) {
        console.error('Error fetching tutors data:', error)
        return []
      }
  }

  useEffect(() => {
    const { tutorData } = router.query;
  
    if (tutorData) {
        const parsedTutorData = JSON.parse(tutorData);
        setTutorsData(parsedTutorData);
        console.log(parsedTutorData);
    }
  
}, [router.query]); // Only router.query should be in the dependency array

useEffect(() => {
    if(tutorsData) {
        fetchData(typeFilter, locationFilter);
    }
}, [tutorsData]); // tutorsData should be the only dependency here

  const handleCourseFilter = (data) => {
    console.log(data)
    if (data !== typeFilter) {
      setTypeFilter(data)
      fetchData(data, locationFilter)
    } else {
      setTypeFilter('')
      fetchData('', locationFilter)
    }
  }

  const handleLocationFilter = (location) => {
    console.log(location)
    if (location !== locationFilter) {
      setLocationFilter(location)
      fetchData(typeFilter, location)
    } else {
      setLocationFilter('')
      fetchData(typeFilter, '')
    }
  }

  return (
    <div className="">
      <Navbar />
      <div className="w-full flex justify-center bg-gradient-to-t from-cyan-600 to-green-400">
        <div className=" pt-10 w-3/4 h-full text-white">
          {tutorsData && (
            <div className="flex items-center space-x-5">
              <div className=" w-36 h-36 rounded-full overflow-hidden relative grow-0 shrink-0">
                <Image
                  src={tutorsData.imageUrl}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className=" pt-5">
                <div className="mb-4 font-bold text-3xl">
                  <h1>{tutorsData.name}'s courses</h1>
                </div>
                <div className="text-xl mb-4">
                  <h1>class : {tutorsData.class}</h1>
                </div>
                <div className="text-xl mb-5 flex space-x-1">
                  <h1>contact : </h1>
                  <a
                    className="hover:scale-105 hover:text-gray-200"
                    href={`mailto:${tutorsData.email}`}
                  >
                    {tutorsData.email}
                  </a>
                </div>
              </div>
            </div>
          )}
          <div className="pb-8"></div>
        </div>
      </div>
      <div className="flex w-full justify-center bg-gray-50">
        <div className="w-3/4  flex space-x-5">
          <div className="w-1/3 "></div>
          <div className="w-full font-semibold text-gray-500 mt-4 mb-3">
            {courseCount} Courses Found
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center bg-gray-50">
        <div className="w-3/4  flex space-x-5">
          <div className="w-1/3">
            <Element
              coursefilter={handleCourseFilter}
              locationfilter={handleLocationFilter}
            />
          </div>
          <div className="w-full">
            {courseData &&
              Object.entries(courseData).map(([courseName, courseData]) => (
                <div key={courseName} className="mb-5">
                  {courseData.status !== 'inactive' && (
                    <TutorCoursecard tutorData={courseData} />
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
