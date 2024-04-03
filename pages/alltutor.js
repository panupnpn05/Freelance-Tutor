import { React, useEffect, useState } from 'react'
import { storage } from './api/getimage'
import { ref, getDownloadURL } from 'firebase/storage'
import { useRouter } from 'next/router';
import Element from './component/elementTutor'
import Navbar from './component/Navbar'
import Image from 'next/image'
import {
  UserGroupIcon,
  UserIcon,
  MapPinIcon,
  ComputerDesktopIcon,
  CheckBadgeIcon,
  BriefcaseIcon,
  EnvelopeIcon,
  BookOpenIcon,
  ClockIcon,
  StarIcon,
} from '@heroicons/react/24/solid'

const Tutor = () => {
  const router = useRouter();
  const [tutorsData, setTutorsData] = useState(null)
  const [subjectFilter, setSubjectFilter] = useState()
  const [imageUrl, setImageUrl] = useState([])
  const handleSearch = (searchText) => {
    console.log('ค้นหา: ', searchText)
  }

  const tutorsCount = tutorsData
    ? Object.entries(tutorsData).filter(
        ([tutorName, tutorData]) => tutorData.status !== 'inactive',
      ).length
    : 0

  const fetchData = async (subjectFilter) => {
    try {
        let url = process.env.NEXT_PUBLIC_GET_TUTOR
        if (subjectFilter !== undefined) {
          url += `?subject=${subjectFilter}`;
        }

      const response = await fetch(url)

      if (response.ok) {
        const result = await response.json()
        for (const i in result) {
          const url = await getDownloadURL(
            ref(storage, `${result[i].name}.jpg`),
          )

          const responserating = await fetch(
            `${process.env.NEXT_PUBLIC_GET_RATING}/${result[i].name}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            },
          )

          // Check if response is successful before proceeding
          if (responserating.ok) {
            const ratingData = await responserating.json()
            result[i].rating = ratingData.average_rating // Assuming rating data is JSON
          } else {
            // Handle error if needed
            console.error(
              'Error fetching rating data:',
              responserating.statusText,
            )
          }

          result[i].imageUrl = url
        }
        setTutorsData(result)
      } else {
        console.error('Error fetching tutors data:', response.statusText)
      }
    } catch (error) {
      console.error('Error fetching tutors data:', error)
    }
  }

  useEffect(() => {
    fetchData(subjectFilter)
  }, [])

  const handleSubjectFilter = (data) => {
    console.log(data)
    if (data !== subjectFilter) {
      setSubjectFilter(data)
      fetchData(data)
    } else {
      setSubjectFilter('')
      fetchData('')
    }
  }

  const handleTutorCourse = (data) =>{
    console.log(data)
    router.push({
      pathname: '/component/tutorcourse',
      query: { tutorData: JSON.stringify(data) },
    });
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
            {tutorsCount} tutors Found
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center bg-gray-50 min-h-screen">
        <div className="w-3/4  flex space-x-5">
          <div className="w-1/3">
            <Element
              subjectfilter={handleSubjectFilter}
            />
          </div>
          <div className="w-full">
            {tutorsData &&
              Object.entries(tutorsData).map(([tutorName, tutorData]) => (
                <div key={tutorName} className="mb-5">
                  <div
                    className="bg-white shadow-xl  rounded-xl overflow-hidden w-full hover:bg-slate-100 duration-200 cursor-pointer"
                    onClick={() => handleTutorCourse(tutorData)}
                  >
                    <div className="flex pt-5 space-x-8 px-6">
                      <div className=" w-32 h-32 rounded-full overflow-hidden relative grow-0 shrink-0">
                        <Image
                          src={tutorData.imageUrl}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                      <div className="w-full">
                        <div className="flex justify-between">
                          <div>
                            <div className="text-2xl font-semibold">
                              {tutorData.name}
                            </div>
                            <div className="text-gray-600 mt-1">
                              Bangkok, Thailand
                            </div>
                            <div className="text-gray-600 hover:text-gray-900 hover:scale-105 flex items-center">
                              <EnvelopeIcon className="w-3 mr-1" /> :{' '}
                              <a href={`mailto:${tutorData.email}`}>
                                {tutorData.email}
                              </a>
                            </div>
                          </div>
                          <div className="w-1/2">
                            <div className="text-right text-2xl font-semibold flex justify-end">
                              {tutorData.class}
                            </div>
                          </div>
                        </div>

                        <div className="text-xl font-semibold mt-5">
                          {tutorData.description}
                        </div>
                        {/* <p className="text-gray-600 mt-2">
              John is a software engineer with over 10 years of experience in
              developing web and mobile applications. He is skilled in
              JavaScript, React, and Node.js.
            </p> */}
                      </div>
                    </div>

                    <div className="flex mt-5">
                      <div className="border-t border-dashed border-gray-300  w-full items-center px-4 flex justify-between">
                        {/* <div className="flex space-x-2">
                          <CheckBadgeIcon className=" w-6 text-gray-600" />
                          {tutorData.Type === 'group' ? (
                            <UserGroupIcon className="w-6 text-gray-600" />
                          ) : tutorData.Type === 'individual' ? (
                            <UserIcon className="w-6 text-gray-600" />
                          ) : (
                            <ClockIcon className="w-6 text-gray-600" /> 
                          )}
                          {tutorData.Location === 'online' ? (
                            <ComputerDesktopIcon className=" w-6 text-gray-600 " />
                          ) : (
                            <MapPinIcon className=" w-6 text-gray-600 " />
                          )}
                        </div> */}
                        <div className="flex items-center">
                          <StarIcon className="w-6 ml-1 text-yellow-500 pr-1" />
                          {tutorData.rating === 0 ? "No reviews" : tutorData.rating}
                        </div>
                      </div>
                      <div className=" w-1/3 flex">
                        <button
                          className=" bg-green-500 w-full text-white px-4 py-2 hover:bg-green-700 duration-300 whitespace-nowrap"
                          onClick={() => handleTutorCourse(tutorData)}
                        >
                          Booking
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tutor
